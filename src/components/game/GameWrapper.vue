<template>
  <div id="game-wrapper">
    <GameMatrix/>
    <StopGame/>
  </div>
</template>

<script setup>
  import StopGame from "components/game/StopGame.vue";
  import GameMatrix from "components/game/GameMatrix.vue";
</script>

<style scoped>
  #game-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
</style>
