import { Component, computed, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GiphyService } from '../../services/giphy.service';


@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export default class SearchPageComponent {

  giphyService = inject(GiphyService);

  images = computed(() => this.giphyService.giphySearchResults());

  onSearch( query: string ) {
    this.giphyService.search(query);
  }}
