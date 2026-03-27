import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FinancingTabContent {
  heading: string;
  highlight: string;
  description: string;
  points: string[];
}

@Component({
  selector: 'app-financing',
  imports: [CommonModule],
  templateUrl: './financing.html',
  styleUrl: './financing.css',
})
export class Financing {
  tabs = [
    { id: 'values', label: 'Nossos Valores' },
    { id: 'mission', label: 'Nossa Missao' },
    { id: 'vision', label: 'Nossa Visao' },
  ];

  activeTab: string = 'values';

  contentMap: Record<string, FinancingTabContent> = {
    values: {
      heading: 'No que Nos',
      highlight: 'Destacamos',
      description:
        'Nossos valores orientam cada proposta de financiamento e cada atendimento. Entregamos transparencia, clareza e suporte real para sua decisao.',
      points: [
        'Aprovacao agil com simulacao clara desde o primeiro contato.',
        'Parcerias com bancos para buscar parcelas dentro do seu perfil.',
        'Processo sem taxas escondidas e com contrato explicado ponto a ponto.',
        'Seu tempo e prioridade, com atendimento consultivo ate a assinatura.',
      ],
    },
    mission: {
      heading: 'Nossa',
      highlight: 'Missao',
      description:
        'Facilitar a compra do seu veiculo com credito acessivel, suporte humano e condicoes sustentaveis para o seu planejamento financeiro.',
      points: [
        'Unir tecnologia e atendimento para acelerar a aprovacao.',
        'Garantir propostas personalizadas para cada cliente.',
        'Reduzir burocracia sem abrir mao de seguranca juridica.',
        'Oferecer acompanhamento completo da simulacao a entrega.',
      ],
    },
    vision: {
      heading: 'Nossa',
      highlight: 'Visao',
      description:
        'Ser referencia em financiamento automotivo pela experiencia clara, digital e eficiente, com alto indice de aprovacao e satisfacao.',
      points: [
        'Construir jornadas digitais simples para compra e troca.',
        'Expandir acesso ao credito com responsabilidade.',
        'Elevar o padrao de transparencia no setor automotivo.',
        'Transformar financiamento em uma etapa leve e previsivel.',
      ],
    },
  };

  get currentContent(): FinancingTabContent {
    return this.contentMap[this.activeTab] ?? this.contentMap['values'];
  }

  setTab(tabId: string): void {
    this.activeTab = tabId;
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
