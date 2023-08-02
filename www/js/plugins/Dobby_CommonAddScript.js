//=============================================================================
// Dobby_CommonAddScript.js
// 内容：他のプラグインとは違う、独自でスクリプトを組む用のファイル
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc 他のプラグインとは違う、独自でスクリプトを組む用のファイル
 * @author スタジオドビー
 *
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
 */
//=============================================================================

// セーブモードの背景変更
var _dobby_commonAddScript_Scene_Save_createBackground = Scene_Save.prototype.createBackground;
Scene_Save.prototype.createBackground = function () {
    _dobby_commonAddScript_Scene_Save_createBackground.call(this);
    this._backgroundSprite.bitmap = ImageManager.loadPicture("saveLoad");
};

var _dobby_commonAddScript_Scene_Load_createBackground = Scene_Load.prototype.createBackground;
Scene_Load.prototype.createBackground = function () {
    _dobby_commonAddScript_Scene_Load_createBackground.call(this);
    this._backgroundSprite.bitmap = ImageManager.loadPicture("saveLoad");
};

var _dobby_commonAddScript_Scene_Options_createBackground = Scene_Options.prototype.createBackground;
Scene_Options.prototype.createBackground = function () {
    _dobby_commonAddScript_Scene_Options_createBackground.call(this);
    this._backgroundSprite.bitmap = ImageManager.loadPicture("Sceneoptions");
};

var _dobby_commonAddScript_Scene_Shop_createBackground = Scene_Shop.prototype.createBackground;
Scene_Shop.prototype.createBackground = function () {
    _dobby_commonAddScript_Scene_Shop_createBackground.call(this);
    this._backgroundSprite.bitmap = ImageManager.loadPicture("Pic_1");
    this._backgroundSprite.scale.x = 2;
    this._backgroundSprite.scale.y = 2;
};

Scene_GameEnd.prototype.createBackground = function () {
    Scene_MenuBase.prototype.createBackground.call(this);
    this._backgroundSprite.bitmap = ImageManager.loadPicture("sceneQuit");
};

function Window_Help_dobby() {
    this.initialize.apply(this, arguments);
};

Window_Help_dobby.prototype = Object.create(Window_Help.prototype);
Window_Help_dobby.prototype.constructor = Window_Help_dobby;

Window_Help_dobby.prototype.updateBackgroundOpacity = function () {
    this.opacity = 0;
};

Scene_Equip.prototype.createHelpWindow = function () {
    this._helpWindow = new Window_Help_dobby();
    this.addWindow(this._helpWindow);
};

var _dobby_commonAddScript_Scene_Equip_createBackground = Scene_Equip.prototype.createBackground;
Scene_Equip.prototype.createBackground = function () {
    _dobby_commonAddScript_Scene_Equip_createBackground.call(this);
    this._backgroundSprite.bitmap = ImageManager.loadPicture("sceneEquip");
};

var _dobby_commonAddScript_Scene_Equip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function () {
    _dobby_commonAddScript_Scene_Equip_create.call(this);
    this._helpWindow.opacity = 0;
    this._commandWindow.opacity = 0;
    this._slotWindow.opacity = 0;
    this._itemWindow.opacity = 0;
    this._statusWindow.opacity = 0;
};

Torigoya.Achievement2.Scene_Achievement.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    //this._backgroundSprite.bitmap = ImageManager.loadPicture("trophy");
    this.addChild(this._backgroundSprite);
};

var _Dobby_CommonAddScript_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
    var config = _Dobby_CommonAddScript_makeData.apply(this, arguments);
    config.dWindowMessageWindow = this.dWindowMessageWindow;
    config.dWindowMessageSpeed = this.dWindowMessageSpeed;
    // チュートリアルスキップ
    config.dtutorialSkip = this.dtutorialSkip;
    return config;
};

var __Dobby_CommonAddScript_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
    __Dobby_CommonAddScript_applyData.apply(this, arguments);
    this.dWindowMessageWindow = this.readWindowBack(config, 'dWindowMessageWindow');
    this.dWindowMessageSpeed = this.readdMessageSpeed(config, 'dWindowMessageSpeed');
    this.dtutorialSkip = this.readFlag(config, 'dtutorialSkip');

    const DEFAULT_CHAR_VOL_COMMON = 10;
    if (config.bgmVolume == null) {
        this.bgmVolume = DEFAULT_CHAR_VOL_COMMON;
    }

    if (config.bgsVolume == null) {
        this.bgsVolume = DEFAULT_CHAR_VOL_COMMON;
    }

    if (config.meVolume == null) {
        this.meVolume = DEFAULT_CHAR_VOL_COMMON;
    }

    if (config.seVolume == null) {
        this.seVolume = DEFAULT_CHAR_VOL_COMMON;
    }

};

Window_Base.prototype.showBackgroundDimmer = function () {
    if (!this._dimmerSprite) {
        this._dimmerSprite = new Sprite();
        this._dimmerSprite.bitmap = new Bitmap(0, 0);
        this.addChildToBack(this._dimmerSprite);
    }
    // var bitmap = this._dimmerSprite.bitmap;
    // if (bitmap.width !== this.width || bitmap.height !== this.height) {
    this.refreshDimmerBitmap();
    // }
    this._dimmerSprite.visible = true;
    this.updateBackgroundDimmer();
};

// Window_Base.prototype.refreshDimmerBitmap = function() {
//     if (this._dimmerSprite) {
//         var bitmap = this._dimmerSprite.bitmap;
//         var w      = this.width;
//         var h      = this.height;
//         var m      = this.padding;
//         var c1     = this.dimColor1();
//         var c2     = this.dimColor2();
//         bitmap.resize(w, h);
//         bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
//         bitmap.fillRect(0, m, w, h - m * 2, c1);
//         bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
//         this._dimmerSprite.setFrame(0, 0, w, h);
//     }
// };

