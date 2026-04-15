document.addEventListener('DOMContentLoaded', () => {
    // Sistema de Búsqueda
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const mainCatalog = [
        { title: "Rapido y Furioso (2001)", url: "/rapido-y-furioso-2001", img: "https://image.tmdb.org/t/p/w200/jZ0y9m7oR2U1vjY7uJ7SjzG1C0j.jpg", type: "Película" },
        { title: "Avengers: Endgame (2019)", url: "/avengers-endgame-2019", img: "https://i.ebayimg.com/images/g/MWoAAOSweZVjM9ZF/s-l400.jpg", type: "Película" },
        { title: "El Hombre Araña (2002)", url: "/el-hombre-arana-2002", img: "https://image.tmdb.org/t/p/w300/mVOCqKvJZvpA1oXPk35OLBsgcPF.jpg", type: "Película" },
        { title: "Ninjago Movie: La película (2017)", url: "/ninjago-movie-2017", img: "/images/ninjago_movie_poster.png", type: "Película" },
        { title: "Ninjago Especial: El Regreso de los Villanos", url: "/especial-difuntos", img: "/images/especial_difuntos.png", type: "Especial" },
        { title: "Ninjago T0: Episodios Piloto", url: "/temporada0", img: "/images/ninjago_temp0.jpg", type: "Serie" },
        { title: "Ninjago T1: El Ascenso de las Serpientes", url: "/temporada1", img: "/images/ninjago_temp1.jpg", type: "Serie" },
        { title: "Ninjago T2: El Legado del Ninja Verde", url: "/temporada2", img: "/images/ninjago_temp2.jpg", type: "Serie" },
        { title: "Ninjago T3: Rebooted (Reinicio)", url: "/temporada3", img: "/images/ninjago_temp3.jpg", type: "Serie" },
        { title: "Ninjago T4: El Torneo de los Elementos", url: "/temporada4", img: "/images/ninjago_temp4.jpg", type: "Serie" },
        { title: "Ninjago T5: La Posesión", url: "/temporada5", img: "/images/ninjago_temp5_full.jpg", type: "Serie" },
        { title: "Ninjago T6: Skybound", url: "/temporada6", img: "/images/ninjago_temp6_full.jpg", type: "Serie" },
        { title: "Ninjago T7: Manecillas del Tiempo", url: "/temporada7", img: "/images/ninjago_temp7.jpg", type: "Serie" },
        { title: "Ninjago T8: Los Hijos de Garmadon", url: "/temporada8", img: "/images/ninjago_temp8.jpg", type: "Serie" },
        { title: "Ninjago T9: Cacería (Hunted)", url: "/temporada9", img: "/images/ninjago_temp9.jpg", type: "Serie" },
        { title: "Ninjago T10: La Marcha de los Oni", url: "/temporada10", img: "/images/ninjago_temp10.jpg", type: "Serie" },
        { title: "Ninjago T11: Spinjitzu Prohibido", url: "/temporada11", img: "/images/ninjago_temp11.jpg", type: "Serie" },
        { title: "Ninjago T12: Prime Empire", url: "/temporada12", img: "/images/ninjago_temp12.jpg", type: "Serie" },
        { title: "Ninjago T13: Master of the Mountain", url: "/temporada13", img: "/images/ninjago_temp13.jpg", type: "Serie" },
        { title: "Ninjago T14: The Island", url: "/temporada14", img: "/images/ninjago_temp14.jpg", type: "Serie" },
        { title: "Ninjago T15: Seabound", url: "/temporada15", img: "/images/ninjago_temp15.jpg", type: "Serie" },
        { title: "Ninjago T16: Crystalized", url: "/temporada16", img: "/images/ninjago_temp16.jpg", type: "Serie" },
        { title: "Super Mario Bros. La película", url: "/mario-bros-2023", img: "https://image.tmdb.org/t/p/w500/zNKs1T0VZuJiVuhuL5GSCNkGdxf.jpg", type: "Película" }
    ];

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            searchResults.innerHTML = '';

            if (query.length > 0) {
                const matches = mainCatalog.filter(item => 
                    item.title.toLowerCase().includes(query)
                ).slice(0, 5); // Limitar a 5 resultados

                if (matches.length > 0) {
                    searchResults.classList.add('active');
                    matches.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'search-item';
                        div.innerHTML = `
                            <img src="${item.img}" alt="${item.title}" style="width: 40px; height: 55px; object-fit: cover; border-radius: 4px;">
                            <div class="search-item-info">
                                <div class="search-item-title">${item.title}</div>
                                <div class="search-item-type">${item.type}</div>
                            </div>
                        `;
                        div.onclick = () => window.location.href = item.url;
                        searchResults.appendChild(div);
                    });
                } else {
                    searchResults.classList.remove('active');
                }
            } else {
                searchResults.classList.remove('active');
            }
        });
    }

    // Cerrar búsqueda al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!searchInput?.contains(e.target) && !searchResults?.contains(e.target)) {
            searchResults?.classList.remove('active');
        }
    });

    // Contador de Visitas Unicas (Simple con SessionStorage)
    if (!sessionStorage.getItem('visited')) {
        let totalVisits = localStorage.getItem('total-visits') || 0;
        totalVisits++;
        localStorage.setItem('total-visits', totalVisits);
        sessionStorage.setItem('visited', 'true');
    }

    // Actualizar números en el Admin si existen los elementos
    const totalVisitsEl = document.getElementById('total-visits-count');
    if (totalVisitsEl) {
        totalVisitsEl.innerText = localStorage.getItem('total-visits') || 0;
    }
});
