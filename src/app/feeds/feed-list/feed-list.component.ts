import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedService } from '../feed.service';
import { Feed } from '../feed.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent implements OnInit, OnDestroy {
  feeds: Feed[] = [];
  isLoading = false;
  private feedsSub: Subscription;

  constructor(public feedService: FeedService) { }

  ngOnInit() {
    this.isLoading = true;
    this.feedService.getFeeds();
    this.feedsSub = this.feedService.getFeedUpdateListener()
      .subscribe((feeds: Feed[]) => {
        this.isLoading = false;
        this.feeds = feeds;
      });
  }

  onDelete(feedId: string) {
    this.feedService.deleteFeed(feedId);
  }

  ngOnDestroy(): void {
    // prevent memory leaks
    this.feedsSub.unsubscribe();
  }

}
