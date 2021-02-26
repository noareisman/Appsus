import { eventBus } from '../../../services/event-bus.service.js';
import { keepService } from '../services/keep.service.js';
import newNote from '../cmps/new-note.cmp.js';

export default {
    template: `
        <section  class="new-keep"> 
                <div class="line1 flex center">
                    <input @click="activateNewKeep" class="title-input" v-model="titleDesc" type="text" placeholder="Title..." />
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
                <section v-if="newKeep && newKeep.type !== 'noteTxt' && newKeep.type !== 'noteTodos'"  class="note-types">
                    <hr />
                    <input class="url-input" v-model="urlDesc" type="text" :placeholder="noteType" />
                </section>
                <hr />
                
                <new-note  @save="saveNote" v-if="newKeep" :newKeep="newKeep" >
        </section>
    `,
    data() {
        return {
            newKeep: null,
            titleDesc: null,
            // HERE WAS TEXT DESC
            // HERE WAS COLORS CHOISE
            urlDesc: null
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
        }
        // HERE WAS ISPINNED?
    },
    methods: {
        activateNewKeep(ev) {
            const els = this.$refs;
            const elsArr = Object.keys(els).map((el) => [els[el]]);

            let val = ev.target.src.slice(38, -5);
            console.log(val);
            let currEl;
            if (ev.target.type === 'text' && this.newKeep) return;
            if (ev.target.type === 'text') val = 'textkeep';
            // return

            console.log('now i am here');
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
        },
        // HERE WAS FOCUS
        saveNote(childkeep) {
            if (!this.titleDesc) return;
            console.log('i am children keep', childkeep);

            this.newKeep.info.title = this.titleDesc;
            this.newKeep.info.txt = childkeep.info.txt

            if (childkeep.bgcColorDesc) this.newKeep.style.backgroundColor = childkeep.bgcColorDesc;
            if (childkeep.txtColorDesc) this.newKeep.style.color = childkeep.txtColorDesc;

            if (this.newKeep.type === 'noteImg' ||
                this.newKeep.type === 'noteVideo') this.newKeep.info.url = this.urlDesc;



            console.log('i am father keep', this.newKeep);
            return


            keepService.saveKeep(this.newKeep)
            eventBus.$emit('save-keep');
            this.newKeep = null;
            this.titleDesc = null;
            this.urlDesc = null;

        },
        // PIN KEEP WAS HERE
        // HERE WAS UPDATECOLOR
        keepIsNotTxt() {
            return true
        }
    },
    components: {
        newNote
    },
    created() {
        this.$on('save-curr-new-keep', (newkeep))

    }

}