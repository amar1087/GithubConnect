import { Component , OnInit, inject} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  imports: [MatToolbarModule , MatIconModule, MatFormFieldModule, MatSelectModule,MatInputModule, MatButtonModule, MatExpansionModule, NgIf, FormsModule, NgFor] // Import Material modules for UI components


})
export class HomePage implements OnInit{
  userData: any; 
  userName: string = '';
  userId: string = '';
  userLoggedIn: boolean = false; // Initialize userLoggedIn as false
  lastSynchedDate: Date | null = null; // Initialize lastSynchedDate as null
  accessToken: string = '';
  searchQuery: string = '';
 
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  selectedStatus = ''; // Default value

  statusList = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
  ];


  ngOnInit(): void {
    // Check if the code parameter exists in the URL
    const code = this.route.snapshot.queryParamMap.get('code');
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) this.authService.setUserFromToken(token);
    });

    const user = this.authService.user(); // call the signal
    if (user) {
      this.userLoggedIn = true;
      console.log('User loaded from token:', user);
      this.userName = user.login;
      this.userId = user.id;
      this.lastSynchedDate = user.updatedDate;
      this.accessToken = user.accessToken; // Assuming accessToken is part of the user object
      console.log('Access Token:', this.accessToken);
    }
}
  // Trigger login
  onLogin(): void {
    this.authService.login();
  }

  // Trigger full Import
  fullImportOrgsData(): void {
    console.log('Full Import triggered');
    this.authService.getOrgsData(this.accessToken).subscribe({
      next: (res) => {
        console.log(' Org data received:', res);
      },
      error: (err) => {
        console.error('Org data fetch failed:', err);
      }
    });
  }

  removeData(): void {
    console.log('Removing data for user:', this.userId);
    //this.userLoggedIn = false;
    this.authService.clearSession(this.userId).subscribe({
      next: (res) => {
        console.log('Session cleared successfully:', res);
        this.userLoggedIn = false;
      },
      error: (err) => {
        console.error('Failed to clear session:', err);
      }
    });
  }
}
