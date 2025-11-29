<template>
  <div class="board-cell-wrapper"
           :class="{ 'hovered-column': colIndex === hoveredColumn }"
           @mouseenter="hoveredColumn = colIndex"
           @mouseleave="hoveredColumn = null"
           @click="gameStore.insertDisc(colIndex)">

    <div class="board-cell"
         :style="{
           backgroundColor: Object.values(allPlayers).find(player => player.id == cell.player)?.color
         }">
    </div>
  </div>
</template>

<script setup>
  import { inject } from "vue";
  import { usePlayersStore } from "stores/players.js";
  import { storeToRefs } from "pinia";
  import { useGameStore } from "stores/game.js";

  const gameStore = useGameStore();
  const playersStore = usePlayersStore();
  const { hoveredColumn } = inject('gameMatrix');
  const { allPlayers } = storeToRefs(playersStore);


  defineProps({
    colIndex: {
      type: Number,
      required: true,
    },
    cell: {
      type: Object,
      required: true,
    }
  })
</script>

<style scoped>

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
