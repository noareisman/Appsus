export default {
    template: `
        <section class="line1 flex center">
            <input @click="sendActivation" class="title-input"  @input="sendTitle" type="text" placeholder="Title..." />
            <div class="icons flex space-around">
                
                <div @click="sendActivation" class="icon i-text"  ref="textKeep">
                    <img   src="images/keepType/textkeep.webp" alt="" />
                </div>
                
                <div @click="sendActivation" class="icon i-mage" ref="imageKeep">
                    <img   src="images/keepType/imagekeep.webp" alt="" />
                </div>
                
                <div @click="sendActivation" class="icon i-video" ref="videoKeep">
                    <img   src="images/keepType/videokeep.webp" alt="" />
                </div>
                
                <div @click="sendActivation" class="icon i-todos" ref="todosKeep">
                    <img   src="images/keepType/todokeep.webp" alt="" />
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