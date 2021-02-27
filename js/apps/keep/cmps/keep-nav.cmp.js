import { eventBus } from '../../../services/event-bus.service.js';

export default {
    template: `
        <section>
            <nav class="keep-nav flex align-center space-around" >
            <div class="">   
                <input v-model="searchedStr" @input="searchByStr" type="text" placeholder="Search note..." />
                <select v-model="filterBy" @change="setFilter" name="keep-filter-selector">
                    <option value="all">All</option>
                    <option value="inbox">Video</option>
                    <option value="sent">Audio</option>
                    <option value="sent">Text</option>
                    <option value="sent">list</option>
                </select>
            </div>
            </nav> 
        </section>
    `,
    data() {
        return {
            filterBy: "all",
            searchedStr: null,
        }
    },
    methods: {
        setFilter() {
            var filter = this.filterBy;
            eventBus.$emit('filtered', filter)
        },
        searchByStr() {
            eventBus.$emit('search', this.searchedStr)
        },
    },
    created() {
        eventBus.$on('filtered', (filter) => { this.filter = filter })
        eventBus.$on('search', (searchedStr) => { this.searchedStr = searchedStr })
    }
}