export default {
    template: `
        <section class="line1 flex center">
            <input @click="sendActivation" class="title-input"  @input="sendTitle" type="text" placeholder="Title..." />
            <div class="icons flex space-around">
                
                <div class="icon iText"  ref="textKeep">
                    <img  @click="sendActivation" src="images/keepType/textkeep.webp" alt="" />
                </div>
                
                <div class="icon iImage" ref="imageKeep">
                    <img @click="sendActivation"  src="images/keepType/imagekeep.webp" alt="" />
                </div>
                
                <div class="icon iVideo" ref="videoKeep">
                    <img @click="sendActivation"  src="images/keepType/videokeep.webp" alt="" />
                </div>
                
                <div class="icon iTodos" ref="todosKeep">
                    <img  @click="sendActivation" src="images/keepType/todokeep.webp" alt="" />
                </div>            
            </div>
        </section>`,
    methods: {
        sendActivation(ev) {
            const els = this.$refs;
            this.$emit('activation', ev, els)
        },
        sendTitle(ev) {
            const val = ev.target.value
            this.$emit('injectTitle', val)

        }
    }
}