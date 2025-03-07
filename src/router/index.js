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
import { useUserStore } from '@/stores/user';
import NotFound from '../views/NotFoundView.vue'

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
    {
      path: '/:pathMatch(.*)*',
      name:'notfound',
      component: NotFound,
    }
  ],
})

router.beforeEach(async(to,from)=>{
  const {loadingDone} = storeToRefs(useUserStore())
  const {status,userLoggedIn} = storeToRefs(useAuthStore());
  const {authenticate,resetAll} = useAuthStore();
  const {reset} = useUserStore();

  loadingDone.value = false;
  if(cookie.get('user_auth')){

    console.log(from);
    console.log(to);
    
    if(from.name=='login'&& to.name=='home'){
      console.log(from.name);
      console.log(to.name);
    }else{
      await authenticate(0);
      console.log("HIT");
    }

    await reset();

    if(status.value==403){
      await resetAll();
      cookie.remove('user_auth');
      return {name:'home'}
    }

  }


  if (typeof to.meta.loggedIn !== "undefined" && userLoggedIn.value!==to.meta.loggedIn){
    return {name:'home'}
  }


})


export default router
