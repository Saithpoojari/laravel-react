import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from './layout/Layout'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    let page= pages[`./Pages/${name}.jsx`]
    // page.default.layout = null || (page => <Layout children={page} />)
    if(typeof page.default.layout == 'undefined'){
      page.default.layout =(page)=> <Layout>{page}</Layout>
    }
    return page    
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})