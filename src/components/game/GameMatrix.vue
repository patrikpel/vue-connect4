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
      <GameCell v-for="(cell, colIndex) in row" :col-index="colIndex" :cell="cell" :key="'cell-' + rowIndex + '-' + colIndex"/>
    </template>

  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import { useGameStore } from "stores/game.js";
import { storeToRefs } from "pinia";
import GameCell from "components/game/GameCell.vue";

const gameStore = useGameStore();

const { board, currentPlayer } = storeToRefs(gameStore);

const hoveredColumn = ref(null); // track which column is hovered

provide("gameMatrix", {
  hoveredColumn
})
</script>

<style scoped>
.board-grid {
  display: grid;
  gap: 0;
  width: max-content;
}
</style>
