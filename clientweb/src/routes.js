import { lazy } from "react";

function getComponent(path) {
   return lazy(() => import(`${path}`));
}

export const defaultRoutes = [
   // {
   //    path: "/dangnhap",
   //    component: getComponent("./app/Modules/Login/components/Login")
   // },
   {
      default: true,
      path: "/",
      component: getComponent("./app/App/App")
   },
];

export const appRoutes = [
   {
      path: "/dangki",
      component: getComponent("./app/Modules/SignIn/components/SignIn")
   },
   {
      path: "/dangnhap",
      component: getComponent("./app/Modules/Login/components/Login")
   },
   {
      path: "/home",
      component: getComponent("./app/Modules/Home/components/Home")
   },
   {
      path: "/lotrinh",
      component: getComponent("./app/Modules/Route/components/Route")
   },
   {
      path: "/quanlitudien",
      component: getComponent("./app/Modules/DictionaryManagement/components/DictionaryManagement")
   },
   {
      path: "/setting",
      component: getComponent("./app/Modules/Settings/components/Settings")
   },
   {
      path: "/quanlichude",
      component: getComponent("./app/Modules/TopicManagement/components/TopicManagement")
   },
   {
      path: "/lichsu",
      component: getComponent("./app/Modules/History/components/History")
   },
   {
      path: "/yeuthich",
      component: getComponent("./app/Modules/Favorite/components/Favorite")
   },
   {
      path: "/timkiem",
      component: getComponent("./app/Modules/WordSearch/components/WordSearch")

   },
   {
      path: "/game",
      component: getComponent("./app/Modules/Game/components/Game")
   },
   {
      path: "/hoctienganhtheochude",
      component: getComponent("./app/Modules/LearnEnglishByTopic/components/LearnEnglishByTopic")
   },
   {
      path: "/game/menu",
      component: getComponent("./app/Modules/Game/components/Menu")
   },
   {
      path: "/game/taophong",
      component: getComponent("./app/Modules/Game/components/CreateRoom")
   },
   {
      path: "/game/danhsachphong",
      component: getComponent("./app/Modules/Game/components/RoomList")
   },
   {
      path: "/doimatkhau",
      component: getComponent("./app/Modules/Login/components/ChangePassword")
   },
   {
      path: "/quenmatkhau",
      component: getComponent("./app/Modules/Login/components/ForgotPassword")
   },
   { redirect: true, path: "/", to: '/home' }
];
