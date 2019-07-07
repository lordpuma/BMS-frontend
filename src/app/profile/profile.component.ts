import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private authService: AuthService) {}

  async ngOnInit() {

     const client = await this.authService.getAuth0Client();
     const token = await client.getTokenSilently();
     console.log(token);


     this.authService.profile.subscribe(profile => (this.profile = profile));
  }
}
