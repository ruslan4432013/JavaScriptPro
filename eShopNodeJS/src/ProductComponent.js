const productComponent = {
    props: ['product'],
    template: `
            <div class="product-item">
                <img :src="product.img" class="productImage" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}</p>
                    <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
                </div>
            </div>
    `
}

const productsComponent = {
    components: {
        product: productComponent
    },
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
}

export default productsComponent