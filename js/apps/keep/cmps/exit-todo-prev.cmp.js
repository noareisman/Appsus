export default {
    props: ['todo', 'idx'],
    template: `
    <div :class="isPinned" @click="toggleDone">
        {{todo.txt}}
    </div>`,
    computed: { isPinned() { return { done: this.todo.isDone }; } },
    methods: { toggleDone() { this.todo.isDone = !this.todo.isDone; } }
}