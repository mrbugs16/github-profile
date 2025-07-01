import { useState, useEffect, useRef } from 'react';
import './index.css';

export default function App() {
  const year = new Date().getFullYear();
  const [theme, setTheme] = useState('light');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Animaciones Scroll
  const sectionsRef = useRef([]);

  // Detectar preferencia del sistema y cargar tema guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('glass');
    } else if (savedTheme === 'glass') {
      setTheme('glass');
      document.documentElement.classList.add('glass');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('glass');
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

  // Animaciones de scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observador específico para timeline events
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });

    // Observar todas las secciones
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Observar timeline events después de un pequeño delay
    setTimeout(() => {
      const timelineEvents = document.querySelectorAll('.timeline-event');
      timelineEvents.forEach((event) => {
        if (event) timelineObserver.observe(event);
      });
    }, 100);

    return () => {
      observer.disconnect();
      timelineObserver.disconnect();
    };
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

  // Alternar modo de tema (light/dark/glass)
  const toggleTheme = () => {
    let nextTheme;
    if (theme === 'light') {
      nextTheme = 'dark';
    } else if (theme === 'dark') {
      nextTheme = 'glass';
    } else {
      nextTheme = 'light';
    }
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('glass');
    } else if (nextTheme === 'glass') {
      document.documentElement.classList.add('glass');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('glass');
    }
  };

  // Función para agregar referencias a las secciones
  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
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
                      src="/NOMBRE-DE-TU-FOTO.jpg" 
                      alt="Santiago - Perfil Profesional" 
                      className="profile-image"
                      onError={() => {
                        console.log('Error cargando imagen desde /NOMBRE-DE-TU-FOTO.jpg');
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
              <h1> My profile – <span className="name">Santiago</span></h1>
              <p className="tagline"> Engineering in Computer and Telecommunications Technology | Backend Developer | Fronted Developer </p>
            </div>
          </div>
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Alternar modo de tema"
          >
            {theme === 'dark' ? '☀️' : theme === 'glass' ? '🧊' : '🌙'}
          </button>
        </div>
        
        <div className="contact-links">
          <a href="mailto:st16contact@gmail.com" className="contact-link">📧 Email</a>
          <a href="https://www.linkedin.com/in/santiago-tapia-8362ba2a6/" className="contact-link">💼 LinkedIn</a>
          <a href="https://github.com/mrbugs16" className="contact-link">🐙 GitHub</a>
        </div>
      </header>

      {/* ——— Sobre mí ——— */}
      <section id="sobre-mi">
        <h2>🧑‍💻 About me </h2>
        <p>
           I am a Computer Engineering graduate with a deep passion for technology, innovation, and continuous learning.
          I bring a strong work ethic and a resilient mindset, shaped by my background as a natural bodybuilder.
          From a young age, sports taught me that every challenge is worth facing, and every loss is a valuable lesson.
          I began my career focusing on backend services within the banking sector.
          However, my curiosity and drive to grow led me to develop frontend skills as well.
          This culminated in contributing to web services during my social service, where I supported a refugee assistance organization.
        </p>
      </section>

      {/* ——— Habilidades técnicas ——— */}
      <section id="habilidades">
        <h2>🛠️ Technical Skills </h2>
        
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

      {/* ——— Playlist de Spotify ——— */}
      <section id="spotify" className="spotify-section">
        <h2>🎵 My Coding Playlist</h2>
        <p>¡Disfruta de la música que me acompaña mientras programo!</p>
        <div className="spotify-embed-container">
          <iframe style={{borderRadius: '12px'}} src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS?utm_source=generator" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
      </section>

      {/* ——— Idiomas ——— */}
      <section id="idiomas">
        <h2>🌍 Languages</h2>
        <div className="languages-grid">
          <div className="language-card">
            <div className="language-flag">🇪🇸</div>
            <div className="language-info">
              <h3>Spanish</h3>
              <p className="language-level">Native</p>
              <div className="language-progress">
                <div className="progress-bar" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="language-card">
            <div className="language-flag">🇺🇸</div>
            <div className="language-info">
              <h3>English</h3>
              <p className="language-level">C1 - Advanced</p>
              <div className="language-progress">
                <div className="progress-bar" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
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
              src="NOMBRE-DE-TU-FOTO.jpg" 
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