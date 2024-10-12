import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() roleChangeEvent:EventEmitter<boolean>=new EventEmitter();

  isAdmin:boolean;
  constructor(private router:Router){
    this.isAdmin=true;
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

  toggleRole(e: any){
    // console.log(e);
    this.isAdmin=!this.isAdmin;
    this.roleChangeEvent.emit(this.isAdmin);
  }
}
