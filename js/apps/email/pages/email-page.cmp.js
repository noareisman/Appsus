import emailList from '../cmps/email-list.cmp.js';
import emailDev from '../cmps/email-dev.cmp.js';
import emailNav from '../cmps/email-nav.cmp.js';
import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';


export default {
    template: `
    <section>
        <email-nav/>

        <section class="main-content">
            <email-dev />
                <!-- <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook" />
                <book-details v-else :book="selectedBook" @close="selectedBook=null" />  -->
            <email-list eventBus :msgs="msgs" @filtered="filterMsgs(filter)"/>
        </section>
        
    </section>
    `,
    data() {
        return {
            isList: null,
            isDetails: null,
            msgs: null,
            // filterBy: null
        }
    },
    methods: {
        loadEmails() {
            return emailService.query()
                .then(msgs => {
                    this.msgs = msgs
                    return this.msgs
                })
        },
    },
    computed:{
        filterMsgs(filter) {
            if (!filter) return this.msgs;
            var currFilter=filter;
            console.log(filter);
            this.msgs=emailService.query().filter((msg)=>{
                return msg.filters[currFilter]
            })
          },
    },
    created() {
        this.isList = true;
        this.isDetails = false;
        this.loadEmails();
        eventBus.$on('remove', (msg) => {
            emailService.removeMsg(msg)
                .then(() => this.loadEmails())
        });
    },

    components: {
        emailList,
        emailDev,
        emailNav
    }
}