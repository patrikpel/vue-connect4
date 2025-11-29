<template>
  <h3 v-if="currentPlayer" style="font-size: 24px">Active player: {{ currentPlayer.name }}</h3>
  <div class="board-grid"
       :style="{
         gridTemplateRows: `repeat(${board.length}, 1fr)`,
         gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
         width: '300px',
         height: '300px',
       }">

    <template v-for="(row, rowIndex) in board" :key="'row-' + rowIndex">
      <div v-for="(disc, colIndex) in row"
           :key="'cell-' + rowIndex + '-' + colIndex"
           class="board-cell-wrapper"
           :class="{ 'hovered-column': colIndex === hoveredColumn }"
           @mouseenter="hoveredColumn = colIndex"
           @mouseleave="hoveredColumn = null"
           @click="gameStore.insertDisc(colIndex)">

        <div class="board-cell"
             :style="{
               backgroundColor: Object.values(allPlayers).find(player => player.id == disc.player)?.color
             }">
        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGameStore } from "stores/game.js";
import { usePlayersStore } from "stores/players.js";
import { storeToRefs } from "pinia";

const playersStore = usePlayersStore();
const gameStore = useGameStore();

const { allPlayers } = storeToRefs(playersStore);
const { board, currentPlayer } = storeToRefs(gameStore);

const hoveredColumn = ref(null); // track which column is hovered
</script>

<style scoped>
.board-grid {
  display: grid;
  gap: 0;
  width: max-content;
}

.board-cell-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: background-color 0.2s;
}

/* Highlight the entire column */
.hovered-column {
  background-color: rgba(0, 0, 0, 0.1);
}

.board-cell {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
