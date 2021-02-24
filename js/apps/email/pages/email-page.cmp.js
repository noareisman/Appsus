import emailList from '../cmps/email-list.cmp.js';
import emailDev from '../cmps/email-dev.cmp.js';
import emailNav from '../cmps/email-nav.cmp.js';


export default {
    template: `
    <section>
        <email-nav />

        <section class="main-content">
            <email-dev />
            <email-list :msgs="msgsToDisplay"/>
        </section>
        
    </section>
    `,
    data() {
        return {
            list: null,
            details: null
        }
    },
    computed: {
        msgsToDisplay() {
            return [{
                id: 1,
                subject: 'Wassap?',
                body: 'bla bla',
                isRead: false,
                sentAt: 1551133930594
            }]
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