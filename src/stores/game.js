import { defineStore, acceptHMRUpdate } from 'pinia';
import { Notify } from 'quasar';
import { usePlayersStore } from './players';

export const useGameStore = defineStore('game', {
  state: () => ({
    players: [],        // array of player objects
    ongoing: false,
    board: [],
    currentPlayer: null, // current player object
  }),

  getters: {
    gameIsOngoing: (state) => state.ongoing,
    playersInGame: (state) => state.players,
  },

  actions: {
    startGame() {
      const playersStore = usePlayersStore();

      // Convert players object → array of player objects
      const players = Object.values(playersStore.players);

      if (players.length < 2) {
        Notify.create({ type: "warning", message: "You need two players to play the game!" });
        return;
      }

      this.players = players;
      this.currentPlayer = players[0];  // first player begins
      this.ongoing = true;

      this.board = this.newBoardTemplate();

      if (this.board?.length > 0) {
        Notify.create({ type: "positive", message: "Game started!" });
      } else {
        Notify.create({ type: "negative", message: "Game failed to start." });
      }
    },

    stopGame() {
      this.ongoing = false;
      this.currentPlayer = null;
      Notify.create({ message: "Game stopped!" });
    },

    newBoardTemplate() {
      const rows = 6;
      const cols = 7;

      return Array.from({ length: rows }, () =>
        Array(cols).fill(this.getEmptyCell())
      );
    },

    getEmptyCell() {
      return {
        player: null,
      };
    },

    togglePlayer() {
      const active = this.currentPlayer;
      this.currentPlayer = this.players.find(p => p.id !== active.id);
    },

    insertDisc(rowIndex, colIndex) {
      this.board[rowIndex][colIndex] = {
        player: this.currentPlayer.id,
      };
      this.togglePlayer();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
