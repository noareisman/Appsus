export default {
    props:['info'],
    template:`
    <section class="note-type">
        <h1 class="img-item-in-note">{{info.title}}</h1>
        <img :src="info.url">
    </section>
    `
}