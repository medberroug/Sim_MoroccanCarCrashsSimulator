<template>
  <div class="placer">
    <h1>Germes et données initiaux.</h1>
    <v-row wrap class="mt-3">
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

    <v-row wrap class="mt-4">
      <v-flex xs12 md12 lg2></v-flex>
      <v-flex xs12 md12 lg10>
        <strong>Entrez les valeurs de l'année de réferance:</strong>
        <v-row wrap class="mt-3">
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="NTAC" placeholder="valeur pour NTAC" v-model="NTACx"></v-text-field>
            </v-col>
          </v-flex>
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="NTAM" placeholder="valeur pour NTAM" v-model="NTAMx"></v-text-field>
            </v-col>
          </v-flex>
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="NTANM" placeholder="valeur pour NTANM" v-model="NTANMx"></v-text-field>
            </v-col>
          </v-flex>
        </v-row>
        <v-row wrap class="mt-3">
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="NTT" placeholder="valeur pour NTT" v-model="NTTx"></v-text-field>
            </v-col>
          </v-flex>
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="NTB" placeholder="valeur pour NTB" v-model="NTBx"></v-text-field>
            </v-col>
          </v-flex>
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="NTBG" placeholder="valeur pour NTBG" v-model="NTBGx"></v-text-field>
            </v-col>
          </v-flex>
        </v-row>
        <v-row wrap class="mt-3">
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="NTBL" placeholder="valeur pour NTBL" v-model="NTBLx"></v-text-field>
            </v-col>
          </v-flex>
          <v-flex lg3>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="NTMJ" placeholder="valeur pour NTMJ" v-model="NTMJx"></v-text-field>
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
      NTACx: 96133,
      NTAMx: 3066,
      NTANMx: 93067,
      NTTx: 3485,
      NTBx: 136974,
      NTBGx: 8725,
      NTBLx: 128249,
      NTMJx: 9.55,
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