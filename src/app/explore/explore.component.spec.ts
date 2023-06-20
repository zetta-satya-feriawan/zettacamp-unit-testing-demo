import { HttpClientTestingModule } from "@angular/common/http/testing"
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing"
import { FormControl, ReactiveFormsModule } from "@angular/forms"
import { ExploreComponent } from "./explore.component"
import { GiphyService, GifType } from "../services/giphy.service"
import { of } from "rxjs"

describe("ExploreComponent", () => {
  let component: ExploreComponent
  let fixture: ComponentFixture<ExploreComponent>
  let giphyService: GiphyService
  let trendingGifs: GifType[] = [
    { id: "1", title: "GIF 1", src: "https://giphy.com/gif1" },
    { id: "2", title: "GIF 2", src: "https://giphy.com/gif2" },
  ]

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [GiphyService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreComponent)
    component = fixture.componentInstance
    giphyService = TestBed.inject(GiphyService)

    // spyOn(giphyService, "searchGifs").and.returnValue(of(trendingGifs))
    fixture.detectChanges()
  })

  it("should have the correct page title", () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector("h1")
    expect(titleElement.textContent).toContain("Explore")
  })

  it("should display the correct search message", () => {
    const messageElement: HTMLElement = fixture.nativeElement.querySelector("p")
    expect(messageElement.textContent).toContain("Try searching: mario")
  })

  it("should display the search input", () => {
    const inputElement: HTMLElement = fixture.nativeElement.querySelector("input")
    expect(inputElement).toBeTruthy()
  })

  it("should not display the GIF images", () => {
    const gifElements: NodeListOf<HTMLLIElement> = fixture.nativeElement.querySelectorAll("li")
    expect(gifElements.length).toBe(0)
  })

  it("should display the GIF images after debounce time", fakeAsync(() => {
    spyOn(giphyService, "searchGifs").and.callThrough()
    component.query.setValue("mario")

    tick(500)
    fixture.detectChanges()

    expect(giphyService.searchGifs).toHaveBeenCalled()
  }))
})
