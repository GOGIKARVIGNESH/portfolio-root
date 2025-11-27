import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  fetchAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
} from '../api'
import { useAuth } from '../context/AuthContext'

const emptySkill = { name: '', level: '' }
const emptyAchievement = { title: '', description: '', achievedOn: '' }

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Something went wrong'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [skills, setSkills] = useState([])
  const [achievements, setAchievements] = useState([])
  const [skillForm, setSkillForm] = useState(emptySkill)
  const [achievementForm, setAchievementForm] = useState(emptyAchievement)
  const [editingSkillId, setEditingSkillId] = useState(null)
  const [editingAchievementId, setEditingAchievementId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [skillError, setSkillError] = useState(null)
  const [achievementError, setAchievementError] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }

    const loadData = async () => {
      try {
        setLoading(true)
        const [skillResponse, achievementResponse] = await Promise.all([
          fetchSkills(user.id),
          fetchAchievements(user.id)
        ])
        setSkills(skillResponse.data)
        setAchievements(achievementResponse.data)
      } catch (error) {
        setSkillError(getErrorMessage(error))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user, navigate])

  const handleSkillChange = (event) => {
    const { name, value } = event.target
    setSkillForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAchievementChange = (event) => {
    const { name, value } = event.target
    setAchievementForm((prev) => ({ ...prev, [name]: value }))
  }

  const refreshSkills = async () => {
    const response = await fetchSkills(user.id)
    setSkills(response.data)
  }

  const refreshAchievements = async () => {
    const response = await fetchAchievements(user.id)
    setAchievements(response.data)
  }

  const handleSkillSubmit = async (event) => {
    event.preventDefault()
    setSkillError(null)
    try {
      if (editingSkillId) {
        await updateSkill(user.id, editingSkillId, skillForm)
      } else {
        await createSkill(user.id, skillForm)
      }
      setSkillForm(emptySkill)
      setEditingSkillId(null)
      await refreshSkills()
    } catch (error) {
      setSkillError(getErrorMessage(error))
    }
  }

  const handleAchievementSubmit = async (event) => {
    event.preventDefault()
    setAchievementError(null)
    try {
      const payload = {
        ...achievementForm,
        achievedOn: achievementForm.achievedOn || null
      }
      if (editingAchievementId) {
        await updateAchievement(user.id, editingAchievementId, payload)
      } else {
        await createAchievement(user.id, payload)
      }
      setAchievementForm(emptyAchievement)
      setEditingAchievementId(null)
      await refreshAchievements()
    } catch (error) {
      setAchievementError(getErrorMessage(error))
    }
  }

  const startSkillEdit = (skill) => {
    setEditingSkillId(skill.id)
    setSkillForm({ name: skill.name, level: skill.level || '' })
  }

  const startAchievementEdit = (achievement) => {
    setEditingAchievementId(achievement.id)
    setAchievementForm({
      title: achievement.title,
      description: achievement.description || '',
      achievedOn: achievement.achievedOn || ''
    })
  }

  const cancelSkillEdit = () => {
    setEditingSkillId(null)
    setSkillForm(emptySkill)
  }

  const cancelAchievementEdit = () => {
    setEditingAchievementId(null)
    setAchievementForm(emptyAchievement)
  }

  const removeSkill = async (skillId) => {
    if (!window.confirm('Delete this skill?')) return
    await deleteSkill(user.id, skillId)
    refreshSkills()
    if (editingSkillId === skillId) {
      cancelSkillEdit()
    }
  }

  const removeAchievement = async (achievementId) => {
    if (!window.confirm('Delete this achievement?')) return
    await deleteAchievement(user.id, achievementId)
    refreshAchievements()
    if (editingAchievementId === achievementId) {
      cancelAchievementEdit()
    }
  }

  if (!user) {
    return null
  }

  return (
    <section className="container">
      <div className="section-header">
        <h2>Dashboard</h2>
        <p>Manage your skills and achievements.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-content">
          <div>
            <h3 style={{ marginBottom: '0.25rem' }}>Signed in as {user.name}</h3>
            <p style={{ color: '#6b7280' }}>{user.email}</p>
          </div>
          <button className="btn btn-danger" style={{ marginTop: '1rem' }} onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner" />
        </div>
      ) : (
        <div className="grid grid-2">
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>{editingSkillId ? 'Update Skill' : 'Add Skill'}</h3>
            {skillError && (
              <div className="alert alert-error" role="alert">
                {skillError}
              </div>
            )}
            <form className="form-grid" onSubmit={handleSkillSubmit}>
              <label className="form-field">
                <span>Skill name</span>
                <input
                  name="name"
                  required
                  value={skillForm.name}
                  onChange={handleSkillChange}
                  placeholder="e.g. React, Spring Boot"
                />
              </label>
              <label className="form-field">
                <span>Level (optional)</span>
                <input
                  name="level"
                  value={skillForm.level}
                  onChange={handleSkillChange}
                  placeholder="Beginner, Intermediate, Expert"
                />
              </label>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={!skillForm.name}>
                  {editingSkillId ? 'Update Skill' : 'Add Skill'}
                </button>
                {editingSkillId && (
                  <button type="button" className="btn btn-ghost" onClick={cancelSkillEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div style={{ marginTop: '2rem' }}>
              <h4>Saved skills</h4>
              {skills.length === 0 ? (
                <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>No skills yet.</p>
              ) : (
                <ul className="list-stack">
                  {skills.map((skill) => (
                    <li key={skill.id} className="list-item">
                      <div>
                        <strong>{skill.name}</strong>
                        <p style={{ color: '#6b7280' }}>{skill.level || 'Not specified'}</p>
                      </div>
                      <div className="item-actions">
                        <button className="btn btn-secondary btn-small" onClick={() => startSkillEdit(skill)}>
                          Edit
                        </button>
                        <button className="btn btn-danger btn-small" onClick={() => removeSkill(skill.id)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>
              {editingAchievementId ? 'Update Achievement' : 'Add Achievement'}
            </h3>
            {achievementError && (
              <div className="alert alert-error" role="alert">
                {achievementError}
              </div>
            )}
            <form className="form-grid" onSubmit={handleAchievementSubmit}>
              <label className="form-field">
                <span>Title</span>
                <input
                  name="title"
                  required
                  value={achievementForm.title}
                  onChange={handleAchievementChange}
                  placeholder="Award or milestone"
                />
              </label>
              <label className="form-field">
                <span>Description</span>
                <textarea
                  name="description"
                  rows="3"
                  value={achievementForm.description}
                  onChange={handleAchievementChange}
                  placeholder="What makes this achievement special?"
                />
              </label>
              <label className="form-field">
                <span>Date (optional)</span>
                <input
                  type="date"
                  name="achievedOn"
                  value={achievementForm.achievedOn || ''}
                  onChange={handleAchievementChange}
                />
              </label>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={!achievementForm.title}>
                  {editingAchievementId ? 'Update Achievement' : 'Add Achievement'}
                </button>
                {editingAchievementId && (
                  <button type="button" className="btn btn-ghost" onClick={cancelAchievementEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div style={{ marginTop: '2rem' }}>
              <h4>Saved achievements</h4>
              {achievements.length === 0 ? (
                <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>No achievements yet.</p>
              ) : (
                <ul className="list-stack">
                  {achievements.map((achievement) => (
                    <li key={achievement.id} className="list-item">
                      <div>
                        <strong>{achievement.title}</strong>
                        {achievement.achievedOn && (
                          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                            {achievement.achievedOn}
                          </p>
                        )}
                        {achievement.description && (
                          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>
                            {achievement.description}
                          </p>
                        )}
                      </div>
                      <div className="item-actions">
                        <button
                          className="btn btn-secondary btn-small"
                          onClick={() => startAchievementEdit(achievement)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => removeAchievement(achievement.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

