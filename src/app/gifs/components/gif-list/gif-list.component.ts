import { Component, input } from '@angular/core';
import { GifsListItemComponent } from "./gifs-list-item/gifs-list-item.component";
import { GifsListItem } from '../../interfaces/gifs-list-item';

@Component({
  selector: 'app-gif-list',
  imports: [GifsListItemComponent],
  templateUrl: './gif-list.component.html',
  styleUrl: './gif-list.component.css'
})
export class GifListComponent {

  images = input<GifsListItem[]>();
}
