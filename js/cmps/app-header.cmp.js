export default {
    template: `
    <header class="flex space-between">
            <div class="logo">
                <router-link to="/" exact>
                     <h1>Appsus</h1>
                </router-link> 
            </div>
            <div class="appsus-main-nav">
                <router-link to="/email">Email</router-link> |
                <router-link to="/keep">Keep</router-link> |
                <router-link to="/book">Books</router-link> 
            </div>
     </header>
     `,
}