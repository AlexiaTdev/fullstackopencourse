const Persons = (props) => {
    return (
      <>
        {props.persons.filter((person) => person.name.toLowerCase().includes(props.searchName)).map((person)=>
          <div key={person.id}>
            <p style={{display: "inline-block", minWidth: "20vw"}}>{person.name} {person.number}</p>
            <button onClick={props.deletePerson} value={person.id}>delete</button>
          </div>
          )}
      </>
    )
  }
export default Persons;