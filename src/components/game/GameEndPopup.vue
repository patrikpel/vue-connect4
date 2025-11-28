<template>
  <q-dialog v-model="gameHasEnded">
    <q-card class="text-white" style="background: #1FA752">
      <q-card-section class="row items-center">
        <div class="text-h6" style="padding: 10px">{{ currentPlayer.name }} wins!</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { storeToRefs } from "pinia";

  import { useGameStore } from "stores/game.js";
  const gameStore = useGameStore();

  const { gameHasEnded, currentPlayer } = storeToRefs(gameStore);
</script>
