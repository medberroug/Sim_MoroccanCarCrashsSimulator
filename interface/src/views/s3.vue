<template>
  <div>
    <h1>Scénario 3 : parametre (-10%) est {{myIter}} donc : -{{myIter*10}}%</h1>
    <v-row wrap class="mt-4">
      <v-flex xs12 md12 lg12 class="px-12">
        <strong>Question 1 : Simulation des 8 indicateurs (2019 => 2030)</strong>
        <v-row wrap class="mt-4">
           <v-container class="myChartClass">
            <line-chart :chartData="dataForCharts[0][0]" cat="1" :options="chartOptions" />
          </v-container>
          <v-container class="myChartClass">
            <line-chart :chartData="dataForCharts[0][0]" cat="2" :options="chartOptions" />
          </v-container>
          <v-container class="myChartClass">
            <line-chart :chartData="dataForCharts[0][0]"  cat="3" :options="chartOptions" />
          </v-container>
          <v-container class="myChartClass">
            <line-chart :chartData="dataForCharts[0][0]"  cat="4" :options="chartOptions" />
          </v-container>
          <v-flex lg12>
            <v-data-table
              :headers="myList[0].headers"
              :items="myList[0].values"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-flex>
        </v-row>
      </v-flex>
    </v-row>
    <v-row wrap class="mt-6">
      <v-flex xs12 md12 lg12 class="px-12">
        <strong>Question 2 : 40 Simulations avec IC et MOY</strong>
        <v-container v-for="(item,i) in myList" :key="i">
          <v-row wrap class="mt-4">
              <v-container class="myChartClass">
            <line-chart :chartData="dataForCharts[0][i]" cat="1" :options="chartOptions" />
          </v-container>
          <v-container class="myChartClass">
            <line-chart :chartData="dataForCharts[0][i]" cat="2" :options="chartOptions" />
          </v-container>
          <v-container class="myChartClass">
            <line-chart :chartData="dataForCharts[0][i]"  cat="3" :options="chartOptions" />
          </v-container>
          <v-container class="myChartClass">
            <line-chart :chartData="dataForCharts[0][i]"  cat="4" :options="chartOptions" />
          </v-container>
            <v-flex lg12>
              <v-data-table
                :headers="item.headers"
                :items="item.values"
                :items-per-page="5"
                class="elevation-1"
              ></v-data-table>
            </v-flex>
          </v-row>
        </v-container>
        <v-divider class="my-6"></v-divider>
        <strong>MOY: la moyenne sur 40 simulations</strong>
        <v-row wrap class="mt-4">
          <v-flex lg12>
            <v-data-table
              :headers="avgList.headers"
              :items="avgList.values"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-flex>
        </v-row>
        <v-divider class="my-6"></v-divider>
        <strong>IC: les intervalles de confiance</strong>
        <v-row wrap class="mt-4">
          
          <v-flex lg12>
            <v-data-table
              :headers="icList.headers"
              :items="icList.values"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-flex>
        </v-row>
      </v-flex>
    </v-row>
  </div>
</template>

