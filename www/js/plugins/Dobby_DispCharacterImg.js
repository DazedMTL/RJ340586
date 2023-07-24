//=============================================================================
// Dobby_DispCharacterImg.js
// 内容：キャラクターの立ち絵を表示させる
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc 立ち絵表示プラグイン
 * @author スタジオドビー
 * 
 * ============================================================================
 * 概要
 * ============================================================================
 * 立ち絵を表示させるプラグインです。
 */

//==============================
// * Actor Hud
//==============================
ImageManager.getDcharPos = function () {
    var dcharPosi = {
        "01": { "x1": -200, "x2": 87, "x3": 400, "y": -100 },  // クレア
        "02": { "x1": -200, "x2": 87, "x3": 400, "y": -120 },  // リルム
        "03": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // ノラ
        "04": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // ソフィア
        "05": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // アリシア
        "06": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // ギルド長アゴニア
        "07": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // ストルゲ
        "08": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // ピステ
        "09": { "x1": -230, "x2": 87, "x3": 370, "y": 0 },  // シモス
        "10": { "x1": -200 + 60, "x2": 87 + 60, "x3": 400 + 60, "y": -100 },  // イクト
        "11": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // セリス
        "12": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // セリス（マントあり）
        "13": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // レクス
        "14": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // 魔術師エラトマ
        "15": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // 王妃カロン
        "16": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // アトゥ将軍
        "17": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // エモニ
        "18": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // ルイド
        "19": { "x1": -200, "x2": 87, "x3": 400, "y": -100 },  // メイドのアミナ
        "20": { "x1": -230, "x2": 87, "x3": 370, "y": 0 },  // 吟遊詩人
        "21": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // アルマダ
        "22": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // コルス
        "23": { "x1": -200, "x2": 87, "x3": 400, "y": -100 },  // ゴート
        "24": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // 隻腕のオプロ
        "25": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // プセマ
        "26": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // アークメイジ
        "27": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // フォニ
        "28": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // エレオ
        "29": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // クレヴォ
        "30": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // 怪盗ペルノ
    };
    return dcharPosi;
};

//武器構えがあるキャラに関して
ImageManager.getDcharAdjustXPos = function () {
    var dcharPosi = {
        "013": { "x1": 0, "x2": -100, "x3": -100 },  // クレア
        "023": { "x1": 0, "x2": 0, "x3": 0 },  // リルム
        "033": { "x1": 0, "x2": -30, "x3": -30 },  // ノラ
        "043": { "x1": 0, "x2": 0, "x3": 0 },  // ソフィア
        "053": { "x1": 0, "x2": 0, "x3": 0 },  // アリシア
        "061": { "x1": 0, "x2": 0, "x3": 0 },  // ギルド長アゴニア
        "091": { "x1": 0, "x2": 0, "x3": 0 },  // シモス
        "111": { "x1": 0, "x2": 0, "x3": 0 },  // セリス
        "121": { "x1": 0, "x2": 0, "x3": 0 },  // セリス（マントあり）
        "131": { "x1": 0, "x2": 0, "x3": 0 },  // レクス
        "161": { "x1": 0, "x2": 0, "x3": 100 },  // アトゥ将軍
        "171": { "x1": 0, "x2": 0, "x3": 0 },  // エモニ
        "181": { "x1": 0, "x2": 0, "x3": 0 },  // ルイド
        "191": { "x1": 0, "x2": 0, "x3": 0 },  // メイドのアミナ
        "211": { "x1": 0, "x2": 0, "x3": 0 },  // アルマダ
        "231": { "x1": 0, "x2": 0, "x3": 0 },  // ゴート
        "291": { "x1": 0, "x2": 0, "x3": 0 }  // クレヴォ
    };
    return dcharPosi;
};

