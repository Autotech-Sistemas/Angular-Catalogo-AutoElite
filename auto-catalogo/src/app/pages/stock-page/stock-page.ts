import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Funnel,
  X,
  Car,
  Box,
  Rotate3d,
  Gauge,
  Fuel,
  ArrowRight,
  Search,
  User,
  Menu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-angular';

interface Car {
  id: number;
  model: string;
  brand: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  color: string;
  images: string[];
  currentImageIndex: number;
  imageLoadError?: boolean;
  badge?: string;
}

@Component({
  selector: 'app-stock-page',
  imports: [CommonModule, FormsModule, LucideAngularModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './stock-page.html',
  styleUrl: './stock-page.css',
})
export class StockPage {
  readonly icons = {
    Funnel,
    X,
    Car,
    Box,
    Rotate3d,
    Gauge,
    Fuel,
    ArrowRight,
    Search,
    User,
    Menu,
    ChevronLeft,
    ChevronRight,
  };

  // --- ESTADO DO HEADER ---
  isScrolled = false;
  isMobileMenuOpen = false;

  menuItems = [
    { id: 'highlight', label: 'Início', icon: 'home' },
    { id: 'financiamento', label: 'Financiamento', icon: 'dollar' },
    { id: 'contato', label: 'Contato', icon: 'car' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(event: Event, id: string) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  // ------------------------

  // Estado da Paginação
  currentPage = 1;
  itemsPerPage = 6;

  // Estado dos Filtros
  filters = {
    brands: {} as Record<string, boolean>,
    bodyTypes: {} as Record<string, boolean>,
    colors: {} as Record<string, boolean>,
    price: { min: null as number | null, max: null as number | null },
    year: { min: null as number | null, max: null as number | null },
    mileage: { min: null as number | null, max: null as number | null },
  };

  cars: Car[] = [
    // Mock Data
    {
      id: 1,
      brand: 'BMW',
      model: 'X1 sDrive20i GP',
      year: 2024,
      price: 289900,
      mileage: 12500,
      fuel: 'Flex',
      transmission: 'Aut.',
      bodyType: 'SUV',
      color: 'Branco',
      images: ['carro-frente.png'],
      currentImageIndex: 0,
      badge: 'Novidade',
    },
    {
      id: 2,
      brand: 'Toyota',
      model: 'Corolla Cross XRX',
      year: 2023,
      price: 195000,
      mileage: 28000,
      fuel: 'Híbrido',
      transmission: 'CVT',
      bodyType: 'SUV',
      color: 'Prata',
      images: ['carro-frente.png'],
      currentImageIndex: 0,
      badge: 'Oferta',
    },
    {
      id: 3,
      brand: 'Jeep',
      model: 'Compass Longitude',
      year: 2022,
      price: 148900,
      mileage: 45000,
      fuel: 'Flex',
      transmission: 'Aut.',
      bodyType: 'SUV',
      color: 'Preto',
      images: ['carro-frente.png'],
      currentImageIndex: 0,
    },
    {
      id: 4,
      brand: 'Porsche',
      model: 'Macan 2.0 Turbo',
      year: 2021,
      price: 459000,
      mileage: 32000,
      fuel: 'Gasolina',
      transmission: 'PDK',
      bodyType: 'SUV',
      color: 'Cinza',
      images: ['carro-frente.png'],
      currentImageIndex: 0,
      badge: 'Blindado',
    },
    {
      id: 5,
      brand: 'Honda',
      model: 'Civic Touring',
      year: 2021,
      price: 165000,
      mileage: 38000,
      fuel: 'Gasolina',
      transmission: 'CVT',
      bodyType: 'Sedan',
      color: 'Branco',
      images: ['carro-frente.png'],
      currentImageIndex: 0,
    },
    {
      id: 6,
      brand: 'Ram',
      model: '1500 Rebel V8',
      year: 2023,
      price: 429900,
      mileage: 15000,
      fuel: 'Gasolina',
      transmission: 'Aut.',
      bodyType: 'Picape',
      color: 'Vermelho',
      images: ['carro-frente.png'],
      currentImageIndex: 0,
      badge: 'Impecável',
    },
    {
      id: 7,
      brand: 'Audi',
      model: 'Q3 Black',
      year: 2023,
      price: 265000,
      mileage: 18000,
      fuel: 'Gasolina',
      transmission: 'S-tronic',
      bodyType: 'SUV',
      color: 'Cinza',
      images: ['carro-frente.png'],
      currentImageIndex: 0,
    },
    {
      id: 8,
      brand: 'Mercedes',
      model: 'C180 AMG Line',
      year: 2022,
      price: 295000,
      mileage: 22000,
      fuel: 'Gasolina',
      transmission: 'Aut.',
      bodyType: 'Sedan',
      color: 'Preto',
      images: ['carro-frente.png'],
      currentImageIndex: 0,
    },
  ];

  onMouseMove(event: MouseEvent, car: Car) {
    if (!car.images || car.images.length <= 1) return;
    const container = event.target as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const index = Math.floor(percentage * car.images.length);
    const prevIndex = car.currentImageIndex;
    car.currentImageIndex = Math.min(index, car.images.length - 1);
    if (prevIndex !== car.currentImageIndex) car.imageLoadError = false;
  }

  resetImage(car: Car) {
    car.currentImageIndex = 0;
    car.imageLoadError = false;
  }

  // Acionado quando checkboxes mudam
  toggleFilter(category: 'brands' | 'bodyTypes' | 'colors', value: string) {
    if (this.filters[category][value] === undefined) {
      this.filters[category][value] = false;
    }
    this.filters[category][value] = !this.filters[category][value];
    this.onFilterChange(); // Reseta página
  }

  // Acionado quando inputs de range mudam
  onFilterChange() {
    this.currentPage = 1;
  }

  // Getters para extrair opções únicas
  get uniqueBrands(): string[] {
    return [...new Set(this.cars.map((car) => car.brand))].sort();
  }
  get uniqueBodyTypes(): string[] {
    return [...new Set(this.cars.map((car) => car.bodyType))].sort();
  }
  get uniqueColors(): string[] {
    return [...new Set(this.cars.map((car) => car.color))].sort();
  }

  // 1. Filtra todos os carros
  get filteredCars(): Car[] {
    return this.cars.filter((car) => {
      const selectedBrands = Object.keys(this.filters.brands).filter(
        (key) => this.filters.brands[key],
      );
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);

      const selectedBodyTypes = Object.keys(this.filters.bodyTypes).filter(
        (key) => this.filters.bodyTypes[key],
      );
      const matchBody = selectedBodyTypes.length === 0 || selectedBodyTypes.includes(car.bodyType);

      const selectedColors = Object.keys(this.filters.colors).filter(
        (key) => this.filters.colors[key],
      );
      const matchColor = selectedColors.length === 0 || selectedColors.includes(car.color);

      const minPrice = this.filters.price.min ?? 0;
      const maxPrice = this.filters.price.max ?? Infinity;
      const matchPrice = car.price >= minPrice && car.price <= maxPrice;

      const minYear = this.filters.year.min ?? 0;
      const maxYear = this.filters.year.max ?? Infinity;
      const matchYear = car.year >= minYear && car.year <= maxYear;

      const minMileage = this.filters.mileage.min ?? 0;
      const maxMileage = this.filters.mileage.max ?? Infinity;
      const matchMileage = car.mileage >= minMileage && car.mileage <= maxMileage;

      return matchBrand && matchBody && matchColor && matchPrice && matchMileage && matchYear;
    });
  }

  // 2. Pagina os carros filtrados
  get paginatedCars(): Car[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCars.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // 3. Calcula total de páginas
  get totalPages(): number {
    return Math.ceil(this.filteredCars.length / this.itemsPerPage);
  }

  // 4. Gera array de números de página para o template
  getPageNumbers(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Scroll suave para o topo da grade
      if (typeof document !== 'undefined') {
        const gridElement = document.getElementById('grid-top');
        if (gridElement) {
          const headerOffset = 100;
          const elementPosition = gridElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    }
  }

  resetFilters() {
    this.filters = {
      brands: {},
      bodyTypes: {},
      colors: {},
      price: { min: null, max: null },
      year: { min: null, max: null },
      mileage: { min: null, max: null },
    };
    this.currentPage = 1;
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}