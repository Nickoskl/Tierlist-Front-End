import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Logout from '../views/LogoutView.vue'
import UserProfile from '../views/ProfileView.vue'
import Users from '../views/UsersView.vue'
import Register from '../views/RegisterVIew.vue'
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
      path: '/register',
      name: 'register',
      component: Register,
      meta:{loggedIn : false}
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      meta:{loggedIn:true}
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserProfile,
      meta:{loggedIn:true}
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta:{loggedIn:true}
    },
  ],
})

router.beforeEach(async(to,from)=>{

  const authenticated = useAuthStore();
  const {authenticate} = useAuthStore();


  if(authenticated.userLoggedIn==false && cookie.get('user_auth')){
    await authenticate(0);
    console.log("HIT");
  }
  // console.log(to.meta.loggedIn)
  // console.log(authenticated.userLoggedIn)
  // console.log()
  if (typeof to.meta.loggedIn !== "undefined" && authenticated.userLoggedIn!==to.meta.loggedIn){
    return {name:'home'}
  }


})

export default router
