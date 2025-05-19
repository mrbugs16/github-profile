import './index.css';

export default function App() {
  const year = new Date().getFullYear();

  return (
    <main className="container">
      <header>
        <h1>Mi Perfil – <span className="name">[Tu Nombre]</span></h1>
        <p className="tagline">Bienvenido(a) a mi portafolio personal</p>
      </header>

      {/* ——— Quién soy ——— */}
      <section id="quien-soy">
        <h2>¿Quién soy?</h2>
        <p>
          Soy un <strong>ingeniero en computación</strong> apasionado por el desarrollo web,
          la innovación tecnológica y el aprendizaje continuo. Me especializo en frontend
          con React y en el diseño de interfaces accesibles.
        </p>
      </section>

      {/* ——— Formación académica ——— */}
      <section id="formacion">
        <h2>Formación académica</h2>
        <ul>
          <li>B.Sc. Ingeniería en Computación — Universidad XYZ (2021-2025)</li>
          <li>Diplomado en Redes 5G — IEEE ComSoc (2024)</li>
        </ul>
      </section>

      {/* ——— Logros y experiencia ——— */}
      <section id="logros">
        <h2>Logros y experiencia</h2>

        <h3>Logros académicos</h3>
        <ul>
          <li>1.er lugar, Hackathon U XYZ 2024</li>
          <li>Becario Excelencia Académica 2023</li>
        </ul>

        <h3>Experiencia profesional</h3>
        <ul>
          <li>Desarrollador Frontend — ABC Tech (jun 2024 – presente)</li>
          <li>Practicante de I+D — Laboratorio de Telecom (ene-may 2024)</li>
        </ul>
      </section>

      <footer>
        © {year} [Tu Nombre]. Todos los derechos reservados.
      </footer>
    </main>
  );
}