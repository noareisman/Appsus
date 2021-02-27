export default {
    props:['info'],
    template:`
    <section class="note-type">
        <h2>{{info.label}}</h2>
        <ul>
            <li v-for="(todo,idx) in info.todos">{{info.todos[idx].txt}}</li>
        </ul>
        
    </section>
    `,
}