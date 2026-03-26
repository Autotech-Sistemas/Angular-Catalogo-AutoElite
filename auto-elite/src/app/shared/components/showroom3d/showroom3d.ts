import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

interface VehicleCard {
  brand: string;
  model: string;
  year: string;
  trim: string;
  price: string;
  heroBg: string;
  imageSrc: string;
}

@Component({
  selector: 'app-showroom3d',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './showroom3d.html',
  styleUrl: './showroom3d.css',
})
export class Showroom3d implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef?: ElementRef;

  cards: VehicleCard[] = [
    {
      brand: 'VOLKSWAGEN',
      model: 'Polo Highline',
      year: '2024',
      trim: 'TSI Turbo Flex',
      heroBg: 'linear-gradient(135deg, #001e50 0%, #004094 100%)',
      price: 'R$ 118.990',
      imageSrc: 'modelos/vw-polo.webp',
    },
    {
      brand: 'JEEP',
      model: 'Compass Limited',
      year: '2024',
      trim: 'T270 Turbo Flex',
      heroBg: 'linear-gradient(135deg, #1a1a1a 0%, #444 100%)',
      price: 'R$ 199.790',
      imageSrc: 'modelos/jeep-compass.webp',
    },
    {
      brand: 'TOYOTA',
      model: 'Corolla Altis',
      year: '2024',
      trim: 'Hybrid Flex',
      heroBg: 'linear-gradient(135deg, #2c3e50 0%, #7f8c8d 100%)',
      price: 'R$ 187.790',
      imageSrc: 'modelos/toyota-corolla.webp',
    },
    {
      brand: 'FIAT',
      model: 'Fastback Limited',
      year: '2024',
      trim: 'Turbo 270 Flex',
      heroBg: 'linear-gradient(135deg, #8b0000 0%, #3a0000 100%)',
      price: 'R$ 154.490',
      imageSrc: 'modelos/fiat-fastback.webp',
    },
    {
      brand: 'HYUNDAI',
      model: 'HB20 Platinum Plus',
      year: '2024',
      trim: '1.0 Turbo Flex',
      heroBg: 'linear-gradient(135deg, #002c5f 0%, #0056b3 100%)',
      price: 'R$ 120.390',
      imageSrc: 'modelos/hyundai-hb20.webp',
    },
    {
      brand: 'CHEVROLET',
      model: 'Onix Premier',
      year: '2024',
      trim: '1.0 Turbo Flex',
      heroBg: 'linear-gradient(135deg, #b8860b 0%, #556b2f 100%)',
      price: 'R$ 113.450',
      imageSrc: 'modelos/chevy-onix.webp',
    },
    {
      brand: 'HONDA',
      model: 'HR-V EXL',
      year: '2024',
      trim: '1.5 Honda SENSING',
      heroBg: 'linear-gradient(135deg, #5a5a5a 0%, #2a2a2a 100%)',
      price: 'R$ 160.990',
      imageSrc: 'modelos/honda-hrv.webp',
    },
    {
      brand: 'BYD',
      model: 'Dolphin GS',
      year: '2024',
      trim: '100% Elétrico',
      heroBg: 'linear-gradient(135deg, #0099cc 0%, #00ccff 100%)',
      price: 'R$ 149.800',
      imageSrc: 'modelos/byd-dolphin.webp',
    },
    {
      brand: 'GWM',
      model: 'Ora 03 Skin',
      year: '2024',
      trim: '100% Elétrico',
      heroBg: 'linear-gradient(135deg, #ff4d4d 0%, #ff9999 100%)',
      price: 'R$ 150.000',
      imageSrc: 'modelos/gwm-ora03.webp',
    },
    {
      brand: 'FORD',
      model: 'Ranger Limited',
      year: '2024',
      trim: '3.0 V6 Diesel 4x4',
      heroBg: 'linear-gradient(135deg, #002e5d 0%, #000000 100%)',
      price: 'R$ 319.990',
      imageSrc: 'modelos/ford-ranger.webp',
    },
    {
      brand: 'RENAULT',
      model: 'Kardian Premiere',
      year: '2024',
      trim: 'Turbo 200 EDC',
      heroBg: 'linear-gradient(135deg, #ff6600 0%, #333333 100%)',
      price: 'R$ 112.790',
      imageSrc: 'modelos/renault-kardian.webp',
    },
    {
      brand: 'CAOA CHERY',
      model: 'Tiggo 7 Pro',
      year: '2024',
      trim: 'Max Drive Hybrid',
      heroBg: 'linear-gradient(135deg, #4b4b4b 0%, #1a1a1a 100%)',
      price: 'R$ 169.990',
      imageSrc: 'modelos/chery-tiggo7.webp',
    },
    {
      brand: 'NISSAN',
      model: 'Sentra Exclusive',
      year: '2024',
      trim: '2.0 CVT Interior Premium',
      heroBg: 'linear-gradient(135deg, #c0c0c0 0%, #333333 100%)',
      price: 'R$ 174.990',
      imageSrc: 'modelos/nissan-sentra.webp',
    },
    {
      brand: 'RAM',
      model: 'Rampage Laramie',
      year: '2024',
      trim: '2.0 Turbo Diesel 4x4',
      heroBg: 'linear-gradient(135deg, #5d4037 0%, #212121 100%)',
      price: 'R$ 262.990',
      imageSrc: 'modelos/ram-rampage.webp',
    },
  ];

  ngAfterViewInit(): void {
    const swiperEl = this.swiperRef?.nativeElement;

    const params = {
      slidesPerView: 1.2,
      spaceBetween: 20,
      pagination: {
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.2 },
        1400: { slidesPerView: 4 },
      },
    };

    Object.assign(swiperEl, params);
    swiperEl.initialize();
  }

  swipePrev(): void {
    this.swiperRef?.nativeElement.swiper.slidePrev();
  }

  swipeNext(): void {
    this.swiperRef?.nativeElement.swiper.slideNext();
  }
}
