document.addEventListener("DOMContentLoaded", () => {

    // Lista oficial de lunas conocidas de Neptuno
    const lunasNeptuno = [
        { nombre: "Tritón", clase: "destacado triton-list" },
        { nombre: "Proteo", clase: "destacado proteo-list" },
        { nombre: "Nereida", clase: "destacado nereida-list" },
        { nombre: "Larisa", clase: "destacado larisa-list" },
        { nombre: "Galatea", clase: "" },
        { nombre: "Despina", clase: "" },
        { nombre: "Thalassa", clase: "" },
        { nombre: "Náyade", clase: "" },
        { nombre: "Halimede", clase: "" },
        { nombre: "Sao", clase: "" },
        { nombre: "Laomedeia", clase: "" },
        { nombre: "Psamathe", clase: "" },
        { nombre: "Neso", clase: "" },
        { nombre: "Hipocampo", clase: "" },
        { nombre: "S/2002 N 5", clase: "" },
        { nombre: "S/2021 N 1", clase: "" }
    ];

    // Cargar la lista en pantalla
    const listaUI = document.getElementById("lista-lunas-js");
    document.getElementById("contador-lunas").textContent = lunasNeptuno.length;

    lunasNeptuno.forEach((luna, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${luna.nombre}`;
        if (luna.clase) li.className = luna.clase;
        listaUI.appendChild(li);
    });

    // Añadir el buscador
    const panelLunas = document.querySelector(".panel-lunas");
    const tituloPanel = panelLunas.querySelector("h3");

    const buscadorContainer = document.createElement("div");
    buscadorContainer.innerHTML = `
        <input type="text" id="input-buscar" placeholder="Buscar luna de Neptuno..." autocomplete="off">
    `;
    tituloPanel.after(buscadorContainer);

    const inputBuscar = document.getElementById("input-buscar");
    Object.assign(inputBuscar.style, {
        width: "100%",
        padding: "6px 10px",
        marginBottom: "10px",
        borderRadius: "8px",
        border: "1px solid #3b82f6",
        background: "#050816",
        color: "#ffffff",
        fontSize: "12px",
        outline: "none"
    });

    // Filtro en tiempo real
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

    // Interacción hover y click
    const itemsLista = listaUI.querySelectorAll("li");
    itemsLista.forEach(item => {
        item.style.cursor = "pointer";
        item.style.transition = "background 0.2s ease, padding-left 0.2s ease";

        item.addEventListener("mouseenter", () => {
            item.style.background = "rgba(59, 130, 246, 0.25)";
            item.style.paddingLeft = "12px";
        });

        item.addEventListener("mouseleave", () => {
            item.style.background = "transparent";
            item.style.paddingLeft = "8px";
        });

        item.addEventListener("click", () => {
            itemsLista.forEach(i => i.style.borderLeft = "none");
            item.style.borderLeft = "3px solid #60a5fa";
        });
    });

});