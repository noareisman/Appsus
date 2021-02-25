export default {
    props:['info'],
    template:`
    <title>{{info.title}}</title>
    <img :src="info.url">
    `,
}