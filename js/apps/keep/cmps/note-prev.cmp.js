import { keepService } from '../services/keep.service.js';
export default {
    template: `
        <section> 
            <compotent  :is="noteType"
                        :info=""
                        @pin="pinNote"
                        @edit="editNote">
                <div class="note-container">
                    <button @click="pin">Pin</button>        
                    <button @click="Edit">Edit</button>
                    <pre>{{this.txt}}</pre>
                    <img :src="file"/>
                </div>        
            <component/>
        </section>
    `,
    data() {
        return {

        }
    },
    crearet(){
        keepService.query()
    }
}