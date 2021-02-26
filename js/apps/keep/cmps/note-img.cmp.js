export default {
    props:['info'],
    template:`
    <section>
        <h1>{{info.title}}</h1>
        <img :src="info.url">
    </section>
    `
}