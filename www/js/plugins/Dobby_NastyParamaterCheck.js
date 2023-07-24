//=============================================================================
// Dobby_NastyParamaterCheck.js
// 内容：淫乱度のレベルをチェックするプラグイン
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc 淫乱度のレベルをチェックするプラグイン
 * @author スタジオドビー
 * 
 * ============================================================================
 * 概要
 * ============================================================================
 * 淫乱値を使用する場合に呼ばれるメソッドを用意
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
 * @text クレアの淫乱値を管理する変数
 * @type variable
 * @default 0
 * @desc クレアの淫乱値を管理する変数
 * 
 * @param cleaLvVariableNo
 * @text クレアの淫乱レベルを管理する変数
 * @type variable
 * @default 0
 * @desc クレアの淫乱レベルを管理する変数
 * 
 * @param rilmVariableNo
 * @text リルムの淫乱値を管理する変数
 * @type variable
 * @default 0
 * @desc リルムの淫乱値を管理する変数
 * 
 * @param rilmLvVariableNo
 * @text リルムの淫乱レベルを管理する変数
 * @type variable
 * @default 0
 * @desc リルムの淫乱レベルを管理する変数
 * 
 * @param noraVariableNo
 * @text ノラの淫乱値を管理する変数
 * @type variable
 * @default 0
 * @desc ノラの淫乱値を管理する変数
 * 
 * @param noraLvVariableNo
 * @text ノラの淫乱レベルを管理する変数
 * @type variable
 * @default 0
 * @desc ノラの淫乱レベルを管理する変数
 * 
 * @param sophiaVariableNo
 * @text ソフィアの淫乱値を管理する変数
 * @type variable
 * @default 0
 * @desc ソフィアの淫乱値を管理する変数
 * 
 * @param sophiaLvVariableNo
 * @text ソフィアの淫乱レベルを管理する変数
 * @type variable
 * @default 0
 * @desc ソフィアの淫乱レベルを管理する変数
 * 
 * @param cleaNotVirginSwitch
 * @text クレアが非処女であるかのスイッチ
 * @type switch
 * @default 0
 * @desc ON:非処女/OFF：処女
 * 
 * @param noraNotVirginSwitch
 * @text ノラが非処女であるかのスイッチ
 * @type switch
 * @default 0
 * @desc ON:非処女/OFF：処女
 * 
 * @param relmNotVirginSwitch
 * @text リルムが非処女であるかのスイッチ
 * @type switch
 * @default 0
 * @desc ON:非処女/OFF：処女
 * 
 * @param sophiaNotVirginSwitch
 * @text ソフィアが非処女であるかのスイッチ
 * @type switch
 * @default 0
 * @desc ON:非処女/OFF：処女
 * 
 */
//=============================================================================
var dobbyNastyParamaterCheckPP = PluginManager.parameters('Dobby_NastyParamaterCheck');
var d_nastyParamaterClea = Number(dobbyNastyParamaterCheckPP['cleaVariableNo'] || 0);
var d_nastyLvParamaterClea = Number(dobbyNastyParamaterCheckPP['cleaLvVariableNo'] || 0);
var d_nastyParamaterRilm = Number(dobbyNastyParamaterCheckPP['rilmVariableNo'] || 0);
var d_nastyLvParamaterRilm = Number(dobbyNastyParamaterCheckPP['rilmLvVariableNo'] || 0);
var d_nastyParamaterNora = Number(dobbyNastyParamaterCheckPP['noraVariableNo'] || 0);
var d_nastyLvParamaterNora = Number(dobbyNastyParamaterCheckPP['noraLvVariableNo'] || 0);
var d_nastyParamaterSophia = Number(dobbyNastyParamaterCheckPP['sophiaVariableNo'] || 0);
var d_nastyLvParamaterSophia = Number(dobbyNastyParamaterCheckPP['sophiaLvVariableNo'] || 0);
var cleaNotVirginSwitch = parseInt(dobbyNastyParamaterCheckPP['cleaNotVirginSwitch'] || 0);
var noraNotVirginSwitch = parseInt(dobbyNastyParamaterCheckPP['noraNotVirginSwitch'] || 0);
var relmNotVirginSwitch = parseInt(dobbyNastyParamaterCheckPP['relmNotVirginSwitch'] || 0);
var sophiaNotVirginSwitch = parseInt(dobbyNastyParamaterCheckPP['sophiaNotVirginSwitch'] || 0);

var d_nastyCharMapping = {
    1: d_nastyParamaterClea,
    2: d_nastyParamaterRilm,
    3: d_nastyParamaterNora,
    4: d_nastyParamaterSophia
};
var d_nastyLvCharMapping = {
    1: d_nastyLvParamaterClea,
    2: d_nastyLvParamaterRilm,
    3: d_nastyLvParamaterNora,
    4: d_nastyLvParamaterSophia
};

Game_System.prototype.setCharacterNastyLevel = function (actorId, num) {
    $gameVariables.setValue(Number(d_nastyLvCharMapping[actorId]), num);
};

Game_System.prototype.getCharacterNastyLevel = function (actorId) {
    return $gameVariables.value(Number(d_nastyLvCharMapping[actorId]));
};

Game_System.prototype.getCharacterNastyNum = function (actorId) {
    return $gameVariables.value(Number(d_nastyCharMapping[actorId]));
};

Game_System.prototype.setCharacterNastyNum = function (actorId, num) {
    $gameVariables.setValue(Number(d_nastyCharMapping[actorId]), num);
};

Game_System.prototype.setAllCharacterNastyLevel = function () {
    for (let key in d_nastyLvCharMapping) {
        var level = this.getCharacterNastyLevel(key);
        $gameVariables.setValue(Number(d_nastyLvCharMapping[key]), level);
    }
};

Game_System.prototype.addNastyLv = function (actorId) {
    let tmpLv = this.getCharacterNastyLevel(actorId);
    this.setCharacterNastyLevel(actorId, (tmpLv + 1));
};

Game_System.prototype.addNastyNum = function (actorId, num) {
    let tmpnum = this.getCharacterNastyNum(actorId);
    this.setCharacterNastyNum(actorId, (tmpnum + num));
};

Game_System.prototype.allCharAddNastyNum = function (num) {
    for (let key in d_nastyCharMapping) {
        var nastyNum = 0;
        nastyNum = $gameVariables.value(Number(d_nastyCharMapping[key]));
        nastyNum = Number(nastyNum) + Number(num);
        $gameVariables.setValue(Number(d_nastyCharMapping[key]), nastyNum);
    }
};

Game_System.prototype.getNastyNumByActorId = function (actorId) {
    return $gameVariables.value(Number(d_nastyCharMapping[actorId]));
};