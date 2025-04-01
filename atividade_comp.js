class AulasComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.hoje = "ter";
    }

    connectedCallback() {
      this.loadData();
    }

    async loadData() {
      try {
        const response = await fetch('aulas.json');
        const aulas = await response.json();
        this.render(aulas);
      } catch (error) {
        console.error('Erro ao carregar os dados das aulas:', error);
      }
    }

    getCorNota(nota) {
      const valor = parseFloat(nota);
      if (valor < 6) return '#ff4444'; // Vermelho
      if (valor < 8) return '#ffa500'; // Laranja
      return '#4CAF50'; // Verde
    }

    render(aulas) {
      const aulasDia = aulas.filter(a => a.data === this.hoje);
  
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'styles_componente.css';
      this.shadowRoot.appendChild(link);

      this.shadowRoot.innerHTML += `
        <div>
          ${aulasDia.map(a => {
            let provaDisplay = a.prova_alert ? '' : 'display: none;';
            return `
              <div class="comp-aula">
                <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
                <div class="titulo_aula">${a.disciplina}</div>
                <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
                <div class="lables">
                  <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                  <div class="lable-nota p_lable" 
                       style="background-color: ${this.getCorNota(a.nota)}">
                    CR: <b>${a.nota}</b>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
}

customElements.define('aulas-component', AulasComponent);