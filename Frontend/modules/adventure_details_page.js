import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
    // TODO: MODULE_ADVENTURE_DETAILS
    // 1. Get the Adventure Id from the URL
    try {
        const urlParams = new URLSearchParams(search);
        const adventure = urlParams.get("adventure");
        // console.log(adventure);
        // 1. Extract the city id from the URL's Query Param and return it
        return adventure;
    } catch (error) {
        return null;
    }
    // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
    // TODO: MODULE_ADVENTURE_DETAILS
    // 1. Fetch the details of the adventure by making an API call
    try {
        const url = config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        return null;
    }

    // Place holder for functionality to work in the Stubs
}


//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
    // TODO: MODULE_ADVENTURE_DETAILS
    // 1. Add the details of the adventure to the HTML DOM
    const { name, subtitle, images, content } = adventure;
    const adventureNameElement = document.getElementById("adventure-name");
    const adventureContentElement = document.getElementById("adventure-content");
    const adventureSubtitleElement = document.getElementById("adventure-subtitle");
    const photoGalleryElement = document.getElementById("photo-gallery");

    adventureNameElement.innerHTML = name;  //both approach
    adventureSubtitleElement.innerHTML = subtitle;
    adventureContentElement.innerHTML = content;

    images.map((image) => {
        const container = document.createElement("div");
        container.className = "col-lg-12 col-md-6";
        container.innerHTML = `
    <img
    src=${image}
    alt="picture"
    class="activity-card-image"
    />
    `
        photoGalleryElement.append(container);
    })


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
    // TODO: MODULE_ADVENTURE_DETAILS
    // 1. Add the bootstrap carousel to show the Adventure images
    const photoGalleryElement = document.getElementById("photo-gallery");
    photoGalleryElement.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
 
  <div class="carousel-indicators" id="carousel-buttons">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  
  <div class="carousel-inner" id="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
    const carouselInnerElement = document.getElementById("carousel-inner");
    images.forEach((image, index) => {
        const container = document.createElement("div");
        container.className = `col-lg-12 carousel-item ${index === 0 ? 'active' : ''}`;
        container.innerHTML = `
    <img
    src=${image}
    alt="pic"
    class="activity-card-image"
    />
    `
        carouselInnerElement.append(container);
    })


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
    // TODO: MODULE_RESERVATIONS
    // 1. If the adventure is already reserved, display the sold-out message.
    const { available, costPerHead } = adventure;

    const reservationPanelSoldOutElement = document.getElementById("reservation-panel-sold-out");
    const reservationPanelAvailableElement = document.getElementById("reservation-panel-available");
    const reservationPanelPersonCostElement = document.getElementById("reservation-person-cost");

    reservationPanelPersonCostElement.innerHTML = costPerHead;

    if (adventure.available) {
        document.getElementById("reservation-panel-available").style.display = "block";
        document.getElementById("reservation-panel-sold-out").style.display = "none";
        document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
    } else {
        document.getElementById("reservation-panel-sold-out").style.display = "block";
        document.getElementById("reservation-panel-available").style.display = "none";
    }



}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
    // TODO: MODULE_RESERVATIONS
    // 1. Calculate the cost based on number of persons and update the reservation-cost field
    const { costPerHead } = adventure;
    const totalCost = costPerHead * persons;

    const reservationCostElement = document.getElementById("reservation-cost");
    reservationCostElement.innerHTML = totalCost;


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
    // TODO: MODULE_RESERVATIONS
    // 1. Capture the query details and make a POST API call using fetch() to make the reservation
    // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    const formElement = document.getElementById("myForm");

    const nameElement = formElement.elements["name"];
    const dateElement = formElement.elements["date"];
    const personElement = formElement.elements["person"];

    formElement.addEventListener("submit", async (event) => {
        event.preventDefault();

        const payload = {
            name: nameElement.value,
            date: dateElement.value,
            person: personElement.value,
            adventure: adventure.id,
        }

        const url = config.backendEndpoint + "/reservations/new";

        try {
            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    "content-type": "application/json"
                }
            })
            if (response.status === 200) {
                alert("success");
                window.location.reload();
            } else {
                alert("failed");
            }

        } catch (error) {
            return null;
        }

    });



}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
    // TODO: MODULE_RESERVATIONS
    // 1. If user has already reserved this adventure, show the reserved-banner, else don't
    // const {reserved} = adventure;

    // const bannerElement = document.getElementById("reserved-banner");
    if (adventure.reserved) {
        document.getElementById("reserved-banner").style.display = "block";
    } else {
        document.getElementById("reserved-banner").style.display = "none";
    }

}

export {
    getAdventureIdFromURL,
    fetchAdventureDetails,
    addAdventureDetailsToDOM,
    addBootstrapPhotoGallery,
    conditionalRenderingOfReservationPanel,
    captureFormSubmit,
    calculateReservationCostAndUpdateDOM,
    showBannerIfAlreadyReserved,
};
