let image;
async function imagedata() {
  await fetch("http://localhost:4000/managerPage/cctv/images")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      var stringdata = JSON.stringify(myJson);
      image = JSON.parse(stringdata);
    });
}
async function cardUpdate() {
  await imagedata();
  let card = document.getElementById("card");
  for (let i in image) {
    card.innerHTML =
      card.innerHTML +
      `
    <div class="card" style="width: 18rem">
          <img src="/${image[i].imagename}" class="card-img-top" alt "이미지"/>
          <div class="card-body">
            <h5 class="card-title">${image[i].imagename}</h5>
            <p class="card-text">
              촬영시각 : ${image[i].date}
            </p>
          </div>
        </div>`;
  }
}
var getimages = document.getElementById("getimages");
getimages.addEventListener("click", () => {
  cardUpdate();
});
