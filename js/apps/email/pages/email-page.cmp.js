import emailList from '../cmps/email-list.cmp.js';
import emailDev from '../cmps/email-dev.cmp.js';
import emailNav from '../cmps/email-nav.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';
import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';


export default {
    template: `
    <section>
        <email-nav />
        <section class="main-content flex">
            <email-dev />
            <div>
                <email-list v-if="isList" eventBus :msgs="filterMsgs"/>
                <email-compose v-if="isCompose" />
            </div>
            <!-- <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook" />
            <book-details v-else :book="selectedBook" @close="selectedBook=null" />  -->
            
        </section>
        
    </section>
    `,
    data() {
        return {
            isCompose: null,
            isList: null,
            isDetails: null,
            allMsgs: null,
            msgs: null,
            filter: null,
            searchedStr: '',
        }
    },
    methods: {
        loadEmails() {
            return emailService.query()
                .then(msgs => {
                    this.allMsgs = msgs
                    return this.allMsgs
                })
        },
    },
    computed: {
        filterMsgs() {
            var currFilter = this.filter;
            var str = this.searchedStr;
            if (!currFilter) {
                if (!str) {
                    return this.allMsgs;
                } else {
                    return this.allMsgs.filter((msg) => {
                        return msg.body.includes(str) ||
                        msg.participants.sender.includes(str)||
                        msg.subject.includes(str)
                    })
                }
            } else {
                if (!str) {
                    return this.allMsgs.filter((msg) => { return msg.filters[currFilter] })
                } else {
                    var filteredMsgs = this.allMsgs.filter((msg) => { return msg.filters[currFilter] })
                    filteredMsgs.filter((msg) => {
                        return msg.body.includes(str) || 
                        msg.participants.sender.includes(str)||
                        msg.subject.includes(str)  
                    })
                    return filteredMsgs
                }
            }
        }
    },

    created() {
        this.isList = true;
        this.isCompose = false;
        this.isDetails = false;
        this.loadEmails();
        eventBus.$on('remove', (msg) => {
            emailService.msgToTrash(msg)
                .then(() => this.loadEmails())
        })
        eventBus.$on('filtered', (filter) => { this.filter = filter })
        eventBus.$on('search', (searchedStr) => {
            this.searchedStr = searchedStr
        })
        eventBus.$on('compose', () => {
            this.isList = false;
            this.isCompose = true;
        })
        eventBus.$on('email', () => {
            this.isCompose = false;
            this.isList = true;
        })
        eventBus.$on('newMsg', (msg) => {
            console.log('we moved here', msg);
            emailService.saveNewMsg(msg)
                .then(() => this.loadEmails())

        })
    },
    destroyed() {
        eventBus.$off('remove', (msg) => {
            emailService.msgToTrash(msg)
                .then(() => this.loadEmails())
        })
        eventBus.$off('filtered', (filter) => { this.filter = filter })
        eventBus.$off('newMsg', () => { })
    },

    components: {
        emailList,
        emailDev,
        emailNav,
        emailCompose
    }
}