ImageManager.getDcharBustUpPos = function () {
    var dcharPosi = {
        "01": { "x1": -200, "x2": 87, "x3": 400, "y": -100 },  // クレア
        "02": { "x1": -200, "x2": 87, "x3": 400, "y": -180 },  // リルム
        "03": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // ノラ
        "04": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // ソフィア
        "05": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // アリシア
        "06": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // ギルド長アゴニア
        "07": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // ストルゲ
        "08": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // ピステ
        "09": { "x1": -230, "x2": 87, "x3": 370, "y": 0 },  // シモス
        "10": { "x1": -200, "x2": 87, "x3": 400, "y": -100 },  // イクト
        "11": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // セリス
        "12": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // セリス（マントあり）
        "13": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // レクス
        "14": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // 魔術師エラトマ
        "15": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // 王妃カロン
        "16": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // アトゥ将軍
        "17": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // エモニ
        "18": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // ルイド
        "19": { "x1": -200, "x2": 87, "x3": 400, "y": -100 },  // メイドのアミナ
        "20": { "x1": -230, "x2": 87, "x3": 370, "y": 0 },  // 吟遊詩人
        "21": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // アルマダ
        "22": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // コルス
        "23": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // ゴート
        "24": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // 隻腕のオプロ
        "25": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // プセマ
        "26": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // アークメイジ
        "27": { "x1": -200, "x2": 87, "x3": 400, "y": -180 },  // フォニ
        "28": { "x1": -200, "x2": 87, "x3": 400, "y": -180 },  // エレオ
        "29": { "x1": -200, "x2": 87, "x3": 400, "y": 0 },  // クレヴォ
        "30": { "x1": -200, "x2": 87, "x3": 400, "y": -50 },  // 怪盗ペルノ
    };
    return dcharPosi;
};

ImageManager.preloadEventImg = function (event) {
    var cleaVari = $gameVariables.value(Number(DobbycharImgCosplayPSt.cleaVariableNo));
    if (cleaVari == 0) {
        cleaVari = 1;
    }
    var zumiImg = new Array();
    var imgList = ImageManager.getActorCharImgCospalyList();
    var cosplayList = {};
    for (var j = 1; j < 5; j++) {
        var actor = $gameActors.actor(Number(j));
        var actorArmorList = imgList[Number(actor._actorId)];
        var equips = actor.equips();
        if (equips && equips.length > 3 && equips[3] != null) {
            var csoplayId = actorArmorList[equips[3].id];
            if (csoplayId && csoplayId != null) {
                cosplayList["0" + j] = Number(csoplayId);
            }
        }
    }


    event._list.forEach(function (value) {
        if (value && value.parameters &&
            value.parameters.length > 0 &&
            value.code == 356 &&
            (
                (value.parameters[0].indexOf('dobby_dispchara') != -1 &&
                    value.parameters[0].indexOf('skin') != -1)
                ||
                (value.parameters[0].indexOf('dobby_dispchara') != -1 &&
                    value.parameters[0].indexOf('bustUp') != -1)
            )
        ) {
            var codeSp = value.parameters[0].split(' ');
            for (var i = 2; i < codeSp.length; i++) {
                var codeSpTrim = codeSp[i].trim();
                if (codeSpTrim != "" &&
                    codeSpTrim != '0' &&
                    codeSpTrim != 'l' &&
                    codeSpTrim != 'c' &&
                    codeSpTrim != 'r' &&
                    !zumiImg.contains(codeSpTrim)) {

                    if ((codeSpTrim.indexOf('_n') == -1) &&
                        (codeSpTrim.indexOf('_u') == -1) &&
                        (codeSpTrim.indexOf('_f') == -1)) {
                        var charId = codeSpTrim.substring(0, 2);
                        if (charId == "01" ||
                            charId == "02" ||
                            charId == "03" ||
                            charId == "04") {
                            var cospLayId = cosplayList[charId];
                            if (cospLayId && cospLayId != null) {
                                ImageManager.loadBitmap('img/pictures/charGraph/', new String(codeSpTrim + "_" + cospLayId), null, true);
                            } else {
                                if (charId == "01") {
                                    ImageManager.loadBitmap('img/pictures/charGraph/', new String(codeSpTrim + "_" + cleaVari), null, true);
                                } else {
                                    ImageManager.loadBitmap('img/pictures/charGraph/', new String(codeSpTrim), null, true);
                                }
                            }

                        } else {
                            ImageManager.loadBitmap('img/pictures/charGraph/', new String(codeSpTrim), null, true);
                        }
                    } else if (codeSpTrim.indexOf('_f') != -1) {
                        var tmpCodeSpTrim = codeSpTrim.replace('_f', '');
                        ImageManager.loadBitmap('img/pictures/charGraph/', new String(tmpCodeSpTrim), null, true);
                    } else {
                        ImageManager.loadBitmap('img/pictures/charGraph/', new String(codeSpTrim), null, true);
                    }
                    zumiImg.push(codeSpTrim);
                }

            }
        } else if (value && value.parameters &&
            value.parameters.length > 0 &&
            value.code == 355 &&
            (value.parameters[0].indexOf('ImageManager.dobbyDispMoveingEventCharImg') != -1 ||
                value.parameters[0].indexOf('SceneManager._scene.dobbyDispMoveingEventCharImg') != -1
            )) {

            var a1 = value.parameters[0].replace("(", "___").split("___");
            var a2 = a1[1].split(",");
            var id = a2[0].replace("'", "").replace("'", "");
            if (!zumiImg.contains(id)) {
                if (id.indexOf('_n' == -1) &&
                    id.indexOf('_u' == -1) &&
                    id.indexOf('_f' == -1)) {
                    var charId = id.substring(0, 2);
                    if (charId == "01" ||
                        charId == "02" ||
                        charId == "03" ||
                        charId == "04") {
                        var cospLayId = cosplayList[charId];
                        if (cospLayId && cospLayId != null) {
                            ImageManager.loadBitmap('img/pictures/charGraph/', new String(id + "_" + cospLayId), null, true);
                        } else {
                            if (charId == "01") {
                                ImageManager.loadBitmap('img/pictures/charGraph/', new String(id + "_" + cleaVari), null, true);
                            } else {
                                ImageManager.loadBitmap('img/pictures/charGraph/', new String(id), null, true);
                            }
                        }

                    } else {
                        ImageManager.loadBitmap('img/pictures/charGraph/', new String(id), null, true);
                    }
                } else if (id.indexOf('_f' != -1)) {
                    var tmpidTrim = id.replace('_f', '');
                    ImageManager.loadBitmap('img/pictures/charGraph/', new String(tmpidTrim), null, true);
                } else {
                    ImageManager.loadBitmap('img/pictures/charGraph/', new String(id), null, true);
                }
                zumiImg.push(id);
            }
        }
    });
};


