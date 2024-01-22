import axios from 'axios'
const baseUrl = '/api/persons'


const getPersons = async () => {
    const response = await axios.get(baseUrl)
  return response.data

  }

const addPerson = async newPerson => {
    const response = await axios.post(baseUrl, newPerson)
  return response.data
  }

const deletePerson = async id => {
    const response = await axios.delete(`${baseUrl}/${id}`)
  return response
} 

const replaceNumber = async (id, changedPerson) => {
    const response = await axios.put(`${baseUrl}/${id}`, changedPerson)
    console.log(response)
  return response.data
    
}

  export default {
    getPersons: getPersons,
    addPerson: addPerson,
    deletePerson: deletePerson,
    replaceNumber: replaceNumber
  }