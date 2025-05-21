import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy';
import { GifsListItem } from '../interfaces/gifs-list-item';
import { GifListItemMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private http = inject(HttpClient);

  trendingGifs = signal<GifsListItem[]>([]);
  trendingGifsIsLoading = signal<boolean>(true);

  constructor() {
    this.loadTrendingGifs();
  }

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
}
