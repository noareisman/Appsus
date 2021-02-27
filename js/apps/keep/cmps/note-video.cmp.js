export default {
    props: ['info'],
    template: `
    <section class="note-type">
        <h1>{{info.title}}</h1>
        <div>
            <iframe width="340" height="250" :src="info.url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <h2>{{info.txt}}</h2>
    </section> `
}