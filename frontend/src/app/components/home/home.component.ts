import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../services/url.service';
import { Url } from '../../models/url.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  originalUrl: string = '';
  shortUrl: Url | null = null;
  error: string = '';
  loading: boolean = false;

  constructor(
    private urlService: UrlService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (!this.originalUrl.trim()) {
      this.error = 'Please enter a valid URL';
      return;
    }

    // Basic URL validation
    try {
      new URL(this.originalUrl);
    } catch {
      this.error = 'Please enter a valid URL (e.g., https://example.com)';
      return;
    }

    this.loading = true;
    this.error = '';
    this.shortUrl = null;

    this.urlService.createShortUrl(this.originalUrl).subscribe({
      next: (response) => {
        if (response.data) {
          this.shortUrl = response.data;
          this.originalUrl = '';
          // Optionally navigate to URLs list after creation
          // this.router.navigate(['/urls']);
        } else {
          this.error = response.error || 'Failed to create short URL';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to create short URL';
        this.loading = false;
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  getShortUrl(): string {
    if (this.shortUrl) {
      const origin = window.location.origin;
      return `${origin}/${this.shortUrl.shortCode}`;
    }
    return '';
  }

  viewAllUrls(): void {
    this.router.navigate(['/urls']);
  }
}

