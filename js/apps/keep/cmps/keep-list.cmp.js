import notePrev from './note-prev.cmp.js';

export default {
    props: ['notes'],
    template: `
        <section>
            <ul class="keep-notes-container pinned-notes flex space-between"> 
                <li class="note-item" v-for="note in notes" :key="note.id">
                    <note-prev :note="note"/>
                </li>
            </ul>
            <ul class="keep-notes-container flex space-between"> 
                <li class="note-item" v-for="note in notes" :key="note.id">
                    <note-prev :note="note"/>
                </li>
            </ul>
        </section>`,
    components: {
        notePrev
    },
}