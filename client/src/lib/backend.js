import axios from 'axios';
import { auth } from './firebase';

export class ApiError extends Error {
  constructor({ message, status, data }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const errorListeners = new Set();

// Subscribe to every backend failure. Returns an unsubscribe function.
export const subscribeToApiErrors = (listener) => {
  errorListeners.add(listener);
  return () => errorListeners.delete(listener);
};

const emitApiError = (apiError) => {
  errorListeners.forEach((listener) => listener(apiError));
};

const messageFrom = (data, fallback) => {
  // The server uses `error` (e.g. 404, zod failures) or `err` (5xx/400 catch blocks).
  const candidate = data?.error ?? data?.err;
  return typeof candidate === 'string' ? candidate : fallback;
};

export const backend = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
});

backend.interceptors.request.use(async (config) => {
  await auth.authStateReady();
  const token = await auth.currentUser?.getIdToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

backend.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = new ApiError({
      message: messageFrom(error.response?.data, error.message),
      status: error.response?.status ?? null,
      data: error.response?.data,
    });
    emitApiError(apiError);
    return Promise.reject(apiError);
  },
);
