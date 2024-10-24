import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request =  axios.get('http://localhost:3001/persons')
    return request.then(response => response.data)
}

const create = personObject => {
    const request = axios.post('http://localhost:3001/persons', personObject)
    return request.then(response => response.data)
}

const deletePerson = personId => {
    const url = baseUrl + '/' + personId
    const request = axios.delete(url)
}

export default { 
  getAll,
  create,
  deletePerson
}