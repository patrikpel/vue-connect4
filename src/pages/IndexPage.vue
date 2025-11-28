<template>
  <q-page class="flex flex-center">
    <div v-if="true">
      <!-- TODO PELIN ALOITUSLOGIIKKA -->
      <AddPlayer/>

      <div id="playerlist" style="padding-top: 10px">
        <span v-for="player in allPlayers" :key="player.id" style="width: 100%">
          <PlayerRow :player="player"/>
        </span>
      </div>
    </div>
    <div v-else>
      TODO TÄHÄN PELILOGIIKKAA
    </div>
  </q-page>
</template>

<script setup>
  import AddPlayer from 'src/components/players/AddPlayer.vue';
  import PlayerRow from 'src/components/players/PlayerRow.vue';
  import { usePlayersStore } from "src/stores/players.js";
  import { storeToRefs } from 'pinia';

  const playersStore = usePlayersStore();

  const { allPlayers } = storeToRefs(playersStore);

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
