import keepNav from '../cmps/keep-nav.cmp.js';
import keepDev from '../cmps/keep-dev.cmp.js';
import keepList from '../cmps/keep-list.cmp.js';
import { keepService } from '../services/keep.service.js';
import keepCompose from '../cmps/keep-compose.cmp.js';

export default {
    template: `
    <section>
        <keep-nav />
        <keep-dev />
        <keep-compose />
        <keep-list :notes="fliterNotes"/>
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
    methods: {
        loadNotes() {
            return keepService.query()
                .then(notes => {
                    this.allNotes = notes;
                    return this.allNotes;
                })
        },
    },
    computed:{
        
        fliterNotes() {
            console.log(this.allNotes);
            return this.allNotes
        }
    },
    created() {
        this.loadNotes()
    },
    components: {
        keepNav,
        keepDev,
        keepList,
        keepCompose
    }
}