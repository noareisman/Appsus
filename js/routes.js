import homePage from './pages/home-page.cmp.js'
import emailPage from './pages/email-page.cmp.js'
import keepPage from './pages/keep-page.cmp.js'
import bookPage from './pages/book-page.cmp.js'


const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/email',
        component: emailPage,
    },
    {
        path: '/keep',
        component: keepPage,
    },
    {
        path: '/book',
        component: bookPage,
    },

]

export const myRouter = new VueRouter({ routes })