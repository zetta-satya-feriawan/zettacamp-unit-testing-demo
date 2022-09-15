import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { GifType, GiphyService } from '../services/giphy.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  gifs$: Observable<any[]> = of([])

  constructor(private giphy: GiphyService) {}

  ngOnInit(): void {
    this.gifs$ = this.giphy.getTrendingGifs()
  }

  trackByID(index: number, gif: GifType) {
    return String(index) + String(gif?.id)
  }
}
