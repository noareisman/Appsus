import msgPrev from './msg-prev.cmp.js';
import msgDetails from '../pages/email-details.cmp.js';

export default {
    props: ['msgs'],
    template: `
        <ul> 
            <li class="preview-container-email" v-for="msg in msgs" :key="msg.id">
                {{msg.txt}}
                <msg-prev @click.native="toggleDetails" />
                <msg-details :msg="msg" v-if="details" />
            </li>
        </ul>
    `,
    data() {
        return {
            details: null
        }
    },
    methods: {
        toggleDetails() {
            this.details = !this.details;
        }
    },
    created() {
        this.details = false;
    },
    components: {
        msgPrev,
        msgDetails
    }
}