// Carrusel de imágenes SIEMPRE visible
const imagenes = [
  "Aventura.jfif",
  "Desayuno.jpg",
  "Hotel.jfif",
  "Diversion.webp",
    "Vuelo.jfif",
];
let indice = 0;
const img = document.getElementById('carrusel-img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const wrapper = document.querySelector('.carrusel-img-wrapper');

function mostrarImagen(nueva, direccion) {
  wrapper.classList.remove('rotate-left', 'rotate-right');
  void wrapper.offsetWidth;
  wrapper.classList.add(direccion === 'left' ? 'rotate-left' : 'rotate-right');
  setTimeout(() => {
    img.src = imagenes[nueva];
  }, 150);
  setTimeout(() => {
    wrapper.classList.remove('rotate-left', 'rotate-right');
  }, 400);
}

prevBtn.addEventListener('click', () => {
  const nuevo = (indice - 1 + imagenes.length) % imagenes.length;
  mostrarImagen(nuevo, 'left');
  indice = nuevo;
});

nextBtn.addEventListener('click', () => {
  const nuevo = (indice + 1) % imagenes.length;
  mostrarImagen(nuevo, 'right');
  indice = nuevo;
});

// --- Resto del código para el menú y acordeón (igual que antes) ---

// Contenidos de cada sección (sin carrusel)
const acordeonContents = [
  `<div class="acordeon-contenido">
    <h2>Bienvenido a Inicio</h2>
    <p>Somos mucho mas que una agencia de vaijes: Es una puerta a lo desconido nos especialisamos en experiencias unicas, Alejadas del turismo convencional, Llevando a nuestros viajeros por caminos escondidos, Paisajes inexplorados y culturas autenticas. ¡Descubri el mundo como nunca antes con RUTAS SECRETAS! </p>
  </div>`,
  `<div class="acordeon-contenido">
    <h2>Excursiones</h2>
    <p>Explora lugares unicos con nuestras excurciones desde locos parques hasta una camnata tranquila por la montaña.</p>
  </div>`,
  `<div class="acordeon-contenido">
    <h2>Destinos</h2>
    <p>Descubre nuestros destinos más populares, desde playas paradisíacas hasta montañas majestuosas.</p>
     <a href="link.html">ver mas</a>
  </div>`,
  `<div class="acordeon-contenido">
    <h2>Reseñas</h2>
    <p>mira las historias de otros aventureros que desidieron viajar con Rutas Secretas.</p>
  </div>`,
  `<div class="acordeon-contenido">
    <h2>Contacto</h2>
    <p>¿Tienes preguntas? Contáctanos a través de nuestras redes sociales.</p>
    <p>Teléfono: +123 456 7890</p>
    <p>Email:RutaSecreta@gmail.com</p>
    <p>Dirección: AV.SiempreViva 742, Springfield</p>
  </div>`
];

const navbar = document.getElementById('navbar');
const links = navbar.querySelectorAll('.nav-link');
const acordeonContainer = document.getElementById('acordeon-container');

let currentAcordeon = null;

links.forEach((link, idx) => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    // Quitar activo de todos los links
    links.forEach(l => l.classList.remove('activo'));

    // Si ya está abierto para este link, ciérralo
    if (currentAcordeon && currentAcordeon.idx === idx) {
      acordeonContainer.innerHTML = '';
      currentAcordeon = null;
      return;
    }

    // Marcar link activo
    link.classList.add('activo');

    // Obtener posición y ancho del link
    const rect = link.getBoundingClientRect();
    const navbarRect = navbar.getBoundingClientRect();
    const left = rect.left - navbarRect.left;
    const width = rect.width;

    // Mostrar acordeón alineado debajo del link seleccionado
    acordeonContainer.innerHTML = `
      <div class="acordeon-item activo" style="left:${left}px; width:${Math.max(width,220)}px">
        ${acordeonContents[idx]}
      </div>
    `;
    currentAcordeon = {idx};
  });
});

// Cierra el acordeón si haces clic fuera del navbar/acordeón
document.addEventListener('click', function(e) {
  if (
    currentAcordeon &&
    !navbar.contains(e.target) &&
    !document.getElementById('acordeon-container').contains(e.target)
  ) {
    acordeonContainer.innerHTML = '';
    links.forEach(l => l.classList.remove('activo'));
    currentAcordeon = null;
  }
});