import axios  from "axios";

export interface Movie {
    id: number;
    title: string;
    year: number;
    director: string;
}

export interface MovieDetail {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string;
    plot: string;
    rating: string;
  }

const apiClient = axios.create({
    baseURL: 'https://www.freetestapi.com/api/v1',
    timeout: 5000,
  });

class MovieService {
    async getAllMovies(): Promise<Movie[]> {
      const response = await apiClient.get<Movie[]>('/movies');
      return response.data;
    }
  
    async searchMovies(query: string): Promise<Movie[]> {
      const response = await apiClient.get<Movie[]>('/movies', {
        params: { search: query },
      });
      return response.data;
    }

    async getMovieById(id: number): Promise<MovieDetail> {
        const response = await apiClient.get<MovieDetail>('/movies/${id}');
        return response.data;
    }
}

export default new MovieService();