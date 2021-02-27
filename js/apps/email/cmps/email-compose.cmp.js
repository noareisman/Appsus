import { eventBus } from '../../../services/event-bus.service.js';
import { emailService } from '../services/email.service.js';
export default {
    template: `
        <section class="new-msg">
            <div class="new-msg-header flex space-between align-center">
                <h1>New Message</h1>
                <i class="far fa-paper-plane send-mail-btn" title="Send message" @click="sendMsg"></i>
            </div>

            <table class="mail-table flex column">
                <tr class="flex"> 
                    <td class="new-msg-to"> To:<input @keyup="updateNewMsgDestanation" type="text" ></td>
                </tr>
                <hr />
                <tr class="flex"> 
                    <td class="new-msg-cc"> Cc:<input @keyup="updateNewMsgCc" type="text"></td>
                </tr>
                <hr />
                <tr class="flex"> 
                    <td class="new-msg-bcc"> Bcc:<input @keyup="updateNewMsgBcc" type="text"></td>
                </tr>
                <hr />
                <tr class="flex"> 
                    <td class="new-msg-subject"> Subject:<input @keyup="updateNewMsgSubject" type="text"></td>
                </tr>
                <hr />
                <tr> 
                    <td class="new-msg-content"><textarea class="email-text-area" @keyup="updateNewMsgContent" placeholder="New message..." name="Text1" cols="130"></textarea></td>
                </tr>
            </table>

        </section>
    `,
    data() {
        return {
            newMsgContent: null,
            newMsgCc: null,
            newMsgBcc: null,
            newMsgSubject: null,
            newMsgDestanation: null
        }
    },
    methods: {
        updateNewMsgContent(ev) { this.newMsgContent = ev.target.value; },
        updateNewMsgSubject(ev) { this.newMsgSubject = ev.target.value; },
        updateNewMsgDestanation(ev) { this.newMsgDestanation = ev.target.value; },
        updateNewMsgCc(ev) { this.newMsgCc = ev.target.value; },
        updateNewMsgBcc(ev) { this.newMsgBcc = ev.target.value; },
        sendMsg() {
            const newMsg = emailService.getNewEmail();
            newMsg.participants.sender = 'To: ' + this.newMsgDestanation;
            newMsg.subject = this.newMsgSubject;
            newMsg.body = this.newMsgContent;
            eventBus.$emit('newMsg', newMsg);
            eventBus.$emit('email');

        }
    }
}