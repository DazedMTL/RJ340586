//=============================================================================
// Dobby_modelChange.js
// 内容：キャラクターのドットを変更するプラグイン
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc キャラクタードットの変更を実施するためのプラグイン
 * @author スタジオドビー
 * 
 * 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
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
 */
//=============================================================================
(function () {
    'use strict';

    var pluginName = "Dobby_ModelChange";
    var pluginName2 = "Dobby_ModelChange2";
    var pluginInputName = "Dobby_Saa_Action";
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            switch (args[0]) {
                case 'start':
                    $gameActors.actor(1).setCharacterImage("Actor2", 1);
                    $gamePlayer.refresh();
                    break;
            }
        } else if (command === pluginName2) {
            switch (args[0]) {
                case 'start':
                    $gameActors.actor(1).setBattlerImage("Lib's_actor2-2");
                    $gamePlayer.refresh();
                    break;
            }
        } else if (command === pluginInputName) {
            switch (args[0]) {
                case 'start':
                    switch (args[1]) {
                        case '0':
                            $gamePlayer.setImage("Actor1", 0);
                            $gamePlayer._followers.refresh();
                            //$gamePlayer.refresh();
                            break;
                        case '1':
                            $gamePlayer.setImage("Actor1", 1);
                            $gamePlayer._followers.refresh();
                            //$gamePlayer.refresh();
                            break;
                        case '2':
                            $gamePlayer.setImage("Actor1", 2);
                            $gamePlayer._followers.refresh();
                            //$gamePlayer.refresh();
                            break;
                        case '3':
                            $gamePlayer.setImage("Actor1", 3);
                            $gamePlayer._followers.refresh();
                            //$gamePlayer.refresh();
                            break;
                    }
                    break;
            }
        }
    };
})();