import { Component, AfterViewInit, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import { Meta, Title } from '@angular/platform-browser';

import { Hero } from '../../shared/components/hero/hero';
import { Showroom3d } from '../../shared/components/showroom3d/showroom3d';
import { Categories } from '../../shared/components/categories/categories';
import { Services } from '../../shared/components/services/services';
import { Faq } from '../../shared/components/faq/faq';
import { Financing } from '../../shared/components/financing/financing';
import { LoanSimulator } from '../../shared/components/loan-simulator/loan-simulator';
import { Testimonials } from '../../shared/components/testimonials/testimonials';
import { Contact } from '../../shared/components/contact/contact';
import { Map } from '../../shared/components/map/map';

declare var lucide: any;

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    Hero,
    Showroom3d,
    Categories,
    Services,
    Faq,
    Financing,
    LoanSimulator,
    Testimonials,
    Contact,
    Map,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  isScrolled = false;
  private scrollListener: any;

  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('AutoCatalogo | Concessionaria com Estoque 3D e Financiamento');
    this.meta.updateTag({
      name: 'description',
      content:
        'AutoCatalogo: estoque com visualizacao 3D, simulador de financiamento, depoimentos e atendimento especializado para compra, troca e venda.',
    });
    this.meta.updateTag({
      property: 'og:title',
      content: 'AutoCatalogo | Estoque 3D e Financiamento Automotivo',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Veja veiculos em 3D, simule financiamento e fale com especialistas para fechar seu proximo carro.',
    });
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      AOS.init({
        duration: 800,
        once: true,
        offset: 50,
      });

      this.scrollListener = () => {
        const scrolled = window.scrollY > 50;
        if (this.isScrolled !== scrolled) {
          this.isScrolled = scrolled;
        }
      };
      window.addEventListener('scroll', this.scrollListener);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined' && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}
