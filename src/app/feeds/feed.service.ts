import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Feed } from './feed.model';

// one instance
@Injectable({providedIn: 'root'})
export class FeedService {
  private feeds: Feed[] = [];
  private feedsUpdated = new Subject<Feed[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getFeeds() {
    this.http.get<{ hits: any }>('http://localhost:3000/feeds')
      .pipe(map((feedData) => {
        console.log(feedData);
        return feedData.hits;
      }))
      .subscribe((transformedFeeds) => {
        this.feeds = transformedFeeds;
        this.feedsUpdated.next([...this.feeds]);
      });
  }

  getFeedUpdateListener() {
    return this.feedsUpdated.asObservable();
  }

  deleteFeed(id: string) {
    console.log(id);
    this.http.delete('http://localhost:3000/feeds/' + id)
      .subscribe(() => {
        console.log('asd');
        const updatedFeeds = this.feeds.filter(feed => feed.id !== id);
        console.log(updatedFeeds);
        this.feeds = updatedFeeds;
        this.feedsUpdated.next([...this.feeds]);
      });
  }
}
