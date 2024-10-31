import { Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentLanguage: string;

  constructor(private translocoService: TranslocoService) {
    this.currentLanguage = this.translocoService.getActiveLang() === 'es' ? 'ESP' : 'ENG';
  }

  toggleLanguage(): void {
    if (this.currentLanguage === 'ESP') {
      this.translocoService.setActiveLang('en');
      this.currentLanguage = 'ENG';
    } else {
      this.translocoService.setActiveLang('es');
      this.currentLanguage = 'ESP';
    }
  }

  darkModeService: DarkModeService = inject(DarkModeService);

  toggleDarkMode(){
    this.darkModeService.updateDarkMode();
  }

  toggleSearch(): void {
    const searchInput = document.getElementById('search-input');
    const registerButton = document.getElementById('btn-register');
    const loginButton = document.getElementById('btn-login');

    if (searchInput && registerButton && loginButton ) {
      if (searchInput.classList.contains('hidden')) {
        searchInput.classList.remove('hidden');
        searchInput.classList.add('visible');
        registerButton.classList.add('hidden');
        loginButton.classList.add('hidden');
      } else {
        searchInput.classList.remove('visible');
        searchInput.classList.add('hidden');
        registerButton.classList.remove('hidden');
        loginButton.classList.remove('hidden');
      }
    }
  }

  toggleDropdown(): void {
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
      dropdown.classList.toggle('visible');
    }
  }

openModal(): void {
    const modal = document.getElementById('menu-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('visible');
    }
  }

  closeModal(): void {
    const modal = document.getElementById('menu-modal');
    const searchInModal = document.getElementById('modal-search');
    const menuOptions = document.getElementById('menu-options');

    if (modal) {
      modal.classList.remove('visible');
      modal.classList.add('hidden');
    }

    if (searchInModal && menuOptions) {
      searchInModal.classList.add('hidden');
      menuOptions.classList.remove('hidden');
    }
  }

  showSearchInModal(): void {
    const searchInModal = document.getElementById('modal-search');
    const menuOptions = document.getElementById('menu-options');

    if (searchInModal && menuOptions) {
      menuOptions.classList.add('hidden');
      searchInModal.classList.remove('hidden');
    }
  }
}
