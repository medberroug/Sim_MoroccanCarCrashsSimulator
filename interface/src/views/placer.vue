<template>
  <div class="placer">
    <h1>Germes et data initiaux.</h1>
    <v-row wrap class="mt-4">
      <v-flex xs12 md12 lg2></v-flex>
      <v-flex xs12 md12 lg10>
        <strong>Entrez des valeurs pour les germes initiaux qui doivent être comprises entre 1 et 30 000:</strong>
        <v-row wrap class="mt-3">
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="IX" placeholder="valeur pour IX" v-model="IX"></v-text-field>
            </v-col>
          </v-flex>
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="IY" placeholder="valeur pour IY" v-model="IY"></v-text-field>
            </v-col>
          </v-flex>
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="IZ" placeholder="valeur pour IZ" v-model="IZ"></v-text-field>
            </v-col>
          </v-flex>
        </v-row>
      </v-flex>
      <v-flex xs12 md12 lg2></v-flex>
    </v-row>

    <center>
      <v-btn depressed color="primary" @click="simulate()" :to="`/S1/${IX}/${IY}/${IZ}`">Simuler</v-btn>
    </center>
  </div>
</template>



<script>
import apiX from "../../services/api";
export default {
  data() {
    return {
      loader: false,
      IX: 9,
      IY: 40,
      IZ: 100,
    };
  },
  methods: {
    simulate() {
      this.loader = true;
    //   apiX.sendgerms({
    //     IX: this.IX,
    //     IY: this.IY,
    //     IZ: this.IZ,
    //   });
    },
  },
};
</script>

<style>
</style>