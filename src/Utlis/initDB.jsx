import { openDB } from 'idb';

export const initDB = async () => {
    return openDB('CartDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('cart')) {
                db.createObjectStore('cart', { keyPath: 'id' }); // Use product ID as the key
            }
        },
    });
};
