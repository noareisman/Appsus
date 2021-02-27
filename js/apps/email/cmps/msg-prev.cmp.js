import msgDetails from '../pages/email-details.cmp.js';
import { emailService } from '../services/email.service.js';

export default {
    props: ['msg'],
    template: `
        <section>
                <div class ="msg-prev flex center">
                    <span class="fav">
                    <i class="fav-star far fa-star"></i>
                    <!-- <i class="fav-star-starred fas fa-star"></i> -->
                    </span>
                    <div @click="detailsToggle" class="msg-sender" :class="isNewMsg">
                         {{msg.participants.sender}} 
                    </div>

                    <div @click="detailsToggle" class="msg-subject" :class="isNewMsg">
                        {{msg.subject}}
                    </div>

                    <div @click="detailsToggle" class="msg-short-body">                        
                        {{shortBodyMsg}}{{showDots}}
                    </div>
                    
                    <div v-if="incominMsg" @click="readToggle">
                        <img class="reading-stat-img" :src=readingStat alt="">
                    </div>

                    <div @click="detailsToggle" class="send-time">
                        {{showTime}}
                    </div>
                </div>

                <msg-details :msg="msg" v-if="msgDetails" />
        </section>
    `,
    data() {
        return {
            msgDetails: null,
            msgRead: null,
            incominMsg: null,
            msgFav: null
        }
    },
    methods: {
        detailsToggle() {
            this.msgDetails = !this.msgDetails;
            emailService.updateEmailStat(this.msg)
                .then(msg => this.msgRead = msg.filters.viewd)
        },
        readToggle() {
            emailService.toggleReadStat(this.msg)
                .then(msg => this.msgRead = msg.filters.viewd)
        },
        favToggle() {
            emailService.toggleFav(this.msg)
                .then(msg => this.msgFav = msg.filters.important)
        }
    },
    computed: {
        isNewMsg() {
            if (this.msgRead === false) return { isMsgNotRead: true, isMsgRead: false }
            else return { isMsgNotRead: false, isMsgRead: true }
        },
        shortBodyMsg() {
            return this.msg.body.slice(0, 25)
        },
        showDots() {
            if (this.msg.body.length > 25) return '...'
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
        readingStat() {
            if (!this.msgRead) return 'images/closeMail.png';
            if (this.msgRead) return 'images/openMail.png';
        },
        favStat() {
            if (!this.msgFav) return 'images/unfav.jpg';
            if (this.msgFav) return 'images/fav.jpg';
        }
    },
    created() {
        this.msgDetails = false;
        this.msgRead = this.msg.filters.viewd;
        this.incominMsg = !this.msg.filters.sent;
        this.msgFav = this.msg.filters.important;
    },
    components: {
        msgDetails
    }
}