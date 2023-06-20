import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"

import { GiphyService } from "./giphy.service"

describe("GiphyService", () => {
  let giphyService: GiphyService

  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GiphyService],
    })

    giphyService = TestBed.inject(GiphyService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it("should construct search endpoint with query", () => {
    const endpoint = "search"
    const query = "test search"
    const expectedEndpoint = "https://api.giphy.com/v1/gifs/search?api_key=6rNEBAxq2hjcSnLnnd56V8DofOIrdA0h&rating=pg-13&q=test+search"
    const constructedEndpoint = giphyService.constructEndpoint(endpoint, query)
    expect(constructedEndpoint).toEqual(expectedEndpoint)
  })

  it("should construct trending endpoint without query", () => {
    const endpoint = "trending"
    const expectedEndpoint = "https://api.giphy.com/v1/gifs/trending?api_key=6rNEBAxq2hjcSnLnnd56V8DofOIrdA0h&rating=pg-13"
    const constructedEndpoint = giphyService.constructEndpoint(endpoint)
    expect(constructedEndpoint).toEqual(expectedEndpoint)
  })
})
