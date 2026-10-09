document.addEventListener("DOMContentLoaded", () => {
    
    // Lista base de lunas conocidas de Saturno
    const lunasSaturno = [
        { nombre: "Titán", clase: "destacado titan-list" },
        { nombre: "Encélado", clase: "destacado encelado-list" },
        { nombre: "Jápeto", clase: "destacado japeto-list" },
        { nombre: "Mimas", clase: "" },
        { nombre: "Tethys", clase: "" },
        { nombre: "Dione", clase: "" },
        { nombre: "Rhea", clase: "" },
        { nombre: "Hiperión", clase: "" },
        { nombre: "Febe", clase: "" },
        { nombre: "Jano", clase: "" },
        { nombre: "Epimeteo", clase: "" },
        { nombre: "Helena", clase: "" },
        { nombre: "Telesto", clase: "" },
        { nombre: "Calipso", clase: "" },
        { nombre: "Pan", clase: "" },
        { nombre: "Dafnis", clase: "" },
        { nombre: "Atlas", clase: "" },
        { nombre: "Prometeo", clase: "" },
        { nombre: "Pandora", clase: "" },
        { nombre: "Metone", clase: "" },
        { nombre: "Anthe", clase: "" },
        { nombre: "Palene", clase: "" },
        { nombre: "Polideuco", clase: "" },
        { nombre: "Surtur", clase: "" },
        { nombre: "Skathi", clase: "" },
        { nombre: "Narvi", clase: "" }
    ];

    // Generar la lista restante de designaciones dinámicamente hasta completar 293
    const TOTAL_LUNAS = 293;
    let contadorAnio = 2004;
    let indiceSub = 1;

    for (let i = lunasSaturno.length + 1; i <= TOTAL_LUNAS; i++) {
        lunasSaturno.push({
            nombre: `S/${contadorAnio} S ${indiceSub}`,
            clase: ""
        });
        
        indiceSub++;
        if (indiceSub > 15) {
            indiceSub = 1;
            contadorAnio++;
        }
    }

    // 1. Inyectar las 293 lunas en el elemento HTML
    const listaUI = document.getElementById("lista-lunas-js");
    
    lunasSaturno.forEach((luna, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${luna.nombre}`;
        if (luna.clase) {
            li.className = luna.clase;
        }
        listaUI.appendChild(li);
    });

    // 2. Agregar el Buscador interactivo arriba de la lista
    const panelLunas = document.querySelector(".panel-lunas");
    const tituloPanel = panelLunas.querySelector("h3");

    const buscadorContainer = document.createElement("div");
    buscadorContainer.innerHTML = `
        <input type="text" id="input-buscar" placeholder="Buscar luna de Saturno..." autocomplete="off">
    `;
    tituloPanel.after(buscadorContainer);

    const inputBuscar = document.getElementById("input-buscar");
    Object.assign(inputBuscar.style, {
        width: "100%",
        padding: "6px 10px",
        marginBottom: "10px",
        borderRadius: "8px",
        border: "1px solid #eab308",
        background: "#050816",
        color: "#ffffff",
        fontSize: "12px",
        outline: "none"
    });

    // 3. Evento para filtrar en tiempo real
    inputBuscar.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const items = listaUI.querySelectorAll("li");

        items.forEach(item => {
            if (item.textContent.toLowerCase().includes(query)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    // 4. Efectos interactivos al hacer hover y click sobre la lista
    const itemsLista = listaUI.querySelectorAll("li");
    itemsLista.forEach(item => {
        item.style.cursor = "pointer";
        item.style.transition = "background 0.2s ease, padding-left 0.2s ease";

        item.addEventListener("mouseenter", () => {
            item.style.background = "rgba(234, 179, 8, 0.2)";
            item.style.paddingLeft = "12px";
        });

        item.addEventListener("mouseleave", () => {
            item.style.background = "transparent";
            item.style.paddingLeft = "8px";
        });

        item.addEventListener("click", () => {
            itemsLista.forEach(i => i.style.borderLeft = "none");
            item.style.borderLeft = "3px solid #fef08a";
        });
    });

});