import { eventBus } from '../../../services/event-bus.service.js';
import {emailService} from '../services/email.service.js'
export default {
    template: `
        <section> 
            <nav class="flex email-nav space-between align-center" >
                <div class="email-logo">Email</div>    
                <form>
                    <span>Filter by</span>
                    <!-- <input v-model="searchStr" @input="setSearch" type="text" placeholder="Search..." > -->
                    <select v-model="filterBy" @change="setFilter" name="msg-filter-selector">
                        <option value="all">All</option>
                        <option value="inbox">Inbox</option>
                        <option value="sent">Sent</option>
                        <option value="important">Important</option>
                        <option value="unread">Unread</option>
                        <option value="viewed">Viewed</option>
                        <option value="draft">Drafts</option>
                        <option value="trash">Trash</option>
                    </select>
                </form>
                <button class="new-mail-btn" @click="openComposeMsg">New email</button>
            </nav>
    
        </section>
    `,
    data() {
        return {
            searchedStr: null,
            filterBy: "inbox",
        }
    },
    methods: {
        setFilter() {
            var filter= this.filterBy;
            eventBus.$emit('filtered', filter)
        },
        openComposeMsg(){
            eventBus.$emit('compose', true)
        }
    }
}