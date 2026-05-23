import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-redirection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './redirection.component.html'
})
export class RedirectionComponent implements OnInit, OnDestroy {
  shortCode: string = '';
  countdown: number = 5;
  isLoading: boolean = true;
  hasError: boolean = false;
  destinationUrl: string = '';
  private timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    this.shortCode = this.route.snapshot.paramMap.get('codigo') || '';
    this.processVerification();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  async processVerification(): Promise<void> {
    if (!this.shortCode) {
      this.isLoading = false;
      this.hasError = true;
      return;
    }

    try {
      const data = await this.statsService.getStatsByCode(this.shortCode);

      if (!data || !data.longUrl) {
        throw new Error('Código no encontrado en la base de datos');
      }

      this.destinationUrl = data.longUrl;
      this.isLoading = false;

      // Contador regresivo de 5 segundos antes de redirigir
      this.timerInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.timerInterval);
          // Redirige al API Gateway del Módulo 2 que hace el 302 a la URL final
          window.location.href = `${this.statsService.getApiUrl()}/${this.shortCode}`;
        }
      }, 1000);

    } catch (error) {
      this.isLoading = false;
      this.hasError = true;
    }
  }
}
