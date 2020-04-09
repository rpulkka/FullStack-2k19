import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(response => setResources(response.data))
  }, [baseUrl])

  const create = (resource) => {
    console.log(resource)
    axios.post(baseUrl, resource)
    setResources(resources.concat(resource))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource