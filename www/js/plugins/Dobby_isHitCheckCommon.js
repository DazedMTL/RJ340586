//=============================================================================
// Dobby_monsterChange.js
// 内容：当たり判定処理をまとめたプラグイン
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc 当たり判定関連をまとめたプラグインです。
 * @author スタジオドビー
 * 
 * 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、ゲーム内にて、モンスターが近づいたときの石像化解消関数や、当たり判定をまとめたプラグインです。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法/PluginManager Setting
 *-----------------------------------------------------------------------------
 * 当たり判定関連の処理をするマップに行った場合、対象スイッチをオンにしてください。
 * 対象マップから抜けたら対象スイッチをオフにしてください。
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
 * @param validHitCheckPluginSwitch
 * @text 当たり判定関連を 有効/無効を管理するスイッチの番号
 * @type switch
 * @default 2
 * @desc 当たり判定関連を 有効/無効を管理するスイッチの番号
 *-----------------------------------------------------------------------------
 */
//=============================================================================

const DOBBY_IS_HITCHECK_COMMON_DIRECTION_UP = 8;
const DOBBY_IS_HITCHECK_COMMON_DIRECTION_LEFT = 4;
const DOBBY_IS_HITCHECK_COMMON_DIRECTION_RIGHT = 6;
const DOBBY_IS_HITCHECK_COMMON_DIRECTION_DOWN = 2;
const DOBBY_IS_HITCHECK_COMMON_ZANGEKILV2_ID = 4917;
const DOBBY_IS_HITCHECK_COMMON_ZANGEKILV3_ID = 4918;
const DOBBY_IS_HITCHECK_COMMON_ZANGEKILV4_ID = 4919;

var dobbyIsHitCheckCommonPst = dobbyIsHitCheckCommonPst || {};
var dobbyForceVictoryByButtonpp = PluginManager.parameters('Dobby_isHitCheckCommon');
dobbyIsHitCheckCommonPst.validForceVictoryButton = Number(dobbyForceVictoryByButtonpp['validHitCheckPluginSwitch'] || 0);

const dobby_ishitcheck_Game_Event_prototype_initilize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function (mapId, eventId) {
    dobby_ishitcheck_Game_Event_prototype_initilize.call(this, mapId, eventId);
    this._dobbyIsStoneFlag = (this.event().note.indexOf('<DOBBY_STONES>') != -1);
    this._dobbyisGohst = (this.event().note.indexOf('<DOBBY_GOHST>') != -1);
    this._nowMapId = $gameMap.mapId();
    this._waitFlag = false;
    this._waitTimer = 0;
};

const dobby_ishitcheck_Game_Event_prototype_update = Game_Event.prototype.update;
Game_Event.prototype.update = function () {
    dobby_ishitcheck_Game_Event_prototype_update.call(this);
    if (this._dobbyIsStoneFlag &&
        $gameSwitches.value(Number(dobbyIsHitCheckCommonPst.validForceVictoryButton)) &&
        !this.isInvisible()) {
        var eventx = this._x;
        var eventy = this._y;
        var playerx = $gamePlayer.x;
        var playery = $gamePlayer.y;
        var key = [this._nowMapId, this._eventId, "A"];
        if ((eventx - 3) <= playerx && (eventx + 3) >= playerx && (eventy - 3) <= playery && (eventy + 3) >= playery) {
            if (!$gameSelfSwitches.value(key)) {
                this.requestAnimation(117);
                $gameSelfSwitches.setValue(key, true);
            }
            if (this.getSensorStatus() === 0) {
                //$gameSystem.onSensor(e._eventId);
                $gameSystem.offSensor(this._eventId);
            }
        } else {
            if ($gameSelfSwitches.value(key)) {
                if (!this._waitFlag) {
                    this._waitFlag = true;
                    this._waitTimer = 0;
                }
                if (this._waitFlag) {
                    this._waitTimer++;
                }
                if (this._waitTimer >= 180) {
                    this.requestAnimation(117);
                    this._waitTimer = 0;
                    this._waitFlag = false;
                    $gameSelfSwitches.setValue(key, false);
                }

            }
            if (this.getSensorStatus() === 1) {
                $gameSystem.offSensor(this._eventId);
            }
        }
    }
};

function monsterChange(eventId) {
    var note = $dataMap.events[Number(eventId)].note;
    // var eventx = $dataMap.events[Number(eventId)].x;
    // var eventy = $dataMap.events[Number(eventId)].y;
    var eventx = $gameMap.event(Number(eventId))._x;
    var eventy = $gameMap.event(Number(eventId))._y;
    var playerx = $gamePlayer.x;
    var playery = $gamePlayer.y;

    // if ((eventx - 3) <= playerx && (eventx+3) >= playerx) {
    //     if ((eventy - 3) <= playery && (eventy+3) >= playery) {
    //         return true;
    //     }
    // }
    return (Math.sqrt(Math.pow(playerx - eventx, 2) + Math.pow(playery - eventy, 2)) < 4);
};


