import msgPrev from './msg-prev.cmp.js';

export default {
    props: ['msgs'],
    template: `
        <ul class="emails-container"> 
            <li class="preview-container-email" v-for="msg in msgs" :key="msg.id">
                <msg-prev :msg="msg" />
            </li>
        </ul>
    `,
    components: {
        msgPrev
    }
}