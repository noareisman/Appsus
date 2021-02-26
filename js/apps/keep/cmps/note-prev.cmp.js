import noteTodos from './note-todos.cmp.js';
import noteTxt from './note-txt.cmp.js';
import noteVideo from './note-video.cmp.js';
import noteImg from './note-img.cmp.js';
import { keepService } from '../services/keep.service.js';

export default {
    props: ['note'],
    template: `
        <section> 
                <div class="note-container">
                    <button @click="removeNote(note)">Remove</button>
                    <button @click="pinNote()">Pin</button>
                    <compotent v-if="note" :is="type" :info="info"/>
                    <i v-if="type" :class="setIcon"></i>
                </div>        
        </section>
        `,
    data() {
        return {
            id: null,
            type: null,
            // icon: null,
            pin: null,
            info: {},
            style: {}
        }
    },
    methods: {
        pinNote() {
            this.pin = true;
        },
        removeNote(note) {
            keepService.remove(note)
        },
    },
    computed: {
        setIcon() {
            switch (this.type) {
                case ('noteImg'):
                    return 'far fa-image'
                    break;
                case ('noteTodos'):
                    return 'fas fa-list'
                    break;
                case ('noteVideo'):
                    return 'fab fa-youtube'
                    break;
                case ('noteTxt'):
                    return 'fas fa-font'
                    break;

            }
        }
    },
    created() {
        if (this.note) {
            this.type = this.note.type,
                console.log(this.type, Date.now());
            this.pin = this.note.isPined,
                this.info = this.note.info,
                this.style = this.note.style,
                this.id = this.note.id
        }
    },
    components: {
        noteTodos,
        noteTxt,
        noteVideo,
        noteImg
    }

}

// < component : is = "cmp.type"  : info = "cmp.info" @setVal="setAns($event, idx)" ></component >