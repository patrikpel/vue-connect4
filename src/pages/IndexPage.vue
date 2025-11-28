<template>
  <q-page class="flex flex-center">
    <div v-if="!gameIsOngoing">
      <AddPlayer/>

      <div id="playerlist" style="padding: 10px 0">
        <span v-for="player in allPlayers" :key="player.id" style="width: 100%">
          <PlayerRow :player="player"/>
        </span>
      </div>

      <div style="text-align: center">
        <StartGame/>
      </div>
    </div>
    <div v-else>
      <!-- TODO TÄHÄN PELILOGIIKKAA -->
    </div>
  </q-page>
</template>

<script setup>
  import AddPlayer from 'components/players/AddPlayer.vue';
  import PlayerRow from 'components/players/PlayerRow.vue';
  import { usePlayersStore } from "stores/players.js";
  import { useGameStore } from "stores/game.js";
  import { storeToRefs } from 'pinia';
  import StartGame from "components/game/StartGame.vue";

  const playersStore = usePlayersStore();
  const gameStore = useGameStore();

  const { allPlayers } = storeToRefs(playersStore);
  const { gameIsOngoing } = storeToRefs(gameStore);



</script>

<style scoped>
#playerlist {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
</style>
