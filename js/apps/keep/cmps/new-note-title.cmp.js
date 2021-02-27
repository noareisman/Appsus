export default {
    template: `
        <section class="line1 flex center">
            <input @click="sendActivation" class="title-input"  @input="sendTitle" type="text" placeholder="Title..." />
            <div class="icons flex space-around">
                
                <div @click="sendActivation" class="icon iText"  ref="textKeep">
                    <img   src="images/keepType/textkeep.webp" alt="" />
                </div>
                
                <div @click="sendActivation" class="icon iImage" ref="imageKeep">
                    <img   src="images/keepType/imagekeep.webp" alt="" />
                </div>
                
                <div @click="sendActivation" class="icon iVideo" ref="videoKeep">
                    <img   src="images/keepType/videokeep.webp" alt="" />
                </div>
                
                <div @click="sendActivation" class="icon iTodos" ref="todosKeep">
                    <img   src="images/keepType/todokeep.webp" alt="" />
                </div>            
            </div>
        </section>`,
    methods: {
        sendActivation(ev) {
            console.log('why not avtivate');
            const els = this.$refs;
            this.$emit('activation', ev, els)
        },
        sendTitle(ev) {
            const val = ev.target.value
            this.$emit('injectTitle', val)
        }
    }
}