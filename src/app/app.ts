import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./shared/components/footer/footer";
import { WhatsappButton } from "./shared/components/whatsapp-button/whatsapp-button";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, WhatsappButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('concessionaria');
}
