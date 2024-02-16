import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios
            .get(baseUrl)
            .then(response => {
                setResources(response.data)
            })
    }, [baseUrl, resources])

    const create = (resource) => {
        const response = axios.post(baseUrl, resource)
        return response.data
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}