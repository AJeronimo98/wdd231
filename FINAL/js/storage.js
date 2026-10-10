// js/storage.js - Módulo para gestionar LocalStorage de manera segura
export function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error al guardar en LocalStorage:", error);
    }
}

export function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Error al leer de LocalStorage:", error);
        return null;
    }
}