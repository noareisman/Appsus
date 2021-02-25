import { eventBus } from '../../../services/event-bus.service.js';
export default {
    template: `
        <section> 
            <div class="new-keep">

                <div class="line1 flex center">
                    <input type="text" placeholder="Header..." />
                    <div class="icons flex space-around">

                        <div class="icon iImage" ref="imageKeep">
                            <img @click="activeNewKeep"  src="images/keepType/imagekeep.webp" alt="" />
                        </div>
                        
                        <div class="icon iText"  ref="textKeep">
                            <img  @click="activeNewKeep" src="images/keepType/textkeep.webp" alt="" />
                        </div>
                        
                        <div class="icon iTodos" ref="todosKeep">
                            <img  @click="activeNewKeep" src="images/keepType/todokeep.webp" alt="" />
                        </div>
                        
                        <div class="icon iVideo" ref="videoKeep">
                            <img @click="activeNewKeep"  src="images/keepType/videokeep.webp" alt="" />
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
            return 'New note...';
        }
    },
    methods: {
        activeNewKeep(ev) {
            let currEl;
            const val = ev.target.src.slice(38, -5);
            const els = this.$refs;
            const elsArr = Object.keys(els).map((el) => [els[el]]);

            switch (val) {
                case 'imagekeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = this.$refs.imageKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';
                    break;
                case 'textkeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = this.$refs.textKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';
                    break;
                case 'todokeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = this.$refs.todosKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';
                    break;
                case 'videokeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = this.$refs.videoKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';
                    break;
            }

            this.newKeep = true
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