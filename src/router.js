import VueRouter from 'vue-router'
import HomeContainer from './components/home/index'
import login from './components/login/index'
import welcome from './components/home/home'
//创建路由对象
var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/login',component:login},
        {path:'/home',component:HomeContainer,
            redirect: '/welcome',
            children: [
                { path: '/home', component: welcome },
            ] }
    ]
});
export default router
