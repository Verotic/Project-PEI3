import { Database } from "./database.js";

// Class responsável pela Gestão de Eventos
export class EventManager extends Database {
    constructor(name, version) {
        super(name, version);
    }

    addEvent(name, description, date, hour, local){
        const request = indexedDB.open(this.dbname, this.version);  
        request.onsuccess = function (e) {
            const db = e.target.result;
            const transaction = db.transaction("events", "readwrite");
            const objectStore = transaction.objectStore("events");

            const event = { name, description, date, hour, local };
            const addRequest = objectStore.add(event);

            addRequest.onsuccess = function (e) {
                const id = e.target.result; //  id gerado automaticamente
                console.log("Event added:", { ...event, id });
            };

            addRequest.onerror = function (e) {
                console.error("Error adding event:", e.target.errorCode);
            }
        }
    }

    readEvents(){
        const request = indexedDB.open(this.dbname, this.version);

        request.onsuccess = function (e) {
        const db = e.target.result;
        const transaction = db.transaction("events", "readonly");
        const objectStore = transaction.objectStore("events");

        const getRequest = objectStore.getAll();

        getRequest.onsuccess = function () {
            if (getRequest.result.length > 0) {
            console.log("Events found:", getRequest.result);
            } else {
            console.log("No events found!");
            }
        };

        getRequest.onerror = function (e) {
            console.error("Error retrieving events:", e.target.errorCode);
        };
        };
    }

    updateEvent(id, updatedData){
        const request = indexedDB.open(this.dbname, this.version);

        request.onsuccess = function (e) {
        const db = e.target.result;
        const transaction = db.transaction("events", "readwrite");
        const objectStore = transaction.objectStore("events");

        const putRequest = objectStore.put({ ...updatedData, id });

        putRequest.onsuccess = function () {
            console.log("Event updated:", { ...updatedData, id });
        };

        putRequest.onerror = function (e) {
            console.error("Error updating event:", e.target.errorCode);
        };
        };
    }

    updateEvent2(id, updatedData){
    const request = indexedDB.open(this.dbname, this.version);

    request.onsuccess = function (e) {
        const db = e.target.result;
        const transaction = db.transaction("events", "readwrite");
        const objectStore = transaction.objectStore("events");

        const getRequest = objectStore.get(id);

        getRequest.onsuccess = function () {
            const existing = getRequest.result;

            if (!existing) {
                console.log("Event not found!");
                return;
            }

            const putRequest = objectStore.put({ ...existing, ...updatedData, id });

            putRequest.onsuccess = function () {
                console.log("Event updated:", { ...existing, ...updatedData, id });
            };

            putRequest.onerror = function (e) {
                console.error("Error updating event:", e.target.errorCode);
            };
        };
    };
}

    deleteEvent(id){
        const request = indexedDB.open(this.dbname, this.version);

        request.onsuccess = function (e) {
            const db = e.target.result;
            const transaction = db.transaction("events", "readwrite");
            const objectStore = transaction.objectStore("events");

            const deleteRequest = objectStore.delete(id);

            deleteRequest.onsuccess = function () {
                console.log("Event deleted:", id);
            };

            deleteRequest.onerror = function (e) {
                console.error("Error deleting event:", e.target.errorCode);
            };
        };
    }
}