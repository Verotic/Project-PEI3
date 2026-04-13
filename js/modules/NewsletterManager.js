import { Database } from "./database.js";

// Class responsável pela Gestão de Newsletter
export class NewsletterManager extends Database {
    constructor(name, version) {
        super(name, version);
    }

    addSubscriber(name, email){
        const request = indexedDB.open(this.dbname, this.version);  
        request.onsuccess = function (e) {
            const db = e.target.result;
            const transaction = db.transaction("subscribers", "readwrite");
            const objectStore = transaction.objectStore("subscribers");

            const subscriber = { name, email };
            const addRequest = objectStore.add(subscriber);

            addRequest.onsuccess = function (e) {
                const id = e.target.result; //  id gerado automaticamente
                console.log("Subscriber added:", { ...subscriber, id });
            };

            addRequest.onerror = function (e) {
                console.error("Error adding subscriber:", e.target.errorCode);
            }
        }
    }

    readSubscribers(){
        const request = indexedDB.open(this.dbname, this.version);
        request.onsuccess = function (e) {
            const db = e.target.result;
            const transaction = db.transaction("subscribers", "readonly");
            const objectStore = transaction.objectStore("subscribers");

            const getRequest = objectStore.getAll();

            getRequest.onsuccess = function () {
                if (getRequest.result.length > 0) {
                console.log("Subscribers found:", getRequest.result);
                } else {
                console.log("No subscribers found!");
                }
            };

            getRequest.onerror = function (e) {
                console.error("Error retrieving subscribers:", e.target.errorCode);
            };
        };
    }
}