import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  faqs: FaqItem[] = [
    {
      question: 'O que torna a AutoElite diferente de outras concessionarias?',
      answer:
        'Atendimento consultivo, transparencia total no processo de compra e veiculos com revisao completa e procedencia garantida.',
    },
    {
      question: 'Quais tipos de veiculos voces vendem e avaliam na troca?',
      answer:
        'Trabalhamos com hatch, sedan, SUV, picape e premium, aceitando usados multimarcas na avaliacao.',
    },
    {
      question: 'Posso financiar mesmo com score mais baixo?',
      answer:
        'Sim. Fazemos analise com bancos parceiros para buscar a melhor proposta possivel para o seu perfil.',
    },
    {
      question: 'A avaliacao do meu usado e feita na hora?',
      answer:
        'Na maioria dos casos, sim. A pre-avaliacao e iniciada online e concluida presencialmente com vistoria tecnica.',
    },
    {
      question: 'Quanto tempo leva para aprovar o financiamento?',
      answer:
        'Em media de minutos a algumas horas, dependendo da documentacao e do banco escolhido.',
    },
  ];

  activeIndex = 0;

  setActive(index: number): void {
    this.activeIndex = index;
  }
}
