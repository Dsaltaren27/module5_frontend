import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private readonly apiUrl = 'https://modulo1.execute-api.us-east-1.amazonaws.com';

  constructor() {}


  async createShortUrl(longUrl: string): Promise<{ shortCode: string }> {
    const response = await axios.post(`${this.apiUrl}/shorten`, { longUrl });
    return response.data;
  }

  async getStatsByCode(shortCode: string): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/stats/${shortCode}`);
    return response.data;
  }
}