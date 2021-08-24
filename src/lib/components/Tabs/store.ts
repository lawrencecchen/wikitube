import { writable } from 'svelte/store';

export const activeTabIndex = writable(0);
export const keyboardNavIntent = writable(false);