ImageManager.getActorImgPosCenterX = function (actorId) {
    var tmpPos = this.getDcharPos();
    var strActorId = "0" + actorId;
    var xpos = tmpPos[strActorId]
    return Number(xpos["x2"]);
};

ImageManager.getActorBattleImgAdjustY = function (actorId) {
    var rtnNum = 0;
    switch (actorId) {
        case 3:
        case 4:
            rtnNum = 100;
            break;
    }
    return rtnNum;
};

ImageManager.getActorBattleResultImgAdjustY = function (actorId) {
    var rtnNum = 0;
    switch (actorId) {
        case 1:
            rtnNum = 400;
            break;
        case 2:
            rtnNum = 400;
            break;
        case 3:
            rtnNum = 500;
            break;
        case 4:
            rtnNum = 500;
            break;
    }
    return rtnNum;
};

ImageManager.getActorStatusImgAdjustY = function (actorId) {
    var rtnNum = 0;
    switch (actorId) {
        case 2:
            rtnNum = -50;
            break;
        case 3:
            rtnNum = 70;
            break;
        case 4:
            rtnNum = 30;
            break;
    }
    return rtnNum;
};

var nowScene = null;
// 馬車演出用関数ここから================================================================================
Scene_Base.prototype.preloadMovingImg = function (eventObj) {
    var cleaVari = $gameVariables.value(Number(DobbycharImgCosplayPSt.cleaVariableNo));
    if (cleaVari == 0) {
        cleaVari = 1;
    }
    var zumiImg = new Array();
    var zumiImgPos = new Array();
    var imgList = ImageManager.getActorCharImgCospalyList();
    var dcharPos = ImageManager.getDcharPos();
    var dcharBustUpPos = ImageManager.getDcharBustUpPos();
    var cosplayList = {};

    for (var j = 1; j < 5; j++) {
        var actor = $gameActors.actor(Number(j));
        var actorArmorList = imgList[Number(actor._actorId)];
        var equips = actor.equips();
        if (equips && equips.length > 3 && equips[3] != null) {
            var csoplayId = actorArmorList[equips[3].id];
            if (csoplayId && csoplayId != null) {
                cosplayList["0" + j] = Number(csoplayId);
            }
        }
    }


    this._dMoveCharimgList = {};
    var object = this._dMoveCharimgList;
    var imgBase = this._basedCharimgBase;
    eventObj._list.forEach(function (value) {
        if (value && value.parameters &&
            value.parameters.length > 0 &&
            value.code == 355 &&
            //value.parameters[0] instanceof String &&
            (value.parameters[0].indexOf('ImageManager.dobbyDispMoveingEventCharImg') != -1 ||
                value.parameters[0].indexOf('SceneManager._scene.dobbyDispMoveingEventCharImg') != -1
            )) {

            var a1 = value.parameters[0].replace("(", "___").split("___");
            var idandPostmp = a1[1].split(",");
            var id = idandPostmp[0].replace("'", "").replace("'", "");
            var pos = idandPostmp[1].replace("'", "").replace("'", "").replace(");", "");
            var bitmap = null;
            if (!zumiImg.contains(id + "_" + pos)) {
                if ((id.indexOf('_n') == -1) &&
                    (id.indexOf('_u') == -1)) {
                    var charId = id.substring(0, 2);
                    if (charId == "01" ||
                        charId == "02" ||
                        charId == "03" ||
                        charId == "04") {
                        var cospLayId = cosplayList[charId];
                        if (cospLayId && cospLayId != null) {
                            bitmap = ImageManager.loadBitmap('img/pictures/charGraph/', new String(id + "_" + cospLayId), null, true);
                        } else {
                            if (charId == "01") {
                                bitmap = ImageManager.loadBitmap('img/pictures/charGraph/', new String(id + "_" + cleaVari), null, true);
                            } else {
                                bitmap = ImageManager.loadBitmap('img/pictures/charGraph/', new String(id), null, true);
                            }
                        }

                    } else {
                        bitmap = ImageManager.loadBitmap('img/pictures/charGraph/', new String(id), null, true);
                    }
                } else {
                    bitmap = ImageManager.loadBitmap('img/pictures/charGraph/', new String(id), null, true);
                }
                var sprite = new Sprite(bitmap);
                var charId = id.substring(0, 2);
                var charPos = dcharPos[charId];
                var posy = Number(charPos["y"]);
                sprite.y = posy;
                sprite.setColorTone([-60, -60, -60, 0]);
                sprite.opacity = 0;
                sprite.scale.x = 0.607;
                sprite.scale.y = 0.607;
                var posx = 0
                switch (pos) {
                    case 'l':
                        posx = Number(charPos["x1"]);
                        break;
                    case 'c':
                        posx = Number(charPos["x2"]);
                        break;
                    case 'r':
                        posx = Number(charPos["x3"]);
                        break;
                }

                sprite.x = posx;
                object[id + "_" + pos] = sprite;
                imgBase.addChild(object[id + "_" + pos]);
                zumiImg.push(id + "_" + pos);
            }
        }
    });

    this._beforeImgPosLeft = "";
    this._beforeImgPosRigt = "";
    this._beforeImgPosCenter = "";
    this._beforeImgPos = "";
};


