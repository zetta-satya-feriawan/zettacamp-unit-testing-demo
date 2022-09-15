import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

export type GifType = {
  id: string
  title: string
  src: string
}

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private API_KEY: string | null = null
  private API_URL: string | null = null

  constructor(private http: HttpClient) {
    this.API_KEY = environment.giphyApiKey
    this.API_URL = environment.giphyApi
  }

  constructEndpoint(endpoint: 'search' | 'trending' | 'random', query?: string): string {
    const params = new URLSearchParams({
      api_key: this.API_KEY as string,
      rating: 'pg-13',
    })
    if (endpoint === 'search') {
      params.append('q', query || '')
    }
    return `${this.API_URL}/${endpoint}?${params.toString()}`
  }

  getTrendingGifs(): Observable<GifType[]> {
    const url = this.constructEndpoint('trending')
    return this.http.get(url).pipe(
      map((response: { data?: any[] }) => {
        return (response?.data || []).map((item: any) => {
          return {
            id: item?._id,
            title: item?.title,
            src: item?.images?.fixed_height?.webp || item?.images?.fixed_height?.url
          }
        })
      })
    )
  }

  searchGifs(query: string): Observable<GifType[]> {
    const url = this.constructEndpoint('search', query)
    return this.http.get(url).pipe(
      map((response: { data?: any[] }) => {
        console.log('RESPONSE', response)
        return (response?.data || []).map((item: any) => {
          return {
            id: item?._id,
            title: item?.title,
            src: item?.images?.fixed_height?.webp || item?.images?.fixed_height?.url
          }
        })
      })
    )
  }
}
