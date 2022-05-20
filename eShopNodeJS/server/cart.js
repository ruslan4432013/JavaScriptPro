const fs = require('fs');
const path_to_log = 'server/db/stats.json'


let log = (item_name, action, path = path_to_log) => {

    let message = `${action} ${item_name} ${new Date().toString()}`
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let newMessage = data
            newMessage += message + '\n'
            fs.writeFile(path, newMessage, (err) => {
                if (err) {
                    console.log(err)
                }

            });
        }
    })
}

let add = (cart, req) => {
    cart.contents.push(req.body);
    let item_name = req.body.product_name
    log(item_name, 'add')

    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    let item_name = find.product_name

    log(item_name, 'change')

    return JSON.stringify(cart, null, 4);
};

let remove = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    let item_name = find.product_name
    if (find.quantity > 1) {
        find.quantity -= 1;
    } else {
        cart.contents.splice(cart.contents.indexOf(find), 1)
    }
    log(item_name, 'remove')
    return JSON.stringify(cart, null, 4);
}

module.exports = {
    add,
    change,
    remove
};