<template>
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
           class="board-cell"
           :style="{
             gridRow: rowIndex + 1,
             gridColumn: colIndex + 1,
             backgroundColor: Object.values(allPlayers).find(player => player.id == disc.player)?.color
           }"
           @click="gameStore.insertDisc(colIndex)">
      </div>
    </template>

  </div>
</template>

<script setup>
import { useGameStore } from "stores/game.js";
import { usePlayersStore } from "stores/players.js";
import { storeToRefs } from "pinia";

const playersStore = usePlayersStore();
const gameStore = useGameStore();

const { allPlayers } = storeToRefs(playersStore);
const { board } = storeToRefs(gameStore);
</script>

<style scoped>
.board-grid {
  display: grid;
  gap: 2px; /* optional spacing */
  width: max-content;
}

.board-cell {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 100%;
}


</style>
