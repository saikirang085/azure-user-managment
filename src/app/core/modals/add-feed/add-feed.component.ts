import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from 'src/app/shared/_services/admin.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UtilService } from 'src/app/shared/_services/util.service';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.scss']
})
export class AddFeedComponent implements OnInit {
  feedForm: FormGroup;
  errorMsg: any;
  feedData: any;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private authService: AuthService,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AddFeedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  getErrorMessage(control) {
    return this.feedForm.controls[control].touched && this.feedForm.controls[control].hasError('required') ? `${control} required` :
      this.feedForm.controls[control].touched && this.feedForm.controls[control].hasError('pattern') ? `Please enter a valid ${control}` : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  checklanguage(feedData) {
    const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')
      .append('Ocp-Apim-Subscription-Key', 'd0e13f3721fa44db981707a8dc227c6c')
      .append('accept', 'application/json');
    return this.http.post(`https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/languages`, {
      'documents': [{
        "id": "1",
        "text": feedData.feed
      }]
    }, { headers: headers })
      .pipe(catchError(this.utilService.handleError));
  }

  addFeed() {
    this.errorMsg = '';
    if (this.feedForm.valid) {
      this.checklanguage(this.feedForm.value).subscribe((res: any) => {
        console.log('res:::', res.documents[0].detectedLanguages[0].name == 'English');
        if (res.documents[0].detectedLanguages[0].name == 'English') {
          this.feedForm.value.email = this.authService.getProfile.email;
          this.feedForm.value.createdAt = this.formatDate(new Date());
          this.adminService.addFeed(this.feedForm.value).subscribe((res: any) => {
            if (res) {
              this.dialogRef.close(true);
            } else {
              this.errorMsg = res && res.message ? res.message : 'Error while adding Feed';
            }
          }, err => {
            this.errorMsg = err && err.message ? err.message : 'Error while adding Feed';
          })
        } else {
          this.errorMsg = 'Please enter your feed only in English';
        }
      })
    }
  }

  editFeed() {
    this.errorMsg = '';
    let feed = this.feedData;
    feed.feed = this.feedForm.value.feed ? this.feedForm.value.feed : feed.feed;
    feed.email = feed.email ? feed.email : this.authService.getProfile.email;
    feed.createdAt = this.formatDate(new Date());
    if (this.feedForm.valid) {
      this.checklanguage(this.feedForm.value).subscribe((res: any) => {
        console.log('res:::', res.documents[0].detectedLanguages[0].name == 'English');
        if (res.documents[0].detectedLanguages[0].name == 'English') {
          this.adminService.editFeed(feed).subscribe((res: any) => {
            if (res) {
              this.dialogRef.close(true);
            } else {
              this.errorMsg = res && res.message ? res.message : 'Error while updating Feed';
            }
          }, err => {
            this.errorMsg = err && err.message ? err.message : 'Error while updating Feed';
          })
        } else {
          this.errorMsg = 'Please enter your feed only in English';
        }
      })
    }
  }


  getUserFeed() {
    this.adminService.getUserFeed(this.data.feedId).subscribe((res: any) => {
      if (res) {
        this.feedData = res;
        this.initForm(this.feedData);
      }
    }, err => {
      console.log('error while getting user:::', err);
    })
  }

  initForm(data?) {
    this.feedForm = new FormGroup({
      id: new FormControl(data ? data.id : ''),
      feed: new FormControl(data ? data.feed : '', [Validators.required])
    });
  }
  ngOnInit() {
    this.initForm();
    if (this.data.type != 'add') {
      this.getUserFeed();
    }
  }

}
