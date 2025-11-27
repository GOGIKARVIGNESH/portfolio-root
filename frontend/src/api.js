import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8085/api'

export const fetchProjects = () => axios.get(`${API_BASE}/projects`)
export const fetchBlogs = () => axios.get(`${API_BASE}/blogs`)
export const postContact = (payload) => axios.post(`${API_BASE}/contacts`, payload)

// Auth
export const registerUser = (payload) => axios.post(`${API_BASE}/auth/register`, payload)
export const loginUser = (payload) => axios.post(`${API_BASE}/auth/login`, payload)

// Skills
export const fetchSkills = (userId) => axios.get(`${API_BASE}/users/${userId}/skills`)
export const createSkill = (userId, payload) => axios.post(`${API_BASE}/users/${userId}/skills`, payload)
export const updateSkill = (userId, skillId, payload) => axios.put(`${API_BASE}/users/${userId}/skills/${skillId}`, payload)
export const deleteSkill = (userId, skillId) => axios.delete(`${API_BASE}/users/${userId}/skills/${skillId}`)

// Achievements
export const fetchAchievements = (userId) => axios.get(`${API_BASE}/users/${userId}/achievements`)
export const createAchievement = (userId, payload) => axios.post(`${API_BASE}/users/${userId}/achievements`, payload)
export const updateAchievement = (userId, achievementId, payload) =>
  axios.put(`${API_BASE}/users/${userId}/achievements/${achievementId}`, payload)
export const deleteAchievement = (userId, achievementId) =>
  axios.delete(`${API_BASE}/users/${userId}/achievements/${achievementId}`)