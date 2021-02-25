import { eventBus } from '../../../services/event-bus.service.js';
export default {
    template: `
        <section> 
        <form @submit.prevent="saveNote">
            <input :txt="noteTxt" @input="updateTxt" type="text" placeholder="Write your note here...">
            <button @click="saveNote">Save</button>
        </form>
        </section>
    `,
    data(){
        return{
            type:'txt',
            txt:null,
            file:null
        }
    },
    computed:{
        updateNote(){
            this.not
        }
    },
    methods:{

    },
    created(){
        eventBus.$emit('savedNote', {});
    }

}