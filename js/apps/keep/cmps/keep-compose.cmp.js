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

                <section class="url-keep" v-if="newKeep && newKeep.type !== 'noteTxt' && newKeep.type !== 'noteTodos' && newKeep.info.url.length">
                    <div v-if="newKeep && newKeep.type === 'noteImg'">
                     <img  :src="keepUrl" alt="INVALID URL" />
                    </div>
                    <div class="video-prev" v-if="newKeep && newKeep.type === 'noteVideo'">
                        <iframe width="760" height="200" :src=keepUrl frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </section>
                

                <new-note-todos @savetodo="saveNote" @pintodo="pinTheTodo" :todos="todosToShow" v-if="newKeep && newKeep.type === 'noteTodos'" @toggleDone="toggleIsDone" @addToDo="addNewToDO" />
                <new-note-txt @save="saveNote"  v-if="newKeep && newKeep.type !== 'noteTodos'" :newKeep="newKeep" />
        </section>
    `,
    data() {
        return {
            newKeep: null,
            titleDesc: null,
            urlDesc: null,
            todos: null,
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
        },
        keepUrl() {
            switch (this.newKeep.type) {
                case 'noteVideo':
                    const id = this.urlDesc.slice(32);
                    this.urlDesc = `https://www.youtube.com/embed/${id}`;
                    return this.urlDesc;
                case 'noteImg':
                    return this.urlDesc
            }
        }
    },
    methods: {
        title(val) { this.titleDesc = val; },
        addNewToDO(val) { this.newKeep.info.todos.unshift(val); },
        toggleIsDone(val, idx) { this.newKeep.info.todos[idx].isDone = val; },
        pinTheTodo() { this.newKeep.isPinned = !this.newKeep.isPinned },
        openUrl() { this.newKeep.info.url = this.urlDesc; },
        initialization() {
            const elsIconArr = [document.querySelector('.i-text'),
                document.querySelector('.i-image'),
                document.querySelector('.i-video'),
                document.querySelector('.i-todos')
            ];
            elsIconArr.forEach(el => {
                el.style.border = 'unset';
                el.style.backgroundColor = 'unset';
            });
            const elTitle = document.querySelector('.title-input');
            elTitle.style.backgroundColor = 'white';
            elTitle.color = 'black';
            elTitle.value = '';
            this.newKeep = null;
            this.titleDesc = null;
            this.urlDesc = null;
        },
        activateNewKeep(ev, els) {
            console.log('activation');
            console.log(ev);
            console.log(els);
            const elsArr = Object.keys(els).map((el) => [els[el]]);
            let val = ev.target.src.slice(38, -5);
            let currEl;

            if (ev.target.type === 'text' && this.newKeep) return;
            if (ev.target.type === 'text') val = 'textkeep';

            switch (val) {
                case 'imagekeep':
                    this.urlDesc = null;
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
                    this.urlDesc = null;
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
                    this.urlDesc = null;
                    elsArr.forEach(el => {
                        el[0].style.border = 'unset';
                        el[0].style.backgroundColor = 'unset';
                    });

                    currEl = els.todosKeep;
                    currEl.style.border = '1px solid black';
                    currEl.style.backgroundColor = 'rgb(207, 207, 207)';

                    this.newKeep = keepService.newKeep('noteTodos');
                    this.todos = this.newKeep.info.todos;
                    break;

                case 'videokeep':
                    this.urlDesc = null;
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
            if (this.newKeep.type !== 'noteTodos') this.newKeep.info.txt = childkeep.info.txt;
            if ((this.newKeep.type !== 'noteTodos') && childkeep.bgcColorDesc) this.newKeep.style.backgroundColor = childkeep.bgcColorDesc;
            if ((this.newKeep.type !== 'noteTodos') && childkeep.txtColorDesc) this.newKeep.style.color = childkeep.txtColorDesc;
            if (this.newKeep.type === 'noteImg' ||
                this.newKeep.type === 'noteVideo') this.newKeep.info.url = this.urlDesc;
            this.newKeep.info.title = this.titleDesc;

            console.log(this.newKeep);
            keepService.saveNewKeep(this.newKeep)
                .then(() => {
                    eventBus.$emit('saveKeep');
                    this.initialization();
                })

        }
    },
    created() {
        eventBus.$on('close', () => this.initialization())
    },
    components: {
        newNoteTxt,
        newNoteTitle,
        newNoteTodos
    }
}