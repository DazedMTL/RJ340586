//=============================================================================
// RecollectionMode_save_switch_patch.js
// Copyright (c) 2016 rinne_grid
// This plugin is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//
// Version
// 1.0.0 2016/12/24 公開
//=============================================================================
/*:ja
 * @plugindesc セーブデータに、その時点のスイッチ情報を保存することができます。
 *
 * @author rinne_grid
 *
 *
 * @help
 *  プラグインコマンド
 *    RecoModeExt save
 *
 *  イベントでゲームオーバーになった時だけ「敗北CG・シーン」を
 *  回想として追加する必要がある・・・という場合に利用できると思われます。
 *
 *  例・・・1番目のセーブデータでゲームプレイ
 *  ・勝敗でイベント分岐しておく
 *  ・負けた場合：負けた際のCG出現スイッチをONにする
 *  ・プラグインコマンド(RecoModeExt save)を実行する
 *  ・ゲームオーバーの処理を行う
 *  →1番目のセーブデータを改めてロードすると、CG出現スイッチがONの状態で再開できる
 */

(function () {
    var onSwitchid = 0;
    var parameters = PluginManager.parameters('RecollectionMode_save_switch_patch');
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === 'RecoModeExt') {
            switch (args[0]) {
                case 'save':
                    $gameSystem.rngd_recollectionModeExtSave(Number(args[1]));
                    break;
            }
        }
    };

    //-------------------------------------------------------------------------
    // ● 最後にアクセスしたセーブデータをロードし、スイッチ以外のオブジェクトを取得
    //-------------------------------------------------------------------------
    Game_System.prototype.rngd_recollectionModeExtSave = function (switchId) {
        // 1度ロードして、スイッチ以外のオブジェクトを適用
        // スイッチのみを新オブジェクトとして適用したものを保存
        // DataManager.rngd_loadGameExcludeSwitch(DataManager._lastAccessedId);
        // DataManager.rngd_saveGameSwitchOnly(DataManager._lastAccessedId, switchId);
        var result = DataManager.rngd_loadGameExcludeSwitch(DataManager._lastAccessedId);
        if (result) {
            DataManager.rngd_saveGameSwitchOnly(DataManager._lastAccessedId, switchId);
        } else {
            //console.warn("RecollectionMode_save_switch_path.js - セーブデータがありません。セーブをスキップします");
        }
    };

    //-------------------------------------------------------------------------
    // ● loadGame拡張
    //-------------------------------------------------------------------------
    DataManager.rngd_loadGameExcludeSwitch = function (savefileId) {
        try {
            return this.rngd_loadGameWithoutRescueExcludeSwitch(savefileId);
        } catch (e) {
            //console.error(e);
            return false;
        }
    };

    //-------------------------------------------------------------------------
    // ● loadGameWithoutRescue拡張
    //-------------------------------------------------------------------------
    DataManager.rngd_loadGameWithoutRescueExcludeSwitch = function (savefileId) {
        var globalInfo = this.loadGlobalInfo();
        if (this.isThisGameFile(savefileId)) {
            var json = StorageManager.load(savefileId);
            this.rngd_createGameObjectsExcludeSwitch();
            this.rngd_extractSaveContentsExcludeSwitch(JsonEx.parse(json));
            return true;
        } else {
            return false;
        }
    };

    //-------------------------------------------------------------------------
    // ● createGameObjects拡張：セーブデータのスイッチは利用しない
    //-------------------------------------------------------------------------
    DataManager.rngd_createGameObjectsExcludeSwitch = function () {
        $gameTemp = new Game_Temp();
        rngd_$gameTemp = new Game_Temp();
        rngd_$gameSystem = new Game_System();
        rngd_$gameScreen = new Game_Screen();
        rngd_$gameTimer = new Game_Timer();
        rngd_$gameMessage = new Game_Message();
        // mod tatsunoko
        rngd_$gameSwitches = new Game_Switches();
        rngd_$gameVariables = new Game_Variables();
        rngd_$gameSelfSwitches = new Game_SelfSwitches();
        rngd_$gameActors = new Game_Actors();
        rngd_$gameParty = new Game_Party();
        rngd_$gameTroop = new Game_Troop();
        rngd_$gameMap = new Game_Map();
        rngd_$gamePlayer = new Game_Player();
        // Add tatsunoko
        rngd_$questReportData = new QuestSaveData();
        rngd_$dRegionData = new MapSaveData();
    };

    //-------------------------------------------------------------------------
    // ● extractSaveContents拡張：セーブデータのスイッチは利用しない
    //-------------------------------------------------------------------------
    DataManager.rngd_extractSaveContentsExcludeSwitch = function (contents) {
        rngd_$gameSystem = contents.system;
        rngd_$gameScreen = contents.screen;
        rngd_$gameTimer = contents.timer;
        // mod tatsunoko
        rngd_$gameSwitches = contents.switches;
        rngd_$gameVariables = contents.variables;
        rngd_$gameSelfSwitches = contents.selfSwitches;
        rngd_$gameActors = contents.actors;
        rngd_$gameParty = contents.party;
        rngd_$gameMap = contents.map;
        rngd_$gamePlayer = contents.player;
        // Add tatsunoko
        rngd_$questReportData = contents.questReportData;
        rngd_$dRegionData = contents.dRegionData;
    };

    //-------------------------------------------------------------------------
    // ● saveGame拡張
    //-------------------------------------------------------------------------
    DataManager.rngd_saveGameSwitchOnly = function (savefileId, switchId) {
        try {
            return this.rngd_saveGameWithoutRescueByLoadDataAndCurrentOne(savefileId, switchId);
        } catch (e) {
            console.error(e);
            try {
                StorageManager.remove(savefileId);
            } catch (e2) {
            }
            return false;
        }
    };

    //-------------------------------------------------------------------------
    // ● saveGameWithoutRescue拡張
    //-------------------------------------------------------------------------
    DataManager.rngd_saveGameWithoutRescueByLoadDataAndCurrentOne = function (savefileId, switchId) {
        var json = JsonEx.stringify(this.rngd_makeSaveContentsFromTemp(switchId));
        if (json.length >= 200000) {
            console.warn('Save data too big!');
        }
        StorageManager.save(savefileId, json);
        this._lastAccessedId = savefileId;
        var globalInfo = this.loadGlobalInfo() || [];
        globalInfo[savefileId] = this.makeSavefileInfo();
        this.saveGlobalInfo(globalInfo);
        return true;
    };

    //-------------------------------------------------------------------------
    // ● makeSaveContents拡張
    //-------------------------------------------------------------------------
    DataManager.rngd_makeSaveContentsFromTemp = function (switchId) {
        // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
        var contents = {};
        contents.system = rngd_$gameSystem;
        contents.screen = rngd_$gameScreen;
        contents.timer = rngd_$gameTimer;
        //contents.switches     = $gameSwitches;
        // Add tatsunoko

        rngd_$gameSwitches.setValue(switchId, true);
        contents.switches = rngd_$gameSwitches;
        contents.variables = rngd_$gameVariables;
        contents.selfSwitches = rngd_$gameSelfSwitches;
        contents.actors = rngd_$gameActors;
        contents.party = rngd_$gameParty;
        contents.map = rngd_$gameMap;
        contents.player = rngd_$gamePlayer;

        // Add tatsunoko
        contents.questReportData = rngd_$questReportData;
        contents.dRegionData = rngd_$dRegionData;

        return contents;
    };

})();