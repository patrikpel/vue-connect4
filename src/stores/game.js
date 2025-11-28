import { defineStore, acceptHMRUpdate } from 'pinia';
import { Notify } from 'quasar'

export const useGameStore = defineStore('game', {
  state: () => ({
    players: [],   // player ids
    ongoing: false, // is game ongoing?
  }),

  getters: {
    gameIsOngoing: (state) => state.ongoing,
    playersInGame: state => state.players,
  },

  actions: {
    startGame(playerIds) {
      if(playerIds.length < 2) {
        Notify.create({type: "warning", message: "You need two players to play the game!"});
        return
      }

      this.ongoing = true;
      this.players = playerIds;
      Notify.create({type: "positive", message: "Game started!"});
    },
    stopGame() {
      this.ongoing = false;
      Notify.create({message: "Game stopped!"});
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
