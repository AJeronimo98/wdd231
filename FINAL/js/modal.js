// js/modal.js - Módulo para manejar diálogos modales accesibles
export function setupModal() {
    const modal = document.getElementById('item-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (!modal) return null;

    // Botón de cierre explícito
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    // Cerrar al hacer clic fuera del contenedor del modal (backdrop)
    modal.addEventListener('click', (event) => {
        const rect = modal.getBoundingClientRect();
        if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        ) {
            modal.close();
        }
    });

    return modal;
}