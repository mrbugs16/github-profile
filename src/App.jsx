import { useState, useEffect, useRef } from 'react';
import './index.css';

export default function App() {
  const year = new Date().getFullYear();
  const [theme, setTheme] = useState('light');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Scroll animations
  const sectionsRef = useRef([]);

  // Detect system preference and load saved theme
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

  // Follow the cursor movement
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

  // Scroll animations
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

    // Specific observer for timeline events
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

    // Observe all sections
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Observe timeline events after a small delay
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

  // Close modal with ESC
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

  // Toggle theme (light/dark/glass)
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

  // Function to add references to the sections
  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      {/* Cursor effect */}
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
                      src="profiletwo.png" 
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

      {/* ——— About me ——— */}
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

      {/* ——— Technical skills ——— */}
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
            <h3>BackEnd</h3>
            <div className="skills-tags">
              <span className="skill-tag">MySQL</span>
              <span className="skill-tag">SAS Viya</span>
              <span className="skill-tag">Laravel</span>
              </div>
          </div>

          <div className="skill-category">
            <h3>Languages</h3>
            <div className="skills-tags">
              <span className="skill-tag">C</span>
              <span className="skill-tag">Java</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">Golang</span>
              <span className="skill-tag">Python</span>
              </div>
          </div>


          <div className="skill-category">
            <h3>Tools</h3>
            <div className="skills-tags">
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Vite</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">VS Code</span>
            </div>
          </div>
          
          <div className="skill-category">
            <h3>Others</h3>
            <div className="skills-tags">
              <span className="skill-tag">Social Media Management</span>
              <span className="skill-tag">Web Architecture</span>
              <span className="skill-tag">5G Service Communication</span>
            </div>
          </div>
        </div>
      </section>


      {/* ——— Featured projects ——— */}
      <section id="proyectos">
        <h2>🚀 Featured Projects</h2>
        
        <div className="projects-grid">
          <div className="project-card">
            <h3>Electoral Preferences in the Mexican Presidental Debates</h3>
            <p>+ Developed a sentiment analysis algorithm to evaluate public opinion via X (formerly Twitter) during three presidential debates.
              + Analyzed 10,000+ tweets using natural language processing and data analysis techniques using Python. </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">X</span>
              </div>
            <div className="project-links">
              <a href="#" className="project-link">Ver Demo</a>
              <a href="#" className="project-link">Código</a>
            </div>
          </div>
          
          <div className="project-card">
            <h3> Online Food Ordering Platform for Ibero</h3>
            <p> + Created a website enabling students and staff to order meals online from campus restaurants.</p>
               <p>+ Designed to reduce wait times and improve food service efficiency.</p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Django</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">Ver Demo</a>
              <a href="#" className="project-link">Código</a>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Academic formation ——— */}
      <section id="formacion">
        <h2>🎓 Education </h2>
        <div className="timeline-item">

          <h3>B.S. in Computer Systems and Telecommunications Engineering</h3>
          <p className="institution"> Universidad Iberoamericana, A.C | August 2021 - December 2025</p>
          <p>Former Varsity Tennis & Basketball Player at Universidad Iberoamericana</p>
        </div>
        
        <div className="timeline-item">
          <h3>HighSchool</h3>
          <p className="institution">Colegio México Bachillerato A.C | August 2016 - June 2019</p>
          <p>Former Varsity Volleyball Player at CMB. </p>
        </div>
      </section>

      <div className="timeline-item">
          <h3>TOEFL ITP Certified</h3>
          <p className="institution">Adams College of English | August 2019 - December 2019</p>
          <p>Completed a 6-month intensive English program in the U.S.</p>
        </div>
      

      {/* ——— Experience and achievements ——— */}
      <section id="experiencia">
        <h2>💼 Experiencia y Logros</h2>

        <div className="experience-section">
          <h3>Professional Experience</h3>
          
          <div className="timeline-item">
            <h4>Full Stack Developer - Intrare</h4>
            <p className="period">2025 January – 2025 July </p>
            <p> + Optimized the company’s web platform by improving accessibility and modernizing the user interface..</p>
            <p> + Contributed to the expansion and scalability of the user network.</p>
            <p> + Collaborated in full stack development tasks, ensuring responsive design and efficient backend integration.</p>
          </div>
          
          <div className="timeline-item">
            <h4>Back-End - Kapital Bank </h4>
            <p className="period">2024 August - Present </p>
            <p> + Participated in the development of a new banking system using Golang, following hexagonal architecture and implementing micro-kernel patterns for modularity and maintainability.</p>
            <p> + Performed critical database adjustments to enhance performance and ensure consistency across services.</p>
            <p> + Integrated Firebase services to manage user authentication through token-based access, connecting with PHP for backend operations.</p>
            <p> + Supported the development of new JavaScript functions to enhance interactivity and frontend behavior.</p>
            <p> + Collaborated with cross-functional teams to ensure secure and scalable delivery of banking features.</p>
          </div>
        </div>

        <div className="experience-section">
          <h3>Academic Achievements</h3>
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


      {/* ——— Spotify playlist ——— */}
      <section id="spotify" className="spotify-section">
        <h2>🎵 My Coding Playlist</h2>
        <p> Enjoy the music that accompanies me while I code!</p>
        <div className="spotify-embed-container">
          <iframe style={{borderRadius: '11px'}} src="https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd?si=4qaZlR4mT86-_4pqbGs_Dg" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
      </section>

      {/* ——— Languages ——— */}
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
                <div className="progress-bar" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© {year} Santiago. Made with ❤️ and React.</p>
        <p className="footer-note">Deployed on GitHub Pages</p>
      </footer>
    </main>

    {/* Expanded photo modal */}
    {showModal && (
      <div className="photo-modal" onClick={() => setShowModal(false)}>
        <div className="modal-backdrop"></div>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-photo-frame">
            <div className="modal-batman-glow"></div>
            <div className="modal-rotating-border"></div>
            <img 
              src="profiletwo.png" 
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
            <p>Computer Systems and Telecommunications Engineering</p>
            <p className="modal-hint">Click outside or press ESC to close</p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}