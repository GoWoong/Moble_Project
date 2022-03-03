"use strict";
var socket = io("http://localhost:4000");
var productList = [];
const tag = document.querySelector("#info");
socket.on("connect", () => {
  console.log("connected server");
});
socket.on("sendCode", (data) => {
  const product = {
    companyName: data[0].company_name,
    productName: data[0].Product_name,
    price: data[0].price,
  };
  productList.push(product);
  tag.innerHTML =
    tag.innerHTML +
    `<li class="list-group-item">${data[0].company_name}, ${data[0].Product_name}, ${data[0].price}</li>`;
});

var postdata = document.getElementById("postdata");

postdata.addEventListener("click", () => {
  tag.innerHTML = "";
  socket.emit("sendList", productList);
  productList = [];
  console.log(productList);
});
