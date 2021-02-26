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
                </div>        
        </section>
        `,
    data() {
        return {
            id: null,
            type: null,
            pin: null,
            info: {},
            style: {}
        }
    },
    methods:{
        pinNote(){
            this.pin=true;
        },
        removeNote(note){
            keepService.remove(note)
        }
    },
    created() {
        if (this.note) {
            this.type = this.note.type,
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