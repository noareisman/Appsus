import keepNav from '../cmps/keep-nav.cmp.js';
import keepDev from '../cmps/keep-dev.cmp.js';
import keepList from '../cmps/keep-list.cmp.js';
import { keepService } from '../services/keep.service.js';
import keepCompose from '../cmps/keep-compose.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailComposeCmp from '../../email/cmps/email-compose.cmp.js';

export default {
    template: `
    <section class="keep-app-main-container">
        <keep-nav />
        <keep-dev />
        <keep-compose />
        <keep-list v-if="allNotes" :notes="fliterNotes"/>
    </section>
    `,
    data() {
        return {
            allNotes: null,
            notes: null,
            filter: null,
            searchStr: ''
        }
    },
    created() {
        this.allNotes = loadNotes()
    },
    methods: {
        loadNotes() {
            return keepService.query()
                .then(notes => {
                    this.allNotes = notes;
                    return this.allNotes;
                })
        },
    },
    computed: {
        fliterNotes() {
                return this.allNotes
        }
    },
    created() {
        this.loadNotes();
        eventBus.$on('save-keep', () => this.loadNotes())
    },
    components: {
        keepNav,
        keepDev,
        keepList,
        keepCompose
    }
}