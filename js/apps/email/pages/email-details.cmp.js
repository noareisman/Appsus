import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';


export default {
    props: ['msg'],
    template: `
        <section  class="msg-details flex column" >
            <div class="flex space-between">
                <div>
                    <h3>{{msg.subject}}</h3>
                    <h3>{{msg.participants.sender}}</h3>
                </div>

                <div class="msg-btns">
                    <button @click="deleteMsg"><img src="images/trash.png" alt=""></button>
                </div>
            </div>

            
            <div class="msg-main-content">
                <p>{{msg.body}}</p>
            </div>
        </section>
    `,
    methods: {
        deleteMsg() {
            eventBus.$emit('remove', this.msg);
        }
    }
}