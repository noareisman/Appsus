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
        all: true,
        inbox: false,
        sent: false,
        important: false,
        unread: false,
        viewed: false,
        draft: false,
        trash: false
    }
}, {
    id: 'temptry2',
    subject: 'Congradulations! I are our 100,000 costumer, click the link to collect your Prize!',
    body: 'I am not a virus I swear! You are just that lucky!\n <a>Click here and be a Millioner</a>!!!',
    isRead: false,
    sentAt: 25511313,
    isTrash: false,
    participants: {
        sender: 'Anonymous',
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
        sent: false,
        important: true,
        unread: false,
        viewed: false,
        draft: true,
        trash: false
    }
}, {
    id: 'temptry4',
    subject: 'Thank you for registering to our mailing list',
    body: 'We know you just wanted to get a discount, but this just cost you -Us harassing you forever! We hope this buy was worth it...',
    isRead: false,
    sentAt: 25511313,
    isTrash: false,
    participants: {
        sender: 'Random shopping site',
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
    id: 'temptry5',
    subject: 'Want to be rich? Give us all your money and we will triple it!',
    body: 'This is not a scam -this is MAGIC! Send us back your bank account details and we will be in touch!',
    isRead: false,
    sentAt: 25511313,
    isTrash: false,
    participants: {
        sender: 'Decent person',
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
},
{
    id: 'temptry6',
    subject: 'Hi :)',
    body: 'Hi man, long time... How are you? ',
    isRead: false,
    sentAt: 25511313,
    isTrash: false,
    participants: {
        sender: 'Britney Spears',
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
},
{
    id: 'temptry7',
    subject: 'My Gift List',
    body: 'I want to be Kim Kardashian!\n Thank you, \n Some random well behaved girl ',
    isRead: false,
    sentAt: 25511313,
    isTrash: false,
    participants: {
        sender: 'Me',
        getter: 'Santa Claus'
    },
    filters: {
        all: true,
        inbox: false,
        sent: true,
        important: true,
        unread: false,
        viewed: false,
        draft: false,
        trash: false
    }
}
]
const eMails = query();

export const emailService = {
    query,
    updateEmailStat,
    toogleReadStat,
    removeMsg,
    msgToTrash,
    getNewEmail,
    saveNewMsg
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

function saveNewMsg(msg) {
    return eMails
        .then((msgs) => {
            msgs.push(msg)
            asyncStorageService.save(MSGS_KEY, msgs)
        })
}

function getNewEmail() {
    return {
        id: _makeId(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: Date.now(),
        isTrash: false,
        participants: {
            sender: 'Me',
            getter: ''
        },
        filters: {
            all: true,
            inbox: false,
            sent: false,
            important: false,
            unread: false,
            viewed: false,
            draft: false,
            trash: false
        }
    }
}

function msgToTrash(msg) {
    return getById(msg.id)
        .then(msg => {
            msg.isTrash = true;
            msg.filters.trash = true;
            saveMsg(msg);
            return msg;
        })
}

//STANDBUY
function removeMsg(msg) {
    return asyncStorageService.remove(MSGS_KEY, msg.id)
}

function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}