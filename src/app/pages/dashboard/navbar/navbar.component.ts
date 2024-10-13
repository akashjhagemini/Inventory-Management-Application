import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() roleChangeEvent:EventEmitter<boolean>=new EventEmitter();

  isUser:boolean;
  constructor(private router:Router){
    this.isUser=false;
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

  toggleRole(operation:string){
    // console.log(e);
    if(operation=='toggle'){
      this.isUser=!this.isUser;
    }else if(operation=='admin'){
      this.isUser=false;
    }else{
      this.isUser=true;
    }
    this.roleChangeEvent.emit(!this.isUser);
  }
}
