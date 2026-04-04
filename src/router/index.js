import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Logout from '../views/LogoutView.vue'
import UserProfile from '../views/ProfileView.vue'
import Users from '../views/UsersView.vue'
import Register from '../views/RegisterVIew.vue'
import Tierlist from '../views/TierlistVIew.vue'
import Template from '../views/TemplateView.vue'
import GlobalTemplates from '../views/GlobalTemplateView.vue'
import UserTierlists from '../views/UserTierlists.vue'
import { useAuthStore } from '@/stores/auth';
import cookie from 'vue-cookies';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import NotFound from '../views/NotFoundView.vue'
import { useTierlistStore } from '@/stores/tierlist';

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
      meta:{loggedIn:true,onlySuper:true}
    },
    {
      path: '/tierlist/by/:id',
      name: 'user tierlist',
      component: UserTierlists,
    },
    {
      path: '/tierlist/:id?',
      name: 'tierlist',
      component: Tierlist,
    },
    {
      path: '/template/:id?',
      name: 'template',
      component: Template,
      meta:{loggedIn:true,onlySuper:true}
    },
    {
      path: '/templates/',
      name: 'templates',
      component: GlobalTemplates,
      meta:{loggedIn:true,onlySuper:true}
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
  const {status,userLoggedIn,userName,userID,userSuper} = storeToRefs(useAuthStore());
  const {authenticate,resetAll} = useAuthStore();
  const {reset} = useUserStore();
  const {reset:resetTierlistData}=useTierlistStore()

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
    await resetTierlistData();

    if(status.value==403){
      await resetAll();
      cookie.remove('user_auth');
      return {name:'home'}
    }

  }


  if (typeof to.meta.loggedIn !== "undefined" && userLoggedIn.value!==to.meta.loggedIn){
    return {name:'home'}
  }

  if (typeof to.meta.onlySuper !== "undefined" && userSuper.value!==to.meta.onlySuper){
    return {name:'home'}
  }


})


export default router
