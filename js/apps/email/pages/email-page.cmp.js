import emailList from '../cmps/email-list.cmp.js';
import emailDev from '../cmps/email-dev.cmp.js';
import emailNav from '../cmps/email-nav.cmp.js';


export default {
    template: `
    <section>
        <email-nav />

        <section class="main-content">
            <email-dev />
            <email-list />
        </section>
        
    </section>
    `,
    data() {
        return {
            list: null,
            details: null
        }
    },
    created() {
        this.list = true;
        this.details = false
    },
    components: {
        emailList,
        emailDev,
        emailNav
    }
}