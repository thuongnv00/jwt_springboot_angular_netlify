import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Song} from "../../model/Song";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private API_Song = environment.API_Song + 'api/song/create';

  constructor(private http:HttpClient) { }

  createSong(song:Song): Observable<any> {
    return this.http.post<Song>('http://localhost:8080/api/auth/song/create',song);
  }
  pageSong(request) {
    const params = request;
    return this.http.get('http://localhost:8080/api/auth/song/list',{params});
  }
  deleteSong(id:number): Observable<any> {
    return this.http.delete<Song>('http://localhost:8080/api/auth/song/delete/'+`${id}`)

  }
}
