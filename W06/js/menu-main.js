// js/menu-main.js - Módulo principal para la página del menú
import { saveToStorage, getFromStorage } from './storage.js';
import { setupModal } from './modal.js';

document.addEventListener('DOMContentLoaded', async () => {
    const menuContainer = document.getElementById('menu-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = setupModal();
    const modalBody = document.getElementById('modal-body');

    // Menú hamburguesa móvil
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    let menuData = [];

    // 1. Petición Fetch API con manejo de errores try...catch robusto
    try {
        const response = await fetch('data/menu.json');
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.statusText}`);
        }
        menuData = await response.json();
        
        // Renderizar todos los elementos inicialmente
        displayMenuItems(menuData);
    } catch (error) {
        console.error("Error al cargar los datos del menú:", error);
        if (menuContainer) {
            menuContainer.innerHTML = `
                <p class="error-message" style="grid-column: 1 / -1; text-align: center; color: #b71c1c;">
                    Lo sentimos, ocurrió un error al cargar el menú. Por favor, intenta recargar la página.
                </p>`;
        }
    }

    // 2. Función para generar contenido dinámicamente usando Template Literals
    function displayMenuItems(items) {
        if (!menuContainer) return;
        menuContainer.innerHTML = '';

        // Uso de método de arreglo .forEach()
        items.forEach(item => {
            const card = document.createElement('article');
            card.classList.add('menu-card');

            // Cada ítem muestra al menos 4 propiedades: category, name, description, price
            card.innerHTML = `
                <div class="card-info">
                    <span class="badge-category">${item.category.toUpperCase()}</span>
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                    <p class="price">$${item.price.toFixed(2)} MXN</p>
                    <div class="card-actions">
                        <button class="btn-details" data-id="${item.id}">Ver Detalles</button>
                        <button class="btn-favorite" data-id="${item.id}">⭐ Favorito</button>
                    </div>
                </div>
            `;

            menuContainer.appendChild(card);
        });

        // Adjuntar eventos interactivos a los elementos generados
        attachCardEvents(items);
    }

    // 3. Filtrado de elementos utilizando el método de arreglo .filter()
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                const category = e.target.getAttribute('data-filter');

                if (category === 'all') {
                    displayMenuItems(menuData);
                } else {
                    const filtered = menuData.filter(item => item.category === category);
                    displayMenuItems(filtered);
                }
            });
        });
    }

    // 4. Gestión de eventos para Modal y LocalStorage
    function attachCardEvents(items) {
        // Evento para ver detalles en el Modal
        const detailButtons = document.querySelectorAll('.btn-details');
        detailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.getAttribute('data-id'));
                const item = items.find(i => i.id === id); // Uso de .find()

                if (item && modal && modalBody) {
                    modalBody.innerHTML = `
                        <h3>${item.name}</h3>
                        <p><strong>Categoría:</strong> ${item.category}</p>
                        <p><strong>Precio:</strong> $${item.price.toFixed(2)} MXN</p>
                        <p style="margin-top: 1rem;">${item.description}</p>
                        <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
                            ✨ Platillo elaborado artesanalmente con recetas tradicionales oaxaqueñas.
                        </p>
                    `;
                    modal.showModal();
                }
            });
        });

        // Evento para guardar en LocalStorage (Favoritos)
        const favButtons = document.querySelectorAll('.btn-favorite');
        favButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.getAttribute('data-id'));
                const item = items.find(i => i.id === id);

                if (item) {
                    let favorites = getFromStorage('sazon_favorites') || [];
                    const alreadyExists = favorites.some(fav => fav.id === id); // Uso de .some()

                    if (!alreadyExists) {
                        favorites.push(item);
                        saveToStorage('sazon_favorites', favorites);
                        alert(`¡"${item.name}" se ha añadido a tus favoritos con éxito!`);
                    } else {
                        alert(`Este platillo ya se encuentra guardado en tus favoritos.`);
                    }
                }
            });
        });
    }
});