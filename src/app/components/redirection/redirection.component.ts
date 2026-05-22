import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-redirection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.css']
})
export class RedirectionComponent implements OnInit, OnDestroy {
  shortCode: string = '';
  countdown: number = 5;
  isLoading: boolean = true;
  hasError: boolean = false;
  private timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    this.shortCode = this.route.snapshot.paramMap.get('codigo') || '';
    this.verifyAndRedirect();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  async verifyAndRedirect(): Promise<void> {
    this.isLoading = true;
    this.hasError = false;

    try {
      const data = await this.statsService.getStatsByCode(this.shortCode);
      this.isLoading = false;
      const destinationUrl = data.longUrl;

      if (!destinationUrl) {
        this.hasError = true;
        return;
      }

      this.timerInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.timerInterval);
          window.location.href = destinationUrl;
        }
      }, 1000);

    } catch (error) {
      this.isLoading = false;
      this.hasError = true;
    }
  }
}