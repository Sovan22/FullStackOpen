import axios from 'axios'
import { useState , useEffect} from 'react'
import phoneService from './services/phonebook'

const Notification = ({message,success}) => {
  if(message == "")return null
  
  return (
    <div className= {success ? "success" : "error"}>{message}</div>
  )
}

const Persons = ({persons, handleDelete}) => {
  return (
    <div>
      {persons.map(person => <p key = {person.id}>{person.name} {person.number} <button onClick = {() => handleDelete(person)}>delete</button></p> )}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
    <div>
      name: <input value={props.newName} onChange={props.handleName} />
    </div>
    <div>number: <input value= {props.newNumber} onChange ={props.handleNumber}/></div>
    <div>
      <button onClick = {props.onSubmit} type="submit">add</button>
    </div>
    </form>
  )
}

const Filter = ({search, handleSearch}) => {
  return(
  <div>filter shown with <input value ={search} onChange = {handleSearch}/></div> 
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [success, setSuccess] = useState(true)
  const [errorMessage, setError] = useState("")
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    phoneService.getAll()
    .then( data => {
        setPersons(data)
      }
    )
  }, [])
  

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().match(search.toLowerCase()))


  const onSubmit = (event) => {
    event.preventDefault()
    const newPerson = {name : newName, number : newNumber}
    const ind = persons.findIndex((element) => element.name === newName || element.number == newNumber)
    if(ind != -1 && persons[ind].number != newNumber){

      const message = `${newName} is already added to the phonebook. Do you want to replace the old number with new number?`
      confirm(message)
      
      phoneService.updatePhone(persons[ind].id,newPerson).then(response => {
        const temp = persons.filter(p => p.id != persons[ind].id)
        setPersons(temp.concat(response))
        setSuccess(true)
        setError(`Updated ${newPerson.name} number to the phonebook`)
        setTimeout(()=> setError(""),5000)
      }).catch(() => {
        setSuccess(false)
        // const temp = persons.filter(p => p.id != persons[ind].id)
        setPersons(prevPersons => {
          return prevPersons.filter(p => p.id !== persons[ind].id)
        })
        setError(`Already deleted ${newPerson.name} from the phonebook`)
        setTimeout(()=> setError(""),5000)
      })

      return
    }
    else if(ind != -1){

      alert(`${newName} already in phonebook`)
      return

    }
    phoneService.postNew(newPerson).then(
      person => {
        setPersons(persons.concat(person))
        setSuccess(true)
        setError(`Added ${newPerson.name} to the phonebook`)
        setTimeout(() => setError(""),5000)
        setNewName('')
        setNewNumber('')
      }
    )
  }

  const handleName = (event) => {
    //  console.log(event.target.value)
     setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    //  console.log(event.target.value)
     setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    //  console.log(event.target.value)
     setSearch(event.target.value)
     if(event.target.value.length == 0)setShowAll(true)
     setShowAll(false)
  }
  
  const handleDelete = (person) => {
    const message = `Delete ${person.name} ?`
    confirm(message)
    phoneService.deletePhone(person.id).then(response => {
      setPersons(persons.filter(p => p.id !== response.id))
      setSuccess(true)
      setError(`Deleted ${response.name} from the phonebook`)
      setTimeout(()=> setError(""),5000)
    })
    .catch(() => {
      setSuccess(false)
      setError(`Already deleted ${person.name} from the phonebook`)
      setPersons(persons)
      setTimeout(()=> setError(""),5000)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} success={success} />
      <Filter search={search} handleSearch={handleSearch}/>
      {/* <div>filter shown with <input value ={search} onChange = {handleSearch}/></div>  */}
      <h2>add a new</h2>
      <PersonForm newName = {newName} handleName= {handleName} newNumber = {newNumber} handleNumber={handleNumber} onSubmit = {onSubmit}/>
      <h2>Numbers</h2>
        <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App