//=============================================================================
// Dobby_MenuListSort.js
// 内容：メニューの順番を変更するプラグイン
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc メニューの順番を変更するプラグイン
 * @author スタジオドビー
 * 
 * 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、メニューの順番を変更するプラグインです
 * プラグイン設定画面の最下部に必ず入れてください。
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
 * @param orderMenuList
 * @text タイトルメニューの順序を設定します。
 * @type String[]
 * @desc メニューの日本語名を上から順番に設定してください。
 * 
 * @param optionList
 * @text オプションの順序を設定します。
 * @type String[]
 * @desc オプションの日本語名を上から順番に設定してください。
 * 
 * @param mainMenuList
 * @text メインメニューの順序を設定します。
 * @type String[]
 * @desc メニューの日本語名を上から順番に設定してください。
 * 
 */
//=============================================================================
var dobbyMenuListgetArgJson = function (arg, defaultValue) {
    try {
        arg = JSON.parse(arg || null);
        if (arg === null) {
            arg = defaultValue;
        }
    } catch (e) {
        alert(`!!!Plugin param is wrong.!!!\nPlugin:${pluginName}.js\nValue:${arg}`);
        arg = defaultValue;
    }
    return arg;
};
const dobby_MenuListDortPn = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
const dobby_MenuListDortPp = PluginManager.parameters(dobby_MenuListDortPn);
const dobby_orderMenuList = dobbyMenuListgetArgJson(dobby_MenuListDortPp['orderMenuList'] || null);

Window_Command.prototype.changeMenuList = function (sortList) {
    if (sortList && sortList != null && this._list) {
        var reList = new Array();
        var dlist = this._list;
        sortList.forEach(function (value) {
            var orderMenuListStr = value;
            var menu = dlist.filter(function (value2) {
                return value2 && value2.name == orderMenuListStr;
            });

            if (menu && menu.length > 0) {
                reList.push(menu[0]);
            }
        });
        this._list = null;
        this._list = undefined;
        this._list = reList;
    }
};

const dobby_MenuListDortPp_Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function () {
    dobby_MenuListDortPp_Window_TitleCommand_makeCommandList.apply(this);
    this.changeMenuList(dobby_orderMenuList);
};

const dobby_optionList = dobbyMenuListgetArgJson(dobby_MenuListDortPp['optionList'] || null);

var dobby_MenuListDortPp_Window_TitleCommand_makeCommandList_optionList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function () {
    dobby_MenuListDortPp_Window_TitleCommand_makeCommandList_optionList.call(this);
    this.changeMenuList(dobby_optionList);
};

Window_Options.prototype.windowWidth = function () {
    return 700;
};


const dobby_mainMenuList = dobbyMenuListgetArgJson(dobby_MenuListDortPp['mainMenuList'] || null);
var dobby_MenuListDortPp_Window_MenuCommandmakeCommandList = Window_MenuCommand.prototype.makeCommandList;
Window_MenuCommand.prototype.makeCommandList = function () {
    dobby_MenuListDortPp_Window_MenuCommandmakeCommandList.call(this);
    this.changeMenuList(dobby_mainMenuList);
};