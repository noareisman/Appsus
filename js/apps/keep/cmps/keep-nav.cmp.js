import { eventBus } from '../../../services/event-bus.service.js';
import keepInput from '../cmps/keep-input.cmp.js';

export default {
    template: `
    <section>
            <nav class="flex email-nav space-between align-center" >
                <div class="keep-logo">Keep</div>    
                <form>
                    <keep-input />
                    <!-- <input v-model="newNoteTxt" @input="txt" type="text" placeholder="New note..." /> -->
                    <select v-model="filterBy" @change="setFilter" name="keep-filter-selector">
                        <option value="all">All</option>
                        <option value="inbox">Video</option>
                        <option value="sent">Audio</option>
                        <option value="sent">Text</option>
                    </select>
                </form>
            </nav> 
    </section>
    `,
    data() {
        return {
            filterBy: "all",
            newNoteTxt: null
        }
    },
    methods: {
        setFilter() {
            var filter = this.filterBy;
            eventBus.$emit('filtered', filter)
        }
    },
    components: {
        keepInput
    }
}