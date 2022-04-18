const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];


const renderGoodsItem = (item) => {
    return `<div class="col-sm-3 my-3">
            <div class="card"">
              <div class="card-body">
                <h1 class="card-title">${item.title}</h1>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <h5>Price: ${item.price} ₽</h5>
                <a href="#" class="btn btn-primary">Go to item</a>
              </div>
            </div>
        </div>`;
};

const renderGoodsList = (items, price=15) => {
    console.log(price)
    document.querySelector('.goods-list').innerHTML = items.map(item => renderGoodsItem(item)).join('');
}

renderGoodsList(goods);

