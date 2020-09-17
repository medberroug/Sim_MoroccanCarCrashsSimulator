var controllers = require('./controllers')




//! Simulation :une seule simulation globale

function simulateur(IX, IY, IZ) {
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
        NTAC.push(parseInt(NTAC[i - 1] * (1 + controllers.ntacTauxController(randomVar[i * 3], randomVar[i * 7]) / 100)))
        //TODO Calcule NTAM
        if (randomVar[i * 3 + 91] < 0.8) {
            NTAM.push(parseInt(((NTAM[i - 1] / NTAC[i - 1]) * 100 + controllers.rangeController(-0.25, 0, randomVar[i * 5 + 80])) * NTAC[i] * 0.01))
        } else {
            NTAM.push(parseInt(((NTAM[i - 1] / NTAC[i - 1]) * 100 + controllers.rangeController(-0.45, -0.25, randomVar[i * 5 + 80])) * NTAC[i] * 0.01))
        }
        //TODO Calcule NTANM
        NTANM.push(NTAC[i] - NTAM[i])
        //TODO Calcule NTT
        NTT.push(parseInt(
            ((NTT[i - 1] / NTAM[i - 1]) * 100 + controllers.rangeController(-3, 1.5, randomVar[i * 5 + 10])) * NTAM[i] * 0.01
        ))
        //TODO Calcule NTB
        NTB.push(parseInt(
            (((NTB[i - 1] / NTAC[i - 1]) * 100 + controllers.rangeController(-4, 1, randomVar[i * 6 + 40]))) * NTAC[i] * 0.01
        ))
        // TODO Calcule NTBG
        NTBG.push(parseInt(
            (controllers.rangeController(4, 9, randomVar[i * 8 + 25]) / 100) * NTB[i]
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

function loopSim(IX, IY, IZ, n) {
    var result = []
    for (var i = 0; i < n; i++) {
        IX = IX + 3
        IY = IY + 3
        IZ = IZ + 3
        result.push(simulateur(IX, IY, IZ))
    }
    console.log(result);
    return result
}
var t = loopSim(IX, IY, IZ, 40)
var moyNTAC2030=0
var moyNTAM2030=0
for (var i = 0; i < 40; i++) {
    moyNTAC2030 = moyNTAC2030 + t[i][0][12]
    moyNTAM2030 = moyNTAM2030 + t[i][1][12]
    
}
console.log(moyNTAC2030/40);
console.log(moyNTAM2030/40);