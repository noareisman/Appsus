import notePrev from './note-prev.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
    props: ['notes', 'pinnedNotes'],
    template: `
        <section @click="closeNewNote" class="keep-list-container">
            <h1>Pinned Notes:</h1>
            <ul class="keep-notes-container pinned-notes"> 
                <li class="note-item" v-for="pinnedNote in pinnedNotes" :key="pinnedNote.id">
                    <note-prev :note="pinnedNote"/>
                </li>
            </ul>
            <h1>Others:</h1>
            <ul class="keep-notes-container"> 
                <li class="note-item" v-for="note in notes" :key="note.id">
                    <note-prev :note="note"/>
                </li>
            </ul>
        </section>`,
    methods: {
        closeNewNote() {
            eventBus.$emit('close');
        }
    },
    components: {
        notePrev
    },
}