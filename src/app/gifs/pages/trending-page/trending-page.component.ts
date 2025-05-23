import { AfterViewInit, Component, computed, ElementRef, inject, linkedSignal, signal, viewChild } from '@angular/core';
import { GiphyService } from '../../services/giphy.service';
import { ScrollStateService } from '../../shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css'
})
export default class TrendingPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const scrollDiv = this.gifsContainer()?.nativeElement;
    if ( !scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateSrv.scrollState['trending-gifs'];
  }

  gifService = inject(GiphyService);

  scrollStateSrv = inject(ScrollStateService);

  images = computed(() => this.gifService.trendingGifs());

  gifsContainer = viewChild<ElementRef<HTMLDivElement>>('gifsContainer');

  onScroll(event:Event) {
    const scrollDiv = this.gifsContainer()?.nativeElement;
    if ( !scrollDiv ) return;
    this.scrollStateSrv.scrollState['trending-gifs'] = scrollDiv.scrollTop;
    const scrollTop = this.scrollStateSrv.scrollState['trending-gifs'],
          clientHeight = scrollDiv.clientHeight,
          scrollHeight = scrollDiv.scrollHeight,
          scrollTotal = scrollTop + clientHeight + 300,
          isAtBottom = scrollTotal >= scrollHeight;
    if ( isAtBottom ) {
      this.gifService.loadTrendingGifs();
    }
  }


}
