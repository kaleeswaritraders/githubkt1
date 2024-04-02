let itemList =  document.querySelector('.items');
let cart = document.querySelector('.cart');
let cartList = document.querySelector('.cart-list');
let total = document.querySelector('.total');
let tax = document.querySelector('.tax');
let subtotal = document.querySelector('.subtotal');


let items = [
    {
        id: 1,
        name: 'CASHEW 840',
        image: 'https://storage.googleapis.com/shy-pub/67951/1633612264498_cashew.png',
        price: 50
    },
    {
        id: 2,
        name: 'ALMOND',
        image: 'https://storage.googleapis.com/shy-pub/67951/1633612264498_cashew.png',
        price: 150
    },
    {
        id: 3,
        name: 'PISTACHO',
        image: 'https://storage.googleapis.com/shy-pub/67951/1633612264498_cashew.png',
        price: 300
    },
    {
        id: 4,
        name: 'WALNUTS',
        image: 'https://storage.googleapis.com/shy-pub/67951/1633612264498_cashew.png',
        price: 20
    },
    {
        id: 5,
        name: 'DRIED DATES',
        image: 'https://storage.googleapis.com/shy-pub/67951/1633612264498_cashew.png',
        price: 200
    },
    {
        id: 6,
        name: 'DRIED CRANBERRY',
        image: 'https://storage.googleapis.com/shy-pub/67951/1633612264498_cashew.png',
        price: 1000
    }
]

function initItem() {
    items.forEach((value, key) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('style', 'width: 15rem;');
        card.innerHTML = `
            <img src="${value.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title text-center">${value.name}</h4>
                <p class="card-text text-center">Price: ${value.price}</p>
                <button class="add-to-cart btn btn-dark form-control" onclick="addToCart(${key})">Add to Cart</button>
            </div>`;
        itemList.appendChild(card);
    });
}

initItem();

let cartLists = [];

function addToCart(key) {
    if (cartLists[key] == null) {
        cartLists[key] = JSON.parse(JSON.stringify(items[key]));
        cartLists[key].quantity = 1;
    }
    reloadCart();
}

function reloadCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;
    cartLists.forEach((value, key) => {
        totalPrice = totalPrice + value.price;

        if (value != null) {
            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            listItem.innerHTML = `
                <div><img src="${value.image}" style="width: 80px"/></div>
                <div><h5 class="mt-1">${value.name}</h5></div>
                <div><h6 class="mt-2">${value.price.toLocaleString()}</h6></div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count m-2">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            cartList.appendChild(listItem);
        }
    });

    // Calculate subtotal, tax, and total
    subtotal.innerText = totalPrice.toLocaleString();
    tax.innerText = (totalPrice * 0.12).toLocaleString(); // Assuming 12% tax
    total.innerText = (totalPrice + parseFloat(tax.innerText)).toLocaleString();

    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete cartLists[key];
    } else {
        cartLists[key].quantity = quantity;
        cartLists[key].price = quantity * items[key].price;
    }
    reloadCart();
}

function clearCart() {
    cartLists = [];
    reloadCart();
}