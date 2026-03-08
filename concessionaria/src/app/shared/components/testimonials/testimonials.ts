import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  location: string;
  image: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  testimonials: TestimonialItem[] = [
    {
      quote:
        'Comprei meu SUV na AutoElite com aprovacao no mesmo dia. O processo foi rapido, transparente e sem surpresa no contrato.',
      name: 'Cameron Williamson',
      role: 'Cliente AutoElite',
      location: 'Rua Elgin, 253 - Sao Paulo',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=900&q=80',
    },
    {
      quote:
        'Avaliaram meu usado com justica e consegui fechar a troca com uma parcela que cabia no bolso. Atendimento impecavel.',
      name: 'Fernanda Lima',
      role: 'Comprou Corolla Cross',
      location: 'Av. Brasil, 1234 - Sao Paulo',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80',
    },
    {
      quote:
        'Equipe muito tecnica e atenciosa. Saimos com o carro revisado, documentacao em dia e total seguranca na negociacao.',
      name: 'Marcos Silva',
      role: 'Comprou Jeep Compass',
      location: 'Av. das Nacoes, 1200 - Sao Paulo',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    },
  ];

  activeIndex = 0;

  get current(): TestimonialItem {
    return this.testimonials[this.activeIndex];
  }

  prev(): void {
    this.activeIndex =
      this.activeIndex === 0 ? this.testimonials.length - 1 : this.activeIndex - 1;
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
  }

  goTo(index: number): void {
    this.activeIndex = index;
  }
}
