"use strict";
var socket = io("http://localhost:4000");
var productList = [];
const tag = document.querySelector("#info");
var overlap = 0;
var countProduct = {};
var product_Number = 1;
let countData = {};
let sumPrice = 0;
var getProperty = function (propertyName) {
  return countProduct[propertyName];
};
var plusProperty = function (propertyName) {
  countProduct[propertyName] = getProperty(propertyName) + 1;
};

socket.on("connect", () => {
  console.log("connected server");
});
socket.on("sendCode", (data) => {
  const product = {
    companyName: data[0].company,
    productName: data[0].product_name,
    price: data[0].price,
  };
  if (productList.length == 0) {
    countProduct[`${data[0].product_name}`] = 1;
    tag.innerHTML =
      tag.innerHTML +
      `<li class="list-group-item" id="${data[0].product_name}">${
        data[0].company
      }, ${data[0].product_name}, ${data[0].price}, ${getProperty(
        data[0].product_name
      )}</li>`;
    product.productNumber = product_Number;
    product.productCount = 1;
    sumPrice = sumPrice + product.price;
    productList.push(product);
  } else {
    for (let list in productList) {
      if (productList[list].productName === data[0].product_name) {
        overlap = 1;
        product_Number = productList[list].productNumber;
        break;
      } else {
        overlap = 0;
      }
    }
    if (overlap != 0) {
      plusProperty(data[0].product_name);
      var li = document.getElementById(`${data[0].product_name}`);
      li.textContent = `${data[0].company}, ${data[0].product_name}, ${
        data[0].price
      }, ${getProperty(data[0].product_name)}`;
      product.productNumber = product_Number;
      product.productCount = getProperty(data[0].product_name);
      sumPrice = sumPrice + product.price;
    } else {
      productList.forEach((productInfo) => {
        countData[productInfo.productName] = 1;
      });
      countProduct[`${data[0].product_name}`] = 1;
      tag.innerHTML =
        tag.innerHTML +
        `<li class="list-group-item" id="${data[0].product_name}">${
          data[0].company
        }, ${data[0].product_name}, ${data[0].price},${getProperty(
          data[0].product_name
        )}</li>`;
      product.productNumber = Object.values(countData).length + 1;
      product.productCount = 1;
      sumPrice = sumPrice + product.price;
    }
    productList.push(product);
  }
  let priceInfo = document.getElementById("priceInfo");
  priceInfo.textContent = `${sumPrice}`;
});

var postdata = document.getElementById("postdata");

postdata.addEventListener("click", () => {
  tag.innerHTML = "";
  socket.emit("sendList", JSON.stringify(productList));
  productList = [];
  console.log("전송완료");
  countProduct = {};
  countData = {};
  sumPrice = 0;
  let priceInfo = document.getElementById("priceInfo");
  priceInfo.textContent = `${sumPrice}`;
});
