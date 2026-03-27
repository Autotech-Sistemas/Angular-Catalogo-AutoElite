import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Fuel,
  Gauge,
  LucideAngularModule,
  MapPin,
  MessageCircle,
  Settings2,
  X
} from 'lucide-angular';

declare var lucide: any;

@Component({
  selector: 'app-vehicle-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RouterModule],
  templateUrl: './vehicle-page.html',
  styleUrl: './vehicle-page.css',
})
export class VehiclePage implements AfterViewInit, OnInit {

  readonly icons = {
    ArrowLeft, // Adicionado para o botão voltar
    ArrowRight,
    CircleCheck,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Gauge,
    Fuel,
    Settings2,
    MessageCircle,
    MapPin,
    X,
  };

  // ── Variáveis de Estado (Veículo & Modal) ──
  isInterestModalOpen = false;
  currentImageIndex = 0;
  activeTab = 'highlights';
  interestForm!: FormGroup;

  // ── Dados fixos — VW Nivus Vermelho ──────────────────────────────────────
  readonly car = {
    price: 134990,
    images: [
      'carro-frente.png',
      'carro-traseira.png',
    ],
  };

  readonly highlights = [
    'Único Dono',
    'Garantia de Loja',
    'IPVA 2024 Pago',
    'Laudo Cautelar Aprovado',
    'Revisado recentemente',
    'Cor Vermelho Original',
  ];

  readonly specs = [
    { label: 'Versão',        value: 'Highline 1.0 TSI Turbo' },
    { label: 'Ano Modelo',    value: '2024' },
    { label: 'Câmbio',        value: 'Automático (DSG)' },
    { label: 'Combustível',   value: 'Flex' },
    { label: 'Motor',         value: '1.0 TSI 3 cilindros' },
    { label: 'Potência',      value: '128 cv' },
    { label: 'Torque',        value: '200 Nm' },
    { label: 'Tração',        value: 'Dianteira' },
    { label: 'Cor',           value: 'Vermelho' },
    { label: 'Quilometragem', value: '18.400 km' },
    { label: 'Portas',        value: '4' },
    { label: 'Carroceria',    value: 'SUV Coupé' },
  ];
  // ─────────────────────────────────────────────────────────────────────────

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.interestForm = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(3)]],
      phone:   ['', [Validators.required, Validators.pattern('^[0-9\\-\\(\\)\\s]*$')]],
      email:   ['', [Validators.required, Validators.email]],
      message: [this.defaultMessage()],
    });
  }

  ngAfterViewInit() {
    this.refreshIcons();
  }

  // ── Lógicas do Modal e Veículo ───────────────────────────────
  defaultMessage(): string {
    return `Olá, tenho interesse no VW Nivus Vermelho anunciado por ${this.formatPrice(this.car.price)}. Gostaria de mais informações.`;
  }

  refreshIcons() {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 100);
    }
  }

  openInterestModal() {
    this.isInterestModalOpen = true;
    this.interestForm.get('message')?.setValue(this.defaultMessage());
    this.refreshIcons();
  }

  closeInterestModal() {
    this.isInterestModalOpen = false;
  }

  onSubmitInterest() {
    if (this.interestForm.valid) {
      alert('Sua proposta foi enviada com sucesso! Entraremos em contato em breve.');
      this.closeInterestModal();
      this.interestForm.reset();
    } else {
      this.interestForm.markAllAsTouched();
    }
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.car.images.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.car.images.length) % this.car.images.length;
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}