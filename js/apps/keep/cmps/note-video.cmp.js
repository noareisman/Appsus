export default {
    props:['info'],
    template:`
    <section class="note-type">
        <h2>{{info.title}}</h2>
        <img :src="info.url">
    </section>
        `,
}