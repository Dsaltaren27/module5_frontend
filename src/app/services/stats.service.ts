import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  // Ajusta esta URL base según el API Gateway de tu equipo
  private apiUrl = 'https://modulo1.execute-api.us-east-1.amazonaws.com/stats';

  async createShortUrl(longUrl: string): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, { longUrl: longUrl.trim() });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getStatsByCode(code: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/${code.trim()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}