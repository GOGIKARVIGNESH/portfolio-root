import React, { useEffect, useState } from 'react'
import { fetchProjects } from '../api'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Mock categories for demonstration
  const categories = ['all', 'web', 'mobile', 'desktop', 'api', 'fullstack']

  useEffect(() => {
    setLoading(true)
    fetchProjects()
      .then(r => {
        setProjects(r.data)
        setFilteredProjects(r.data)
      })
      .catch(() => {
        // Fallback to mock data if API fails
        const mockProjects = [
          {
            id: 1,
            title: "E-Commerce Platform",
            shortDescription: "A full-stack e-commerce solution with real-time inventory management",
            description: "Built with React, Node.js, and MongoDB. Features include user authentication, payment processing, admin dashboard, and real-time notifications.",
            url: "https://github.com/example/ecommerce",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            category: "fullstack",
            date: "2024-01-15"
          },
          {
            id: 2,
            title: "Task Management App",
            shortDescription: "Collaborative task management with real-time updates",
            description: "A modern task management application with drag-and-drop functionality, team collaboration, and real-time updates using Socket.io.",
            url: "https://github.com/example/taskmanager",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            technologies: ["React", "TypeScript", "Socket.io", "Express"],
            category: "web",
            date: "2024-02-10"
          },
          {
            id: 3,
            title: "Weather API Service",
            shortDescription: "RESTful API for weather data with caching",
            description: "High-performance weather API with Redis caching, rate limiting, and support for multiple data sources.",
            url: "https://github.com/example/weather-api",
            image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            technologies: ["Node.js", "Redis", "Express", "JWT"],
            category: "api",
            date: "2024-01-28"
          },
          {
            id: 4,
            title: "Mobile Banking App",
            shortDescription: "Cross-platform mobile banking application",
            description: "Secure mobile banking app built with React Native, featuring biometric authentication and real-time transaction monitoring.",
            url: "https://github.com/example/banking-app",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            technologies: ["React Native", "Redux", "Firebase", "Biometric"],
            category: "mobile",
            date: "2023-12-20"
          },
          {
            id: 5,
            title: "Portfolio Website",
            shortDescription: "Modern responsive portfolio website with interactive features",
            description: "A fully responsive portfolio website built with React and modern CSS, featuring smooth animations, interactive components, and mobile-first design.",
            url: "https://github.com/example/portfolio",
            image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            technologies: ["React", "CSS3", "JavaScript", "Vite"],
            category: "web",
            date: "2024-02-15"
          },
          {
            id: 6,
            title: "AI Chat Application",
            shortDescription: "Real-time AI-powered chat application",
            description: "An intelligent chat application with AI integration, real-time messaging, and smart response suggestions using machine learning.",
            url: "https://github.com/example/ai-chat",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            technologies: ["React", "Python", "OpenAI", "WebSocket"],
            category: "fullstack",
            date: "2024-01-05"
          }
        ]
        setProjects(mockProjects)
        setFilteredProjects(mockProjects)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let filtered = [...projects]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date)
        case 'oldest':
          return new Date(a.date) - new Date(b.date)
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }, [projects, searchTerm, selectedCategory, sortBy])

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in-up">
      <section className="container">
        <div className="section-header">
          <h2>My Projects</h2>
          <p>Explore my portfolio of web applications, mobile apps, and API services</p>
        </div>

        {/* Filters and Search */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ flex: '1', minWidth: '200px' }}>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: 'var(--radius)',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="card text-center" style={{ padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3>No projects found</h3>
            <p>Try adjusting your search terms or filters</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSortBy('newest')
              }}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Results Count */}
        {filteredProjects.length > 0 && (
          <div className="text-center" style={{ marginTop: '2rem', color: 'var(--text-light)' }}>
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        )}
      </section>
    </div>
  )
}