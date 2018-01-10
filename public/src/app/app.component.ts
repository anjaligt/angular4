import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';

import { DialogDemoComponent } from './dialog-demo/dialog-demo.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  usersList = {};
  myform;

  version = VERSION;

  fileNameDialogRef: MatDialogRef<DialogDemoComponent>;
  constructor(private http: HttpClient,public dialog: MatDialog){
  }
  

  updateUser(user) {



    let dialogRef = this.dialog.open(DialogDemoComponent, {
  height: '400px',
  width: '600px',
  data:{
    user:user
  }
}
);
    dialogRef.afterClosed().subscribe(result => {
      //this.selectedOption = result;
      console.log(result);
    });
  }

  ngOnInit() {
    this.http.get('http://localhost:2149/api/users/users_list').subscribe(result => {
      console.log("result",result);

      if(result)
      {
        this.usersList = result;	
        
      }
      
      
      
    });
    // Model driven form
    this.myform = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', Validators.required)
    });
  }

  /*
  * Function for add user
  */
  addUser(){
  	 this.http.post('http://localhost:2149/api/users/user', this.myform.value).subscribe(result => {
     this.ngOnInit();
    });    
  }

  /*
  * Function for delete user
  */
  deleteUser(id){
    this.http.delete('http://localhost:2149/api/users/user/admin/'+id).subscribe(result => {
     this.ngOnInit();
    });    
  }


}

export class DialogContentExampleDialog {}

/*@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './dialog-result-example-dialog.html',
})*/

/*export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}
*/