import config from "../conf/index.js"

async function getCityFromURL(search) {
    try {
        let urlParams = new URLSearchParams(search);
        let city = urlParams.get("city");
        return city;
    } catch (error) {
        return null;
    }


}

async function fetchAdventures(city) {
    try {
        let url = `${config.backendEndpoint}/adventures?city=${city}`;
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data, 'adventures')
        return data;
    } catch (error) {
        return null;
    }
}

function addAdventureToDOM(adventures) {
    const dataContainer = document.getElementById("data");
    dataContainer.innerHTML = "";
    adventures &&
        adventures.length &&
        adventures.forEach((adventure) => {
            const divElement = document.createElement("div");
            divElement.className = "col-6 col-lg-3 mb-4";
            divElement.innerHTML = `
       <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
      
      <div class="activity-card">
      <div class="category-banner">${adventure.category} </div>
        <img 
        src=${adventure.image} 
        class="img-responsive" 
        />
        <div class="activity-card-text text-md-center mt-3 w-100">
          <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <h5 class="text-left">${adventure.name}</h5>
            <p>₹${adventure.costPerHead}</p>
          </div>
          <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <h5 class="text-left">Duration</h5>
            <p>${adventure.duration} Hours</p>
          </div>
        </div>
      </div>
     
    </a>`;
            const containerElement = document.getElementById("data");
            containerElement.appendChild(divElement);
        });
}

function filterByDuration(list, low, high) {
    // TODO: MODULE_FILTERS
    // 1. Filter adventures based on Duration and return filtered list
    const filteredList = list.filter(
        (adventure) => adventure.duration > low && adventure.duration <= high
    );
    return filteredList;
}

function filterByCategory(list, categoryList) {
    let finalCategoryAdventures = list.filter((adventure) => {
        return categoryList.includes(adventure.category)
    })
    return finalCategoryAdventures;
}

function filterFunction(list, filters) {
    // TODO: MODULE_FILTERS
    // console.log(filters);
    // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
    // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    const isDurationThere = filters["duration"] && filters["duration"].length > 0;
    const isCategoryThere = filters["category"] && filters["category"].length > 0;

    if (isDurationThere && isCategoryThere) {
        const filteredDuration = filters["duration"];
        const splitDuration = filteredDuration.split("-");
        const low = splitDuration[0];
        const high = splitDuration[1];

        const filterByDurationAdventures = filterByDuration(list, low, high);

        const categoryList = filters["category"];
        const filterByCategoryAdventures = filterByCategory(
            filterByDurationAdventures,
            categoryList
        );
        return filterByCategoryAdventures;
    } else if (filters["duration"].length) {
        const filteredDuration = filters["duration"];
        const splitDuration = filteredDuration.split("-");
        const low = splitDuration[0];
        const high = splitDuration[1];

        const filterByDurationAdventures = filterByDuration(list, low, high);

        return filterByDurationAdventures;
    } else if (filters["category"].length) {
        const categoryList = filters["category"];
        const filterByCategoryAdventures = filterByCategory(list, categoryList);

        return filterByCategoryAdventures;
    } else {
        return list;
    }

    // Place holder for functionality to work in the Stubs
}

function saveFiltersToLocalStorage(filters) {
    // TODO: MODULE_FILTERS
    // 1. Store the filters as a String to localStorage
    // console.log(filters, 'filters')
    localStorage.setItem("filters", JSON.stringify(filters));

    return true;
}

function getFiltersFromLocalStorage() {
    // TODO: MODULE_FILTERS
    // 1. Get the filters from localStorage and return String read as an object
    const filterString = localStorage.getItem("filters");
    // console.log(filterString, '....this is local storage data');
    if (filterString) {
        const filterObject = JSON.parse(filterString);
        // Place holder for functionality to work in the Stubs
        const duration = filterObject["duration"];
        const durationSelectElement = document.getElementById("duration-select");
        let i = 0;
        Array.from(durationSelectElement.options).forEach((option, index) => {
            let value = option.value;
            if (value === duration) {
                i = index;
            }
        });
        durationSelectElement.selectedIndex = i + "";
        return filterObject;
    } else {
        return null;
    }

}

function generateFilterPillsAndUpdateDOM(filters = { category: [] }) {
    // TODO: MODULE_FILTERS
    // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
    const categoryFilter = filters["category"];
    categoryFilter.forEach((key) => {
        let newElement = document.createElement("div");
        newElement.className = "category-filter";
        newElement.innerHTML = `
      <div>${key}</div>
      `;
        document.getElementById("category-list").appendChild(newElement);
    });
}

export {
    getCityFromURL,
    fetchAdventures,
    addAdventureToDOM,
    filterByDuration,
    filterByCategory,
    filterFunction,
    saveFiltersToLocalStorage,
    getFiltersFromLocalStorage,
    generateFilterPillsAndUpdateDOM,

}