Window_Base.prototype.dimColor1 = function () {
    if (!$gameSwitches.value(284)) {
        var windowadOpacity = ConfigManager['dWindowMessageWindow'];
        var tmp = Number(windowadOpacity / 100).toFixed(2);
        // console.log(tmp);
        // this._checkDimColor1 = 'rgba(0, 0, 0, ' + tmp + ')';
        return 'rgba(0, 0, 0, ' + tmp + ')';
    } else {
        var tmp = Number(80 / 100).toFixed(2);
        // console.log(tmp);
        // this._checkDimColor1 = 'rgba(0, 0, 0, ' + tmp + ')';
        return 'rgba(0, 0, 0, ' + tmp + ')';
    }

};

Window_Base.prototype.dimColor2 = function () {
    return 'rgba(0, 0, 0, 0)';
};

var _Dobby_CommonAddScript_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function () {
    _Dobby_CommonAddScript_makeCommandList.call(this);
    this.addCommand("Adult Text Opacity", 'dWindowMessageWindow');
    this.addCommand("Message Speed", 'dWindowMessageSpeed');
    this.addCommand("Skip Tutorial", 'dtutorialSkip');
};

var _Dobby_CommonAddScript_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function () {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (symbol == "dWindowMessageWindow") {
        value += this.volumeWindowOffset();
        if (value > 100) {
            value = 0;
        }
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else if (symbol == "dWindowMessageSpeed") {
        this.changeMessageSpeed(symbol, value, true);
    } else {
        _Dobby_CommonAddScript_processOk.call(this);
    }
};

Window_Options.prototype.volumeWindowOffset = function () {
    return 10;
};

var _Dobby_CommonAddScript_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function (wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol == "dWindowMessageWindow") {
        var value = this.getConfigValue(symbol);
        value += this.volumeWindowOffset();
        if (value > 100) {
            value = 0;
        }
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else if (symbol == "dWindowMessageSpeed") {
        var value = this.getConfigValue(symbol);
        this.changeMessageSpeed(symbol, value, true);
    } else {
        _Dobby_CommonAddScript_cursorRight.call(this, wrap);
    }
};

var _Dobby_CommonAddScript_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function (wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol == "dWindowMessageWindow") {
        var value = this.getConfigValue(symbol);
        value -= this.volumeWindowOffset();
        if (value < 0) {
            value = 100;
        }
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else if (symbol == "dWindowMessageSpeed") {
        var value = this.getConfigValue(symbol);
        this.changeMessageSpeed(symbol, value, false);
    } else {
        _Dobby_CommonAddScript_cursorLeft.call(this, wrap);
    }
};

ConfigManager.readWindowBack = function (config, name) {
    var value = config[name];
    if (value !== undefined) {
        return Number(value).clamp(0, 100);
    } else {
        return 50;
    }
};

ConfigManager.readdMessageSpeed = function (config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return 1;
    }
};

// コピーするのはこっち
//!isTutorialSkip()
function isTutorialSkip() {
    return ConfigManager["dtutorialSkip"];
};

var _Dobby_CommonAddScript_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function (index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (symbol == "dWindowMessageWindow") {
        return this.volumeStatusText(value);
    } else if (symbol == "dWindowMessageSpeed") {
        switch (value) {
            case 7:
                return "Slow";
            case 1:
                return "Normal";
            case 0:
                return "Fast";
        }
    } else {
        return _Dobby_CommonAddScript_statusText.call(this, index);
    }
};

Window_Options.prototype.changeMessageSpeed = function (symbol, value, rightFlag) {
    switch (value) {
        case 7:
            this.changeValue(symbol, (rightFlag ? 1 : 0));
            break;
        case 1:
            this.changeValue(symbol, (rightFlag ? 0 : 7));
            break;
        case 0:
            this.changeValue(symbol, (rightFlag ? 7 : 1));
            break;
    }
};

Window_Message.prototype.isTriggered = function () {
    if ($gameSwitches.value(30)) {
        return (Input.isRepeated('ok') ||
            TouchInput.isRepeated());
    } else {
        return (Input.isRepeated('ok') || Input.isRepeated('cancel') ||
            TouchInput.isRepeated());
    }
};

Window_Options.prototype.volumeOffset = function () {
    return 5;
};

//======タイトル連番用処理-Start-
var _Dobby_CommonAddScript_Scene_Title_prototype_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function () {
    _Dobby_CommonAddScript_Scene_Title_prototype_initialize.call(this);
    var maxnum = DataManager.loadLatestScenarioVariable();
    //var maxnum = 3;
    this._topImgList = new Array();
    let dir = "img/titles1/moveTitle/";
    let opimg = "OP_ver01_";
    this._dobbyopcnt = 0;
    this._dobbydispIndex = 0;
    // switch使わなくても多分大丈夫そう
    switch (maxnum) {
        case 0:
            opimgdir = dir + "v1/"
            opimg = "OP_ver01_";
            break;
        case 1:
            opimgdir = dir + "v2/"
            opimg = "OP_ver02_";
            break;
        case 2:
            opimgdir = dir + "v3/"
            opimg = "OP_ver03_";
            break;
        case 3:
            opimgdir = dir + "v4/"
            opimg = "OP_ver04_";
            break;
        case 4:
            opimgdir = dir + "v5/"
            opimg = "OP_ver05_";
            break;
        case 5:
            opimgdir = dir + "v6/"
            opimg = "OP_ver06_";
            break;
        default:
            opimgdir = dir + "v7/"
            opimg = "OP_ver07_";
            break;
    }

    for (let i = 1; i <= 60; i++) {
        let no = ("000" + i).slice(-3)
        let sp = new Sprite(ImageManager.loadBitmap(opimgdir, (opimg + no), null, true));
        if (i > 1) {
            sp.opacity = 0;
        }
        this._topImgList.push(sp);
    }
};

