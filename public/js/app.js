$(function () {
    const renderProducts = function () {
        $.ajax({
            method: 'GET',
            url: '/api/Products',
        }).then(function (data) {
            render(data);
        });
    }
    renderProducts();
    let cartArray = [];
    const render = function (Products) {
        $('#productTable').empty();
        for (i = 0; i < Products.length; i++) {
            $('#productTable').append(`
                <div class="row">
                    <div class="col stock_quantity">${Products[i].stock_quantity}</div>
                    <div class="col-3 product_name">${Products[i].product_name}</div>
                    <div class="col-2 department_name">${Products[i].department_name}</div>
                    <div class="col-2 purchase_quantity"><input id="qtyId${Products[i].id}" data-prodID="${Products[i].id}" type="number" name="quantity" min="0" max="${Products[i].stock_quantity}"></input></div>
                    <div class="col-2 price">${Products[i].price}</div>
                    <div class="col-2 addCart"><button class="btn-success addToCart" id="addId${Products[i].id}" data-prodID="${Products[i].id}" data-stockQty="${Products[i].stock_quantity}" data-prodName="${Products[i].product_name}" data-price="${Products[i].price}">Add to Cart</button></div>
                </div class="row">
                <br>
            `);
            document.getElementById(`addId${Products[i].id}`).addEventListener("click", addToCart);
        }
    }
    const addToCart = function (e) {
        e.preventDefault();
        let updateID = $(this).attr('data-prodID');
        let purchaseName = $(this).attr('data-prodName');
        let totalQty = $(this).attr(`data-stockQty`);
        let purcPrice = $(this).attr(`data-price`);
        let subtractQty = ($(`#qtyId${updateID}`).val());

        if (totalQty >= subtractQty && totalQty !== 0) {
            let updatedQty = totalQty - subtractQty;
            const newPurchase = {
                purchaseName: purchaseName,
                purchaseQty: subtractQty,
                purchasePrice: purcPrice * subtractQty
            }
            cartArray.push(newPurchase);
            $.ajax({
                method: 'PUT',
                url: `/api/Products/${updateID}`,
                data: {
                    "stock_quantity": updatedQty
                }
            }).then(function () {
                $(`#qtyId${updateID}`).val("");
                renderProducts();
            });
        } else {
            alert("Sorry we are all out!");
        }
    };
    const viewCart = function (event) {
        event.preventDefault();
        $('#cart').empty();
        let sum = '';
        for (i = 0; i < cartArray.length; i++) {
            sum += parseInt(`${cartArray[i].purchasePrice}`);
            $('#cart').append(`
                <div class="row">
                    <div class="col cartProd">${cartArray[i].purchaseName}</div>
                    <div class="col cartQty">${cartArray[i].purchaseQty}</div>
                    <div class="col cartPrice">$${cartArray[i].purchasePrice}</div>
                </div>
                <br>
            `)
        }
        $('#cart').append(`
        <div class "row">
             <div style="padding-left: 290px">Total: $${sum} </div>
         </div>
    `)

    }
    $("#checkout").on("click", viewCart)
});