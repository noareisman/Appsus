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
            url: 'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1049&q=80',
            title: '',
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
        isPinned: true,
        info: {
            title: '',
            label: 'List:',
            todos: [
                { txt: 'Eggs', doneAt: null, isDone: false },
                { txt: 'Milk', doneAt: 187111111, isDone: false },
                { txt: 'BBQ sauce', doneAt: 187111111, isDone: false },
                { txt: 'Cheese', doneAt: 187111111, isDone: false },
                { txt: 'Sugar', doneAt: 187111111, isDone: false },
                { txt: 'Wine', doneAt: 187111111, isDone: false },
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
            url: 'https://i.ytimg.com/an_webp/2Q_ZzBGPdqE/mqdefault_6s.webp?du=3000&sqp=CJO_5YEG&rs=AOn4CLB7cK7FdGidmCfXUPdce_WB40Jf0A',
            title: '',
            txt: ''
        },
        style: {
            backgroundColor: 'white',
            color: 'black'
        }
    },
    {
        id: 'TempTry5',
        type: 'noteImg',
        isPinned: true,
        info: {
            url: 'https://images.unsplash.com/photo-1507808973436-a4ed7b5e87c9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            title: 'Best Music Ever ',
            txt: ''
        },
        style: {
            backgroundColor: '#f8d2e4',
            color: 'black'
        }
    },
    {
        id: 'TempTry6',
        type: 'noteTxt',
        isPinned: false,
        info: {
            title: '',
            txt: 'Password: xyT75hL34 '
        },
        style: {
            backgroundColor: 'moccasin',
            color: 'red'
        }
    },
    {
        id: 'TempTry7',
        type: 'noteImg',
        isPinned: true,
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
        id: 'TempTry8',
        type: 'noteTodos',
        isPinned: true,
        info: {
            title: '',
            label: 'How was it:',
            todos: [
                { txt: 'Do that', doneAt: null, isDone: false },
                { txt: 'Do this', doneAt: 187111111, isDone: false }
            ]
        },
        style: {
            backgroundColor: 'white',
            color: 'black'
        }
    },
    {
        id: 'TempTry9',
        type: 'noteVideo',
        isPinned: true,
        info: {
            url: 'https://i.ytimg.com/an_webp/CduA0TULnow/mqdefault_6s.webp?du=3000&sqp=COzt44EG&rs=AOn4CLBxY6Ssg3C6cMlh-gOI0ukScfJ9BA',
            title: 'Free Britney, Bitch!',
            txt: ''
        },
        style: {
            backgroundColor: ' #fcba41',
            color: 'black'
        }
    },
    {
        id: 'TempTry10',
        type: 'noteImg',
        isPinned: false,
        info: {
            url: 'https://images.unsplash.com/photo-1470016342826-876ea880d0be?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Me playing Mi',
            txt: ''
        },
        style: {
            backgroundColor: 'white',
            color: 'black'
        }
    }
]
const keeps = query();


export const keepService = {
    query,
    removeKeep,
    newKeep,
    saveKeep,
    getKeepById,
    updateKeep,
    saveNewKeep
}

function updateKeep(id, whatTodo) {
    return getKeepById(id)
        .then((note) => {
            switch (whatTodo) {
                case 'togglePin':
                    note.isPinned = !note.isPinned
                    saveKeep(note)
                    return note;
            }
        })
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
                style: { backgroundColor: '#e8e8e8', color: 'black' }
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
                style: { backgroundColor: '#e8e8e8', color: 'black' }
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
                style: { backgroundColor: '#e8e8e8', color: 'black' }
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
                style: { backgroundColor: '#e8e8e8', color: 'black' }
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

function saveNewKeep(keep) {
    return keeps
        .then((keeps) => {
            keeps.push(keep)
            asyncStorageService.save(KEEPS_KEY, keeps)
        })
}

function saveKeep(keep) {
    if (keep.id) return asyncStorageService.put(KEEPS_KEY, keep);
    else return asyncStorageService.post(KEEPS_KEY, keep);
}