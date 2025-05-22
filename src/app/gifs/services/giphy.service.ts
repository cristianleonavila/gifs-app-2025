import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Query, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy';
import { GifsListItem } from '../interfaces/gifs-list-item';
import { GifListItemMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  searchHistory = signal<Record<string, GifsListItem[]>>({});

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  /**
   *
   */
  private http = inject(HttpClient);

  /**
   *
   */
  trendingGifs = signal<GifsListItem[]>([]);

  /**
   *
   */
  trendingGifsIsLoading = signal<boolean>(true);

  /**
   *
   */
  giphySearchResults = signal<GifsListItem[]>([]);

  /**
   *
   */
  giphySearchResultsIsLoading = signal<boolean>(true);

  /**
   *
   */
  constructor() {
    this.loadTrendingGifs();
  }

  /**
   *
   */
  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.endPoint}/trending/`, {
      params: {
        api_key: environment.apiKey,
        limit: 20
      }
    }).subscribe( (response) => {
      const gifs = GifListItemMapper.toGifListItemArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsIsLoading.set(false);
    });
  }

  search(q:string) {
    if ( !q ) {
      this.giphySearchResults.set([]);
      return;
    }
    this.http.get<GiphyResponse>(`${environment.endPoint}/search/`, {
      params: {
        api_key: environment.apiKey,
        limit: 20,
        offset:0,
        rating: 'g',
        q
      }
    }).subscribe( ({data}) => {
      const gifs = GifListItemMapper.toGifListItemArray(data);
      this.giphySearchResults.set(gifs);
      this.giphySearchResultsIsLoading.set(false);
      this.searchHistory.update(history => ({
        ...history,
        [q.toLowerCase()]: gifs
      }));
    });
  }
}
