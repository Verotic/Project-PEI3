import { Database } from "../core/Database.js";

// Class responsável pela Gestão de Eventos
export class EventManager extends Database {
    constructor(name, version) {
        super(name, version);
    }

    addEvent(name, description, date, hour, local) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbname, this.version);  
            request.onsuccess = function (e) {
                const db = e.target.result;
                const transaction = db.transaction("events", "readwrite");
                const objectStore = transaction.objectStore("events");

                const event = { name, description, date, hour, local };
                const addRequest = objectStore.add(event);

                addRequest.onsuccess = function (e) {
                    const id = e.target.result;
                    resolve({ ...event, id });
                };

                addRequest.onerror = function (e) {
                    reject("Error adding event:", e.target.errorCode);
                }
            }
            request.onerror = function (e) {
                reject("Error opening DB:", e.target.errorCode);
            }
        });
    }

    readEvents() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbname, this.version);

            request.onsuccess = function (e) {
                const db = e.target.result;
                const transaction = db.transaction("events", "readonly");
                const objectStore = transaction.objectStore("events");

                const getRequest = objectStore.getAll();

                getRequest.onsuccess = function () {
                    resolve(getRequest.result);
                };

                getRequest.onerror = function (e) {
                    reject("Error retrieving events:", e.target.errorCode);
                };
            };
            request.onerror = function (e) {
                reject("Error opening DB:", e.target.errorCode);
            }
        });
    }

    updateEvent(id, updatedData) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbname, this.version);

            request.onsuccess = function (e) {
                const db = e.target.result;
                const transaction = db.transaction("events", "readwrite");
                const objectStore = transaction.objectStore("events");

                const getRequest = objectStore.get(id);

                getRequest.onsuccess = function () {
                    const existing = getRequest.result;

                    if (!existing) {
                        reject("Event not found!");
                        return;
                    }

                    const putRequest = objectStore.put({ ...existing, ...updatedData, id });

                    putRequest.onsuccess = function () {
                        resolve({ ...existing, ...updatedData, id });
                    };

                    putRequest.onerror = function (e) {
                        reject("Error updating event:", e.target.errorCode);
                    };
                };
                
                getRequest.onerror = function (e) {
                    reject("Error fetching event to update:", e.target.errorCode);
                }
            };
            request.onerror = function (e) {
                reject("Error opening DB:", e.target.errorCode);
            }
        });
    }

    deleteEvent(id) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbname, this.version);

            request.onsuccess = function (e) {
                const db = e.target.result;
                const transaction = db.transaction("events", "readwrite");
                const objectStore = transaction.objectStore("events");

                const deleteRequest = objectStore.delete(id);

                deleteRequest.onsuccess = function () {
                    resolve(id);
                };

                deleteRequest.onerror = function (e) {
                    reject("Error deleting event:", e.target.errorCode);
                };
            };
            request.onerror = function (e) {
                reject("Error opening DB:", e.target.errorCode);
            }
        });
    }
}
