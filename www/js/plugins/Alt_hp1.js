//=============================================================================
// Alt_hp1.js
// 内容：他のプラグインとは違う、独自でスクリプトを組む用のファイル
// 製作者：ALTERED(鈴原マキナ)
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc 他のプラグインとは違う、独自でスクリプトを組む用のファイル
 * @author ALTERED(鈴原マキナ)
 *
 * @param stateId
 * @text hp1ステートのID
 * @desc hp1ステートのID
 */


(function () {
    'use strict';

    const parameters = PluginManager.parameters('Alt_hp1');
    const stateId = Number(parameters['stateId'] || 0) - 0;

    //===================================================================
    // 味方全員にHPを超過するダメージを受けても
    // HPが1残る効果を付与する
    //===================================================================

    const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function (target, critical) {
        const damage = _Game_Action_makeDamageValue.apply(this, arguments);
        if (target.isActor() &&
            target._states.includes(stateId) &&
            target._hp <= damage) {
            target.removeState(stateId);
            return target.hp - 1;
        }
        return damage;
    };

})();