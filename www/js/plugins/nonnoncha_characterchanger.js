//=============================================================================
// nonnoncha_characterchanger.js
//=============================================================================

/*:
 * @plugindesc changes character with Q key.
 * @author non_non_cha
 *
 * @param save_variables
 * @desc you can get variable for actors number.
 * @default 1
 *
 * @help
 * you can change battle member only single button!
 * if you want to use this, goto script => $gameSystem.QuickChange();
 *
 */

/*:ja
 * @plugindesc Qキーでキャラチェンジできるやつ。
 * @author non_non_cha
 *
 * @param save_variables
 * @desc 先頭キャラのアクター番号を記録するための変数。
 * @default 1
 *
 * @param kureaSentou
 * @text クレアの先頭スイッチ
 * @type switch
 * @default 0
 * @desc クレアの先頭スイッチ
 *
 * @param noraSentou
 * @text ノラの先頭スイッチ
 * @type switch
 * @default 0
 * @desc ノラの先頭スイッチ
 *
 * @param relmSentou
 * @text リルムの先頭スイッチ
 * @type switch
 * @default 0
 * @desc リルムの先頭スイッチ
 *
 * @param sophiaSentou
 * @text ソフィアの先頭スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの先頭スイッチ
 *
 * @help
 * ボタン一発で先頭メンバーを変えれるやつ。
 * 自作スクリプトで発動させたい場合はこちらをスクリプトに => $gameSystem.QuickChange();
 */

