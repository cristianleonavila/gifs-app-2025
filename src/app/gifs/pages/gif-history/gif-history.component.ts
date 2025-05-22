import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GiphyService } from '../../services/giphy.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
  styleUrl: './gif-history.component.css'
})
export default class GifHistoryComponent {

  // Se puede obtener los parámetros URL con un observable
  //query = inject(ActivatedRoute).params.subscribe(console.log);

  gifService = inject(GiphyService);

  images = computed(() => {
    const record = this.gifService.searchHistory();
    return record[this.query()];
  });

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( params => params['query'] )
    )
  );
}
