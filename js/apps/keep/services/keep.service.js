import { asyncStorageService } from '../../../services/async-storage.service.js';

const KEEPS_KEY = 'keeps';

const gTempKeeps = [{
        id: 'TempTry1',
        type: 'noteTxt',
        isPinned: false,
        info: {
            txt: 'Fullstack Me Baby!'
        },
        style: {
            backgroundColor: 'white',
            color: 'black'
        }
    },
    {
        id: 'TempTry2',
        type: 'noteImg',
        isPinned: false,
        info: {
            url: 'https://images.unsplash.com/photo-1469598614039-ccfeb0a21111?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80',
            title: 'Me playing Mi'
        },
        style: {
            backgroundColor: '#00d',
            color: 'black'
        }
    },
    {
        id: 'TempTry3',
        type: 'noteTodos',
        isPinned: false,
        info: {
            label: 'How was it:',
            todos: [
                { txt: 'Do that', doneAt: null },
                { txt: 'Do this', doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: 'white',
            color: 'black'
        }
    },
    {
        id: 'TempTry4',
        type: 'noteVideo',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Me playing Mi'
        },
        style: {
            backgroundColor: 'white',
            color: 'black'
        }
    }
];

const keeps = query();
// console.log(keeps);

export const keepService = {
    query,
    remove,
    newKeep
}

function query() {
    return asyncStorageService.query(KEEPS_KEY)
        .then(keeps => {
            if (!keeps || !keeps.length) {
                keeps = gTempKeeps;
                asyncStorageService.save(KEEPS_KEY, keeps);
            }
            return keeps;
        })

}

function newKeep(keepType) {
    switch (keepType) {
        case 'noteTxt':
            return {
                id: _makeId(5),
                type: 'noteTxt',
                isPinned: false,
                info: { txt: '' },
                style: { backgroundColor: 'white', color: 'black' }
            }
        case 'noteImg':
            return {
                id: _makeId(5),
                type: 'noteImg',
                isPinned: false,
                info: {
                    url: '',
                    title: 'Fighting eval eye!'
                },
                style: { backgroundColor: '#00d', color: 'black' }
            }
        case 'noteTodos':
            return {
                id: _makeId(5),
                type: 'noteTodos',
                isPinned: false,
                info: {
                    label: '',
                    todos: [
                        { txt: '', doneAt: 0 },
                    ]
                },
                style: { backgroundColor: 'white', color: 'black' }
            }
        case 'noteVideo':
            return {
                id: _makeId(5),
                type: "noteVideo",
                isPinned: false,
                info: {
                    url: '',
                    title: ''
                },
                style: { backgroundColor: 'white', color: 'black' }
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
    return asyncStorageService.get(KEEPS_KEY, id)
}

function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}