import { defineStore, acceptHMRUpdate } from 'pinia';

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: {},   // playerId → player object
    nextId: 0,
  }),

  getters: {
    allPlayers: (state) => state.players,
  },

  actions: {
    generateId() {
      return this.nextId++;
    },

    addPlayer(name) {
      const id = this.generateId();

      const player = {
        id: id,
        name: name,
      };

      this.players[id] = player;
    },

    removePlayer(playerId) {
      delete this.players[playerId];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlayersStore, import.meta.hot));
}
