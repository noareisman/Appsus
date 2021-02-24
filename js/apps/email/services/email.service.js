import { asyncStorageService } from '../../../services/async-storage.service.js';

const MSGS_KEY = 'msgs';
const DRAFT_KEY = 'drafts';

const gTempMsgs = [{
    id: 'temptry1',
    subject: 'Wassap1?',
    body: 'bla bla',
    isRead: false,
    sentAt: 155113393343,
    filters: {}
}, {
    id: 'temptry2',
    subject: 'Wassap2?',
    body: 'bla bla',
    isRead: false,
    sentAt: 155113393173,
    filters: {}
}, {
    id: 'temptry3',
    subject: 'Wassap3?',
    body: 'bla bla',
    isRead: false,
    sentAt: 155113393982,
    filters: {}
}]

export const emailService = {
    query
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