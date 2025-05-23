import { loadFromLocalStorate } from './../../utils';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, Query, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy';
import { GifsListItem } from '../interfaces/gifs-list-item';
import { GifListItemMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  searchHistory = signal<Record<string, GifsListItem[]>>(loadFromLocalStorate('gifs'));

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  /**
   *
   */
  private http = inject(HttpClient);

  private pageSize = 1;

  /**
   *
   */
  trendingGifs = signal<GifsListItem[]>([]);

  trendingGifsGroup = computed<GifsListItem[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  });

  /**
   *
   */
  trendingGifsIsLoading = signal<boolean>(false);

  private offset = signal<number>(0);

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

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });

  /**
   *
   */
  loadTrendingGifs() {
    if ( this.trendingGifsIsLoading() ) return;

    this.trendingGifsIsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.endPoint}/trending/`, {
      params: {
        api_key: environment.apiKey,
        limit: 20,
        offset: this.offset() * 20
      }
    }).subscribe( (response) => {
      const gifs = GifListItemMapper.toGifListItemArray(response.data);
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
      this.trendingGifsIsLoading.set(false);
      this.offset.update(currentOffset => currentOffset += 1);
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
