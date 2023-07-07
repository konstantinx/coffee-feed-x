export const appConfig = {
  apiLimit: Number(import.meta.env.VITE_SOME_KEY ?? 5),
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
};
