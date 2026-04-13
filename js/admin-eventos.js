import { EventManager } from './modules/EventManager.js';

// Inicializa a classe EventManager (liga à DB criada pela Júlia)
const eventManager = new EventManager('CACADatabase', 1);

// Elementos do DOM
const form = document.getElementById('eventForm');
const eventsContainer = document.getElementById('eventsContainer');
const eventIdInput = document.getElementById('eventId');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Variável para controlar se estamos a editar ou a criar
let isEditing = false;

// Função para carregar e renderizar os eventos
async function loadEvents() {
    try {
        const events = await eventManager.readEvents();
        renderEvents(events);
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        eventsContainer.innerHTML = '<p style="color:red;">Erro ao carregar os eventos da base de dados.</p>';
    }
}

// Função para renderizar os eventos no ecrã
function renderEvents(events) {
    if (!events || events.length === 0) {
        eventsContainer.innerHTML = '<p>Ainda não há eventos registados.</p>';
        return;
    }

    eventsContainer.innerHTML = ''; // Limpar o container

    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
            <div class="event-info">
                <strong>${event.name}</strong>
                <small>
                    <span class="material-symbols-outlined" aria-hidden="true">calendar_month</span>
                    ${event.date} às ${event.hour} • 
                    <span class="material-symbols-outlined" aria-hidden="true" style="margin-left:4px;">location_on</span>
                    ${event.local}
                </small>
                <p>${event.description}</p>
            </div>
            <div class="event-actions">
                <button class="btn btn-edit" data-id="${event.id}">Editar</button>
                <button class="btn btn-danger" data-id="${event.id}">Remover</button>
            </div>
        `;
        eventsContainer.appendChild(eventItem);
    });

    // Adicionar os listeners aos novos botões gerados
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => prepareEdit(Number(e.target.dataset.id)));
    });

    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', (e) => deleteEvent(Number(e.target.dataset.id)));
    });
}

// Submeter o Formulário (Criar ou Atualizar)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('eventName').value;
    const description = document.getElementById('eventDescription').value;
    const date = document.getElementById('eventDate').value;
    const hour = document.getElementById('eventHour').value;
    const local = document.getElementById('eventLocal').value;

    try {
        if (isEditing) {
            const id = Number(eventIdInput.value);
            await eventManager.updateEvent(id, { name, description, date, hour, local });
            alert("Evento atualizado com sucesso!");
        } else {
            await eventManager.addEvent(name, description, date, hour, local);
            alert("Evento criado com sucesso!");
        }
        
        resetForm();
        loadEvents(); // Recarregar a lista
    } catch (error) {
        console.error("Erro ao guardar evento:", error);
        alert("Ocorreu um erro ao guardar o evento.");
    }
});

// Preparar o formulário para edição
async function prepareEdit(id) {
    try {
        const events = await eventManager.readEvents();
        const event = events.find(e => e.id === id);
        
        if (event) {
            document.getElementById('eventId').value = event.id;
            document.getElementById('eventName').value = event.name;
            document.getElementById('eventDescription').value = event.description;
            document.getElementById('eventDate').value = event.date;
            document.getElementById('eventHour').value = event.hour;
            document.getElementById('eventLocal').value = event.local;
            
            isEditing = true;
            submitBtn.textContent = 'Atualizar Evento';
            cancelBtn.style.display = 'inline-block';
            
            // Fazer scroll suave para o formulário
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Erro ao carregar dados do evento:", error);
    }
}

// Apagar Evento
async function deleteEvent(id) {
    if (confirm("Tem a certeza que deseja remover este evento? Esta ação não pode ser desfeita.")) {
        try {
            await eventManager.deleteEvent(id);
            loadEvents(); // Recarregar a lista
        } catch (error) {
            console.error("Erro ao apagar evento:", error);
            alert("Erro ao apagar o evento.");
        }
    }
}

// Reset ao formulário
function resetForm() {
    form.reset();
    isEditing = false;
    eventIdInput.value = '';
    submitBtn.textContent = 'Adicionar Evento';
    cancelBtn.style.display = 'none';
}

// Cancelar Edição
cancelBtn.addEventListener('click', resetForm);

// Inicializar a lista quando a página carrega
document.addEventListener('DOMContentLoaded', loadEvents);
