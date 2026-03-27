import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface UploadedImage {
  file: File;
  preview: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  uploadedFiles: UploadedImage[] = [];
  zoomedImage: string | null = null;

  readonly slots = [0, 1, 2, 3];
  readonly interestOptions = [
    { value: 'comprar', label: 'Comprar' },
    { value: 'financiamento', label: 'Financiamento' },
    { value: 'troca', label: 'Troca' },
    { value: 'vender', label: 'Vender usado' },
  ];
  readonly budgetOptions = ['Ate R$ 80 mil', 'R$ 80 mil a R$ 130 mil', 'R$ 130 mil a R$ 200 mil', 'Acima de R$ 200 mil'];
  readonly paymentOptions = ['A vista', 'Financiamento', 'Entrada + financiamento', 'Consorcio'];
  readonly timeframeOptions = ['Imediato', 'Em ate 30 dias', 'Em 2-3 meses', 'Apenas pesquisa'];
  readonly preferredContactOptions = ['WhatsApp', 'Ligacao', 'E-mail'];

  isGeneratingAI = false;
  isSubmitted = false;
  submittedData: any = null;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      interest: ['', Validators.required],
      vehicleModel: ['', [Validators.required, Validators.minLength(2)]],
      budgetRange: ['', Validators.required],
      paymentPlan: ['', Validators.required],
      timeframe: ['', Validators.required],
      preferredContact: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(12)]],
      consent: [false, Validators.requiredTrue],
    });
  }

  get isSelling(): boolean {
    return this.contactForm.get('interest')?.value === 'vender';
  }

  get selectedInterest(): string {
    return this.contactForm.get('interest')?.value ?? '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors || !(field.dirty || field.touched)) return '';

    if (field.errors['required']) return 'Campo obrigatorio.';
    if (field.errors['requiredTrue']) return 'Voce precisa aceitar para continuar.';
    if (field.errors['email']) return 'Informe um e-mail valido.';
    if (field.errors['minlength']) {
      const min = field.errors['minlength'].requiredLength;
      return `Minimo de ${min} caracteres.`;
    }
    if (field.errors['pattern'] && fieldName === 'phone') {
      return 'Use o formato (11) 99999-9999.';
    }

    return 'Campo invalido.';
  }

  onPhoneInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d\d)(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 5) {
      value = value.replace(/^(\d\d)(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
    } else {
      value = value.replace(/^(\d*)/, '($1');
    }

    this.contactForm.get('phone')?.setValue(value, { emitEvent: false });
  }

  improveWithAI() {
    const currentText = this.contactForm.get('message')?.value || '';
    const model = this.contactForm.get('vehicleModel')?.value || 'um veiculo do estoque';
    const budget = this.contactForm.get('budgetRange')?.value || 'meu perfil';
    this.isGeneratingAI = true;

    setTimeout(() => {
      let polishedText = '';
      if (currentText.length < 5) {
        polishedText = `Ola, tenho interesse em ${model} com orcamento na faixa ${budget}. Quero uma proposta com melhores condicoes de pagamento.`;
      } else {
        polishedText = `Ola! ${currentText}. Meu foco e ${model}, dentro da faixa ${budget}. Gostaria de proposta detalhada e disponibilidade para visita.`;
      }

      this.contactForm.patchValue({ message: polishedText });
      this.isGeneratingAI = false;
      this.cdr.detectChanges();
    }, 900);
  }

  setInterest(value: string) {
    this.contactForm.get('interest')?.setValue(value);
    this.contactForm.get('interest')?.markAsTouched();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    if (this.uploadedFiles.length >= 4) {
      alert('Maximo de 4 imagens atingido.');
      input.value = '';
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.uploadedFiles = [
        ...this.uploadedFiles,
        {
          file,
          preview: e.target.result,
        },
      ];
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
    input.value = '';
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  openZoom(imageUrl: string) {
    this.zoomedImage = imageUrl;
    document.body.style.overflow = 'hidden';
  }

  closeZoom() {
    this.zoomedImage = null;
    document.body.style.overflow = 'auto';
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submittedData = this.contactForm.value;
    this.isSubmitted = true;

    const formElement = document.querySelector('form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  resetForm() {
    this.isSubmitted = false;
    this.submittedData = null;
    this.uploadedFiles = [];
    this.contactForm.reset({ consent: false, interest: '' });
  }
}
