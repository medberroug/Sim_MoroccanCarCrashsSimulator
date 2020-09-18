<template>
  <v-app class="pa-6">
    <v-app-bar app flat color="dark" dark>
      <div class="d-flex align-center">
        <H2>Projet Simulation</H2>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-btn
          depressed
          class="mx-2"
          :to="`/S1/${this.$route.params.IX}/${this.$route.params.IY}/${this.$route.params.IZ}`"
        >Scénario 1</v-btn>
        <v-divider vertical></v-divider>
        <v-btn depressed class="mx-2"
        :to="`/S2/${this.$route.params.IX}/${this.$route.params.IY}/${this.$route.params.IZ}`">Scénario 2</v-btn>
        <v-divider vertical></v-divider>
        <v-btn depressed class="mx-2"
        :to="`/S3/${this.$route.params.IX}/${this.$route.params.IY}/${this.$route.params.IZ}`">Scénario 3</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},

  data: () => ({
    //
  }),
};
</script>

<style>
.total {
}
</style>