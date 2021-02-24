import emailList from '../cmps/email-list.cmp.js';
import emailDev from '../cmps/email-dev.cmp.js';
import emailNav from '../cmps/email-nav.cmp.js';
import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';


export default {
    template: `
    <section>
        <email-nav @filtered="filterMsgs(filter)"/>

        <section class="main-content">
            <email-dev />
                <!-- <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook" />
                <book-details v-else :book="selectedBook" @close="selectedBook=null" />  -->
            <email-list eventBus :msgs="showMsgs" />
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
            var currFilter=filter;
            if (!currFilter) return this.msgs;
            this.msgs=emailService.query().filter((msg)=>{
                return msg.filters[currFilter]
            })
          },
    },
    computed: {
        showMsgs() {
            return this.msgs
        }
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