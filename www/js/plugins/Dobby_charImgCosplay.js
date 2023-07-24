//=============================================================================
// Dobby_charImgCosplay.js
// 内容：キャラクターの立ち絵表示プラグインのベースファイル
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc 立ち絵表示プラグインのベースファイル
 * @author スタジオドビー
 * 
 * ============================================================================
 * 概要
 * ============================================================================
 * Dobby_DispCharacterImgを使う際に必要なファイル。
 * Dobby_DispCharacterImgより上位にプラグインを設定してください。
 * 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、ゲーム内にて、ファストトラベルを実装するためのプラグインです
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法/PluginManager Setting
 *-----------------------------------------------------------------------------
 *-----------------------------------------------------------------------------
 * 変更履歴
 *-----------------------------------------------------------------------------
 * 
 * Ver 1.0.0 初版
 *-----------------------------------------------------------------------------
 *-----------------------------------------------------------------------------
 * 素材著作権
 *-----------------------------------------------------------------------------
 *-----------------------------------------------------------------------------
 * プラグインパラメータ
 *-----------------------------------------------------------------------------
 *-----------------------------------------------------------------------------
 * @param cleaVariableNo
 * @text クレアの成長度（村娘/冒険者/女神）を管理する変数番号
 * @type variable
 * @default 15
 * @desc クレアの成長度（村娘/冒険者/女神）を管理する変数番号
 */
//=============================================================================
var DobbycharImgCosplayPSt = DobbycharImgCosplayPSt || {};
var dobbycharImgCosplayPP = PluginManager.parameters('Dobby_charImgCosplay');
DobbycharImgCosplayPSt.cleaVariableNo = Number(dobbycharImgCosplayPP['cleaVariableNo'] || 0);

ImageManager.reserveCosplayImg = function () {
    var imgCosplayList = ImageManager.getActorCharImgCospalyList();
    var imgCharDefault = ImageManager.getActorCharDefault();
    for (var i = 1; i < 5; i++) {
        var cosplay = imgCosplayList[i];
        var defaultList = imgCharDefault[i];
        for (let key in cosplay) {
            var equipNumStr = cosplay[key];
            this.requestBitmap("img/pictures/charGraph/", defaultList + "_" + equipNumStr);
        }
    }
};

ImageManager.getActorCharImgCospalyList = function () {
    return {
        1: { 481: "481", 482: "482", 483: "483", 494: "494", 493: "493" },
        2: { 484: "484", 485: "485", 486: "486", 496: "496" },
        3: { 487: "487", 488: "488", 489: "489", 495: "495" },
        4: { 490: "490", 491: "491", 492: "492", 497: "497" }
    };
};

ImageManager.getActorCharDefault = function () {
    return {
        1: "01001",
        2: "02001",
        3: "03001",
        4: "04001"
    };
};

var _actorCharImgDefaultList = {
    1: "01001",
    2: "02001",
    3: "03001",
    4: "04001"
};

var _actorCharImgCospalyList = {
    1: { 481: "481", 482: "482", 483: "483", 494: "494", 493: "493" },
    2: { 484: "484", 485: "485", 486: "486", 496: "496" },
    3: { 487: "487", 488: "488", 489: "489", 495: "495" },
    4: { 490: "490", 491: "491", 492: "491", 497: "497" }
};

function getBattleImgByActorId(actorId, hppercent) {
    var actor = $gameActors.actor(Number(actorId));
    let battleImg = "0";
    if (hppercent > 25) {
        if (actorId == 1) {
            battleImg = "401";
        } else {
            battleImg = "301";
        }
    } else {
        if (actorId == 1) {
            battleImg = "407";
        } else {
            battleImg = "307";
        }
    }

    return getCharCosplayFacialExpressionImg(actor, "0" + actorId + battleImg);
};

function getCharCosplayImgByActorId(actorId) {
    var actor = $gameActors.actor(Number(actorId));
    return getCharCosplayImg(actor);
};

function preLoadCharCosplayImgByActorIdFromEquipScene() {
    for (let key in _actorCharImgDefaultList) {
        var actorDefaultImg = _actorCharImgDefaultList[key];
        var cosList = _actorCharImgCospalyList[key];
        for (let key2 in cosList) {
            var cosid = cosList[key2]
            ImageManager.loadBitmap('img/pictures/charGraph/', new String(actorDefaultImg + "_" + cosid), null, true);
        }
    }
};

function getCharCosplayImg(actor) {
    var defaultList = ImageManager.getActorCharDefault();
    return getCharCosplayFacialExpressionImg(actor, defaultList[Number(actor._actorId)]);
};

function getCharCosplayFacialExpressionImg(actor, imgNumber) {
    var equips = actor.equips();
    var imgList = ImageManager.getActorCharImgCospalyList();
    var actorArmorList = imgList[Number(actor._actorId)];
    var cosplayFaicialList = null;
    var setImgNumber = imgNumber.toString();

    if (actor._actorId === 1) {
        if ($gameSwitches.value(282)) { //立ち絵：クレア強制村娘
            setImgNumber = setImgNumber + "_1";
            return ImageManager.loadBitmap('img/pictures/charGraph/', new String(setImgNumber), null, true);
        }
    }

    // 全裸/下着は、強制的にその画像を表示させる。
    if (setImgNumber.indexOf('_u') != -1 || setImgNumber.indexOf('_n') != -1) {
        return ImageManager.loadBitmap('img/pictures/charGraph/', new String(setImgNumber), null, true);
    }

    // 強制対象立ち絵表示コスプレ表示
    if (setImgNumber.indexOf('_f') != -1) {
        var tmpStr = setImgNumber.replace('_f', '');
        return ImageManager.loadBitmap('img/pictures/charGraph/', new String(tmpStr), null, true);
    }

    if (equips && equips.length > 3 && equips[3] != null) {
        var csoplayId = actorArmorList[equips[3].id];
        if (csoplayId) {
            return ImageManager.loadBitmap('img/pictures/charGraph/', new String(setImgNumber + "_" + csoplayId), null, true);
        }
    }

    var cleaVari = $gameVariables.value(Number(DobbycharImgCosplayPSt.cleaVariableNo));
    if (actor._actorId === 1) {
        if (Number(cleaVari) === 0 ||
            $gameSwitches.value(282)) { //立ち絵：クレア強制村娘
            setImgNumber = setImgNumber + "_1";
        } else {
            setImgNumber = setImgNumber + "_" + cleaVari;
        }
    }
    return ImageManager.loadBitmap('img/pictures/charGraph/', new String(setImgNumber), null, true);
};
