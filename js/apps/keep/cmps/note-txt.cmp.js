export default {
    props: ['info'],
    template: `
    <section class="note-type">
        <h1>{{info.title}}</h1>
        <h2>{{info.txt}}</h2>
    </section>`
}