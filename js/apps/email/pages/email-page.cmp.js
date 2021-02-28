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
            <div class="list-new-msg-container">
                <email-list v-if="isList" :msgs="filterMsgs"/>
                <email-compose v-if="isCompose" />
            </div>
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
            trash: null
        }
    },
    methods: {
        loadEmails() {
            return emailService.query()
                .then(msgs => {
                    this.allMsgs = msgs.filter((msg) => { return !msg.filters.trash })
                    this.trash = msgs.filter((msg) => { return msg.filters.trash })
                    return
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
                            msg.participants.sender.includes(str) ||
                            msg.subject.includes(str)
                    })
                }
            } else {
                if (currFilter === 'trash') {
                    return this.trash
                } else {
                    if (!str) {
                        return this.allMsgs.filter((msg) => { return msg.filters[currFilter] })
                    } else {
                        var filteredMsgs = this.allMsgs.filter((msg) => { return msg.filters[currFilter] })
                        return filteredMsgs.filter((msg) => {
                            return msg.body.includes(str) ||
                                msg.participants.sender.includes(str) ||
                                msg.subject.includes(str)
                        })
                    }
                }
            }
        }
    },

    created() {
        this.isList = true;
        this.isCompose = false;
        this.isDetails = false;
        this.loadEmails();
        eventBus.$on('filtered', (filter) => { this.filter = filter })
        eventBus.$on('trash', (msg) => {
            if (this.filter === 'trash') {
                return emailService.removeMsg(msg)
                    .then(() => {
                        this.loadEmails()
                        return
                    })
                    .then(() => {
                        this.filterMsgs
                        return
                    })
            } else {
                this.loadEmails()
                    .then(this.filterMsgs)
            }
        })
        eventBus.$on('reloadMails', () => {
            this.loadEmails()
                .then(this.filterMsgs)
        })
        eventBus.$on('search', (searchedStr) => { this.searchedStr = searchedStr })
        eventBus.$on('compose', () => {
            this.isList = false;
            this.isCompose = true;
        })
        eventBus.$on('email', () => {
            this.isCompose = false;
            this.isList = true;
        })
        eventBus.$on('newMsg', (msg) => {
            emailService.saveNewMsg(msg)
                .then(() => this.loadEmails())
        })
    },
    destroyed() {
        eventBus.$off('filtered', (filter) => { this.filter = filter })
        eventBus.$off('newMsg', () => {})
    },

    components: {
        emailList,
        emailDev,
        emailNav,
        emailCompose
    }
}