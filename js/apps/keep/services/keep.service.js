import { asyncStorageService } from '../../../services/async-storage.service.js';

const KEEPS_KEY = 'keeps';

const gTempKeeps = [{
        id: 'TempTry1',
        type: 'noteTxt',
        isPinned: false,
        info: {
            title: '',
            txt: 'Fullstack Me Baby!'
        },
        style: {
            backgroundColor: 'moccasin',
            color: 'red'
        }
    },
    {
        id: 'TempTry2',
        type: 'noteImg',
        isPinned: false,
        info: {
            url: 'https://images.unsplash.com/photo-1469598614039-ccfeb0a21111?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
            title: 'Me playing Mi',
            txt: ''
        },
        style: {
            backgroundColor: '#f8d2e4',
            color: 'black'
        }
    },
    {
        id: 'TempTry3',
        type: 'noteTodos',
        isPinned: false,
        info: {
            title: '',
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
            url: 'https://i.ytimg.com/an_webp/CduA0TULnow/mqdefault_6s.webp?du=3000&sqp=COzt44EG&rs=AOn4CLBxY6Ssg3C6cMlh-gOI0ukScfJ9BA',
            title: 'Free Britney, Bitch!',
            txt: ''
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
    removeKeep,
    newKeep,
    saveKeep,
    getKeepById
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
                id: asyncStorageService.makeId(5),
                type: 'noteTxt',
                isPinned: false,
                info: { title: '', txt: '' },
                style: { backgroundColor: 'white', color: 'black' }
            }
        case 'noteImg':
            return {
                id: asyncStorageService.makeId(5),
                type: 'noteImg',
                isPinned: false,
                info: {
                    url: '',
                    title: '',
                    txt: ''
                },
                style: { backgroundColor: '#00d', color: 'black' }
            }
        case 'noteTodos':
            return {
                id: asyncStorageService.makeId(5),
                type: 'noteTodos',
                isPinned: false,
                info: {
                    title: '',
                    label: '',
                    todos: []
                },
                style: { backgroundColor: 'white', color: 'black' }
            }
        case 'noteVideo':
            return {
                id: asyncStorageService.makeId(5),
                type: "noteVideo",
                isPinned: false,
                info: {
                    url: '',
                    title: '',
                    txt: ''
                },
                style: { backgroundColor: 'white', color: 'black' }
            }
    }
}



function removeKeep(keep) {
    return getKeepById(keep.id)
        .then(keep => {
            return asyncStorageService.remove(KEEPS_KEY, keep.id)
        })
}

function getKeepById(id) {
    return asyncStorageService.get(KEEPS_KEY, id)
}

function saveKeep(keep) {
    return keeps
        .then((keeps) => {
            keeps.push(keep)
            asyncStorageService.save(KEEPS_KEY, keeps)
        })
}