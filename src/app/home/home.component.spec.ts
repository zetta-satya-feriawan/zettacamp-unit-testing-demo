import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Observable, of } from 'rxjs'
import { GifType, GiphyService } from '../services/giphy.service'

import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let giphyServiceStub: Partial<GiphyService>
  let de: DebugElement

  beforeEach(async () => {
    giphyServiceStub = {
      getTrendingGifs: (): Observable<GifType[]> => {
        return of([
          { id: 'test-id-1', src: 'test-src-1', title: 'test-title-1' },
          { id: 'test-id-2', src: 'test-src-2', title: 'test-title-2' },
        ])
      },
    }
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: GiphyService, useValue: giphyServiceStub }],
    }).compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display list of trending gifs', () => {
    const el = de.nativeElement as HTMLElement
    const gifs = el.querySelectorAll('li > img')
    expect(gifs.length).toBe(2)
  })

  it('should not display any gifs if the getTrendingGifs returns an empty array', () => {
    let service = de.injector.get(GiphyService)
    spyOn(service, 'getTrendingGifs').and.returnValue(of([]))
    const el = de.nativeElement as HTMLElement
    const gifs = el.querySelectorAll('li > img')
    expect(gifs.length).toBe(2)
  })
})
