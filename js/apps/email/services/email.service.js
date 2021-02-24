import { asyncStorageService } from '../../../services/async-storage.service.js';

const MSGS_KEY = 'msgs';
const DRAFT_KEY = 'drafts';

const gTempMsgs = [{
    id: 'temptry1',
    subject: 'Wassap1?',
    body: 'bla bla',
    isRead: false,
    sentAt: 155113393343,
    isTrash: false,
    participants: {
        sender: 'Don',
        getter: ''
    },
    filters: {}
}, {
    id: 'temptry2',
    subject: 'Wassap2?',
    body: 'bla bla',
    isRead: false,
    sentAt: 155113393173,
    isTrash: false,
    participants: {
        sender: 'Gabbi',
        getter: ''
    },
    filters: {}
}, {
    id: 'temptry3',
    subject: 'Wassap3?',
    body: 'bla bla',
    isRead: false,
    sentAt: 155113393982,
    isTrash: false,
    participants: {
        sender: 'Shulman',
        getter: ''
    },
    filters: {}
}]
const eMails = query();

export const emailService = {
    query,
    updateEmailStat
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

function getById(id) {
    return asyncStorageService.get(MSGS_KEY, id)
}

function saveMsg(msg) {
    if (msg.id) return asyncStorageService.put(MSGS_KEY, msg);
    else return asyncStorageService.post(MSGS_KEY, msg);
}