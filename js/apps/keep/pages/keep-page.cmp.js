import keepNav from '../cmps/keep-nav.cmp.js';
import keepDev from '../cmps/keep-dev.cmp.js';
import keepList from '../cmps/keep-list.cmp.js';
import { keepService } from '../services/keep.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import keepCompose from '../cmps/keep-compose.cmp.js';
import emailComposeCmp from '../../email/cmps/email-compose.cmp.js';

export default {
    template: `
    <section class="keep-app-main-container flex column align-center">
        <keep-nav class="keep-main-nav" />
        <div class="keep-body flex">
            <keep-dev class="keep-dev-container"/>
                <div class="flex column align-center">
                    <keep-compose/>
                    <keep-list v-if="allNotes" :notes="filterNotes" :pinnedNotes="pinnedNotesToShow"/>
                </div>
        </div>
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
        reloadNotes() {
            this.allNotes = this.loadNotes()
                .then(() => {
                    console.log('notes reloaded', this.allNotes)
                    return
                })
        }
    },
    computed: {
        pinnedNotesToShow() {
            return this.allNotes.filter(note => note.isPinned);
        },
        filterNotes() {
            return this.allNotes.filter(note => !note.isPinned)

        }
    },
    created() {
        this.loadNotes();
        eventBus.$on('save-keep', () => this.loadNotes())
        eventBus.$on('removeNote', this.reloadNotes)
        eventBus.$on('togglePin', this.reloadNotes)
    },
    components: {
        keepNav,
        keepDev,
        keepList,
        keepCompose
    }
}