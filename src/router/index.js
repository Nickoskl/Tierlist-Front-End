import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Logout from '../views/LogoutView.vue'
import Me from '../views/ProfileView.vue'
import Users from '../views/UsersView.vue'
import { useAuthStore } from '@/stores/auth';
import cookie from 'vue-cookies';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{loggedIn : false}
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      meta:{loggedIn:true}
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
      meta:{loggedIn:true}
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta:{loggedIn:true}
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(''),
    // },
  ],
})

router.beforeEach(async(to,from)=>{

  const authenticated = useAuthStore();
  const {authenticate} = useAuthStore();


  if(authenticated.userLoggedIn==false && cookie.get('user_auth')){
    await authenticate(0);
    console.log("HIT");
  }

  if (to.meta.loggedIn && authenticated.userLoggedIn!==to.meta.loggedIn){
    return {name:'home'}
  }

})

export default router
