/*
 * --------------------------------------------------
 * MNKR_Excalibur Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_Excalibur.js
 * @plugindesc 約束された勝利のキーを作ります。
 * @author munokura
 *
 * @help
 * 戦闘中に勝利キーを押すと、
 * 敵全体に「戦闘不能」ステートを付与し、ターン終了へ移行します。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 * @param activation
 * @text 有効化スイッチID
 * @type switch
 * @desc 機能を有効化するスイッチです。ONの時に有効化されます。指定しない場合、常に有効化されます。
 * @default 0
 *
 * @param Excalibur Key
 * @text 勝利キー
 * @desc 勝利するキーを指定します。選択肢以外のキーも設定できます。
 * @type select
 * @option Tab
 * @value tab
 * @option Aボタン / Enter / スペース / Z
 * @value ok
 * @option Xボタン / Shift
 * @value shift
 * @option Control / Alt
 * @value control
 * @option Escape / テンキー0 / X / Insert
 * @value escape
 * @option RBボタン / Pagedown / W
 * @value pagedown
 * @option LBボタン / Pageup / Q
 * @value pageup
 * @option 下ボタン / カーソル下 / テンキー2
 * @value down
 * @option 左ボタン / カーソル左 / テンキー4
 * @value left
 * @option 右ボタン / カーソル右 / テンキー6
 * @value right
 * @option 上ボタン / カーソル上 / テンキー8
 * @value up
 * @option F9
 * @value debug
 * @default pagedown
 *
 * @param zenmetu Key
 * @text 敗北キー
 * @desc 敗北するキーを指定します。選択肢以外のキーも設定できます。
 * @type select
 * @option Tab
 * @value tab
 * @option Aボタン / Enter / スペース / Z
 * @value ok
 * @option Xボタン / Shift
 * @value shift
 * @option Control / Alt
 * @value control
 * @option Escape / テンキー0 / X / Insert
 * @value escape
 * @option RBボタン / Pagedown / W
 * @value pagedown
 * @option LBボタン / Pageup / Q
 * @value pageup
 * @option 下ボタン / カーソル下 / テンキー2
 * @value down
 * @option 左ボタン / カーソル左 / テンキー4
 * @value left
 * @option 右ボタン / カーソル右 / テンキー6
 * @value right
 * @option 上ボタン / カーソル上 / テンキー8
 * @value up
 * @option F9
 * @value debug
 * @default pagedown
 */

(() => {

    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const activation = Number(parameters['activation'] || 0);
    const excaliburKey = String(parameters['Excalibur Key'] || 'pagedown');
    const zenmetuKey = String(parameters['zenmetu Key'] || 'pagedown');

    Scene_Battle.prototype.isEnemyLifeZero = function (enemyId) {
        let enemyIds = [
            5, 8, 22, 28, 43, 50, 57, 58, 77, 82, 83, 84,
            103, 108, 109, 110, 111, 112, 113, 123, 124, 125, 129, 133, 134, 138, 139, 142, 143, 148, 149,
            155, 156, 160, 161, 172, 173, 174, 175, 176, 177, 185, 186,
            370, 371, 432, 433, 444, 445, 447, 448, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700,

            //ここから下、Alteredが記述
            9, 134, 147, 151, 152, 153, 154, 159, 164, 167, 169, 170, 176, 177, 178,
            179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192,
            497, 701, 702, 705, 712, 713, 802, 809, 810, 824, 825, 826, 841
        ];

        return enemyIds.includes(Number(enemyId));
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        _Scene_Battle_update.call(this);
        if (!BattleManager.isTurnEnd() && !BattleManager.isBattleEnd()) {
            if (Input.isTriggered(excaliburKey) && (activation === 0 || !$gameSwitches.value(activation))) {
                if (!$gameSwitches.value(184)) { //不滅の真円討伐数スイッチ
                    $gameTroop.members().forEach(function (enemy) {
                        if (this.isEnemyLifeZero(enemy._enemyId)) {
                            enemy._hp = 0;
                        } else {
                            enemy.addState(1);
                        }
                    }, this);
                    this._skillWindow.hide();
                    this._skillWindow.deactivate();
                    this._itemWindow.hide();
                    this._itemWindow.deactivate();
                    this._actorWindow.hide();
                    this._actorWindow.deactivate();
                    this._enemyWindow.hide();
                    this._enemyWindow.deactivate();
                    this._actorCommandWindow.deactivate();
                    this._partyCommandWindow.deactivate();
                    BattleManager.endTurn();
                }
            } else if (Input.isTriggered(zenmetuKey) && (activation === 0 || !$gameSwitches.value(activation))) {
                if (!$gameSwitches.value(184)) { //不滅の真円討伐数スイッチ
                    $gameParty.members().forEach(function (enemy) {
                        enemy._hp = 0;
                        enemy.addState(1);
                    });
                    this._skillWindow.hide();
                    this._skillWindow.deactivate();
                    this._itemWindow.hide();
                    this._itemWindow.deactivate();
                    this._actorWindow.hide();
                    this._actorWindow.deactivate();
                    this._enemyWindow.hide();
                    this._enemyWindow.deactivate();
                    this._actorCommandWindow.deactivate();
                    this._partyCommandWindow.deactivate();
                    BattleManager.endTurn();
                }
            }
        }
    };
})();