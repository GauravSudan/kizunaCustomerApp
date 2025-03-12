import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EngineEmailRequest } from "../Data/Request.type";

@Injectable()
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  /**
   * Sends a POST request to authenticate with the engine number and retrieves a JWT token.
   * @param engineNo - The engine number for authentication.
   * @returns A promise resolving to the token or rejecting with an error.
   */

  async checkEngine(params: any): Promise<any> {
    //const params = { param };
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`https://localhost:7259/webapi/api/auth/checkEngine`, params, {
          observe: 'response',
        })
        .subscribe({
          next: (response) => {
            if (response.body) {
              resolve(response.body);
            } else {
              reject('Token not found in response.');
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error('Authentication error:', error);
            reject(error.message || 'An error occurred while authenticating.');
          },
        });
    });
  }
  async checkOTP(params: any): Promise<any> {
    //const params = { param };
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`https://localhost:7259/webapi/api/auth/checkOTP`, params, {
          observe: 'response',
        })
        .subscribe({
          next: (response) => {
            if (response.body) {
              resolve(response.body);
            } else {
              reject('Token not found in response.');
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error('Authentication error:', error);
            reject(error.message || 'An error occurred while authenticating.');
          },
        });
    });
  }

  async authenticate(engineNo: string): Promise<any> {
    const params = { engineNo };
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`https://localhost:7259/webapi/api/auth/authenticate`, params, {
          observe: 'response',
        })
        .subscribe({
          next: (response) => {
            if (response.body) {
              resolve(response.body);
            } else {
              reject('Token not found in response.');
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error('Authentication error:', error);
            reject(error.message || 'An error occurred while authenticating.');
          },
        });
    });
  }

  async getUserManual(engineNo: string): Promise<any> {
    const params = { engineNo };
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`https://localhost:7259/webapi/api/auth/getUserManual`, params, {
          observe: 'response',
        })
        .subscribe({
          next: (response) => {
            if (response.body) {
              resolve(response.body);
            } else {
              reject('Token not found in response.');
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error('Authentication error:', error);
            reject(error.message || 'An error occurred while authenticating.');
          },
        });
    });
  }

  async downloadUserManual(docID: number): Promise<any> {
    const params = { docID };
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`https://localhost:7259/webapi/api/auth/downloadUserManual`, params, {
          observe: 'response',
        })
        .subscribe({
          next: (response) => {
            if (response.body) {
              resolve(response.body);
            } else {
              reject('Token not found in response.');
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error('Authentication error:', error);
            reject(error.message || 'An error occurred while authenticating.');
          },
        });
    });
  }

}
