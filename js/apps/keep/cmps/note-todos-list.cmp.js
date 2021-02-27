import todoPrev from './new-todo-prev.cmp.js';
export default {
    props: ['todoslist'],
    template: `
        <ul class="new-todo-list">
            <li title="Done / Not done" class="new-todo flex" v-for="(todo, index) in todoslist">
                    <todo-prev @done="mark" :todo="todo" :index="index" />
            </li>
        </ul>
    `,
    methods: {
        mark(done, index) {
            this.$emit('done', done, index)
        }
    },
    components: {
        todoPrev
    }
}