import notePrev from './note-prev.cmp.js';

export default {
    props: ['notes'],
    template: `
         <ul class="keep-notes-container flex space-between"> 
             <li class="preview-container-note" v-for="note in notes" :key="note.id">
                 <note-prev :note="note"/>
             </li>
         </ul>`,
    components: {
        notePrev
    }
}