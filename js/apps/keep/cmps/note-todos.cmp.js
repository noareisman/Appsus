export default {
    props:['info'],
    template:`
    <section>
        <h1>{{info.label}}</h1>
        <ul>
            <li v-for="(todo,idx) in info.todos">{{info.todos[idx].txt}}</li>
        </ul>
        
    </section>
    `,
}