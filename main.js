var controllers = require('./controllers')
var math = require('mathjs');
const {
    log
} = require('mathjs');


//! Simulation :une seule simulation globale

function simulateur(IX, IY, IZ,reduction) {
    //! Variable systeme:
    var years = 13;

    //! Generer par Alea un tableau de VA (200):
    var randomVar = []
    for (var i = 0; i < 150; i++) {
        randomVar.push(controllers.alea(IX, IY, IZ))
        IX = IX + parseInt(randomVar[i] / 100) + 1
        IY = IY + parseInt(randomVar[i] / 100) + 2
        IZ = IX + parseInt(randomVar[i] / 100) + 3
        if (IX > 30000 || IY > 30000 || IZ > 30000) {
            console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ deborda §§§§§§§§§§§§§§§§§§§§§§§§§§§§§");
        }
    }
    //! entrer les données referances ainsi que les taux initiaux:
    var NTAC = [96133];
    var NTAM = [3066];
    var NTANM = [93067];
    var NTT = [3485];
    var NTB = [136974];
    var NTBG = [8725];
    var NTBL = [128249];
    var NMTJ = [9.55];
    //! Boucle generatrice des indicateurs a simuler
    for (var i = 1; i < years; i++) {
        //TODO Calcule NTAC
        NTAC.push(parseInt(NTAC[i - 1] * (1 + controllers.ntacTauxController(randomVar[i * 3], randomVar[i * 7],reduction) / 100)))
        //TODO Calcule NTAM
        if (randomVar[i * 3 + 91] < 0.8) {
            NTAM.push(parseInt(((NTAM[i - 1] / NTAC[i - 1]) * 100 + controllers.rangeController(-0.25, 0, randomVar[i * 5 + 80],reduction)) * NTAC[i] * 0.01))
        } else {
            NTAM.push(parseInt(((NTAM[i - 1] / NTAC[i - 1]) * 100 + controllers.rangeController(-0.45, -0.25, randomVar[i * 5 + 80],reduction)) * NTAC[i] * 0.01))
        }
        //TODO Calcule NTANM
        NTANM.push(NTAC[i] - NTAM[i])
        //TODO Calcule NTT
        NTT.push(parseInt(
            ((NTT[i - 1] / NTAM[i - 1]) * 100 + controllers.rangeController(-3, 1.5, randomVar[i * 5 + 10],reduction)) * NTAM[i] * 0.01
        ))
        //TODO Calcule NTB
        NTB.push(parseInt(
            (((NTB[i - 1] / NTAC[i - 1]) * 100 + controllers.rangeController(-4, 1, randomVar[i * 6 + 40],reduction))) * NTAC[i] * 0.01
        ))
        // TODO Calcule NTBG
        NTBG.push(parseInt(
            (controllers.rangeController(4, 9, randomVar[i * 8 + 25],reduction) / 100) * NTB[i]
        ))
        //TODO Calcule NTBL
        NTBL.push(parseInt(
            NTB[i] - NTBG[i]
        ))
        //TODO Calcule NMTJ
        NMTJ.push(parseFloat((NTT[i] / 365).toFixed(2)))
    }
    var result = []
    result.push(NTAC, NTAM, NTANM, NTT, NTB, NTBG, NTBL, NMTJ)
    // console.log("NTAC: ------------------------------------");
    // console.log(NTAC);
    // console.log("NTAM: ------------------------------------");
    // console.log(NTAM);
    // console.log("NTANM: ------------------------------------");
    // console.log(NTANM);
    // console.log("NTT: ------------------------------------");
    // console.log(NTT);
    // console.log("NTB: ------------------------------------");
    // console.log(NTB);
    // console.log("NTBG: ------------------------------------");
    // console.log(NTBG);
    // console.log("NTBL: ------------------------------------");
    // console.log(NTBL);
    // console.log("NMTJ: ------------------------------------");
    // console.log(NMTJ);
    // console.log(result);
    return result
}


var IX = 56 - 3;
var IY = 23 - 3;
var IZ = 100 - 3;

function loopSim(IX, IY, IZ, n,reduction) {
    var result = []
    for (var i = 0; i < n; i++) {
        IX = IX + 3
        IY = IY + 3
        IZ = IZ + 3
        result.push(simulateur(IX, IY, IZ,reduction))
    }
    return result
}
// var t = loopSim(IX, IY, IZ, 40)

function avgCalculator(myIndicatorList) {
    var avgList = []
    for (var i = 0; i < 13; i++) {
        var avgI = 0
        for (var j = 0; j < myIndicatorList.length; j++) {
            avgI = avgI + myIndicatorList[j][i]
        }
        avgI = parseFloat((avgI / 40).toFixed(2))
        avgList.push(avgI)
    }
    return avgList
}

function icCalculator(myIndicatorList) {
    var icList = []
    for (var i = 0; i < 13; i++) {
        var IndicatorListForAYear = []
        var moy = 0
        var ecart = 0
        var localIC = [0, 0]
        for (var j = 0; j < 40; j++) {
            IndicatorListForAYear.push(myIndicatorList[j][i])
        }
        moy = parseFloat(math.mean(IndicatorListForAYear).toFixed(2))
        ecart = parseFloat(math.std(IndicatorListForAYear).toFixed(2))
        localIC[0] = parseFloat((moy - (1.96 * ecart) / math.sqrt(40)).toFixed(2))
        localIC[1] = parseFloat((moy + (1.96 * ecart) / math.sqrt(40)).toFixed(2))
        icList.push(localIC)
    }
    return icList
}

function mathCalculator(myList) {
    var NTACList = []
    var NTAMList = []
    var NTANMList = []
    var NTTList = []
    var NTBList = []
    var NTBGList = []
    var NTBLList = []
    var NMTJList = []
    for (var i = 0; i < myList.length; i++) {
        NTACList.push(myList[i][0])
        NTAMList.push(myList[i][1])
        NTANMList.push(myList[i][2])
        NTTList.push(myList[i][3])
        NTBList.push(myList[i][4])
        NTBGList.push(myList[i][5])
        NTBLList.push(myList[i][6])
        NMTJList.push(myList[i][7])
    }
    // console.log(NTACList);
    console.log(avgCalculator(NTAMList));



}

mathCalculator(loopSim(IX, IY, IZ, 40,3))