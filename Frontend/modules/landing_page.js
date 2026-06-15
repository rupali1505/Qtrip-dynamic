import config from "../conf/index.js";

async function init() {
    console.log('i am init');
    let cities = await fetchCities();
    console.log(cities,'city data')
    if (cities) {
        cities.forEach(ele => {
            addCityToDom(ele.id, ele.city, ele.description, ele.image)
        });
    }
}

async function fetchCities() {
    try {
        const url = `${config.backendEndpoint}/cities`;
        const response = await fetch(url);
        const citiesData = response.json();
        return citiesData;
    } catch (error) {
        return null;
    }
}

function addCityToDom(id, city, description, image) {
    let link = `pages/adventures/?city=${id}`;
    let cardsRow = document.querySelector("#data");
    cardsRow.innerHTML += `
  <div class="col-sm-6 col-lg-3 mt-3"> 
      <a href="${link}" id="${id}">
          <div class="tile">
            <img src="${image}" alt="${city}">
            <div class="tile-text">
              <h5>${city}</h5>
              <p>${description}</p>
            </div> 
          </div>
        </a>
  </div>
  `
}
export {
    init,fetchCities,addCityToDom
}