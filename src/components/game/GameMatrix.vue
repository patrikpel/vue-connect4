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
             gridColumn: colIndex + 1
           }"
           @click="gameStore.insertDisc(colIndex)">
        {{ disc.player }}
      </div>
    </template>

  </div>
</template>

<script setup>
import { useGameStore } from "stores/game.js";
import { storeToRefs } from "pinia";

const gameStore = useGameStore();
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