Scene_Base.prototype.dobbyDispMoveingEventCharImg = function (id, pos) {
    if (this._beforeImgPos != "" && this._beforeImgPos != null) {
        this._dMoveCharimgList[this._beforeImgPos].setColorTone([-60, -60, -60, 0]);
    }
    if (this._beforeImgPosLeft != "" && this._beforeImgPosLeft != null) {
        if (this._beforeImgPosLeft.split("_")[1] == pos) {
            this._dMoveCharimgList[this._beforeImgPosLeft].opacity = 0;
        }
    }
    if (this._beforeImgPosRigt != "" && this._beforeImgPosRigt != null) {
        if (this._beforeImgPosRigt.split("_")[1] == pos) {
            this._dMoveCharimgList[this._beforeImgPosRigt].opacity = 0;
        }
    }
    if (this._beforeImgPosCenter != "" && this._beforeImgPosCenter != null) {
        if (this._beforeImgPosCenter.split("_")[1] == pos) {
            this._dMoveCharimgList[this._beforeImgPosCenter].opacity = 0;
        }
    }

    var e = id + "_" + pos;
    this._dMoveCharimgList[e].opacity = 255;
    this._dMoveCharimgList[e].setColorTone([0, 0, 0, 0]);
    switch (pos) {
        case 'l':
            this._beforeImgPosLeft = e;
            break;
        case 'c':
            this._beforeImgPosCenter = e;
            break;
        case 'r':
            this._beforeImgPosRigt = e;
            break;
    }
    this._beforeImgPos = e;
    return;
};

