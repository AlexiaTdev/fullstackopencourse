import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handlePersonChange = (event) => {
    persons.map((person)=> (person.name === event.target.value) ?
        alert(`${event.target.value} is already added to phonebook`)
        & setNewName('')
      : setNewName(event.target.value))  
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input 
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          number:
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=><p key={person.name}>{person.name}  {person.number}</p>)}
    </div>
  )
}

export default App