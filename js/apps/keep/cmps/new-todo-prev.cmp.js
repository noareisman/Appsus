export default {
    props: ['todo', 'index'],
    template: `
        <div :class="mark" @click="toggleDone">
            {{todo.txt}}
        </div>    
    `,
    data() {
        return {
            isDone: null
        }
    },
    methods: {
        toggleDone() {
            this.isDone = !this.isDone
            this.$emit('done', this.isDone, this.index)
        },
    },
    computed: {
        mark() {
            return { done: this.isDone }
        }
    },
    created() {
        this.isDone = false;
    }
}