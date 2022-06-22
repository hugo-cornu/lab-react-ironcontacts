// src/App.js
import { useState } from "react"
import "./App.css"
import importedContacts from "./contacts.json"

const ContactList = ({ contacts, removeContact }) => {
  console.log("contactsList:", contacts)

  return contacts.map((contact) => {
    return (
      <tr key={contact.id} className="contacts">
        <td>
          <img src={contact.pictureUrl} alt=""></img>
        </td>
        <td>{contact.name}</td>
        <td>{contact.popularity}</td>
        <td>{contact.wonOscar && "🏆"}</td>
        <td></td>
        <td>
          <button onClick={() => removeContact(contact.id)}>🗑️</button>
        </td>
      </tr>
    )
  })
}
function App() {
  const [contactsDisplayed, setContact] = useState(importedContacts.slice(0, 6))

  const copyofAllContacts = [...importedContacts]
  const contactsDisplayedCloned = [...contactsDisplayed]

  const contactsRemaining = copyofAllContacts.filter((contact) => {
    return !contactsDisplayed.includes(contact)
  })

  // ------------ FUNCTIONS ------------ //
  function chooseRandom() {
    const randomCaracter =
      contactsRemaining[Math.floor(Math.random() * contactsRemaining.length)]
    setContact([...contactsDisplayed, randomCaracter])
  }

  function sortByPopularity() {
    const contactsSortedByPopularity = contactsDisplayedCloned.sort((a, b) => {
      return b.popularity - a.popularity
    })
    console.log("contactsSortedByPopularity:", contactsSortedByPopularity)

    setContact(contactsSortedByPopularity)
  }

  function sortByName() {
    const contactsSortedByName = contactsDisplayedCloned.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    console.log("contactsSortedByName:", contactsSortedByName)
    setContact(contactsSortedByName)
  }

  function removeContact(contactId) {
    const filteredItems = contactsDisplayedCloned.filter(
      (x) => x.id !== contactId
    )
    setContact(filteredItems)
  }

  return (
    <div className="App">
      <button onClick={chooseRandom}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th colSpan={5} className="tableTitle">
              IronContacts
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="subHeader">
            <td>Picture</td>
            <td>Name</td>
            <td>Popularity</td>
            <td>Won Oscar</td>
            <td>Won Emmy</td>
            <td>Actions</td>
          </tr>
          <ContactList
            removeContact={removeContact}
            contacts={contactsDisplayed}
          ></ContactList>
        </tbody>
      </table>
    </div>
  )
}

export default App
