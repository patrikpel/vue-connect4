import { defineStore, acceptHMRUpdate } from 'pinia';
import { Notify } from 'quasar'

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: {},   // playerId → player object
    nextId: 0,
    availableColors: ['red', 'blue', 'green', 'orange'],
  }),

  getters: {
    allPlayers: (state) => state.players,
  },

  actions: {
    generateId() {
      return this.nextId++;
    },

    getColor() {
      return this.availableColors.shift();
    },

    addPlayer(name) {
      if(name.trim() == "") {
        return;
      }

      if(Object.values(this.players).some(player => player.name === name)) {
        Notify.create({type: "warning", message: "You cannot have two players with the same name"});
        return;
      }

      const id = this.generateId();

      let playerColor = this.getColor();

      // If there are no colors left for this player => player limit has been reached
      if(playerColor === undefined) {
        Notify.create({type: "warning", message: "You have reached the player limit"});
        return;
      }

      const player = {
        id: id,
        name: name,
        color: playerColor,
      };

      this.players[id] = player;

      Notify.create({type: "positive", message: "Added player: " + name});
    },

    removePlayer(playerId) {
      const player = Object.values(this.players)?.find(player => player.id === playerId);
      this.availableColors.push(player.color);
      delete this.players[playerId];
      Notify.create({message: "Removed player: " + player?.name});
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlayersStore, import.meta.hot));
}