var _Dobby_CommonAddScript_Scene_Title_prototype_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function () {

    //this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
    this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
    for (i = 0; i < this._topImgList.length; i++) {
        this.addChild(this._topImgList[i]);
    }
    // this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
};

var _Dobby_CommonAddScript_Scene_Title_prototype_isReady = Scene_Title.prototype.isReady;
Scene_Title.prototype.isReady = function () {
    return _Dobby_CommonAddScript_Scene_Title_prototype_isReady.call(this) && this.isTitleMultImgReady();
};

Scene_Title.prototype.isTitleMultImgReady = function () {
    for (i = 0; i < this._topImgList.length; i++) {
        let result = (this._topImgList[i].bitmap &&
            this._topImgList[i].width > 0 &&
            this._topImgList[i].height > 0);
        if (!result) {
            return false;
        }
    }
    return true;
};

var _Dobby_CommonAddScript_Scene_Title_prototype_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    // this.centerSprite(this._backSprite1);
    // this.centerSprite(this._backSprite2);
    for (i = 0; i < this._topImgList.length; i++) {
        this.centerSprite(this._topImgList[i]);
    }
    this.centerSprite(this._backSprite2);
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
};

var _Dobby_CommonAddScript_Scene_Title_prototype_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function () {
    _Dobby_CommonAddScript_Scene_Title_prototype_update.call(this);
    if (this._dobbyopcnt > 1) {
        this._dobbyopcnt = 0;
        let oldIndex = this._dobbydispIndex;
        this._dobbydispIndex++;
        if (this._dobbydispIndex == this._topImgList.length) {
            oldIndex = 59;
            this._dobbydispIndex = 0;
        }
        this._topImgList[this._dobbydispIndex].opacity = 255;
        this._topImgList[oldIndex].opacity = 0;
    }

    this._dobbyopcnt++;
};

DataManager.loadLatestScenarioVariable = function () {
    var globalInfo = this.loadGlobalInfo();
    var result = (globalInfo && globalInfo.length > 0);
    var maxVariables = 0;

    // 制御
    if (!result) {
        return 0;
    }

    let tmpMaxNum = 0;
    var gazouhenkouyouhensuu = 82;
    for (var i = 1; i < globalInfo.length; i++) {
        let maxVariableIdAndNum = new Array();
        if (this.isThisGameFile(i)) {
            var json = StorageManager.load(i);
            var json2 = JsonEx.parse(json);
            var variablesList = json2.variables._data;
            if (variablesList) {
                if (variablesList.length > gazouhenkouyouhensuu &&
                    variablesList[gazouhenkouyouhensuu] != null &&
                    tmpMaxNum < variablesList[gazouhenkouyouhensuu]) {
                    tmpMaxNum = variablesList[gazouhenkouyouhensuu];
                }
            }
        }
    }
    return tmpMaxNum;
};
//======タイトル連番用処理-End-

// アイテム利用処理
// SP,AP増加処理
// SP、AP増加アイテムを使う場合の処理
var Game_Action_prototype_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function (target) {
    Game_Action_prototype_apply.call(this, target);
    if (this._item && this._item._dataClass == "item" && this.includesItemids(this._item._itemId)) {
        var actorId = target.actorId();
        var spVarable = 0;
        var apVarable = 0;
        switch (actorId) {
            case 1:
                spVarable = 74;
                apVarable = 75;
                break;
            case 2:
                spVarable = 76;
                apVarable = 77;
                break;
            case 3:
                spVarable = 78;
                apVarable = 79;
                break;
            case 4:
                spVarable = 80;
                apVarable = 81;
                break;
        }
        var spVal = $gameVariables.value(spVarable);
        var apVal = $gameVariables.value(apVarable);
        switch (this._item._itemId) {
            case 295:
            case 400:
            case 420:
            case 443:
            case 457:
            case 484:
            case 491:
            case 495:
            case 499:
            case 503:
            case 507:
            case 511:
            case 516:
            case 548:
            case 85:
                $gameVariables.setValue(spVarable, spVal + 1);
                break;
            case 296:
            case 92:
                $gameVariables.setValue(spVarable, spVal + 3);
                break;
            case 297:
            case 401:
            case 421:
            case 444:
            case 458:
            case 485:
            case 492:
            case 496:
            case 500:
            case 504:
            case 508:
            case 512:
            case 517:
            case 547:
            case 572:
            case 574:
                $gameVariables.setValue(apVarable, apVal + 1);
                break;
            case 298:
                $gameVariables.setValue(apVarable, apVal + 3);
                break;
            case 550:
                $gameVariables.setValue(apVarable, apVal + 1);
                $gameVariables.setValue(spVarable, spVal + 1);
                break;
        }
    }

};

Game_Action.prototype.includesItemids = function (itemId) {
    if (itemId) {
        let itemIds = [
            85, 92, 295, 296, 400, 420, 443, 457, 484, 491, 495, 499, 503, 507, 511, 516, 548,
            297, 298, 401, 421, 444, 458, 485, 492, 496, 500, 504, 508, 512, 517, 547, 572, 574,
            550
        ];
        return itemIds.includes(Number(itemId));
    }
    return false;
};

