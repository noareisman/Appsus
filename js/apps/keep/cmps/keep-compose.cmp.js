import { eventBus } from '../../../services/event-bus.service.js';
import { keepService } from '../services/keep.service.js';

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
                
                <section v-if="newKeep">
                    <div class="line2 flex">
                        <textarea class="keep-text-area" v-model="textDesc" @click="focus" :placeholder="noteType" name="Text1" cols="100"></textarea>
                        <div class="new-keep-btns flex column">
                            <button class="pin-keep-btn" :class="isPinned" @click="pinKeep"><img src="./images/keepType/pinkeep.png" alt="" /></button>
                            <button class="save-keep-btn" @click="saveNote"><img src="/images/sendkeep.png" alt="" /></button>
                        </div>
                    </div>
                    <div class="colors-choise flex space-around">
                        <div class="flex">
                            <img src="./images/keepType/bgcolor.png" alt="" />
                            <input @input="updateColor" class="bgc-color" type="color" /> 
                        </div>
                        <div class="flex">
                            <img class="txt-color-img" src="./images/keepType/color.webp" alt="" />
                            <input @input="updateColor" class="txt-color" type="color" /> 
                        </div>
                    </div>
                </section>
        </section>
    `,
    data() {
        return {
            newKeep: null,
            titleDesc: null,
            textDesc: null,
            txtColorDesc: null,
            bgcColorDesc: null,
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
            return 'Enter text here...';
        },
        isPinned() {
            return { pinned: this.newKeep.isPinned }
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
        },
        focus() {
            console.log('focus');
        },
        saveNote() {
            this.newKeep.info.title = this.titleDesc;
            this.newKeep.info.txt = this.textDesc;
            this.newKeep.style.backgroundColor = this.bgcColorDesc;
            this.newKeep.style.color = this.txtColorDesc;

            keepService.saveKeep(this.newKeep)
            eventBus.$emit('save-keep');
            //TODO: RESET NOTE
        },
        pinKeep() {
            this.newKeep.isPinned = !this.newKeep.isPinned;
        },
        updateColor(ev) {
            const currEl = ev.srcElement.className;
            const currColor = ev.target.value;
            const elsText = [
                document.querySelector('.title-input'),
                document.querySelector('.keep-text-area')
            ]

            switch (currEl) {
                case 'txt-color':
                    this.txtColorDesc = currColor;
                    elsText.forEach(el => el.style.color = this.txtColorDesc)
                    break;
                case 'bgc-color':
                    this.bgcColorDesc = currColor;
                    elsText.forEach(el => el.style.backgroundColor = this.bgcColorDesc)

                    break;
            }
        },
        keepIsNotTxt() {
            return true
        }
    }

}