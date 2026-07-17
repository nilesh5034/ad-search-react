import axios from 'axios';

const API_BASE_URL = 'https://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  userId: number;
  createdDate: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  city: string;
  createdDate: string;
  isActive: boolean;
}

export interface UserDetails {
  user: User;
  ads: Ad[];
}

export interface SearchResponse {
  count: number;
  searchTerm: string;
  data: Ad[];
}

export const adService = {
  getAll: async () => {
    const response = await api.get<Ad[]>('/ads');
    return response.data;
  },
  search: async (searchTerm: string) => {
    const response = await api.get<SearchResponse>('/ads/search', {
      params: { searchTerm },
    });
    return response.data;
  },
};

export const userService = {
  getUserById: async (id: number) => {
    const response = await api.get<UserDetails>(`/users/${id}`);
    return response.data;
  },
};
