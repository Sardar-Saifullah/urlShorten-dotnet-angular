import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../services/url.service';
import { Url } from '../../models/url.model';

@Component({
  selector: 'app-url-shortener',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './url-shortener.component.html',
  styleUrls: ['./url-shortener.component.css']
})
export class UrlShortenerComponent {
  originalUrl: string = '';
  shortUrl: Url | null = null;
  error: string = '';
  loading: boolean = false;

  constructor(private urlService: UrlService) { }

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
      // You could show a toast notification here
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  getShortUrl(): string {
    if (this.shortUrl) {
      // Get current origin (e.g., http://localhost:4200)
      const origin = window.location.origin;
      return `${origin}/${this.shortUrl.shortCode}`;
    }
    return '';
  }
}

