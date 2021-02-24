import emailList from '../cmps/email-list.cmp.js';
import emailDev from '../cmps/email-dev.cmp.js';
import emailNav from '../cmps/email-nav.cmp.js';
import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';


export default {
    template: `
    <section>
        <email-nav />

        <section class="main-content">
            <email-dev />
                <!-- <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook" />
                <book-details v-else :book="selectedBook" @close="selectedBook=null" />  -->
            <email-list eventBus :msgs="filterMsgs"/>
        </section>
        
    </section>
    `,
    data() {
        return {
            isList: null,
            isDetails: null,
            msgs: null,
            filter: null
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
    computed: {
        filterMsgs() {
            if (!this.filter) {
                return this.msgs;
            } else {
                var currFilter = this.filter;
                var filteredMsgs = this.msgs.filter((msg) => { return msg.filters[currFilter] })
                return filteredMsgs
            }
        },
    },
    created() {
        this.isList = true;
        this.isDetails = false;
        this.loadEmails();
        eventBus.$on('remove', (msg) => {
            emailService.removeMsg(msg)
                .then(() => this.loadEmails())
        })
        eventBus.$on('filtered', (filter) =>{this.filter = filter})
    },
    destroyed(){
        eventBus.$off('remove', (msg) => {
            emailService.removeMsg(msg)
                .then(() => this.loadEmails())
        })
        eventBus.$off('filtered', (filter) =>{this.filter = filter})
    },

    components: {
        emailList,
        emailDev,
        emailNav
    }
}