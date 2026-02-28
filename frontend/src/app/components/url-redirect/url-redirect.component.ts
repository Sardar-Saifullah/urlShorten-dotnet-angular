import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-url-redirect',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="redirect-container">
      <div *ngIf="loading" class="spinner"></div>
      <div *ngIf="error" class="alert alert-error">
        <h2>URL Not Found</h2>
        <p>{{ error }}</p>
        <button class="btn btn-primary" (click)="goHome()">Go to Home</button>
      </div>
      <div *ngIf="redirecting" class="redirect-message">
        <h2>Redirecting...</h2>
        <p>Taking you to: {{ originalUrl }}</p>
      </div>
    </div>
  `,
  styles: [`
    .redirect-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    .redirect-message {
      text-align: center;
      color: white;
    }
    .redirect-message h2 {
      font-size: 32px;
      margin-bottom: 10px;
    }
  `]
})
export class UrlRedirectComponent implements OnInit {
  shortCode: string = '';
  loading: boolean = true;
  error: string = '';
  redirecting: boolean = false;
  originalUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.shortCode = params['shortCode'];
      if (this.shortCode) {
        this.handleRedirect();
      } else {
        this.error = 'Invalid short code';
        this.loading = false;
      }
    });
  }

  handleRedirect(): void {
    this.urlService.redirectToUrl(this.shortCode).subscribe({
      next: (response) => {
        if (response.data) {
          this.originalUrl = response.data.originalUrl;
          this.redirecting = true;
          this.loading = false;
          
          // Redirect after a short delay
          setTimeout(() => {
            window.location.href = this.originalUrl;
          }, 1500);
        } else {
          this.error = response.error || 'URL not found';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = err.message || 'Failed to redirect';
        this.loading = false;
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}

