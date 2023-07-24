//===================================================================
// Alt_CommonAddScript.js
// 内容：他のプラグインとは違う、独自でスクリプトを組む用のファイル
// 製作者：ALTERED(鈴原マキナ)
// バージョン：Ver1.0
//===================================================================
/*:
 * @plugindesc 他のプラグインとは違う、独自でスクリプトを組む用のファイル
 * @author ALTERED(鈴原マキナ)
 */

function Alt_Func() {
    throw new Error('This is a static class');
}

function Alt_Debug() {
    throw new Error('This is a static class');
}

(function () {
    'use strict';

    //===================================================================
    // コスプレ衣装差分をドット絵に反映させる
    //===================================================================

    (function () {


        const clairCosId_1 = 481; //女神アクティナの装束
        const clairCosId_2 = 482; //黒色の踊り子衣装
        const clairCosId_3 = 483; //英雄の水着
        const clairCosId_4 = 493; //悪魔イシェケルの右足
        const clairCosId_5 = 494; //従属のメイド服
        // const clairCosIds  = [clairCosId_1, clairCosId_2, clairCosId_3, clairCosId_4, clairCosId_5];

        const noraCosId_1 = 487; //女神デイレーの装束
        const noraCosId_2 = 488; //赤色の踊り子衣装
        const noraCosId_3 = 489; //女傑の水着
        const noraCosId_4 = 495; //悪魔レフガリアの礼装
        // const noraCosIds  = [noraCosId_1, noraCosId_2, noraCosId_3, noraCosId_4];


        const relmCosId_1 = 484; //女神イミセリノスのドレス
        const relmCosId_2 = 485; //赤橙の踊り子衣装
        const relmCosId_3 = 486; //賢者の水着
        const relmCosId_4 = 496; //極東の礼装
        // const relmCosIds  = [relmCosId_1, relmCosId_2, relmCosId_3, relmCosId_4];


        const sophiaCosId_1 = 490; //悪魔イシェケルの左足
        const sophiaCosId_2 = 491; //水色の踊り子衣装
        const sophiaCosId_3 = 492; //隠者の水着
        const sophiaCosId_4 = 497; //悪魔ナムドの礼装
        // const sophiaCosIds  = [sophiaCosId_1, sophiaCosId_2, sophiaCosId_3, sophiaCosId_4];

        Alt_Func.equipsId = function (actorId) {
            if (!!$gameActors.actor(actorId).equips()[3]) {
                return $gameActors.actor(actorId).equips()[3].id;
            } else {
                return false;
            }
        }

        Alt_Func.popSceneSetCharacterImage = function () {

            //クレア
            switch (this.equipsId(1)) {
                case clairCosId_1:
                    $gameActors.actor(1).setCharacterImage("MainChar_cos1", 0);
                    break;
                case clairCosId_2:
                    $gameActors.actor(1).setCharacterImage("MainChar_cos2", 0);
                    break;
                case clairCosId_3:
                    $gameActors.actor(1).setCharacterImage("MainChar_cos3", 0);
                    break;
                case clairCosId_4:
                    $gameActors.actor(1).setCharacterImage("MainChar_cos4", 0);
                    break;
                case clairCosId_5:
                    $gameActors.actor(1).setCharacterImage("MainChar_cos5", 0);
                    break;
                default:
                    switch ($gameVariables.value(15)) {
                        case 1:
                            $gameActors.actor(1).setCharacterImage("clea_first", 0);
                            break;
                        case 2:
                            $gameActors.actor(1).setCharacterImage("MainChar", 0);
                            break;
                        case 3:
                            $gameActors.actor(1).setCharacterImage("clea_ad", 0);
                            break;
                    }
            }

            //ノラ
            switch (this.equipsId(3)) {
                case clairCosId_1:
                    $gameActors.actor(3).setCharacterImage("MainChar_cos1", 1);
                    break;
                case clairCosId_2:
                    $gameActors.actor(3).setCharacterImage("MainChar_cos2", 1);
                    break;
                case clairCosId_3:
                    $gameActors.actor(3).setCharacterImage("MainChar_cos3", 1);
                    break;
                case clairCosId_4:
                    $gameActors.actor(3).setCharacterImage("MainChar_cos4", 1);
                    break;
                default:
                    $gameActors.actor(3).setCharacterImage("MainChar", 1);
            }

            //リルム
            switch (this.equipsId(2)) {
                case clairCosId_1:
                    $gameActors.actor(2).setCharacterImage("MainChar_cos1", 2);
                    break;
                case clairCosId_2:
                    $gameActors.actor(2).setCharacterImage("MainChar_cos2", 2);
                    break;
                case clairCosId_3:
                    $gameActors.actor(2).setCharacterImage("MainChar_cos3", 2);
                    break;
                case clairCosId_4:
                    $gameActors.actor(2).setCharacterImage("MainChar_cos4", 2);
                    break;
                default:
                    $gameActors.actor(2).setCharacterImage("MainChar", 2);
            }

            //ソフィア
            switch (this.equipsId(4)) {
                case clairCosId_1:
                    $gameActors.actor(4).setCharacterImage("MainChar_cos1", 3);
                    break;
                case clairCosId_2:
                    $gameActors.actor(4).setCharacterImage("MainChar_cos2", 3);
                    break;
                case clairCosId_3:
                    $gameActors.actor(4).setCharacterImage("MainChar_cos3", 3);
                    break;
                case clairCosId_4:
                    $gameActors.actor(4).setCharacterImage("MainChar_cos4", 3);
                    break;
                default:
                    $gameActors.actor(4).setCharacterImage("MainChar", 3);
            }
        }

        Scene_Base.prototype.popScene = function () {
            if (!$gameSwitches.value(281)) {
                Alt_Func.popSceneSetCharacterImage();
            }
            SceneManager.pop();
        };

        Alt_Func.setCharacterImage = function (actor, actorId) {

            switch (actorId) {
                case 1:
                    //クレア
                    switch (this.equipsId(1)) {
                        case clairCosId_1:
                            actor._characterName = "MainChar_cos1";
                            actor._characterIndex = 0;
                            break;
                        case clairCosId_2:
                            actor._characterName = "MainChar_cos2";
                            actor._characterIndex = 0;
                            break;
                        case clairCosId_3:
                            actor._characterName = "MainChar_cos3";
                            actor._characterIndex = 0;
                            break;
                        case clairCosId_4:
                            actor._characterName = "MainChar_cos4";
                            actor._characterIndex = 0;
                            break;
                        case clairCosId_5:
                            actor._characterName = "MainChar_cos5";
                            actor._characterIndex = 0;
                            break;
                        default:
                            switch ($gameVariables.value(15)) {
                                case 1:
                                    actor._characterName = "clea_first";
                                    actor._characterIndex = 0;
                                    break;
                                case 2:
                                    actor._characterName = "MainChar";
                                    actor._characterIndex = 0;
                                    break;
                                case 3:
                                    actor._characterName = "clea_ad";
                                    actor._characterIndex = 0;
                                    break;
                            }
                    }
                    break;
                case 3:
                    //ノラ
                    switch (this.equipsId(3)) {
                        case noraCosId_1:
                            actor._characterName = "MainChar_cos1";
                            actor._characterIndex = 1;
                            break;
                        case noraCosId_2:
                            actor._characterName = "MainChar_cos2";
                            actor._characterIndex = 1;
                            break;
                        case noraCosId_3:
                            actor._characterName = "MainChar_cos3";
                            actor._characterIndex = 1;
                            break;
                        case noraCosId_4:
                            actor._characterName = "MainChar_cos4";
                            actor._characterIndex = 1;
                            break;
                        default:
                            actor._characterName = "MainChar";
                            actor._characterIndex = 1;
                    }
                    break;
                case 2:
                    //リルム
                    switch (this.equipsId(2)) {
                        case relmCosId_1:
                            actor._characterName = "MainChar_cos1";
                            actor._characterIndex = 2;
                            break;
                        case relmCosId_2:
                            actor._characterName = "MainChar_cos2";
                            actor._characterIndex = 2;
                            break;
                        case relmCosId_3:
                            actor._characterName = "MainChar_cos3";
                            actor._characterIndex = 2;
                            break;
                        case relmCosId_4:
                            actor._characterName = "MainChar_cos4";
                            actor._characterIndex = 2;
                            break;
                        default:
                            actor._characterName = "MainChar";
                            actor._characterIndex = 2;
                    }
                    break;
                case 4:
                    //ソフィア
                    switch (this.equipsId(4)) {
                        case sophiaCosId_1:
                            actor._characterName = "MainChar_cos1";
                            actor._characterIndex = 3;
                            break;
                        case sophiaCosId_2:
                            actor._characterName = "MainChar_cos2";
                            actor._characterIndex = 3;
                            break;
                        case sophiaCosId_3:
                            actor._characterName = "MainChar_cos3";
                            actor._characterIndex = 3;
                            break;
                        case sophiaCosId_4:
                            actor._characterName = "MainChar_cos4";
                            actor._characterIndex = 3;
                            break;
                        default:
                            actor._characterName = "MainChar";
                            actor._characterIndex = 3;
                    }
                    break;
            }
        }

        Game_Actor.prototype.setCharacterImage = function (characterName, characterIndex) {
            if (this._actorId === 1 || this._actorId === 2 || this._actorId === 3 || this._actorId === 4) {

                //自動コスプレ画像差替OFF
                if ($gameSwitches.value(281)) {
                    this._characterName = characterName;
                    this._characterIndex = characterIndex;
                    $gamePlayer.refresh();
                    return
                }

                //他キャラでスニーク中
                if ($gameSwitches.value(217)) { //Sk:ペ_スニーク中
                    this._characterName = characterName;
                    this._characterIndex = characterIndex;
                    $gamePlayer.refresh();
                    return
                }

                //通常時は自動でコスプレ装備を判定
                Alt_Func.setCharacterImage(this, this._actorId);

            }

            //パーティメンバー以外の時
            this._characterName = characterName;
            this._characterIndex = characterIndex;
            $gamePlayer.refresh();
        };

        Game_CharacterBase.prototype.isCharaImgEvent = function (event) {
            if (event._characterName === "") return false;
            if (event._characterName !== "clea_first" &&
                event._characterName !== "MainChar" &&
                event._characterName !== "clea_ad") return false;
            return $dataMap.events[event._eventId].name === "クレア" ||
                $dataMap.events[event._eventId].name === "演者：クレア" ||
                $dataMap.events[event._eventId].name === "ノラ" ||
                $dataMap.events[event._eventId].name === "のら" ||
                $dataMap.events[event._eventId].name === "ノラ通常同プライオリティ" ||
                $dataMap.events[event._eventId].name === "盗賊ノラ" ||
                $dataMap.events[event._eventId].name === "演者：ノラ" ||
                $dataMap.events[event._eventId].name === "リルム" ||
                $dataMap.events[event._eventId].name === "魔法使いリルム" ||
                $dataMap.events[event._eventId].name === "演者：リルム" ||
                $dataMap.events[event._eventId].name === "ソフィア" ||
                $dataMap.events[event._eventId].name === "演者：ソフィア" ||
                $dataMap.events[event._eventId].name === "僧侶ソフィア";
        };

        Game_CharacterBase.prototype.setCharacterCosImage = function (actor, actorId) {

            switch (actorId) {
                case 1:
                    //クレア
                    switch (Alt_Func.equipsId(1)) {
                        case clairCosId_1:
                            actor._characterName = "MainChar_cos1";
                            actor._characterIndex = 0;
                            break;
                        case clairCosId_2:
                            actor._characterName = "MainChar_cos2";
                            actor._characterIndex = 0;
                            break;
                        case clairCosId_3:
                            actor._characterName = "MainChar_cos3";
                            actor._characterIndex = 0;
                            break;
                        case clairCosId_4:
                            actor._characterName = "MainChar";
                            actor._characterIndex = 0;
                            break;
                        case clairCosId_5:
                            actor._characterName = "MainChar_cos5";
                            actor._characterIndex = 0;
                            break;
                        default:
                            switch ($gameVariables.value(15)) {
                                case 1:
                                    actor._characterName = "clea_first";
                                    actor._characterIndex = 0;
                                    break;
                                case 2:
                                    actor._characterName = "MainChar";
                                    actor._characterIndex = 0;
                                    break;
                                case 3:
                                    actor._characterName = "clea_ad";
                                    actor._characterIndex = 0;
                                    break;
                            }
                    }
                    break;
                case 2:
                    //ノラ
                    switch (Alt_Func.equipsId(3)) {
                        case noraCosId_1:
                            actor._characterName = "MainChar_cos1";
                            actor._characterIndex = 1;
                            break;
                        case noraCosId_2:
                            actor._characterName = "MainChar_cos2";
                            actor._characterIndex = 1;
                            break;
                        case noraCosId_3:
                            actor._characterName = "MainChar_cos3";
                            actor._characterIndex = 1;
                            break;
                        case noraCosId_4:
                            actor._characterName = "MainChar_cos4";
                            actor._characterIndex = 1;
                            break;
                        default:
                            actor._characterName = "MainChar";
                            actor._characterIndex = 1;
                    }
                    break;
                case 3:
                    //リルム
                    switch (Alt_Func.equipsId(2)) {
                        case relmCosId_1:
                            actor._characterName = "MainChar_cos1";
                            actor._characterIndex = 2;
                            break;
                        case relmCosId_2:
                            actor._characterName = "MainChar_cos2";
                            actor._characterIndex = 2;
                            break;
                        case relmCosId_3:
                            actor._characterName = "MainChar_cos3";
                            actor._characterIndex = 2;
                            break;
                        case relmCosId_4:
                            actor._characterName = "MainChar_cos4";
                            actor._characterIndex = 2;
                            break;
                        default:
                            actor._characterName = "MainChar";
                            actor._characterIndex = 2;
                    }
                    break;
                case 4:
                    //ソフィア
                    switch (Alt_Func.equipsId(4)) {
                        case sophiaCosId_1:
                            actor._characterName = "MainChar_cos1";
                            actor._characterIndex = 3;
                            break;
                        case sophiaCosId_2:
                            actor._characterName = "MainChar_cos2";
                            actor._characterIndex = 3;
                            break;
                        case sophiaCosId_3:
                            actor._characterName = "MainChar_cos3";
                            actor._characterIndex = 3;
                            break;
                        case sophiaCosId_4:
                            actor._characterName = "MainChar_cos4";
                            actor._characterIndex = 3;
                            break;
                        default:
                            actor._characterName = "MainChar";
                            actor._characterIndex = 3;
                    }
                    break;
            }
        }

        Game_CharacterBase.prototype.setImage = function (characterName, characterIndex, actorId) {
            // if (characterName === "clea_ad") debugger;
            this._tileId = 0;
            this._characterName = characterName;
            this._characterIndex = characterIndex;
            this._isObjectCharacter = ImageManager.isObjectCharacter(characterName);

            if (($gamePlayer && $gameActors) && this.constructor.name === "Game_Player") {
                if ($gameSwitches.value(217)) return //Sk:ペ_スニーク中
                if ($gameSwitches.value(281)) return //自動コスプレ画像差替OFF
                Alt_Func.setCharacterImage(this, $gameVariables.value(19)); //先頭キャラクター保持用変数
                return;
            }

            if (($gamePlayer && $gameActors) && this.constructor.name === "Game_Follower") {
                if ($gameSwitches.value(217)) return //Sk:ペ_スニーク中
                if ($gameSwitches.value(281)) return //自動コスプレ画像差替OFF
                Alt_Func.setCharacterImage(this, actorId); //先頭キャラクター保持用変数
                return;
            }

            if (this.constructor.name === "Game_Event" && this.isCharaImgEvent(this)) {
                this.setCharacterCosImage(this, this._characterIndex + 1);
            }
        };

        // Game_CharacterBase.prototype.setImageFollower = function (characterName, characterIndex) {
        //     // if (characterName === "clea_ad") debugger;
        //     this._tileId            = 0;
        //     this._characterName     = characterName;
        //     this._characterIndex    = characterIndex;
        //     this._isObjectCharacter = ImageManager.isObjectCharacter(characterName);
        //
        //
        // };

        // Scene_Base.prototype.popScene = function() {
        //     if ($gameActors.actor(1).equips()[3] && $gameActors.actor(1).equips()[3].id === 494) {
        //         $gameActors.actor(1).setCharacterImage("MainChar_cos", 0);
        //     } else {
        //         $gameActors.actor(1).setCharacterImage("MainChar", 0);
        //     }
        //     $gamePlayer.refresh();
        //     SceneManager.pop();
        // };
        //
        // Game_Actor.prototype.setCharacterImage = function(characterName, characterIndex) {
        //     this._characterName  = characterName;
        //     this._characterIndex = characterIndex;
        //     if (this.equips()[3] && this.equips()[3].id === 494) {
        //         this._characterName  = "MainChar_cos";
        //         this._characterIndex = 0;
        //     } else {
        //         this._characterName  = "MainChar";
        //         this._characterIndex = 0;
        //     }
        //     $gamePlayer.refresh();
        // };
        //
        // Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
        //
        //     this._tileId            = 0;
        //     this._characterName     = characterName;
        //     this._characterIndex    = characterIndex;
        //     this._isObjectCharacter = ImageManager.isObjectCharacter(characterName);
        //
        //     if (($gamePlayer && $gameActors) &&
        //         (this.constructor.name === "Game_Player" || this._characterName === "MainChar")) {
        //         if ($gameActors.actor(1).equips()[3] && $gameActors.actor(1).equips()[3].id === 494) {
        //             this._characterName  = "MainChar_cos";
        //             this._characterIndex = 0;
        //         } else if (this._characterIndex === 0) {
        //             this._characterName  = "MainChar";
        //             this._characterIndex = 0;
        //         }
        //     }
        //
        // };

    })();

    //===================================================================
    // FontのPreload
    //===================================================================

    (function () {
        function ALT_FontPreload() {
            const sprite = new Sprite();
            sprite.bitmap = new Bitmap;

            let _tempWindow = new Window_Base(0, 0, 0, 0);
            _tempWindow.contents = sprite.bitmap;
            _tempWindow.contents.fontFace = 'GameFont2';
            _tempWindow.drawText("Preload", 0, 0, 120);
            _tempWindow.contents = null;
            _tempWindow.destroy();
        }

        const _Scene_Map_initialize = Scene_Map.prototype.initialize;
        Scene_Map.prototype.initialize = function () {
            _Scene_Map_initialize.call(this)
            ALT_FontPreload();
        };
    })();

    //===================================================================
    // Scene_Debug
    //  トップ画面にデバッグデータを表示する。
    //===================================================================

    (function () {
        Scene_Debug.prototype.createDebugHelpWindow = function () {
            var wx = this._editWindow.x;
            var wy = this._editWindow.height;
            var ww = this._editWindow.width;
            var wh = Graphics.boxHeight - wy;
            this._debugHelpWindow = new Window_Base(wx, wy, ww, wh);
            this.addWindow(this._debugHelpWindow);
            this._debugHelpWindow.drawText("MapID : " + $gameMap.mapId(), 0, 0, 400);
            this._debugHelpWindow.drawText($dataMap.displayName, 0, 40, 400);
            console.log($dataMap.displayName);
        };
    })();

    //===================================================================
    // Sprite_Balloon
    //  会話スキップ時、バルーンのthis._durationを0にする。
    //===================================================================

    (function () {
        Sprite_Balloon.prototype.update = function () {
            Sprite_Base.prototype.update.call(this);
            if (this._duration > 0) {
                this._duration--;
                if (!$gameSwitches.value(39) && //Mess:スキップ、オート無効
                    ($gameMessage.skipFlg() || (this.isFastForward()))) {
                    this._duration -= 7;
                }
                if (this._duration > 0) {
                    this.updateFrame();
                }
            }
        };

        Sprite_Balloon.prototype.isFastForward = function () {
            return (Alt_Func.isFastForward());
        };
    })();

    //===================================================================
    // スキップ時の判定
    //===================================================================
    (function () {
        Input.keyMapper[83] = 'S';
        Alt_Func.isFastForward = function () {
            if ($gameTemp.isPlaytest()) {
                return Input.isLongPressed('ok') || TouchInput.isLongPressed() ||
                    Input.isPressed('S');
            } else {
                return Input.isLongPressed('ok') || TouchInput.isLongPressed() ||
                    Input.isPressed('S') || Input.isPressed('control');
            }
            // Input.isPressed('pagedown') || Input.isPressed('control');
        };
    })();

    //===================================================================
    // 決定ボタン長押し時のイベント高速化の仕様変更
    //===================================================================

    (function () {
        // updateMainメソッドを複数回呼び出し、
        // 決定ボタン長押し時のイベント高速化をさらに加速させる
        Scene_Map.prototype.updateMainMultiply = function () {
            this.updateMain();
            if (this.isFastForward()) {
                this.updateMain();
                this.updateMain();
                // this.updateMain();
            }
        };

        Scene_Map.prototype.isFastForward = function () {
            if ($gameSwitches.value(204)) return //204:Mess:スキップ、オート無効
            return ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() &&
                Alt_Func.isFastForward());
        };
    })();

    //===================================================================
    // 文章の表示でskip時、ウィンドウの開閉処理を1fで行う。
    //===================================================================

    (function () {
        Window_Base.prototype.updateOpen = function () {
            if (this._opening) {
                this.openness += 32;
                if ($gameMessage.skipFlg()) this.openness = 255;
                // console.log(this.openness);
                if (this.isOpen()) {
                    this._opening = false;
                }
            }
        };

        Window_Base.prototype.updateClose = function () {
            if (this._closing) {
                this.openness -= 32;
                if ($gameMessage.skipFlg()) this.openness = 0;
                // console.log(this.openness);
                if (this.isClosed()) {
                    this._closing = false;
                }
            }
        };
    })();

    //===================================================================
    // ループ繰り返し時に強制的にウェイト1いれる
    //===================================================================

    (function () {
        // Repeat Above
        Game_Interpreter.prototype.command413 = function () {
            do {
                this._index--;
            } while (this.currentCommand().indent !== this._indent);
            this.wait(1);
            return true;
        };
    })();

    //===================================================================
    // メニューをキャンセルキーに変更
    //===================================================================

    (function () {
        Input.gamepadMapper = {
            0: 'ok',        // A
            1: 'cancel',    // B
            2: 'shift',     // X
            3: 'menu',      // Y
            4: 'pageup',    // LB
            5: 'pagedown',  // RB
            6: 'S',         // LT
            7: 'control',   // RT
            12: 'up',        // D-pad up
            13: 'down',      // D-pad down
            14: 'left',      // D-pad left
            15: 'right',     // D-pad right
        };
    })();

    //===================================================================
    // AAAスキルをパーティースキル化
    //===================================================================

    (function () {
        // //デバッグ用
        // Game_Event.prototype.refresh = function() {
        //     var newPageIndex = this._erased ? -1 : this.findProperPageIndex();
        //     if (this._pageIndex !== newPageIndex) {
        //         this._pageIndex = newPageIndex;
        //         this.setupPage();
        //     }
        //     if (this.eventId() >= 33 && this.eventId() <= 39) console.log(this.eventId(), newPageIndex);
        // };

        const _Game_Event_meetsConditions = Game_Event.prototype.meetsConditions;
        Game_Event.prototype.meetsConditions = function (page) {

            if ($gameSwitches.value(203)) { //203:パーティースキルON
                var c = page.conditions;


                if (c.switch1Valid) {
                    // if (this._eventId === 31) debugger;
                    if (!$gameSwitches.value(c.switch1Id)) {
                        if (!(c.switch1Id >= 54 && c.switch1Id <= 57)) return false;
                    }
                }

                if (c.switch2Valid) {
                    if (!$gameSwitches.value(c.switch2Id)) {
                        if (!(c.switch2Id >= 54 && c.switch2Id <= 57)) return false;
                    }
                }

                if (c.variableValid) {
                    if ($gameVariables.value(c.variableId) < c.variableValue) {
                        return false;
                    }
                }
                if (c.selfSwitchValid) {
                    var key = [this._mapId, this._eventId, c.selfSwitchCh];
                    if ($gameSelfSwitches.value(key) !== true) {
                        return false;
                    }
                }
                if (c.itemValid) {
                    var item = $dataItems[c.itemId];
                    if (!$gameParty.hasItem(item)) {
                        return false;
                    }
                }
                if (c.actorValid) {
                    var actor = $gameActors.actor(c.actorId);
                    if (!$gameParty.members().contains(actor)) {
                        return false;
                    }
                }
                return true;
            } else {
                return _Game_Event_meetsConditions.apply(this, arguments);
            }

        };
    })();


    //===================================================================
    // タイトルアニメーションのプリロード
    //===================================================================
    (function () {
        Alt_Func.titleAnimePreload = function () {
            for (let i = 0; i < 300; i++) {
                let imgName = "Trial_Title_00" + Alt_Func.change3digits(i);
                ImageManager.loadBitmap('img/pictures/title/', imgName, null, true);
            }
        };
    })();
    //===================================================================
    // 1桁の数値の桁数を頭に0を足して3桁文字列に変換
    //===================================================================

    (function () {
        Alt_Func.change3digits = function (value) {
            const digit = String(value).length;
            switch (digit) {
                case 1:
                    return '00' + value;
                case 2:
                    return '0' + value;
                case 3:
                    return value;
            }
        };
    })();

    //===================================================================
    // 1桁の数値の桁数を頭に0を足して2桁文字列に変換
    //===================================================================

    (function () {
        Alt_Func.change2digits = function (value) {
            const digit = String(value).length;
            switch (digit) {
                case 1:
                    return '0' + value;
                case 2:
                    return value;
            }
        };
    })();

    //===================================================================
    // SP300 AP300コマンド
    //===================================================================

    (function () {
        Alt_Debug.inranLv3 = function () {

            //非処女スイッチ
            $gameSwitches.setValue(48, true);
            $gameSwitches.setValue(49, true);
            $gameSwitches.setValue(50, true);
            $gameSwitches.setValue(51, true);

            //SP300、AP300
            for (let i = 74; i < 82; i++) {
                $gameVariables.setValue(i, 300);
            }

        }
    })();

    //===================================================================
    // パーティメンバーの記憶と復元
    //===================================================================

    (function () {
        //記憶
        Alt_Func.savePartyMembers = function () {
            $gameVariables._data[149] = [];
            for (let i = 0; i < $gameParty._actors.length; i++) {
                $gameVariables._data[149].push($gameParty._actors[i]); //149:パーティメンバの記憶
            }
            console.log($gameParty._actors);
        }

        //復元
        Alt_Func.loadPartyMembers = function () {
            $gameParty.removeActor(2);
            $gameParty.removeActor(3);
            $gameParty.removeActor(4);
            console.log($gameVariables._data[149]);
            for (let i = 0; i < $gameVariables.value(149).length; i++) { //149:パーティメンバの記憶
                $gameParty.addActor($gameVariables.value(149)[i]);
            }
            if ($gameVariables._data[149].includes(2) &&
                $gameVariables._data[149].includes(3) &&
                !$gameVariables._data[149].includes(4)) {
                $gameParty.removeActor(2);
                $gameParty.addActor(2);
                return $gameVariables._data[149] = [];
            }
            if ($gameVariables._data[149].includes(2) &&
                $gameVariables._data[149].includes(3) &&
                $gameVariables._data[149].includes(4)) {
                $gameParty.removeActor(3);
                $gameParty.removeActor(2);
                $gameParty.removeActor(4);
                $gameParty.addActor(3);
                $gameParty.addActor(2);
                $gameParty.addActor(4);
                console.log($gameParty._actors);
                return $gameVariables._data[149] = [];
            }
        }
    })();

    //===================================================================
    // 歩行中にHP、MP、TPを再生しない
    //===================================================================

    (function () {
        Game_Actor.prototype.turnEndOnMap = function () {
            if ($gameParty.steps() % this.stepsForTurn() === 0) {
                this.onTurnEndMap();
                if (this.result().hpDamage > 0) {
                    this.performMapDamage();
                }
            }
        };

        Game_Battler.prototype.onTurnEndMap = function () {
            this.clearResult();
            this.regenerateAllMap();
            if (!BattleManager.isForcedTurn()) {
                this.updateStateTurns();
                this.updateBuffTurns();
            }
            this.removeStatesAuto(2);
        };

        Game_Battler.prototype.regenerateAllMap = function () {
            // if (this.isAlive()) {
            //     this.regenerateHp();
            //     this.regenerateMp();
            //     this.regenerateTp();
            // }
        };
    })();

    //===================================================================
    // イベントの画像をシフト(全ページ共通)
    //===================================================================

    (function () {
        Sprite_Character.prototype.updatePosition = function () {
            this.x = this._character.screenX();
            this.y = this._character.screenY();
            this.z = this._character.screenZ();

            const ev = $dataMap.events[this._character._eventId];
            if (ev && ev.meta && ev.meta.CGShiftX) {
                this.x += Number(ev.meta.CGShiftX);
            }
            if (ev && ev.meta && ev.meta.CGShiftY) {
                this.y += Number(ev.meta.CGShiftY);
            }
        };
    })();

    //===================================================================
    // 特殊ゲームオーバー
    //===================================================================

    (function () {
        // Scene_Gameover.prototype.createBackground = function() {
        //     this._backSprite        = new Sprite();
        //     this._backSprite.bitmap = ImageManager.loadSystem('CG085');
        //     this.addChild(this._backSprite);
        // };
    })();

    //===================================================================
    // クレアの衣装を適切な衣装に自動変更
    //===================================================================

    (function () {
        Alt_Func.checkClairCos = function (interpreter) {
            let eventId = 1;
            for (let i = 1; i < $dataMap.events.length; i++) {
                if (!$dataMap.events[i]) continue;
                if ($dataMap.events[i].name === "クレア") {
                    eventId = $dataMap.events[i].id;
                    i = $dataMap.events.length;
                }
            }
            if ($gameVariables.value(15) === 1) {
                interpreter.character(eventId).forceMoveRoute({
                    "list": [
                        { "code": 41, "parameters": ["clea_first", 0] },
                        { "code": 0 }
                    ],
                    "repeat": false,
                    "skippable": true
                })
            } else if ($gameVariables.value(15) === 2) {
                interpreter.character(eventId).forceMoveRoute({
                    "list": [
                        { "code": 41, "parameters": ["MainChar", 0] },
                        { "code": 0 }
                    ],
                    "repeat": false,
                    "skippable": true
                })
            } else if ($gameVariables.value(15) === 3) {
                interpreter.character(eventId).forceMoveRoute({
                    "list": [
                        { "code": 41, "parameters": ["clea_ad", 0] },
                        { "code": 0 }
                    ],
                    "repeat": false,
                    "skippable": true
                })
            }
            interpreter._character = interpreter.character(eventId)
            interpreter.setWaitMode('route')

        };

        Alt_Func.checkClairCos2 = function (interpreter) {
            let eventId = 1;
            for (let i = 1; i < $dataMap.events.length; i++) {
                if (!$dataMap.events[i]) continue;
                if ($dataMap.events[i].name === "クレア 後半") {
                    eventId = $dataMap.events[i].id;
                    i = $dataMap.events.length;
                }
            }
            if ($gameVariables.value(15) === 1) {
                interpreter.character(eventId).forceMoveRoute({
                    "list": [
                        { "code": 41, "parameters": ["clea_first", 0] },
                        { "code": 0 }
                    ],
                    "repeat": false,
                    "skippable": true
                })
            } else if ($gameVariables.value(15) === 2) {
                interpreter.character(eventId).forceMoveRoute({
                    "list": [
                        { "code": 41, "parameters": ["MainChar", 0] },
                        { "code": 0 }
                    ],
                    "repeat": false,
                    "skippable": true
                })
            } else if ($gameVariables.value(15) === 3) {
                interpreter.character(eventId).forceMoveRoute({
                    "list": [
                        { "code": 41, "parameters": ["clea_ad", 0] },
                        { "code": 0 }
                    ],
                    "repeat": false,
                    "skippable": true
                })
            }
            interpreter._character = interpreter.character(eventId)
            interpreter.setWaitMode('route')

        };
    })();

    //===================================================================
    // 強制的に移動速度5(テストデプロイメント用)
    //===================================================================

    (function () {
        const _Scene_Map_initialize_2 = Scene_Map.prototype.initialize;
        Scene_Map.prototype.initialize = function () {
            _Scene_Map_initialize_2.call(this);
            if ($gameSwitches && $gameSwitches._data !== []) {
                $gameSwitches._data[205] = true;
            }
        };
    })();

    //===================================================================
    // スニークミッションの軽量化
    //===================================================================

    (function () {
        // (function() {
        //     $gameVariables._data[164] = [];
        //     $gameVariables._data[165] = [];
        //     var trapA                 = $gameVariables._data[164];
        //     var trapB                 = $gameVariables._data[165];
        //     $dataMap.events.forEach(function(element, index, array) {
        //         if (!element) return
        //         if (element.name === "罠A") trapA.push([element.x, element.y]);
        //         if (element.name === "罠B") trapB.push([element.x, element.y]);
        //     }, this)
        //     console.log(trapA, trapB);
        // })();


        Alt_Func.checkTrapOnPlayer = function () {
            if ($gameSwitches.value(245)) { //245:Sk:オ宝_罠交互切り替え
                for (let i = 0; i < $gameVariables.value(164).length; i++) {
                    if ($gameVariables.value(164)[i][0] === $gamePlayer.x &&
                        $gameVariables.value(164)[i][1] === $gamePlayer.y) {
                        $gameSwitches._data[222] = true;
                        i = $gameVariables.value(164).length;
                    }
                }
            } else {
                for (let i = 0; i < $gameVariables.value(165).length; i++) {
                    if ($gameVariables.value(165)[i][0] === $gamePlayer.x &&
                        $gameVariables.value(165)[i][1] === $gamePlayer.y) {
                        $gameSwitches._data[222] = true;
                        i = $gameVariables.value(165).length;
                    }
                }
            }
        }
    })();

    //===================================================================
    // スニークミッション　ペルノをマウスタッチに対応させない
    //===================================================================

    (function () {
        Scene_Map.prototype.isMapTouchOk = function () {
            return this.isActive() && $gamePlayer.canMove() && !$gameSwitches.value(306);
        };

        // Sprite_Destination.prototype.update = function() {
        //     Sprite.prototype.update.call(this);
        //     if ($gameTemp.isDestinationValid()) {
        //         this.updatePosition();
        //         this.updateAnimation();
        //         this.visible = true;
        //         if ($gameSwitches.value(306) && !$gameSwitches.value(307) && !$gameSwitches.value(218))
        //             $gameSwitches.setValue(218, true);
        //     } else {
        //         this._frameCount = 0;
        //         this.visible     = false;
        //         if ($gameSwitches.value(306) && $gameSwitches.value(307)&& !$gameSwitches.value(219)) {
        //             $gameSwitches.setValue(219, true);
        //         }
        //     }
        // };
    })();

    //===================================================================
    // メッセージスクロールウィンドウをスタッフロール用に変更
    //===================================================================

    Window_ScrollText.prototype.initialize = function () {
        let x = 0;
        let y = 0;
        let w = Graphics.boxWidth;
        let h = Graphics.boxHeight;
        if ($gameMap.mapId() === 848) { //310:スタッフロール中
            x = Graphics.boxWidth / 2;
            // y = -50;
            w = Graphics.boxWidth / 2;
            // h = Graphics.boxHeight + 100;
        }
        Window_Base.prototype.initialize.call(this, x, y, w, h);
        this.opacity = 0;
        this.hide();
        this._text = '';
        this._allTextHeight = 0;
    };

    //===================================================================
    // 全力防御
    //===================================================================

    Window_ActorCommand.prototype.addGuardCommand = function () {
        let text = TextManager.guard
        // if ($gameSwitches.value(404)) text = "全力防御";
        this.addCommand(text, 'guard', this._actor.canGuard());
    };

    //===================================================================
    // 1桁の数値の桁数を頭に0を足して3桁文字列に変換
    //===================================================================

    (function () {

        Alt_Func.adultSwitch2000_on = function (switchId) {
            $gameSwitches.setValue(switchId, true);
        };

    })();

    //===================================================================
    // クレアを処女に戻すアイテムの処理
    //===================================================================

    (function () {

        Scene_ItemBase.prototype.applyItem = function () {
            var action = new Game_Action(this.user());
            action.setItemObject(this.item());
            this.itemTargetActors().forEach(function (target) {
                for (var i = 0; i < action.numRepeats(); i++) {
                    action.apply(target);
                    if (this.item().id === 93) {
                        if (target.actorId() === 1) {
                            if ($gameSwitches.value(48)) {
                                $gameSwitches.setValue(48, false)
                            } else {
                                $gameSwitches.setValue(48, true)
                            }
                        }
                        if (target.actorId() === 3) {
                            if ($gameSwitches.value(49)) {
                                $gameSwitches.setValue(49, false)
                            } else {
                                $gameSwitches.setValue(49, true)
                            }
                        }
                        if (target.actorId() === 2) {
                            if ($gameSwitches.value(50)) {
                                $gameSwitches.setValue(50, false)
                            } else {
                                $gameSwitches.setValue(50, true)
                            }
                        }
                        if (target.actorId() === 4) {
                            if ($gameSwitches.value(51)) {
                                $gameSwitches.setValue(51, false)
                            } else {
                                $gameSwitches.setValue(51, true)
                            }
                        }
                    }
                }
            }, this);
            action.applyGlobal();
        };


        Game_Action.prototype.testApply = function (target) {
            // console.log(this.item().id);
            // console.log(target.actorId());
            if (this.item().id === 93) {
                return true;
            }
            return (this.isForDeadFriend() === target.isDead() &&
                ($gameParty.inBattle() || this.isForOpponent() ||
                    (this.isHpRecover() && target.hp < target.mhp) ||
                    (this.isMpRecover() && target.mp < target.mmp) ||
                    (this.hasItemAnyValidEffects(target))));
        };
    })();

    ///////////////////////////////////////////////////////////////////////////////
    // でばっぐ用
    ///////////////////////////////////////////////////////////////////////////////

    //===================================================================
    // ゲーム起動時、DevToolを自動で開く
    //===================================================================

    (function () {
        if (Utils.isOptionValid('test')) {
            if (Utils.isNwjs()) {
                var current_window = require('nw.gui').Window.get();
                current_window.showDevTools();
                // current_window.showDevTools().moveTo(50, 50);
                // current_window.moveTo(800, 50);
                current_window.focus();
            }
        }
    })();

    //===================================================================
    // クエストの進行を記録
    //===================================================================

    Alt_Func.questHistoryUpdatePluginName = function (pluginName) {
        $gameVariables._data[497] = [pluginName];
    };

    Alt_Func.questHistoryUpdateQuestId = function (args) {
        $gameVariables._data[497].push(args[0]);
        $gameVariables._data[497].push(args[1]);
        $gameVariables._data[497].push($gameVariables.value(Number(args[1]) + 500));
    };

    Alt_Func.questHistoryUpdateQuestOrderId = function (OrderId) {
        $gameVariables._data[497].push(OrderId);
    };

    Alt_Func.questHistoryUpdate = function () {
        if ($gameVariables.value(498) === 0) $gameVariables._data[498] = [];
        $gameVariables._data[498].push($gameVariables._data[497]);

        //反復は一回だけ記録
        if ($gameVariables._data[498].length > 10) {
            if (($gameVariables._data[498][$gameVariables._data[498].length - 1][1] === "openAfterAdult" &&
                $gameVariables._data[498][$gameVariables._data[498].length - 3][1] === "openAfterAdult") &&
                ($gameVariables._data[498][$gameVariables._data[498].length - 1][2] ===
                    $gameVariables._data[498][$gameVariables._data[498].length - 3][2])) {
                $gameVariables._data[498].pop();
                $gameVariables._data[498].pop();
            }
        }

        while ($gameVariables._data[498].length > 30) {
            $gameVariables._data[498].shift();
        }

        // console.log($gameVariables._data[498]);
    };


})();