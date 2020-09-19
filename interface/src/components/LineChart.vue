
<script>
import { Line } from "vue-chartjs";
export default {
  mixins: [Line],
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    cat: { type: String },
    options: {
      type: Object,
    },
    chartColors: {
      type: Object,
    },
  },
  mounted() {
   
    var dates = [];
    var tot = [];
    for (let i = 2018; i < 2031; i++) {
      dates.push(i);
   
    }
    const totals = this.chartData[0];

    // Colors: {
    //     borderColor: "#784F41",
    //     pointBorderColor: "#784F41",
    //     pointBackgroundColor: "#BBE5ED",
    //     backgroundColor: "#BBE5ED",
    //   },
    var varDat = null;

    var dat1 = [
      {
        label: "NTAC",
        fill: false,
        data: this.chartData[0],
        borderColor: "#2114d9",
        pointBorderColor: "#ffffff",
        // pointBackgroundColor: pointBackgroundColor,
        backgroundColor: "#2114d9",
      },
      {
        label: "NTANM",
        fill: false,
        data: this.chartData[2],
        borderColor: "#0cb330",
        pointBorderColor: "#ffffff",
        // pointBackgroundColor: pointBackgroundColor,
        backgroundColor: "#0cb330",
      },
      {
        label: "NTB",
        fill: false,
        data: this.chartData[4],
        borderColor: "#ed8b13",
        pointBorderColor: "#ffffff",
        // pointBackgroundColor: pointBackgroundColor,
        backgroundColor: "#ed8b13",
      },
      {
        label: "NTBL",
        fill: false,
        data: this.chartData[6],
        borderColor: "#d413ed",
        pointBorderColor: "#ffffff",
        // pointBackgroundColor: pointBackgroundColor,
        backgroundColor: "#d413ed",
      },
    ];
    var dat2 = [
      {
        label: "NTAM",
        fill: false,
        data: this.chartData[1],
        borderColor: "#2114d9",
        pointBorderColor: "#ffffff",
        // pointBackgroundColor: pointBackgroundColor,
        backgroundColor: "#2114d9",
      },
      {
        label: "NTT",
        fill: false,
        data: this.chartData[3],
        borderColor: "#0cb330",
        pointBorderColor: "#ffffff",
        // pointBackgroundColor: pointBackgroundColor,
        backgroundColor: "#0cb330",
      },
    ];
    var dat3 = [
      {
        label: "NTBG",
        fill: false,
        data: this.chartData[5],
        borderColor: "#2114d9",
        pointBorderColor: "#ffffff",
        // pointBackgroundColor: pointBackgroundColor,
        backgroundColor: "#2114d9",
      },
    ];
    var dat4 = [
      {
        label: "NMTJ",
        fill: false,
        data: this.chartData[7],
        borderColor: "#2114d9",
        pointBorderColor: "#ffffff",
        // pointBackgroundColor: pointBackgroundColor,
        backgroundColor: "#2114d9",
      },
    ];
    if (this.cat == "1") {
      varDat = dat1;
    } else if (this.cat == "2") {
      varDat = dat2;
    } else if (this.cat == "3") {
      varDat = dat3;
    } else {
      varDat = dat4;
    }
    this.renderChart(
      {
        labels: dates,
        datasets: varDat,
      },
      this.options
    );
  },
};
</script>

