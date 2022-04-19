class Topping {
    constructor(name, price, calories) {
        this.name = name
        this.price = price;
        this.calories = calories;
    }

}

class Size {
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class Stuffing {
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
        const index = this.toppings.indexOf(topping);
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

let smallSize = new Size('small', 50, 20)
let bigSize = new Size('big', 100, 40)

let cheese = new Stuffing('cheese', 10, 20)
let salad = new Stuffing('salad', 20, 5)
let potato = new Stuffing('potato', 15, 10)

let seasoning = new Topping('salt', 15, 0)
let mayonnaise = new Topping('mayonnaise', 20, 5)
//example

//cook
let hamburger = new Hamburger(smallSize, potato)
hamburger.addTopping(mayonnaise)

//ingredients
console.log(hamburger.getStuffing())
console.log(hamburger.getToppings())
console.log(hamburger.getSize())

//total
console.log(hamburger.calculateCalories())
console.log(hamburger.calculatePrice())



