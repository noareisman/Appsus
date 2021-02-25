import { eventBus } from '../../../services/event-bus.service.js';
import { keepService } from '../services/keep.service.js';

export default {
    template: `
        <section> 
            <div class="new-keep">

                <div class="line1 flex center">
                    <input @click="activateNewKeep" type="text" placeholder="Header..." />
                    <div class="icons flex space-around">

                        <div class="icon iText"  ref="textKeep">
                            <img  @click="activateNewKeep" src="images/keepType/textkeep.webp" alt="" />
                        </div>

                        <div class="icon iImage" ref="imageKeep">
                            <img @click="activateNewKeep"  src="images/keepType/imagekeep.webp" alt="" />
                        </div>
                        
                        <div class="icon iVideo" ref="videoKeep">
                            <img @click="activateNewKeep"  src="images/keepType/videokeep.webp" alt="" />
                        </div>
                        
                        <div class="icon iTodos" ref="todosKeep">
                            <img  @click="activateNewKeep" src="images/keepType/todokeep.webp" alt="" />
                        </div>
                        
                    </div>
                </div>
                <hr />
                
                <div v-if="newKeep" class="line2 flex">

                    <textarea class="keep-text-area" @click="focus" :placeholder="noteType" name="Text1" cols="100"></textarea>
                    <button class="sentKeep" @click="saveNote"><img src="/images/sendkeep.png" alt="" /></button>
                </div>

            </div>
        </section>
    `,
    data() {
        return {
            newKeep: null
        }
    },
    computed: {
        noteType() {
            switch (this.newKeep.type) {
                case 'noteImg':
                    return 'Enter image URL...';

                case 'noteVideo':
                    return 'Enter video URL...';
                case 'noteTodos':
                    return 'Enter comma separated list...';
            }
            return 'Enter text here...';
        }
    },
    methods: {
        activateNewKeep(ev) {

            const els = this.$refs;
            const elsArr = Object.keys(els).map((el) => [els[el]]);

            let val = ev.target.src.slice(38, -5);
            let currEl;

            if (ev.target.type === 'text' && this.newKeep) return;
            if (ev.target.type === 'text') val = 'textkeep';

            switch (val) {
                case 'imagekeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = this.$refs.imageKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';

                    this.newKeep = keepService.newKeep('noteImg')
                    break;

                case 'textkeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = this.$refs.textKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';

                    this.newKeep = keepService.newKeep('noteTxt')
                    break;

                case 'todokeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = this.$refs.todosKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';

                    this.newKeep = keepService.newKeep('noteTodos')
                    break;

                case 'videokeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = this.$refs.videoKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';

                    this.newKeep = keepService.newKeep('noteVideo')
                    break;
            }

            // this.newKeep = true
        },
        focus() {
            console.log('focus');
        },
        saveNote() {
            console.log('saved a note');
        }
    },
    created() {
        eventBus.$emit('savedNote', this.keep);
    }

}