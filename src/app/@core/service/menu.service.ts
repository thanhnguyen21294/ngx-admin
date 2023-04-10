import { Injectable } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private menuItems: NbMenuItem[] = [
    { title: 'Profile', icon: 'person-outline', data: { id: 'profile' } },
    { title: 'Log out', icon: 'log-out-outline', data: { id: 'logout' } },
  ];

  private menuSubject = new Subject<NbMenuItem[]>();

  constructor(private nbMenuService: NbMenuService) { }

  getMenuItems() {
    return this.menuSubject.asObservable();
  }

  initMenu() {
    this.nbMenuService.addItems(this.menuItems, 'myMenu');
    this.nbMenuService.onItemClick().subscribe(event => {
      if (event.item.data.id === 'profile') {
        console.log("profile click")
      } else if (event.item.data.id === 'logout') {
        console.log("logout")
      }
    })
    this.menuSubject.next(this.menuItems);
  }

  addMenuItem(menuItem: NbMenuItem) {
    this.menuItems.push(menuItem);
    this.nbMenuService.addItems([menuItem], 'myMenu');
    this.menuSubject.next(this.menuItems);
  }
}
