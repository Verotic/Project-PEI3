import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Ficheiros estáticos da diretoria raiz
app.use(express.static(__dirname));

// Rota proxy para o WeatherService
app.get('/api/weather/forecast', async (req, res) => {
    try {
        const { lat, lon, units, lang } = req.query;
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Erro no proxy da API Weather:", error);
        res.status(500).json({ error: error.message });
    }
});

// Rota proxy para o NewsService
app.get('/api/news', async (req, res) => {
    try {
        const apiKey = process.env.NEWS_API_KEY;
        const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=pt&language=pt&category=health&timezone=atlantic/azores&image=1&removeduplicate=1`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Erro no proxy da API News:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
    console.log(`Abra o site em: http://localhost:${PORT}/index.html`);
});
