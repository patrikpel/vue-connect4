<template>
  <div class="player-container">
    <span class="player-name">
      {{player.name}}
    </span>
    <button class="red-btn" @click="playersStore.removePlayer(player.id)">
      Remove player
    </button>
  </div>
</template>

<script setup>
  import { usePlayersStore } from "stores/players.js";

  defineProps({
    player: {
      type: Object,
      required: true,
    }
  })

  const playersStore = usePlayersStore();
</script>

<style scoped>
  .player-container {
    border: 1px solid lightgray;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    border-radius: 5px;
  }

  .player-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 5px;
  }
</style>
