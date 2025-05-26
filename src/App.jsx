import { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const year = new Date().getFullYear();
  const [darkMode, setDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Detectar preferencia del sistema y cargar tema guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Seguir el movimiento del cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Alternar modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      {/* Efecto de lupa que sigue el cursor */}
      <div 
        className="cursor-spotlight"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      
      <main className="container">
      <header>
        <div className="header-top">
          <div className="profile-section">
            <div className="profile-photo-container">
              <div className="profile-photo-frame">
                <div className="batman-glow"></div>
                <div className="rotating-border"></div>
                <div className="profile-photo">
                  {!imageError ? (
                    <img 
                      src="bat.jpg" 
                      alt="Santiago - Perfil Profesional" 
                      className="profile-image"
                      onError={() => {
                        console.log('Error cargando imagen desde bat.jpg');
                        setImageError(true);
                      }}
                      onLoad={() => console.log('Imagen cargada exitosamente')}
                    />
                  ) : (
                    <div className="profile-placeholder">S</div>
                  )}
                </div>
                <div className="profile-status-indicator"></div>
              </div>
            </div>
            <div className="profile-info">
              <h1>Mi Perfil – <span className="name">Santiago</span></h1>
              <p className="tagline">Ingeniero en Computación | Desarrollador Frontend | Innovador Tecnológico</p>
            </div>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="theme-toggle"
            aria-label="Alternar modo oscuro"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div className="contact-links">
          <a href="mailto:tu-email@ejemplo.com" className="contact-link">📧 Email</a>
          <a href="https://linkedin.com/in/tu-perfil" className="contact-link">💼 LinkedIn</a>
          <a href="https://github.com/mrbugs16" className="contact-link">🐙 GitHub</a>
        </div>
      </header>

      {/* ——— Sobre mí ——— */}
      <section id="sobre-mi">
        <h2>🧑‍💻 Sobre mí</h2>
        <p>
          Soy un <strong>ingeniero en computación</strong> apasionado por el desarrollo web,
          la innovación tecnológica y el aprendizaje continuo. Me especializo en frontend
          con React y en el diseño de interfaces accesibles. Disfruto resolviendo problemas
          complejos y creando soluciones que impacten positivamente en la experiencia del usuario.
        </p>
      </section>

      {/* ——— Habilidades técnicas ——— */}
      <section id="habilidades">
        <h2>🛠️ Habilidades Técnicas</h2>
        
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <div className="skills-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">Tailwind CSS</span>
            </div>
          </div>
          
          <div className="skill-category">
            <h3>Herramientas</h3>
            <div className="skills-tags">
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Vite</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">VS Code</span>
            </div>
          </div>
          
          <div className="skill-category">
            <h3>Otros</h3>
            <div className="skills-tags">
              <span className="skill-tag">Redes 5G</span>
              <span className="skill-tag">Accesibilidad Web</span>
              <span className="skill-tag">Responsive Design</span>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Proyectos destacados ——— */}
      <section id="proyectos">
        <h2>🚀 Proyectos Destacados</h2>
        
        <div className="projects-grid">
          <div className="project-card">
            <h3>Aplicación Web de Gestión</h3>
            <p>Sistema de gestión desarrollado con React y Node.js durante mi experiencia en ABC Tech.</p>
            <div className="project-tech">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">MongoDB</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">Ver Demo</a>
              <a href="#" className="project-link">Código</a>
            </div>
          </div>
          
          <div className="project-card">
            <h3>Hackathon Winner Project</h3>
            <p>Proyecto ganador del 1er lugar en Hackathon U XYZ 2024, enfocado en soluciones de IoT.</p>
            <div className="project-tech">
              <span className="tech-tag">IoT</span>
              <span className="tech-tag">React</span>
              <span className="tech-tag">API REST</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">Ver Demo</a>
              <a href="#" className="project-link">Código</a>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Formación académica ——— */}
      <section id="formacion">
        <h2>🎓 Formación Académica</h2>
        <div className="timeline-item">
          <h3>B.Sc. Ingeniería en Computación</h3>
          <p className="institution">Universidad XYZ | 2021-2025</p>
          <p>Especialización en desarrollo de software y redes de comunicación.</p>
        </div>
        
        <div className="timeline-item">
          <h3>Diplomado en Redes 5G</h3>
          <p className="institution">IEEE ComSoc | 2024</p>
          <p>Certificación especializada en tecnologías de quinta generación.</p>
        </div>
      </section>

      {/* ——— Experiencia y logros ——— */}
      <section id="experiencia">
        <h2>💼 Experiencia y Logros</h2>

        <div className="experience-section">
          <h3>Experiencia Profesional</h3>
          
          <div className="timeline-item">
            <h4>Desarrollador Frontend — ABC Tech</h4>
            <p className="period">Junio 2024 – Presente</p>
            <p>Desarrollo de interfaces web responsivas y accesibles usando React. Colaboración en equipos ágiles y optimización de performance.</p>
          </div>
          
          <div className="timeline-item">
            <h4>Practicante de I+D — Laboratorio de Telecom</h4>
            <p className="period">Enero - Mayo 2024</p>
            <p>Investigación en tecnologías 5G y desarrollo de prototipos para comunicaciones móviles.</p>
          </div>
        </div>

        <div className="experience-section">
          <h3>Logros Académicos</h3>
          <div className="achievements">
            <div className="achievement">
              <span className="achievement-icon">🏆</span>
              <div>
                <h4>1.er lugar, Hackathon U XYZ 2024</h4>
                <p>Proyecto innovador en IoT que resolvió problemas de eficiencia energética.</p>
              </div>
            </div>
            
            <div className="achievement">
              <span className="achievement-icon">🌟</span>
              <div>
                <h4>Becario Excelencia Académica 2023</h4>
                <p>Reconocimiento por alto rendimiento académico y liderazgo estudiantil.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Call to action ——— */}
      <section id="contacto" className="cta-section">
        <h2>📬 ¡Conectemos!</h2>
        <p>
          Estoy siempre abierto a nuevas oportunidades, colaboraciones y conversaciones interesantes. 
          No dudes en contactarme si tienes un proyecto emocionante o simplemente quieres charlar sobre tecnología.
        </p>
        <div className="cta-buttons">
          <a href="mailto:tu-email@ejemplo.com" className="cta-button primary">Enviar Email</a>
          <a href="https://linkedin.com/in/tu-perfil" className="cta-button secondary">Ver LinkedIn</a>
        </div>
      </section>

      <footer>
        <p>© {year} Santiago. Hecho con ❤️ y React.</p>
        <p className="footer-note">Desplegado en GitHub Pages</p>
      </footer>
    </main>

    {/* Modal de foto ampliada estilo Batman */}
    {showModal && (
      <div className="photo-modal" onClick={() => setShowModal(false)}>
        <div className="modal-backdrop"></div>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-photo-frame">
            <div className="modal-batman-glow"></div>
            <div className="modal-rotating-border"></div>
            <img 
              src="bat.jpg" 
              alt="Santiago - Perfil Profesional Ampliado" 
              className="modal-image"
            />
            <button 
              className="modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
          <div className="modal-info">
            <h3>Santiago</h3>
            <p>Ingeniero en Computación</p>
            <p className="modal-hint">Presiona ESC o haz click fuera para cerrar</p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}