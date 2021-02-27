export default {
    template: `
       <section>
            <ul class="keep-dev-item flex column">
                <li @click="setFilter('all')">All notes</li>
                <li @click="setFilter('video')">Video</li>
                <li @click="setFilter('list')">Lists</li>
                <li @click="setFilter('txt')">Text</li>
                <li @click="setFilter('images')">Images</li>
                <li @click="setFilter('trash')">Trash</li>
            </ul>
    </section>
    `
}