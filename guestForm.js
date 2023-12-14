//65130500053 Pheeraphat Dherachaisuphakij
// import { createGuestList } from './data/guestdata.js'
const createGuestList = require('./data/guestdata.js')

// Create an instance of the guest list using createGuestList
const guestList = createGuestList();

// Define a function called guestForm
function guestForm() {
  // Provide initial guests data list created from GuestManagement class
  let guests = guestList;

  // 1. Register event handling for searching and adding guests
  function registerEventHandling() {
    // Find the DOM element for the search input
    const searchInput = document.querySelector('#search-input');
    // Add 'keyup' event listener for guest search
    searchInput.addEventListener('keyup', searchGuest);

    // Find the DOM element for the "Add Guest" button
    const addBtn = document.getElementById('add-guest-btn');
    // Add 'click' event listener for adding guests
    addBtn.addEventListener('click', addGuest);
  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    // Find the DOM element of the display area
    const displayArea = document.getElementById('display-area');

    // Create HTML elements for displaying the guest
    const divEl = document.createElement('div');
    const spanE1 = document.createElement('span');
    const spanE2 = document.createElement('span');

    // Set the content of the first span with the guest's full name
    spanE1.textContent = `${guestItem.firstname} ${guestItem.lastname}`;

    // Set attributes for the second span (remove icon)
    spanE2.setAttribute('id', `${guestItem.firstname}-${guestItem.lastname}`);
    spanE2.setAttribute('class', 'remove-icon');
    spanE2.setAttribute('style', 'cursor:pointer;color:red');
    spanE2.textContent = '[X]';

    // Append elements to the display area
    displayArea.appendChild(divEl);
    divEl.appendChild(spanE1);
    divEl.appendChild(spanE2);

    // Add event listener for removing guests when the remove icon is clicked
    spanE2.addEventListener('click', removeGuest);
  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    // Find the DOM element of the display area
    const displayArea = document.getElementById('display-area');
    // Clear previous content in the display area
    displayArea.textContent = '';

    // Create elements for displaying guest data
    for (const i of guestResult) {
      displayGuest(i);
    }
  }

  // 4. Function to search and display matching guests
  function searchGuest(event) {
    // Search for guests based on the input value and display the results
    displayGuests(guests.searchGuests(event.target.value));
  }

  // 5. Function to add a new guest
  function addGuest() {
    // Find DOM elements for the input of firstname and lastname
    const inputFirstname = document.getElementById('firstname-input');
    const inputLastname = document.getElementById('lastname-input');

    // Add a new guest and display the result
    if (inputFirstname.value !== null && inputLastname.value !== null) {
      let newGuest = guests.addNewGuest(inputFirstname.value, inputLastname.value);
      displayGuest(newGuest[newGuest.length - 1]);
    }

    // Clear input values after adding a new guest
    inputFirstname.value = '';
    inputLastname.value = '';
  }

  // 6. Function to remove a guest
  function removeGuest(event) {
    // Extract the guest's id from the clicked element
    let guest = event.target.id;
    let StG = guest.split('-');
    let rmguest = { firstname: StG[0], lastname: StG[1] };

    // Remove the guest and update the display area
    guests.removeGuest(rmguest);
    const displayArea = document.getElementById('display-area');
    const parent = document.getElementById(event.target.id);
    displayArea.removeChild(parent.parentElement);
  }

  // Return an object with functions that can be used externally
  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest
  };
}
module.exports = guestForm  // for test case
// export { guestForm } // browser
// // ต้องเปิดไว้ไม่งั้นใน browser ไม่ขึ้น
// const { registerEventHandling, displayGuests } = guestForm()
// registerEventHandling()
// displayGuests(guestList.getAllGuests())