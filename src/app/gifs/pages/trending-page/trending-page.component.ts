import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GiphyService } from '../../services/giphy.service';
import { GifsListItem } from '../../interfaces/gifs-list-item';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css'
})
export default class TrendingPageComponent {

  gifService = inject(GiphyService);

  images = computed(() => this.gifService.trendingGifs());
}