(function () {

    var dNSwitchParam = {};
    var parameters = PluginManager.parameters('nonnoncha_characterchanger');
    var non_non_cha_param = Number(parameters['save_variables'] || 1);
    // クレア
    dNSwitchParam.kureaSentou = parseInt(parameters['kureaSentou'] || 0);
    dNSwitchParam.noraSentou = parseInt(parameters['noraSentou'] || 0);
    dNSwitchParam.relmSentou = parseInt(parameters['relmSentou'] || 0);
    dNSwitchParam.sophiaSentou = parseInt(parameters['sophiaSentou'] || 0);

    Game_Party.prototype.leader = function () {
        return this.battleMembers()[0];
    };


    //パーティーメンバーを外すときは、一回全員を外すしてから必要なメンバーを入れる。
    Game_Follower.prototype.refresh = function () {

        if ($gameParty._actors.length <= 1) {
            let characterName = this.isVisible() ? this.actor._characterName : '';
            let characterIndex = this.isVisible() ? this.actor._characterIndex : 0;
            this.setImage(characterName, characterIndex);
            return;
        }

        if (this._memberIndex === 1) {
            const actor = $gameVariables._data[151][$gameParty._displayCharaOrder[this._memberIndex]];
            if (!actor) {
                let characterName = '';
                let characterIndex = 0;
                this.setImage(characterName, characterIndex);
                return;
            }
            let characterName = this.isVisible() ? actor._characterName : '';
            let characterIndex = this.isVisible() ? actor._characterIndex : 0;
            this.setImage(characterName, characterIndex, actor._actorId);
        }
        if ($gameParty._actors.length <= 1) return;
        if (this._memberIndex === 2) {
            const actor = $gameVariables._data[151][$gameParty._displayCharaOrder[this._memberIndex]];
            if (!actor) {
                let characterName = '';
                let characterIndex = 0;
                this.setImage(characterName, characterIndex);
                return;
            }
            let characterName = this.isVisible() ? actor._characterName : '';
            let characterIndex = this.isVisible() ? actor._characterIndex : 0;
            this.setImage(characterName, characterIndex, actor._actorId);
        }
        if ($gameParty._actors.length <= 2) return;
        if (this._memberIndex === 3) {
            const actor = $gameVariables._data[151][$gameParty._displayCharaOrder[this._memberIndex]];
            if (!actor) {
                let characterName = '';
                let characterIndex = 0;
                this.setImage(characterName, characterIndex);
                return;
            }
            let characterName = this.isVisible() ? actor._characterName : '';
            let characterIndex = this.isVisible() ? actor._characterIndex : 0;
            this.setImage(characterName, characterIndex, actor._actorId);
            // this.setImage(characterName, characterIndex, actor._actorId ? actor._actorId : null);
        }
    };

    var _Game_Party_initAllItems = Game_Party.prototype.initAllItems;
    Game_Party.prototype.initAllItems = function () {
        _Game_Party_initAllItems.apply(this, arguments);
        this._displayCharaOrder = [...this._actors];
        this._displayCharaOrderRefresh = false;
    };

    Game_Player.prototype.showFollowers = function () {
        this._followers.show();
        $gameParty._displayCharaOrderRefresh = true;
    };

    Game_Player.prototype.hideFollowers = function () {
        this._followers.hide();
        $gameParty._displayCharaOrderRefresh = true;
    };

    Game_Followers.prototype.areGathered = function () {
        if ($gameSwitches.value(209)) {
            let y = 0;
            return this._data.every(function (follower) {
                y++;
                return !follower.isMoving() && follower.pos($gamePlayer.x, $gamePlayer.y + y);
            }, this);
        } else {
            return this.visibleFollowers().every(function (follower) {
                return !follower.isMoving() && follower.pos($gamePlayer.x, $gamePlayer.y);
            }, this);
        }
    };

    //隊列歩行に対応
    Game_Player.prototype.refresh = function () {
        var i = Noncha_systemValue;
        if (i == null) {
            i = 0;
        }
        var limit = $gameParty._actors.length;
        // tatsunoko
        let actorInfo = $gameParty._actors[i];
        if (!actorInfo) {
            if (!$gameVariables._data[non_non_cha_param]) {
                $gameVariables._data[non_non_cha_param] = 1;
            } else {
                $gameVariables._data[non_non_cha_param] = $gameVariables._data[non_non_cha_param]; // 不要？
            }
        } else {
            $gameVariables._data[non_non_cha_param] = $gameParty._actors[i];
        }

        // console.log($gameVariables._data[non_non_cha_param]);

        if (!$gameParty._displayCharaOrder || $gameParty._displayCharaOrderRefresh || //初期化されていなかったら現在の情報を代入
            $gameParty._displayCharaOrder.length !== $gameParty._actors.length) {
            $gameParty._displayCharaOrder = [];
            $gameParty._displayCharaOrder = [...$gameParty._actors];
            $gameParty._displayCharaOrderRefresh = false;
        }
        // console.log($gameParty._displayCharaOrder);
        let partyMemberIds = [...$gameParty._displayCharaOrder];
        while (!!partyMemberIds[0] && partyMemberIds[0] !== $gameVariables._data[non_non_cha_param]) {
            partyMemberIds.push(partyMemberIds.shift());
        }
        $gameVariables._data[151] = JSON.parse(JSON.stringify($gameActors._data));
        for (let k = 1; k < partyMemberIds.length; k++) {
            $gameVariables._data[151][partyMemberIds[k - 1]]._characterName = $gameActors._data[partyMemberIds[k - 1]]._characterName;
            $gameVariables._data[151][partyMemberIds[k - 1]]._characterIndex = $gameActors._data[partyMemberIds[k - 1]]._characterIndex;
        }
        // console.log($gameVariables._data[151]);
        $gameParty._displayCharaOrder = [...partyMemberIds];

        var j = $gameVariables._data[non_non_cha_param];
        var actor = $gameActors._data[j];
        var characterName = actor ? actor.characterName() : '';
        var characterIndex = actor ? actor.characterIndex() : 0;
        this.setImage(characterName, characterIndex);
        this._followers.refresh();
        // tatsunoko
        Object.keys(dNSwitchParam).forEach(function (key) {
            if ($gameSwitches.value(Number(dNSwitchParam[key]))) {
                $gameSwitches.setValue(Number(dNSwitchParam[key]), false);
            }
        });

        if (actor) {
            if (!$gameSystem.testDragonDobby(actor._actorId, actor._name)) {
                alert("ErrorCode:0724545 Please give the error code by the developer.");
                SceneManager.exit();
                return;
            }

            switch (actor._actorId) {
                case 1:
                    // 隠密スキルLv4を所持＆パーティスキルをONにしている場合
                    if ($gameSwitches.value(4940) && $gameSwitches.value(203)) {
                        if ($gameMap.mapId() !== 719 && //怪盗夜を征く
                            $gameMap.mapId() !== 720 && //怪盗夜を征く
                            $gameMap.mapId() !== 25 && //朽ちた城(裏通り）
                            $gameMap.mapId() !== 150 && //偏在する蜘蛛
                            $gameMap.mapId() !== 725) this.pssChange(false); //怪盗夜を征く
                    } else {
                        this.pssChange(true);
                    }

                    $gameSwitches.setValue(dNSwitchParam.kureaSentou, true);
                    break;
                case 2:
                    // 隠密スキルLv4を所持＆パーティスキルをONにしている場合
                    if ($gameSwitches.value(4940) && $gameSwitches.value(203)) {
                        if ($gameMap.mapId() !== 719 && //怪盗夜を征く
                            $gameMap.mapId() !== 720 && //怪盗夜を征く
                            $gameMap.mapId() !== 25 && //朽ちた城(裏通り）
                            $gameMap.mapId() !== 150 && //偏在する蜘蛛
                            $gameMap.mapId() !== 725) this.pssChange(false); //怪盗夜を征く
                    } else {
                        this.pssChange(true);
                    }

                    $gameSwitches.setValue(dNSwitchParam.relmSentou, true);
                    break;
                case 3:
                    // 隠密スキルLv4を持っている場合
                    if ($gameSwitches.value(4940)) {
                        if ($gameMap.mapId() !== 719 && //怪盗夜を征く
                            $gameMap.mapId() !== 720 && //怪盗夜を征く
                            $gameMap.mapId() !== 25 && //朽ちた城(裏通り）
                            $gameMap.mapId() !== 150 && //偏在する蜘蛛
                            $gameMap.mapId() !== 725) this.pssChange(false); //怪盗夜を征く
                    } else {
                        this.pssChange(true);
                    }

                    $gameSwitches.setValue(dNSwitchParam.noraSentou, true);
                    break;
                case 4:
                    // 隠密スキルLv4を所持＆パーティスキルをONにしている場合
                    if ($gameSwitches.value(4940) && $gameSwitches.value(203)) {
                        if ($gameMap.mapId() !== 719 && //怪盗夜を征く
                            $gameMap.mapId() !== 720 && //怪盗夜を征く
                            $gameMap.mapId() !== 25 && //朽ちた城(裏通り）
                            $gameMap.mapId() !== 150 && //偏在する蜘蛛
                            $gameMap.mapId() !== 725) this.pssChange(false); //怪盗夜を征くse);
                    } else {
                        this.pssChange(true);
                    }

                    $gameSwitches.setValue(dNSwitchParam.sophiaSentou, true);
                    break;
            }
        }

        // ノラの嗅覚に関わるところがあるので、無条件でリフレッシュする。
        var args = new Array();
        args.push('refresh');
        Game_Interpreter.prototype.pluginCommand('Minimap', args);
    };

    Game_Player.prototype.pssChange = function (startFlag) {
        var args = new Array();
        if (startFlag) {
            args.push('start');
        } else {
            args.push('stop');
        }
        Game_Interpreter.prototype.pluginCommand('PSS', args);
    };

    Game_Party.prototype.removeActor = function (actorId) {
        if (this._actors.contains(actorId)) {
            this._actors.splice(this._actors.indexOf(actorId), 1);
            // tatsunoko start
            // キャラが抜けた時、選択キャラが自動で変更されてしまうことを防ぐ
            if ($gameVariables._data[non_non_cha_param] == actorId) {
                for (var k = 0; k < $gameParty._actors.length; k++) {
                    if ($gameParty._actors[k] == 1) {
                        Noncha_systemValue = k;
                    }
                    break;
                }
                //$gameSystem.QChange();
                if (Noncha_systemValue >= $gameParty._actors.length) {
                    Noncha_systemValue = 0;
                }
                $gamePlayer.refresh();
            } else {
                $gamePlayer.refresh();
            }
            // tatsunoko end
            $gameMap.requestRefresh();
        }
    };

    Noncha_systemValue = 0;


    Game_System.prototype.QChange = function () {
        var i = Noncha_systemValue;
        var limit = $gameParty._actors.length;
        i += 1;
        if (i >= limit) {
            i = 0;
        }
        Noncha_systemValue = i;
        $gamePlayer.refresh();
    }

    Game_System.prototype.QuickChange = function () {
        if ($gameParty._actors.length !== 1) SoundManager.playOk();
        var i = Noncha_systemValue;
        var limit = $gameParty._actors.length - 1;
        i -= 1;
        if (i <= -1) {
            i = limit;
        }
        Noncha_systemValue = i;
        $gamePlayer.refresh();
    }


    Game_System.prototype.DownQuickChange = function () {
        if ($gameParty._actors.length !== 1) SoundManager.playOk();
        var i = Noncha_systemValue;
        var limit = $gameParty._actors.length;
        i += 1;
        if (i >= limit) {
            i = 0;
        }
        Noncha_systemValue = i;
        $gamePlayer.refresh();
    }

    Scene_Map.prototype.isUPCalled = function () {
        return Input.isTriggered('pageup');
    };

    Scene_Map.prototype.isDOWNCalled = function () {
        return Input.isTriggered('pagedown');
    };

    var nonnonchaupdateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function () {
        nonnonchaupdateScene.call(this);
        if (!SceneManager.isSceneChanging()) {
            this.updateCC();
        }
    };

    Scene_Map.prototype.updateCC = function () {
        if ($gameMap.isEventRunning()) return
        if (this.isUPCalled() && !$gamePlayer.isMoving()) {
            $gameSystem.QuickChange();
        } else if (this.isDOWNCalled() && !$gamePlayer.isMoving()) {
            $gameSystem.DownQuickChange();
        }
    };

})();