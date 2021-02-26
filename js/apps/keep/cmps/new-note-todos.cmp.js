import newTodoList from '../cmps/note-todos-list.cmp.js';
export default {
    props: ['todos'],
    template: `
    <section>
        <hr />
        <button @click="addTodo">+</button>
        <input  ref="todoInput" @input="writeTODO" class="todo-input" placeholder="Enter comma separated list..." />
        <hr />
        <new-todo-list  :todoslist="todos" />



            <!-- <div >
                <img src="./images/keepType/bgcolor.png" alt="" />
                <input @input="updateColor" type="color" /> 
            </div>
            <div >
                <img  src="./images/keepType/color.webp" alt="" />
                <input @input="updateColor" class="txt-color" type="color" /> 
            </div> -->

        <!-- <div>
            <button  @click="pinKeep"><img src="./images/keepType/pinkeep.png" alt="" /></button>
            <button  @click="saveNote"><img src="/images/sendkeep.png" alt="" /></button>
        </div> -->
        <!-- <div class="new-keep-btns flex column">
            <button class="pin-keep-btn" :class="isPinned" @click="pinKeep"><img src="./images/keepType/pinkeep.png" alt="" /></button>
            <button class="save-keep-btn" @click="saveNote"><img src="/images/sendkeep.png" alt="" /></button>
        </div> -->
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
            this.$refs.todoInput.value = '';
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