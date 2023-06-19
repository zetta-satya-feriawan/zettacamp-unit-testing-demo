import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormControl } from "@angular/forms"
import { debounceTime, Observable, of, Subject, switchMap, takeUntil } from "rxjs"
import { GifType, GiphyService } from "../services/giphy.service"

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.scss"],
})
export class ExploreComponent implements OnInit, OnDestroy {
  public query = new FormControl<string | null>(null)
  public gifs$: Observable<GifType[]> = of([])
  private destroy$ = new Subject<boolean>()

  constructor(private giphy: GiphyService) {}

  ngOnInit(): void {
    this.gifs$ = this.query.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      switchMap((query) => {
        return this.giphy.searchGifs(query || "")
      })
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  trackByID(index: number, gif: GifType) {
    return String(index) + String(gif?.id)
  }
}
