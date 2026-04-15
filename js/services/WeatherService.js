/** 
 * WeatherService.js 
 * Serviço para obter previsão do tempo para eventos 
 */ 
 
 const API_CONFIG = { 
     weather: { 
         baseUrl: 'https://api.openweathermap.org/data/2.5', 
         apiKey: '6d9cf7e1077b9b62e8e5596d81e1ef66' 
     }, 
     geo: { 
         baseUrl: 'https://api.openweathermap.org/geo/1.0' 
     } 
 }; 
 
 export class WeatherService { 
     constructor(language = 'pt') { 
         this.baseUrl = API_CONFIG.weather.baseUrl; 
         this.geoUrl = API_CONFIG.geo.baseUrl; 
         this.apiKey = API_CONFIG.weather.apiKey; 
         this.units = 'metric'; 
         this.language = language; 
     } 
 
     // Converte localidade para coordenadas usando Nominatim (OpenStreetMap) que é mais robusto para moradas e POIs
    async getCoordinates(location) { 
        // Removemos o geoUrl da OpenWeatherMap e usamos o Nominatim para resolver a morada
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`; 
        const response = await fetch(url); 
        
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`); 
        
        const data = await response.json(); 
        if (data.length === 0) throw new Error(`Localidade não encontrada: ${location}`); 
        
        return { 
            lat: data[0].lat, 
            lon: data[0].lon, 
            name: data[0].name || data[0].display_name.split(',')[0], 
            country: 'PT' // Por defeito
        }; 
    } 
 
     // Obtém previsão para uma data específica 
     async getWeatherForDate(location, date) { 
         // Obter coordenadas 
         const coords = await this.getCoordinates(location); 
         
         // Buscar previsão 
         const url = `${this.baseUrl}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${this.apiKey}&units=${this.units}&lang=${this.language}`; 
         const response = await fetch(url); 
         
         if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`); 
         
         const forecastData = await response.json(); 
         
         // Filtrar previsões para a data desejada 
         const targetDate = new Date(date); 
         targetDate.setHours(0, 0, 0, 0); 
         
         const forecastsForDate = forecastData.list.filter(item => { 
             const itemDate = new Date(item.dt * 1000); 
             itemDate.setHours(0, 0, 0, 0); 
             return itemDate.getTime() === targetDate.getTime(); 
         }); 
         
         if (forecastsForDate.length === 0) return null; 
         
         // Calcular temperaturas 
         const temps = forecastsForDate.map(item => item.main.temp); 
         
         // Retornar dados formatados 
         return { 
             date: date, 
             location: { 
                 name: coords.name, 
                 country: coords.country 
             }, 
             temperature: { 
                 current: Math.round(temps[0]), // Exibe a primeira do dia 
                 unit: '°C' 
             }, 
             humidity: forecastsForDate[0].main.humidity, // Exibe a primeira do dia 
             wind: { 
                 speed: forecastsForDate[0].wind.speed, // Exibe a primeira do dia 
                 unit: 'm/s' 
             }, 
             weather: { 
                 main: forecastsForDate[0].weather[0].main, // Exibe a primeira do dia 
                 description: forecastsForDate[0].weather[0].description, // Exibe a primeira do dia 
                 icon: forecastsForDate[0].weather[0].icon // Exibe a primeira do dia 
             }, 
             precipitation: forecastsForDate.reduce((sum, item) => sum + (item.pop || 0), 0) / forecastsForDate.length // Calcula a média do dia 
         }; 
     } 
 }