function monsterIsTouch(eventId) {
    var eventx = $gameMap.event(Number(eventId))._x;
    var eventy = $gameMap.event(Number(eventId))._y;
    var playerx = $gamePlayer.x;
    var playery = $gamePlayer.y;

    if (Math.sqrt(Math.pow(playerx - eventx, 2) + Math.pow(playery - eventy, 2)) < 1) {
        return true;
    } else {
        return false;
    }
};

// isHitCheckに必要な処理
let _dobbyisHitCheckCommon_Game_Event_start = Game_Event.prototype.start
Game_Event.prototype.start = function () {
    if (this._dobbyisGohst || this._dobbyIsStoneFlag) {
        this.setDirectionFix(true);
    }
    _dobbyisHitCheckCommon_Game_Event_start.call(this);
};


// クレアのAAA発動条件チェック
function aaaCleaIsCheck(eventId) {
    var monsterDirction = $gameMap.event(Number(eventId)).direction();
    var playerDirction = $gamePlayer.direction();
    var eventx = $gameMap.event(Number(eventId))._x;
    var eventy = $gameMap.event(Number(eventId))._y;
    var playerx = $gamePlayer.x;
    var playery = $gamePlayer.y;
    $gameMap.event(Number(eventId)).setDirectionFix(false);
    // if (isTopClea()) {
    if (isTopClea() || $gameSwitches.value(203)) { //203:パーティースキルON
        if (playerDirction === monsterDirction) {
            switch (playerDirction) {
                case DOBBY_IS_HITCHECK_COMMON_DIRECTION_UP:
                    if (eventx === playerx && eventy < playery) {
                        return true;
                    }
                    break;
                case DOBBY_IS_HITCHECK_COMMON_DIRECTION_LEFT:
                    if (eventy === playery && eventx < playerx) {
                        return true;
                    }
                    break;
                case DOBBY_IS_HITCHECK_COMMON_DIRECTION_RIGHT:
                    if (eventy === playery && eventx > playerx) {
                        return true;
                    }
                    break;
                case DOBBY_IS_HITCHECK_COMMON_DIRECTION_DOWN:
                    if (eventx === playerx && eventy > playery) {
                        return true;
                    }
                    break;
            }

        } else {
            // 斬撃Lv2以降のチェック処理
            // 敵の向きで判定
            switch (monsterDirction) {
                case DOBBY_IS_HITCHECK_COMMON_DIRECTION_UP:
                    // 上を向いている時
                    // プレイヤーが左を向いている時
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV2_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_LEFT) {
                            // 右側からだったら斬撃Lv2が発動していたら確殺
                            if (eventx < playerx && eventy == playery) {
                                return true;
                            }
                        }
                    }

                    // 斬撃Lv3が発動している時のみチェック
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV3_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_RIGHT) {
                            // 右側からだったら斬撃Lv2が発動していたら確殺
                            if (eventx > playerx && eventy == playery) {
                                return true;
                            }
                        }
                    }

                    // 斬撃Lv4が発動している時のみチェック
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV4_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_DOWN) {
                            // 右側からだったら斬撃Lv2が発動していたら確殺
                            if (eventx == playerx && eventy > playery) {
                                let rdm = Math.floor(Math.random() * 2);
                                if (rdm == 0) {
                                    return true;
                                }
                            }
                        }
                    }

                    break;
                case DOBBY_IS_HITCHECK_COMMON_DIRECTION_LEFT:
                    // 敵左を向いている時
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV2_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_DOWN) {
                            // 上からだったら斬撃Lv2が発動していたら確殺
                            if (eventx == playerx && eventy > playery) {
                                return true;
                            }
                        }
                    }

                    // 斬撃Lv3が発動している時のみチェック
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV3_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_UP) {
                            // 下からだったら斬撃Lv2が発動していたら確殺
                            if (eventx == playerx && eventy < playery) {
                                return true;
                            }
                        }
                    }

                    // 斬撃Lv4が発動している時のみチェック
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV4_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_RIGHT) {
                            // 右側からだったら斬撃Lv2が発動していたら確殺
                            if (eventx > playerx && eventy == playery) {
                                let rdm = Math.floor(Math.random() * 2);
                                if (rdm == 0) {
                                    return true;
                                }
                            }
                        }
                    }

                    break;
                case DOBBY_IS_HITCHECK_COMMON_DIRECTION_DOWN:
                    // 敵が下を向いている時
                    // プレイヤーが右を向いている時
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV2_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_RIGHT) {
                            // 左側からだったら斬撃Lv2が発動していたら確殺
                            if (eventx > playerx && eventy == playery) {
                                return true;
                            }
                        }
                    }

                    // 斬撃Lv3が発動している時のみチェック
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV3_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_LEFT) {
                            // 右側からだったら斬撃Lv2が発動していたら確殺
                            if (eventx < playerx && eventy == playery) {
                                return true;
                            }
                        }
                    }

                    // 斬撃Lv4が発動している時のみチェック
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV4_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_UP) {
                            // 右側からだったら斬撃Lv2が発動していたら確殺
                            if (eventx == playerx && eventy < playery) {
                                let rdm = Math.floor(Math.random() * 2);
                                if (rdm == 0) {
                                    return true;
                                }
                            }
                        }
                    }

                    break;
                case DOBBY_IS_HITCHECK_COMMON_DIRECTION_RIGHT:
                    // 敵右を向いている時
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV2_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_UP) {
                            // 下からだったら斬撃Lv2が発動していたら確殺
                            if (eventx == playerx && eventy < playery) {
                                return true;
                            }
                        }
                    }

                    // 斬撃Lv3が発動している時のみチェック
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV3_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_DOWN) {
                            // 下からだったら斬撃Lv2が発動していたら確殺
                            if (eventx == playerx && eventy > playery) {
                                return true;
                            }
                        }
                    }

                    // 斬撃Lv4が発動している時のみチェック
                    if ($gameSwitches.value(DOBBY_IS_HITCHECK_COMMON_ZANGEKILV4_ID)) {
                        if (playerDirction == DOBBY_IS_HITCHECK_COMMON_DIRECTION_LEFT) {
                            // 右側からだったら斬撃Lv2が発動していたら確殺
                            if (eventx < playerx && eventy == playery) {
                                let rdm = Math.floor(Math.random() * 2);
                                if (rdm == 0) {
                                    return true;
                                }
                            }
                        }
                    }

                    break;
            }
        }
    }
    return false;
};

