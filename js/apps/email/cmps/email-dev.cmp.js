import { eventBus } from '../../../services/event-bus.service.js';
export default {
    template: `
        <section class="email-dev-container"> 
            <ul class="email-dev-item">
                <li @click="setFilter('inbox')">Inbox</li>
                <li @click="setFilter('sent')">Sent</li>
                <li @click="setFilter('draft')">Drafts</li>
                <li @click="setFilter('trash')">Trash</li>
            </ul>
        </section>
    `,
    data(){
        return{
            filterBy: null
        }
    },
    methods:{
        setFilter(filter) {
            this.filterBy=filter;
            eventBus.$emit('filtered', filter)
        },
    }
}