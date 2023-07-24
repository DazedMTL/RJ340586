//=============================================================================
// IRPP_MV_YEP_SaveCorePatch.js
//=============================================================================

/*:
 * @plugindesc (※最上部)(※YEPより下)YEP_SaveCoreの不具合を修正します。
 * @author イロスマRPG制作委員会
 *
 * @help YEP_SaveCoreを導入時にイベントコマンドでセーブ禁止しても
 * メニューでセーブが選択できる不具合を修正します。
 * また、セーブが禁止された状態でイベントコマンドからセーブ画面を呼び出した時の処理を修正します。
 * YEP_SaveCoreとYEP_X_NewGamePlusより下のできるだけ上の位置に導入してください。
 */

var Imported = Imported || {};
Imported.IRPP_MV_YEP_SaveCorePatch = true;
(function () {
    if (Imported.YEP_SaveCore) {
        Window_MenuCommand.prototype.isSaveEnabled = function () {
            return !DataManager.isEventTest() && $gameSystem.isSaveEnabled();
        };

        Window_SaveAction.prototype.isSaveEnabled = function () {
            if (this._mode !== 'save') return false;
            return true;
        };
    };
})();