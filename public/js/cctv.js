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
  console.log(image);
  console.log(typeof image);
  let card = document.getElementById("card");
  for (let i in image) {
    console.log(image[i]);
    card.innerHTML =
      card.innerHTML +
      `
    <div class="card" style="width: 18rem">
          <img src="/uploads/${image[i].imagename}" class="card-img-top" />
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

{
  /* <div class="card" style="width: 18rem">
          <!-- <img src="..." class="card-img-top" alt="..." /> -->
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div> */
}
