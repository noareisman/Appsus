export default {
    props: ['todoslist'],
    template: `
        <ul class="new-todo-list">
            <li @click="toggleDone" title="Done / Not done" class="new-todo" v-for="todo in todoslist">
                {{todo.txt}}
            </li>
        </ul>
    `,
    methods: {
        toggleDone(item) {
            const el = item.target;
            el.classList.toggle("done");
        }
    }
}