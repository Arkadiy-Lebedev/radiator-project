import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layout/MainLayout.vue'

import axios from 'axios'
import { API } from "../api/api"

import { useUserStore } from '../stores/userStore'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/admin-select',
      component: MainLayout,
      children: [
        {
          path: '/admin-select',
          name: 'home',
          component: () => import('@/views/Home.vue'),
          meta: {
            needAuth: true
          }
        },
       
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth.vue'),
    },
{
      path: '/',
    name: 'CalcPage',
  component: () => import('@/views/CalcPage.vue'),
    },
  ]
})



// router.beforeEach(async (to, from) => {
//   const userStore = useUserStore()
// if (to.meta.needAuth && !localStorage.getItem('jwt')) {
//       return { name: "auth" }
// } 

//   if (to.meta.needAuth && localStorage.getItem('jwt')) {
//     if (userStore.userInfo.id) {
//       return
//     } else {

//   const resp = await axios.post(`${API}api/token/validate.php`, JSON.stringify({ "jwt": localStorage.getItem('jwt') }))
//       if (resp.data.auth) {    
//       console.log(resp.data)
//       userStore.userInfo.id = resp.data.data.id
//         userStore.userInfo.login = resp.data.data.name
//       userStore.userInfo.role = resp.data.data.role
//      return
//     } else {
//        return { name: "auth" }
//     }

//     }
 
//   }
// })

export default router
