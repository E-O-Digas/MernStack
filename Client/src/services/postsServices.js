import axios from "axios"

const baseUrl = "http://localhost:3000/"

export function getAllNews() {
    const response = axios.get(`${baseUrl}news`)
    return response
}

export function getTopNews() {
    const response = axios.get(`${baseUrl}news/top`)
    return response
}

export function searchNews(title) {
    const response = axios.get(`${baseUrl}news/search?title=${title}`)
    return response
}