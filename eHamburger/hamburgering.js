class Param {
    constructor(name, price, calories) {
        this.name = name
        this.price = price;
        this.calories = calories;
    }

}


class Hamburger {
    constructor(size, stuffing) {
        this.size = size
        this.stuffing = stuffing
        this.toppings = []

    }

    addTopping(topping) {
        this.toppings.push(topping)
    }

    removeTopping(topping) {
        const index = this.toppings.map(item => item.name).indexOf(topping.name);
        if (index > -1) {
            this.toppings.splice(index, 1)
        }
    }

    getToppings() {
        return this.toppings.map(topping => topping.name)
    }

    getSize() {
        return this.size.name
    }

    getStuffing() {
        return this.stuffing.name
    }

    calculatePrice() {
        let totalToppingPrice = this.toppings.reduce((total, topping) => total + topping.price, 0)
        let sizePrice = this.size.price
        let stuffingPrice = this.stuffing.price
        return totalToppingPrice + sizePrice + stuffingPrice
    }

    calculateCalories() {
        let totalToppingCalories = this.toppings.reduce((total, topping) => total + topping.calories, 0)
        let sizeCalories = this.size.calories
        let stuffingCalories = this.stuffing.calories
        return totalToppingCalories + sizeCalories + stuffingCalories
    }
}

let choosen_items = [...document.querySelectorAll('input')].filter(item => item.checked)

let params = choosen_items.map(item => new Param(item.dataset['name'], +item.dataset['price'], +item.dataset['ccal']))

let hamburger = new Hamburger(...params)

let sizes = document.querySelectorAll('div.size > div > input')
let fillings = document.querySelectorAll('div.filling > div > input')
let toppings = document.querySelectorAll('div.topping > div > input')

document.getElementById('main__price').innerText = hamburger.calculatePrice()
document.getElementById('main__calories').innerText = hamburger.calculateCalories()

toppings.forEach((item) => {
    item.addEventListener('click', (event) => {
        let topping = new Param(event.target.dataset['name'], +event.target.dataset['price'], +event.target.dataset['ccal'])
        if (event.target.checked) {
            hamburger.addTopping(topping)
        } else {
            hamburger.removeTopping(topping)
        }

        document.getElementById('main__price').innerText = hamburger.calculatePrice()
        document.getElementById('main__calories').innerText = hamburger.calculateCalories()
    })
})

fillings.forEach((item) => {
    item.addEventListener('click', (event) => {
        hamburger.stuffing = new Param(event.target.dataset['name'], +event.target.dataset['price'], +event.target.dataset['ccal'])

        document.getElementById('main__price').innerText = hamburger.calculatePrice()
        document.getElementById('main__calories').innerText = hamburger.calculateCalories()
    })
})

sizes.forEach((item) => {
    item.addEventListener('click', (event) => {
        console.log(event.target)
        hamburger.size = new Param(event.target.dataset['name'], +event.target.dataset['price'], +event.target.dataset['ccal'])

        document.getElementById('main__price').innerText = hamburger.calculatePrice()
        document.getElementById('main__calories').innerText = hamburger.calculateCalories()
    })
})

