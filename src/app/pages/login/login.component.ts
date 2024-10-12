import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router"
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isLogin:Boolean;
  user:User;

  constructor(private router:Router){
    this.isLogin=true;
    this.user={
      email:"",
      password:""
    }
  }

  ngOnInit(): void {
    const isLoggedIn=localStorage.getItem("user");
    if(isLoggedIn){
      this.user=JSON.parse(isLoggedIn);
      this.router.navigate(['/dashboard']);
    }
  }

  onRegister(){ 
    const isLocalData=localStorage.getItem("registeredUsers");
    if(isLocalData){
      const registeredUsers:User[]=JSON.parse(isLocalData);
      registeredUsers.push(this.user);
      localStorage.setItem('registeredUsers',JSON.stringify(registeredUsers));
    }else{
      const registeredUsers:User[]=[this.user];
      localStorage.setItem('registeredUsers',JSON.stringify(registeredUsers));
    }
    alert("You have been successfully registered!");
    this.isLogin=true;
    this.user={
      email:"",
      password:""
    };
    this.router.navigate(['/login']);
  }

  onLogin(){
    const isRegisteredUsers:string|null=localStorage.getItem("registeredUsers");
    if(isRegisteredUsers){
      const registeredUsers:User[]=JSON.parse(isRegisteredUsers);

      const isUserFound= registeredUsers.find((user:User)=>(user.email==this.user.email&&user.password==this.user.password));
      if(isUserFound){
        localStorage.setItem('user',JSON.stringify(isUserFound));
        this.router.navigate(['/dashboard']);
      }else{
        alert("Wrong email or password!")
      }
    }else{
      alert("User not found!")
    }
  }
}
