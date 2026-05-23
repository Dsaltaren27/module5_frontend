import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private apiUrl = 'https://z0aox8j927.execute-api.us-east-1.amazonaws.com';

  getApiUrl(): string {
    return this.apiUrl;
  }

  ShortUrl(code: string): string {
    return `${window.location.origin}/short/${code.trim()}`;
  }

  async createShortUrl(longUrl: string): Promise<any> {
    const response = await axios.post(`${this.apiUrl}/shorten`, { longUrl: longUrl.trim() });
    return response.data;
  }

  async getStatsByCode(code: string): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/stats/${code.trim()}`);
    return response.data;
  }
}
