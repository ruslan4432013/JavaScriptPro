const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];


const renderGoodsItem = (item, img = 'http://placekitten.com/g/160/120') => {
    return `<div class="col-sm-3 my-3">
            <div class="card"">
            <img src="${img}" class="card-img-top" alt="kitten">
              <div class="card-body">
                <h1 class="card-title">${item.title}</h1>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <h5>Price: ${item.price} ₽</h5>
                <a href="#" class="btn btn-primary">Go to item</a>
              </div>
            </div>
        </div>`;
};

const renderGoodsList = (items) => {
    document.querySelector('.goods-list').innerHTML = items.map(item => renderGoodsItem(item)).join('');
}

renderGoodsList(goods);

