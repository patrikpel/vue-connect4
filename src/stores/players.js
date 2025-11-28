import { defineStore, acceptHMRUpdate } from 'pinia';
import { Notify } from 'quasar'

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: {},   // playerId → player object
    nextId: 0,
    availableColors: ['red', 'blue'],
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

      if(Object.values(this.players).length == 2) {
        Notify.create({type: "warning", message: "You cannot have more than two players! (right now)"});
        return;
      }

      if(Object.values(this.players).some(player => player.name === name)) {
        Notify.create({type: "warning", message: "You cannot have two players with the same name"});
        return;
      }

      const id = this.generateId();

      const player = {
        id: id,
        name: name,
        color: this.getColor(),
      };

      this.players[id] = player;

      Notify.create({type: "positive", message: "Added player: " + name});
    },

    removePlayer(playerId) {
      const name = Object.values(this.players)?.find(player => player.id === playerId)?.name;
      delete this.players[playerId];
      Notify.create({message: "Removed player: " + name});
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlayersStore, import.meta.hot));
}
