import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddUserComponent } from 'src/app/core/modals/add-user/add-user.component';
import { ConfirmComponent } from 'src/app/core/modals/confirm/confirm.component';
import { AdminService } from 'src/app/shared/_services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService
  ) { }

  openDialog(type) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
      data: {type}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  confirmDialog(type) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: {type}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getUsers();
      }
    });
  }

  getUsers() {
    this.adminService.getAllusers().subscribe((res: any) => {
      if(res.data) {
        this.users = res.data;
      }
    }, err => {
      console.log('error while getting users list: ', err);
    })
  }

  ngOnInit() {
    this.getUsers();
    console.log('UsersComponent');
  }

}
