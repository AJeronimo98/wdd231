// js/order-action.js - Muestra los datos del formulario mediante URLSearchParams
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('order-details-container');
    
    // Menú hamburguesa móvil
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    if (!container) return;

    // Leer parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.keys().next().done) {
        container.innerHTML = `<p>No se encontraron datos recientes. Por favor completa el formulario de pedidos.</p>`;
        return;
    }

    const fullname = urlParams.get('fullname') || 'No proporcionado';
    const email = urlParams.get('email') || 'No proporcionado';
    const phone = urlParams.get('phone') || 'No proporcionado';
    const address = urlParams.get('address') || 'No proporcionado';
    const zone = urlParams.get('zone') || 'No proporcionado';
    const payment = urlParams.get('payment') || 'No proporcionado';
    const notes = urlParams.get('notes') || 'Ninguna';

    // Generar resumen con template literals y escape de seguridad básico
    container.innerHTML = `
        <ul style="list-style: none; padding: 0; line-height: 2;">
            <li><strong>Nombre:</strong> ${escapeHtml(fullname)}</li>
            <li><strong>Correo:</strong> ${escapeHtml(email)}</li>
            <li><strong>Teléfono:</strong> ${escapeHtml(phone)}</li>
            <li><strong>Dirección:</strong> ${escapeHtml(address)}</li>
            <li><strong>Zona de Entrega:</strong> ${escapeHtml(zone)}</li>
            <li><strong>Método de Pago:</strong> ${escapeHtml(payment)}</li>
            <li><strong>Notas Especiales:</strong> ${escapeHtml(notes)}</li>
        </ul>
    `;
});

function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}