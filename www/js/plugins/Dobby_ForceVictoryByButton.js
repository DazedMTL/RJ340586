//=============================================================================
// Dobby_ForceVictoryByButton.js
// 内容：戦闘時にワンボタンで強制勝利する
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc 戦闘時にワンボタンで強制勝利するプラグイン
 * @author スタジオドビー
 * 
 * ============================================================================
 * 概要
 * ============================================================================
 * 戦闘時に、対応するキーを押下すると、強制的に戦闘に勝利することができます。
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
 * @param validForceVictoryButtonSwitch
 * @text 強制勝利のボタンを有効/無効化を管理するスイッチの番号
 * @type switch
 * @default 1
 * @desc 強制勝利のボタンを有効/無効化を管理するスイッチの番号
 *
 * @param validForceVicotry
 * @text 強制勝利ボタンをゲーム中で使用するかしないかを管理するフラグ
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @desc 強制勝利ボタンをゲーム中で使用するかしないかを管理するフラグ
 *-----------------------------------------------------------------------------
 */
//=============================================================================
var dobbyForceVictoryByButtonPst = dobbyForceVictoryByButtonPst || {};
var dobbyForceVictoryByButtonpp = PluginManager.parameters('Dobby_ForceVictoryByButton');
dobbyForceVictoryByButtonPst.validForceVictoryButtonSwitch = Number(dobbyForceVictoryByButtonpp['validForceVictoryButtonSwitch'] || 0);
dobbyForceVictoryByButtonPst.validForceVicotry = String(dobbyForceVictoryByButtonpp['validForceVicotry'] || "false");

var ddobbyFvbb_Scene_Battle_prototype_update = Scene_Battle.prototype.update;

function Window_dummy() {
    this.initialize.apply(this, arguments);
};

Window_dummy.prototype = Object.create(Window_Base.prototype);
Window_dummy.prototype.constructor = Window_dummy;

Window_dummy.prototype.initialize = function (thisObj) {
    Window_Base.prototype.initialize.call(this, -10, -10, 5, 5);
    this._thisObj = thisObj;
};

Window_dummy.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (Input.isRepeated('M') && Input.isTriggered('M')) {
        this._thisObj.commandGuard();
        this._thisObj.commandGuard();
        this._thisObj.commandGuard();
        this._thisObj.commandGuard();
        $gameTroop.members().forEach(function (value) {
            value._hp = 0;
            value.refresh();
        });

    }
};

var testtest = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function () {
    testtest.call(this);
    this._testWindow = new Window_dummy(this);
    this.addWindow(this._testWindow);
};

(function () {

});