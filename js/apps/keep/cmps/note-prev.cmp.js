import noteTodos from './note-todos.cmp.js';
import noteTxt from './note-txt.cmp.js';
import noteVideo from './note-video.cmp.js';
import noteImg from './note-img.cmp.js';
import { keepService } from '../services/keep.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
    props: ['note'],
    template: `
        <section class="note-container flex column" :style="{'background-color':style.backgroundColor}"> 
                <button class="pin-btn" @click="pinNote()"><i class="fas fa-thumbtack"></i></button>
                <compotent v-if="note" :is="type" :info="info" :style="{'color':style.\color}"/>
                <div class="flex space-between">
                    <i v-if="type" class="note-type-icon" :class="setIcon"></i>
                    <div class="action-btns">      
                        <button @click="sendNote(note)"><i class="far fa-paper-plane"></i></button>      
                        <button @click="editNote(note)"><i class="fas fa-edit"></i></button>      
                        <button @click="removeNote(note)"><i class="far fa-trash-alt"></i></button>      
                    </div>
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
    methods: {
        pinNote() {
            // keepService.ge(note)
            // .then (()=>{
            //     eventBus.$emit('removeNote')
            //     return
            // })
        },
        removeNote(note) {
            keepService.removeKeep(note)
            .then (()=>{
                eventBus.$emit('removeNote')
                return
            })
        },
    },
    computed: {
        setIcon() {
            switch (this.type) {
                case ('noteImg'):
                    return 'far fa-image';
                case ('noteTodos'):
                    return 'fas fa-list'
                case ('noteVideo'):
                    return 'fab fa-youtube'
                case ('noteTxt'):
                    return 'fas fa-font';
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