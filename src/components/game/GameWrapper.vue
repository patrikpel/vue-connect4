<template>
  <GameEndPopup v-if="gameHasEnded"/>
  <div id="game-wrapper" v-else-if="gameIsOngoing">
    <GameMatrix/>
    <StopGame/>
  </div>
</template>

<script setup>
  import StopGame from "components/game/StopGame.vue";
  import GameMatrix from "components/game/GameMatrix.vue";
  import GameEndPopup from "components/game/GameEndPopup.vue";

  import { storeToRefs } from "pinia";

  import { useGameStore } from "stores/game.js";
  const gameStore = useGameStore();

  const { gameIsOngoing, gameHasEnded } = storeToRefs(gameStore);
</script>

<style scoped>
  #game-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
</style>
