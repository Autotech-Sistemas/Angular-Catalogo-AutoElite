import { Component } from '@angular/core';
import {
  LucideAngularModule,
  MessageCircle
} from 'lucide-angular';

@Component({
  selector: 'app-whatsapp-button',
  imports: [LucideAngularModule],
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.css',
})
export class WhatsappButton {
  readonly icons = {
    MessageCircle
  };
}
