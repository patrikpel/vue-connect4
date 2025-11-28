<template>
  <div v-for="rowIndex in board" :key="'board-row-'+rowIndex" class="board-row">
    <div v-for="[disc, colIndex] in rowIndex" :key="'board-col'+colIndex" class="board-col"
         style="width: 20px; height: 20px; border: 1px solid black; background-color: red;" @click="insertDisc(rowIndex, colIndex)">
        {{disc}}
    </div>
  </div>
</template>

<script setup>
  import { useGameStore } from "stores/game.js";
  import { storeToRefs } from 'pinia';

  const gameStore = useGameStore();
  const { board } = storeToRefs(gameStore);
</script>

<style scoped>
  .board-col {
    display: flex;
    flex-direction: column;
  }
  .board-row {
    display: flex;
    flex-direction: row;
  }
</style>
