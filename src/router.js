import Vue from 'vue'
import Router from 'vue-router'
import ItemHTML from '@/views/item.html'

Vue.use(Router)

const toComponent = (html) => ({
  render (createElement) {
    return createElement('div', {
      domProps: {
        innerHTML: html
      }
    })
  }
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index.html')
        .then(({ default: IndexHTML }) => toComponent(IndexHTML))
    },
    {
      path: '/item',
      name: 'item',
      component: toComponent(ItemHTML)
    }
  ]
})
