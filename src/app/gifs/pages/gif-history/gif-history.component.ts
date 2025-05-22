import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.component.html',
  styleUrl: './gif-history.component.css'
})
export default class GifHistoryComponent {

  //query = inject(ActivatedRoute).params.subscribe(console.log);
}
