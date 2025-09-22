import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'

export const fetchProjects = () => axios.get(`${API_BASE}/projects`)
export const fetchBlogs = () => axios.get(`${API_BASE}/blogs`)
export const postContact = (payload) => axios.post(`${API_BASE}/contacts`, payload)