import { writable } from 'svelte/store';

export const weatherList = writable([]);
export const forecast = writable('');