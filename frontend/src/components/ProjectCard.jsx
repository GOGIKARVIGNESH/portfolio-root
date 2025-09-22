import React, { useState } from 'react'

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article 
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Project Image */}
      {project.image && (
        <div style={{ 
          marginBottom: '1rem', 
          borderRadius: 'var(--radius)', 
          overflow: 'hidden',
          height: '200px',
          background: `url(${project.image}) center/cover`
        }}>
        </div>
      )}

      {/* Project Title */}
      <h3 style={{ 
        marginBottom: '0.75rem', 
        fontSize: '1.25rem',
        fontWeight: '600',
        color: 'var(--text-dark)'
      }}>
        {project.title}
      </h3>

      {/* Project Description */}
      <p style={{ 
        marginBottom: '1rem', 
        color: 'var(--text-light)',
        lineHeight: '1.5'
      }}>
        {project.shortDescription}
      </p>

      {/* Technologies */}
      {project.technologies && (
        <div style={{ 
          marginBottom: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              style={{
                background: 'var(--bg-light)',
                color: 'var(--primary-color)',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: '1px solid var(--border-color)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Project Date */}
      {project.date && (
        <div style={{ 
          marginBottom: '1rem',
          fontSize: '0.875rem',
          color: 'var(--text-light)'
        }}>
          {new Date(project.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem',
        alignItems: 'center'
      }}>
        <a 
          href={project.url} 
          target="_blank" 
          rel="noreferrer"
          className="btn btn-primary"
          style={{ 
            flex: 1,
            textAlign: 'center',
            textDecoration: 'none'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          View Project
        </a>
        
        {project.description && (
          <button
            className="btn btn-secondary"
            style={{ 
              padding: '0.75rem',
              minWidth: 'auto'
            }}
            onClick={(e) => {
              e.stopPropagation()
              // You could implement a modal or expand functionality here
              alert(project.description)
            }}
            title="View Details"
          >
            ℹ️
          </button>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        borderRadius: 'var(--radius)'
      }} />
    </article>
  )
}