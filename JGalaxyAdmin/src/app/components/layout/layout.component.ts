import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router,  RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserModel } from 'src/app/api/user/userModel';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.less'
})
export class LayoutComponent{
  isSettingOpen = false;
  router = inject(Router);
  userInfo: UserModel = {
    id: '',
    email: '',
    name: '',
    phoneNumber: '',
    role: ''
  };
  constructor(
    
  ) {}

  onLogOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('userInfo');
    this.router.navigateByUrl('login');
  }

  toggleSettings(event: Event) {
    event.stopPropagation();
    this.isSettingOpen = !this.isSettingOpen;
    const user = localStorage.getItem('userInfo')
    this.userInfo = user ? JSON.parse(user) : null;
  }

  @HostListener('document:click', ['$event'])
  closeSettings(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user')) {
      this.isSettingOpen = false;
    }
  }
}
