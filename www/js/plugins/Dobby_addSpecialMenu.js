//=============================================================================
// Dobby_addSpecialMenu.js
// 内容：スペシャルメニューをメニュー画面に追加する。
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc スペシャルメニューをメニュー画面に追加するプラグイン
 * @author スタジオドビー
 * 
 * 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、スペシャルメニューをメニュー画面に追加するプラグインです
 * プラグイン設定画面の最下部に必ず入れてください。
 * このプラグインにはプラグインパラメータはありません。
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
 */
//=============================================================================

const SD_ADDSPECIALMENU_GALERY = "Gallery";
const SD_ADDSPECIALMENU_TROPHY = "Trophy";
const SD_ADDSPECIALMENU_MONSTER = "Monster";
const SD_ADDSPECIALMENU_HINT = "Hint";
const SD_ADDSPECIALMENU_GLOS = "Glossary";
const SD_ADDSPECIALMENU_HIKITSUGI = "Transfer Data";

const GLOBAL_SpecialMenuScene = (window.scene = window.scene || {});
(function () {
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

    function SpecialMenu_Scene() {
        this.initialize.apply(this, arguments);
    };

    SpecialMenu_Scene.prototype = Object.create(Scene_MenuBase.prototype);
    SpecialMenu_Scene.prototype.constructor = SpecialMenu_Scene;

    SpecialMenu_Scene.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        var width = 400;
        var height = 400;
        var xPos = (Graphics.width / 2) - (width / 2);
        var yPos = (Graphics.height / 2) - (height / 2);
        this._menuwindow = new SpecialMenu_Window(xPos, yPos, width, height);
        this.addWindow(this._menuwindow);
        this._menuwindow.activate();
        this._menuwindow.setHandler("ok", this.okClick.bind(this));
        this._menuwindow.setHandler("cancel", this.popScene.bind(this));
        this._menuwindow.select(0);
    };

    SpecialMenu_Scene.prototype.createBackground = function () {
        Scene_MenuBase.prototype.createBackground.call(this);
        this._backgroundSprite.bitmap = ImageManager.loadPicture("SceneSpecial");
    };

    SpecialMenu_Scene.prototype.okClick = function () {
        var nextForwardScene = this._menuwindow.getForwardScene();
        var menuData = this._menuwindow.getMenuData();
        if (menuData[0] == SD_ADDSPECIALMENU_GLOS || menuData[0] == SD_ADDSPECIALMENU_HINT || menuData[0] == SD_ADDSPECIALMENU_MONSTER || menuData[0] == SD_ADDSPECIALMENU_HIKITSUGI) {
            $gameParty.clearGlossaryIndex();
            if (menuData[0] == SD_ADDSPECIALMENU_GLOS) {
                $gameParty.setSelectedGlossaryType(1);
            } else if (menuData[0] == SD_ADDSPECIALMENU_HINT) {
                $gameParty.setSelectedGlossaryType(3);
            } else if (menuData[0] == SD_ADDSPECIALMENU_HIKITSUGI) {
                $gameParty.setSelectedGlossaryType(4);
            } else {
                $gameParty.setSelectedGlossaryType(2);

            }

            SceneManager.push(nextForwardScene);

        } else if (menuData[0] == SD_ADDSPECIALMENU_GALERY) {
            Scene_Recollection.returnScene = "SpecialMenu_Scene";
            Scene_Recollection.startRecollection();
        } else if (menuData[0] == SD_ADDSPECIALMENU_TROPHY) {
            SceneManager.push(nextForwardScene);
        }
    };

    // シーンウィンドウ
    function SpecialMenu_Window() {
        this.initialize.apply(this, arguments);
    };

    SpecialMenu_Window.prototype = Object.create(Window_Selectable.prototype);
    SpecialMenu_Window.prototype.constructor = SpecialMenu_Window;

    SpecialMenu_Window.prototype.initialize = function (x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._menuList = new Array();
        this._menuList.push([SD_ADDSPECIALMENU_GALERY, Scene_Recollection]);
        this._menuList.push([SD_ADDSPECIALMENU_TROPHY, Dobbytorigoya.dobbytorigoyaScene]);
        this._menuList.push([SD_ADDSPECIALMENU_MONSTER, Dobby_SceneGlossary.Dobby_SceneGlossary]);
        this._menuList.push([SD_ADDSPECIALMENU_HINT, Dobby_SceneGlossary.Dobby_SceneGlossary]);
        this._menuList.push([SD_ADDSPECIALMENU_GLOS, Dobby_SceneGlossary.Dobby_SceneGlossary]);
        this._menuList.push([SD_ADDSPECIALMENU_HIKITSUGI, Dobby_SceneGlossary.Dobby_SceneGlossary]);
        this.refresh();
    };

    SpecialMenu_Window.prototype.maxCols = function () {
        return 1;
    };

    SpecialMenu_Window.prototype.maxItems = function () {
        return (this._menuList != null && this._menuList != undefined && this._menuList.length > 0) ? this._menuList.length : 0;
    };

    SpecialMenu_Window.prototype.drawItem = function (index) {
        if (this._menuList) {
            var item = this._menuList[index];
            var rect = this.itemRect(index);
            this.drawText(item[0], rect.x, rect.y, this.width);
        }
    };

    SpecialMenu_Window.prototype.getMenuData = function () {
        return this._menuList[this.index()];
    };

    SpecialMenu_Window.prototype.getForwardScene = function () {
        return this._menuList[this.index()][1];
    };

    //=============================================================================
    // Window_MenuCommand
    //=============================================================================
    var _TEST_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _TEST_Window_MenuCommand_addOriginalCommands.call(this);
        this.addCommand('Special', 'Dobby_specialMenu', true);
    };
    //=============================================================================
    // Scene_Menu
    //=============================================================================

    var _TEST_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _TEST_Scene_Menu_createCommandWindow.call(this);
        //追加メニューの挙動を指定（TestSymbol選択なら下記に自作したonCommandTestを読み込み）
        this._commandWindow.setHandler('Dobby_specialMenu', this.doobbySpecialMenuCall.bind(this));
    };

    Scene_Menu.prototype.doobbySpecialMenuCall = function () {
        SceneManager.push(SpecialMenu_Scene);
    };

    var _dobbyAddSpectialMenu_Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;;
    Window_MenuCommand.prototype.makeCommandList = function () {
        _dobbyAddSpectialMenu_Window_MenuCommand_makeCommandList.call(this);
        var newList = new Array();
        this._list.forEach(function (value) {
            if ((
                value["name"] != SD_ADDSPECIALMENU_TROPHY &&
                value["name"] != "実績" &&
                value["name"] != SD_ADDSPECIALMENU_HINT &&
                value["name"] != SD_ADDSPECIALMENU_GLOS &&
                value["name"] != SD_ADDSPECIALMENU_GALERY &&
                value["name"] != SD_ADDSPECIALMENU_MONSTER &&
                value["name"] != SD_ADDSPECIALMENU_HIKITSUGI
            )) {
                newList.push(value);
            }
        });
        this._list = newList;
    };

    GLOBAL_SpecialMenuScene.scene = SpecialMenu_Scene;
})();
