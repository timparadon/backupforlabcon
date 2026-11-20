import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MatchView from '../views/MatchView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'

const routes = [
  // 1. เปิดเว็บมาปุ๊บ ให้เด้งไปหน้า /login ทันที
  { path: '/', redirect: '/login' },
  
  // 2. หน้าสาธารณะ (ไม่ต้อง Login ก็เข้าได้)
  { path: '/login', name: 'login', component: LoginView },
  
  
  // 3. หน้าที่บังคับ Login (ใส่ meta: { requiresAuth: true })
  { path: '/home', name: 'home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/register', name: 'register', component: RegisterView , meta: { requiresAuth: true }},
  { path: '/match', name: 'match', component: MatchView, meta: { requiresAuth: true } },
  { path: '/leaderboard', name: 'leaderboard', component: LeaderboardView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ตัวดักจับก่อนเปลี่ยนหน้า: ถ้ายังไม่ Login ห้ามเข้าหน้าที่มี requiresAuth
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login') // ไม่มี token ให้เด้งกลับไปหน้า login
  } else if (to.path === '/login' && token) {
    next('/home') // ถ้า login ค้างไว้อยู่แล้ว ให้ข้ามไปหน้า /home เลย
  } else {
    next()
  }
})

export default router