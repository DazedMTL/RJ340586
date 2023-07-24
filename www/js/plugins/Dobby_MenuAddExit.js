//=============================================================================
// Dobby_MenuAddExit.js
// 内容：メニューにゲーム終了を追加するプラグイン
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc メニューにゲーム終了を追加するプラグイン
 * @author スタジオドビー
 * 
 * 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、メニューにゲーム終了を追加するプラグイン
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
 * プラグインパラメータはありません。
 *-----------------------------------------------------------------------------
 *-----------------------------------------------------------------------------
 */
//=============================================================================
const dobby_MenuAddExit_Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function () {
    dobby_MenuAddExit_Window_TitleCommand_makeCommandList.apply(this);
    this.addCommand("終了", 'dobby_MenuAddExit', true);
};

const dobby_MenuAddExit_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function () {
    dobby_MenuAddExit_Scene_Title_createCommandWindow.apply(this);
    this._commandWindow.setHandler('dobby_MenuAddExit', this.dobbyExitGame.bind(this));
};

Scene_Title.prototype.dobbyExitGame = function () {
    this._commandWindow.close();
    if (StorageManager.isLocalMode()) {
        window.close();
    } else {
        window.open('about:blank', '_self').close();
    }
};