/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import  './styles.css'


const Person = (props) => {
  return(
      // eslint-disable-next-line react/prop-types
      <li key={props.id}>{props.name} {props.number} <button onClick={props.deletePerson}>delete</button></li>     
  )
}
const FilterPerson = (props) => {
  return(
      <div>
          find <input value = {props.filterName} onChange = {props.handle} onInput={props.filter} /> 
      </div>
  )
}

const AddPerson = (props) => {
  return(
      <div>
      <h2>Add a new number</h2>
      <form onSubmit = {props.add}>
          name <input value = {props.newName} onChange = {props.handleName} /> 
          number <input value = {props.newNumber} onChange={props.handleNumber} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
     </div>  
  )
}

const SuccessNotification = (props) => {
  if (props.message === null) {
    return null
  }
  return (
    <div className="succes-notification">
      <p>{props.message}</p>
    </div>
  )
}
const ErrorNotification = (props) => {
  if (props.message === null) {
    return null
  }
  return (
    <div className="error-notification">
      <p>{props.message}</p>
    </div>
  )
}
const App = () => {
      const [newName, setNewName] = useState('');
      const [newNumber, setNewNumber] = useState('');
      const [newFilterName, setFilterName] = useState('');
      const [succesMessage, setSuccessMessage] = useState(null);
      const [errorMessage, setErrorMessage] = useState(null);
      const [persons, setPersons] = useState([]);
      
      useEffect(() => {
        personsService.getPersons()
          .then(persons => {
            console.log(persons);
            setPersons(persons);
          })
      }, [])

      const personsToShow =  newFilterName.length === 0 ? persons : persons.filter(person => person.name.toLowerCase().startsWith(newFilterName.toLowerCase()));
        
      const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    }
  
    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    }
  
    const handleFilterChange = (event) => {
        console.log(event.target.value);
        setFilterName(event.target.value);
    }

    const addPersonAndNumber = (event) => {
      event.preventDefault();
      if(!newNumber || !newName){
        alert("Name or number missing")
      }
      else{
      const newPerson = {name: newName, number: newNumber};
      if(persons.find(p => p.name === newPerson.name && p.number === newNumber)){
        window.alert(`${newPerson.name} is already on the phonebook`)
        setNewName('');
        setNewNumber('');
      }
      else if(persons.find(p => p.name === newPerson.name && p.number !== newPerson.number)){
        const p = persons.find(p => p.name === newPerson.name);
        const id = p.id;
       replaceNumber(id, newNumber)
       
      }
      else {
        if(newPerson.name && newPerson.number){
        personsService
        .addPerson(newPerson)
        .then(person => {
        setPersons(persons.concat(person))
        setSuccessMessage(
          `Added ${newPerson.name}'s phone number`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(`Name must contain at least 3 characters. 
          Number must contain at least 8 digits and be in the format 01-123456 or 012-12345`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
      
      setNewName('');
      setNewNumber('');
    }
  }
}
    }

  const deletePersonAndNumber = (id) => {
    const p = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${p.name}?`)){
      console.log(`deleted ${p.name}`)
      personsService.deletePerson(id)
      .then(() => {setPersons(persons.filter(person => person.id !== id))})
      setSuccessMessage(
        `Deleted ${p.name}'s phone number`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)
    }
    
  }

  const replaceNumber = (id, newNumber) => {
    const person = persons.find(p => p.id === id)
    console.log(person)
    if(window.confirm(`${person.name} is already on the phonebook, do you want to replace their number with a new one?`)){
      const changedPerson = { ...person, number: newNumber }
      console.log(changedPerson)
      personsService.replaceNumber(id, changedPerson)
      .then(changedPerson => setPersons(persons.map(p => p.id !== id ? p : changedPerson))
      )
      .catch(error => {
        if(error.response.status === 500){
        setErrorMessage(`${person.name} was already deleted`)
        setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
      personsService.getPersons()
          .then(persons => {
            setPersons(persons);
          })
        }
        else{
          setErrorMessage("Check phone number")
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        }
      
    });
    setNewName('');
    setNewNumber('');
    }
  }
    
  return (
  <div>
    <h1>Phonebook</h1>
    <SuccessNotification message={succesMessage} />
    <ErrorNotification message={errorMessage} />
    <AddPerson newName={newName} newNumber={newNumber}handleName={handleNameChange} handleNumber={handleNumberChange} add={addPersonAndNumber}/>
    <h2>Numbers</h2>
    <FilterPerson filterName={newFilterName} handle={handleFilterChange} />
    <ul>
      {personsToShow.map(person => <Person key={person.id} name = {person.name} number = {person.number} deletePerson = {()=>deletePersonAndNumber(person.id)}/>)}
    </ul>
  </div>
  )
  }


  export default App;
