import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UrlService } from '../../services/url.service';
import { Url } from '../../models/url.model';

@Component({
  selector: 'app-urls-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './urls-list.component.html',
  styleUrls: ['./urls-list.component.css']
})
export class UrlsListComponent implements OnInit {
  urls: Url[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private urlService: UrlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUrls();
  }

  loadUrls(): void {
    this.loading = true;
    this.error = '';

    this.urlService.getAllUrls().subscribe({
      next: (urls) => {
        this.urls = urls;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load URLs';
        this.loading = false;
      }
    });
  }

  deleteUrl(shortCode: string): void {
    if (!confirm('Are you sure you want to delete this URL?')) {
      return;
    }

    this.urlService.deleteUrl(shortCode).subscribe({
      next: () => {
        // Remove from local array
        this.urls = this.urls.filter(url => url.shortCode !== shortCode);
        alert('URL deleted successfully!');
      },
      error: (err) => {
        alert('Failed to delete URL: ' + (err.message || 'Unknown error'));
      }
    });
  }

  updateShortCode(originalUrl: string): void {
    if (!confirm('This will generate a new short code for this URL. Continue?')) {
      return;
    }

    this.urlService.updateShortCode(originalUrl).subscribe({
      next: (response) => {
        if (response.data) {
          // Update the URL in the list
          const index = this.urls.findIndex(url => url.originalUrl === originalUrl);
          if (index !== -1) {
            this.urls[index] = response.data;
          }
          alert('Short code updated successfully!');
        }
      },
      error: (err) => {
        alert('Failed to update short code: ' + (err.message || 'Unknown error'));
      }
    });
  }

  getUrlByShortCode(shortCode: string): void {
    this.urlService.getUrlByShortCode(shortCode).subscribe({
      next: (url) => {
        alert(`Original URL: ${url.originalUrl}\nShort Code: ${url.shortCode}\nAccess Count: ${url.accessCount}`);
      },
      error: (err) => {
        alert('Failed to get URL: ' + (err.message || 'Unknown error'));
      }
    });
  }

  getShortUrl(shortCode: string): string {
    const origin = window.location.origin;
    return `${origin}/${shortCode}`;
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}

