import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-simulator',
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-simulator.html',
  styleUrl: './loan-simulator.css',
})
export class LoanSimulator {
  vehicleCategory = 'Sedan';
  vehiclePrice = 120000;
  downPayment = 30000;
  loanMonths = 60;
  annualRate = 5.99;
  monthlyIncome = 12000;
  currency = 'BRL';
  creditRange = 'Good (700-749)';

  get financedAmount(): number {
    return Math.max(1000, this.vehiclePrice - this.downPayment);
  }

  get monthlyPayment(): number {
    const principal = this.financedAmount;
    const monthlyRate = this.annualRate / 100 / 12;
    const months = this.loanMonths;
    if (!principal || !months) return 0;
    if (monthlyRate === 0) return principal / months;
    const factor = Math.pow(1 + monthlyRate, months);
    return (principal * monthlyRate * factor) / (factor - 1);
  }

  get totalPayment(): number {
    return this.monthlyPayment * this.loanMonths;
  }

  get totalInterests(): number {
    return Math.max(0, this.totalPayment - this.financedAmount);
  }

  get commitmentPercent(): number {
    if (!this.monthlyIncome) return 0;
    return (this.monthlyPayment / this.monthlyIncome) * 100;
  }

  get recommendedIncome(): number {
    return this.monthlyPayment / 0.3;
  }

  get payoffDate(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + this.loanMonths);
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  }

  get currencySymbol(): string {
    if (this.currency === 'BRL') return 'R$';
    if (this.currency === 'USD') return '$';
    return '€';
  }

  formatMoney(value: number): string {
    const locale = this.currency === 'BRL' ? 'pt-BR' : 'en-US';
    return `${this.currencySymbol}${new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)}`;
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    if (typeof document === 'undefined') return;
    const element = document.getElementById(sectionId);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
