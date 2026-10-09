// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Agregar campo de búsqueda en la cabecera del panel lateral
    const panelLunas = document.querySelector(".panel-lunas");
    const tituloPanel = panelLunas.querySelector("h3");

    const contenedorBuscador = document.createElement("div");
    contenedorBuscador.className = "contenedor-buscador";
    contenedorBuscador.innerHTML = `
        <input type="text" id="input-buscar" placeholder="Buscar luna..." autocomplete="off">
    `;
    
    // Insertar el buscador debajo del título
    tituloPanel.after(contenedorBuscador);

    // Estilos dinámicos para el buscador
    const inputBuscar = document.getElementById("input-buscar");
    Object.assign(inputBuscar.style, {
        width: "100%",
        padding: "6px 10px",
        marginBottom: "10px",
        borderRadius: "8px",
        border: "1px solid #d97706",
        background: "#050816",
        color: "#ffffff",
        fontSize: "12px",
        outline: "none"
    });

    // 2. Funcionalidad de filtro/búsqueda en tiempo real
    const listaItems = document.querySelectorAll(".lista-scroll li");

    inputBuscar.addEventListener("input", (e) => {
        const textoFiltro = e.target.value.toLowerCase().trim();

        listaItems.forEach(item => {
            const nombreLuna = item.textContent.toLowerCase();
            if (nombreLuna.includes(textoFiltro)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    // 3. Interacción al hacer clic en las lunas de la lista
    listaItems.forEach(item => {
        // Estilo visual al pasar el cursor
        item.style.cursor = "pointer";
        item.style.transition = "background 0.2s ease, transform 0.2s ease";

        item.addEventListener("mouseenter", () => {
            item.style.background = "rgba(217, 119, 6, 0.25)";
            item.style.paddingLeft = "12px";
        });

        item.addEventListener("mouseleave", () => {
            item.style.background = "transparent";
            item.style.paddingLeft = "8px";
        });

        // Al hacer clic, resaltar temporalmente la luna seleccionada
        item.addEventListener("click", () => {
            listaItems.forEach(i => i.style.borderLeft = "none");
            item.style.borderLeft = "3px solid #fde047";
        });
    });

});