// レベルアップ時にSPを1追加
// 1レベル上がるごとに1
(function (_global) {
    const dobby_commonaddScript_levelup = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function () {
        var defaultLevelUp = dobby_commonaddScript_levelup.call(this);
        var spVarable = 0;
        switch (this._actorId) {
            case 1:
                spVarable = 74;
                if (this._level >= 5) {
                    var args = new Array();
                    args.push('力自慢');
                    this.getTrophy(args);
                }

                if (this._level >= 10) {
                    var args = new Array();
                    args.push('頼りになる存在');
                    this.getTrophy(args);
                }

                if (this._level >= 15) {
                    var args = new Array();
                    args.push('剛の者');
                    this.getTrophy(args);
                }

                if (this._level >= 25) {
                    var args = new Array();
                    args.push('偉大なる戦士');
                    this.getTrophy(args);
                }

                if (this._level >= 40) {
                    var args = new Array();
                    args.push('女神アクティナの剣');
                    this.getTrophy(args);
                }
                break;
            case 2:
                spVarable = 76;
                if (this._level >= 5) {
                    var args = new Array();
                    args.push('貧相な魔法使い');
                    this.getTrophy(args);
                }

                if (this._level >= 10) {
                    var args = new Array();
                    args.push('本を読む者');
                    this.getTrophy(args);
                }

                if (this._level >= 15) {
                    var args = new Array();
                    args.push('三解の達成者');
                    this.getTrophy(args);
                }

                if (this._level >= 25) {
                    var args = new Array();
                    args.push('三日月を纏う者');
                    this.getTrophy(args);
                }

                if (this._level >= 40) {
                    var args = new Array();
                    args.push('次世代のアークメイジ');
                    this.getTrophy(args);
                }
                break;
            case 3:
                spVarable = 78;
                if (this._level >= 5) {
                    var args = new Array();
                    args.push('大きな小動物');
                    this.getTrophy(args);
                }

                if (this._level >= 10) {
                    var args = new Array();
                    args.push('獣耳の盗賊');
                    this.getTrophy(args);
                }

                if (this._level >= 15) {
                    var args = new Array();
                    args.push('闇を駆ける者');
                    this.getTrophy(args);
                }

                if (this._level >= 25) {
                    var args = new Array();
                    args.push('バトルシーフ');
                    this.getTrophy(args);
                }

                if (this._level >= 40) {
                    var args = new Array();
                    args.push('女神デイレーの影');
                    this.getTrophy(args);
                }
                break;
            case 4:
                spVarable = 80;
                if (this._level >= 5) {
                    var args = new Array();
                    args.push('酔っぱらい僧侶');
                    this.getTrophy(args);
                }

                if (this._level >= 10) {
                    var args = new Array();
                    args.push('温かい手を持つ者');
                    this.getTrophy(args);
                }

                if (this._level >= 15) {
                    var args = new Array();
                    args.push('救いの手を持つ者');
                    this.getTrophy(args);
                }

                if (this._level >= 25) {
                    var args = new Array();
                    args.push('奇跡の体現者');
                    this.getTrophy(args);
                }

                if (this._level >= 40) {
                    var args = new Array();
                    args.push('女神イミセリノスの祝福');
                    this.getTrophy(args);
                }
                break;
        }

        //使うことがあったら使用する空コード
        // if ($gameActors.actor(1).level >= 40 &&
        //     $gameActors.actor(2).level >= 40 &&
        //     $gameActors.actor(3).level >= 40 &&
        //     $gameActors.actor(4).level >= 40) {
        //
        // }

        var spVal = $gameVariables.value(spVarable);
        $gameVariables.setValue(spVarable, spVal + 1);

    };

    Game_Actor.prototype.getTrophy = function (args) {
        Game_Interpreter.prototype.pluginCommand('実績', args);
    };
})();

Window_BattleLog.prototype.drawBackground = function () {
    var rect = this.backRect();
    var color = this.backColor();
    this._backBitmap.clear();
    this._backBitmap.paintOpacity = this.backPaintOpacity();
    let half = (Graphics.width / 2) - (rect.width / 2) + 100;
    this._backBitmap.fillRect(half, rect.y + 55, rect.width, rect.height, color);
    this._backBitmap.paintOpacity = 255;
};

var dobby_commonaddScript_Window_BattleLog_itemRectForText = Window_BattleLog.prototype.itemRectForText;
Window_BattleLog.prototype.itemRectForText = function (index) {
    var rect = dobby_commonaddScript_Window_BattleLog_itemRectForText.call(this, index);
    rect.y = rect.y + 55;
    rect.x = (Graphics.width / 2) - (rect.width / 2);
    return rect;
};

function relmKaidoku(num, keta) {
    const relmkaidokuVariableNum = 100;
    let relmKaidoku = $gameVariables.value(relmkaidokuVariableNum);
    if (relmKaidoku == 0) {
        $gameVariables.setValue(relmkaidokuVariableNum, Number(num));
    } else {
        let relmNumStr = relmKaidoku.toString(10);
        let joinNum = num.toString(10);
        let result = (Array(keta).join('0') + relmNumStr + joinNum).slice(-keta);
        $gameVariables.setValue(relmkaidokuVariableNum, Number(result));
    }
}

function recollectionAddSwitchids() {
    let ids = new Array();
    for (let i = 2001; i < 2066; i++) {
        ids.push(i);
    }
    for (var i = 1; i <= DataManager.maxSavefiles(); i++) {
        var data = null;
        try {
            data = StorageManager.loadFromLocalFile(i);
        } catch (e) {
            data = StorageManager.loadFromWebStorage(i);
        }
        if (data) {
            var save_data_obj = JsonEx.parse(data);
            for (var j = 0; j < ids.length; j++) {
                var switchId = ids[j];
                if (save_data_obj["switches"]._data[switchId] &&
                    save_data_obj["switches"]._data[switchId] == true) {
                    $gameSwitches.setValue(switchId, true);
                }
            }
        }
    }
};

