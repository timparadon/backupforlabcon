<template>
  <div class="app-layout">
    <!-- แถบเมนูด้านซ้าย (Sidebar) -->
    <aside class="sidebar">
      <div class="logo">
        <h2>🏆 ระบบแข่งขัน</h2>
      </div>
      
      <nav class="menu">
        <router-link to="/" class="menu-item">🏠 หน้าหลัก</router-link>
        <router-link to="/match" class="menu-item">⚔️ สายการแข่งขัน</router-link>
        <router-link to="/leaderboard" class="menu-item">📊 ตารางคะแนน</router-link>
        <router-link to="/register" class="menu-item">📝 สมัครแข่งขัน</router-link>
        <router-link to="/login" class="menu-item logout">🔑 เข้าสู่ระบบ</router-link>
      </nav>
    </aside>

    <!-- พื้นที่เนื้อหาหลักด้านขวา -->
    <main class="main-content">
      <div class="content-card">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

/* ดีไซน์เมนูด้านซ้าย */
.sidebar {
  width: 260px;
  background-color: #0f172a;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.logo {
  padding-bottom: 24px;
  margin-bottom: 20px;
  border-bottom: 1px solid #1e293b;
  text-align: center;
}

.logo h2 {
  font-size: 1.4rem;
  color: #38bdf8;
  letter-spacing: 0.5px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.menu-item {
  color: #cbd5e1;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-item:hover {
  background-color: #1e293b;
  color: #ffffff;
  transform: translateX(4px);
}

/* ไฮไลต์สีปุ่มอัตโนมัติเมื่ออยู่หน้านั้นๆ */
.menu-item.router-link-active {
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 600;
}

/* ดันปุ่ม Login/Logout ไปอยู่ล่างสุดของ Sidebar */
.menu-item.logout {
  margin-top: auto;
  border-top: 1px solid #1e293b;
  padding-top: 16px;
}

/* ดีไซน์พื้นที่เนื้อหาด้านขวา */
.main-content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

.content-card {
  background-color: #ffffff;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  min-height: calc(100vh - 64px);
}
</style>