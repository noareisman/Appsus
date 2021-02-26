import { eventBus } from '../../../services/event-bus.service.js';
import { keepService } from '../services/keep.service.js';
import newNoteTxt from '../cmps/new-note.cmp.js';
import newNoteTitle from '../cmps/new-note-title.cmp.js';
import newNoteTodos from '../cmps/new-note-todos.cmp.js';

export default {
    template: `
        <section  class="new-keep"> 

                <new-note-title  @injectTitle="title" @activation="activateNewKeep" />
                 
                <section v-if="newKeep && newKeep.type !== 'noteTxt' && newKeep.type !== 'noteTodos'"  class="note-types flex">
                        <input ref="urlInpt" class="url-input" v-model="urlDesc" type="text" :placeholder="noteType" />
                        <hr />
                        <button @click="openUrl">+</button>
                </section>
                <section v-if="newKeep && newKeep.type !== 'noteTxt' && newKeep.type !== 'noteTodos' && newKeep.info.url.length">
                    <!-- <--!TODO-->

                    <div>
                     <img  src="./images/keepType/color.webp" alt="" />
                    </div>
                </section>


                <new-note-todos @savetodo="saveNote" @pintodo="pinTheTodo" :todos="todosToShow" v-if="newKeep && newKeep.type === 'noteTodos'" @addToDo="addNewToDO" />
                <new-note-txt @save="saveNote"  v-if="newKeep && newKeep.type !== 'noteTodos'" :newKeep="newKeep" />
        </section>
    `,
    data() {
        return {
            newKeep: null,
            titleDesc: null,
            urlDesc: null,
            todos: null
        }
    },
    computed: {
        noteType() {
            switch (this.newKeep.type) {
                case 'noteImg':
                    return 'Enter image URL...';

                case 'noteVideo':
                    return 'Enter video URL...';
            }
        },
        todosToShow() {
            return this.todos
        }
    },
    methods: {
        title(val) { this.titleDesc = val; },
        addNewToDO(val) { this.newKeep.info.todos.unshift(val); },
        pinTheTodo() { this.newKeep.isPinned = !this.newKeep.isPinned },
        clearIcons() {

        },
        openUrl() {
            this.newKeep.info.url = this.urlDesc;
            this.urlDesc = null;
            this.$refs.urlInpt.value = ''
        },
        activateNewKeep(ev, els) {
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

                    currEl = els.imageKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';

                    this.newKeep = keepService.newKeep('noteImg')
                    break;

                case 'textkeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = els.textKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';

                    this.newKeep = keepService.newKeep('noteTxt')
                    break;

                case 'todokeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = els.todosKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';

                    this.newKeep = keepService.newKeep('noteTodos');
                    this.todos = this.newKeep.info.todos;
                    console.log(this.newKeep);
                    break;

                case 'videokeep':
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = els.videoKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';

                    this.newKeep = keepService.newKeep('noteVideo')
                    break;
            }
        },
        saveNote(childkeep) {
            if (!this.titleDesc) return;
            this.newKeep.info.title = this.titleDesc;
            if (this.newKeep.type !== 'noteTodos') {
                this.newKeep.info.txt = childkeep.info.txt;
                if (childkeep.bgcColorDesc) this.newKeep.style.backgroundColor = childkeep.bgcColorDesc;
                if (childkeep.txtColorDesc) this.newKeep.style.color = childkeep.txtColorDesc;
            }
            if (this.newKeep.type === 'noteImg' ||
                this.newKeep.type === 'noteVideo') this.newKeep.info.url = this.urlDesc;


            // RESET
            const elsIconArr = [document.querySelector('.iText'),
                document.querySelector('.iImage'),
                document.querySelector('.iVideo'),
                document.querySelector('.iTodos')
            ];
            elsIconArr.forEach(el => {
                el.style.border = 'unset';
                el.style.backgroundColor = 'unset';
            });
            this.newKeep = null;
            this.titleDesc = null;
            this.urlDesc = null;
            return
            keepService.saveKeep(this.newKeep)
            eventBus.$emit('save-keep');

        },
    },
    components: {
        newNoteTxt,
        newNoteTitle,
        newNoteTodos
    }

}