Game_System.prototype.testDragonDobby = function (dnu, istr) {
    return true
    if (dnu && istr) {
        let str = istr;
        switch (dnu) {
            case 1:
                if (str.length == 3) {
                    for (let i = 0; i < str.length; i++) {
                        let test = str.charCodeAt(i);
                        switch (i) {
                            case 0:
                                if (test != 12463) {
                                    return false;
                                }
                                break;
                            case 1:
                                if (test != 12524) {
                                    return false;
                                }
                                break;
                            case 2:
                                if (test != 12450) {
                                    return false;
                                }
                                break;
                        }
                    }
                    return true;
                }
                break;
            case 2:
                if (str.length == 3) {
                    for (let i = 0; i < str.length; i++) {
                        let test = str.charCodeAt(i);
                        switch (i) {
                            case 0:
                                if (test != 12522) {
                                    return false;
                                }
                                break;
                            case 1:
                                if (test != 12523) {
                                    return false;
                                }
                                break;
                            case 2:
                                if (test != 12512) {
                                    return false;
                                }
                                break;
                        }
                    }
                    return true;
                }
                break;
            case 3:
                if (str.length == 2) {
                    for (let i = 0; i < str.length; i++) {
                        let test = str.charCodeAt(i);
                        switch (i) {
                            case 0:
                                if (test != 12494) {
                                    return false;
                                }
                                break;
                            case 1:
                                if (test != 12521) {
                                    return false;
                                }
                                break;
                        }
                    }
                    return true;
                }
                break;
            case 4:
                if (str.length == 4) {
                    for (let i = 0; i < str.length; i++) {
                        let test = str.charCodeAt(i);
                        switch (i) {
                            case 0:
                                if (test != 12477) {
                                    return false;
                                }
                                break;
                            case 1:
                                if (test != 12501) {
                                    return false;
                                }
                                break;
                            case 2:
                                if (test != 12451) {
                                    return false;
                                }
                                break;
                            case 3:
                                if (test != 12450) {
                                    return false;
                                }
                                break;
                        }
                    }
                    return true;
                }
                break;
        }
    }

    return false;
};

Game_System.prototype.getAdultTrophiy = function () {
    let ignoreList = new Array();
    // セーブデータを跨いでチェックする場合は3000
    // セーブデータ内のみの場合は、2000にする
    const swtchAddNum = 3000;

    // todo アペンドになる除外リスト
    // アペンドに移動したやつはignoreListから削除
    // ignoreList.push((swtchAddNum + 823));
    // ignoreList.push((swtchAddNum + 836));
    // ignoreList.push((swtchAddNum + 839));
    // ignoreList.push((swtchAddNum + 848));
    // ignoreList.push((swtchAddNum + 894));
    // ignoreList.push((swtchAddNum + 897));
    // ignoreList.push((swtchAddNum + 898));
    // ignoreList.push((swtchAddNum + 905));

    // let charAdultSwitch =
    // {
    //     1:
    //         {
    //             1:[806,813],
    //             2:[803,809,814,817],
    //             3:[804,807,812,818,821],
    //             4:[810,815,818,820,823,824,825],
    //             5:[802,805,808,816,819,822],
    //             6:[801,811]// その他
    //         },
    //     2:
    //         {
    //             1:[826,831],
    //             2:[827,828,832,840],
    //             3:[835,837,841,842,845],
    //             4:[833,836,838,843,846,847,848,841,845],
    //             5:[829,830,839,844],// 敗北エロ(839はアペンドっぽい)
    //             6:[834],// その他
    //         },
    //     3:
    //         {
    //             1:[852,854],
    //             2:[849,862,859,866],
    //             3:[853,855,856,864,867],
    //             4:[850,857,850,868,869,870,867],
    //             5:[851,858,863,865],// 敗北エロ
    //             6:[861]// その他
    //         },
    //     4:
    //         {
    //             1:[873,874],
    //             2:[876,880,883,889],
    //             3:[877,879,882,885,888,890],
    //             4:[884,886,891,893,894,895,882,890],
    //             5:[875,878,887,892],// 敗北エロ
    //             6:[861]// その他
    //         },
    //     5:
    //     {
    //         1:[896,897,898,902,903,904,905]// エロ（897,898,905はアペンド）
    //     },
    // };

    let charAdultSwitch = this.getdobbySceneNum();
    let dobbyAdultSwitchMap = this.getDobbyAddAdultSwitches();

    let totalCharcnt = 0;
    let allCnt = 0;
    for (let fCharId = 1; fCharId < 6; fCharId++) {
        let charCnt = 0;
        let allCharCnt = 0;
        let adultCharLvList = charAdultSwitch[fCharId];

        for (let j = 0; j < Object.keys(adultCharLvList).length; j++) {
            let flv = (j + 1);
            let lvList = adultCharLvList[flv];
            let lvCnt = 0;
            let lvAllCnt = 0;
            for (let k = 0; k < lvList.length; k++) {
                let targetSwitchId = (lvList[k] + swtchAddNum);
                if (!ignoreList.includes(targetSwitchId)) {
                    if (dobbyAdultSwitchMap[lvList[k]]) {
                        lvCnt++;
                    }
                    // if ($gameSwitches.value(targetSwitchId)) {
                    //     lvCnt++;
                    // }
                    lvAllCnt++;
                }
            }

            if (lvAllCnt > 0 && lvCnt == lvAllCnt && flv != 6) {// その他はレベル別にカウントしない
                this.getAdultSceneTrophiy(fCharId, flv);
            }
            charCnt += lvCnt;
            allCharCnt += lvAllCnt;
        }

        // キャラ単位の全てのアダルトシナリオを見ている場合
        // その他キャラの場合は、「全キャラ視聴」の概念がないため、対象外にする
        if (allCharCnt > 0 && charCnt == allCharCnt && fCharId != 5) {
            this.getAdultSceneTrophiy(fCharId, 6);
        }

        totalCharcnt += allCharCnt;
        allCnt += charCnt;

    }

    if (totalCharcnt > 0 && allCnt == totalCharcnt) {
        // 完全に全キャラの全てのアダルトシーンを見た時に解放
        Game_Interpreter.prototype.pluginCommand('実績', ["大淫婦"]);
    }
};

