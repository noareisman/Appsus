export default {
    template: `
        <section class="new-msg">
            <h1 class="new-msg-header">New Message</h1>
            <table class="flex column">
                <tr class="flex"> 
                    <td class="new-msg-to"> To:<input></td>
                </tr>
                <hr />
                <tr class="flex"> 
                    <td class="new-msg-cc"> Cc:<input></td>
                </tr>
                <hr />
                <tr class="flex"> 
                    <td class="new-msg-bcc"> Bcc:<input></td>
                </tr>
                <hr />
                <tr class="flex"> 
                    <td class="new-msg-subject"> Subject:<input></td>
                </tr>
                <hr />
                <tr class="flex"> 
                    <td class="new-msg-content"><input placeholder="New message..." ></td>
                </tr>
            </table>

        </section>
    `
}