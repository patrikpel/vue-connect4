<template>
  <button class="red-btn" @click="gameStore.stopGame()" style="width: fit-content;">
    Stop Game
  </button>
</template>

<script setup>
  import { useGameStore } from "stores/game.js";

  const gameStore = useGameStore();
</script>
