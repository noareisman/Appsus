import { eventBus } from '../../../services/event-bus.service.js';
import { keepService } from '../services/keep.service.js';
import newNoteTxt from '../cmps/new-note.cmp.js';
import newNoteTitle from '../cmps/new-note-title.cmp.js';
import newNoteTodos from '../cmps/new-note-todos.cmp.js';

export default {
    template: `
        <section  class="new-keep"> 

                <new-note-title  @injectTitle="title" @activation="activateNewKeep" />
                 
                <section v-if="newKeep && newKeep.type !== 'noteTxt' && newKeep.type !== 'noteTodos'"  class="note-types">
                    <hr />
                    <input class="url-input" v-model="urlDesc" type="text" :placeholder="noteType" />
                </section>

                <new-note-todos v-if="newKeep &&newKeep.type === 'noteTodos'" @addToDo="addNewToDO" />
                <new-note-txt @save="saveNote" v-if="newKeep && newKeep.type !== 'noteTodos'" :newKeep="newKeep" >
        </section>
    `,
    data() {
        return {
            newKeep: null,
            titleDesc: null,
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
    },
    methods: {
        title(val) { this.titleDesc = val; },
        addNewToDO(val) {
            // console.log(val);
            this.newKeep.info.todos.push(val)
            console.log(this.newKeep.info.todos);
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
            this.newKeep.info.txt = childkeep.info.txt

            if (childkeep.bgcColorDesc) this.newKeep.style.backgroundColor = childkeep.bgcColorDesc;
            if (childkeep.txtColorDesc) this.newKeep.style.color = childkeep.txtColorDesc;

            if (this.newKeep.type === 'noteImg' ||
                this.newKeep.type === 'noteVideo') this.newKeep.info.url = this.urlDesc;

            keepService.saveKeep(this.newKeep)
            eventBus.$emit('save-keep');
            this.newKeep = null;
            this.titleDesc = null;
            this.urlDesc = null;

        },
    },
    components: {
        newNoteTxt,
        newNoteTitle,
        newNoteTodos
    }

}