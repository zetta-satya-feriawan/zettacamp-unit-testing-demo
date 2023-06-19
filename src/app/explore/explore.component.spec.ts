import { HttpClientTestingModule } from "@angular/common/http/testing"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ReactiveFormsModule } from "@angular/forms"
import { ExploreComponent } from "./explore.component"

describe("ExploreComponent", () => {
  let component: ExploreComponent
  let fixture: ComponentFixture<ExploreComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreComponent)
    component = fixture.componentInstance
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
})
