import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
    // TODO: MODULE_RESERVATIONS
    // 1. Fetch Reservations by invoking the REST API and return them
    try {
        const url = config.backendEndpoint + "/reservations/";
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        return data;

    } catch (error) {
        return null;
    }

    // Place holder for functionality to work in the Stubs

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
    // TODO: MODULE_RESERVATIONS
    // 1. Add the Reservations to the HTML DOM so that they show up in the table

    //Conditionally render the no-reservation-banner and reservation-table-parent

    /*
      Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
      The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
  
      Note:
      1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
      2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
    */
    const reservationBody = document.getElementById("reservation-table");

    if (reservations.length > 0) {

        reservations.map(reservation => {
            const { id, name, date, price, time, person, adventureName, adventure } = reservation;

            function formatDate(dateString) {
                const dateObj = new Date(dateString);

                const day = dateObj.getDate();  // Returns day without leading zero
                const month = dateObj.getMonth() + 1; // Months are 0-based, so add 1
                const year = dateObj.getFullYear();

                return `${day}/${month}/${year}`;
            }





            function formatDateTime(dateTimeString) {
                const dateTimeObj = new Date(dateTimeString);

                const formattedDate = new Intl.DateTimeFormat('en-GB', {
                    day: 'numeric', // Removes leading zero
                    month: 'long',
                    year: 'numeric'
                }).format(dateTimeObj);

                const formattedTime = new Intl.DateTimeFormat('en-GB', {
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                }).format(dateTimeObj);

                return `${formattedDate}, ${formattedTime}`;
            }





            const formattedDate = formatDate(date);
            const formattedTime = formatDateTime(time);

            const tableRowElement = document.createElement("tr");

            tableRowElement.innerHTML = `
    <th>${id}</th>
    <td>${name}</td>
    <td>${adventureName}</td>
    <td>${person}</td>
    <td>${formattedDate}</td>
    <td>${price}</td>
    <td>${formattedTime}</td>
    
    <td>
    <div class="reservation-visit-button" id=${id}>
     <a href="../detail/?adventure=${adventure}">Visit Adventure</a>
    </div>
    </td>
  `
            reservationBody.append(tableRowElement);
        })
        document.getElementById("no-reservation-banner").style.display = "none";
        document.getElementById("reservation-table-parent").style.display = "block";
    } else {
        document.getElementById("no-reservation-banner").style.display = "block";
        document.getElementById("reservation-table-parent").style.display = "none";
    }


}

export { fetchReservations, addReservationToTable };
