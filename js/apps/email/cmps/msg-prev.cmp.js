import msgDetails from '../pages/email-details.cmp.js';

export default {
    props: ['msg'],
    template: `
        <section>
            <div @click="detailsToggle">
                {{msg.id}}
                {{msg.body}}
                <msg-details :msg="msg" v-if="msgDetails" />
            </div>
        </section>
    `,
    data() {
        return {
            msgDetails: null
        }
    },
    methods: {
        detailsToggle() {
            this.msgDetails = !this.msgDetails;
        }
    },
    created() {
        this.msgDetails = false;
    },
    components: {
        msgDetails
    }
}