import { HttpClientTestingModule } from "@angular/common/http/testing"
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing"
import { FormControl, ReactiveFormsModule } from "@angular/forms"
import { ExploreComponent } from "./explore.component"
import { GiphyService, GifType } from "../services/giphy.service"
import { Observable, of } from "rxjs"
import { By } from "@angular/platform-browser"
// import { MockProvider, MockRender } from "ng-mocks"
import { DebugElement } from "@angular/core"

describe("ExploreComponent", () => {
  let component: ExploreComponent
  let fixture: ComponentFixture<ExploreComponent>
  let giphyService: GiphyService
  let de: DebugElement
  // giphyServiceStub = {
  //   getTrendingGifs: (): Observable<GifType[]> => {
  //     return of([
  //       { id: "test-id-1", src: "test-src-1", title: "test-title-1" },
  //       { id: "test-id-2", src: "test-src-2", title: "test-title-2" },
  //     ])
  //   },
  // }

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

  // it("The gifs image should be present", fakeAsync(()=>{
  //   const fixture = MockRender(ExploreComponent)

  // }))
  // it("should display the GIF images after debounce time", fakeAsync(() => {
  //   // const  = fixture.debugElement.query(By.css('.input-filter')).nativeElement;
  //   spyOn(giphyService, "searchGifs").and.returnValue(of(trendingGifs))
  //   // spyOn(giphyService, "getTrendingGifs").and.returnValue(of(trendingGifs))
  //   component.query.setValue("mario")
  //   tick(500)
  //   fixture.detectChanges()
  //   expect(giphyService.searchGifs).toHaveBeenCalled()
  //   component.gifs$.subscribe((result) => {
  //     expect(result.length).toEqual(trendingGifs.length)
  //     console.log("Ga muncul")
  //   }
  //   )
  //   // expect(giphyService.getTrendingGifs).toHaveBeenCalled()
  // }))

  it("should display the GIF images", fakeAsync(() => {
    // Arrange
    const gifs: GifType[] = [
      { id: "test-id-1", src: "test-src-1", title: "test-title-1" },
      { id: "test-id-2", src: "test-src-2", title: "test-title-2" },
    ]
    spyOn(giphyService, "searchGifs").and.returnValue(of(gifs))

    // Act
    component.query.setValue("mario")
    tick(500) // Wait for debounceTime

    // Update the view
    fixture.detectChanges()

    // Assert
    const gifElements: HTMLLIElement[] = fixture.nativeElement.querySelectorAll("li")
    expect(gifElements.length).toBe(gifs.length)

    // Check if the GIF images are displayed correctly
    for (let i = 0; i < gifs.length; i++) {
      const imgElement: HTMLImageElement | null = gifElements[i].querySelector("img")
      expect(imgElement!.src).toContain(gifs[i].src)
      expect(imgElement!.alt).toBe(gifs[i].title)
    }
  }))
})
