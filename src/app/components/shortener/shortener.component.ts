import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-shortener',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent {
  longUrl: string = '';
  shortenedUrl: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isCopied: boolean = false;

  constructor(private statsService: StatsService) {}

  async generateShortUrl(): Promise<void> {
    const targetUrl = this.longUrl.trim();
    if (!targetUrl) return;

    // Validar que sea una URL válida antes de enviar al backend
    try {
      new URL(targetUrl);
    } catch {
      this.errorMessage = 'Por favor ingresa una URL válida (debe incluir https://).';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.shortenedUrl = null;
    this.isCopied = false;

    try {
      const response = await this.statsService.createShortUrl(targetUrl);
      const code = response.shortCode || response.code;

      if (code) {
        this.shortenedUrl = this.statsService.ShortUrl(code);
        this.longUrl = '';
      } else {
        this.errorMessage = 'La respuesta del servidor no contiene un código válido.';
      }
    } catch (error: any) {
      this.errorMessage = 'No se pudo generar el enlace corto. Inténtalo de nuevo.';
    } finally {
      this.isLoading = false;
    }
  }

  copyToClipboard(): void {
    if (!this.shortenedUrl) return;

    navigator.clipboard.writeText(this.shortenedUrl).then(() => {
      this.isCopied = true;
      setTimeout(() => this.isCopied = false, 2000);
    }).catch(() => {
      this.errorMessage = 'No se pudo copiar automáticamente al portapapeles.';
    });
  }
}
