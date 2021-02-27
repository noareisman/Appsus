import msgDetails from '../pages/email-details.cmp.js';
import { emailService } from '../services/email.service.js';

export default {
    props: ['msg'],
    template: `
        <section>
                <div class ="msg-prev flex center">
                    <i :class="isFav" class="fav" @click="toggleFav"></i>
                    <div @click="toggleDetails" class="msg-sender" :class="isNewMsg">{{msg.participants.sender}}</div>
                    <div class="email-msg" @click="toggleDetails">
                        <span class="msg-subject" :class="isNewMsg">{{msg.subject}}</span>
                        <span class="msg-short-body">{{shortBodyMsg}}{{showDots}}</span>
                    </div>
                    <i :class="isRead" @click="toggleRead"></i>
                    <div @click="toggleDetails" class="send-time" :class="isNewMsg">{{showTime}}</div>
                </div>
                <msg-details :msg="msg" v-if="msgDetails"/>
        </section>
    `,
    data() {
        return {
            msgDetails: null,
            msgRead: null,
            incomingMsg: null,
            msgFav: null
        }
    },
    methods: {
        toggleDetails() {
            this.msgDetails = !this.msgDetails;
            emailService.updateEmailStat(this.msg)
                .then(msg => this.msgRead = msg.filters.viewed)
        },
        toggleRead() {
            this.msgRead = !this.msgRead;
            emailService.toggleReadStat(this.msg)
                .then(msg => this.msgRead = msg.filters.viewed)
        },
        toggleFav() {
            this.msgFav = !this.msgFav;
            emailService.toggleFav(this.msg)
                .then(msg => this.msgFav = msg.filters.important)
        }
    },
    computed: {
        isNewMsg() {
            if (!this.msgRead) return 'is-msg-not-read'
            if (this.msgRead) return 'is-msg-read'
        },
        shortBodyMsg() {
            return this.msg.body.slice(0, 80)
        },
        showDots() {
            if (this.msg.body.length > 80) return '...'
        },
        showTime() {
            let time = new Date(this.msg.sentAt * 1000)
            let hours = time.getHours();
            let minuts = time.getMinutes();
            const lastDay = 86400000

            if (Date.now() - time > lastDay) {
                const day = time.getUTCDate();
                const month = time.getUTCMonth() + 1;
                time = '' + day + '/' + month

                return time
            };

            if (hours < 10) hours = '0' + hours;
            if (minuts < 10) minuts = '0' + minuts;
            if (minuts === 60) minuts = '00';
            time = '' + hours + ':' + minuts
            return time;

        },
        isRead() {
            if (this.incomingMsg) return (this.msgRead) ? 'far fa-envelope-open' : 'fas fa-envelope';
        },
        isFav() {
            return (this.msgFav) ? 'fav-star-starred fas fa-star' : 'fav-star far fa-star'
        }
    },
    created() {
        this.msgDetails = false;
        this.msgRead = this.msg.filters.viewed;
        this.incomingMsg = !this.msg.filters.sent;
        this.msgFav = this.msg.filters.important;
    },
    components: {
        msgDetails
    }
}