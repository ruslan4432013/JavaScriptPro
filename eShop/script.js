class GoodsItem {
    constructor(title, price, img = 'http://placekitten.com/g/160/120') {
        this.title = title;
        this.price = price;
        this.img = img
    }

    render() {
        return (
            `<div class="col-sm-3 my-3">
            <div class="card"">
            <img src="${this.img}" class="card-img-top" alt="kitten">
              <div class="card-body">
                <h1 class="card-title">${this.title}</h1>
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
        this.goods = [
            {title: 'Shirt', price: 150},
            {title: 'Socks', price: 50},
            {title: 'Jacket', price: 350},
            {title: 'Shoes', price: 250},
        ]
    }

    totalPrice() {
        return this.goods.reduce((total, item) => total + item.price, 0);
    }

    render() {
        let listHTML = ''
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHTML += goodItem.render()
        });
        document.querySelector('.goods-list').innerHTML = listHTML
    }
}

class CartItems {
    constructor() {
    }
}

class CartItem {
    constructor() {
    }
}

const list = new GoodsList();
list.fetchGoods()
console.log(list.totalPrice())
list.render()