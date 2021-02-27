export default {
    template: `
    <header class="main-header flex space-between">
            <div class="logo">
                <router-link to="/" exact>
                     <h1>
                         <button class="home-page">
                             Appsus
                        </button>
                    </h1>
                </router-link> 
            </div>
            <div class="appsus-main-nav flex">
                <router-link to="/email">
                    <button class="email-btn">
                        Email
                    </button>
                </router-link> 
                <hr />
                
                <router-link to="/keep">
                    <button class="keep-btn">
                        Keep
                    </button>
                </router-link> 
            </div>
     </header>
     `,
}