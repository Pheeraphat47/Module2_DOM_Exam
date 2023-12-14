//65130500053 Pheeraphat Dherachaisuphakij
//import { createGuestList } from './data/guestdata.js'
const createGuestList = require('./data/guestdata.js')

const guestList = createGuestList()
function guestForm() {
  //provide initial guests data list created from GuestManagement class
  let guests = guestList

  // 1. register event for searching and adding
  function registerEventHandling() {
    const searchInput = document.querySelector('#search-input')
    searchInput?.addEventListener('keyup', searchGuest)

    const addBtn = document.getElementById('add-guest-btn')
    addBtn?.addEventListener('click', addGuest)
  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    const displayArea = document.getElementById('display-area')

    const divEl = document.createElement('div')
    const spanE1 = document.createElement('span')
    const spanE2 = document.createElement('span')

    spanE1.textContent = `${guestItem.firstname} ${guestItem.lastname}`

    spanE2.setAttribute('id', `${guestItem.firstname}-${guestItem.lastname}`)
    spanE2.setAttribute('class', 'remove-icon')
    spanE2.setAttribute('style', 'cursor:pointer;color:red')
    spanE2.textContent = '[X]'

    displayArea.appendChild(divEl)
    divEl.appendChild(spanE1)
    divEl.appendChild(spanE2)

    spanE2.addEventListener('click', removeGuest)
  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    const displayArea = document.getElementById('display-area')
    displayArea.textContent = ''
    for (const i of guestResult) {
      displayGuest(i)
    }

  }

  // 4. Function to search and display matching guests
  function searchGuest(event) {
    displayGuests(guests.searchGuests(event.target.value))

  }


  // 5. Function to add a new guest
  function addGuest() {
    const inputFirstname = document.getElementById('firstname-input')
    const inputLastname = document.getElementById('lastname-input')
    //console.log(inputFirstname.value);
    if (inputFirstname.value !== null && inputLastname.value !== null) {
      let newGuest = guests.addNewGuest(inputFirstname.value, inputLastname.value)

      displayGuest(newGuest[newGuest.length - 1]);
    }
    inputFirstname.value = ''
    inputLastname.value = ''
  }

  // 6. Function to remove a guest
  function removeGuest(event) {
    let guest = event.target.id
    let StG = guest.split('-')
    let rmguest = { firstname: StG[0], lastname: StG[1] }
    guests.removeGuest(rmguest)

    const displayArea = document.getElementById('display-area')
    const parent = document.getElementById(event.target.id)
    displayArea.removeChild(parent.parentElement)
  }

  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest,    
  }
}

module.exports = guestForm
// export { guestForm }
// const { registerEventHandling, displayGuests } = guestForm()
// registerEventHandling()
// displayGuests(guestList.getAllGuests())
