import axios from 'axios'
const url = '/api/persons'

const create = newPerson => {
    const request = axios.post(url, newPerson)
    return request.then(response => response.data)
}

const update = (person) => {
    const request = axios.put(`${url}/${person.id}`, person).catch(error => console.log('fail'))
    return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

export default { create, update, remove }