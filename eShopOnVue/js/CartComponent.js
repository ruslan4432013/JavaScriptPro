Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `
        <div class="cart-block" v-show="visibility">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
            </cart-item>
        </div>
    `
})

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
    <div class="cart-item">
        <div class="product-bio">
            <img :src="img" alt="">
            <div class="product-desc">
                <div class="product-title">{{ cartItem.product_name }}</div>
                <div class="product-quantity">{{ cartItem.quantity }}</div>
                <div class="product-single-price">{{ cartItem.price }}</div>
            </div>
        </div>
        <div>
            <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
            <button class="del-btn" @click="$root.remove(cartItem)">x</button>
        </div>
    </div>
    `
})