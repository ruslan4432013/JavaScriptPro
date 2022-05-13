const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        filtered: [],
        cartItems: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        userSearch: '',
        show: false
    },
    methods: {
        filter(value){
         const regexp = new RegExp(value, 'i');
         this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },

        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },



        addProduct(product){
            console.log(product.id_product);
        }
    },

    mounted(){
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
                   this.filtered.push(el);
               }
           });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })

        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                this.cartItems = data.contents
                console.log(this.cartItems)
            })
    }
})
