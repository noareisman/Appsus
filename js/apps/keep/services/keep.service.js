import { asyncStorageService } from '../../../services/async-storage.service.js';

const KEEPS_KEY = 'keeps';

const gTempKeeps = [{
        id: 'TempTry1',
        type: "NoteTxt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "white",
            color: 'black'
        }
    },
    {
        id: 'TempTry2',
        type: "NoteImg",
        isPinned: false,
        info: {
            url: "http://some-img/me",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d",
            color: 'black'
        }
    },
    {
        id: 'TempTry3',
        type: "NoteTodos",
        isPinned: false,
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: "white",
            color: 'black'
        }
    },
    {
        id: 'TempTry4',
        type: "NoteVideo",
        isPinned: false,
        info: {
            url: "http://some-img/me",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "white",
            color: 'black'
        }
    }
];

const keeps = query();
console.log(keeps);

export const keepService = {
    query,
    remove,
    newKeep
}

function query() {
    return asyncStorageService.query(KEEPS_KEY)
        .then(keeps => {
            if (!keeps || !!keeps) {
                keeps = gTempKeeps;
                asyncStorageService.save(KEEPS_KEY, keeps);
            }
            return keeps;
        })

}

function newKeep(keepType) {
    switch (keepType) {
        case 'note-txt':
            return {
                id: _makeId(5),
                type: "NoteTxt",
                isPinned: false,
                info: { txt: '' },
                style: { backgroundColor: "white", color: 'black' }
            }
        case 'note-img':
            return {
                id: _makeId(5),
                type: "NoteImg",
                isPinned: false,
                info: {
                    url: '',
                    title: ''
                },
                style: { backgroundColor: "#00d", color: 'black' }
            }
        case 'note-todos':
            return {
                id: _makeId(5),
                type: "NoteTodos",
                isPinned: false,
                info: {
                    label: '',
                    todos: [
                        { txt: '', doneAt: 0 },
                    ]
                },
                style: { backgroundColor: "white", color: 'black' }
            }
        case 'note-video':
            return {
                id: _makeId(5),
                type: "NoteVideo",
                isPinned: false,
                info: {
                    url: '',
                    title: ''
                },
                style: { backgroundColor: "white", color: 'black' }
            }
    }





    return {
        id: _makeId(),
        type: '',
        body: '',
        sentAt: Date.now(),
        participants: {
            sender: 'Me',
            getter: ''
        },
        filters: {
            all: true,
            inbox: false,
            sent: true,
            important: false,
            unread: false,
            viewed: false,
            draft: false,
            trash: false
        }
    }
}

function remove(keep) {
    return _getById(keep.id)
        .then(keep => {
            return asyncStorageService.remove(KEEPS_KEY, keep.id)
        })
}

function _getById(id) {
    return asyncStorageService.get(MSGS_KEY, id)
}

function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}