Game_System.prototype.getDobbyAddAdultSwitches = function () {

    let rtnObj = {};
    let checkCharAdult = this.getdobbySceneNum();
    let charAdultSabun =
    {
        810: [2001, 2002, 2003, 2004], //(衣装差分/射精差分)(クレアLvMAX)
        812: [2005, 2006], //(衣装差分)(クレアLv3)
        815: [2008, 2009], //(射精差分)(クレアLvMAX)
        820: [2010, 2011], //(射精差分)(クレアLvMAX)
        821: [2012, 2013], //(射精差分)(クレアLv3)
        823: [2014, 2015], //(射精差分)(クレアLvMAX)
        833: [2054, 2055, 2016, 2017], //(衣装差分/射精差分)(リルムLvMAX)
        835: [2056, 2057, 2018, 2019], //(衣装差分/射精差分)(リルムLv3)
        836: [2020, 2021], //(射精差分)(リルムLvMAX)
        838: [2022, 2023], //(射精差分)(リルムLvMAX)
        841: [2024, 2025], //(射精差分)(リルムLvMAX(Lv3もある)
        843: [2026, 2027], //(射精差分)(リルムLvMAX)
        857: [2028, 2029], //(射精差分)(ノラLvMAX)
        860: [2058, 2059], //(衣装差分)(ノラLvMAX)
        862: [2030, 2031], //(射精差分)(ノラLv2)
        864: [2032, 2033], //(射精差分)(ノラLv3)
        867: [2034, 2035], //(射精差分)(ノラLv3)
        868: [2060, 2061, 2036, 2037], //(衣装差分/射精差分)(ノラLvMAX)
        869: [2038, 2039], //(射精差分)(ノラLvMAX)
        877: [2044, 2045], //(射精差分)(ソフィアLv3)
        879: [2062, 2063], //(衣装差分)(ソフィアLv3)
        884: [2064, 2065], //(衣装差分)(ソフィアLvMAX)
        886: [2046, 2047], //(衣装差分)(ソフィアLvMAX)
        891: [2048, 2049], //(射精差分)(ソフィアLvMAX)
        893: [2050, 2051], //(射精差分)(ソフィアLvMAX)
        894: [2052, 2053], //(射精差分)(ソフィアLvMAX)
    };

    for (var i = 1; i <= DataManager.maxSavefiles(); i++) {
        var data = null;
        try {
            data = StorageManager.loadFromLocalFile(i);
        } catch (e) {
            data = StorageManager.loadFromWebStorage(i);
        }
        if (data) {
            var save_data_obj = JsonEx.parse(data);

            for (let fCharId = 1; fCharId < 6; fCharId++) {
                let adultCharLvList = checkCharAdult[fCharId];
                for (let j = 0; j < Object.keys(adultCharLvList).length; j++) {
                    let flv = (j + 1);
                    let adultList = adultCharLvList[flv];
                    for (let k = 0; k < adultList.length; k++) {
                        rtnObj[adultList[k]] = false;
                        let sabunList = charAdultSabun[adultList[k]];
                        if (sabunList && sabunList.length > 0) {
                            let sabunCnt = 0;
                            // 差分があるやつは差分全部OKであれば、そのシーンはOKとする
                            for (let l = 0; l < sabunList.length; l++) {
                                if (save_data_obj["switches"]._data[sabunList[l]] &&
                                    (save_data_obj["switches"]._data[sabunList[l]] == true ||
                                        $gameSwitches.value(sabunList[l]))
                                ) {
                                    sabunCnt++;
                                }
                            }
                            rtnObj[adultList[k]] = (sabunList.length == sabunCnt);
                        } else {
                            let targetSwitchId = (adultList[k] + 3000);
                            if (save_data_obj["switches"]._data[targetSwitchId] &&
                                (save_data_obj["switches"]._data[targetSwitchId] == true ||
                                    $gameSwitches.value(targetSwitchId))
                            ) {
                                rtnObj[adultList[k]] = true
                            }
                        }
                    }

                }
            }
        }
    }

    return rtnObj;
};

