<template>
  <AddPlayer/>

  <div id="playerlist" style="padding: 10px 0">
    <span v-for="player in allPlayers" :key="player.id" style="width: 100%">
      <PlayerRow :player="player"/>
    </span>
  </div>

  <div style="text-align: center">
    <StartGame/>
  </div>
</template>

<script setup>
  import AddPlayer from 'components/players/AddPlayer.vue';
  import PlayerRow from 'components/players/PlayerRow.vue';
  import { usePlayersStore } from "stores/players.js";
  import { storeToRefs } from 'pinia';
  import StartGame from "components/game/StartGame.vue";

  const playersStore = usePlayersStore();

  const { allPlayers } = storeToRefs(playersStore);
</script>
