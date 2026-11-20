<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (!res.ok) {
      errorMessage.value = data.message || 'เข้าสู่ระบบไม่สำเร็จ'
      return
    }

    // 1. บันทึก token ลงเครื่อง
    localStorage.setItem('token', data.token)
    
    // 2. เด้งเข้าไปหน้าหลัก (ซึ่งจะมีแถบเมนู Sidebar ขึ้นมา)
    router.push('/home')
  } catch (err) {
    errorMessage.value = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h2>🔑 เข้าสู่ระบบแข่งขัน</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>ชื่อผู้ใช้ (Username)</label>
          <input v-model="username" type="text" required placeholder="กรอกชื่อผู้ใช้" />
        </div>

        <div class="form-group">
          <label>รหัสผ่าน (Password)</label>
          <input v-model="password" type="password" required placeholder="กรอกรหัสผ่าน" />
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="submit" class="btn-submit">เข้าสู่ระบบ</button>
      </form>

      <p class="register-link">
        ยังไม่มีบัญชี? <router-link to="/register">สมัครสมาชิกที่นี่</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0f172a;
}

.login-box {
  background: #ffffff;
  padding: 36px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

h2 { text-align: center; margin-bottom: 24px; color: #1e293b; }
.form-group { margin-bottom: 16px; }
label { display: block; margin-bottom: 6px; font-weight: 500; color: #475569; }
input { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 1rem; }
.btn-submit { width: 100%; padding: 12px; background-color: #2563eb; color: white; border: none; border-radius: 6px; font-size: 1rem; font-weight: 600; cursor: pointer; margin-top: 8px; }
.btn-submit:hover { background-color: #1d4ed8; }
.error { color: #ef4444; font-size: 0.9rem; margin-bottom: 10px; text-align: center; }
.register-link { text-align: center; margin-top: 16px; font-size: 0.9rem; }
</style>