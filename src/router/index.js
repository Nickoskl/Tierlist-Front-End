import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Logout from '../views/LogoutView.vue'
import UserProfile from '../views/ProfileView.vue'
import Users from '../views/UsersView.vue'
import Register from '../views/RegisterVIew.vue'
import { useAuthStore } from '@/stores/auth';
import cookie from 'vue-cookies';
import { storeToRefs } from 'pinia';

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

  const {status,userLoggedIn} = storeToRefs(useAuthStore());
  const {authenticate,resetAll} = useAuthStore();


  if(cookie.get('user_auth')){
    await authenticate(0);
    

    if(status.value==403){
      await resetAll();
      cookie.remove('user_auth');
      return {name:'home'}
    }
    console.log("HIT");
  }


  // console.log(to.meta.loggedIn)
  // console.log(authenticated.userLoggedIn)
  // console.log()
  if (typeof to.meta.loggedIn !== "undefined" && userLoggedIn.value!==to.meta.loggedIn){
    return {name:'home'}
  }


})


export default router
