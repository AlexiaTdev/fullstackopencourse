import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(()=> {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
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
    axios.post('http://localhost:3001/persons', personObject).then(response => setPersons(persons.concat(response.data)))    
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchByName={handleSearchByName}/>
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName}/>
    </div>
  )
}

export default App