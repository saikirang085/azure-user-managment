import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/_services/admin.service';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from 'src/app/core/modals/confirm/confirm.component';
import { AddFeedComponent } from 'src/app/core/modals/add-feed/add-feed.component';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  selectedFeed: any;
  feeds: any[] = [];

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService
  ) { }

  openDialog(type, feedId) {
    const dialogRef = this.dialog.open(AddFeedComponent, {
      width: '400px',
      data: {type, feedId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) {
        this.getFeeds();
      }
      // this.animal = result;
    });
  }

  deleteFeed() {
    this.selectedFeed.isDelete = true;
    this.adminService.deleteFeed(this.selectedFeed).subscribe(res => {
      if(res) {
        this.getFeeds();
      }
    }, err => {
      console.log('error while deleting user::', err);
    })
  }

  confirmDialog(type, feed) {
    this.selectedFeed = feed;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: {type}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteFeed();
        // this.getUsers();
      }
    });
  }

  getFeeds() {
    this.adminService.getAllFeeds().subscribe((res: any) => {
      if(res) {
        this.feeds = res;
      }
    }, err => {
      console.log('error while getting users list: ', err);
    })
  }

  ngOnInit() {
    this.getFeeds();
    console.log('UsersComponent');
  }

}