Game_System.prototype.getdobbySceneNum = function () {
    return {
        1:
        {
            1: [806, 813],
            2: [803, 809, 814, 817],
            3: [804, 807, 812, 818, 821],
            4: [810, 815, 820, 823, 824, 825],
            5: [802, 805, 808, 816, 819, 822],// 敗北エロ
            6: [801, 811]// その他
        },
        2:
        {
            1: [826, 831],
            2: [827, 828, 832, 840],
            3: [835, 837, 841, 842, 845],
            4: [833, 836, 838, 843, 846, 847, 848, 841, 845],
            5: [829, 830, 839, 844],// 敗北エロ(839はアペンドっぽい)
            6: [834]// その他
        },
        3:
        {
            1: [852, 854],
            2: [849, 862, 859, 866],
            3: [853, 855, 856, 864, 867],
            4: [850, 857, 850, 868, 869, 870, 867],
            5: [851, 858, 863, 865],// 敗北エロ
            6: [861]// その他
        },
        4:
        {
            1: [873, 874],
            2: [876, 880, 883, 889],
            3: [877, 879, 882, 885, 888, 890],
            4: [884, 886, 891, 893, 894, 895, 882, 890],
            5: [875, 878, 887, 892],// 敗北エロ
            6: [872, 881]// その他

        },
        5:
        {
            1: [896, 897, 898, 902, 903, 904, 905]// エロ（897,898,905はアペンド）
        },
    };
};
Game_System.prototype.getAdultSceneTrophiy = function (actorId, lv) {
    let charTrophiyList =
    {
        1:
        {
            1: "強い拒否感",
            2: "恥ずべきこと",
            3: "依頼という言い訳",
            4: "言いなりの女戦士",
            5: "悲劇の女戦士",
            6: "親不孝者"
        },
        2:
        {
            1: "強い不快感",
            2: "不機嫌",
            3: "危険な好奇心",
            4: "快楽の女魔法使い",
            5: "悲劇の女魔法使い",
            6: "性の探求者"
        },
        3:
        {
            1: "強い恐怖心",
            2: "性への意識",
            3: "獣人の雌",
            4: "発情した女盗賊",
            5: "悲劇の女盗賊",
            6: "卑しい雌犬"
        },
        4:
        {
            1: "強い嫌悪感",
            2: "あの方のために",
            3: "性職者",
            4: "倒錯の女僧侶",
            5: "悲劇の女僧侶",
            6: "心ここにあらず"
        },
        5:
        {
            1: "それぞれの物語"
        }
    };
    let troPihList = charTrophiyList[actorId];
    let argsList = new Array();
    argsList.push(troPihList[lv])
    Game_Interpreter.prototype.pluginCommand('実績', argsList);
};

Window_ShopCommand.prototype.makeCommandList = function () {
    if ($gameSwitches.value(133)) {
        this.addCommand("閲覧する", 'buy');
    } else {
        this.addCommand(TextManager.buy, 'buy');
        this.addCommand(TextManager.sell, 'sell', !this._purchaseOnly);
    }

    this.addCommand(TextManager.cancel, 'cancel');
};

///////////////////////////////////////////////////////////////////////////////
function auctionItem() {
    $gameSwitches.setValue(134, false); //134:オークション防具商品スイッチ
    var itemIdList = [341, 342, 343, 344, 345, 529, 530]; //529:怪しいツボ //530:オーガ殺し
    var itemIdinitPlice = [10000, 10000, 10000, 10000, 10000, 10000, 3000];
    if ($gameParty.numItems($dataItems[528]) === 0 && !$gameSwitches.value(137)) { //137:英雄の石像所持スイッチ
        itemIdList.push(528);
        itemIdinitPlice.push(10000);
    }
    if ($gameParty.numItems($dataItems[531]) === 0 && !$gameSwitches.value(218)) { //218:生きた石像所持スイッチ
        itemIdList = [531]
        itemIdinitPlice = [80000];
    }
    if ($gameVariables.value(713) === 15 && $gameParty.numItems($dataItems[530]) === 0) { //713:最低の一杯
        itemIdList = [530]
        itemIdinitPlice = [3000];
    }
    var randomNum = Math.floor(Math.random() * itemIdinitPlice.length);
    let sItem = itemIdList[randomNum];
    let sItemInitPrice = itemIdinitPlice[randomNum];

    if (sItem !== 528 && sItem !== 529 && sItem !== 530 && sItem !== 531) {
        $gameSwitches.setValue(134, true); //134:オークション防具商品スイッチ
    }
    $gameVariables.setValue(61, sItem); //61:オークションID管理
    $gameVariables.setValue(66, sItemInitPrice); //66:オークション現在のオークション金額管理
    var priceMin = Number(sItemInitPrice) + Number(101);
    if (sItem !== 528 && sItem !== 531) {
        var itemIdMaxPlice = [11000, 30000, 40000, 50000, 60000];
        var priceMax = itemIdMaxPlice[Math.floor(Math.random() * itemIdMaxPlice.length)];
        $gameVariables.setValue(63, Math.floor(Math.random() * (priceMax - priceMin)) + priceMin); //63:オークション人1所持金
        priceMax = itemIdMaxPlice[Math.floor(Math.random() * itemIdMaxPlice.length)];
        $gameVariables.setValue(64, Math.floor(Math.random() * (priceMax - priceMin)) + priceMin); //64:オークション人2所持金
        priceMax = itemIdMaxPlice[Math.floor(Math.random() * itemIdMaxPlice.length)];
        $gameVariables.setValue(65, Math.floor(Math.random() * (priceMax - priceMin)) + priceMin); //65:オークション人3所持金
    } else if (sItem === 528) {
        $gameVariables.setValue(63, 70000);
        $gameVariables.setValue(64, 100000);
        $gameVariables.setValue(65, 80000);
    } else if (sItem === 531) {
        $gameVariables.setValue(63, 100000);
        $gameVariables.setValue(64, 135000);
        $gameVariables.setValue(65, 120000);
    }
};

function auctionGainItem() {
    if ($gameSwitches.value(134)) {
        $gameParty.gainItem($dataArmors[$gameVariables.value(61)], 1, true);
    } else {
        $gameParty.gainItem($dataItems[$gameVariables.value(61)], 1);
    }
};

///////////////////////////////////////////////////////////////////////////////

