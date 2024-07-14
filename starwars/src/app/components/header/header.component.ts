import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {



  constructor(private router: Router) { }

  navegarALogin() {
    console.log('click');
    console.log('Navega alogin');
    this.router.navigate(['login']).then(success => {
      console.log('Navigation success:', success);
    }).catch(err => {
      console.log('Navigation error:', err);
    });
  }

}
