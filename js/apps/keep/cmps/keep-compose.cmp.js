import { eventBus } from '../../../services/event-bus.service.js';
export default {
    template: `
        <section> 
            <div class="new-keep">
            <textarea @click="focus" :placeholder="noteType" name="Text1" cols="130"></textarea>
                <button @click="saveNote">Save</button>
            </div>
        <form @submit.prevent="saveNote">
            <input :txt="noteTxt" @input="updateTxt" type="text" placeholder="Write your note here...">
        </form>
        </section>
    `,
    data() {
        return {
            type: 'txt',
            txt: null,
            file: null
        }
    },
    computed: {
        noteType() {
            return 'New note...';
        }
    },
    methods: {

    },
    created() {
        eventBus.$emit('savedNote', this.keep);
    }

}