// 65130500053 Pheeraphat Dherachaisuphakij
import { createGuestList } from './data/guestdata.js'
// const createGuestList = require('./data/guestdata.js')
// const { addNewGuest } = require('./lib/GuestManagement.js')
import { GuestManagement } from './lib/GuestManagement.js'
const guestList = createGuestList()
function guestForm() {
  //provide initial guests data list created from GuestManagement class
  let guests = guestList

  // 1. register event for searching and adding
  function registerEventHandling() {
    const searchInput = document.querySelector('input')
    console.log(searchInput);

    searchInput.addEventListener('keyup', searchGuest)



    const addGuestButton = document.querySelector('button')
    console.log(addGuestButton);
    addGuestButton.addEventListener('click', addGuest)

  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    const divDisplay = document.getElementById('display-area')

    for (let index = 0; index < guests.length; index++) { // วนซ้ำผ่านอาร์เรย์รายการ
      const createSpan = document.createElement('span')
      const createRemoveIcon = document.createElement('span')
      createRemoveIcon.className('remove-icon')      
      createRemoveIcon.setAttribute('id', 'firstname-lastname')
      createRemoveIcon.setAttribute('style', 'cursor:pointer;color:red')
      createSpan.textContent = firstnameInput + ' ' + lastnameInput
      divDisplay.appendChild(createSpan)
      divDisplay.appendChild(createRemoveIcon)
    }
  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    const divDisplayArea = document.getElementById(guestResult)
    // divDisplayArea.textContent = ''
    

  }

  // 4. Function to search and display matching guests
  function searchGuest(event) {

    const searchInputValue = document.querySelector(event).value.toLowerCase()
    const searchArray =  guests.filter((event) => event.toLowerCase().includes(searchInputValue.toLowerCase()))
    displayGuest(searchArray)
  }

  // 5. Function to add a new guest
  function addGuest() {
    const firstnameInput = document.getElementById('firstname-input').value
    const lastnameInput = document.getElementById('lastname-input').value

    // firstnameInput.textContent = ''
    // lastnameInput.textContent = ''

    const newGuestObject = firstnameInput + lastnameInput
    displayGuest(newGuestObject)
  }

  // 6. Function to remove a guest
  function removeGuest(event) {

    const removeTodo = document.getElementById(event)

    removeTodo.parentElement.removeChild(removeTodo)
    
  }

  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest
  }
}
// module.exports = guestForm
export { guestForm }
const { registerEventHandling, displayGuests } = guestForm()
registerEventHandling()
displayGuests(guestList.getAllGuests())

