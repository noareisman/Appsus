export default {
    props: ['msg'],
    template: `
        <section  class="msg-details flex column" >
            <div class="flex center">    
                <h1>Subject:</h1> <h2>{{msg.subject}}</h2>
                <!-- <h1>From:</h1> <h2>{{msg.participants.sender}}</h2> -->
            </div>
            <div class="flex">    
                <!-- <h1>Subject:</h1> <h2>{{msg.subject}}</h2> -->
                <h1>From:</h1> <h2>{{msg.participants.sender}}</h2>
            </div>
            
            <div class="msg-main-content">
                <p>{{msg.body}}</p>
            </div>
        </section>
    `
}