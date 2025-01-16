import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/persons'
import Notification from './Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [unsuccessfulEvent, setUnsuccessfulEvent] = useState(false)

  useEffect(()=> {
    personsService.getAll().then(persons => setPersons(persons))
  }, [])

  const handlePersonChange = (event) => {
    persons.map((person)=> (person.name === event.target.value) ?
        alert(`${event.target.value} is already added to phonebook`)
      : setNewName(event.target.value))  
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchByName = (event) => {
    setSearchName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName) && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const personId = persons.find(person => person.name === newName).id
      personsService.updatePersonNumber(personObject, personId).then(response => {
        setPersons(persons.map((person)=> (person.id === personId)? response : person))
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        console.log(error.response.data.error)
        setNotificationMessage(
          `${error.response.data.error}`
        )
      })
    } else {
      personsService.create(personObject).then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        console.log(error.response.data.error)
        setNotificationMessage(
          `${error.response.data.error}`
        )
      })
      setNotificationMessage(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const deletePerson = (event) => {
    const personName = persons.find(person => person.id === event.target.value).name
    if(window.confirm(`Delete ${personName} ?`)){
      personsService.deletePerson(event.target.value).then(setPersons(persons.filter((person)=> (person.id !== event.target.value))))
        .catch(error => {
          setUnsuccessfulEvent(true)
          setNotificationMessage(
            `Information of ${personName} has already been removed from server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
            setUnsuccessfulEvent(false)
          }, 5000)
          setPersons(persons.filter(person => person.id !== event.target.value))
        })
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} unsuccessfulEvent={unsuccessfulEvent}/>
      <Filter searchName={searchName} handleSearchByName={handleSearchByName}/>
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} deletePerson={deletePerson}/>
      <p>new uibuild 1</p>
    </div>
  )
}

export default App