import axios, { type AxiosResponse } from 'axios';

export class FastAPIService {
  private api = axios.create({
    baseURL: 'http://your-fastapi-backend-url.com/api',
  });

  async getData(): Promise<void> {
    try {
      const response: AxiosResponse = await this.api.get('/your-endpoint');
      const data = response.data;
      console.log('Data from FastAPI:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async postData(payload: any): Promise<void> {
    try {
      const response: AxiosResponse = await this.api.post('/your-endpoint', payload);
      const data = response.data;
      console.log('Response from FastAPI:', data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  // Add this method to upload a file
  async uploadFile(formData: FormData): Promise<AxiosResponse> {
    try {
      const response: AxiosResponse = await this.api.post('/upload-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}