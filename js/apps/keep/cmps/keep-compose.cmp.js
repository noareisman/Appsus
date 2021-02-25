import { eventBus } from '../../../services/event-bus.service.js';
export default {
    template: `
        <section> 
            <div class="new-keep">

                <div class="line1 flex center">
                    <input type="text" placeholder="Header..." />
                    <div class="icons flex space-around">

                        <div class="icon" @click="activeNewKeep" ref="imageKeep">
                            <img src="images/keepType/imagekeep.webp" alt="" />
                        </div>
                        
                        <div class="icon" @click="activeNewKeep" ref="textKeep">
                            <img src="images/keepType/textkeep.png" alt="" />
                        </div>
                        
                        <div class="icon" @click="activeNewKeep" ref="todosKeep">
                            <img src="images/keepType/todokeep.png" alt="" />
                        </div>
                        
                        <div class="icon" @click="activeNewKeep" ref="videoKeep">
                            <img src="images/keepType/videokeep.webp" alt="" />
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
            console.log(ev.target.value);
            this.newKeep = true

        }
    },
    created() {
        eventBus.$emit('savedNote', this.keep);
    }

}