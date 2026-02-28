import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'URL Shortener';
  showHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set initial header state
    this.updateHeaderVisibility(this.router.url);

    // Hide header on redirect pages (short code routes)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      this.updateHeaderVisibility(url);
    });
  }

  private updateHeaderVisibility(url: string): void {
    // Show header for home and urls pages, hide for short code redirects
    this.showHeader = url === '/' || url === '/urls' || url.startsWith('/urls');
  }
}
