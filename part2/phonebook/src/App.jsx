import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handlePersonChange = (event) => {
    persons.map((person)=> (person.name === event.target.value) ?
        alert(`${event.target.value} is already added to phonebook`)
        & setNewName('')
      : setNewName(event.target.value))      
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=><p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App