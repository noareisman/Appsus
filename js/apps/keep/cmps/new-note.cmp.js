export default {
    props: ['newKeep'],
    template: `
        <section>
            <hr />
            <div class="line2 flex">
                <textarea class="keep-text-area" v-model="textDesc" @click="focus" placeholder="Enter text here..." name="Text1" cols="100"></textarea>
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
    `,
    date() {
        return {
            currNewKeep: null,
            textDesc: null,
            txtColorDesc: null,
            bgcColorDesc: null
        }
    },
    methods: {
        saveNote() {
            this.currNewKeep.info.txt = this.textDesc;

            if (this.bgcColorDesc) this.currNewKeep.style.backgroundColor = this.bgcColorDesc;
            if (this.txtColorDesc) this.currNewKeep.style.color = this.txtColorDesc;

            this.$emit('save', this.currNewKeep);

            this.currNewKeep = null;
            this.textDesc = null;
            this.txtColorDesc = null;
            this.bgcColorDesc = null;
        },
        pinKeep() {
            this.currNewKeep.isPinned = !this.currNewKeep.isPinned;
        },
        focus() {
            console.log('focus');
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
    },
    computed: {
        isPinned() {
            return { pinned: this.currNewKeep.isPinned }
        }
    },
    created() {
        this.currNewKeep = this.newKeep
        this.textDesc = '';
    }

}