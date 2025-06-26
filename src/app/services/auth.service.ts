import { Injectable,inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  user = signal<any>(null);
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private backendUrl = 'http://localhost:3000/api/github'; // Backend URL

  // Call the /login endpoint
  login(): void {
    window.location.href = `${this.backendUrl}/login`; // Redirect to the login endpoint
  }
  // Fetch user data after login
  getUserData(code: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/callback?code=${code}`);
  }
  setUserFromToken(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      this.user.set(decoded);
    
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }
  loadUserFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.setUserFromToken(token);
      }
  
    }
  }

    // Fetch Orgs data 
  getOrgsData(accessToken: string): Observable<any> {
    console.log('Fetching Orgs data with access token:', accessToken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
      return this.http.get(`${this.backendUrl}/getOrgsData`, { headers });
    }

  clearSession(id: string): Observable<any> {
   console.log('Clearing session for user ID:', id);
   if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('authToken');
   }
   this.loadUserFromStorage();
   return this.http.get(`${this.backendUrl}/removeData?id=${id}`);
  }
}
