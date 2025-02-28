import axios from 'axios'
const baseUrl = '/api/persons'  // back deployed on render & front built

const getAll = () => {
    const request =  axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const deletePerson = personId => {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

const updatePersonNumber = (person, personId) => {
    const request = axios.put(`${baseUrl}/${personId}`, person)
    return request.then(response => response.data)
}

export default { 
  getAll,
  create,
  deletePerson,
  updatePersonNumber
}