Scene_Base.prototype.dispMoveClear = function () {
    if (this._beforeImgPos != "" && this._beforeImgPos != null) {
        this._dMoveCharimgList[this._beforeImgPos].opacity = 0;
    }
    if (this._beforeImgPosLeft != "" && this._beforeImgPosLeft != null) {
        this._dMoveCharimgList[this._beforeImgPosLeft].opacity = 0;
    }
    if (this._beforeImgPosRigt != "" && this._beforeImgPosRigt != null) {
        this._dMoveCharimgList[this._beforeImgPosRigt].opacity = 0;
    }
    if (this._beforeImgPosCenter != "" && this._beforeImgPosCenter != null) {
        this._dMoveCharimgList[this._beforeImgPosCenter].opacity = 0;
    }
    this._beforeImgPosRigt = "";
    this._beforeImgPosCenter = "";
    this._beforeImgPosLeft = "";
    this._beforeImgPos = "";

    return;
};

Scene_Base.prototype.dispMoveAllClear = function () {
    this._dMoveCharimgList = null;
    this._beforeImgPosRigt = null;
    this._beforeImgPosCenter = null;
    this._beforeImgPosLeft = null;
    this._beforeImgPos = null;

    return;
};

// 馬車演出用関数ここまで================================================================================
var _targetCosplayImg = ["01", "02", "03", "04"];

function getCharCosplayImgByImgNumber(imgNumber) {
    if (imgNumber != "0" && _targetCosplayImg.indexOf(imgNumber.substr(0, 2)) != -1 &&
        imgNumber.indexOf('_n') == -1 && imgNumber.indexOf('_u') == -1 && imgNumber.indexOf('_f') == -1) {
        var actor = $gameActors.actor(Number(imgNumber.substr(1, 1)));
        return getCharCosplayFacialExpressionImg(actor, imgNumber);
    } else {
        if (imgNumber.indexOf('_f') != -1) {
            imgNumber = imgNumber.replace("_f", "");
        }
        return ImageManager.loadBitmap('img/pictures/charGraph/', new String(imgNumber), null, true);
    }
};