// メッセージを表示させたいので、ここの処理では条件処理は入れない
function aaaSphiaIsShukufukuCheck(changePercent) {
    $gameParty.members().forEach(function (actor) {
        if (actor.isAlive()) {
            let mhpPercent = actor.mhp * Number(changePercent);
            let mmpPercent = actor.mmp * Number(changePercent);
            mhpPercent = Math.floor(mhpPercent / 100);
            mmpPercent = Math.floor(mmpPercent / 100);
            actor.gainHp(mhpPercent);
            actor.gainMp(mmpPercent);
        }
    });
};

// ソフィアの戦闘後発動条件チェック
function aaaSphiaIsShukufukuLv1Check() {
    return aaaSphiaIsCheck('sophiashukuhuku');
};

function aaaSphiaIsShukufukuLv2Check() {
    return aaaSphiaIsCheck('sophiashukuhuku2');
};

function aaaSphiaIsShukufukuLv3Check() {
    return aaaSphiaIsCheck('sophiashukuhuku3');
};

function aaaSphiaIsShukufukuLv4Check() {
    return aaaSphiaIsCheck('sophiashukuhuku4');
};

// 恐喝チェック
function aaaSphiaIsKyokatsuLv1Check() {
    return aaaSphiaIsCheck('sophiakyoukatsu');
};

function aaaSphiaIsKyokatsuLv2Check() {
    return aaaSphiaIsCheck('sophiakyoukatsu2');
};

function aaaSphiaIsKyokatsuLv3Check() {
    return aaaSphiaIsCheck('sophiakyoukatsu3');
};

function aaaSphiaIsKyokatsuLv4Check() {
    return aaaSphiaIsCheck('sophiakyoukatsu4');
};

function aaaSphiaIsCheck(str) {
    var parameters = PluginManager.parameters('Dobby_SkillTreeSystem');
    return $gameSwitches.value(Number(parseInt(parameters[str] || 0)));
};

function getTopMemberName() {
    var nparameters = PluginManager.parameters('nonnoncha_characterchanger');
    var non_non_cha_param = Number(nparameters['save_variables'] || 1);
    var j = $gameVariables._data[non_non_cha_param];
    var actor = $gameActors._data[j];
    return actor._name;
};

function getTopMemberId() {
    var nparameters = PluginManager.parameters('nonnoncha_characterchanger');
    var non_non_cha_param = Number(nparameters['save_variables'] || 1);
    var j = $gameVariables._data[non_non_cha_param];
    var actor = $gameActors._data[j];
    return actor._actorId;
};

function isTopClea() {
    if (getTopMemberId() == 1) {
        return true;
    }
    return false;
}

function isTopNora() {
    if (getTopMemberId() == 3) {
        return true;
    }
    return false;
}

function isTopRelm() {
    if (getTopMemberId() == 2) {
        return true;
    }
    return false;
}

function isTopSophia() {
    if (getTopMemberId() == 4) {
        return true;
    }
    return false;
}