import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Cat = ()=>import("@/components/Cat")
const Dog = ()=>import("@/components/Dog")
const HelloWorld = ()=>import("@/components/HelloWorld")

export default new Router({
  routes: [
    {
      path: '/Cat',
      component: Cat
    },
    {
      path: '/Dog',
      component: Dog
    },
    {
      path: '/HelloWorld',
      component: HelloWorld
    }
  ]
})