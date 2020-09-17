//! La fonction generatrice de NA.
module.exports.alea = function alea(IX, IY, IZ) {
    var inter;
    IX = 171 * (IX % 177) - 2 * (IX / 177);
    IY = 172 * (IY % 176) - 35 * (IY / 176);
    IZ = 170 * (IZ % 178) - 63 * (IZ / 178);
    if (IX < 0) {
        IX = IX + 30269;
    }
    if (IY < 0) {
        IY = IY + 30307;
    }
    if (IZ < 0) {
        IZ = IZ + 30323;
    }
    inter = ((IX / 30269) + (IY / 30307) + (IZ / 30323));
    var var_alea = inter - parseInt(inter);
    return var_alea;
}


//! le controleur qui nous donne la valeur precis a partir d'un intervalle de progression/ regression 
module.exports.rangeController = rangeController = function rangeController(a, b, VA) {
    return ((b - a) * VA + a)
}

//! le controleur qui fixe le taux NTAC 
module.exports.ntacTauxController = function ntacTauxController(VA1, VA2) {
    var result;
    if (VA1 < 0.1) {
        result = rangeController(-3, 0, VA2)
        // console.log("VA1 < 0.1");
    } else if (VA1 < 0.37) {
        result = rangeController(0, 2, VA2)
        // console.log("VA1 < 0.37");
    } else if (VA1 < 0.64) {
        result = rangeController(2, 4, VA2)
        // console.log("VA1 < 0.64");
    } else if (VA1 < 0.78) {
        result = rangeController(4, 7, VA2)
        // console.log("VA1 < 0.78");
    } else if (VA1 < 0.92) {
        result = rangeController(7, 11, VA2)
        // console.log("VA1 < 0.92");
    } else {
        result = rangeController(11, 14, VA2)
        // console.log("else");
    }
    return result
}