function setDobbyAllSkillCntbyBefor() {

    if ($gameActors.actor(1)) {
        $gameVariables.setValue(111, $gameActors.actor(1).skills().length);
    }
    if ($gameActors.actor(2)) {
        $gameVariables.setValue(113, $gameActors.actor(2).skills().length);
    }
    if ($gameActors.actor(3)) {
        $gameVariables.setValue(112, $gameActors.actor(3).skills().length);
    }
    if ($gameActors.actor(4)) {
        $gameVariables.setValue(114, $gameActors.actor(4).skills().length);
    }
};

function setDobbyAllSkillCntbyAfter() {

    if ($gameActors.actor(1)) {
        $gameVariables.setValue(115, $gameActors.actor(1).skills().length);
    }
    if ($gameActors.actor(2)) {
        $gameVariables.setValue(117, $gameActors.actor(2).skills().length);
    }
    if ($gameActors.actor(3)) {
        $gameVariables.setValue(116, $gameActors.actor(3).skills().length);
    }
    if ($gameActors.actor(4)) {
        $gameVariables.setValue(118, $gameActors.actor(4).skills().length);
    }
};

const _Scene_Shop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function () {
    _Scene_Shop_create.apply(this, arguments);
    if ($gameSwitches.value(135) && //135:コイン交換用スイッチ
        !$gameSwitches.value(200)) { //200:is初回古代コインショップ
        this.commandBuy();
        this.onBuyCancel();
    }
};

function isShopZaikoZERO(id) {
    let shopnv = $gameSystem.getInventoryById(id);
    let itemStock = shopnv._itemStock;
    let weaponStock = shopnv._weaponStock;
    let armorStock = shopnv._armorStock;
    let abilityOrbStock = shopnv._abilityOrbStock;

    // if (Object.keys(shopnv._itemStock).length === 0 ||
    //     Object.keys(shopnv._weaponStock).length === 0 ||
    //     Object.keys(shopnv._armorStock).length === 0 ||
    //     Object.keys(shopnv._abilityOrbStock).length === 0) {
    //     return false;
    // }

    let itnCnt = 0;
    itnCnt += cntStock(itemStock);
    if (itnCnt > 0) {
        return false;
    }

    itnCnt += cntStock(weaponStock);
    if (itnCnt > 0) {
        return false;
    }

    itnCnt += cntStock(armorStock);
    if (itnCnt > 0) {
        return false;
    }

    itnCnt += cntStock(abilityOrbStock);
    if (itnCnt > 0) {
        return false;
    }

    return true;
}

function cntStock(item) {
    let itnCnt = 0;
    if (item && Object.keys(item).length > 0) {
        for (let key in item) {
            itnCnt += item[key];
        }
    }
    return itnCnt;
};

function experienceAdultSwitch() {
    let adultSwitch = [
        801,
        802,
        803,
        806,
        809,
        813,
        814,
        817,
        819,
        826,
        827,
        828,
        830,
        831,
        832,
        840,
        849,
        852,
        854,
        859,
        862,
        866,
        872,
        873,
        874,
        876,
        878,
        880,
        883,
        889
    ]
    for (let i = 0; i < adultSwitch.length; i++) {
        let switchNo = 3000 + adultSwitch[i];
        $gameSwitches.setValue(switchNo, true);
    }
    $gameSwitches.setValue(2030, true);
    $gameSwitches.setValue(2031, true);
}

Window_GameEnd.prototype.makeCommandList = function () {
    this.addCommand("ゲームに戻る", 'cancel');
    this.addCommand(TextManager.toTitle, 'toTitle');
    this.addCommand("シャットダウン", 'shutDown');
};

Scene_GameEnd.prototype.createCommandWindow = function () {
    this._commandWindow = new Window_GameEnd();
    this._commandWindow.setHandler('toTitle', this.commandToTitle.bind(this));
    this._commandWindow.setHandler('shutDown', this.gameShutdownCommand.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_GameEnd.prototype.gameShutdownCommand = function () {
    SceneManager.exit();
};

function isTowerDefenceLoseCheck(thisObj, isSanmegami) {
    let addYpos = 0;
    if (isSanmegami) {
        addYpos = 1;
    }
    var goalX = $gameMap.event(Number(thisObj._eventId))._x;
    var goalY = $gameMap.event(Number(thisObj._eventId))._y + addYpos;
    for (let i = 1; i < $gameMap.events().length; i++) {
        if ($gameMap.event(Number(i))._isTowerDefenceEnemy) {
            var eventx = $gameMap.event(Number(i))._x;
            var eventy = $gameMap.event(Number(i))._y;
            if ((eventx === goalX) && (eventy === goalY)) {
                return true;
            }
        }
    }

    return false;
};

function isTowerDefenceLoseCheckSanmegami(thisObj) {
    return isTowerDefenceLoseCheck(thisObj, true);
};

const dobby_commonAddScript_Game_Event_prototype_initilize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function (mapId, eventId) {
    dobby_commonAddScript_Game_Event_prototype_initilize.call(this, mapId, eventId);
    this._isTowerDefenceEnemy = (this.event().note.indexOf('<TOWER_DEFENCE>') != -1);
    this._isTowerDefenceGoal = (this.event().note.indexOf('<TOWER_DEFENE_GOAL>') != -1);
};

// 画面表示外でもドットを動かすための処理
const dobby_commonAddScript_Game_Event_prototype_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function () {
    if (!this._isTowerDefenceEnemy) {
        dobby_commonAddScript_Game_Event_prototype_updateSelfMovement.call(this);
    } else {
        if (!this._locked && this.checkStop(this.stopCountThreshold())) {
            switch (this._moveType) {
                case 1:
                    this.moveTypeRandom();
                    break;
                case 2:
                    this.moveTypeTowardPlayer();
                    break;
                case 3:
                    this.moveTypeCustom();
                    break;
            }
        }
    }
};