import { defineStore, acceptHMRUpdate } from 'pinia';
import { Notify } from 'quasar'

export const useGameStore = defineStore('game', {
  state: () => ({
    players: [],   // player ids
    ongoing: false, // is game ongoing?
    board: [],
    currentPlayer: 0, // current player id
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
      this.board = this.newBoardTemplate();
      if(this.board?.length > 0) {
        Notify.create({type: "positive", message: "Game started!"});
      } else {
        Notify.create({type: "negative", message: "Game failed to start."});
      }
    },
    stopGame() {
      this.ongoing = false;
      Notify.create({message: "Game stopped!"});
    },
    newBoardTemplate() {
      const rows = 6;
      const cols = 7;

      return Array.from({ length: rows }, () => Array(cols).fill(this.getEmptyCell()));
    },
    getEmptyCell() {
      return {
        player: null,
      };
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
