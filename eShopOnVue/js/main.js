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
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },

        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },


        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product)
                        if (find) {
                            find.quantity++
                        } else {
                            const prod = Object.assign({quantity: 1}, product)
                            this.cartItems.push(prod)
                        }
                    }
                })
        },

        remove(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    }
                })
        }
    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
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
