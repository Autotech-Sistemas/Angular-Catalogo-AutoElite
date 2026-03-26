import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  theme: 'light' | 'dark' = 'light';

  menuItems = [
    { label: 'Inicio', id: 'highlight', icon: 'home' },
    { label: 'Categorias', id: 'categories', icon: 'grid' },
    { label: 'Estoque', id: 'showroom', icon: 'car' },
    { label: 'Financiamento', id: 'financing', icon: 'dollar' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('site-theme');
    this.theme = stored === 'dark' ? 'dark' : 'light';
    this.applyTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('site-theme', this.theme);
    }
    this.applyTheme();
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.isMobileMenuOpen = false;
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    this.isMobileMenuOpen = false;

    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }

  private applyTheme() {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', this.theme);
  }
}
