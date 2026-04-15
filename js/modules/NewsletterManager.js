import { Database } from "../core/Database.js";

// Class responsável pela Gestão de Newsletter
export class NewsletterManager extends Database {
    constructor(name, version) {
        super(name, version);
        this.form = document.getElementById('newsletter-form');
        this.feedback = document.getElementById('form-feedback');
        this.initNewsletter();
    }

    initNewsletter() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubscribe(e));
        }
    }

    async handleSubscribe(e) {
        e.preventDefault();
        const name = document.getElementById('newsletter-name').value;
        const email = document.getElementById('newsletter-email').value;

        if (!this.validateEmail(email)) {
            this.showFeedback("Por favor, insira um e-mail válido.", true);
            return;
        }

        try {
            await this.addSubscriber(name, email);
            this.showFeedback("Subscrição efetuada com sucesso!");
            this.form.reset();
        } catch (error) {
            this.showFeedback("Erro ao subscrever. Tente novamente.", true);
        }
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showFeedback(message, isError = false) {
        if (this.feedback) {
            this.feedback.textContent = message;
            this.feedback.className = isError ? 'error-msg' : 'success-msg';
            
            // Remover a mensagem após 5 segundos
            setTimeout(() => {
                this.feedback.textContent = '';
                this.feedback.className = '';
            }, 5000);
        }
    }

    addSubscriber(name, email){
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbname, this.version);  
            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction("subscribers", "readwrite");
                const objectStore = transaction.objectStore("subscribers");

                const subscriber = { name, email, date: new Date().toISOString() };
                const addRequest = objectStore.add(subscriber);

                addRequest.onsuccess = (e) => {
                    resolve({ ...subscriber, id: e.target.result });
                };

                addRequest.onerror = (e) => {
                    reject(e.target.errorCode);
                }
            };
            request.onerror = (e) => reject(e.target.errorCode);
        });
    }

    readSubscribers(){
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbname, this.version);
            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction("subscribers", "readonly");
                const objectStore = transaction.objectStore("subscribers");

                const getRequest = objectStore.getAll();

                getRequest.onsuccess = () => {
                    resolve(getRequest.result);
                };

                getRequest.onerror = (e) => {
                    reject(e.target.errorCode);
                };
            };
            request.onerror = (e) => reject(e.target.errorCode);
        });
    }

    deleteSubscriber(id){
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbname, this.version);

            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction("subscribers", "readwrite");
                const objectStore = transaction.objectStore("subscribers");

                const deleteRequest = objectStore.delete(id);

                deleteRequest.onsuccess = () => {
                    resolve(id);
                };

                deleteRequest.onerror = (e) => {
                    reject(e.target.errorCode);
                };
            };
            request.onerror = (e) => reject(e.target.errorCode);
        });
    }
}
