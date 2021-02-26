export default {
    props:['info'],
    template:`
    <section class="note-type">
        <h1>{{info.label}}</h1>
        <ul>
            <li v-for="(todo,idx) in info.todos">{{info.todos[idx].txt}}</li>
        </ul>
        
    </section>
    `,
}