<script>
import apiX from "../../services/api";
import Chart from "chart.js";
import LineChart from "../components/LineChart";
export default {
  components: {
    LineChart,
  },
  async mounted() {
    // console.log(this.$route.params);
    var result = await apiX.sendS3(
      {
        IX: this.$route.params.IX,
        IY: this.$route.params.IY,
        IZ: this.$route.params.IZ,
      },
      this.$route.params.IX,
      this.$route.params.IY,
      this.$route.params.IZ
    );
    this.myIter = result.data.iter;
    result.data = result.data.a;
    this.dataForCharts = result.data;
    for (var i = 0; i < 40; i++) {
      var myTablo = {
        headers: [
          {
            text: "iteration N°: " + (i + 1).toString(),
            align: "start",
            sortable: false,
            value: "name",
          },
          { text: "NTAC", value: "NTAC" },
          { text: "NTAM", value: "NTAM" },
          { text: "NTANM", value: "NTANM" },
          { text: "NTT", value: "NTT" },
          { text: "NTB", value: "NTB" },
          { text: "NTBG", value: "NTBG" },
          { text: "NTBL", value: "NTBL" },
          { text: "NMTJ", value: "NMTJ" },
        ],
        values: [],
      };
      for (let j = 0; j < 13; j++) {
        let item = {
          name: null,
          NTAC: null,
          NTAM: null,
          NTANM: null,
          NTT: null,
          NTB: null,
          NTBG: null,
          NTBL: null,
          NMTJ: null,
        };
        item.name = 2018 + j;
        item.NTAC = result.data[0][i][0][j];
        item.NTAM = result.data[0][i][1][j];
        item.NTANM = result.data[0][i][2][j];
        item.NTT = result.data[0][i][3][j];
        item.NTB = result.data[0][i][4][j];
        item.NTBG = result.data[0][i][5][j];
        item.NTBL = result.data[0][i][6][j];
        item.NMTJ = result.data[0][i][7][j];
        myTablo.values.push(item);
      }
      this.myList.push(myTablo);
    }
    for (var p = 0; p < 13; p++) {
      let item = {
        name: null,
        NTAC: null,
        NTAM: null,
        NTANM: null,
        NTT: null,
        NTB: null,
        NTBG: null,
        NTBL: null,
        NMTJ: null,
      };
      item.name = 2018 + p;
      item.NTAC = result.data[1][0][0][p];
      item.NTAM = result.data[1][1][0][p];
      item.NTANM = result.data[1][2][0][p];
      item.NTT = result.data[1][3][0][p];
      item.NTB = result.data[1][4][0][p];
      item.NTBG = result.data[1][5][0][p];
      item.NTBL = result.data[1][6][0][p];
      item.NMTJ = result.data[1][7][0][p];
      this.avgList.values.push(item);
    }
    for (var p = 0; p < 13; p++) {
      let item = {
        name: null,
        NTAC: null,
        NTAM: null,
        NTANM: null,
        NTT: null,
        NTB: null,
        NTBG: null,
        NTBL: null,
        NMTJ: null,
      };
      item.name = 2018 + p;
      item.NTAC = result.data[1][0][1][p];
      item.NTAM = result.data[1][1][1][p];
      item.NTANM = result.data[0][2][1][p];
      item.NTT = result.data[1][3][1][p];
      item.NTB = result.data[1][4][1][p];
      item.NTBG = result.data[1][5][1][p];
      item.NTBL = result.data[1][6][1][p];
      item.NMTJ = result.data[1][7][1][p];
      this.icList.values.push(item);
    }
  },
  data() {
    return {
      dataForCharts: null,

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },

      chart: [],
      myIter: null,
      myList: [],
      avgList: {
        headers: [
          {
            text: "MOY",
            align: "start",
            sortable: false,
            value: "name",
          },
          { text: "NTAC", value: "NTAC" },
          { text: "NTAM", value: "NTAM" },
          { text: "NTANM", value: "NTANM" },
          { text: "NTT", value: "NTT" },
          { text: "NTB", value: "NTB" },
          { text: "NTBG", value: "NTBG" },
          { text: "NTBL", value: "NTBL" },
          { text: "NMTJ", value: "NMTJ" },
        ],
        values: [],
      },
      icList: {
        headers: [
          {
            text: "IC",
            align: "start",
            sortable: false,
            value: "name",
          },
          { text: "NTAC", value: "NTAC" },
          { text: "NTAM", value: "NTAM" },
          { text: "NTANM", value: "NTANM" },
          { text: "NTT", value: "NTT" },
          { text: "NTB", value: "NTB" },
          { text: "NTBG", value: "NTBG" },
          { text: "NTBL", value: "NTBL" },
          { text: "NMTJ", value: "NMTJ" },
        ],
        values: [],
      },
    };
  },
  methods: {},
};
</script>

<style>
.myChartClass {
  width: 500px;
  height: 400px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
