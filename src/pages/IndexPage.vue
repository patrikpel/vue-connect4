<template>
  <q-page class="flex flex-center">
    <div v-if="!gameIsOngoing" style="width: fit-content; height: fit-content;">
      <RegisterPlayers/>
    </div>
    <div v-else>
      <!-- TODO TÄHÄN PELILOGIIKKAA -->
    </div>
  </q-page>
</template>

<script setup>
  import RegisterPlayers from "components/players/RegisterPlayers.vue";
  import { useGameStore } from "stores/game.js";
  import { storeToRefs } from 'pinia';
  const gameStore = useGameStore();

  const { gameIsOngoing } = storeToRefs(gameStore);
</script>
