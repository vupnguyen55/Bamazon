const db = require('../models');
const items = [
  {
    product_name: "Microsoft Office",
    department_name: "Software",
    price: 199,
    stock_quantity: 50
    }, 
  {
    product_name: "Adobe Photoshop",
    department_name: "Software",
    price: 199,
    stock_quantity: 10
    }, 
  {
    product_name: "Sennheiser HD 6XX",
    department_name: "Headphones",
    price: 250,
    stock_quantity: 24
    }, 
  {
    product_name: "LG UM29-P",
    department_name: "Monitor",
    price: 299,
    stock_quantity: 8
    }, 
  {
    product_name: "Yeti Blue Microphone",
    department_name: "Microphone",
    price: 100,
    stock_quantity: 29
    }, 
  {
    product_name: "Netgear XR500",
    department_name: "Router",
    price: 229,
    stock_quantity: 19
    }, 
  {
    product_name: "Apple Macbook Pro (w/o touchbar)",
    department_name: "Computer",
    price: 1499,
    stock_quantity: 20
    }, 
  {
    product_name: "Apple Macbook Pro (w/touchar)",
    department_name: "Computer",
    price: 1799,
    stock_quantity: 25
    }, 
  {
    product_name: "Samsung S10+",
    department_name: "Cellphone",
    price: 999,
    stock_quantity: 30
    }, 
  {
    product_name: "Anker 20000amph",
    department_name: "External Battery",
    price: 49,
    stock_quantity: 50
    }
  ];
  db.sequelize.sync({force: true}).then(function() {
    db.Product.bulkCreate(items).then(function(rows) {
      console.log('\n\nINSERTED\n\n');
    //   db.sequelize.close();
    }).catch(function(err) {
      console.log('\n\nError:', err);
    });
  });