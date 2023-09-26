import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home";
import Movies from "../views/Movies"


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/movies",
    name: "movies",
    component: Movies
  },  
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }

];
function scrollBehavior(){
  return { x: 0, y: 0 };
}
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior
});

export default router;
