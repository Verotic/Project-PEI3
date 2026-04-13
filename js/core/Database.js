// Class responsável pela Base de Dados
export class Database {
  /**
   * Inicializa a base de dados.
   * @param {string} name - nome da base de dados.
   * @param {int} version - versão da base de dados para futura atualização.
   */

  constructor(name, version) {
    this.dbname = name;
    this.version = version;
    this.init();
  }

  // Inicializa a base de dados.
  init() {
    this.createDatabase();
  }

  createDatabase(){
    const request = indexedDB.open(this.dbname, this.version);
  
    request.onupgradeneeded = function (e) {
    const db = e.target.result;

    if (!db.objectStoreNames.contains("events")) {
        db.createObjectStore("events", { keyPath: "id", autoIncrement: true });
    }
    if (!db.objectStoreNames.contains("subscribers")) {
        db.createObjectStore("subscribers", { keyPath: "id", autoIncrement: true });
    }
    
    console.log("Database setup complete");
};
  
    request.onsuccess = function (e) {
      const db = e.target.result;
      console.log("Database opened successfully");
      console.log(db)
    };
  
    request.onerror = function (e) {
      console.error("Error opening database:", e.target.errorCode);
    }
  }
}