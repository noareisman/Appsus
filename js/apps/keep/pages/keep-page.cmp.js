import keepNav from '../cmps/keep-nav.cmp.js';
import keepDev from '../cmps/keep-dev.cmp.js';
import keepList from '../cmps/keep-list.cmp.js';
import { keepService } from '../services/keep.service.js';
import keepCompose from '../cmps/keep-compose.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailComposeCmp from '../../email/cmps/email-compose.cmp.js';

export default {
    template: `
    <section>
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
            if (!this.allNotes) {
                return [{
                        id: 'TempTry1',
                        type: 'noteTxt',
                        isPinned: false,
                        info: {
                            txt: 'Fullstack Me Baby!'
                        },
                        style: {
                            backgroundColor: 'white',
                            color: 'black'
                        }
                    },
                    {
                        id: 'TempTry2',
                        type: 'noteImg',
                        isPinned: false,
                        info: {
                            url: '',
                            title: 'Me playing Mi'
                        },
                        style: {
                            backgroundColor: '#00d',
                            color: 'black'
                        }
                    },
                    {
                        id: 'TempTry3',
                        type: 'noteTodos',
                        isPinned: false,
                        info: {
                            label: 'How was it:',
                            todos: [
                                { txt: 'Do that', doneAt: null },
                                { txt: 'Do this', doneAt: 187111111 }
                            ]
                        },
                        style: {
                            backgroundColor: 'white',
                            color: 'black'
                        }
                    },
                    {
                        id: 'TempTry4',
                        type: 'noteVideo',
                        isPinned: false,
                        info: {
                            url: '',
                            title: 'Me playing Mi'
                        },
                        style: {
                            backgroundColor: 'white',
                            color: 'black'
                        }
                    }
                ]
            } else {
                return this.allNotes
            }

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