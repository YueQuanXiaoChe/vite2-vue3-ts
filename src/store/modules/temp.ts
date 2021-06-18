import { defineStore } from 'pinia';

interface TempState {
  count: number;
}

export const tempStore = defineStore({
  id: 'temp',
  state: (): TempState => ({
    count: 0
  }),
  getters: {
    getCount(): number {
      return this.count;
    }
  },
  actions: {
    increment() {
      this.count++;
    }
  }
});
