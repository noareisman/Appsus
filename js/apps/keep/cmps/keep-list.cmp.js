import notePrev from './note-prev.cmp.js';

export default {
    props: ['notes', 'pinnedNotes'],
    template: `
        <section class="keep-list-container">
            <ul class="keep-notes-container pinned-notes flex space-between"> 
                <li class="note-item" v-for="pinnedNote in pinnedNotes" :key="pinnedNote.id">
                    <note-prev :note="pinnedNote"/>
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