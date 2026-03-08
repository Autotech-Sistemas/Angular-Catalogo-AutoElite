import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';

interface VehicleCard {
  modelSrc: string;
  imageSrc: string;
  model: string;
  year: string;
  trim: string;
  heroBg: string;
  price: string;
  efficiency: string;
  cityHwy: string;
  engine: string;
  horsepower: string;
  orbit: string;
}

@Component({
  selector: 'app-showroom3d',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './showroom3d.html',
  styleUrl: './showroom3d.css',
})
export class Showroom3d implements AfterViewInit {
  @ViewChild('stockTrack') stockTrack?: ElementRef<HTMLDivElement>;

  active3DIndex: number | null = null;
  activeIndex = 0;

  cards: VehicleCard[] = [
    {
      modelSrc: '3d/JeepCompass.glb',
      imageSrc: 'carroceria/suv.jpg',
      model: 'FIAT 500',
      year: '2020',
      trim: 'Pop',
      heroBg: 'linear-gradient(135deg, var(--theme-text) 0%, var(--theme-accent) 100%)',
      price: 'R$ 122.495',
      efficiency: '8.5/7.1',
      cityHwy: '(city/hwy)',
      engine: '1.4L MultiAir\n16V I-4 Turbo',
      horsepower: '135 hp*',
      orbit: '90deg 75deg 105%',
    },
    {
      modelSrc: '3d/ToyotaCorolla.glb',
      imageSrc: 'carroceria/sedan.jpg',
      model: 'FIAT 500',
      year: '2020',
      trim: 'Lounge',
      heroBg: 'linear-gradient(135deg, var(--theme-text) 0%, var(--theme-accent-strong) 100%)',
      price: 'R$ 122.495',
      efficiency: '8.5/7.1',
      cityHwy: '(city/hwy)',
      engine: '1.4L MultiAir\n16V I-4 Turbo',
      horsepower: '135 hp*',
      orbit: '90deg 75deg 105%',
    },
    {
      modelSrc: '3d/VolkswagenPolo.glb',
      imageSrc: 'carroceria/hatch.webp',
      model: 'FIAT 500',
      year: '2020',
      trim: 'Abarth',
      heroBg: 'linear-gradient(135deg, var(--theme-text) 0%, var(--theme-accent) 100%)',
      price: 'R$ 122.495',
      efficiency: '8.5/7.1',
      cityHwy: '(city/hwy)',
      engine: '1.4L MultiAir\n16V I-4 Turbo',
      horsepower: '135 hp*',
      orbit: '270deg 75deg 105%',
    },
    {
      modelSrc: '3d/JeepCompass.glb',
      imageSrc: 'carroceria/picape.jpg',
      model: 'FIAT 500',
      year: '2020',
      trim: 'Sport',
      heroBg: 'linear-gradient(135deg, var(--theme-text) 0%, var(--theme-accent-strong) 100%)',
      price: 'R$ 122.495',
      efficiency: '8.5/7.1',
      cityHwy: '(city/hwy)',
      engine: '1.4L MultiAir\n16V I-4 Turbo',
      horsepower: '135 hp*',
      orbit: '60deg 75deg 105%',
    },
  ];

  ngAfterViewInit(): void {
    this.updateActiveFromScroll();
  }

  open3D(index: number): void {
    this.active3DIndex = index;
  }

  close3D(): void {
    this.active3DIndex = null;
  }

  is3DOpen(index: number): boolean {
    return this.active3DIndex === index;
  }

  scroll(direction: 'left' | 'right'): void {
    const track = this.stockTrack?.nativeElement;
    if (!track) return;

    const amount = Math.max(280, Math.round(track.clientWidth * 0.9));
    track.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }

  goTo(index: number): void {
    const track = this.stockTrack?.nativeElement;
    if (!track) return;

    const card = track.children.item(index) as HTMLElement | null;
    if (!card) return;

    track.scrollTo({
      left: card.offsetLeft,
      behavior: 'smooth',
    });
    this.activeIndex = index;
  }

  onTrackScroll(): void {
    this.updateActiveFromScroll();
  }

  private updateActiveFromScroll(): void {
    const track = this.stockTrack?.nativeElement;
    if (!track) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((child, i) => {
      const element = child as HTMLElement;
      const childCenter = element.offsetLeft + element.clientWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    this.activeIndex = closestIndex;
  }
}
