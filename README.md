# vue-router-on-bootstrap-templates

## Steps

1. Generate with @vue/cli 3
   [`f80188f`](https://github.com/VitorLuizC/vue-router-on-bootstrap-templates/commit/f80188fb6e200c84e1980da91931b821afafcbab).

   Use NPM (or Yarn) to add `@vue/cli` to global modules.

   ```sh
   npm install --global @vue/cli

   # For Yarn use the command below.
   yarn global add @vue/cli
   ```

   Use `@vue/cli` to generate your project.

   ```sh
   vue create [project]
   ```

2. Paste your template/theme
   [`4129e71`](https://github.com/VitorLuizC/vue-router-on-bootstrap-templates/commit/4129e71b62d8286bcf5198c23acb33b02f53c2b6).  

   Just paste your template/theme as is to simplify other steps.

   ```diff
   [project]/
     *
   + [template]/
   +   * 
   ```

   This is silly, and you can use your SO's explorer or just `cp`.

   ```sh
   cp [template]/ [project]/
   ```

3. Move your template assets to `public/`
   [`189c583`](https://github.com/VitorLuizC/vue-router-on-bootstrap-templates/commit/189c583c5fcbbc9555af441c499973b3c1402991).

   `@vue/cli` provides a `public/` directory to serve its content as app root.

   ```path
   [project]/
     *
     public/
       *
       index.html
   ```
   
   If you don't want to adjust and/or change template/theme assets, just move it to `public/` and preservs its directories.
   
   ```diff
   [project]/
     *
     public/
   +   assets/ <-- Your theme assets
   +     css/
   +       *
   +     js/
   +       *
   +     *
   ```

4. Remove @vue/cli generated assets (except `index.html`) on `public/`
   [`116379f`](https://github.com/VitorLuizC/vue-router-on-bootstrap-templates/commit/116379fff7d53347f3d90e78de49678632db66eb).

   You don't need them (except `index.html`), just remove it.

5. Move HTML structure `<!DOCTYPE html><html><head> ...` from pages to `public/index.html` and preserve its `<div id="app">`
   [`116379f`](https://github.com/VitorLuizC/vue-router-on-bootstrap-templates/commit/116379fff7d53347f3d90e78de49678632db66eb),
   [`f1c3636`](https://github.com/VitorLuizC/vue-router-on-bootstrap-templates/commit/f1c3636d8c618bf5011872a6d4b9c0263456b81d).

   `@vue/cli` generates `public/index.html`. This is **the sigle page** and very important, because it orquestrates SPA modules and views (other pages).

   So, move structure (doctype, basic structure and content imports like `<meta>`, `<link>`, `<script>` etc) to `public/index.html` instead of every page carring its own structure.

   ```diff
   <!-- [template]/pages.html -->
   
   - <doctype HTML>
   - <html lang="en">
   -   <head>
   -      ...
   -   <body data-menu="false">
         ... <!-- Preserve pages contents -->
   -   </body>
   - </html>
   ```

6. Remove @vue/cli generated components and views from `src/`
   [`f1c3636`](https://github.com/VitorLuizC/vue-router-on-bootstrap-templates/commit/f1c3636d8c618bf5011872a6d4b9c0263456b81d).

   You don't need them.

7. Set `raw-loader` to import HTML files on JavaScript modules
   [`db1e410`](https://github.com/VitorLuizC/vue-router-on-bootstrap-templates/commit/db1e41083827a8b8da55d98de72731fc56afd468).

   Install `raw-loader` as a dev dependencie with NPM (or Yarn).

   ```sh
   npm install --save-dev raw-loader

   # For Yarn use the command below.
   yarn add -D raw-loader
   ```

   Create `vue.config.js` to add this custom setting on webpack.

   ```js
   module.exports = {
     chainWebpack: (webpack) => {
       webpack.module
         .rule('html')
           .test(/\.html$/)
           .use('raw-loader')
             .loader('raw-loader')
             .end()
     }
   }
   ```

8. Delete `App.vue` and use `router-view` as root component
   [`bb0ed14`](https://github.com/VitorLuizC/vue-router-on-bootstrap-templates/commit/bb0ed1489b6f2d19273ca619ee6c3aa8a9dfadf7).

   On `main.js` remove `App.vue` import and render `router-view` as root component.

   ```js
   import Vue from 'vue'
   import router from './router'
   import './registerServiceWorker'

   new Vue({
     router,
     render: (createElement) => createElement('router-view')
   }).$mount('#app')
   ```

9. Create `toComponent` helper and change `router.js`
   [`db1e410`](https://github.com/VitorLuizC/vue-router-on-bootstrap-templates/commit/db1e41083827a8b8da55d98de72731fc56afd468).

   `toComponent` is a function that receives HTML content and returns a Vue functional component structure with a `<div>` wrapping HTML content as is.

   ```js
   const toComponent = (innerHTML) => ({
     functional: true,
     render: (createElement) => {
       return createElement('div', {
         domProps: {
           innerHTML
         }
       });
     }
   });
   ```

   Use `toComponent` on `router.js` to define pages as route components.

   ```js
   import Vue from 'vue'
   import Router from 'vue-router'
   import IndexHTML from '@/views/index.html'

   // ...

   Vue.use(Router)

   export default new Router({
     mode: 'history',
     base: process.env.BASE_URL,
     routes: [
       {
         path: '/',
         name: 'home',
         component: toComponent(IndexHTML)
       },
       {
         path: '/item',
         name: 'item',
         component: () => (
           import('@/views/index.html')
             .then((module) => toComponent(module.default))
       }
     ]
   })
   ```