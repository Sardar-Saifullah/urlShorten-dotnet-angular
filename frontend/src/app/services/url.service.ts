import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Url, CreateUrlRequest, ApiResponse } from '../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = `${environment.apiUrl}/url`;

  constructor(private http: HttpClient) { }

  // Create a short URL
  createShortUrl(originalUrl: string): Observable<ApiResponse<Url>> {
    const request: CreateUrlRequest = { url: originalUrl };
    return this.http.post<ApiResponse<Url>>(`${this.apiUrl}/shorten`, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get URL by short code
  getUrlByShortCode(shortCode: string): Observable<Url> {
    return this.http.get<Url>(`${this.apiUrl}/${shortCode}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Redirect and increment access count
  redirectToUrl(shortCode: string): Observable<ApiResponse<Url>> {
    return this.http.get<ApiResponse<Url>>(`${this.apiUrl}/${shortCode}/redirect`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update short code for an original URL
  updateShortCode(originalUrl: string): Observable<ApiResponse<Url>> {
    // URL encode the original URL for the route parameter
    const encodedUrl = encodeURIComponent(originalUrl);
    return this.http.put<ApiResponse<Url>>(`${this.apiUrl}/update-shortcode/${encodedUrl}`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete URL by short code
  deleteUrl(shortCode: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${shortCode}`, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all URLs
  getAllUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(`${this.apiUrl}/getall`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.error || error.message || errorMessage;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

