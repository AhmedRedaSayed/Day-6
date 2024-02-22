import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  constructor(private _userSerivce: UserService, private router: Router) {}
  ngOnInit(): void {
    this.state();
  }
  state() {
    this._userSerivce.getUserState().subscribe({
      next: (state) => {
        this.isLoggedIn = state;
      },
    });
  }
  changeState() {
    if (this.isLoggedIn) {
      this._userSerivce.logout();
    } else {
      this.router.navigate(['login']);
    }
  }
}
