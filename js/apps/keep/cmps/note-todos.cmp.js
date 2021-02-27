import exitTodoPrev from './exit-todo-prev.cmp.js';
export default {
    props: ['info'],
    template: `
    <section class="note-type">
        <h1>{{info.title}}</h1>
        <ul>
            <li v-for="(todo, idx) in info.todos">
                <exit-todo-prev :todo="todo" :idx="idx" />
            </li>
        </ul>
    </section>`,
    components: { exitTodoPrev }
}