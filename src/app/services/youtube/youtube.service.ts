import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {Observable, Subject, of, from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey : string = 'AIzaSyDjfZH1CXUTBY-vJdqCj8smSlUwB0MYqOs';

  constructor(public http: HttpClient) { }

    getVideosForChanel(channel, maxResults): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' 
              + this.apiKey + '&channelId=' 
              + channel + '&order=date&part=snippet &type=video,id&maxResults=' 
              + maxResults;

    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }
}