import { eventBus } from '../../../services/event-bus.service.js';
import { emailService } from '../services/email.service.js';


export default {
    props: ['msg'],
    template: `
        <section  class="msg-details flex column" >
            <div class="flex space-between">
                <div>
                    <h3>{{msg.subject}}</h3>
                    <h3 v-if="incominMsg">{{msg.participants.sender}}</h3>
                </div>

                <div class="msg-btns">
                    <span @click="deleteMsg"><i class="far fa-trash-alt"></i></span>
                </div>
            </div>

            
            <div class="msg-main-content">
                <p>{{msg.body}}</p>
            </div>
        </section>
    `,
    data() {
        return {
            incominMsg: null
        }
    },
    methods: {
        deleteMsg() {
            emailService.msgToTrash(this.msg)
                .then(() => { eventBus.$emit('trash',this.msg) })
        }

    },
    created() {
        this.incominMsg = !this.msg.filters.sent
    }
}