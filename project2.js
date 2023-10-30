let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
iconCart.addEventListener('click' , () => {
    if( cart.style.right == '-100%') {
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }
    else {
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click' , () => {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})
let products = null;
// get data from file json
fetch('product.json')
.then(response => response.json())
.then(data => {
    products = data;
    addDataToHTML();
})
function addDataToHTML(){
    // remove data defualt in html
    let listProducthtml = document.querySelector('.listProduct')
    listProducthtml.innerHTML = '';
    // add new data
    if( products != null ) {
        products.forEach(product=>{
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML =
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>
            <button onclick = "addCart(${product.id})">Add to cart</button>`;
            listProducthtml.appendChild(newProduct)
        })
    }
}
let listCart = []
// and I get cookie data cart
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1])
    }
}
checkCart();
function addCart ($idProduct){
    let productCopy = JSON.parse(JSON.stringify(products));
    // if this product is not int the cart
    if ( !listCart[$idProduct]){
        let dataProduct = productCopy.filter(
            product => product.id = $idProduct
        )[0];
        // add data product in cart
        listCart[$idProduct] = dataProduct;
        listCart[$idProduct].quantity = 1;
    }
    else {
        // it this product is already in the cart
        //i just increased the quantity
        listCart[$idProduct].quantity++;
    }
    // I will save datas is already in the cart
    // to save this datas cart when I turn of the computer
    let timeSave = "expires = Thu , 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart="+ JSON.stringify(listCart)+";" + timeSave + "; path/=;";
    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){
    /// clear data defualt;
    let listCartHTML = document.querySelector('.listCart')
    console.log(listCartHTML)
    listCartHTML.innerHTML = '';
    let totalHTML = document.querySelector('.totalQuantity');
    let sumQuanity = 0
    // Inside your addCartToHTML function
if ( listCart ){
    listCart.forEach(product => {
        if( product ) {
            let newCart = document.createElement('div')
            newCart.classList.add('item')
            newCart.innerHTML = 
            ` <img src="${product.image}" alt="">
            <div class="content">
                <div class="name">
                   ${product.name}
                </div>
                <div class="price">
                    ${product.price}/1 product
                </div>
            </div>
            <div class="quantity">
                <button onclick="changeQuantity(${product.id}, '-')">-</button>
                <span class="value">${product.quantity}</span>
                <button onclick="changeQuantity(${product.id}, '+')">+</button>
            </div>`
            listCartHTML.appendChild(newCart)
            sumQuanity += product.quantity;
        }
    })
  }
    totalHTML.innerText = sumQuanity;
    
}
function changeQuantity( $idProduct , $type){
    switch($type){
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
        default:
                break;
    }
    // to save this datas cart when I turn of the computer
    let timeSave = "expires = Thu , 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart="+ JSON.stringify(listCart)+";" + timeSave + "; path/=;";
    addCartToHTML();
}

