const lunasDestacadas = [
    "Miranda", "Ariel", "Umbriel", "Titania", "Oberón"
];

// Lunas menores e interiores adicionales para completar exactamente las 28 lunas de Urano
const lunasMenoresUrano = [
    "Cordelia", "Ofelia", "Bianca", "Crésida", "Desdémona", "Julieta", 
    "Porcia", "Rosalinda", "Cupido", "Belinda", "Perdita", "Puck", 
    "Mab", "Francisco", "Calibán", "Stefano", "Trínculo", "Sicorax", 
    "Margarita", "Próspero", "Setebos", "Ferdinando", "S/2023 U 1"
];

// Unimos ambas listas para obtener las 28 lunas exactas
const nombresLunas = [...lunasDestacadas, ...lunasMenoresUrano];

const lunasGrandes = ["Miranda", "Ariel", "Umbriel", "Titania", "Oberón"];
const contenedor = document.getElementById('contenedor-lunas');

const anchoPantalla = window.innerWidth;
const altoPantalla = window.innerHeight;

// Coordenadas del centro de Urano
const centroX = anchoPantalla / 2;
const centroY = altoPantalla / 2;

// Radio libre alrededor de Urano (Planeta + Anillos)
const radioExclusionPlaneta = 180; 

// Guardar posiciones para evitar colisiones entre lunas
const posicionesLunas = [];

// Definir zonas libres de lunas alrededor de los textos
const zonasExclusionTexto = [
    // 1. Zona superior (Título, subtítulo y botón de volver)
    { minX: centroX - 250, maxX: centroX + 250, minY: 0, maxY: 130 },
    // 2. Zona inferior (Botón de "Ir al Inicio")
    { minX: centroX - 120, maxX: centroX + 120, minY: altoPantalla - 90, maxY: altoPantalla }
];

function calcularDistancia(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Comprobar si un punto cae dentro de las zonas delimitadas por las palabras
function chocaConTexto(x, y) {
    return zonasExclusionTexto.some(zona => 
        x >= zona.minX && x <= zona.maxX && y >= zona.minY && y <= zona.maxY
    );
}

// Algoritmo de distribución libre de colisiones para las 28 lunas
nombresLunas.forEach((nombre) => {
    const esGrande = lunasGrandes.includes(nombre);
    const margenSeguridad = esGrande ? 35 : 16; 

    let xValida = 0;
    let yValida = 0;
    let intentoValido = false;
    let maxIntentos = 1000;

    while (!intentoValido && maxIntentos > 0) {
        maxIntentos--;

        // Posición aleatoria dentro del área visible
        const x = Math.random() * (anchoPantalla - 80) + 40;
        const y = Math.random() * (altoPantalla - 80) + 40;

        // 1. Evitar choque con textos / títulos
        if (chocaConTexto(x, y)) {
            continue;
        }

        // 2. Evitar choque con Urano y sus anillos
        const distAlPlaneta = calcularDistancia(x, y, centroX, centroY);
        if (distAlPlaneta < radioExclusionPlaneta) {
            continue; 
        }

        // 3. Evitar choque con otras lunas
        let hayChoque = false;
        for (let pos of posicionesLunas) {
            const distEntreLunas = calcularDistancia(x, y, pos.x, pos.y);
            if (distEntreLunas < (margenSeguridad + pos.margen)) {
                hayChoque = true;
                break;
            }
        }

        if (!hayChoque) {
            xValida = x;
            yValida = y;
            intentoValido = true;
        }
    }

    posicionesLunas.push({ x: xValida, y: yValida, margen: margenSeguridad });

    // Crear elemento en el DOM
    const elemLuna = document.createElement('div');
    elemLuna.className = esGrande ? 'contenedor-luna-principal' : 'contenedor-luna-menor';
    elemLuna.style.left = `${xValida}px`;
    elemLuna.style.top = `${yValida}px`;

    const delay = (Math.random() * 4).toFixed(2);
    const duracion = (Math.random() * 2 + 3).toFixed(2);
    elemLuna.style.animationDelay = `${delay}s`;
    elemLuna.style.animationDuration = `${duracion}s`;

    const cuerpoLuna = document.createElement('div');
    if (esGrande) {
        const nombreClase = nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
        cuerpoLuna.className = `luna luna-${nombreClase}`;
    } else {
        cuerpoLuna.className = 'punto-luna';
    }

    const etiqueta = document.createElement('span');
    etiqueta.className = esGrande ? 'nombre-luna-principal' : 'etiqueta-luna';
    etiqueta.textContent = nombre;

    elemLuna.appendChild(cuerpoLuna);
    elemLuna.appendChild(etiqueta);
    contenedor.appendChild(elemLuna);
});