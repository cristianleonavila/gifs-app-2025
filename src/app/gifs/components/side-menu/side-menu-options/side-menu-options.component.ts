import { Component, inject } from '@angular/core';
import { MenuOption } from '../menu-option';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GiphyService } from 'src/app/gifs/services/giphy.service';

@Component({
  selector: 'app-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  styleUrl: './side-menu-options.component.css'
})
export class SideMenuOptionsComponent {

  gifService = inject(GiphyService);

  public options:MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar...',
      route: '/dashboard/search'
    }
  ];
}
