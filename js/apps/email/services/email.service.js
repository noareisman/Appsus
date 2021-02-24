import { asyncStorageService } from '../../../services/async-storage.service.js';

const MSGS_KEY = 'msgs';
const DRAFT_KEY = 'drafts';

const gTempMsgs = [{
    id: 'temptry1',
    subject: 'Wassap1?',
    body: 'Lorem ipsum',
    isRead: false,
    sentAt: 85511323,
    isTrash: false,
    participants: {
        sender: 'Don',
        getter: ''
    },
    filters: {       
        all:true,
        inbox:false,
        sent:false,
        important:false,
        unread:false,
        viewed:false,
        draft: false,
        trash: false
    }
}, {
    id: 'temptry2',
    subject: 'Wassap2?',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus illo dolores vitae rem animi fugiat quos maiores nam soluta. Voluptatum incidunt consequuntur vitae impedit qui eius itaque ipsa deserunt accusantium ex! Rerum, quasi soluta. Quis dicta provident similique delectus magnam accusantium, praesentium sint eaque beatae, ullam molestiae eveniet totam omnis.',
    isRead: false,
    sentAt: 25511313,
    isTrash: false,
    participants: {
        sender: 'Gabbi',
        getter: ''
    },
    filters: {
        all: true,
        inbox: false,
        sent: false,
        important: true,
        unread: false,
        viewed: false,
        draft: false,
        trash: true
    }
}, {
    id: 'temptry3',
    subject: 'Wassap3?',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus illo dolores vitae rem animi fugiat quos maiores nam soluta. Voluptatum incidunt consequuntur vitae impedit qui eius itaque ipsa deserunt accusantium ex! Rerum, quasi soluta. Quis dicta provident similique delectus magnam accusantium, praesentium sint eaque beatae, ullam molestiae eveniet totam omnis.',
    isRead: false,
    sentAt: 1614185145937,
    isTrash: false,
    participants: {
        sender: 'Shulman',
        getter: ''
    },
    filters: {
        all: true,
        inbox: false,
        sent: true,
        important: true,
        unread: false,
        viewed: false,
        draft: true,
        trash: false
    }
}]
const eMails = query();

export const emailService = {
    query,
    updateEmailStat,
    toogleReadStat,
    removeMsg,
    msgToTrash
}

function query() {
    return asyncStorageService.query(MSGS_KEY)
        .then(msgs => {
            if (!msgs || !msgs.length) {
                msgs = gTempMsgs;
                asyncStorageService.save(MSGS_KEY, msgs);
            }
            return msgs;
        })
}

function updateEmailStat(msg) {
    return getById(msg.id)
        .then(msg => {
            msg.isRead = true;
            saveMsg(msg);
            return msg;
        })
}

function toogleReadStat(msg) {
    return getById(msg.id)
        .then(msg => {
            msg.isRead = !msg.isRead;
            saveMsg(msg);
            return msg;
        })

}

function getById(id) {
    return asyncStorageService.get(MSGS_KEY, id)
}

function saveMsg(msg) {
    if (msg.id) return asyncStorageService.put(MSGS_KEY, msg);
    else return asyncStorageService.post(MSGS_KEY, msg);
}

function msgToTrash(msg) {
    return getById(msg.id)
        .then(msg => {
            msg.isTrash = true;
            saveMsg(msg);
            return msg;
        })
}

//STANDBUY
function removeMsg(msg) {
    return asyncStorageService.remove(MSGS_KEY, msg.id)
}