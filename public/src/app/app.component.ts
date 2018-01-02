import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  usersList = [];
  myform;
  constructor(private http: HttpClient){
  }

  ngOnInit() {
    this.http.get('http://localhost:2149/api/users/users_list').subscribe(result => {
      this.usersList = result.data.items.docs;	
      console.log(this.usersList);
      
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
