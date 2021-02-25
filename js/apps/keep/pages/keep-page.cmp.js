import keepNav from '../cmps/keep-nav.cmp.js';
import keepDev from '../cmps/keep-dev.cmp.js';
import keepInput from '../cmps/keep-input.cmp.js';
import keepList from '../cmps/keep-list.cmp.js';
import { keepService } from '../services/keep.service.js';
export default {

    template: `
    <section>
        <keep-nav />
        <keep-dev />
        <keep-input />
        <keep-list />
    </section>
    `,
    data() {
        return {
            allNotes: null
        }
    },
    created() {
        this.allNotes = loadNotes()
    },
    methods: {
        loadNotes() {
            return keepService.query()
                .then(notes => {
                    this.allNotes = notes
                    return this.allMsgs
                })
        },
    },
    components: {
        keepNav,
        keepDev,
        keepInput,
        keepList
    }
}