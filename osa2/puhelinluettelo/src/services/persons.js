import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)

const create = (person) => axios.post(baseUrl, person)

const update = (person) => axios.put(`${baseUrl}/${person.id}`, person)

const remove = (person) => axios.delete(`${baseUrl}/${person.id}`)

// eslint-disable-next-line
export default {
  getAll,
  create,
  update,
  remove
}