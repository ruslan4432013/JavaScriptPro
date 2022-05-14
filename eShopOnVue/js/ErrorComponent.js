Vue.component('error-message', {
    props: ['error'],
    template: `
    <div v-show="error" class="error">
        <h1>Не удалось получить ответ от сервера</h1>
    </div>
    `
})