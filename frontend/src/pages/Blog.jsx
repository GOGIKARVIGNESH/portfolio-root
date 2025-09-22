import React, { useState, useEffect } from 'react'
import { fetchBlogs } from '../api'

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'tutorial', 'thoughts', 'tutorials', 'news', 'tips']

  useEffect(() => {
    setLoading(true)
    fetchBlogs()
      .then(r => {
        setBlogs(r.data)
        setFilteredBlogs(r.data)
      })
      .catch(() => {
        // Fallback to mock data if API fails
        const mockBlogs = [
          {
            id: 1,
            title: "Getting Started with React Hooks",
            excerpt: "Learn how to use React Hooks to write cleaner, more maintainable functional components.",
            content: "React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components...",
            author: "Vignesh",
            date: "2024-02-15",
            category: "tutorial",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            tags: ["React", "JavaScript", "Hooks", "Frontend"]
          },
          {
            id: 2,
            title: "The Future of Web Development",
            excerpt: "Exploring emerging trends and technologies that will shape the future of web development.",
            content: "The web development landscape is constantly evolving, with new frameworks, tools, and methodologies emerging regularly...",
            author: "Vignesh",
            date: "2024-02-10",
            category: "thoughts",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            tags: ["Web Development", "Technology", "Trends", "Future"]
          },
          {
            id: 3,
            title: "Building Responsive UIs with CSS Grid",
            excerpt: "A comprehensive guide to creating flexible, responsive layouts using CSS Grid.",
            content: "CSS Grid is a powerful layout system that allows you to create complex, responsive designs with ease...",
            author: "Vignesh",
            date: "2024-02-05",
            category: "tutorial",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            tags: ["CSS", "Grid", "Layout", "Responsive"]
          },
          {
            id: 4,
            title: "My Journey as a Developer",
            excerpt: "Reflecting on the challenges, victories, and lessons learned throughout my development career.",
            content: "Starting as a self-taught developer, I've learned that the journey is just as important as the destination...",
            author: "Vignesh",
            date: "2024-01-28",
            category: "thoughts",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            tags: ["Career", "Personal", "Learning", "Reflection"]
          },
          {
            id: 5,
            title: "Mastering JavaScript ES6+ Features",
            excerpt: "A deep dive into modern JavaScript features that every developer should know.",
            content: "ES6+ brought revolutionary changes to JavaScript, making it more powerful and expressive...",
            author: "Vignesh",
            date: "2024-01-20",
            category: "tutorial",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            tags: ["JavaScript", "ES6", "Programming", "Tutorial"]
          },
          {
            id: 6,
            title: "Building Scalable Node.js Applications",
            excerpt: "Best practices and patterns for creating maintainable Node.js applications.",
            content: "Node.js has become the go-to platform for building scalable server-side applications...",
            author: "Vignesh",
            date: "2024-01-15",
            category: "tutorial",
            readTime: "9 min read",
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            tags: ["Node.js", "Backend", "Scalability", "Architecture"]
          }
        ]
        setBlogs(mockBlogs)
        setFilteredBlogs(mockBlogs)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let filtered = [...blogs]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory)
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date))

    setFilteredBlogs(filtered)
  }, [blogs, searchTerm, selectedCategory])

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
          <h2>My Blog</h2>
          <p>Thoughts, tutorials, and insights about web development and technology</p>
        </div>

        {/* Search and Filter */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ flex: '1', minWidth: '200px' }}>
              <input
                type="text"
                placeholder="Search blog posts..."
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
          </div>
        </div>

        {/* Blog Posts */}
        {filteredBlogs.length > 0 ? (
          <div className="grid">
            {filteredBlogs.map(blog => (
              <article key={blog.id} className="card" style={{ cursor: 'pointer' }}>
                {/* Blog Image */}
                {blog.image && (
                  <div style={{ 
                    marginBottom: '1rem', 
                    borderRadius: 'var(--radius)', 
                    overflow: 'hidden',
                    height: '200px',
                    background: `url(${blog.image}) center/cover`
                  }}>
                  </div>
                )}

                {/* Blog Meta */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-light)'
                }}>
                  <span style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                  </span>
                  <span>{blog.readTime}</span>
                </div>

                {/* Blog Title */}
                <h3 style={{ 
                  marginBottom: '0.75rem', 
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                  lineHeight: '1.3'
                }}>
                  {blog.title}
                </h3>

                {/* Blog Excerpt */}
                <p style={{ 
                  marginBottom: '1rem', 
                  color: 'var(--text-light)',
                  lineHeight: '1.5'
                }}>
                  {blog.excerpt}
                </p>

                {/* Blog Tags */}
                {blog.tags && (
                  <div style={{ 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          background: 'var(--bg-light)',
                          color: 'var(--text-light)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Blog Date and Author */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  color: 'var(--text-light)',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem'
                }}>
                  <span>By {blog.author}</span>
                  <span>{new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>

                {/* Read More Button */}
                <button
                  className="btn btn-primary"
                  style={{ 
                    width: '100%',
                    marginTop: '1rem'
                  }}
                  onClick={() => {
                    // You could implement a modal or navigate to full post
                    alert(`Full content: ${blog.content}`)
                  }}
                >
                  Read More
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="card text-center" style={{ padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h3>No blog posts found</h3>
            <p>Try adjusting your search terms or filters</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Results Count */}
        {filteredBlogs.length > 0 && (
          <div className="text-center" style={{ marginTop: '2rem', color: 'var(--text-light)' }}>
            Showing {filteredBlogs.length} of {blogs.length} blog posts
          </div>
        )}
      </section>
    </div>
  )
}