(function () {
    var pluginName = "dobby_dispchara";
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            switch (args[0]) {
                case 'skin':
                    this.dobbyCharimgView(false, args);
                    this.wait(10);
                    break;
                case 'bustUp':
                    this.dobbyCharimgView(true, args);
                    this.wait(10);
                    break;
                case 'allBlack':
                    this.dobbyCharimgView(false, args);
                    this.wait(10);
                    break;
                case 'clear':
                    SceneManager._scene._dcentercharImg.opacity = 0;
                    SceneManager._scene._drightcharImg.opacity = 0;
                    SceneManager._scene._dLeftcharImg.opacity = 0;
                    break;
                case 'allClear':
                    SceneManager._scene._basedCharimgBase.removeChild(SceneManager._scene._dcentercharImg);
                    SceneManager._scene._basedCharimgBase.removeChild(SceneManager._scene._drightcharImg);
                    SceneManager._scene._basedCharimgBase.removeChild(SceneManager._scene._dLeftcharImg);
                    break;
                case 'add':
                    SceneManager._scene._basedCharimgBase.addChild(SceneManager._scene._dcentercharImg);
                    SceneManager._scene._basedCharimgBase.addChild(SceneManager._scene._drightcharImg);
                    SceneManager._scene._basedCharimgBase.addChild(SceneManager._scene._dLeftcharImg);
                    break;
            }
        }
    };

    Game_Interpreter.prototype.dobbyCharimgView = function (isBustUp, args, black) {
        var dcharPos = ImageManager.getDcharPos();
        var dcharBustUpPos = ImageManager.getDcharBustUpPos();

        var rightRightOn = false;
        var rightCenterOn = false;
        var rightLeftOn = false;
        for (var i = 1; i < args.length; i++) {
            var argi = new String(args[i]);
            if ((!isNaN(args[i]) && Number(args[i]) !== 0) ||
                (argi != "" &&
                    (argi.indexOf('_n') != -1
                        ||
                        argi.indexOf('_u') != -1
                        ||
                        argi.indexOf('_f') != -1)
                )
            ) {

                var charId = args[i].substring(0, 2);
                var charPos = dcharPos[charId];
                var bustUpPos = dcharBustUpPos[charId];
                var posx = Number(charPos["x" + String(i)]) + (isBustUp ? -280 : 0);

                if (!isBustUp) {
                    var dcharWeponAdjustXPos = ImageManager.getDcharAdjustXPos();
                    var charAdujstId = args[i].substring(0, 3);
                    var charWeponAdjustX = dcharWeponAdjustXPos[charAdujstId];
                    if (charWeponAdjustX && charWeponAdjustX != null) {
                        posx = posx + charWeponAdjustX["x" + String(i)];
                    }
                }

                var posy = Number(charPos["y"]) + (isBustUp ? (Number(bustUpPos["y"])) : 0);
                switch (i) {
                    case 1:
                        rightLeftOn = true;
                        SceneManager._scene._dLeftcharImg.bitmap = getCharCosplayImgByImgNumber(args[i]);

                        SceneManager._scene._dLeftcharImg.x = Number(posx);
                        SceneManager._scene._dLeftcharImg.y = Number(posy);
                        if (!isBustUp) {
                            SceneManager._scene._dLeftcharImg.scale.x = 0.607;
                            SceneManager._scene._dLeftcharImg.scale.y = 0.607;
                        } else {
                            SceneManager._scene._dLeftcharImg.scale.x = 1.000;
                            SceneManager._scene._dLeftcharImg.scale.y = 1.000;
                        }
                        SceneManager._scene._dLeftcharImg._refresh();
                        SceneManager._scene._dLeftcharImg.opacity = 255;
                        break;
                    case 2:
                        rightCenterOn = true;
                        SceneManager._scene._dcentercharImg.bitmap = getCharCosplayImgByImgNumber(args[i]);
                        SceneManager._scene._dcentercharImg.x = Number(posx);
                        SceneManager._scene._dcentercharImg.y = Number(posy);
                        if (!isBustUp) {
                            SceneManager._scene._dcentercharImg.scale.x = 0.607;
                            SceneManager._scene._dcentercharImg.scale.y = 0.607;
                        } else {
                            SceneManager._scene._dcentercharImg.scale.x = 1.000;
                            SceneManager._scene._dcentercharImg.scale.y = 1.000;
                        }
                        SceneManager._scene._dcentercharImg._refresh();
                        SceneManager._scene._dcentercharImg.opacity = 255;
                        break;
                    case 3:
                        rightRightOn = true;
                        SceneManager._scene._drightcharImg.bitmap = getCharCosplayImgByImgNumber(args[i]);
                        SceneManager._scene._drightcharImg.x = Number(posx);
                        SceneManager._scene._drightcharImg.y = Number(posy);
                        if (!isBustUp) {
                            SceneManager._scene._drightcharImg.scale.x = 0.607;
                            SceneManager._scene._drightcharImg.scale.y = 0.607;
                        } else {
                            SceneManager._scene._drightcharImg.scale.x = 1.000;
                            SceneManager._scene._drightcharImg.scale.y = 1.000;
                        }
                        SceneManager._scene._drightcharImg._refresh();
                        SceneManager._scene._drightcharImg.opacity = 255;
                        break;
                    default:
                        alert("キャラ設定の値が間違えてます。");
                        break;
                }
            }
        }

        SceneManager._scene._dLeftcharImg.setColorTone([-60, -60, -60, 0]);
        SceneManager._scene._dcentercharImg.setColorTone([-60, -60, -60, 0]);
        SceneManager._scene._drightcharImg.setColorTone([-60, -60, -60, 0]);
        if (args.length > 4 && args[4] != "") {
            if (args[4].indexOf('l') != -1) {
                SceneManager._scene._dLeftcharImg.setColorTone([0, 0, 0, 0]);
            }
            if (args[4].indexOf('c') != -1) {
                SceneManager._scene._dcentercharImg.setColorTone([0, 0, 0, 0]);
            }
            if (args[4].indexOf('r') != -1) {
                SceneManager._scene._drightcharImg.setColorTone([0, 0, 0, 0]);
            }
        } else {
            if (rightLeftOn || rightCenterOn || rightRightOn) {
                if (rightLeftOn) {
                    SceneManager._scene._dLeftcharImg.setColorTone([0, 0, 0, 0]);
                }

                if (rightCenterOn) {
                    SceneManager._scene._dcentercharImg.setColorTone([0, 0, 0, 0]);
                }

                if (rightRightOn) {
                    SceneManager._scene._drightcharImg.setColorTone([0, 0, 0, 0]);
                }
            }
        }
    }
    var D_Scene_Base_prototype_createWindowLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function () {
        this._basedCharimgBase = new Sprite();
        this._dLeftcharImg = new Sprite();
        this._dcentercharImg = new Sprite();
        this._drightcharImg = new Sprite();
        this.addChild(this._basedCharimgBase);
        this._basedCharimgBase.addChild(this._dLeftcharImg);
        this._basedCharimgBase.addChild(this._drightcharImg);
        this._basedCharimgBase.addChild(this._dcentercharImg);
        D_Scene_Base_prototype_createWindowLayer.call(this);
    };
}());//EOF


