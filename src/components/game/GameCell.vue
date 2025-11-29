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
  border-radius: 50%;
  position: relative;
  border: 1px solid #000000;
  overflow: hidden;

  /* Base shine-like depth */
  box-shadow:
    inset 0 3px 6px rgba(255,255,255,0.45),   /* inner top highlight */
    inset 0 -3px 6px rgba(0,0,0,0.35),        /* inner bottom shadow */
    0 4px 8px rgba(0,0,0,0.25);               /* external drop shadow */

  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

/* ---- SHINY REFLECTION LAYER ---- */
.board-cell::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 4px;
  width: 70%;
  height: 40%;
  border-radius: 50%;
  background: rgba(255,255,255,0.35); /* glossy top reflection */
  filter: blur(3px);
  pointer-events: none;
}


</style>
