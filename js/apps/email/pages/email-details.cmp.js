export default {
    props: ['msg'],
    template: `
        <section>
            <h1>{{msg.id}}</h1>
            <h1>{{msg.body}}</h1>
            <h1>{{msg.subject}}</h1>
            <h1>{{msg.isRead}}</h1>
            <h1>{{msg.sentAt}}</h1>
        </section>
    `
}