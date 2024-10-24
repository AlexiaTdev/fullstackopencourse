import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(()=> {
    personsService.getAll().then(persons => setPersons(persons))
  }, [])

  const handlePersonChange = (event) => {
    persons.map((person)=> (person.name === event.target.value) ?
        alert(`${event.target.value} is already added to phonebook`)
        & setNewName('')
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
    personsService.create(personObject).then(person => {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    })    
    
  }

  const deletePerson = (event) => {
    const personName = persons.find(person => person.id === event.target.value).name
    if(window.confirm(`Delete ${personName} ?`)){
      personsService.deletePerson(event.target.value)
      setPersons(persons.filter((person)=> (person.id !== event.target.value)))
    }    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchByName={handleSearchByName}/>
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} deletePerson={deletePerson}/>
    </div>
  )
}

export default App