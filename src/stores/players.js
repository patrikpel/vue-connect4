import { defineStore, acceptHMRUpdate } from 'pinia';
import { Notify } from 'quasar'

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
      if(name.trim() == "") {
        return;
      }

      if(Object.values(this.players).some(player => player.name === name)) {
        Notify.create("You cannot have two players with the same name");
        return;
      }

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
