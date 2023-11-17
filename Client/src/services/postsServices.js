import axios from "axios"

const baseUrl = "http://localhost:3000/"

export function getAllNews() {
    try {
        const response = axios.get(`${baseUrl}news`)
        return response
    } catch (err) {
        return console.log(err.message)
    }
}