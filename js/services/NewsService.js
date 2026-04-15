/**
 * NewsService.js
 * Serviço para obter notícias portuguesas relacionadas com a saúde
 */

const apiKey = "pub_6d663b8f4c7f4f3aa18bc581cb102986";

const cardStyles = [
  { thumbClass: "thumb-1" },
  { thumbClass: "thumb-2" },
  { thumbClass: "thumb-3" },
];

export class NewsService {
  constructor() {
    this.apiKey = apiKey;
    this.loadNews();
  }

  // Formata as datas de "2024-10-12 08:30:00" para "12 OUT, 2024"
  formatDate(dateStr) {
    if (!dateStr) return "DATA INDEFINIDA";
    const months = ["JAN","FEV","MAR","ABR","MAI","JUN",
                    "JUL","AGO","SET","OUT","NOV","DEZ"];
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return `${String(date.getDate()).padStart(2, "0")} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  }

  // Chama a API: newsdata.io
  async getNewsData() {
    const url = `https://newsdata.io/api/1/latest?apikey=${this.apiKey}`
              + `&country=pt&language=pt&category=health`
              + `&timezone=atlantic/azores&image=1&removeduplicate=1`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
    return response.json();
  }

  // Constrói um card com os dados da notícia
  buildCard(noticia, style) {
    const { pubDate, title, description, link, image_url } = noticia;
    const { thumbClass } = style;

    const element = document.createElement("article");
    element.className = "news-card";

    element.innerHTML = `
      <div class="news-thumb ${thumbClass}">
        ${image_url ? `<img src="${image_url}" alt="${title ?? ''}">` : ""}
      </div>
      <div class="news-body">
        <p class="news-date">${this.formatDate(pubDate)}</p>
        <h3>${title ?? "Sem título"}</h3>
        <p>${description ?? "Sem descrição disponível."}</p>
        <a href="${link ?? "#"}" target="_blank" rel="noopener noreferrer">Ler mais</a>
      </div>
    `;

    return element;
  }

  // Mostra skeletons enquanto a API carrega
  renderSkeletons(grid) {
    grid.innerHTML = "";
    cardStyles.forEach(({ thumbClass }) => {
      const sk = document.createElement("article");
      sk.className = "news-card news-card--skeleton";
      sk.innerHTML = `
        <div class="news-thumb ${thumbClass}"></div>
        <div class="news-body">
          <p class="news-date skel skel-sm"></p>
          <h3 class="skel skel-lg"></h3>
          <p class="skel skel-md"></p>
          <a class="skel skel-sm"></a>
        </div>
      `;
      grid.appendChild(sk);
    });
  }

  // Orquestra tudo: skeleton → fetch → render
  async loadNews() {
    const grid = document.getElementById("newsGrid");

    this.renderSkeletons(grid);

    try {
      const data = await this.getNewsData();
      const articles = data.results ?? [];

      grid.innerHTML = "";

      for (let i = 0; i < 3; i++) {
        const article = articles[i] ?? {
          pubDate: "",
          title: "Notícia não disponível",
          description: "Não foi possível carregar esta notícia.",
          link: "#",
          image_url: null,
        };
        grid.appendChild(this.buildCard(article, cardStyles[i]));
      }

    } catch (err) {
      console.error("Erro ao carregar notícias:", err);
      grid.innerHTML = `
        <p class="news-error">
          Não foi possível carregar as notícias. Tente novamente mais tarde.
        </p>
      `;
    }
  }
}