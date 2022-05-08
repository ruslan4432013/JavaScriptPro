const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class GoodsItem {
    constructor(product_name, price, id, img = 'http://placekitten.com/g/160/120') {
        this.product_name = product_name;
        this.price = price;
        this.img = img
        this.id = id
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
                <a href="#" data-id="${this.id}" data-price="${this.price}" data-product_name="${this.product_name}" class="btn btn-primary buy-btn">Buy</a>
              </div>
            </div>
        </div>`)
    }
}

class GoodsList {
    constructor() {
        this.goods = []
        this.filteredGoods = []
    }

    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`).then((data) => {
            this.goods = data
            this.filteredGoods = data
        })
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name))
        this.render()
    }


    render() {
        let listHTML = ''
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHTML += goodItem.render()
        });
        document.querySelector('.goods-list').innerHTML = listHTML


    }
}

class CartItems {
    constructor() {
        this.cartItems = []

    }


    fetchCart() {
        makeGETRequest(`${API_URL}/getBasket.json`).then((data) => {
            this.amount = data.amount
            this.countGoods = data.countGoods

            this.cartItems = data.contents.map(item => {
                return new CartItem(item.id_product, item.product_name, item.price, item.quantity)
            })
            this.render()
            this._init()
            this._initRemove()
        })
    }


    addCartItem(item) {

        makeGETRequest(`${API_URL}/addToBasket.json`).then((data) => {
            if (data.result === 1) {
                let itemsId = this.cartItems.map(item => +item.id)
                if (itemsId.includes(item.id)) {
                    this.cartItems.filter(element => element.id === item.id)[0].quantity += item.quantity
                } else {
                    this.cartItems.push(item)
                }
                this.render()
                this._initRemove(item.id)


            }
        }).catch(error => console.log(error))
    }

    removeCartItem(item_id) {
        makeGETRequest(`${API_URL}/deleteFromBasket.json`).then((data) => {
            if (data.result === 1) {


                const index = this.cartItems.map(item => +item.id).indexOf(+item_id);

                if (index > -1) {
                    this.cartItems.splice(index, 1)
                }
                document.getElementById(`main-cart-item-${item_id}`).remove()
                this._initRemove()
            }
        })
    }

    getPriceForItem(item_id) {
        let filteredItem = this.cartItems.filter(item => item.id === item_id)[0]
        return filteredItem.price * filteredItem.quantity

    }


    render() {
        if (this.cartItems.length > 0) {
            document.getElementById('drop-cart').innerHTML = this.cartItems.map(item => item.render(this)).join('')
        } else {
            document.getElementById('drop-cart').innerHTML = ''
        }


    }

    _init() {
        console.log(document.querySelectorAll('.buy-btn'))
        document.querySelectorAll('.buy-btn').forEach((element) => {
            element.addEventListener('click', (e) => {
                let targetDataset = e.target.dataset;
                this.addCartItem(new CartItem(
                        targetDataset['id'],
                        targetDataset['product_name'],
                        targetDataset['price'],
                        1
                    )
                )
            })
        })


    }

    _initRemove(item_id = null) {
        if (!item_id) {
            document.querySelectorAll('.btn-remove').forEach((element) => {
                element.addEventListener('click', (e) => {
                    this.removeCartItem(e.target.dataset['id'])
                })
            })
        } else {
            let filteredItem = [...document.querySelectorAll('.btn-remove')].filter(element => +element.dataset['id'] === +item_id)[0]

            filteredItem.addEventListener('click', (e) => {
                this.removeCartItem(e.target.dataset['id'])
            })
        }
        this._initChange()
    }

    changeItemQuantity(item_id, quantity) {

        this.cartItems.filter(item => +item.id === +item_id)[0].quantity = quantity
        this.render()
        this._initChange()
        this._initRemove()
    }

    _initChange() {
        document.querySelectorAll('.plus').forEach((element) => {
            element.addEventListener('click', (e) => {
                let input = e.target.parentNode.querySelector('input[type=number]')
                console.log(input.dataset['id'])
                this.changeItemQuantity(input.dataset['id'], input.value)
            })
        })
        document.querySelectorAll('.minus').forEach((element) => {
            element.addEventListener('click', (e) => {
                let input = e.target.parentNode.querySelector('input[type=number]')
                this.changeItemQuantity(input.dataset['id'], input.value)
            })
        })
    }


}

class CartItem {
    constructor(id, product_name, price, quantity, img = 'http://placekitten.com/g/160/120') {
        this.id = +id
        this.product_name = product_name
        this.price = +price
        this.quantity = +quantity
        this.img = img
    }

    getFullPrice(obj) {
        return obj.getPriceForItem(this.id)
    }

    render(obj) {


        return (`
                    <li id="main-cart-item-${this.id}">
                        <div class="cart-item" data-id="${this.id}">
                            <div class="product-bio">
                                <img src="${this.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${this.product_name}</p>
                                    <div class="def-number-input number-input safari_only">
                                        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                                class="minus" data-id="${this.id}"></button>
                                        <label>
                                            <input class="quantity" data-id="${this.id}" id="quantity-${this.id}" min="1" name="quantity" value="${this.quantity}" type="number">
                                        </label>
                                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                                class="plus" data-id="${this.id}"></button>
                                    </div>
                                    <p class="product-single-price">Цена товара: ${this.price}₽</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">Всего: ${this.getFullPrice(obj)}₽</p>
                                <button class="btn btn-danger btn-remove" data-id="${this.id}">×</button>
                            </div>
                        </div>
                    </li>        
        `)
    }
}

function makeGETRequest(url) {
    return fetch(url).then((response) => response.json())
}


const list = new GoodsList();
list.fetchGoods().then(() => list.render())

const mainCart = new CartItems()
mainCart.fetchCart()

let searchButton = document.getElementById('searchBtn')
let searchInput = document.getElementById('searchInput')
searchButton.addEventListener('click', (e) => {
    const value = searchInput.value
    list.filterGoods(value)
})