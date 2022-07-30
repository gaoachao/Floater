import VueRouter from "vue-router";
import Login from "../pages/Login/Login.vue";
import Register from "../pages/Register/Register";
import Forget from "../pages/Forget/Forget";
import Entrance from "../pages/Entrance/Entrance";
import Beach from "../pages/Beach/Beach";
import Throw from "../pages/Beach/Throw";
import Pickup from "../pages/Beach/Pickup";
import UserInfo from "../pages/UserInfo/UserInfo";
import Museum from "../pages/Museum/Museum";
import Change from "../pages/UserInfo/Change";
import MyBottle from "../pages/UserInfo/MyBottle";
import Advice from "../pages/UserInfo/Advice";
import MyEmail from "../pages/UserInfo/MyEmail"

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", redirect: "/Entrance" },
    {
      path: "/Login",
      name: "Login",
      component: Login,
    },
    {
      path: "/Register",
      name: "Register",
      component: Register,
    },
    {
      path: "/Forget",
      name: "Forget",
      component: Forget,
    },
    {
      path: "/Entrance",
      name: "Entrance",
      component: Entrance,
    },
    {
      path: "/Beach",
      name: "Beach",
      component: Beach,
    },
    {
      path: "/Throw",
      name: "Throw",
      component: Throw,
    },
    {
      path: "/Pickup",
      name: "Pickup",
      component: Pickup,
    },
    {
      path: "/UserInfo",
      name: "UserInfo",
      component:UserInfo,
    },
		{
			path:"/Museum",
			name:"Museum",
			component:Museum,
		},
		{
			path:"/Change",
			name:"Change",
			component:Change,
		},
		{
			path:"/MyBottle",
			name:"MyBottle",
			component:MyBottle,
		},
		{
			path:"/Advice",
			name:"Advice",
			component:Advice
		},
		{
			path:"/MyEmail",
			name:"MyEmail",
			component:MyEmail
		}
  ],
});

export default router;
