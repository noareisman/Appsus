import homePage from './pages/home-page.cmp.js';
import emailPage from './apps/email/pages/email-page.cmp.js';
import keepPage from './apps/keep/pages/keep-page.cmp.js';
import emailDetails from './apps/email/pages/email-details.cmp.js';


const routes = [{
        path: '/',
        component: homePage,
    },
    {
        path: '/email',
        component: emailPage,
        children: [{
            path: 'details/:emailId',
            component: emailDetails
        }]
    },
    {
        path: '/keep',
        component: keepPage,
    },

]
export const myRouter = new VueRouter({ routes })