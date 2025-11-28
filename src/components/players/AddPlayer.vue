<template>
  <div id="new-player-container">
    <input type="text" v-model="name">
    <button @click="playersStore.addPlayer(name)" class="blue-btn">Add Player</button>
  </div>
</template>

<script setup>
  import { usePlayersStore } from "stores/players.js";
  import { shallowRef } from "vue";

  const playersStore = usePlayersStore();
  const name = shallowRef("");
</script>

<style scoped>
  #new-player-container {
    display: flex;
    flex-direction: row;
    gap:5px;
  }
</style>
