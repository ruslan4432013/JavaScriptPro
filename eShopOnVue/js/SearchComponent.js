Vue.component('search-line', {
    template: `
            <div class="search-item">
                <input type="text" class="search-field" @input="$root.filter" v-model="$root.userSearch">
            </div>
    `
})