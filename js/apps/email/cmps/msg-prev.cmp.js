import msgDetails from '../pages/email-details.cmp.js';
import { emailService } from '../services/email.service.js';

export default {
    props: ['msg'],
    template: `
        <section>
            <div @click="detailsToggle">
                <div class ="msg-prev flex center">
                    <div class="msg-sender" :class="isNewMsg">
                         {{msg.participants.sender}} 
                    </div>

                    <div class="msg-subject" :class="isNewMsg">
                        {{msg.subject}}
                    </div>

                    <div class="msg-short-body">                        
                        {{shortBodyMsg}}{{showDots}}
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
        },
        shortBodyMsg() {
            return this.msg.body.slice(0, 30)
        },
        showDots() {
            if (this.msg.body.length > 30) return '...'
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