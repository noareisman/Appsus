import newTodoList from '../cmps/note-todos-list.cmp.js';
export default {
    props: ['todos'],
    template: `
    <section>
        <hr />
        <div class="new-todo-content flex">
            <div class="todo-input">
                <button @click="addTodo">+</button>
                <input  @keyup.enter="addTodo" ref="todoInput" @input="writeTODO" class="todo-input" placeholder="Enter comma separated list..." />
            </div>
            <hr />
            <div class="todo-keep-img flex">
                <img src="./images/keepType/bgcolor.png" alt="" />
                <input id="bgc-color" @input="updateTodoColor" class="todo-bgc-color" type="color" /> 
                <img  src="./images/keepType/color.webp" alt="" />
                <input id="txt-color" @input="updateTodoColor" class="todo-txt-color" type="color" />
            </div>
            <hr/>
            <div class="todo-keep-btns flex">
                <button  class="pin-todo-keep" @click="pinTodoKeep"><img src="./images/keepType/pinkeep.png" alt="" /></button>
                <button  class="save-todo-keep" @click="saveTodoKeep"><img src="/images/sendkeep.png" alt="" /></button>
            </div>
        </div>
            
            <new-todo-list :todoslist="todos" />
    </section>
    `,
    data() {
        return {
            todo: null
        }
    },
    methods: {
        addTodo() {
            if (!this.todo) return;
            const todo = { doneAt: Date.now(), txt: this.todo }
            this.$emit('addToDo', todo)

            this.todo = null;
            this.$refs.todoInput.value = '';
        },
        writeTODO(ev) {
            const val = ev.target.value;
            this.todo = val;
        },
        saveTodoKeep() {
            this.$emit('save');
        },
        pinTodoKeep() {
            this.$emit('pintodo');
        },
        updateTodoColor(ev) {
            // TODO
            return;
            const currEl = ev.srcElement.className;
            const currColor = ev.target.value;
            switch (currEl) {
                case 'todo-txt-color':
                    break;
                case 'todo-bgc-color':
                    break;
            }
        }
    },
    components: {
        newTodoList
    }
}