import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth-provider.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private authaService: AuthService,
    private httpClient: HttpClient
  ) {}


  async ping(): Promise<any> { 
    const client = await this.authaService.getAuth0Client();
    const token = await client.getTokenSilently();

    return this.httpClient
      .get('http://localhost:3001/api/external', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .toPromise();
  }
}
