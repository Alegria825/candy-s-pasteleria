/** Antepone la base del sitio (necesaria en GitHub Pages: /candy-s-pasteleria). */
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
