import newTodoList from '../cmps/note-todos-list.cmp';
export default {
    template: `
    <section>
        <hr />
        <button @click="addTodo">+</button>
        <input @input="writeTODO" class= "todo-input" placeholder="New TODO.." />
        <hr />
        <new-todo-list />

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
        },
        writeTODO(ev) {
            const val = ev.target.value;
            this.todo = val;
        }
    },
    components: {
        newTodoList
    }
}