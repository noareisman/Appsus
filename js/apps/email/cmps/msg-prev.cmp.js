import msgDetails from '../pages/email-details.cmp.js';
import { emailService } from '../services/email.service.js';

export default {
    props: ['msg'],
    template: `
        <section>
            <div @click="detailsToggle" :class="isNewMsg">
                <div class ="msg-prev flex center">
                    <div class="msg-sender">
                        <span>From:</span> {{msg.participants.sender}} 
                    </div>

                    <div class="msg-subject">
                        <span>subject:</span> {{msg.subject}}
                    </div>
                </div>
                <msg-details :msg="msg" v-if="msgDetails" />
            </div>
        </section>
    `,
    data() {
        return {
            msgDetails: null,
            msgRead: null
        }
    },
    methods: {
        detailsToggle() {
            this.msgDetails = !this.msgDetails;
            emailService.updateEmailStat(this.msg)
                .then(msg => this.msgRead = msg.isRead)
        }
    },
    computed: {
        isNewMsg() {
            if (this.msgRead === false) return { isMsgNotRead: true, isMsgRead: false }
            else return { isMsgNotRead: false, isMsgRead: true }
        }
    },
    created() {
        this.msgDetails = false;
        this.msgRead = this.msg.isRead;
    },
    components: {
        msgDetails
    }
}