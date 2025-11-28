<template>
  <button class="green-btn" @click="gameStore.startGame(getPlayerIds())">
    Start Game
  </button>
</template>

<script setup>
  import { useGameStore } from "stores/game.js";
  import { usePlayersStore } from "stores/players.js";
  import { storeToRefs } from 'pinia';

  const playersStore = usePlayersStore();

  const { allPlayers } = storeToRefs(playersStore);
  const gameStore = useGameStore();

  const getPlayerIds = () => {
    return Object.values(allPlayers.value).map(player => player.id);
  }
</script>
