import { defineStore, acceptHMRUpdate } from 'pinia';
import { Notify } from 'quasar';
import { usePlayersStore } from './players';

export const useGameStore = defineStore('game', {
  state: () => ({
    players: [],        // array of player objects
    ongoing: false,
    board: [],
    currentPlayer: null, // current player object
    gameHasEnded: false, // just for the end screen
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

      this.players = players;
      this.currentPlayer = players[0];  // first player begins
      this.gameHasEnded = false;

      let gridSize = this.getGridSize(players.length);
      if(gridSize !== undefined) {
        this.board = this.newBoardTemplate(gridSize);
      }

      if (this.board?.length > 0) {
        this.ongoing = true;
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

    endGame() {
      this.gameHasEnded = true;
      setTimeout(() => {
        this.gameHasEnded = false;
        this.stopGame();
      }, 2000);
    },

    newBoardTemplate(size) {
      return Array.from({ length: size.rows }, () =>
        Array(size.cols).fill(this.getEmptyCell())
      );
    },

    getGridSize(playerAmount) {
      switch(playerAmount) {
        case 2:
          return { rows: 6, cols: 7 }
        case 3:
          return { rows: 6, cols: 8 };
        case 4:
          return { rows: 7, cols: 8 };
        default:
          Notify.create({
            type: "warning",
            message: "Invalid number of players!"
          });
      }
    },

    getEmptyCell() {
      return {
        player: null,
      };
    },

    togglePlayer() {
      const currentIndex = this.players.findIndex(p => p.id === this.currentPlayer.id);
      const nextIndex = (currentIndex + 1) % this.players.length;
      this.currentPlayer = this.players[nextIndex];
    },

    insertDisc(colIndex) {
      if(this.gameHasEnded === true) return;

      // Find the lowest empty cell in the column
      const lastRowIndex = this.board.length - 1;

      for (let row = lastRowIndex; row >= 0; row--) {
        if (this.board[row][colIndex].player === null) {

          // Set disc status to this player
          this.board[row][colIndex] = {
            player: this.currentPlayer.id,
          };

          if(this.didIWin(row, colIndex, this.currentPlayer.id)) {
            // We have a winner
            this.endGame();
            return;
          }

          // Toggle player
          this.togglePlayer();

          return; // Stop the function so only one disc is placed
        }
      }

      // Column is full
      Notify.create({
        type: "warning",
        message: "This column is full!"
      });
    },

    didIWin(row, col, playerId) {
      const directions = [
        [0, 1],   // right
        [1, 0],   // downward
        [1, 1],   // diagonal downward right
        [1, -1],  // diagonal downward left
      ];

      const rows = this.board.length;
      const cols = this.board[0].length;

      const countInDirection = (dr, dc) => {
        let count = 1;

        // Check forward direction
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < rows && c >= 0 && c < cols && this.board[r][c]?.player === playerId) {
          count++;
          r += dr;
          c += dc;
        }

        // Check backward direction
        r = row - dr;
        c = col - dc;
        while (r >= 0 && r < rows && c >= 0 && c < cols && this.board[r][c]?.player === playerId) {
          count++;
          r -= dr;
          c -= dc;
        }

        return count >= 4;
      };

      return directions.some(([dr, dc]) => countInDirection(dr, dc));
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
