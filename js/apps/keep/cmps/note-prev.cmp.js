// import noteTodos from './note-todos.cmp.js';
// import noteTxt from './note-txt.cmp.js';
// import noteVideo from './note-video.cmp.js';
import noteImg from './note-img.cmp.js';
import { keepService } from '../services/keep.service.js';

export default {
    props: ['note'],
    template: `
        <section> 
                <div class="note-container">
<<<<<<< HEAD
                    <button @click="pin">Pin</button>        
                    <button @click="Edit">Edit</button>
                    <compotent :is="type" :info="info"/>
=======
                    <!-- <compotent :is="type" :info="info"/> -->
>>>>>>> 7bc8ad84f1110f68b4e410b636e5c73b33386bfe
                    <pre :style="{color: style.color}">{{this.txt}}</pre>
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
<<<<<<< HEAD
=======
    components: {
        // noteTodos,
        // noteTxt,
        // noteVideo,
        noteImg
    },
>>>>>>> 7bc8ad84f1110f68b4e410b636e5c73b33386bfe
    created() {
        this.type = this.note.type,
            this.pin = this.note.isPined,
            this.info = this.note.info,
            this.style = this.note.style,
            this.id = this.note.id
    },
    components: {
        noteTodos,
        noteTxt,
        noteVideo,
        noteImg
    }

}

// < component : is = "cmp.type"  : info = "cmp.info" @setVal="setAns($event, idx)" ></component >