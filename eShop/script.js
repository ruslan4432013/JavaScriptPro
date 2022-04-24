const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class GoodsItem {
    constructor(product_name, price, img = 'http://placekitten.com/g/160/120') {
        this.product_name = product_name;
        this.price = price;
        this.img = img
    }

    render() {
        return (
            `<div class="col-sm-3 my-3">
            <div class="card"">
            <img src="${this.img}" class="card-img-top" alt="kitten">
              <div class="card-body">
                <h1 class="card-title">${this.product_name}</h1>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <h5>Price: ${this.price} ₽</h5>
                <a href="#" class="btn btn-primary">Go to item</a>
              </div>
            </div>
        </div>`)
    }
}

class GoodsList {
    constructor() {
        this.goods = []
    }

    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`).then((data) => {
            this.goods = data
        })
    }


    totalPrice() {
        return this.goods.reduce((total, item) => total + item.price, 0);
    }

    render() {
        let listHTML = ''
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHTML += goodItem.render()
        });
        document.querySelector('.goods-list').innerHTML = listHTML

    }
}

class CartItems {
    constructor() {
        this.amount = 0
        this.countGoods = 0
        this.cartItems = []
    }


    fetchCart() {
        makeGETRequest(`${API_URL}/getBasket.json`).then((data) => {
            this.amount = data.amount
            this.countGoods = data.countGoods
            this.cartItems = data.content.map(item => {
                new CartItem(item.id, item.product_name, item.price, item.quantity)
            })
        })
    }

    addCartItem(item) {
        makeGETRequest(`${API_URL}/addToBasket.json`).then((data) => {
            if (data.result === 1) {
                this.amount += item.price
                this.countGoods += item.quantity
                this.cartItems.push(item)
            }
        }).catch(error => console.log(error))
    }

    removeCartItem(item) {
        makeGETRequest(`${API_URL}/deleteFromBasket.json`).then((data) => {
            if (data.result === 1) {
                const index = this.cartItems.map(item => item.id).indexOf(item.id);
                if (index > -1) {
                    this.cartItems.splice(index, 1)
                    this.amount -= item.price
                    this.countGoods -= item.quantity
                }
            }
        })
    }

}

class CartItem {
    constructor(id, product_name, price, quantity) {
        this.id = id
        this.product_name = product_name
        this.price = price
        this.quantity = quantity
    }
}

function makeGETRequest(url) {
    return fetch(url).then((response) => response.json())
}


const list = new GoodsList();
list.fetchGoods().then(() => list.render())

const mainCart = new CartItems()
mainCart.fetchCart()