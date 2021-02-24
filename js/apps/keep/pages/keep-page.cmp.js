import keepNav from '../cmps/keep-nav.cmp.js';
import keepDev from '../cmps/keep-dev.cmp.js';
import keepInput from '../cmps/keep-input.cmp.js';
import keepList from '../cmps/keep-list.cmp.js';

export default {

    template: `
    <section>
        <keep-nav />
        <keep-dev />
        <keep-input />
        <keep-list />
    </section>
    `,
    components: {
        keepNav,
        keepDev,
        keepInput,
        keepList
    }
}