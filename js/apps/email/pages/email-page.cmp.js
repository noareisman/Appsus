import emailList from '../cmps/email-list.cmp.js';
import emailDev from '../cmps/email-dev.cmp.js';
import emailNav from '../cmps/email-nav.cmp.js';
import { emailService } from '../services/email.service.js';


export default {
    template: `
    <section>
        <email-nav />

        <section class="main-content">
            <email-dev />
            <email-list :msgs="msgs" />
        </section>
        
    </section>
    `,
    data() {
        return {
            isList: null,
            isDetails: null,
            msgs: null
        }
    },
    methods: {
        loadEmails() {
            return emailService.query()
                .then(msgs => {
                    this.msgs = msgs
                    console.log(this.msgs);
                    return this.msgs
                })
        }
    },
    created() {
        this.isList = true;
        this.isDetails = false;
        this.loadEmails();
    },
    components: {
        emailList,
        emailDev,
        emailNav
    }
}