import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';

    constructor() { }

    getToken(): string | null {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(this.TOKEN_KEY);
        } else {
            return null; // Trường hợp localStorage không được hỗ trợ
        }
    }

    setToken(token: string): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    removeToken(): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(this.TOKEN_KEY);
        }
    }
}
