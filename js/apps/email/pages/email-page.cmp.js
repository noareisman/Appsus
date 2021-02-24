import emailList from '../cmps/email-list.cmp.js';
import emailDev from '../cmps/email-dev.cmp.js';
import emailNav from '../cmps/email-nav.cmp.js';
import { emailService } from '../services/email.service.js';


export default {
    template: `
    <section>
        <email-nav @filtered="filterMsgs(filter)"/>

        <section class="main-content">
            <email-dev />
            <email-list :msgs="msgs" />
                <!-- <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook" />
                <book-details v-else :book="selectedBook" @close="selectedBook=null" />  -->
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