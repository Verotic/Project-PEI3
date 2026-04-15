/**
 * MapService.js
 * Serviço para integrar mapa (Leaflet + OpenStreetMap) nos eventos
 */

export class MapService {
    constructor() {
        this.maps = {}; // Guarda as instâncias dos mapas criados
    }

    /**
     * Inicializa um mapa no contentor especificado com base na localidade
     * @param {string} containerId - ID da div onde o mapa será renderizado
     * @param {string} locationString - Morada ou cidade do evento
     */
    async initMap(containerId, locationString) {
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            // 1. Geocodificação usando Nominatim (OpenStreetMap API)
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationString)}&limit=1`);
            const data = await response.json();

            if (data && data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                const displayName = data[0].display_name;

                // 2. Inicializar o mapa (se já existir para este container, removemos primeiro)
                if (this.maps[containerId]) {
                    this.maps[containerId].remove();
                }

                const map = L.map(containerId).setView([lat, lon], 14);

                // 3. Adicionar tiles do OpenStreetMap
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // 4. Adicionar um marcador
                L.marker([lat, lon]).addTo(map)
                    .bindPopup(`<b>Local do Evento:</b><br>${locationString}`)
                    .openPopup();

                // Guardar referência para o caso de precisarmos de o manipular mais tarde
                this.maps[containerId] = map;
            } else {
                container.innerHTML = '<p style="text-align: center; padding-top: 40px; color: #666;">Localização não encontrada no mapa.</p>';
            }
        } catch (error) {
            console.error(`Erro ao inicializar mapa para ${locationString}:`, error);
            container.innerHTML = '<p style="text-align: center; padding-top: 40px; color: red;">Erro ao carregar mapa.</p>';
        }
    }

    /**
     * Inicializa um mapa de seleção interativo que atualiza um campo de input com a morada
     * @param {string} containerId - ID da div onde o mapa será renderizado
     * @param {string} inputId - ID do input que receberá a morada
     * @param {Array} initialCoords - Coordenadas iniciais [lat, lon] (opcional)
     */
    initSelectionMap(containerId, inputId, initialCoords = [37.740, -25.669]) { // Coordenadas padrão (Ponta Delgada)
        const container = document.getElementById(containerId);
        const inputField = document.getElementById(inputId);
        
        if (!container || !inputField) return null;

        // Se já houver um mapa neste container, remove-o
        if (this.maps[containerId]) {
            this.maps[containerId].remove();
        }

        // Criar o mapa
        const map = L.map(containerId).setView(initialCoords, 13);
        this.maps[containerId] = map;

        // Adicionar tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        let currentMarker = null;

        // Função para atualizar o marcador e fazer o reverse geocoding
        const updateLocation = async (lat, lon) => {
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            
            currentMarker = L.marker([lat, lon]).addTo(map);
            inputField.value = "A carregar morada...";

            try {
                // Reverse geocoding com Nominatim
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                const data = await response.json();
                
                if (data && data.display_name) {
                    // Extrai uma versão simplificada da morada se possível
                    const address = data.address;
                    let simpleAddress = '';
                    
                    if (address.road) simpleAddress += address.road;
                    if (address.city || address.town || address.village) {
                        simpleAddress += simpleAddress ? ', ' : '';
                        simpleAddress += (address.city || address.town || address.village);
                    }
                    
                    // Fallback para a morada completa se a simplificada não for boa
                    inputField.value = simpleAddress || data.display_name;
                    
                    currentMarker.bindPopup(`<b>Selecionado:</b><br>${inputField.value}`).openPopup();
                } else {
                    inputField.value = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                }
                
                // Dispara o evento input para atualizar outros sistemas se necessário
                inputField.dispatchEvent(new Event('input'));
            } catch (error) {
                console.error("Erro ao obter morada:", error);
                inputField.value = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
            }
        };

        // Adicionar evento de clique no mapa
        map.on('click', (e) => {
            updateLocation(e.latlng.lat, e.latlng.lng);
        });

        // Opcional: Se o inputField mudar manualmente, tentar atualizar o mapa
        inputField.addEventListener('change', async (e) => {
            const query = e.target.value;
            if (!query) {
                map.setView(initialCoords, 13);
                if (currentMarker) {
                    map.removeLayer(currentMarker);
                    currentMarker = null;
                }
                return;
            }
            
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
                const data = await response.json();
                
                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    
                    map.setView([lat, lon], 14);
                    if (currentMarker) {
                        map.removeLayer(currentMarker);
                    }
                    currentMarker = L.marker([lat, lon]).addTo(map);
                    currentMarker.bindPopup(`<b>Encontrado:</b><br>${data[0].display_name}`).openPopup();
                }
            } catch (error) {
                console.error("Erro na pesquisa por morada:", error);
            }
        });

        return map;
    }
}
