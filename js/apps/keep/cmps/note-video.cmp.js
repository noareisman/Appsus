export default {
    props:['info'],
    template:`
    <section class="note-type">
        <h1>{{info.title}}</h1>
        <img :src="info.url">
    </section>
        `,
}