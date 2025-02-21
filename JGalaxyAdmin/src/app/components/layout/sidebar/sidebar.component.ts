import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  animations: [
    trigger('submenuAnimation', [
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('open', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class SidebarComponent {
  isSidebarOpen = signal(true);
  activeMenuTitle: string | null = null;

  menuItems = [
    { title: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    {
      title: 'Products',
      icon: 'pi pi-apple',
      children: [
        { title: 'Categories', route: '/category' },
        { title: 'Products', route: '/product' },
      ],
    },
    {
      title: 'User',
      icon: 'pi pi-user',
      route: '/user',
    },
  ];

  toggleSidebar() {
    this.isSidebarOpen.update((state) => !state);
  }

  toggleSubmenu(title: string) {
    this.activeMenuTitle = this.activeMenuTitle === title ? null : title;
  }

  activeMenu(title: string): 'open' | 'closed' {
    return this.activeMenuTitle === title ? 'open' : 'closed';
  }
}
