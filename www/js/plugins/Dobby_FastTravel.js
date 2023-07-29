//=============================================================================
// Dobby_FastTravel.js
// 内容：ファーストトラベルシステム
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc ファーストトラベルを実施するためのプラグイン
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
 * @param newVariableNo
 * @text 更新したクエスト変数番号を格納する変数
 * @type variable
 * @desc 新しく指令が出現した時にNEWと表示するクエストの変数番号保持しておく変数
 *
 * @param newVariableNoUseFlag
 * @text 更新したクエストにNEWと表示するかどうか
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @desc 更新したクエストにNEWと表示するかどうかを判定するフラグ
 *
 * @param enableFasttravelSwitchNo
 * @text ファストトラベルの使用可否を管理するスイッチ
 * @type switch
 * @default 2
 * @desc ファストトラベルの使用可否を管理するスイッチ
 *
 * @param invalidFasttravelVarivable
 * @text ファストトラベルを利用できないようにするための変数番号（指定した値未満の場合はNGにする）
 * @type variable
 * @default 100
 * @desc ファストトラベルを利用できないようにするための変数番号（指定した値未満の場合はNGにする）
 *
 * @param invalidFasttravelNo
 * @text 対象のシナリオの値までファストトラベルは利用できないようにする。
 * @type number
 * @default 0
 * @desc ファストトラベルを利用できないようにするための変数番号（指定した値未満の場合はNGにする）
 *
 * @param fastTravelBGM
 * @desc 専用BGM
 * @type file
 * @dir audio
 * @default bgm
 *
 * @param rankValiable
 * @text 称号を管理する変数
 * @type variable
 * @default 0
 * @desc 称号を管理する変数
 *
 * @param mapMoveFlag
 * @text 画面を初期表示するさいに画面を動かすか動かさないか
 * @type boolean
 * @on 動かす
 * @off 動かさない
 * @desc 画面を初期表示するさいに画面を動かすか動かさないか
 *
 * @param cleaNotVirginSwitch
 * @text クレアの非処女スイッチ
 * @type switch
 * @default 0
 * @desc クレアの非処女スイッチ(ON:非処女/OFF:処女)
 *
 * @param noraNotVirginSwitch
 * @text ノラの非処女スイッチ
 * @type switch
 * @default 0
 * @desc ノラの非処女スイッチ(ON:非処女/OFF:処女)
 *
 * @param relmNotVirginSwitch
 * @text リルムの非処女スイッチ
 * @type switch
 * @default 0
 * @desc リルムの非処女スイッチ(ON:非処女/OFF:処女)
 *
 * @param sophiaNotVirginSwitch
 * @text ソフィアの非処女スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの非処女スイッチ(ON:非処女/OFF:処女)
 *
 * @param meiwakunairaisha
 * @text 「迷惑な依頼者」管理用変数
 * @type variable
 * @default 0
 * @desc 「迷惑な依頼者」管理用変数（リルム仲間加入タイミング）
 *
 * @param relmnowasuremono
 * @text 「リルムの忘れ物」管理用変数
 * @type variable
 * @default 0
 * @desc 「リルムの忘れ物」管理用変数（カノナスクエスト解放タイミング）
 *
 * @param trogokojiinkaranoirai
 * @text 「トロゴ孤児院からの依頼」管理用変数
 * @type variable
 * @default 0
 * @desc 「トロゴ孤児院からの依頼」管理用変数（カンプスクエスト解放タイミング）
 *
 * @param kurisutaruNoyusou
 * @text 「クリスタルの輸送」管理用変数
 * @type variable
 * @default 0
 * @desc 「クリスタルの輸送」管理用変数（オロスクエスト解放タイミング）
 *
 * @param minatonoarumachi
 * @text 「港のある街」管理用変数
 * @type variable
 * @default 0
 * @desc 「港のある街」管理用変数
 *
 * @param barukudangoatnosasoi
 * @text 「バルク団ゴートの誘い」管理用変数
 * @type variable
 * @default 0
 * @desc 「バルク団ゴートの誘い」管理用変数（ヴァルトクエスト解放タイミング）
 *
 */
//=============================================================================

const SD_QUESTREPORT_CSV = "questReport.csv";
const SD_QUESTREPORT_ORDER_CSV = "questReportOrder.csv";
const SD_REGION_CSV = 'region.csv';
const SD_TOWN_CSV = 'town.csv';
const SD_DANGION_CSV = 'dangion.csv';
const SD_OTHER_CSV = 'other.csv';

const SD_REGIONCSV_ITEM_REGIONID = 0;
const SD_AREACSV_ITEM_AREAID = 0;
const SD_AREACSV_ITEM_REGIONID = 2;

const QUEST_REPORT_UNORDERED = 0;
const QUEST_REPORT_UNORDERED_NEW = -1;
const QUEST_REPORT_UNORDERED_DISP = -2;
const QUEST_REPORT_UNORDERED_NOTDISP = -3;
const QUEST_REPORT_ORDERED = 1;
const QUEST_REPORT_ORDER_UNORDER = 0;
const QUEST_REPORT_ORDER_INPROGRESS = 1;
const QUEST_REPORT_ORDER_COMPLETE = 9;
const QUEST_REPORT_ORDER_FULLCOMPLETE = 99999999;

// DOBBY独自 ゲーム序盤はファストトラベルを利用できないようにするための変数。
// 対象のシナリオの変数番号の中身を参照し、定数未満の場合は利用できないようにする。
const SD_INVALIT_FASTTRAVEL_VARIABLE_MIN = 0;
var $questReportData = null;
var $dRegionData = null;

function MapSaveData() {
    this.initialize.apply(this, arguments);
}

MapSaveData.prototype.initialize = function () {
    this._data = {};
    var regionCsv = dobbyloadCSVFile(SD_REGION_CSV);
    var tmpRegionArray = regionCsv.split("<br>");
    for (var i = 1; i < tmpRegionArray.length; i++) {
        var tmpregion = tmpRegionArray[i].split(",");
        this._data[Number(tmpregion[SD_REGIONCSV_ITEM_REGIONID])] = new RegionSaveData(Number(tmpregion[SD_REGIONCSV_ITEM_REGIONID]), false, false);
    }

    var townCsv = dobbyloadCSVFile(SD_TOWN_CSV);
    var tmpTownArray = townCsv.split("<br>");
    for (var i = 1; i < tmpTownArray.length; i++) {
        var tmpTown = tmpTownArray[i].split(",");
        var tRegionId = tmpTown[SD_AREACSV_ITEM_REGIONID];
        var tAreaId = tmpTown[SD_AREACSV_ITEM_AREAID];
        if (tRegionId && tAreaId && tAreaId != "" && tRegionId != "") {
            this._data[Number(tRegionId)].addTownData(new AreaSaveData(Number(tAreaId), false, false));
        }
    }

    var dangionCsv = dobbyloadCSVFile(SD_DANGION_CSV);
    var tmpDangionArray = dangionCsv.split("<br>");
    for (var i = 1; i < tmpDangionArray.length; i++) {
        var tmpDangion = tmpDangionArray[i].split(",");
        var dRegionId = tmpDangion[SD_AREACSV_ITEM_REGIONID];
        var dAreaId = tmpDangion[SD_AREACSV_ITEM_AREAID];
        if (dRegionId && dAreaId && dRegionId != "" && dAreaId != "") {
            this._data[Number(dRegionId)].adddDangionData(new AreaSaveData(Number(dAreaId), false, false));
        }
    }

    var otherCsv = dobbyloadCSVFile(SD_OTHER_CSV);
    var tmpOtherArray = otherCsv.split("<br>");
    for (var i = 1; i < tmpOtherArray.length; i++) {
        var tmpOther = tmpOtherArray[i].split(",");
        var oRegionId = tmpOther[SD_AREACSV_ITEM_REGIONID];
        var oAreaId = tmpOther[SD_AREACSV_ITEM_AREAID];
        if (oRegionId && oAreaId && oRegionId != "" && oAreaId != "") {
            this._data[Number(oRegionId)].adddOtherData(new AreaSaveData(Number(oAreaId), false, false));
        }
    }
};

MapSaveData.prototype.getRegionData = function (regionId) {
    return this._data[regionId];
};

MapSaveData.prototype.getRegionDataList = function () {
    return this._data;
};

function RegionSaveData() {
    this.initialize.apply(this, arguments);
}

RegionSaveData.prototype.initialize = function (regionId, openFlag, activeFlag) {
    this._regionId = regionId;
    this._openFlag = openFlag;
    this._activeFlg = activeFlag;
    this._townDataList = {};
    this._dangionDataList = {};
    this._otherDataList = {};
};

RegionSaveData.prototype.setRegionId = function (regionId) {
    this._regionId = regionId;
};

RegionSaveData.prototype.getRegionId = function () {
    return this._regionId;
};

RegionSaveData.prototype.setOpenFlag = function (openFlag) {
    this._openFlag = openFlag;
};

RegionSaveData.prototype.getOpenFlag = function () {
    return this._openFlag;
};

RegionSaveData.prototype.setActiveFlg = function (activeFlg) {
    this._activeFlg = activeFlg;
};

RegionSaveData.prototype.getActiveFlg = function () {
    return this._activeFlg;
};

RegionSaveData.prototype.addTownData = function (townData) {
    this._townDataList[Number(townData.getAreaId())] = townData;
};

RegionSaveData.prototype.setTownDataList = function (townDataList) {
    this._townDataList = townDataList;
};

RegionSaveData.prototype.getTownData = function (areaId) {
    return this._townDataList[Number(areaId)];
};

RegionSaveData.prototype.getTownDataList = function () {
    return this._townDataList;
};

RegionSaveData.prototype.adddDangionData = function (dangionData) {
    this._dangionDataList[Number(dangionData.getAreaId())] = dangionData;
};

RegionSaveData.prototype.setDangionDataList = function (dangionDataList) {
    this._dangionDataList = dangionDataList;
};

RegionSaveData.prototype.getDangionData = function (areaId) {
    return this._dangionDataList[Number(areaId)];
};

RegionSaveData.prototype.getDangionDataList = function () {
    return this._dangionDataList;
};

RegionSaveData.prototype.adddOtherData = function (otherData) {
    this._otherDataList[Number(otherData.getAreaId())] = otherData;
};

RegionSaveData.prototype.setOtherDataList = function (otherDataList) {
    this._otherDataList = otherDataList;
};

RegionSaveData.prototype.getOtherData = function (areaId) {
    return this._otherDataList[Number(areaId)];
};

RegionSaveData.prototype.getOtherDataList = function () {
    return this._otherDataList;
};

function AreaSaveData() {
    this.initialize.apply(this, arguments);
}

AreaSaveData.prototype.initialize = function (areaId, openFlag, activeFlag) {
    this._areaId = areaId;
    this._openFlag = openFlag;
    this._activeFlag = activeFlag;
};

AreaSaveData.prototype.getAreaId = function () {
    return this._areaId;
};

AreaSaveData.prototype.setAreaId = function (areaId) {
    this._areaId = areaId;
};

AreaSaveData.prototype.getOpenFlag = function () {
    return this._openFlag;
};

AreaSaveData.prototype.setOpenFlag = function (openFlag) {
    this._openFlag = openFlag;
};

AreaSaveData.prototype.getActiveFlag = function () {
    return this._activeFlag;
};

AreaSaveData.prototype.setActiveFlag = function (activeFlag) {
    this._activeFlag = activeFlag;
};

function QuestSaveData() {
    this.initialize.apply(this, arguments);
}

QuestSaveData.prototype.initialize = function () {
    var tmpData = {};
    // クエストレポートの読み込み処理
    var questReportCsvList = dobby_loadAndGetQuestReportCsvFile();
    var orderList = questReportCsvList.split("<br>");
    var i = 0;
    orderList.forEach(function (value) {
        var tmpOrder = value.split(",");
        if (!isNaN(tmpOrder[0])) {
            tmpData[Number(tmpOrder[0])] = new QuestDetailSaveData(Number(tmpOrder[0]), -3, 0, 0);
        }
    });
    this._data = tmpData;
};

QuestSaveData.prototype.getQuestDataBySveData = function (questId) {
    return this._data[Number(questId)];
};

function QuestDetailSaveData() {
    this.initialize.apply(this, arguments);
}

QuestDetailSaveData.prototype.initialize = function (questID, orderList, questProgressNum, clearNum) {
    this._questID = questID;
    this._orderList = orderList;
    //    this._questProgressNum = questProgressNum;
    this._clearNum = clearNum;
};

QuestDetailSaveData.prototype.getQuestID = function () {
    return this._questID;
};

QuestDetailSaveData.prototype.setQuestID = function (questId) {
    this._questID = questId;
};

QuestDetailSaveData.prototype.getOrderList = function () {
    return this._orderList;
};

QuestDetailSaveData.prototype.setOrderList = function (orderList) {
    this._orderList = orderList;
};

// QuestDetailSaveData.prototype.getQuestProgressNum = function() {
//     return this._questProgressNum;
// };

// QuestDetailSaveData.prototype.setQuestProgressNum = function(questProgressNum) {
//     this._questProgressNum = questProgressNum;
// };

QuestDetailSaveData.prototype.getClearNum = function () {
    return this._clearNum;
};

QuestDetailSaveData.prototype.setClearNum = function (clearNum) {
    this._clearNum = clearNum;
};

QuestDetailSaveData.prototype.addClearNum = function () {
    var clearNum = Number(this._clearNum);
    this._clearNum = clearNum + 1;
};

function dobby_loadAndGetQuestReportCsvFile() {
    return dobbyloadCSVFile(SD_QUESTREPORT_CSV);
}

function dobby_loadAndQuestReportOrderCSVFile() {
    return dobbyloadCSVFile(SD_QUESTREPORT_ORDER_CSV);
}

function dobbyloadCSVFile(src) {
    var dobbypath = require('path');
    var dobbyfs = require('fs');
    var projectFilePath = decodeURIComponent(dobbypath.dirname(window.location.pathname.slice(1)));
    return dobbyfs.readFileSync(projectFilePath + '/data/dobbyPlugin/db/' + src, 'utf-8');
}

function questVariableNoSplitForOrderProgress(number) {
    var zeropaddingOrderProgress = String(number).padZero(8);
    return zeropaddingOrderProgress.split("");
}

// 指定したオーダーがクリア状態かどうかを判定する。
function isTargetOrderClear(questId, orderNo) {
    var questProgress = $questReportData.getQuestDataBySveData(Number(questId)).getOrderList();
    var tmpQuestOrderList = questVariableNoSplitForOrderProgress(questProgress);
    tmpQuestOrderList = tmpQuestOrderList.reverse();
    return Number(tmpQuestOrderList[orderNo - 1]) === QUEST_REPORT_ORDER_COMPLETE;
}

function isTargetQuestClear(questId) {
    var questProgress = $questReportData.getQuestDataBySveData(Number(questId)).getOrderList();
    return Number(questProgress) === QUEST_REPORT_ORDER_FULLCOMPLETE;
}

SceneManager._fastTravelpopAfeterFlag = false;
SceneManager.setFastTravelpopAfeterFlag = function (flag) {
    this._fastTravelpopAfeterFlag = flag;
};

SceneManager.isFastTravelpopAfeterFlag = function () {
    return this._fastTravelpopAfeterFlag;
};

// var _dobby_FastTravel_Scene_Map_initialize = Scene_Map.prototype.initialize;
// Scene_Map.prototype.initialize = function() {
//     _dobby_FastTravel_Scene_Map_initialize.call(this);
//     if (SceneManager.isFastTravelpopAfeterFlag()) {
//         this.startFadeIn(30);
//         SceneManager.setFastTravelpopAfeterFlag(false)
//     }
// };

// 街やリージョン関係の関数
function isOpenRegion(regionId) {
    var regionDataList = $dRegionData.getRegionDataList();
    for (let key in regionDataList) {
        if (Number(regionDataList[key].getRegionId()) === regionId) {
            return regionDataList[key].getOpenFlag();
        }
    }
    return false;
}

function isOpenTown(townid) {
    var regionDataList = $dRegionData.getRegionDataList();
    for (let key in regionDataList) {
        if (isOpenArea(regionDataList[key].getTownDataList(), townid)) {
            return true;
        }
    }
    return false;
}

function isOpenDangion(dangionId) {
    var regionDataList = $dRegionData.getRegionDataList();
    for (let key in regionDataList) {
        if (isOpenArea(regionDataList[key].getDangionDataList(), dangionId)) {
            return true;
        }
    }
    return false;
}

function isOpenOther(otherId) {
    var regionDataList = $dRegionData.getRegionDataList();
    for (let key in regionDataList) {
        if (isOpenArea(regionDataList[key].getOtherDataList(), otherId)) {
            return true;
        }
    }
    return false;
}

function isOpenArea(areaList, areaId) {
    if (areaList) {
        for (let key2 in areaList) {
            var tValue = areaList[key2];
            if (tValue && Number(tValue.getAreaId()) === Number(areaId)) {
                return tValue.getOpenFlag();
            }
        }
    }
    return false;
}

//===================================================================
// クエスト入力項目
//===================================================================

// 掲示板に中でキルできないに関係なく最初から表示されているクエスト
function initializeQuestOpener(reload) {
    let qeustList = [
        4, 5, 7, 8, 10, 14, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 33, 37, 38, 39, 40, 41, 42, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 65, 67, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 111, 125, 126, 136, 137, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 169, 170, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 191, 192, 202, 205, 206, 210, 221
    ];

    for (let i = 0; i < qeustList.length; i++) {

        ////////////////////////////// Altered Mod START //////////////////////////////
        if (reload && $questReportData.getQuestDataBySveData(qeustList[i])._orderList > QUEST_REPORT_UNORDERED_NOTDISP) continue;
        ///////////////////////////////////////////////////////////////////////////////

        $questReportData.getQuestDataBySveData(qeustList[i]).setOrderList(QUEST_REPORT_UNORDERED_DISP);
    }
}

function reloadQuestData(questReportData) {
    var questStr = dobbyloadCSVFile(SD_QUESTREPORT_CSV);
    // 追加クエストがあった場合、クエストレポートのデータにロード時に追加する。

    ////////////////////////////// Altered Mod START //////////////////////////////
    // 1.新しくクエストを追加した場合、
    // セーブデータをロードして「initializeQuestOpener(true)」をconsole上で実行すると、
    // 更新した「questReport.csv」の「最初から表示」に○がついてるクエストが表示されるようになる。
    // 既存の「最初から表示」に○がついてるクエストには、変更を加えない。
    //
    // 2.「initializeQuestOpener」はニューゲームからしか実行されないため、
    // 引き継ぎ部屋からでたときにも走るように修正。
    ///////////////////////////////////////////////////////////////////////////////
    initializeQuestOpener(true);
    ///////////////////////////////////////////////////////////////////////////////

    if (questStr && (questStr != "" && questStr != null)) {
        var tmp = questStr.split("<br>");
        for (var i = 1; i < tmp.length; i++) {
            var tmpQuest = tmp[i].split(",");
            var questId = tmpQuest[0];
            if (questId != "" && questId != null) {
                var questData = questReportData.getQuestDataBySveData(questId);
                var isQuestNotEmpty = (questData != undefined && questData != null);
                if (!isQuestNotEmpty) {
                    questReportData._data[Number(questId)] = new QuestDetailSaveData(Number(questId), -3, 0, 0);
                }
            }
        }
    }
}

let $isOrderedQuest;

(function () {
    'use strict';
    Input.keyMapper[77] = 'M';

    var D_FT_NowPoint = D_FT_NowPoint || {};
    D_FT_NowPoint.MapID = "";
    D_FT_NowPoint.areaID = 0;
    D_FT_NowPoint.pointx = 0;
    D_FT_NowPoint.pointy = 0;
    var cnt = 0;
    var yCnt = 0;

    const SD_QUESTSYSTEM_ADULTMARK = "adult";
    const SD_QUESTSYSTEM_QUESTTYPE_ADULT = "アダルト";
    const SD_QUESTSYSTEM_READONLYSWITCHNO = 166;
    const DISP_W = 1024;
    const DISP_H = 640;
    const DISP_W_HALF = 1024 / 2;
    const DISP_H_HALF = 640 / 2;
    const MAP_IMG_HALF_SIZE_WIDTH = 2048 / 2;
    const MAP_IMG_HALF_SIZE_HEIGHT = 1280 / 2;
    const MAP_POSITION_X_ADJUST = -40;
    const MAP_POSITION_Y_ADJUST = 0;
    const NOW_SELECT_REGION_AREA = "region";
    const NOW_SELECT_AREA = "area";
    const ARE_TOWN = 1;
    const ARE_DANGION = 2;
    const ARE_OTHER = 3;
    const ARE_WINDOW_POSITION_X = 586;
    const ARE_WINDOW_INIT_POSITION_X = 824;
    const ARE_WINDOW_POSITION_Y = 200;
    const ARE_WINDOW_POSITION_WIDTH = 406;
    const ARE_WINDOW_POSITION_HEIGHT = 413;

    // ■■■ Altered Mod ■■■
    const ARE_WINDOW_MOVE_SPEED = 1024; //10;

    const ARE_IMG_TOWN_POSITION_X = 591;
    const ARE_IMG_TOWN_POSITION_Y = 119;
    const ARE_IMG_DANGION_POSITION_X = 725;
    const ARE_IMG_DANGION_POSITION_Y = 119;
    const ARE_IMG_OTHER_POSITION_X = 864;
    const ARE_IMG_OTHER_POSITION_Y = 119;
    const ARE_IMG_QUESTREPORT_POSITION_X = 245;
    const ARE_IMG_QUESTREPORT_POSITION_Y = 80;
    const ARE_IMG_GUILDDIRECT_POSITION_X = 418;
    const ARE_IMG_GUILDDIRECT_POSITION_Y = 80;
    const NOW_CORSOL_POSITION_WORLDMAP = "worldMap";
    const NOW_CORSOL_POSITION_QUESTREPORT = "questReport";

    const SD_FT_CURSOL_ADUJST_X = 30;
    const SD_FT_CURSOL_ADUJST_Y = 10;
    const USE_QUEST_REPORT_FLAG = true;
    const IMG_QUESTREPORT_BACKGROUND = "questreport";
    const IMG_QUESTREPORT_NEW = "new";

    const QUEST_REPORT_QUESTLIST_WIDTH = 350;
    const QUEST_REPORT_QUESTLIST_HEIGHT = 540;
    const QUEST_SYSTEM_QUESTLIST_WIDTH = 350;

    const QUEST_ORDER_TARGET_SCENE_QUESTREPORT = 0;
    const QUEST_ORDER_TARGET_SCENE_QUESTSYSTEM = 1;

    const QUEST_OPEN_EVENT_WARLD_MAP = "worldMap";
    const QUEST_OPEN_EVENT_NOTMENU_OPEN = "notmenuOpen";
    const QUEST_OPEN_EVENT_MENU_OPEN = "menuOpen";

    const SE_QUEST_ORDERED = "se_maoudamashii_jingle06";

    const SD_MSG_INVALID_FASTTRAVEL_BY_FILED = "Fast travel is not available here.";
    const SD_MSG_INVALID_FASTTRAVEL_BY_NOW = "You cannot fast travel yet.";
    const SD_MSG_INVALID_FASTTRAVEL_BY_OREDER = "This command can't be used for fast travel.";

    // クエストシステム用定義〜ここから
    const QUEST_SYSTEM_WINDOW_MAX_NUM = 6;
    // クエストシステム用定義〜ここまで

    const FAST_TRAVEL_IMG_QUEST = 0;
    const FAST_TRAVEL_IMG_GUILD = 1;
    const FAST_TRAVEL_GUILD_MAPID = 51;

    // スプレッドシートによる自動設定
    const QUESTREPORT_CSV_ITEMQUESTID = 0;
    const QUESTREPORT_CSV_ITEMVARIABLENO = 1;
    const QUESTREPORT_CSV_ITEMQUESTNAME = 2;
    const QUESTREPORT_CSV_ITEMQUESTRANK = 3;
    const QUESTREPORT_CSV_ITEMQUESTLEVEL = 4;
    const QUESTREPORT_CSV_ITEMNOTE = 5;
    const QUESTREPORT_CSV_ITEMCLIENT = 6;
    const QUESTREPORT_CSV_ITEMORDERCONDITION = 7;
    const QUESTREPORT_CSV_ITEMDERIVED_CONDITION = 8;
    const QUESTREPORT_CSV_ITEMCLEARCONDITION = 9;
    const QUESTREPORT_CSV_ITEMCLEARREWARD = 10;
    const QUESTREPORT_CSV_ITEMORDER_PLACE = 11;
    const QUESTREPORT_CSV_ITEMORDER_PLACE_DETAIL = 12;
    const QUESTREPORT_CSV_ITEMQUESTICON = 13;
    const QUESTREPORT_CSV_ITEMQUESTTYPE = 14;
    const QUESTREPORT_CSV_ITEMADULTCHAR = 15;
    const QUESTREPORT_CSV_ITEMDISPNO = 16;

    const QUESTREPORT_ORDER_CSV_ITEMORDERID = 0;
    const QUESTREPORT_ORDER_CSV_ITEMQUESTID = 1;
    const QUESTREPORT_ORDER_CSV_ITEMORDER_REGIONID = 2;
    const QUESTREPORT_ORDER_CSV_ITEMORDER_AREID = 3;
    const QUESTREPORT_ORDER_CSV_ITEMORDER_AREID_DBID = 4;
    const QUESTREPORT_ORDER_CSV_ITEMORDERINFO = 5;
    const QUESTREPORT_ORDER_CSV_ITEMCLEARCONDITION = 6;

    const SD_CUROSR_ADJUST_X = -30;
    const SD_CUROSR_ADJUST_Y = -60;

    // ===追加機能。オープン化する際は削除する。
    const SD_QUESTSYSTE_OPEN_GUILD = "guild";
    const SD_QUESTSYSTE_OPEN_STRAY = "stray";
    const SD_QUESTSYSTEM_OPEN_STRAY_JP = "野良";
    const SD_QUESTSYSTEM_OPEN_GUILD_JP = "ギルド";

    const SD_QUESTSYSTE_OPEN_PLACE_FOTE = "フォティゾナ";
    const SD_QUESTSYSTE_OPEN_PLACE_KAN = "カンプス";
    const SD_QUESTSYSTE_OPEN_PLACE_VARI = "バリエ";
    const SD_QUESTSYSTE_OPEN_PLACE_VAL = "ヴァルト";
    const SD_QUESTSYSTE_OPEN_PLACE_ORO = "オロス";
    const SD_QUESTSYSTE_OPEN_PLACE_MYUC = "ミュコス";
    const SD_QUESTSYSTE_OPEN_PLACE_STRAY = "売春島";
    const SD_FASTTRAVEL_MAHOUAKADEMY_ID = 16;
    const SD_FASTTRAVEL_KANONASU_ID = 15;
    // ===追加機能。オープン化する際は削除する。ここまで

    var _sd_questSystem_rank_map = {
        0: "仮会員初級者", 1: "仮会員初級者", 2: "仮会員中級者", 3: "仮会員上級者", 4: "駆け出し冒険者", 5: "手練れの冒険者", 6: "いっぱしの冒険者", 7: "精鋭冒険者", 8: "熟練冒険者", 9: "達人冒険者", 10: "三傑に並ぶもの"
    }
    const SD_WARN_MSG_QUESTREPORT_NOTORDERQUEST = "受注しているクエストはありません";

    //===================================================================
    // クエスト入力項目
    //===================================================================
    // クエスト関連のID
    // 追加機能。オープン化する際は削除する。
    const SD_QUESTSYSTEM_QUESTID_GUILDNOZATUYOU = 4;
    const SD_QUESTSYSTEM_QUESTID_OONEZMINOKUJO = 5;
    const SD_QUESTSYSTEM_QUESTID_AROSUDOUKUTSUTYOUSA = 7;
    const SD_QUESTSYSTEM_QUESTID_SHOKUDOUNOWASURE = 8;
    const SD_QUESTSYSTEM_QUESTID_RELMNOWASUREMONO = 11;
    const SD_QUESTSYSTEM_QUESTID_TOROGOKOJIINKARANOIRAI = 14;
    const SD_QUESTSYSTEM_QUESTID_SOURYOSOPHIAKARANOIRAI = 17;
    const SD_QUESTSYSTEM_QUESTID_DRAGONNOTOUBATSU = 19;
    const SD_QUESTSYSTEM_QUESTID_KOUKYUWINENOHAISOU = 20;
    const SD_QUESTSYSTEM_QUESTID_YOGORETATE = 21;
    const SD_QUESTSYSTEM_QUESTID_TSUMIWASURENOTEGAMI = 22;
    const SD_QUESTSYSTEM_QUESTID_HAITATSUINNOIKINUKI = 23;
    const SD_QUESTSYSTEM_QUESTID_OOKAMINOMURE = 24;
    const SD_QUESTSYSTEM_QUESTID_KASAROYOKUJONOOOSOUJI = 25;
    const SD_QUESTSYSTEM_QUESTID_MINATONOARUMACHI = 26;
    const SD_QUESTSYSTEM_QUESTID_SHIZUKANASHURAKU = 27;
    const SD_QUESTSYSTEM_QUESTID_KUROIKONA = 29;
    const SD_QUESTSYSTEM_QUESTID_YUSOUROUTEWOKAKUHOSEYO = 33;
    const SD_QUESTSYSTEM_QUESTID_KYODAIKURISUTARUNOYUSOU = 35;
    const SD_QUESTSYSTEM_QUESTID_NAIFUNOIREZUMIOTOKO = 38;
    const SD_QUESTSYSTEM_QUESTID_SENSHINOODORIKO = 39;
    const SD_QUESTSYSTEM_QUESTID_TOUZOKUNOODORIKO = 40;
    const SD_QUESTSYSTEM_QUESTID_MAHOUTSUKAINOODORIKO = 41;
    const SD_QUESTSYSTEM_QUESTID_SOURYONOODORIKO = 42;
    const SD_QUESTSYSTEM_QUESTID_KOAKUTOUNOCHOURININ = 47;
    const SD_QUESTSYSTEM_QUESTID_AKUTARENOKYOSEI = 48;
    const SD_QUESTSYSTEM_QUESTID_KACHIKUNOYUKUE = 49;
    const SD_QUESTSYSTEM_QUESTID_JOUHOUYANOSASOI = 50;
    const SD_QUESTSYSTEM_QUESTID_TORIOKINOKURISUTAL = 51;
    const SD_QUESTSYSTEM_QUESTID_MAHOUTSUKAINOKUCHI = 52;
    const SD_QUESTSYSTEM_QUESTID_HITOGUIKUMANOTOUBATSU = 53;
    const SD_QUESTSYSTEM_QUESTID_KARIUDONOTANOSHIMI = 54;
    const SD_QUESTSYSTEM_QUESTID_GOUJOUNAJOUHOUYA = 55;
    const SD_QUESTSYSTEM_QUESTID_OUSHINOHIMITSU = 56;
    const SD_QUESTSYSTEM_QUESTID_YATOUGOKENOKAISHU = 57;
    const SD_QUESTSYSTEM_QUESTID_IKARERUOTOKO = 58;
    const SD_QUESTSYSTEM_QUESTID_KOENOHEYANOHIMITSU = 65;
    const SD_QUESTSYSTEM_QUESTID_KUROIIRAISHO = 66;
    const SD_QUESTSYSTEM_QUESTID_TEIKOKUGUNKARANOIRAI = 67;
    const SD_QUESTSYSTEM_QUESTID_NAMIDANOSHIZUKU = 70;
    const SD_QUESTSYSTEM_QUESTID_SAIKOUNOIPPAI = 71;
    const SD_QUESTSYSTEM_QUESTID_SHIAWASENORESHIPI = 72;
    const SD_QUESTSYSTEM_QUESTID_GUSHANOTENBIN = 73;
    const SD_QUESTSYSTEM_QUESTID_DOKURONOUMI = 74;
    const SD_QUESTSYSTEM_QUESTID_TODOKANAINIMOTSU = 75;
    const SD_QUESTSYSTEM_QUESTID_TANKOUFUNOYUUIN = 76;
    const SD_QUESTSYSTEM_QUESTID_KYODAIHEBINOTOUBATSU = 77;
    const SD_QUESTSYSTEM_QUESTID_ARABURUKYODAIHEBI = 78;
    const SD_QUESTSYSTEM_QUESTID_HENZAISURUKUMO = 79;
    const SD_QUESTSYSTEM_QUESTID_TSUKANOMANOKYUSOKU = 80;
    const SD_QUESTSYSTEM_QUESTID_SHITAGOKORONOARUZENI = 81;
    const SD_QUESTSYSTEM_QUESTID_ZENINOHASSAN = 82;
    const SD_QUESTSYSTEM_QUESTID_AKUSEKINOMAHOUTUKAI = 83;
    const SD_QUESTSYSTEM_QUESTID_NAMIDANOHANRAN = 87;
    const SD_QUESTSYSTEM_QUESTID_WANPAKUSHOUJONOBOUKEN = 88;
    const SD_QUESTSYSTEM_QUESTID_DRAGONNOTUME = 89;
    const SD_QUESTSYSTEM_QUESTID_IDONONAKANOKAIBUTU = 96;
    const SD_QUESTSYSTEM_QUESTID_SOUKONOOONEZUMI = 97;
    const SD_QUESTSYSTEM_QUESTID_KURISUTARUSOUKONOSEIRI = 98;
    const SD_QUESTSYSTEM_QUESTID_MORINOABARENBOU = 99;
    const SD_QUESTSYSTEM_QUESTID_YASEIJINOSASOI = 100;
    const SD_QUESTSYSTEM_QUESTID_MEIDONOOTOSHIMONO = 103;
    const SD_QUESTSYSTEM_QUESTID_KAMOTSUSENNOOOSOUJI = 104;
    const SD_QUESTSYSTEM_QUESTID_YUUTSUNARENKINJUTSUSHI = 105;
    const SD_QUESTSYSTEM_QUESTID_GISHINANKINARENKINJUTSUSHI = 106;
    const SD_QUESTSYSTEM_QUESTID_GUSHANOMADOUSHO = 107;
    const SD_QUESTSYSTEM_QUESTID_GAIKOTSUNOFUNE = 108;
    const SD_QUESTSYSTEM_QUESTID_SAIKAI = 109;
    const SD_QUESTSYSTEM_QUESTID_IKOINOBASHOWOTORIMODOSE = 110;
    const SD_QUESTSYSTEM_QUESTID_KODAINOJONETSU = 111;
    const SD_QUESTSYSTEM_QUESTID_ARKMAGENOTANGAN = 112;
    const SD_QUESTSYSTEM_QUESTID_EMATOUZZOKUDANNOYUKUE = 113;
    const SD_QUESTSYSTEM_QUESTID_EIENNOHOSHI = 114;
    const SD_QUESTSYSTEM_QUESTID_TOJITAHITOMI = 121;
    const SD_QUESTSYSTEM_QUESTID_SANHONASHINOTAKA = 122;

    //以降、引き継ぎ者による登録
    const SD_QUESTSYSTEM_QUESTID_NAYAMERUKUSURISHI = 125;
    const SD_QUESTSYSTEM_QUESTID_MUTYANATYUMON = 126;
    const SD_QUESTSYSTEM_QUESTID_MAHONOKAGAMI = 136;
    const SD_QUESTSYSTEM_QUESTID_KAGAMINOKAWARI = 137;
    const SD_QUESTSYSTEM_QUESTID_BARIE_EIHEI_NO_TEISAI = 176;

    // ===場所移動時に処理をかます変数番号
    const SD_SEINARIO_MEIWAKUNAIRAISHA = 510;
    const SD_SEINARIO_MEIWAKUNAIRAISHA_TARGET_NO = 10;
    const SD_DUMMY_HORSE_CARRIAGE_MAP = 115;
    const SD_PARAVIRAGE_MAP_ID = 102;

    // ===========================================================================================
    // var D_QR_DATA = D_QR_DATA || {};
    // D_QR_DATA.questID = 0;
    // D_QR_DATA.questName = "";
    // D_QR_DATA.rank = 0;
    // D_QR_DATA.questLevel = 0;
    // D_QR_DATA.note = "";

    var _tmpRegionStr = null;
    var _tmpTownStr = null;
    var _tmpDangionStr = null;
    var _tmpOtherStr = null;

    var _openEvent = null;
    var _questreportOrderByMenu = null;
    var _openSystemByMenuFlag = false;
    var _notBackBeforeArea = false;
    // tatsunoko
    // var dobby_QuestStr = null;
    // var dobby_QuestOrderStr = null;
    var dobby_useQuestSystem = USE_QUEST_REPORT_FLAG;

    var _questOpenPosition = null;
    var _questOpenPlace = null;

    // プラグインパラメータ
    var parameters = PluginManager.parameters("Dobby_FastTravel");
    var newVariableNo = parseInt(parameters['newVariableNo'] || 0);
    var newVariableNoUseFlag = parameters['newVariableNoUseFlag'];
    var invalidFasttravelVarivable = parseInt(parameters['invalidFasttravelVarivable'] || 0);
    var invalidFasttravelNo = parseInt(parameters['invalidFasttravelNo'] || -1);
    var fastTravelBgm = String(parameters['fastTravelBgm'] || null);
    var rankValiable = parseInt(parameters['rankValiable'] || 0);
    var enableFasttravelSwitchNo = parseInt(parameters['enableFasttravelSwitchNo'] || 0);
    var mapMoveFlag = parameters['mapMoveFlag'];

    var cleaNotVirginSwitchNo = parseInt(parameters['cleaNotVirginSwitch'] || 0);
    var noraNotVirginSwitchNo = parseInt(parameters['noraNotVirginSwitch'] || 0);
    var relmNotVirginSwitchNo = parseInt(parameters['relmNotVirginSwitch'] || 0);
    var sophiaNotVirginSwitchNo = parseInt(parameters['sophiaNotVirginSwitch'] || 0);
    var meiwakunairaishaValiable = parseInt(parameters['meiwakunairaisha'] || 0);
    var trogokojiinkaranoiraiValiable = parseInt(parameters['trogokojiinkaranoirai'] || 0);
    var kurisutaruNoyusouValiable = parseInt(parameters['kurisutaruNoyusou'] || 0);
    var minatonoarumachiValiable = parseInt(parameters['minatonoarumachi'] || 0);
    var relmnowasuremono = parseInt(parameters['relmnowasuremono'] || 0);
    var barukudangoatnosasoiValiable = parseInt(parameters['barukudangoatnosasoi'] || 0);

    const getActorsNastyLevel = function (actorName) {
        if (actorName === "Claire") return getClaireNastyLevel();
        if (actorName === "Nora") return getNoraNastyLevel();
        if (actorName === "Relm") return getRelmNastyLevel();
        if (actorName === "Sophia") return getSophiaNastyLevel();
    }
    const getClaireNastyLevel = function () {
        return $gameVariables === null ? 1 : $gameVariables.value(36);
    }
    const getNoraNastyLevel = function () {
        return $gameVariables === null ? 1 : $gameVariables.value(38);
    }
    const getRelmNastyLevel = function () {
        return $gameVariables === null ? 1 : $gameVariables.value(40);
    }
    const getSophiaNastyLevel = function () {
        return $gameVariables === null ? 1 : $gameVariables.value(42);
    }

    const getActorIsNotVirgin = function (actorName) {
        if (actorName === "Claire") return getClaireIsNotVirgin();
        if (actorName === "Nora") return getNoraIsNotVirgin();
        if (actorName === "Relm") return getRelmIsNotVirgin();
        if (actorName === "Sophia") return getSophiaIsNotVirgin();
    }
    const getClaireIsNotVirgin = function () {
        return $gameSwitches === null ? false : $gameSwitches.value(48);
    }
    const getNoraIsNotVirgin = function () {
        return $gameSwitches === null ? false : $gameSwitches.value(49);
    }
    const getRelmIsNotVirgin = function () {
        return $gameSwitches === null ? false : $gameSwitches.value(50);
    }
    const getSophiaIsNotVirgin = function () {
        return $gameSwitches === null ? false : $gameSwitches.value(51);
    }

    ///////////////////////////////////////////////////////////////////////////////

    function QuestData() {
        this.initialize.apply(this, arguments);
    }

    QuestData.prototype.initialize = function (questID, variantNo, questName, rank, level, note, client, orderCondtion, derivedCondition, clearCondition, clearReward, orderPlace, orderPlaceDetail, questicon, questType, characterName, dispNo) {
        this._questId = questID;
        this._variantNo = variantNo;
        this._questName = questName;
        this._rank = rank;
        this._level = level;
        this._note = note;
        this._client = client;
        this._orderCondition = orderCondtion;
        this._derivedCondition = derivedCondition;
        this._clearCondition = clearCondition;
        this._clearReward = clearReward;
        this._orderPlace = orderPlace;
        this._orderPlaceDetail = orderPlaceDetail;
        this._questIconTmp = questicon;
        this._questIcon = new Sprite();
        this._questIcon.bitmap = loadBitmapByPluginFolder("questIcon/" + questicon);
        this._questOrderList = [];
        //var questProgress = $gameVariables.value(Number(variantNo));
        var questProgress = $questReportData.getQuestDataBySveData(questID).getOrderList();
        this._isQuestOrdered = (questProgress > QUEST_REPORT_UNORDERED);
        this._isQuestInvalidWithDisp = (Number(questProgress) === QUEST_REPORT_UNORDERED_DISP);
        this._questType = questType;
        // this._adultCharacterSprite = null;
        // if (_CharacterMappingCharImg[characterName]) {
        //     this._adultCharacterSprite = new Sprite();
        //     this._adultCharacterSprite.bitmap = loadBitmapByCharacterFolder(_CharacterMappingCharImg[characterName]);
        //     this._adultCharacterSprite.setFrame(48,0,48,48);
        //     this._adultCharacterSprite.scale.x = 0.9;
        //     this._adultCharacterSprite.scale.y = 0.9;
        // }
        this._isClearonReport = false;
        this._dispNo = Number(dispNo);
    };

    function QuestOrderData() {
        this.initialize.apply(this, arguments);
    }

    QuestOrderData.prototype.initialize = function (orderId, questId, regionId, mapId, areaId, orderNote, isOption) {
        this._orderId = orderId;
        this._questId = questId;
        this._regionId = regionId;
        this._mapId = mapId;
        this._orderNote = orderNote;
        this._isOption = isOption
        this._areaId = areaId;
        this._nowProgress = 0;
    };

    function RegionData() {
        this.initialize.apply(this, arguments);
    }

    RegionData.prototype.initialize = function (regionId, regionName, dispNo, variantNo, fileName, spriteImg, selectIndex, x, y) {
        this._rd_regionId = regionId;
        this._rd_regionName = regionName;
        this._rd_dispNo = dispNo;
        this._rd_variantNo = variantNo;
        this._rd_fileName = fileName;
        this._rd_sprite = spriteImg;
        this._selectIndex = selectIndex;
        this._positionx = x;
        this._positiony = y;
        this._townWindow = null;
        this._dangionWindow = null;
        this._otherWindow = null;
    };

    function AreaInfo() {
        this.initialize.apply(this, arguments);
    }

    AreaInfo.prototype.initialize = function (id, name, regionId, regionName, dispNo, iConImgName, mapId, x, y, entrancePointX, entrancePointY, direction) {
        this._id = id;
        this._name = name;
        this._regionId = regionId;
        this._regionName = regionName;
        this._dispNo = dispNo;
        this._iconImgName = iConImgName;
        this._mapId = mapId;
        this._positionx = x;
        this._positiony = y;
        this._entrancePointX = entrancePointX;
        this._entrancePointY = entrancePointY;
        switch (direction) {
            case "下":
                this._direction = 2;
                break;
            case "左":
                this._direction = 4;
                break;
            case "右":
                this._direction = 6;
                break;
            case "上":
                this._direction = 8;
                break;
        }
        //this._direction = direction;
    };

    function AreaImgData() {
        this.initialize.apply(this, arguments);
    }

    AreaImgData.prototype.initialize = function (areaNo, sprite) {
        this._areaNo = areaNo;
        this._sprite = sprite;
        this._selectIndex = 0;
    };

    function OptionImgData() {
        this.initialize.apply(this, arguments);
    }

    OptionImgData.prototype.initialize = function (optionType, sprite) {
        this._optionType = optionType;
        this._sprite = sprite;
    };

    // クエストレポートの読み込み処理
    function loadQuestReportCSVFile() {
        // tatsunoko
        //dobby_QuestStr = dobbyloadCSVFile(SD_QUESTREPORT_CSV);
        return dobbyloadCSVFile(SD_QUESTREPORT_CSV);
    }

    // クエストレポートの読み込み処理
    function loadquestReportOrderCSVFile() {
        // tatsunoko
        //dobby_QuestOrderStr = dobbyloadCSVFile(SD_QUESTREPORT_ORDER_CSV);
        return dobbyloadCSVFile(SD_QUESTREPORT_ORDER_CSV);
    }

    function isRightPlace() {
        if (Scene_QuestMenuWindow.getQuestPlace() === "guild") {
            return "ギルド"
        } else {
            return Scene_QuestMenuWindow.getQuestPlace();
        }
    }

    //受注場所の確認と、淫乱Lvによってクエスト一覧に表示するかの判定
    function isQuestBoardHide(tmpQuest, tmpQuestId) {
        if (isHideDisplayQuest(tmpQuestId)) return true;
        if (isRightPlace() !== tmpQuest[11]) return true;
        if ($questReportData._data[tmpQuestId]._orderList > 0) return true; //クエスト受注済か？
        if (!isPossibleQuestByNasty(tmpQuestId)) return true;
        if (isDisplayFromBeginning(tmpQuestId)) return false;
        return false;
    }

    function convertQuestReportCsvToArray(thisObj, targetScene, strObj) {

        if (nullOrEnpty(strObj)) {
            return false;
        }

        if (thisObj._questReportList === undefined) {
            thisObj._questReportList = [];
        }

        //var tmp = dobby_QuestStr.split("<br>");
        let tmp = strObj.split("<br>");

        // dobby_QuestStr = null;
        for (let i = 1; i < tmp.length; i++) {

            let tmpQuest = tmp[i].split(",");

            if (tmpQuest[0] !== "") {
                let questData = $questReportData.getQuestDataBySveData(tmpQuest[QUESTREPORT_CSV_ITEMQUESTID]);

                let orderded = Number(questData.getOrderList());
                let addFlag = false;

                if (Number(targetScene) === QUEST_ORDER_TARGET_SCENE_QUESTREPORT) { //クエストレポート
                    if (orderded > Number(QUEST_REPORT_UNORDERED)) {
                        addFlag = true;
                    } else {
                        if (questData.getClearNum() > 0) addFlag = true;
                    }
                } else if (Number(targetScene) === QUEST_ORDER_TARGET_SCENE_QUESTSYSTEM) { //クエスト掲示板

                    let tmpQuestId = isNaN(tmpQuest[QUESTREPORT_CSV_ITEMQUESTID]) ? 0 : Number(tmpQuest[QUESTREPORT_CSV_ITEMQUESTID]);
                    let coc = true; //checkOrdersContinue
                    addFlag = true;

                    //クエスト入力項目
                    // console.log(tmpQuestId);
                    // if (tmpQuestId === 231) debugger;
                    // if (tmpQuestId === 232) debugger;
                    // if (tmpQuestId === 199) debugger;

                    if (isQuestBoardHide(tmpQuest, tmpQuestId)) {
                        addFlag = false;
                    }

                    if (addFlag) {

                        //反復クエストかの判定
                        if (isSpecialConditionLoop(tmpQuestId)) {
                            orderded = isValidInvalidSpecialConditionLoop(tmpQuestId, questData, orderded);
                            coc = false;
                        }

                        //受注または解放に必須クエストをクリアしているか判定
                        let isConditionReady = isValidInvalidTargetQuest(tmpQuestId, orderded);
                        if (coc && isConditionReady) {

                            //「-3」がここに入ると、まず「-2」にする。
                            if (orderded === QUEST_REPORT_UNORDERED_NOTDISP) {
                                questDispUnorderedByQuestId(tmpQuestId);
                                orderded = QUEST_REPORT_UNORDERED_DISP;
                            }

                            //踊り子系のようなクエスト
                            if (coc && isValidInvalidQuest(tmpQuestId)) {
                                if (orderded !== Number(QUEST_REPORT_UNORDERED_NEW) && orderded !== Number(QUEST_REPORT_UNORDERED_DISP)) {
                                    orderded = questvalidOrderedNotNewByQuestId(tmpQuestId); //表示して受注できるようにする
                                }
                                coc = false;
                            }

                            //最初から表示されるクエストで、仲間の有無
                            if (coc) {
                                let returnFlag = false;
                                switch (tmpQuestId) {
                                    case 47: //小悪党の調理人
                                    case 55: //強情な情報屋
                                        returnFlag = isOrdereComplete(17); //id17をクリアでソフィアが仲間になる
                                        if (!returnFlag) coc = false;
                                        break;
                                    case 53: //人食い熊の討伐
                                        returnFlag = isOrdereComplete(10); //id10をクリアでリルムが仲間になる
                                        if (!returnFlag) coc = false;
                                        break;
                                    case 65: //声の部屋の秘密
                                        returnFlag = isOrdereComplete(10) && //id10をクリアでリルムが仲間になる
                                            $gameActors.actor(1).level >= 5; //クレアのLv5以上
                                        if (!returnFlag) coc = false;
                                        break;
                                }
                            }

                            // 受注条件が「isConditionReady === true」のみのクエスト
                            if (coc && isOnlyValidInvalidTargetQuest(tmpQuestId, orderded)) {
                                if (orderded === QUEST_REPORT_UNORDERED) orderded = QUEST_REPORT_UNORDERED; //表示して受注できるようにする
                                if (orderded === QUEST_REPORT_UNORDERED_NEW) orderded = questvalidOrderedNewByQuestId(tmpQuestId); //表示して受注できるようにする(NEW付き)
                                if (orderded === QUEST_REPORT_UNORDERED_DISP) orderded = questvalidOrderedNewByQuestId(tmpQuestId); //表示して受注できるようにする(NEW付き)
                                coc = false;
                            }

                            //性技スキルやAAA関連やアイテム所持等が条件になっている、反復を行わないアダルトクエスト
                            if (coc && isValidInvalidNotLoopQuestAdultAndAAA(tmpQuestId, orderded)) {
                                if (orderded === QUEST_REPORT_UNORDERED) orderded = QUEST_REPORT_UNORDERED; //表示して受注できるようにする
                                if (orderded === QUEST_REPORT_UNORDERED_NEW) orderded = questvalidOrderedNewByQuestId(tmpQuestId); //表示して受注できるようにする(NEW付き)
                                if (orderded === QUEST_REPORT_UNORDERED_DISP) orderded = questvalidOrderedNewByQuestId(tmpQuestId); //表示して受注できるようにする(NEW付き)
                                // questData = $questReportData.getQuestDataBySveData(tmpQuest[QUESTREPORT_CSV_ITEMQUESTID]);
                                coc = false;
                            }

                            //最初から表示されていて、イベント内にて手動でオープンするタイプのクエスト
                            if (coc && isDisplayFromBeginningAndStoryFlagQuest(tmpQuestId, orderded)) {
                                if (orderded === QUEST_REPORT_UNORDERED) orderded = QUEST_REPORT_UNORDERED; //表示して受注できるようにする
                                if (orderded === QUEST_REPORT_UNORDERED_NEW) orderded = questvalidOrderedNewByQuestId(tmpQuestId); //表示して受注できるようにする(NEW付き)
                                if (orderded === QUEST_REPORT_UNORDERED_DISP) orderded = questvalidOrderedNewByQuestId(tmpQuestId); //表示して受注できるようにする(NEW付き)
                                // questData = $questReportData.getQuestDataBySveData(tmpQuest[QUESTREPORT_CSV_ITEMQUESTID]);
                                coc = false;
                            }
                        }

                        if (!isConditionReady && orderded === QUEST_REPORT_UNORDERED_NOTDISP) { //イベントで表示し、かつランクが条件のクエストを非表示
                            addFlag = false;
                        }
                    }

                    if (tmpQuestId === 231) {
                        if (!$gameSwitches.value(401)) {
                            if (orderded > 0) {
                                addFlag = false;
                            } else {
                                if (orderded > -3) {
                                    addFlag = true;
                                } else {
                                    addFlag = false;
                                }
                            }
                        } else {
                            addFlag = false;
                            const flags = [
                                isOrdereComplete(118), //強く儚いものたち
                                isOrdereComplete(138), //新たなる巫女
                                isOrdereComplete(161), //怪盗夜を往く
                                isOrdereComplete(168), //消えるもの残るもの
                                isOrdereComplete(175), //牙をむく疾風
                                isOrdereComplete(199), //海は変わらない
                                isOrdereComplete(215), //決戦！ロパロ略奪団
                                isOrdereComplete(218), //武器職人の夢
                                isOrdereComplete(220), //見果てぬ夢
                                isOrdereComplete(222), //偉大なる未亡人
                                isOrdereComplete(224), //復讐者たちの黄昏
                            ];
                            if (flags.includes(false)) addFlag = true;
                        }
                    }

                    if (tmpQuestId === 232) {
                        if ($gameSwitches.value(401)) {
                            if (orderded > 0) {
                                addFlag = false;
                            } else {
                                if (orderded > -3) {
                                    addFlag = true;
                                    $questReportData.getQuestDataBySveData(231).setOrderList(-3)
                                } else {
                                    addFlag = false;
                                }
                            }
                        } else {
                            addFlag = false;
                        }
                    }

                    ///////////////////////////////////////////////////////////////////////////////
                    // カスタマイズ

                    if (tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE] != "" && tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE] != null && tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE_DETAIL] != null && tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE_DETAIL] != "") {
                        if (!thisObj.questLocationAllCnt) {
                            thisObj.questLocationAllCnt = {};
                        }

                        if (!thisObj.questLocationCnt) {
                            thisObj.questLocationCnt = {};
                        }

                        if (tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE] == SD_QUESTSYSTEM_OPEN_GUILD_JP || (tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE_DETAIL] == "掲示板")) {

                            if (!thisObj.questLocationAllCnt[tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE]]) {
                                thisObj.questLocationAllCnt[tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE]] = 1;
                            } else {
                                thisObj.questLocationAllCnt[tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE]]++;
                            }

                            if (questData.getClearNum() > 0) {
                                if (!thisObj.questLocationCnt[tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE]]) {
                                    thisObj.questLocationCnt[tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE]] = 1;
                                } else {
                                    thisObj.questLocationCnt[tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE]]++;
                                }
                            } else {
                                if (!thisObj.questLocationCnt[tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE]]) {
                                    thisObj.questLocationCnt[tmpQuest[QUESTREPORT_CSV_ITEMORDER_PLACE]] = 0;
                                }
                            }
                        }

                        // カスタマイズここまで
                        ///////////////////////////////////////////////////////////////////////////////

                    }
                } else {
                    alert("ファイル読み込み時にエラーが起きました。管理者へご連絡ください。(convertQuestReportCsvToArray)");
                    thisObj.popScene();
                }

                // 受注している場合のみに保存する。
                if (addFlag) {
                    var idx = 0;
                    thisObj._questReportList.push(new QuestData(tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++], tmpQuest[idx++]));
                }
            }
        }

        if (thisObj._questReportList && thisObj._questReportList.length > 1) {
            thisObj._questReportList.sort(function (first, second) {
                return first._dispNo - second._dispNo;
            });
        }

        return true;
    }

    function convertQuestReportOrderCsvToArray(thisObj, ostr) {
        if (nullOrEnpty(ostr)) {
            return false;
        }

        if (thisObj._questReportList.length < 1) {
            return true;
        }

        var orderdedQuestIdList = [];
        thisObj._questReportList.some(function (questReport) {
            orderdedQuestIdList.push(Number(questReport._questId));
        });

        //var tmp = dobby_QuestOrderStr.split("<br>");
        var tmp = ostr.split("<br>");
        //dobby_QuestOrderStr = null;
        var returnList = [];
        for (var i = 1; i < tmp.length; i++) {
            var tmpOrder = tmp[i].split(",");
            if (tmpOrder[0] != "") {
                // 受注している場合のみに保存する。
                if (orderdedQuestIdList.includes(Number(tmpOrder[1]))) {
                    var idx = 0;
                    thisObj._questReportList.some(function (questReport) {
                        if (Number(questReport._questId) === Number(tmpOrder[1])) {
                            questReport._questOrderList.push(new QuestOrderData(tmpOrder[idx++], tmpOrder[idx++], tmpOrder[idx++], tmpOrder[idx++], tmpOrder[idx++], tmpOrder[idx++], tmpOrder[idx++]));
                            return true;
                        } else {
                            return false;
                        }
                    });
                }
            }
        }
        return true;
    }

    function createQuestReport(thisObj) {
        thisObj._questReportBackGroundBajuSprite = new Sprite();
        thisObj._questReportBackGroundBajuSprite.bitmap = loadBitmapByQuestSystemPluginFolder("backgroundLayout");
        thisObj._questReportBackGroundBajuSprite.opacity = 0;
        thisObj._questReportBackGroundSprite = new Sprite();
        thisObj._questReportBackGroundSprite.bitmap = loadBitmapByQuestSystemPluginFolder(IMG_QUESTREPORT_BACKGROUND);
        thisObj._questReportBackGroundSprite.opacity = 0;
        thisObj._alertImg = new Sprite();
        thisObj._alertImg.bitmap = loadBitmapByQuestSystemPluginFolder("bronzeFrame");
        thisObj._alertImg.opacity = 0;

        if (thisObj._baseSprite != undefined) {
            thisObj._baseSprite.addChild(thisObj._questReportBackGroundBajuSprite);
            thisObj._baseSprite.addChild(thisObj._questReportBackGroundSprite);
            thisObj._baseSprite.addChild(thisObj._alertImg);
        }

        if (thisObj._questReportDetailWindow === undefined) {
            thisObj._questReportDetailWindow = new Window_questReport_Detail_Window();
            thisObj._questReportDetailWindow.opacity = 0;
            thisObj.addWindow(thisObj._questReportDetailWindow);
            thisObj._questReportDetailWindow.deactivate();
            thisObj._questReportDetailWindow.close();
            // thisObj._questReportDetailWindow.opacity = 255;
        }

        if (thisObj._questOrderListWindow === undefined) {
            var detailX = thisObj._questReportDetailWindow.x;
            var detailY = thisObj._questReportDetailWindow.y;
            var detailWidth = thisObj._questReportDetailWindow.width;
            thisObj._questOrderListWindow = new Window_OrderList_Window((detailX + 5), (detailY + 250), detailWidth - 10);
            thisObj._questOrderListWindow.opacity = 0;
            thisObj.addWindow(thisObj._questOrderListWindow);
            thisObj._questOrderListWindow.deactivate();
            thisObj._questReportDetailWindow.setOrderListWindow(thisObj._questOrderListWindow);
            thisObj._questOrderListWindow.close();
        }

        if (thisObj._questReportTitleWindow === undefined) {
            let questCnt = questReportcnt(thisObj._questReportList);
            thisObj._questReportTitleWindow = new Window_questReport_Title_Window(questCnt["allclearQuest"], questCnt["clearQuest"], questCnt["notClearQuest"]);
            thisObj._questReportTitleWindow.opacity = 0;
            // thisObj._blackOutImg = new Sprite();
            // thisObj._blackOutImg.bitmap = loadBitmapByPluginFolder(IMG_QUESTREPORT_BACKGROUND);
            // var tmpX = thisObj._blackOutImg.x;
            // thisObj._blackOutImg.x = tmpX - thisObj._questReportTitleWindow.x;
            // thisObj._questReportTitleWindow.addChild(thisObj._blackOutImg);
            thisObj._questReportTitleWindow.open();
            thisObj._questReportTitleWindow.close();
            thisObj._questReportTitleWindow.opacity = 0;
            thisObj.addWindow(thisObj._questReportTitleWindow);
        }

        if (thisObj._questReportListlWindow === undefined) {

            // クエストレポートのリストを表示する際、実行可能なクエストと実行完了しているクエストを
            // 上下に分けるようにする。
            thisObj._questReportList = questReportinitSetting(thisObj._questReportList);
            thisObj._questReportListlWindow = new Window_questReport_List_Window(thisObj._questReportList, thisObj._questReportDetailWindow, thisObj._questReportTitleWindow);
            thisObj._questReportListlWindow.opacity = 0;
            thisObj.addWindow(thisObj._questReportListlWindow);
            thisObj._questReportListlWindow.close();
            //thisObj._questReportListlWindow.opacity = 255;
            thisObj._questOrderListWindow.setQuestReportListlWindow(thisObj._questReportListlWindow);
        }

        if (thisObj._questReportNoOrderedMsgWindow === undefined) {
            var noOrderedWindowWidth = 614;
            var noOrderedWindowHeight = 266;
            var noOrderedWindowWidthX = (Graphics.width / 2) - (noOrderedWindowWidth / 2);
            var noOrderedWindowWidthY = (Graphics.height / 2) - (noOrderedWindowHeight / 2);
            thisObj._questReportNoOrderedMsgWindow = new Window_Base(noOrderedWindowWidthX, noOrderedWindowWidthY, noOrderedWindowWidth, noOrderedWindowHeight);
            thisObj._questReportNoOrderedMsgWindow.drawText(SD_WARN_MSG_QUESTREPORT_NOTORDERQUEST, 50, 50, noOrderedWindowWidth, noOrderedWindowHeight, "center");
            thisObj._questReportNoOrderedMsgWindow.opacity = 0;
            if (thisObj._alertImg) {
                thisObj._alertImg.x = thisObj._questReportNoOrderedMsgWindow.x;
                thisObj._alertImg.y = thisObj._questReportNoOrderedMsgWindow.y;
            }
            thisObj.addWindow(thisObj._questReportNoOrderedMsgWindow);
            thisObj._questReportNoOrderedMsgWindow.close();
        }

    }

    let ALT_clearQuestData = {};

    function questReportinitSetting(questReportList) {
        var resultQuestReortList = [];
        if (questReportList != undefined && questReportList.length > 0) {
            var clearedQuestList = [];
            var notClearedQuestList = [];
            for (var i = 0; i < questReportList.length; i++) {
                // var questprogress = $gameVariables.value(questReportList[i]._variantNo);
                questReportList[i]._questId = questReportList[i]._questId.replace("\n", "");
                // console.log(questReportList[i]._questId);
                var questData = $questReportData.getQuestDataBySveData(questReportList[i]._questId);
                // TODO クエストクリアのところから消えてしまう件について調整する。
                if (Number(questData.getOrderList()) === Number(QUEST_REPORT_ORDER_FULLCOMPLETE)) {
                    clearedQuestList.push(questReportList[i]);
                } else {
                    if (Number(questData.getOrderList()) > Number(QUEST_REPORT_UNORDERED)) {
                        notClearedQuestList.push(questReportList[i]);
                    }
                    // 反復クエストをクリアした場合、クエストレポートで使用不可にするための処理
                    if (Number(questData.getOrderList()) != Number(QUEST_REPORT_ORDER_FULLCOMPLETE) && Number(questData.getClearNum()) > 0) {
                        // 2021/01/07
                        // todo 処理速度によっては処理を変える
                        // var clearQuestData = new QuestData(
                        //     questReportList[i]._questId,
                        //     questReportList[i]._variantNo,
                        //     questReportList[i]._questName,
                        //     questReportList[i]._rank,
                        //     questReportList[i]._level,
                        //     questReportList[i]._note,
                        //     questReportList[i]._client,
                        //     questReportList[i]._orderCondition,
                        //     questReportList[i]._derivedCondition,
                        //     questReportList[i]._clearCondition,
                        //     questReportList[i]._clearReward,
                        //     questReportList[i]._orderPlace,
                        //     questReportList[i]._orderPlaceDetail,
                        //     questReportList[i]._questIconTmp,
                        //     questReportList[i]._questType,
                        //     "");
                        var clearQuestData = Object.create(questReportList[i]);
                        clearQuestData._questOrderList = Object.create(questReportList[i]._questOrderList);
                        //clearQuestData._questOrderList = questReportList[i]._questOrderList;
                        // for (var j = 0 ; j < questReportList[i]._questOrderList.length ; j++) {
                        //     var order = questReportList[i]._questOrderList[j];
                        //     clearQuestData._questOrderList.push(
                        //         new QuestOrderData(
                        //             order._orderId,
                        //             order._questId,
                        //             order._regionId,
                        //             order._mapId,
                        //             order._orderNote,
                        //             order._isOption
                        //         ));
                        //     clearQuestData._questOrderList[j]._nowProgress =  QUEST_REPORT_ORDER_COMPLETE;
                        // }
                        clearQuestData._questOrderList.forEach(function (value) {
                            value._nowProgress = QUEST_REPORT_ORDER_COMPLETE;
                        });
                        clearQuestData._isClearonReport = true;
                        clearQuestData._questId = questReportList[i]._questId;
                        clearedQuestList.push(clearQuestData);
                    }

                }
                // if (Number(questData.getOrderList()) === Number(QUEST_REPORT_ORDER_FULLCOMPLETE)) {
                //     clearedQuestList.push(questReportList[i]);
                // } else {
                //     notClearedQuestList.push(questReportList[i]);
                // }
            }

            if (notClearedQuestList.length > 0) {
                resultQuestReortList = resultQuestReortList.concat(notClearedQuestList);
            }

            if (clearedQuestList.length > 0) {
                resultQuestReortList = resultQuestReortList.concat(clearedQuestList);
            }
        }
        ALT_clearQuestData.resultQuestReortList = resultQuestReortList;
        return resultQuestReortList;
    }

    function questReportcnt(questReportList) {
        //var resultQuestReortList = new Array();
        var returnResult = {};
        var clearedQuestList = [];
        var notClearedQuestList = [];
        if (questReportList != undefined && questReportList.length > 0) {
            for (var i = 0; i < questReportList.length; i++) {
                var questData = $questReportData.getQuestDataBySveData(questReportList[i]._questId);
                // TODO クエストクリアのところから消えてしまう件について調整する。
                if (Number(questData.getOrderList()) === Number(QUEST_REPORT_ORDER_FULLCOMPLETE)) {
                    clearedQuestList.push(questReportList[i]);
                } else {
                    if (Number(questData.getOrderList()) > Number(QUEST_REPORT_UNORDERED)) {
                        notClearedQuestList.push(questReportList[i]);
                    }
                    // 反復クエストをクリアした場合、クエストレポートで使用不可にするための処理
                    if (Number(questData.getOrderList()) != Number(QUEST_REPORT_ORDER_FULLCOMPLETE) && Number(questData.getClearNum()) > 0) {
                        clearedQuestList.push(questReportList[i]);
                    }

                }
            }
        }

        returnResult["notClearQuest"] = notClearedQuestList.length;
        returnResult["clearQuest"] = clearedQuestList.length;
        returnResult["allclearQuest"] = questReportList.length;

        return returnResult;
    }

    function updateWindowQuestReportScene(thisObj, openFlag) {
        if (thisObj._questReportList.length === 0) {
            updateOpenToneWindow(thisObj._questReportNoOrderedMsgWindow);
            thisObj._alertImg.opacity = 255;
        } else {
            updateCloseToneWindow(thisObj._questReportNoOrderedMsgWindow);
            thisObj._alertImg.opacity = 0;
        }

        if (openFlag) {
            // updateOpenToneWindow(thisObj._questReportTitleWindow);
            updateOpenToneWindow(thisObj._questReportDetailWindow);
            updateOpenToneWindow(thisObj._questReportListlWindow);
            updateOpenToneWindow(thisObj._questOrderListWindow);
        } else {

            // updateCloseToneWindow(thisObj._questReportTitleWindow);
            updateCloseToneWindow(thisObj._questReportDetailWindow);
            updateCloseToneWindow(thisObj._questReportListlWindow);
            updateCloseToneWindow(thisObj._questOrderListWindow);
        }

    }

    function updateOpenToneWindow(tWindow) {
        if (tWindow.isClosed()) {
            while (!tWindow.isOpen()) {
                tWindow.updateOpen()
            }
        }
    }

    function updateCloseToneWindow(tWindow) {
        if (tWindow.isOpen()) {
            while (!tWindow.isClosed()) {
                tWindow.updateClose()
            }
        }
    }

    function openQuestReportTmp(thisObj) {

        if (thisObj._questReportBackGroundSprite != undefined && thisObj._questReportBackGroundSprite.opacity === 0) {
            thisObj._questReportBackGroundSprite.opacity = 255;
        }

        if (thisObj._questReportBackGroundBajuSprite != undefined && thisObj._questReportBackGroundBajuSprite.opacity === 0) {
            thisObj._questReportBackGroundBajuSprite.opacity = 255;
        }

        if (thisObj._questReportListlWindow != undefined && thisObj._questReportListlWindow.isClosed()) {
            var idx = 0;
            thisObj._questReportListlWindow.open();
            thisObj._questReportListlWindow.activate();
            if (thisObj._questReportList.length === 0) {
                idx = -1;
            }
            thisObj._questReportListlWindow.select(idx);
        }

        var tmpQuestInfo = thisObj._questReportListlWindow.getSelectedQuestInfo();
        if (thisObj._questReportTitleWindow != undefined) {
            thisObj._questReportTitleWindow.open();
        }

        if (thisObj._questReportDetailWindow != undefined && thisObj._questReportDetailWindow.isClosed()) {

            if (thisObj._questReportList.length > 0) {
                //                 thisObj._questReportDetailWindow.setOrder(
                //                     tmpQuestInfo._questId,
                //                     tmpQuestInfo._questName,
                //                     tmpQuestInfo._note,
                //                     tmpQuestInfo._clearCondition,
                //                     tmpQuestInfo._clearReward,
                //                     tmpQuestInfo._questOrderList,
                // //                    $gameVariables.value(tmpQuestInfo._variantNo)
                //                     $questReportData.getQuestDataBySveData(tmpQuestInfo._questId).getOrderList()
                //                 );
                thisObj._questReportDetailWindow.setOrder(tmpQuestInfo._questId, tmpQuestInfo._questName, tmpQuestInfo._note, tmpQuestInfo._clearCondition, tmpQuestInfo._clearReward, tmpQuestInfo._questOrderList, tmpQuestInfo._isClearonReport ? QUEST_REPORT_ORDER_FULLCOMPLETE : $questReportData.getQuestDataBySveData(tmpQuestInfo._questId).getOrderList());

            } else {
                thisObj._questReportDetailWindow.setOrder("", "", "", "", "", "", 0);
            }

            thisObj._questReportDetailWindow.open();
            thisObj._questReportDetailWindow.deactivate();
        }

        if (thisObj._questOrderListWindow != undefined && thisObj._questOrderListWindow.isClosed()) {
            thisObj._questOrderListWindow.open();
            thisObj._questOrderListWindow.select(0);
        }

        if (thisObj._questReportList.length === 0) {
            thisObj._questReportNoOrderedMsgWindow.open();
            thisObj._questReportNoOrderedMsgWindow.deactivate();
            thisObj._alertImg.opacity = 255;
        }
    }

    // クエストレポートが開ききった時に行う処理
    function conpleteOpendQuestReportWindow(thisObj) {
        // if (thisObj._blackOutImg != undefined) {
        //     thisObj._blackOutImg.opacity = 0;
        // }
    }

    // クエストレポートのウィンドウ全てを閉じる。（クエストレポートを閉じる処理。
    function closeQuestReortWindowTmp(thisObj) {
        thisObj._questReportBackGroundSprite.opacity = 0;
        thisObj._questReportBackGroundBajuSprite.opacity = 0;
        thisObj._questReportDetailWindow.deactivate();
        thisObj._questReportListlWindow.deactivate();
        thisObj._questReportListlWindow.select(-1);
        thisObj._questOrderListWindow.deactivate();
        thisObj._questOrderListWindow.select(-1);
        if (thisObj._questReportTitleWindow && thisObj._questReportTitleWindow.isOpen()) {
            thisObj._questReportTitleWindow.close();
        }

        if (thisObj._questReportDetailWindow.isOpen()) {
            thisObj._questReportDetailWindow.close();
        }

        if (thisObj._questReportListlWindow.isOpen()) {
            thisObj._questReportListlWindow.close();
        }

        if (thisObj._questOrderListWindow.isOpen()) {
            thisObj._questOrderListWindow.close();
        }

        if (thisObj._questReportNoOrderedMsgWindow.isOpen()) {
            thisObj._questReportNoOrderedMsgWindow.close();
            thisObj._alertImg.opacity = 0;
        }
    }

    function invalidFasttravelMessage(thisObj, message) {
        if ((thisObj._alertWindow && thisObj._alertWindow != null)) {
            if (!thisObj._alertWindow._animationFlag) {
                thisObj._alertWindow.contents.clear();
                thisObj._alertWindow.setTxt(message);
                thisObj._alertWindow.startAnimation();
            }
        } else {
            thisObj._alertWindow = new D_Window_Common_Alert_Window(300, 200, thisObj);
            thisObj._alertWindow.setInitialize(thisObj._alertWindow);
            thisObj.addChild(thisObj._alertWindow);
            thisObj._alertWindow.setTxt(message);
            thisObj._alertWindow.startAnimation();
        }
    }

    function terminateAlertWindow(thisObj) {
        thisObj.removeChild(thisObj._alertWindow);
    }

    function loadBitmapByPluginFolder(fileName) {
        return ImageManager.loadBitmap('img/dFasttravel/', fileName);
    }

    function loadBitmapByQuestSystemPluginFolder(fileName) {
        return loadBitmapByPluginFolder('quest/' + fileName);
    }

    function loadBitmapByCharacterFolder(fileName) {
        return ImageManager.loadBitmap('img/characters/', fileName);
    }

    function nullOrEnpty(test) {
        return (test === null || test === "");
    }

    // 画像のどれか一片でも画面外に出ていた場合、trueを返す用のチェック関数
    function isOutDisplay(x, y, width, height) {
        return (x < 0 || y < 0 || width > DISP_W || height > DISP_H);
    }

    // targetX/targetYで指定したものが、x/y〜 x+width/y*heightの範囲内で収まっているかどうかをチェックする。
    function targetWithinRange(targetX, targetY, x, y, width, height) {
        if (targetX >= x && targetX <= (x + width) && targetY >= y && targetY <= (y + height)) {
            return true;
        }
        return false;
    }

    // function initializeQuestData(){
    //     loadQuestReportCSVFile();
    //     if (nullOrEnpty(dobby_QuestStr)) {
    //         return false;
    //     }

    //     var tmp = dobby_QuestStr.split("<br>");
    //     dobby_QuestStr = null;
    //     for (var i = 1 ; i < tmp.length ; i++) {
    //         var tmpQuest = tmp[i].split(",");
    //         if (tmpQuest[QUESTREPORT_CSV_ITEMQUESTID] != "") {
    //             questInvalidByVariable(tmpQuest[QUESTREPORT_CSV_ITEMVARIABLENO]);
    //         }
    //     }
    // };

    function getQuestVariableByCSVConditionQuestId(questId) {
        // tatsunoko
        //loadQuestReportCSVFile();
        var questStr = loadQuestReportCSVFile();
        //if (nullOrEnpty(dobby_QuestStr)) {
        if (nullOrEnpty(questStr)) {
            return false;
        }

        // var tmp = dobby_QuestStr.split("<br>");
        var tmp = questStr.split("<br>");
        //dobby_QuestStr = null;
        for (var i = 1; i < tmp.length; i++) {
            var tmpQuest = tmp[i].split(",");
            if (tmpQuest[QUESTREPORT_CSV_ITEMQUESTID] != "") {
                if (Number(questId) === Number(tmpQuest[QUESTREPORT_CSV_ITEMQUESTID])) {
                    return tmpQuest[QUESTREPORT_CSV_ITEMVARIABLENO];
                }
            }
        }

        alert("クエストIDに紐付く変数番号が取得できません。管理者に連絡をしてください。");
        return null;
    }

    function isInputCancelCheck() {
        return ((Input.isRepeated('cancel') && Input.isTriggered('cancel')) || TouchInput.isCancelled());
    }

    function getOptionTypeData(optionImgDataList, targetType) {
        if (optionImgDataList && optionImgDataList.length > 0) {
            var optionImgData = optionImgDataList.filter(function (value) {
                return Number(value._optionType) === Number(targetType);
            });

            if (optionImgData && optionImgData.length > 0) {
                return optionImgData[0];
            }
        }
        return null;
    }

    // ================================================================================
    // クエストを受注/クリアした際の処理、ランク関連の処理を行う関数群
    // ================================================================================
    function setRank(num) {
        $gameVariables.setValue(Number(rankValiable), num);
    }

    function getRank() {
        return $gameVariables.value(Number(rankValiable));
    }

    // クエストが受注中(進行中)か判断するための関数
    function isOrderedQuest(questId) {
        var questOrderList = $questReportData.getQuestDataBySveData(questId).getOrderList();
        return (Number(questOrderList) >= QUEST_REPORT_ORDERED && Number(questOrderList) < QUEST_REPORT_ORDER_FULLCOMPLETE);
    }

    $isOrderedQuest = function (questId) {
        var questOrderList = $questReportData.getQuestDataBySveData(questId).getOrderList();
        return (Number(questOrderList) >= QUEST_REPORT_ORDERED && Number(questOrderList) < QUEST_REPORT_ORDER_FULLCOMPLETE);
    };

    // クエストを受注している状態でなおかつ、最初の指令の進行中の状態。（実質クエストを受けた直後）
    function isImmediatelyAfter(questId) {
        var questOrderList = $questReportData.getQuestDataBySveData(questId).getOrderList();
        return (Number(questOrderList) === QUEST_REPORT_ORDERED);
    }

    // クエストが完了しているか判断する関数
    function isOrdereComplete(questId, isClear) {
        var questOrderList = $questReportData.getQuestDataBySveData(questId).getOrderList();
        if (isClear) {
            $questReportData.getQuestDataBySveData(questId).setOrderList(QUEST_REPORT_ORDER_FULLCOMPLETE);
            questOrderList = QUEST_REPORT_ORDER_FULLCOMPLETE;
        }
        return (Number(questOrderList) === QUEST_REPORT_ORDER_FULLCOMPLETE);
    }

    // 受注不可能/非表示状態かチェックする関数
    function isNotOrderedAndNotDisplay(questId) {
        var questOrderList = $questReportData.getQuestDataBySveData(questId).getOrderList();
        return (Number(questOrderList) === QUEST_REPORT_UNORDERED_NOTDISP);
    }

    // 受注不可能/表示状態かチェックする関数
    function isNotOrderedAndDisplay(questId) {
        var questOrderList = $questReportData.getQuestDataBySveData(questId).getOrderList();
        return (Number(questOrderList) === QUEST_REPORT_UNORDERED_DISP);
    }

    // 受注可能/表示状態/NEW状態かチェックする関数
    function isNotOrderedAndDisplayAndNew(questId) {
        var questOrderList = $questReportData.getQuestDataBySveData(questId).getOrderList();
        return (Number(questOrderList) === QUEST_REPORT_UNORDERED_NEW);
    }

    // 受注可能/表示状態/NEW状態ではないかチェックする関数
    function isNotOrderedAndDisplay(questId) {
        var questOrderList = $questReportData.getQuestDataBySveData(questId).getOrderList();
        return (Number(questOrderList) === QUEST_REPORT_UNORDERED);
    }

    // クエストを受注していない（完了もしていない）状態を判断する関数
    function isNotOrdereAndNotComplete(questId) {
        var questOrderList = $questReportData.getQuestDataBySveData(questId).getOrderList();
        return (Number(questOrderList) < QUEST_REPORT_ORDERED);
    }

    // クエストを受注不可能状態にする。(変数直接指定)
    function questInvalidByQuestId(questId) {
        $questReportData.getQuestDataBySveData(questId).setOrderList(QUEST_REPORT_UNORDERED_NOTDISP);
        return QUEST_REPORT_UNORDERED_NOTDISP;
    }

    // クエストを受注状態にする。(クエストIDより紐づける)
    function questOrderedById(questId) {
        $questReportData.getQuestDataBySveData(questId).setOrderList(QUEST_REPORT_ORDERED);
    }

    // クエストをカウンターから受注した際、
    // 変数の中も進んでいる状態とするための番号
    function updateQuestVariableNo(variableNo, num) {
        $gameVariables.setValue(variableNo, Number(num));
    }

    // クエストを表示にはするが、受けられない状態にする場合(クエストIDより紐づける)
    function questDispUnorderedByQuestId(questId) {
        $questReportData.getQuestDataBySveData(questId).setOrderList(QUEST_REPORT_UNORDERED_DISP);
        return QUEST_REPORT_UNORDERED_DISP;
    }

    // クエストを受注可能状態にする。（クエストIDより紐づける）
    function questvalidOrderedNotNewByQuestId(questId) {
        $questReportData.getQuestDataBySveData(questId).setOrderList(QUEST_REPORT_UNORDERED);
        return QUEST_REPORT_UNORDERED;
    }

    // クエストを受注可能状態にする。（クエストIDより紐づける）
    function questvalidOrderedNewByQuestId(questId) {
        $questReportData.getQuestDataBySveData(questId).setOrderList(QUEST_REPORT_UNORDERED_NEW);
        return QUEST_REPORT_UNORDERED_NEW;
    }

    // //既NewQuestリスト mapId:22 evId:11 p.3の最後に配列を作成。
    // //それ以降は引き継ぎ部屋で配列を作って全てのQuestのOrderListをpush。
    // if (!$gameVariables._data[148].includes(questId)) { //148:既NewQuestリスト
    //     let placeName = "";
    //     if (Scene_QuestMenuWindow.getQuestPlace() === "guild") {
    //         placeName = "ギルド"
    //     } else {
    //         placeName = Scene_QuestMenuWindow.getQuestPlace();
    //     }
    //     if (placeName === tmpQuest[11]) { //148:既NewQuestリスト
    //         $gameVariables._data[148].push(questId);
    //         $questReportData.getQuestDataBySveData(questId).setOrderList(QUEST_REPORT_UNORDERED_NEW);
    //         return QUEST_REPORT_UNORDERED_NEW;
    //     } else {
    //         return QUEST_REPORT_UNORDERED_NOTDISP;
    //     }
    // }
    //=============================================================================
    // $gameVariables._data[148]:既NewQuestリストがNullの場合
    // 「YEP_SaveCore」の下記を弄ってバグを修正
    //=============================================================================

    // Scene_Load.prototype.onLoadSuccess = function() {
    //     Scene_File.prototype.onLoadSuccess.call(this);
    //     if ($gameVariables._data[148] === null) $gameVariables._data[148] = []; //148:既NewQuestリスト
    // };

    // クエストを完全クリアの状態にする。(クエストIDから)
    function questFullCompletedByQuestId(questId) {
        $questReportData.getQuestDataBySveData(questId).setOrderList(QUEST_REPORT_ORDER_FULLCOMPLETE);
    }

    // デバッグ用：指定したクエストIDを全てクリア済みにする
    function questFullCompletedByQuestIdMulti(questIdList) {
        for (var i = 1; i < questIdList.length; i++) {
            $questReportData.getQuestDataBySveData(questIdList[i]).setOrderList(QUEST_REPORT_ORDER_FULLCOMPLETE);
        }
    }

    // クエストのクリア回数を増やす
    function questAddClearNum(questId) {
        $questReportData.getQuestDataBySveData(questId).addClearNum();
    }

    // デバッグ用：指定したクエストIDのクリア回数を1回増やす
    function multiQuestAddClearNum(questIdList) {
        for (var i = 1; i < questIdList.length; i++) {
            $questReportData.getQuestDataBySveData(questIdList[i]).addClearNum();
        }
    }

    function nextOpenQuestOrderByCountAndQuestId(questId) {
        openQuestOrderByQuestIdAndCount(questId, 1);
    }

    function openQuestOrderByQuestIdAndCount(questId, cnt) {
        var questProgress = $questReportData.getQuestDataBySveData(questId).getOrderList();
        var questProgressList = questVariableNoSplitForOrderProgress(questProgress);
        questProgressList = questProgressList.reverse();

        var tmpCnt = 0;
        for (var i = 0; i < questProgressList.length; i++) {
            if (Number(questProgressList[i]) === QUEST_REPORT_ORDER_UNORDER) {
                questProgressList[i] = QUEST_REPORT_ORDER_INPROGRESS;
                Alt_Func.questHistoryUpdateQuestOrderId(i);
                tmpCnt++;
            }

            if (Number(tmpCnt) >= Number(cnt)) {
                break;
            }
        }
        questProgressList = questProgressList.reverse();
        $questReportData.getQuestDataBySveData(questId).setOrderList(Number(Number(questProgressList.toString().split(",").join(""))));
    }

    // 進行中の指令を全てクリア状態にする。
    function clearQuestOrderByQuestId(questId) {
        //var variableNo = getQuestVariableByCSVConditionQuestId(questId);
        // ここで指定した指令の名称を表示する。
        //clearQuestOrderByVariableNo(variableNo);
        var questProgress = $questReportData.getQuestDataBySveData(questId).getOrderList();
        var questProgressList = questVariableNoSplitForOrderProgress(questProgress);
        questProgressList = questProgressList.reverse();
        for (var i = 0; i < questProgressList.length; i++) {
            if (Number(questProgressList[i]) === QUEST_REPORT_ORDER_INPROGRESS) {
                questProgressList[i] = QUEST_REPORT_ORDER_COMPLETE;
                Alt_Func.questHistoryUpdateQuestOrderId(i);
            }
        }
        questProgressList = questProgressList.reverse();
        $questReportData.getQuestDataBySveData(questId).setOrderList(Number(questProgressList.toString().split(",").join("")));
    }

    function displayOrderStart(questId) {
        kmsOpenMessageOrderComplete(questId, true);
    }

    function displayOrderMultlStart(questId, num) {
        kmsOpenMessageOrderComplete(questId, true, num);
    }

    function displayOrderComplete(questId) {
        kmsOpenMessageOrderComplete(questId, false);
    }

    // 使われてない。消してもいい鴨
    function displayOrderMultlComplete(questId, num) {
        kmsOpenMessageOrderComplete(questId, false, num);
    }

    // 指定した進行中の指令をクリア状態にする。（並列処理対応）
    // 指定した番号のクエストの指令をクリアにする。(クエストIDから紐づける)
    function clearQuestOrderByQuestIdAndTargetNo(questId, no) {
        var noList = [];
        noList.push(Number(no));
        clearQuestOrderByQuestIdAndTargetNoList(questId, noList);
    }

    function clearQuestOrderByQuestIdAndTargetNoList(questId, noList) {
        var questProgress = $questReportData.getQuestDataBySveData(questId).getOrderList();
        var questProgressList = questVariableNoSplitForOrderProgress(questProgress);
        questProgressList = questProgressList.reverse();
        for (var i = 0; i < questProgressList.length; i++) {
            if (noList.includes(Number(i + 1)) && Number(questProgressList[i]) === QUEST_REPORT_ORDER_INPROGRESS) {
                questProgressList[i] = QUEST_REPORT_ORDER_COMPLETE.toString();
            }
        }
        questProgressList = questProgressList.reverse();
        $questReportData.getQuestDataBySveData(questId).setOrderList(Number(questProgressList.toString().split(",").join("")));
    }

    // 指定した進行中の指令をオープン状態にする。（並列処理対応）
    function openQuestOrderByQuestIdAndTargetNo(questId, no) {
        var noList = [];
        noList.push(Number(no));
        openQuestOrderByQuestIdAndTargetNoList(questId, noList);
    }

    function openQuestOrderByQuestIdAndTargetNoList(questId, noList) {
        var questProgress = $questReportData.getQuestDataBySveData(questId).getOrderList();
        var questProgressList = questVariableNoSplitForOrderProgress(questProgress);
        questProgressList = questProgressList.reverse();
        for (var i = 0; i < questProgressList.length; i++) {
            if (noList.includes(Number(i + 1)) && Number(questProgressList[i]) === QUEST_REPORT_ORDER_UNORDER) {
                questProgressList[i] = QUEST_REPORT_ORDER_INPROGRESS.toString();
            }
        }
        questProgressList = questProgressList.reverse();
        $questReportData.getQuestDataBySveData(questId).setOrderList(Number(questProgressList.toString().split(",").join("")));
    }

    // ================================================================================
    // 新しい指令が出てきたときにクエストにNewと表示させる関数軍
    // ================================================================================
    function checkUseQuestOpenDispNew() {
        if (newVariableNoUseFlag && newVariableNoUseFlag === "true") {
            return newVariableNo > 0;
        }
        return true;
    }

    function ismapMoveFlag() {
        return (mapMoveFlag && mapMoveFlag === "true");
    }

    // function updateNewQuestInfoByVariable(variableNo){
    //     $gameVariables.setValue(Number(newVariableNo),Number(variableNo));
    // };

    function updateNewQuestInfoByQuestId(questId) {
        // var variableNo = getQuestVariableByCSVConditionQuestId(questId);
        // updateNewQuestInfoByVariable(variableNo);
        $gameVariables.setValue(Number(newVariableNo), Number(questId));
    }

    function resetNewQuestInfoByQuestId() {
        $gameVariables.setValue(Number(newVariableNo), 0);
    }

    function createAlertMessageWindowByInitilize(thisObj) {
        thisObj._alertMessageWindow = new Window_Common_Message_Window();
        thisObj._alertMessageWindow.opacity = 0;
        //thisObj._alertMessageWindow.close();
        thisObj._alertMessageWindow.forcedClose();
    }

    function addAlertMessageWindow(thisObj) {
        thisObj.addWindow(thisObj._alertMessageWindow);
        thisObj._alertMessageWindow.opacity = 255;
    }

    function createAlertMessageWindow(thisObj) {
        thisObj._alertMessageWindow = new Window_Common_Message_Window();
        thisObj._alertMessageWindow.opacity = 0;
        thisObj.addWindow(thisObj._alertMessageWindow);
        thisObj._alertMessageWindow.close();
        thisObj._alertMessageWindow.opacity = 255;
    }

    function getAlertMessageWindow(thisObj) {
        return thisObj._alertMessageWindow;
    }

    function openAlertMessageWindow(thisObj) {
        if (thisObj._alertMessageWindow && thisObj._alertMessageWindow.isClosed()) {
            thisObj._alertMessageWindow.open();
        }
    }

    function closeAlertMessageWindow(thisObj) {
        if (thisObj._alertMessageWindow && !thisObj._alertMessageWindow.isClosed()) {
            thisObj._alertMessageWindow.close();
        }
    }

    function isActiveAlertMessageWindow(thisObj) {
        if (thisObj._alertMessageWindow) {
            return thisObj._alertMessageWindow.isActive();
        }
        return false;
    }

    function isInvalidFastTravel() {
        if ($dataMap.note != "" && $dataMap.note.indexOf("<DOBBY_NOT_FASTTRAVEL>") != -1) {
            return true;
        }
        return false;
    }

    //===================================================================
    // クエスト入力項目　[淫乱Lvによってクエスト一覧に、表示する or しない]
    //===================================================================
    // クエストシステムの一覧に表示するかしないかを判断する処理
    // 淫乱値が上がって、受けられなくなったものが表示されなくなる仕様
    function isPossibleQuestByNasty(questId) {
        var returnFlag = true;
        let actorName = whoseAdultQuest(questId);

        switch (questId) {

            // 淫乱レベル1まで
            case 20: //高級ワインの配送
            case 21: //汚れた手
            case 22: //積み忘れの手紙
            case 23: //配達員の息抜き
            case 47: //小悪党の調理人
            case 48: //悪たれの虚勢
            case 49: //家畜の行方
            case 50: //情報屋の誘い
            case 51: //取り置きのクリスタル
            case 52: //魔法使いのくち
            case 53: //人食い熊の討伐
            case 54: //狩人の楽しみ
            case 55: //強情な情報屋
            case 56: //雄牛の秘密
            case 57: //夜盗苔の回収
            case 58: //怒れる男
                returnFlag = getActorsNastyLevel(actorName) === 1 && !getActorIsNotVirgin(actorName); //処女
                break;

            // 淫乱レベル2でなおかつ処女の場合まで
            case 70: //涙のしずく
                returnFlag = (1 <= getActorsNastyLevel(actorName) && getActorsNastyLevel(actorName) <= 2) && (!getActorIsNotVirgin(actorName));
                break;
            case 71: //最高の一杯
                returnFlag = (1 <= getActorsNastyLevel(actorName) && getActorsNastyLevel(actorName) <= 2) && (!getActorIsNotVirgin(actorName));
                break;
            case 72: //幸せのレシピ
                returnFlag = (1 <= getActorsNastyLevel(actorName) && getActorsNastyLevel(actorName) <= 2) && (!getActorIsNotVirgin(actorName));
                break;
            case 73: //愚者の天秤
                returnFlag = (1 <= getActorsNastyLevel(actorName) && getActorsNastyLevel(actorName) <= 2) && (!getActorIsNotVirgin(actorName));
                break;

            // 淫乱レベル2の場合
            case 75: //届かない荷物
            case 76: //炭鉱夫の誘引
            case 77: //巨大蛇の討伐
            case 78: //荒ぶる巨大蛇
            case 79: //偏在する蜘蛛
            case 80: //つかの間の休息
            case 81: //下心のある善意
            case 82: //善意の発散
                returnFlag = (1 <= getActorsNastyLevel(actorName) && getActorsNastyLevel(actorName) <= 2);
                break;

            // 淫乱レベル3の場合
            case 99:  //森の暴れん坊
            case 100: //野生児の誘い
            case 105: //憂鬱な錬金術士
            case 106: //疑心暗鬼な錬金術士
            case 125: //悩める薬師
            case 126: //無茶な注文
            case 136: //魔法の鏡
            case 137: //鏡の代わり
            case 144: //売春島の捕食者
            case 145: //放たれた獣
            case 148: //二度目の敗北
            case 149: //勝てない相手
            case 150: //恋の面影
            case 151: //その顔がみたいから
            case 152: //原始の宴
            case 153: //自然に帰れ
            case 154: //聖職者たちの秘密
            case 155: //悪魔と見る夢
            case 156: //売春島の幽霊
            case 176: //バリエ衛兵の体裁
            case 177: //気づかぬ悦び
            case 180: //出来心と下心
            case 181: //心雨
            case 186: //小生意気な魔法使い
            case 192: //太陽の王子
            case 206: //浜辺の誘惑
            case 207: //裏切りの舌
                returnFlag = (1 <= getActorsNastyLevel(actorName) && getActorsNastyLevel(actorName) <= 3);
                break;

            // 淫乱レベル4の場合
            case 143:  //少年の日の思い出
            case 163:  //強き心
            case 164:  //切ない心
            case 169:  //裏料理会の影
            case 170:  //美食家の愉しみ
            case 171:  //激突！ 裏料理会
            case 178:  //危険な遊び
            case 179:  //耽溺
            case 182:  //巨大な魚影
            case 183:  //湖で見つけた理想
            case 184:  //孤独な戦い
            case 185:  //夜浜の獣
            case 187:  //悩める兵士たち
            case 188:  //無謀な注文
            case 190:  //麗しき女神たち
            case 191:  //吊るされた魔術士
            case 193:  //華麗なるギャンブラー
            case 194:  //時間稼ぎ
            case 200:  //怪盗の背中
            case 201:  //月下の散歩
            case 202:  //ふたりの獣
            case 203:  //リピ村の復興
            case 204:  //メイドと御主人様
            case 205:  //神聖娼婦
            case 208:  //弱者の施し
            case 209:  //優しい廃退
            case 210:  //盗賊の誇り
            case 212:  //優しい魔法
            case 213:  //最低の一杯
            case 214:  //悪魔の取り分
                returnFlag = (1 <= getActorsNastyLevel(actorName) && getActorsNastyLevel(actorName) <= 4);
                break;

            case 107:  //愚者の魔導書
                returnFlag = (getActorsNastyLevel(actorName) >= 3);
                break;
        }
        return returnFlag;
    }

    function whoseAdultQuest(questId) {
        if (isClaireQuest(questId)) return "Claire"
        if (isNoraQuest(questId)) return "Nora"
        if (isRelmQuest(questId)) return "Relm"
        if (isSophiaQuest(questId)) return "Sophia"
    }

    function isClaireQuest(questId) {
        const ids = [
            20, 21, 39, 49, 50, 73, 77, 78, 105, 106, 148, 149, 163, 164, 169, 170, 176, 177, 180, 181, 182, 183, 203, 204
        ];
        return ids.includes(questId);
    }

    function isNoraQuest(questId) {
        const ids = [
            22, 23, 40, 57, 58, 72, 75, 76, 99, 100, 136, 137, 143, 144, 145, 156, 171, 184, 185, 200, 201, 210
        ];
        return ids.includes(questId);
    }

    function isRelmQuest(questId) {
        const ids = [
            41, 51, 52, 53, 54, 70, 79, 80, 107, 125, 126, 152, 153, 178, 179, 186, 187, 188, 191, 202, 212
        ];
        return ids.includes(questId);
    }

    function isSophiaQuest(questId) {
        const ids = [
            42, 47, 48, 55, 56, 71, 81, 82, 150, 151, 154, 155, 190, 192, 193, 205, 206, 207, 208, 209, 213, 214
        ];
        return ids.includes(questId);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // 反復クエスト(1/2)
    ///////////////////////////////////////////////////////////////////////////////

    //===================================================================
    // クエスト入力項目　
    //===================================================================
    // 反復系条件を入れる場合の処理
    // 反復系クエストを追加する場合は、これに追加1(1/2)
    function isSpecialConditionLoop(questId) {
        const ids = [
            21, 23, 34, 48, 50, 52, 54, 56, 58, 76, 78, 80, 82, 88, 89, 100, 106, 126, 137, 145, 149, 151, 153, 155, 177, 179, 181, 183, 185, 188, 194, 201, 204, 209, 214
        ];
        return ids.includes(questId);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // 反復クエスト(2/2)
    ///////////////////////////////////////////////////////////////////////////////

    //===================================================================
    // クエスト入力項目　
    //===================================================================
    // 反復系条件を入れる場合の処理
    // 反復系クエストを追加する場合は、これに追加2(2/2)

    function isValidInvalidSpecialConditionLoop(questId, questData, orderded) {
        let retVal = false;
        let actorName = whoseAdultQuest(questId);

        let clair = getActorInfo(1);
        let relm = getActorInfo(2);
        let nora = getActorInfo(3);
        let sophia = getActorInfo(4);

        switch (questId) {

            //---------------------------------------------------------
            //クレア
            //---------------------------------------------------------

            case 21: //汚れた手
                retVal = isOrdereComplete(20) && getActorsNastyLevel(actorName) === 1 && !getClaireIsNotVirgin(); //処女
                break;
            case 50: //情報屋の誘い
                retVal = isOrdereComplete(49) && getActorsNastyLevel(actorName) === 1 && !getClaireIsNotVirgin(); //処女
                break;
            case 78: //荒ぶる巨大蛇
                retVal = isOrdereComplete(SD_QUESTSYSTEM_QUESTID_KYODAIHEBINOTOUBATSU) && getActorsNastyLevel(actorName) === 2 && clair.hasSkill(905); //湧き立つ色香
                break;
            case 106: //疑心暗鬼な錬金術士
                retVal = isOrdereComplete(105) && getActorsNastyLevel(actorName) === 3;
                break;
            case 149: //勝てない相手
                retVal = isOrdereComplete(148) && //二度目の敗北
                    getActorsNastyLevel(actorName) === 3 && clair.hasSkill(910); //被虐嗜好
                break;
            case 177: //気づかぬ悦び
                retVal = isOrdereComplete(176) && getActorsNastyLevel(actorName) === 3 && clair.hasSkill(911) && //手遊び
                    clair.hasSkill(913); //色目使い
                break;
            case 181: //心雨
                retVal = isOrdereComplete(180) && getActorsNastyLevel(actorName) === 3 && clair.hasSkill(903) && //艶のある髪
                    clair.hasSkill(912); //悩殺
                break;
            case 183: //湖で見つけた理想
                retVal = isOrdereComplete(182) && getActorsNastyLevel(actorName) === 4 && hasSkillAndCheckLevel("Clair", 909, 3) && //豊満な身体Lv3
                    hasSkillAndCheckLevel("Clair", 904, 2, true); //甘美な身体Lv2以上
                break;
            case 204: //メイドと御主人様
                retVal = isOrdereComplete(203) && getActorsNastyLevel(actorName) === 4 && hasSkillAndCheckLevel("Clair", 902, 3) && //感度良好Lv.3
                    hasSkillAndCheckLevel("Clair", 910, 2, true); //被虐嗜好Lv2以上
                break;

            //---------------------------------------------------------
            //リルム
            //---------------------------------------------------------

            case 52: //魔法使いのくち
                retVal = isOrdereComplete(51) && getActorsNastyLevel(actorName) === 1 && !getRelmIsNotVirgin(); //処女
                break;
            case 54: //狩人の楽しみ
                retVal = isOrdereComplete(53) && getActorsNastyLevel(actorName) === 1 && !getRelmIsNotVirgin(); //処女
                break;
            case 80: //つかの間の休息
                retVal = isOrdereComplete(SD_QUESTSYSTEM_QUESTID_HENZAISURUKUMO) && getActorsNastyLevel(actorName) === 2 && relm.hasSkill(946); //切ない心
                break;
            case 126: //無茶な注文
                retVal = isOrdereComplete(125) && //悩める薬師
                    getActorsNastyLevel(actorName) === 3;
                break;

            case 153: //自然に帰れ
                retVal = isOrdereComplete(152) && //原始の宴
                    getActorsNastyLevel(actorName) === 3 && relm.hasSkill(944); //悪知恵
                break;
            case 179: //耽溺
                retVal = isOrdereComplete(178) && //危険な遊び
                    getActorsNastyLevel(actorName) === 4 && hasSkillAndCheckLevel("relm", 955, 3) && //妖艶な蕾Lv3
                    hasSkillAndCheckLevel("relm", 950, 3); //淫靡な知識Lv3
                break;
            case 188: //無謀な注文
                retVal = isOrdereComplete(187) && //悩める兵士たち
                    getActorsNastyLevel(actorName) === 4 && hasSkillAndCheckLevel("relm", 954, 3) && //露出狂Lv3
                    hasSkillAndCheckLevel("relm", 947, 3) && //ひとり遊びLv3
                    checkAaaSkillLv("hakken", 4);    //発見Lv4
                break;

            //---------------------------------------------------------
            //ノラ
            //---------------------------------------------------------

            case 23: //積み忘れの手紙
                retVal = isOrdereComplete(22) && getActorsNastyLevel(actorName) === 1 && !getNoraIsNotVirgin(); //処女
                break;
            case 58: //怒れる男
                retVal = isOrdereComplete(57) && getActorsNastyLevel(actorName) === 1 && !getNoraIsNotVirgin(); //処女
                break;
            case 76: //炭鉱夫の誘引
                retVal = isOrdereComplete(SD_QUESTSYSTEM_QUESTID_TODOKANAINIMOTSU) && getActorsNastyLevel(actorName) === 2 && nora.hasSkill(936); //蜘蛛の糸
                break;
            case 137: //鏡の代わり
                retVal = isOrdereComplete(136) && //魔法の鏡
                    getActorsNastyLevel(actorName) === 3 && nora.hasSkill(932); //欲望の火
                break;

            case 145: //放たれた獣
                retVal = isOrdereComplete(144) && //売春島の捕食者
                    getActorsNastyLevel(actorName) === 3 && nora.hasSkill(926); //舌舐めずり
                break;
            case 185: //夜浜の獣
                retVal = isOrdereComplete(184) && //孤独な戦い
                    getActorsNastyLevel(actorName) === 4 && hasSkillAndCheckLevel("nora", 932, 3) && //欲望の火Lv3
                    hasSkillAndCheckLevel("nora", 936, 2, true); //蜘蛛の糸Lv2以上
                break;
            case 201: //月下の散歩
                retVal = isOrdereComplete(200) && //怪盗の背中
                    getActorsNastyLevel(actorName) === 4 && hasSkillAndCheckLevel("nora", 925, 3) && //夜の蝶Lv3
                    hasSkillAndCheckLevel("nora", 928, 1, true);//フェロモンLv1以上
                break;

            //---------------------------------------------------------
            //ソフィア
            //---------------------------------------------------------

            case 48: //悪たれの虚勢
                retVal = isOrdereComplete(47) && getActorsNastyLevel(actorName) === 1 && !getSophiaIsNotVirgin(); //処女
                break;
            case 56: //雄牛の秘密
                retVal = isOrdereComplete(55) && getActorsNastyLevel(actorName) === 1 && !getSophiaIsNotVirgin(); //処女
                break;
            case 82: //善意の発散
                retVal = isOrdereComplete(SD_QUESTSYSTEM_QUESTID_SHITAGOKORONOARUZENI) && getActorsNastyLevel(actorName) === 2 && sophia.hasSkill(968); //毒花
                break;
            case 151: //その顔がみたいから
                retVal = isOrdereComplete(150) && //恋の面影
                    getActorsNastyLevel(actorName) === 3 && sophia.hasSkill(962); //歪な愛
                break;
            case 155: //悪魔と見る夢
                retVal = isOrdereComplete(154) && //聖職者たちの秘密
                    getActorsNastyLevel(actorName) === 3 && sophia.hasSkill(970); //大人の色気
                break;
            case 194: //時間稼ぎ
                retVal = isOrdereComplete(193) && //華麗なるギャンブラー
                    getActorsNastyLevel(actorName) === 4 && hasSkillAndCheckLevel("sophia", 975, 3) && //手練手管Lv3
                    hasSkillAndCheckLevel("sophia", 961, 3) && //魔性の肉体Lv3
                    checkAaaSkillLv("kyoukatsu", 4);
                break;
            case 209: //優しい廃退
                retVal = isOrdereComplete(208) && //弱者の施し
                    getActorsNastyLevel(actorName) === 4 && hasSkillAndCheckLevel("sophia", 963, 2, true) && //覚めない悪夢Lv2以上
                    hasSkillAndCheckLevel("sophia", 964, 3); //暗黒の記憶Lv3
                break;
            case 214: //悪魔の取り分
                retVal = isOrdereComplete(213) && //最低の一杯
                    getActorsNastyLevel(actorName) === 4 && hasSkillAndCheckLevel("sophia", 972, 1, true) && //駆けつけ一杯Lv1以上
                    hasSkillAndCheckLevel("sophia", 971, 2, true);//酩酊Lv2以上
                break;

            //---------------------------------------------------------
            //アダルトなし
            //---------------------------------------------------------

            case 34: //古代の遺跡調査
                retVal = isOrdereComplete(12); //アッロス洞窟再調査
                break;

        }
        if (retVal) {
            if (orderded === QUEST_REPORT_UNORDERED) orderded = QUEST_REPORT_UNORDERED; //表示して受注できるようにする
            if (orderded === QUEST_REPORT_UNORDERED_NEW) orderded = questvalidOrderedNotNewByQuestId(questId); //表示して受注できるようにする
            if (orderded === QUEST_REPORT_UNORDERED_DISP) orderded = questvalidOrderedNewByQuestId(questId); //表示して受注できるようにする(NEW付き)
            if (orderded === QUEST_REPORT_UNORDERED_NOTDISP) orderded = questvalidOrderedNewByQuestId(questId); //表示して受注できるようにする(NEW付き)
        }
        return orderded;
    }

    //===================================================================
    // クエスト入力項目
    //===================================================================
    // とあるクエストをクリアした時に、初めてクエストの解放状況を変更するための条件
    // ここがtrueにならないクエストはそもそもクエストの解放状況を操作できない
    function isValidInvalidTargetQuest(questId, orderded) {
        let returnFlag;
        if (isDisplayFromBeginning(questId)) {
            returnFlag = true;
        } else {
            returnFlag = isDisplayFromBeginningAndStoryFlagQuest(questId, orderded);
        }

        switch (questId) {

            case 27: //静かな集落
                returnFlag = isOrdereComplete(24) && //狼の群れ
                    isOrdereComplete(25) && //カサロ浴場の大掃除
                    isOrdereComplete(26); //港のある街
                break;
            case 33: //輸送ルートを確保せよ
                returnFlag = isOrdereComplete(32); //イクトのお見舞い
                break;
            case 34: //古代の遺跡調査
                returnFlag = isOrdereComplete(12); //アッロス洞窟再調査
                break;
            case 38: //ナイフの入れ墨を持つ男
                returnFlag = isOrdereComplete(37); //大岩の城の魔女
                break;
            case 39: //女戦士の踊り子
            case 40: //盗賊の踊り子
            case 41: //魔法使いの踊り子
            case 42: //僧侶の踊り子
                returnFlag = isOrdereComplete(38); //ナイフの入れ墨を持つ男
                break;
            case 70: //涙のしずく
                returnFlag = isOrdereComplete(17); //僧侶ソフィアからの依頼
                break;
            case 71: //最高の一杯
                returnFlag = isOrdereComplete(38); //ナイフの入れ墨を持つ男
                break;
            case 74: //ドクロの海
                returnFlag = isOrdereComplete(26); //港のある街
                break;
            case 75: //届かない荷物
                returnFlag = isOrdereComplete(72); //幸せのレシピ
                break;
            case 83: //悪石の魔法使い
            case 85: //放蕩貴族からの依頼
                returnFlag = isOrdereComplete(68); //オーガ討伐
                break;
            case 84: //栄光の王冠
                returnFlag = isOrdereComplete(68);  //オーガ討伐
                break;
            case 87: //涙の氾濫
                returnFlag = isOrdereComplete(67); //帝国軍から依頼
                break;
            case 88: //わんぱく少女の冒険
                returnFlag = isOrdereComplete(85) && //放蕩貴族からの依頼
                    isOrdereComplete(87); //涙の氾濫
                break;
            case 89: //ラキオ遺跡の調査
                returnFlag = isOrdereComplete(88); //わんぱく少女の冒険
                break;
            case 98: //クリスタル倉庫の整理
                returnFlag = isOrdereComplete(35); //クリスタルの輸送
                break;
            case 108: //骸骨の船
                returnFlag = isOrdereComplete(29) && //黒い粉
                    isOrdereComplete(74); //ドクロの海
                break;
            case 114: //永遠の星
                returnFlag = isOrdereComplete(65) && //声の部屋の秘密
                    isOrdereComplete(109); //再会
                break;
            case 116: //貴族オリクトからの提案
                returnFlag = isOrdereComplete(115); //永久の正方
                break;
            case 117: //不滅の真円
                returnFlag = isOrdereComplete(116); //貴族オリクトからの提案
                break;
            case 119: //三女神の巫女
                returnFlag = isOrdereComplete(110) && //憩いの場所を取り戻せ
                    isOrdereComplete(113) && //エマ盗賊団の行方
                    isOrdereComplete(112); //アークメイジへの嘆願
                break;
            case 120: //我らの新しい家
                returnFlag = isOrdereComplete(15) && //英雄の歌
                    isOrdereComplete(119); //三女神の巫女
                break;
            case 121: //閉じた瞳
                returnFlag = isOrdereComplete(119); //三女神の巫女
                break;
            case 122: //三本足の鷹
                returnFlag = isOrdereComplete(119); //三女神の巫女
                break;
            case 123: //試験官クレア
                returnFlag = isOrdereComplete(120) && //我らの新しい家
                    isOrdereComplete(121) && //閉じた瞳
                    isOrdereComplete(122); //三本足の鷹
                break;
            case 124: //悪魔の囁き
                returnFlag = isOrdereComplete(123); //試験官クレア
                break;
            case 126: //無茶な注文
                returnFlag = isOrdereComplete(125); //悩める薬師
                break;
            case 127: //漆黒の正体
                returnFlag = isOrdereComplete(123); //試験官クレア
                break;
            case 128: //エマ盗賊団包囲網
                returnFlag = isOrdereComplete(124) && //悪魔の囁き
                    isOrdereComplete(127); //漆黒の正体
                break;
            case 129: //夢の終わり
                returnFlag = isOrdereComplete(128); //エマ盗賊団包囲網
                break;
            case 130: //訳ありのオークション
                returnFlag = isOrdereComplete(83) && //悪石の魔法使い
                    isOrdereComplete(123); //試験官クレア
                break;
            case 131: //ドラゴンを宿す者
                returnFlag = isOrdereComplete(129); //夢の終わり
                break;
            case 133: //クリスタルの中の助手
                returnFlag = isOrdereComplete(129) && //夢の終わり
                    isOrdereComplete(130); //訳ありのオークション
                break;
            case 134: //王への道
                returnFlag = isOrdereComplete(131); //ドラゴンを宿す者
                break;
            case 136: //魔法の鏡
                returnFlag = isOrdereComplete(111); //古代への情熱
                break;
            case 137: //鏡の代わり
                returnFlag = isOrdereComplete(136); //魔法の鏡
                break;
            case 138: //新たなる巫女
                returnFlag = isOrdereComplete(86) && //鉄仮面の下
                    isOrdereComplete(118); //強く儚いものたち
                break;
            case 139: //黒薔薇の棘
                returnFlag = isOrdereComplete(90) && //ドラゴンの爪
                    isOrdereComplete(38) && //ナイフの入れ墨を持つ男
                    isOrdereComplete(108); //骸骨の船
                break;
            case 141: //立身出世の夢
                returnFlag = isOrdereComplete(134); //王への道
                break;
            case 142: //生意気な少年
                returnFlag = isOrdereComplete(113); //エマ盗賊団の行方
                break;
            case 143: //少年の日の思い出
                returnFlag = isOrdereComplete(142); //生意気な少年
                break;
            case 144: //売春島の捕食者
                returnFlag = isOrdereComplete(139); //黒薔薇の棘
                break;
            case 145: //放たれた獣
                returnFlag = isOrdereComplete(144); //売春島の捕食者
                break;
            case 146: //消えた商人
                returnFlag = isOrdereComplete(120); //我らの新しい家
                break;
            case 147: //研究者の長い夜
                returnFlag = isOrdereComplete(119); //三女神の巫女
                break;
            case 148: //二度目の敗北
                returnFlag = isOrdereComplete(139); //黒薔薇の棘
                break;
            case 150: //恋の面影
                returnFlag = isOrdereComplete(139); //黒薔薇の棘
                break;
            case 152: //原始の宴
                returnFlag = isOrdereComplete(139); //黒薔薇の棘
                break;
            case 154: //聖職者たちの秘密
                returnFlag = isOrdereComplete(139); //黒薔薇の棘
                break;
            case 156: //売春島の幽霊
                returnFlag = isOrdereComplete(139); //黒薔薇の棘
                break;
            case 157: //最後の怪盗
                returnFlag = isOrdereComplete(110); //憩いの場所を取り戻せ
                break;
            case 158: //姉妹像の返却
                returnFlag = isOrdereComplete(157); //最後の怪盗
                break;
            case 159: //1枚のコイン
                returnFlag = isOrdereComplete(158); //姉妹像の返却
                break;
            case 160: //オークたちの秘宝
                returnFlag = isOrdereComplete(159); //1枚のコイン
                break;
            case 161: //怪盗夜を往く
                returnFlag = isOrdereComplete(160); //オークたちの秘宝
                break;
            case 162: //弱き心
                returnFlag = isOrdereComplete(84); //栄光の王冠
                break;
            case 163: //強き心
                returnFlag = isOrdereComplete(128) && //エマ盗賊団の行方
                    isOrdereComplete(162); //弱き心
                break;
            case 164: //切ない心
                returnFlag = isOrdereComplete(163); //強き心
                break;
            case 165: //アクティナの巫女からの依頼
                returnFlag = isOrdereComplete(119); //三女神の巫女
                break;
            case 166: //イミセリノスの巫女からの依頼
                returnFlag = isOrdereComplete(69) && //バルク団ゴートからの誘い
                    isOrdereComplete(165); //アクティナの巫女からの依頼
                break;
            case 168: //消えるもの残るもの
                returnFlag = isOrdereComplete(167); //イミセリノスの栄光
                break;
            case 169: //裏料理会の影
                returnFlag = isOrdereComplete(74); //ドクロの海
                break;
            case 170: //美食家の愉しみ
                returnFlag = isOrdereComplete(169); //裏料理会の影
                break;
            case 171: //激突！　裏料理会
                returnFlag = isOrdereComplete(140) && //赤い珊瑚礁
                    isOrdereComplete(169); //裏料理会の影
                break;
            case 172: //奇妙な友情
                returnFlag = isOrdereComplete(135); //壊された天秤
                break;
            case 173: //盤上から戦場へ
                returnFlag = isOrdereComplete(172); //奇妙な友情
                break;
            case 174: //ホワイトブリムを外して
                returnFlag = isOrdereComplete(173); //盤上から戦場へ
                break;
            case 175: //牙をむく疾風
                returnFlag = isOrdereComplete(174); //ホワイトブリムを外して
                break;
            case 176: //バリエ衛兵の体裁
                returnFlag = isOrdereComplete(66); //黒い依頼書
                break;
            case 178: //危険な遊び
                returnFlag = isOrdereComplete(129) && //夢の終わり
                    isOrdereComplete(130); //訳ありのオークション
                break;
            case 182: //巨大な魚影
                returnFlag = isOrdereComplete(140); //赤い珊瑚礁
                break;
            case 184: //孤独な戦い
                returnFlag = isOrdereComplete(140); //赤い珊瑚礁
                break;
            case 186: //小生意気な魔法使い
                returnFlag = isOrdereComplete(140); //赤い珊瑚礁
                break;
            case 187: //悩める兵士たち
                returnFlag = isOrdereComplete(68); //オーガ討伐
                break;
            case 189: //異形の宝玉
                returnFlag = isOrdereComplete(146); //消えた商人
                break;
            case 190: //麗しき女神たち
                returnFlag = isOrdereComplete(158); //消えた商人
                break;
            case 191: //吊るされた魔術士
                returnFlag = isOrdereComplete(112); //アークメイジへの嘆願
                break;
            // case 192: //太陽の王子
            //     returnFlag = isOrdereComplete(112); //アークメイジへの嘆願
            //     break;
            case 193: //華麗なるギャンブラー
                returnFlag = isOrdereComplete(86) && //鉄仮面の下
                    isOrdereComplete(146); //消えた商人
                break;
            case 195: //形見の指輪
                returnFlag = isOrdereComplete(85); //放蕩貴族からの依頼
                break;
            case 196: //大地に注がれた血
                returnFlag = isOrdereComplete(127) && //漆黒の正体
                    isOrdereComplete(195); //形見の指輪
                break;
            case 197: //デイレーの短刀
                returnFlag = isOrdereComplete(128); //エマ盗賊団の行方
                break;
            case 198: //デイレーの巫女からの依頼
                returnFlag = isOrdereComplete(166) && //デイレーの短刀
                    isOrdereComplete(197); //デイレーの短刀
                break;
            case 199: //海は変わらない
                returnFlag = isOrdereComplete(131) && //ドラゴンを宿す者
                    isOrdereComplete(198); //誰が為の祈り
                break;
            case 200: //怪盗の背中
                returnFlag = isOrdereComplete(161) && //怪盗夜を往く
                    isOrdereComplete(199); //海は変わらない
                break;
            case 202: //ふたりの獣
                returnFlag = isOrdereComplete(199); //海は変わらない
                break;
            case 203: //リピ村の復興
                returnFlag = isOrdereComplete(147) && //研究者の長い夜
                    isOrdereComplete(165); //アクティナの巫女からの依頼
                break;
            case 205: //神聖娼婦
                returnFlag = isOrdereComplete(168); //消えるもの残るもの
                break;
            case 206: //浜辺の誘惑
                returnFlag = isOrdereComplete(139); //黒薔薇の棘
                break;
            case 207: //裏切りの舌
                returnFlag = isOrdereComplete(110); //憩いの場所を取り戻せ
                break;
            case 208: //弱者の施し
                returnFlag = isOrdereComplete(215); //決戦！ ロパロ略奪団
                break;
            case 210: //盗賊の誇り
                returnFlag = isOrdereComplete(17); //僧侶ソフィアからの依頼
                break;
            case 211: //優しい嘘
                returnFlag = isOrdereComplete(122); //三本足の鷹
                break;
            case 212: //優しい魔法
                returnFlag = isOrdereComplete(211); //優しい嘘
                break;
            case 213: //最低の一杯
                returnFlag = isOrdereComplete(120); //我らの新しい家
                break;
            case 215: //決戦！ ロパロ略奪団
                returnFlag = isOrdereComplete(131) && //ドラゴンを宿す者
                    isOrdereComplete(168); //消えるもの残るもの
                break;
            case 216: //勇者がいた場所
                returnFlag = isOrdereComplete(132); //黄金の針
                break;
            case 218: //武器職人の夢
                returnFlag = $gameSwitches.value(401) &&   //401:通常END初回クリア
                    isOrdereComplete(216) && //勇者がいた場所
                    isOrdereComplete(222); //偉大なる未亡人
                break;
            case 219: //創設者の行方
                returnFlag = isOrdereComplete(168) && //消えるもの残るもの
                    isOrdereComplete(175); //牙をむく疾風
                break;
            case 220: //見果てぬ夢
                returnFlag = isOrdereComplete(219); //創設者の行方
                break;
            case 221: //秘密のレシピ
                returnFlag = isOrdereComplete(74) && //ドクロの海
                    isOrdereComplete(173) && //盤上から戦場へ
                    isOrdereComplete(224); //復讐者たちの黄昏
                break;
            case 222: //偉大なる未亡人
                returnFlag = $gameSwitches.value(401) &&   //401:通常END初回クリア
                    isOrdereComplete(221); //秘密のレシピ
                break;
            case 223: //黄昏の復讐者
                returnFlag = isOrdereComplete(172); //奇妙な友情
                break;
            case 224: //復讐者たちの黄昏
                returnFlag = isOrdereComplete(223); //黄昏の復讐者
                break;
            case 231: //玉座に座る者A
                returnFlag = isOrdereComplete(175); //牙をむく疾風
                break;
            case 232: //玉座に座る者B
                const flags = [
                    isOrdereComplete(118), //強く儚いものたち
                    isOrdereComplete(138), //新たなる巫女
                    isOrdereComplete(161), //怪盗夜を往く
                    isOrdereComplete(168), //消えるもの残るもの
                    isOrdereComplete(175), //牙をむく疾風
                    isOrdereComplete(199), //海は変わらない
                    isOrdereComplete(215), //決戦！ロパロ略奪団
                    isOrdereComplete(218), //武器職人の夢
                    isOrdereComplete(220), //見果てぬ夢
                    isOrdereComplete(222), //偉大なる未亡人
                    isOrdereComplete(224), //復讐者たちの黄昏
                ];
                if (!flags.includes(false)) returnFlag = true;
                if (!$gameSwitches.value(401)) returnFlag = false;
                break;
        }
        return returnFlag && isNotClearAndNotProgressQuest(questId);
    }

    Alt_Func.isShinFlagOn = function () {
        const flags = [
            isOrdereComplete(118), //強く儚いものたち
            isOrdereComplete(138), //新たなる巫女
            isOrdereComplete(161), //怪盗夜を往く
            isOrdereComplete(168), //消えるもの残るもの
            isOrdereComplete(175), //牙をむく疾風
            isOrdereComplete(199), //海は変わらない
            isOrdereComplete(215), //決戦！ロパロ略奪団
            isOrdereComplete(218), //武器職人の夢
            isOrdereComplete(220), //見果てぬ夢
            isOrdereComplete(222), //偉大なる未亡人
            isOrdereComplete(224), //復讐者たちの黄昏
        ];
        console.log(!flags.includes(false));
        if (!flags.includes(false)) return true;
    }

    function isNotClearAndNotProgressQuest(questId) {
        return (!isOrdereComplete(questId) && !isOrderedQuest(questId));
    }

    function isDisplayFromBeginning(questId) {
        const ids = [
            4, 5, 7, 8, 10, 14, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 33, 37, 38, 39, 40, 41, 42, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 65, 67, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 111, 125, 126, 136, 137, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 169, 170, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 191, 192, 202, 205, 206, 210, 221
        ];
        return ids.includes(questId);
    }

    //未組込のQuest
    function isUnsetQuest(questId) {
        const ids = [];
        return false;
        // return ids.includes(questId);
    }

    //===================================================================
    // クエスト入力項目
    //===================================================================
    // 踊り子系のようなクエスト（一度クエストが受注不可能になるけどもう一度受注可能になるようなもの）
    // の場合はこちら
    function isValidInvalidQuest(questId) {
        var returnFlag = false;
        switch (questId) {
            case 39: //女戦士の踊り子
            case 40: //盗賊の踊り子
            case 41: //魔法使いの踊り子
            case 42: //僧侶の踊り子
                returnFlag = getActorsNastyLevel(whoseAdultQuest(questId)) === 1 || getActorsNastyLevel(whoseAdultQuest(questId)) === 2 || getActorsNastyLevel(whoseAdultQuest(questId)) === 4;
                break;
        }
        return returnFlag;
    }

    function hasSkillAndCheckLevel(actor, skillId, skillLv, over) {
        switch (actor) {
            case "Clair":
            case "clair":
                if (!getActorInfo(1).hasSkill(skillId)) return false;
                if (!!over) {
                    return $gameVariables.value(skillId + 3900) >= skillLv;
                } else {
                    return $gameVariables.value(skillId + 3900) === skillLv;
                }
            case "Nora":
            case "nora":
                if (!getActorInfo(3).hasSkill(skillId)) return false;
                if (!!over) {
                    return $gameVariables.value(skillId + 3899) >= skillLv;
                } else {
                    return $gameVariables.value(skillId + 3899) === skillLv;
                }
            case "Relm":
            case "relm":
                if (!getActorInfo(2).hasSkill(skillId)) return false;
                if (!!over) {
                    return $gameVariables.value(skillId + 3898) >= skillLv;
                } else {
                    return $gameVariables.value(skillId + 3898) === skillLv;
                }
            case "Sophia":
            case "sophia":
                if (!getActorInfo(4).hasSkill(skillId)) return false;
                if (!!over) {
                    return $gameVariables.value(skillId + 3897) >= skillLv;
                } else {
                    return $gameVariables.value(skillId + 3897) === skillLv;
                }
        }
    }

    Alt_Func.hasAllSkillAndCheckLevel = function hasAllSkillAndCheckLevel() {
        for (let i = 4801; i <= 4872; i++) {
            if ($gameVariables.value(i) !== 3) {
                return false;
            }
        }
        return true;
    }

    //===================================================================
    // クエスト入力項目　
    //===================================================================
    // 性技スキルやAAA関連やアイテム所持等が条件になっている、反復を行わないアダルトクエスト

    function isValidInvalidNotLoopQuestAdultAndAAA(questId, orderded) {

        // 最初から表示されていて、イベント内にて手動でオープンするクエストを除外する
        if (isDisplayFromBeginningAndStoryFlagQuest(questId)) return false;

        let returnFlag = false;

        let clair = getActorInfo(1);
        let relm = getActorInfo(2);
        let nora = getActorInfo(3);
        let sophia = getActorInfo(4);

        let over = true;

        switch (questId) {

            //---------------------------------------------------------
            // クレア
            //---------------------------------------------------------

            // ------ [性技スキル] ------
            case 73: //愚者の天秤
                returnFlag = getClaireNastyLevel() === 2 && !getClaireIsNotVirgin() && //処女
                    clair.hasSkill(901) && //床上手
                    clair.hasSkill(909);   //豊満な身体
                break;
            case 77: //巨大蛇の討伐
                returnFlag = getClaireNastyLevel() === 2 && clair.hasSkill(905); //沸き立つ色香
                break;
            case 105: //憂鬱な錬金術士
                returnFlag = getClaireNastyLevel() === 3 && checkAaaSkillLv("zangeki", 3); //斬撃Lv3以上
                break;
            case 148: //二度目の敗北
                returnFlag = getClaireNastyLevel() === 3 && clair.hasSkill(910); //被虐嗜好
                break;
            case 163: //強き心
                returnFlag = getClaireNastyLevel() === 4 && hasSkillAndCheckLevel("Clair", 912, 2, over) && //悩殺Lv.2以上
                    hasSkillAndCheckLevel("Clair", 903, 3);         //艶のある髪Lv.3
                break;
            case 164: //切ない心
                returnFlag = getClaireNastyLevel() === 4 && hasSkillAndCheckLevel("Clair", 914, 3) && //甘い調べLv.3
                    hasSkillAndCheckLevel("Clair", 905, 3);   //沸き立つ色香Lv.3
                break;
            case 169: //裏料理会の影
                returnFlag = getClaireNastyLevel() === 4 && hasSkillAndCheckLevel("Clair", 913, 2, over) && //色目使いLv.2以上
                    hasSkillAndCheckLevel("Clair", 906, 3) &&  //妖艶な瞳Lv.3
                    $gameParty.hasItem($dataItems[536]); //"古代のコイン交換で匂い立つ魚醤を入手している
                break;
            case 170: //美食家の愉しみ
                returnFlag = getClaireNastyLevel() === 4 && hasSkillAndCheckLevel("Clair", 913, 2, over) && //色目使いLv.2以上
                    hasSkillAndCheckLevel("Clair", 906, 3);         //妖艶な瞳Lv.3
                break;
            case 176: //バリエ衛兵の体裁
                returnFlag = getClaireNastyLevel() === 3 && clair.hasSkill(911) && //手遊び
                    clair.hasSkill(913);   //色目使い
                break;
            case 180: //出来心と下心
                returnFlag = getClaireNastyLevel() === 3 && clair.hasSkill(903) && //艶のある髪
                    clair.hasSkill(912);   //悩殺
                break;
            case 182: //巨大な魚影
                returnFlag = getClaireNastyLevel() === 4 && hasSkillAndCheckLevel("Clair", 909, 3) && //豊満な身体Lv.3
                    hasSkillAndCheckLevel("Clair", 904, 3);   //甘美な身体Lv.3
                break;
            case 203: //リピ村の復興
                returnFlag = getClaireNastyLevel() === 4 && hasSkillAndCheckLevel("Clair", 902, 3) &&     //感度良好Lv.3
                    hasSkillAndCheckLevel("Clair", 910, 2, over); //被虐嗜好Lv.2以上
                break;

            // ------ [AAAスキル] ------
            case 103: //メイドの落とし物
                returnFlag = checkAaaSkillLv("zangeki", 2) && //斬撃Lv2以上
                    checkAaaSkillLv("hakken", 2);    //発見Lv2以上
                break;
            case 104: //貨物船の大掃除
                returnFlag = checkAaaSkillLv("zangeki", 2) && //斬撃Lv2以上
                    checkAaaSkillLv("kyuukaku", 2);  //嗅覚Lv2以上
                break;
            case 141: //立身出世の夢
                returnFlag = checkAaaSkillLv("kettou", 4);  //決闘Lv4
                break;
            case 162: //弱き心
                returnFlag = checkAaaSkillLv("kettou", 2); //決闘v2以上
                break;
            case 195: //形見の指輪
                returnFlag = checkAaaSkillLv("kettou", 2); //決闘v2以上
                break;
            case 196: //大地に注がれた血
                returnFlag = checkAaaSkillLv("hissatsu", 4);  //必殺Lv4
                break;

            // ------ その他の条件 ------
            case 65: //声の部屋の秘密
                returnFlag = ($gameActors.actor(1).level >= 5); //クレアLv5以上
                break;

            //---------------------------------------------------------
            // ノラ
            //---------------------------------------------------------

            // ------ [性技スキル] ------
            case 72: //幸せのレシピ
                returnFlag = getNoraNastyLevel() === 2 && !getNoraIsNotVirgin() && //処女
                    nora.hasSkill(371) && //嗅覚Lv2
                    nora.hasSkill(923) && //煩悩
                    nora.hasSkill(931);   //色好み
                break;
            case 75: //届かない荷物
                returnFlag = getNoraNastyLevel() === 2 && getNoraIsNotVirgin() && //非処女
                    nora.hasSkill(936); //蜘蛛の糸
                break;
            case 99: //森の暴れん坊
                returnFlag = getNoraNastyLevel() === 3 && nora.hasSkill(369); //怪力Lv3
                break;
            case 136: //魔法の鏡
                returnFlag = getNoraNastyLevel() === 3 && nora.hasSkill(932); //欲望の火
                break;
            case 143: //少年の日の思い出
                returnFlag = getNoraNastyLevel() === 4 && hasSkillAndCheckLevel("Nora", 921, 3) && //捕食者Lv.3
                    hasSkillAndCheckLevel("Nora", 920, 3);   //食指Lv.3
                break;
            case 144: //売春島の捕食者
                returnFlag = getNoraNastyLevel() === 3 && nora.hasSkill(926); //舌舐めずり
                break;
            case 156: //売春島の幽霊
                returnFlag = getNoraNastyLevel() === 3 && nora.hasSkill(922); //肉感的な身体
                break;
            case 171: //激突！裏料理会
                returnFlag = getNoraNastyLevel() === 4 && hasSkillAndCheckLevel("Nora", 926, 3) && //舌舐めずりLv.3
                    hasSkillAndCheckLevel("Nora", 929, 3) && //艶のある声Lv.3
                    hasSkillAndCheckLevel("Clair", 907, 3);   //性の扉Lv.3
                break;
            case 184: //孤独な戦い
                returnFlag = getNoraNastyLevel() === 4 && hasSkillAndCheckLevel("Nora", 932, 3) && //欲望の火Lv.3
                    hasSkillAndCheckLevel("Nora", 936, 2, over);   //蜘蛛の糸Lv.2以上
                break;
            case 200: //怪盗の背中
                returnFlag = getNoraNastyLevel() === 4 && hasSkillAndCheckLevel("Nora", 925, 3) && //夜の蝶Lv.3
                    hasSkillAndCheckLevel("Nora", 928, 1, over);   //フェロモンLv.1以上
                break;
            case 210: //盗賊の誇り
                returnFlag = getNoraNastyLevel() === 4 && hasSkillAndCheckLevel("Nora", 934, 3) && //悪女Lv.3
                    hasSkillAndCheckLevel("Nora", 924, 3) && //魔性の女Lv.3
                    checkAaaSkillLv("kaijou", 2) && //開錠Lv2以上
                    $gameParty.hasItem($dataItems[538]); //古代のコイン交換で悪魔ユアンのよだれ
                break;

            // ------ [AAAスキル] ------
            case 96: //井戸の中の怪物
            case 97: //倉庫の大ネズミ
                returnFlag = checkAaaSkillLv("kairiki", 2);  //嗅覚Lv2以上
                break;
            case 98: //クリスタル倉庫の整理
                returnFlag = checkAaaSkillLv("kairiki", 3);  //怪力Lv3以上
                break;
            case 159: //1枚のコイン
                returnFlag = checkAaaSkillLv("onmitsu", 2);  //隠密Lv2以上
                break;
            case 160: //オークたちの秘宝
                returnFlag = checkAaaSkillLv("onmitsu", 3);  //隠密Lv3以上
                break;
            case 161: //怪盗夜を往く
                returnFlag = checkAaaSkillLv("onmitsu", 4);  //隠密Lv4
                break;
            case 197: //デイレーの短刀
                returnFlag = checkAaaSkillLv("kyuukaku", 4);  //嗅覚Lv4
                break;
            case 199: //海は変わらない
                returnFlag = checkAaaSkillLv("kaijou", 4);  //開錠Lv4
                break;

            //---------------------------------------------------------
            // リルム
            //---------------------------------------------------------

            // ------ [性技スキル] ------
            case 70: //涙のしずく
                returnFlag = getRelmNastyLevel() === 2 && !getRelmIsNotVirgin() && //処女
                    relm.hasSkill(949) && //堕落者
                    relm.hasSkill(939);   //未熟な身体
                break;
            case 79: //偏在する蜘蛛
                returnFlag = getRelmNastyLevel() === 2 && relm.hasSkill(946); //切ない心
                break;
            case 107://愚者の魔導書
                returnFlag = getRelmNastyLevel() >= 3 && checkAaaSkillLv("hakken", 3) &&  //発見Lv3以上
                    checkAaaSkillLv("kaidoku", 3) && //解読Lv3以上
                    checkAaaSkillLv("zangeki", 3);   //斬撃Lv3以上
                break;
            case 125: //悩める薬師
                returnFlag = getRelmNastyLevel() === 3 && relm.hasSkill(954); //露出狂
                break;
            case 152: //原始の宴
                returnFlag = getRelmNastyLevel() === 3 && relm.hasSkill(944); //悪知恵
                break;
            case 178: //危険な遊び
                returnFlag = getRelmNastyLevel() === 4 && hasSkillAndCheckLevel("relm", 955, 3) && //妖艶な蕾Lv3
                    hasSkillAndCheckLevel("relm", 950, 3);   //淫靡な知識Lv3
                break;
            case 186: //小生意気な魔法使い
                returnFlag = getRelmNastyLevel() === 3 && relm.hasSkill(955) && //妖艶な蕾
                    relm.hasSkill(945); //メスガキ
                break;
            case 187: //悩める兵士たち
                returnFlag = getRelmNastyLevel() === 4 && hasSkillAndCheckLevel("relm", 954, 3) && //露出狂Lv3
                    hasSkillAndCheckLevel("relm", 947, 3);   //ひとり遊びLv3
                break;
            case 191: //吊るされた魔術士
                returnFlag = getRelmNastyLevel() === 4 && hasSkillAndCheckLevel("relm", 941, 3) && //扇情Lv3
                    hasSkillAndCheckLevel("relm", 940, 3) && //花盛りLv3
                    hasSkillAndCheckLevel("relm", 943, 2, over) && //上目遣いLv2以上
                    $gameParty.hasItem($dataArmors[496], true); //極東の礼装を所有している;
                break;
            case 202: //ふたりの獣
                returnFlag = getNoraNastyLevel() === 4 && getRelmNastyLevel() === 4 && hasSkillAndCheckLevel("nora", 935, 3) && //凄艶Lv3
                    hasSkillAndCheckLevel("relm", 949, 3) && //堕落者Lv3
                    hasSkillAndCheckLevel("relm", 942, 3);   //変質者Lv3
                break;
            case 212: //優しい魔法
                returnFlag = getRelmNastyLevel() === 4 && hasSkillAndCheckLevel("relm", 946, 3) && //切ない心Lv3
                    hasSkillAndCheckLevel("relm", 951, 3);   //甘い唇Lv3
                break;

            // ------ [AAAスキル] ------
            case 108: //骸骨の船
                returnFlag = checkAaaSkillLv("kaidoku", 2);  //解読Lv2
                break;
            case 114: //永遠の星
                returnFlag = checkAaaSkillLv("kaidoku", 2);  //解読Lv2
                break;
            case 115: //永久の正方
                returnFlag = checkAaaSkillLv("kaidoku", 3);  //解読Lv3
                break;
            case 117: //不滅の真円
                returnFlag = checkAaaSkillLv("kaidoku", 4);  //解読Lv4
                break;
            case 165: //アクティナの巫女からの依頼
                returnFlag = checkAaaSkillLv("kaidoku", 4);  //解読Lv4
                break;
            case 211: //優しい嘘
                returnFlag = checkAaaSkillLv("kaidoku", 3);  //解読Lv3以上
                break;
            case 216: //勇者がいた場所
                returnFlag = checkAaaSkillLv("idou", 4) &&   //移動Lv4
                    checkAaaSkillLv("kaidoku", 4);  //解読Lv4
                break;

            //---------------------------------------------------------
            // ソフィア
            //---------------------------------------------------------
            case 71: //最高の一杯
                returnFlag = getSophiaNastyLevel() === 2 && !getSophiaIsNotVirgin() && //処女
                    sophia.hasSkill(958) && //尽くす女
                    sophia.hasSkill(961);   //魔性の肉体
                break;
            case 81: //下心のある善意
                returnFlag = getSophiaNastyLevel() === 2 && sophia.hasSkill(968); //毒花
                break;
            case 150: //恋の面影
                returnFlag = getSophiaNastyLevel() === 3 && sophia.hasSkill(962); //歪な愛
                break;
            case 154: //聖職者たちの秘密
                returnFlag = getSophiaNastyLevel() === 3 && sophia.hasSkill(970); //歪な愛
                break;
            case 190: //麗しき女神たち
                returnFlag = getSophiaNastyLevel() === 4 && hasSkillAndCheckLevel("sophia", 960, 3) && //秘密の花園Lv3
                    hasSkillAndCheckLevel("sophia", 972, 3) && //駆けつけ一杯Lv3
                    getClaireNastyLevel() === 4 && hasSkillAndCheckLevel("clair", 915, 3); //秘めたる欲望Lv3
                break;
            case 192: //太陽の王子
                returnFlag = getSophiaNastyLevel() === 3 && sophia.hasSkill(965) && //恋は盲目Lv3
                    sophia.hasSkill(973) && //甘い罠Lv3
                    checkAaaSkillLv("kaidoku", 3) &&  //解読Lv3
                    $gameParty.hasItem($dataItems[539]); //バリエの古地図
                break;
            case 193: //華麗なるギャンブラー
                returnFlag = getSophiaNastyLevel() === 4 && hasSkillAndCheckLevel("sophia", 975, 3) && //手練手管Lv3
                    hasSkillAndCheckLevel("sophia", 961, 3) && //魔性の肉体Lv3
                    checkAaaSkillLv("kyoukatsu", 4);  //恐喝Lv4
                break;
            case 205: //神聖娼婦
                returnFlag = getSophiaNastyLevel() === 4 && hasSkillAndCheckLevel("sophia", 958, 3) && //尽くす女Lv3
                    hasSkillAndCheckLevel("sophia", 962, 3) && //歪な愛Lv3
                    checkAaaSkillLv("syukuhuku", 3);  //祝福Lv3
                break;
            case 206: //浜辺の誘惑
                returnFlag = getSophiaNastyLevel() === 3 && sophia.hasSkill(974) && //魅惑の身体
                    sophia.hasSkill(960) && //秘密の花園
                    checkAaaSkillLv("yuuwaku", 2);  //誘惑Lv2
                break;
            case 207: //裏切りの舌
                returnFlag = getSophiaNastyLevel() === 3 && sophia.hasSkill(964) && //暗黒の記憶
                    sophia.hasSkill(963); //覚めない悪夢
                break;
            case 208: //弱者の施し
                returnFlag = getSophiaNastyLevel() === 4 && hasSkillAndCheckLevel("sophia", 963, 2, over) && //覚めない悪夢Lv2以上
                    hasSkillAndCheckLevel("sophia", 964, 3); //暗黒の記憶Lv3
                break;
            case 213: //最低の一杯
                returnFlag = getSophiaNastyLevel() === 4 && hasSkillAndCheckLevel("sophia", 972, 1, over) && //駆けつけ一杯Lv1以上
                    hasSkillAndCheckLevel("sophia", 971, 2, over);   //酩酊Lv2以上
                break;

            // ------ [AAAスキル] ------
            case 166: //神聖娼婦
                returnFlag = checkAaaSkillLv("kitou", 4);  //祈祷Lv4
                break;
            case 215: //神聖娼婦
                returnFlag = checkAaaSkillLv("syukuhuku", 4);  //祝福Lv4
                break;

            //---------------------------------------------------------
            // その他
            //---------------------------------------------------------

            case 84: //栄光の王冠
                returnFlag = $gameParty.hasItem($dataItems[44]); //アトゥ将軍の推薦状を所有している
                break;
            case 86: //鉄仮面の下
                returnFlag = $gameSwitches.value(121); //ピズマ闘技場で団体戦上級をクリアしている
                break
            case 133: //クリスタルの中の助手
                returnFlag = relm.hasSkill(230) && //空虚+2
                    relm.hasSkill(247); //天頂孤
                break;
            case 189: //異形の宝玉
                returnFlag = isShopZaikoZERO('kodainocoin'); //古代のコインで交換可能なアイテムをすべて交換している
                break;
            case 218: //武器職人の夢
                returnFlag = $gameParty.hasItem($dataWeapons[111], true) &&   //匠の黒曜の大剣
                    $gameParty.hasItem($dataWeapons[211], true) &&   //匠の黒曜の大槍
                    $gameParty.hasItem($dataWeapons[311], true) &&   //魔法石の魔導書
                    $gameParty.hasItem($dataWeapons[411], true);     //魔法石の長杖
                break;

        }

        if (returnFlag && orderded === QUEST_REPORT_UNORDERED_DISP) questvalidOrderedNewByQuestId(questId)
        return returnFlag;
    }

    // 受注条件が他のクエストの解放のみのクエスト
    function isOnlyValidInvalidTargetQuest(questId, orderded) {
        const ids = [
            116, 120, 121, 122, 123, 124, 127, 129, 130, 131, 138, 139, 142, 146, 147, 157, 158, 168, 172, 173, 175, 198, 219, 220, 221, 222, 223, 224, 225, 232
        ];
        return ids.includes(questId);
    }

    // 最初から表示されていて、イベント内にて手動でオープンするタイプのクエスト
    function isDisplayFromBeginningAndStoryFlagQuest(questId, orderded) {
        const ids = [
            4, 5, 7, 8, 10, 14, 19, 24, 25, 26, 29, 30, 31, 37, 67, 83, 86, 111
        ];
        return ids.includes(questId) && orderded === QUEST_REPORT_UNORDERED_NEW;
    }

    // ボードに表示しないクエスト
    function isHideDisplayQuest(questId) {
        const ids = [
            1, 2, 3, 6, 9, 13, 17, 18, 28, 32, 35, 36, 59, 60, 61, 62, 63, 64, 68, 69, 90, 91, 92, 93, 109, 118, 119, 128, 132, 128, 135, 140, 167, 174, 217, 225, 226, 227, 229, 230
        ];
        return ids.includes(questId);
    }

    //[isValidInvalidNotLoopQuestAdultAndAAA]内での使用を想定
    function checkAaaSkillLv(skillName, masterSkillLv) {

        let flag = false;
        let actor = getActorInfo(1);

        let actorName = "";
        if (skillName === "hissatsu" || skillName === "zangeki" || skillName === "kettou" || skillName === "iatsu") {
            actorName = "clair";
        }
        if (skillName === "kaijou" || skillName === "kairiki" || skillName === "kyuukaku" || skillName === "onmitsu") {
            actorName = "nora";
        }
        if (skillName === "kaihou" || skillName === "hakken" || skillName === "kaidoku" || skillName === "idou") {
            actorName = "relm";
        }
        if (skillName === "syukuhuku" || skillName === "kyoukatsu" || skillName === "kitou" || skillName === "yuuwaku") {
            actorName = "sophia";
        }

        let skillId = 0;
        if (actorName === "clair") {
            skillId = 472
            if (skillName === "hissatsu") skillId += 0;
            if (skillName === "zangeki") skillId += 3;
            if (skillName === "kettou") skillId += 6;
            if (skillName === "iatsu") skillId += 9;
        }

        if (actorName === "nora") {
            skillId = 365
            if (skillName === "kaijou") skillId += 0;
            if (skillName === "kairiki") skillId += 3;
            if (skillName === "kyuukaku") skillId += 6;
            if (skillName === "onmitsu") skillId += 9;
            actor = getActorInfo(3);
        }

        if (actorName === "relm") {
            skillId = 277
            if (skillName === "kaihou") skillId += 0;
            if (skillName === "hakken") skillId += 3;
            if (skillName === "kaidoku") skillId += 6;
            if (skillName === "idou") skillId += 9;
            actor = getActorInfo(2);
        }

        if (actorName === "sophia") {
            skillId = 174
            if (skillName === "syukuhuku") skillId += 0;
            if (skillName === "kyoukatsu") skillId += 3;
            if (skillName === "kitou") skillId += 6;
            if (skillName === "yuuwaku") skillId += 9;
            actor = getActorInfo(4);
        }

        switch (masterSkillLv) {
            case 2:
                flag = (actor.hasSkill(skillId) || actor.hasSkill(skillId + 1) || actor.hasSkill(skillId + 2)); //Lv2以上
                break;
            case 3:
                flag = (actor.hasSkill(skillId + 1) || actor.hasSkill(skillId + 2)); //Lv3以上
                break;
            case 4:
                flag = (actor.hasSkill(skillId + 2)); //Lv4
                break;
        }

        return flag;
    }

    function getActorInfo(actorId) {
        return $gameActors.actor(actorId);
    }

    var dobby_createGameObjects_func = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        dobby_createGameObjects_func.call(this);
        $questReportData = new QuestSaveData();
        $dRegionData = new MapSaveData();
    };

    var dobby_makeSaveContents_func = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = dobby_makeSaveContents_func.call(this);
        contents.questReportData = $questReportData;
        contents.dRegionData = $dRegionData;
        return contents;
    };

    // TODO 重要 TODO
    var extractSaveContents_func = DataManager.extractSaveContents;
    // 体験版=>本製品の引き継ぎ関連
    // クエストと街/ダンジョン/その他に追加があった場合は、以下で対応
    // TODO 街関連は未実装のため、本製品では実装が必要
    DataManager.extractSaveContents = function (contents) {
        extractSaveContents_func.call(this, contents);

        $questReportData = contents.questReportData;

        var questStr = loadQuestReportCSVFile();
        // 追加クエストがあった場合、クエストレポートのデータにロード時に追加する。
        if (questStr && (questStr != "" && questStr != null)) {
            var tmp = questStr.split("<br>");
            for (var i = 1; i < tmp.length; i++) {
                var tmpQuest = tmp[i].split(",");
                var questId = tmpQuest[QUESTREPORT_CSV_ITEMQUESTID];
                if (questId != "" && questId != null) {
                    var questData = $questReportData.getQuestDataBySveData(questId);
                    var isQuestNotEmpty = (questData != undefined && questData != null);
                    if (!isQuestNotEmpty) {
                        $questReportData._data[Number(questId)] = new QuestDetailSaveData(Number(questId), -3, 0, 0);
                    }
                }
            }
        }

        $dRegionData = contents.dRegionData;
        //追加マップがあった場合ここに対応
        var townCsv = dobbyloadCSVFile(SD_TOWN_CSV);
        var tmpTownArray = townCsv.split("<br>");
        for (var i = 1; i < tmpTownArray.length; i++) {
            var tmpTown = tmpTownArray[i].split(",");
            var tRegionId = tmpTown[SD_AREACSV_ITEM_REGIONID];
            var tAreaId = tmpTown[SD_AREACSV_ITEM_AREAID].replace("\r", "").replace("\n", "");
            if (tRegionId && tAreaId && tAreaId != "" && tRegionId != "") {
                let townData = $dRegionData.getRegionData(tRegionId).getTownData(tAreaId);
                if (!townData || townData === null) {
                    $dRegionData.getRegionData(tRegionId).addTownData(new AreaSaveData(Number(tAreaId), false, false));
                }
            }

        }

        var dangionCsv = dobbyloadCSVFile(SD_DANGION_CSV);
        var tmpDangionArray = dangionCsv.split("<br>");
        for (var i = 1; i < tmpDangionArray.length; i++) {
            var tmpDangion = tmpDangionArray[i].split(",");
            var dRegionId = tmpDangion[SD_AREACSV_ITEM_REGIONID];
            var dAreaId = tmpDangion[SD_AREACSV_ITEM_AREAID].replace("\r", "").replace("\n", "");
            if (dRegionId && dAreaId && dRegionId != "" && dAreaId != "") {
                let dregion = $dRegionData.getRegionData(dRegionId);
                let dangionData = $dRegionData.getRegionData(dRegionId).getDangionData(dAreaId);
                if (!dangionData || dangionData === null) {
                    $dRegionData.getRegionData(dRegionId).adddDangionData(new AreaSaveData(Number(dAreaId), false, false));
                }
            }
        }

        var otherCsv = dobbyloadCSVFile(SD_OTHER_CSV);
        var tmpOtherArray = otherCsv.split("<br>");
        for (var i = 1; i < tmpOtherArray.length; i++) {
            var tmpOther = tmpOtherArray[i].split(",");
            var oRegionId = tmpOther[SD_AREACSV_ITEM_REGIONID];
            var oAreaId = tmpOther[SD_AREACSV_ITEM_AREAID].replace("\r", "").replace("\n", "");
            if (oRegionId && oAreaId && oRegionId != "" && oAreaId != "") {
                let otherData = $dRegionData.getRegionData(oRegionId).getOtherData(oAreaId);
                if (!otherData || otherData === null) {
                    $dRegionData.getRegionData(oRegionId).adddOtherData(new AreaSaveData(Number(oAreaId), false, false));
                }
            }
        }
    };

    // コアシステム関連
    Scene_Base.prototype.createAddWindowLayerForward = function () {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        var x = (Graphics.width - width) / 2;
        var y = (Graphics.height - height) / 2;
        this._windowLayerForward = new WindowLayer();
        this._windowLayerForward.move(x, y, width, height);
        this.addChild(this._windowLayerForward);
    };

    Scene_Base.prototype.addWindowForward = function (window) {
        this._windowLayerForward.addChild(window);
    };
    // ============================================================================================
    // 実装 =======================================================================================
    // ============================================================================================
    var pluginName = "Dobby_FastTravel";
    var pluginName2 = "DobbyQuestReport";
    var pluginName3 = "Dobby_QuestSystem";
    var pluginName4 = "Dobby_updateOrder";
    var pluginName5 = "Dobby_updateQuest";
    var pluginName6 = "Dobby_RankUp";
    var pluginName7 = "Dobby_DispQuestName";
    var pluginName8 = "Dobby_DispOrderName";

    var pluginName_InitQuestData = "Dobby_InitializeQuestData";
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        dobbyTest.testtest.preloadWindowskin();
        if (command === pluginName) {
            switch (args[0]) {
                case 'fastTravel':
                    _openEvent = QUEST_OPEN_EVENT_WARLD_MAP;
                    _openSystemByMenuFlag = false;
                    _notBackBeforeArea = false;
                    if (args.length > 1 && args[1] === "notBack") {
                        _notBackBeforeArea = true;
                    }
                    SceneManager.push(Scene_D_FastTravel);
                    this.wait(10);
                    break;
                default:
                    if (args[0] === "openRegion") {
                        $dRegionData.getRegionData(Number(args[1])).setOpenFlag(true);
                        this.wait(10);
                    } else if (args[0] === "multiOpenRegion") {
                        // デバッグ用：同時に地方をオープンする
                        for (var i = 1; i < args.length; i++) {
                            $dRegionData.getRegionData(Number(args[i])).setOpenFlag(true);
                        }
                    } else if (args[0] === "AllOpen") {
                        var regionList = $dRegionData.getRegionDataList();
                        for (let key in regionList) {
                            var regionDataTmpe = regionList[key];
                            regionDataTmpe.setOpenFlag(true);
                            var townList = regionDataTmpe.getTownDataList();
                            for (let key2 in townList) {
                                townList[key2].setOpenFlag(true);
                            }
                            var dangionList = regionDataTmpe.getDangionDataList();
                            for (let key3 in dangionList) {
                                dangionList[key3].setOpenFlag(true);
                            }
                            var otherList = regionDataTmpe.getOtherDataList();
                            for (let key4 in otherList) {
                                otherList[key4].setOpenFlag(true);
                            }
                        }

                        this.wait(10);
                    } else if (args[0] === "openTown" || args[0] === "openDangion" || args[0] === "openOther") {

                        var regionDataList = $dRegionData.getRegionDataList();
                        for (let key in regionDataList) {
                            var value2 = regionDataList[key];
                            var tmpList = null;
                            switch (args[0]) {
                                case 'openTown':
                                    tmpList = value2.getTownDataList();
                                    break;
                                case 'openDangion':
                                    tmpList = value2.getDangionDataList();
                                    break;
                                case 'openOther':
                                    tmpList = value2.getOtherDataList();
                                    break;
                            }
                            if (tmpList) {
                                for (let key2 in tmpList) {
                                    var tValue = tmpList[key2];
                                    if (tValue && Number(tValue.getAreaId()) === Number(args[1])) {
                                        tValue.setOpenFlag(true);
                                    }
                                }
                            }
                        }
                    } else if (args[0] === "closeTown" || args[0] === "closeDangion" || args[0] === "closeOther") {
                        var regionDataList = $dRegionData.getRegionDataList();
                        for (let key in regionDataList) {
                            var value2 = regionDataList[key];
                            var tmpList = null;
                            switch (args[0]) {
                                case 'closeTown':
                                    tmpList = value2.getTownDataList();
                                    break;
                                case 'closeDangion':
                                    tmpList = value2.getDangionDataList();
                                    break;
                                case 'closeOther':
                                    tmpList = value2.getOtherDataList();
                                    break;
                            }
                            if (tmpList) {
                                for (let key2 in tmpList) {
                                    var tValue = tmpList[key2];
                                    if (tValue && Number(tValue.getAreaId()) === Number(args[1])) {
                                        tValue.setOpenFlag(false);
                                    }
                                }
                            }
                        }
                    } else if (args[0] === "multOpenTown" || args[0] === "multiOpenDangion" || args[0] === "multiOpenOther") {

                        var regionDataList = $dRegionData.getRegionDataList();
                        for (let key in regionDataList) {
                            var value2 = regionDataList[key];
                            var tmpList = null;
                            switch (args[0]) {
                                case 'multOpenTown':
                                    tmpList = value2.getTownDataList();
                                    break;
                                case 'multiOpenDangion':
                                    tmpList = value2.getDangionDataList();
                                    break;
                                case 'multiOpenOther':
                                    tmpList = value2.getOtherDataList();
                                    break;
                            }
                            if (tmpList) {
                                for (var i = 1; i < args.length; i++) {
                                    for (let key2 in tmpList) {
                                        var tValue = tmpList[key2];
                                        if (tValue && Number(tValue.getAreaId()) === Number(args[i])) {
                                            tValue.setOpenFlag(true);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;

            }
        } else if (command === pluginName2) {
            switch (args[0]) {
                case 'show':
                    // メニュー用のシーンを追加する。(もしくはショートカットキー？)
                    // ここからワールドマップへ遷移した場合の挙動を考える。
                    // フローチャートを作る必要がある。
                    _openEvent = QUEST_OPEN_EVENT_NOTMENU_OPEN;
                    _openSystemByMenuFlag = false;
                    SceneManager.push(Scene_D_Menu_QuestReportScene);
                    this.wait(10);
                    break;
            }
        } else if (command === pluginName3) {
            switch (args[0]) {
                case 'show':
                    // クエストシステム
                    if ($gameTemp.isPlaytest()) initializeQuestOpener(true);
                    if (args.length > 2) {
                        _questOpenPosition = args[2];
                    } else {
                        _questOpenPosition = args[1];
                    }
                    Scene_QuestMenuWindow.setQuestPlace(_questOpenPosition);
                    SceneManager.push(Scene_QuestMenuWindow);
                    this.wait(10);
                    break;
            }
        } else if (command === pluginName5) {
            Alt_Func.questHistoryUpdatePluginName(command);
            Alt_Func.questHistoryUpdateQuestId(args);
            switch (args[0]) {
                case 'open':
                    questvalidOrderedNewByQuestId(args[1]);
                    break;
                case 'ordered':
                    // イベント操作でクエスト受注を行った時に画面にポップアップウィンドウを出すため
                    kmsOpenMessageQuestComplete(args[1], true);
                    questvalidOrderedNotNewByQuestId(args[1]);
                    displayOrderStart(args[1]);
                    questOrderedById(args[1]);
                    break;
                case 'deleteNew':
                    questvalidOrderedNotNewByQuestId(args[1]);
                    break;
                case 'openAfterAdult':
                    questvalidOrderedNewByQuestId(args[1]);
                    questvalidOrderedNotNewByQuestId(args[1]);
                    break;
                case 'openOnlyDisp':
                    questDispUnorderedByQuestId(args[1]);
                    break;
                case 'close':
                    questInvalidByQuestId(args[1]);
                    break;
            }
            Alt_Func.questHistoryUpdate();
        } else if (command === pluginName4) {
            resetNewQuestInfoByQuestId();
            Alt_Func.questHistoryUpdatePluginName(command);
            Alt_Func.questHistoryUpdateQuestId(args);
            switch (args[0]) {
                case 'clear':
                    displayOrderComplete(args[1]);
                    clearQuestOrderByQuestId(args[1]);
                    this.wait(10);
                    break;
                case 'clearNoMsg':
                    clearQuestOrderByQuestId(args[1]);
                    this.wait(10);
                    break;
                case 'open':
                    displayOrderStart(Number(args[1]));
                    nextOpenQuestOrderByCountAndQuestId(args[1]);
                    updateNewQuestInfoByQuestId(args[1]);
                    this.wait(10);
                    break;
                case 'openNoMsg':
                    nextOpenQuestOrderByCountAndQuestId(args[1]);
                    updateNewQuestInfoByQuestId(args[1]);
                    this.wait(10);
                    break;
                case 'targetOpen':
                    kmsOpenMessageTargetOrderComplete(Number(args[1]), Number(args[2]), true);
                    openQuestOrderByQuestIdAndTargetNo(Number(args[1]), Number(args[2]));
                    this.wait(10);
                    break;
                case 'targetClear':
                    kmsOpenMessageTargetOrderComplete(Number(args[1]), Number(args[2]), false);
                    clearQuestOrderByQuestIdAndTargetNo(args[1], args[2]);
                    this.wait(10);
                    break;
                case 'targetClearNomsg':
                    clearQuestOrderByQuestIdAndTargetNo(args[1], args[2]);
                    this.wait(10);
                    break;
                case 'multiOpen':
                    openQuestOrderByQuestIdAndCount(args[1], args[2]);
                    displayOrderMultlStart(Number(args[1]), Number(args[2]));
                    updateNewQuestInfoByQuestId(args[1]);
                    this.wait(10);
                    break;
                case 'allClear':
                    kmsOpenMessageQuestComplete(args[1], false);
                    questFullCompletedByQuestId(args[1]);
                    questAddClearNum(args[1]);
                    this.wait(10);
                    break;
                case 'allClearNoMsg':
                    questFullCompletedByQuestId(args[1]);
                    questAddClearNum(args[1]);
                    this.wait(10);
                    break;
                case 'multiAllClearNoMsg':
                    questFullCompletedByQuestIdMulti(args);
                    multiQuestAddClearNum(args);
                    this.wait(10);
                    break;
            }
            Alt_Func.questHistoryUpdate();
        } else if (command === pluginName8) {
            var startFlag = (args[0] === 'start') ? true : false;
            kmsOpenMessageTargetOrderComplete(Number(args[1]), Number(args[2]), startFlag);
        } else if (command === pluginName7) {
            var startFlag = (args[0] === 'start') ? true : false;
            kmsOpenMessageQuestComplete(Number(args[1]), startFlag);
        } else if (command === pluginName6) {
            setRank(Number(args[0]));
        }
    };

    // 外部プラグインを使用する事による実装。
    function kmsOpenMessageOrderComplete(questId, startFlag, openNum) {
        if (dobby_useQuestSystem) {
            // tatsunoko
            //loadquestReportOrderCSVFile();
            var orderStr = loadquestReportOrderCSVFile();
            var num = openNum === undefined ? 1 : openNum;
            var tmp = orderStr.split("<br>");
            //var tmp = dobby_QuestOrderStr.split("<br>");
            //dobby_QuestOrderStr = null;
            var orderList = tmp.filter(function (value) {
                var tmpOrder = value.split(",");
                if (isNaN(tmpOrder[QUESTREPORT_ORDER_CSV_ITEMQUESTID])) {
                    return false;
                }

                return (Number(tmpOrder[QUESTREPORT_ORDER_CSV_ITEMQUESTID]) === Number(questId));

            });

            if (orderList === null || orderList.length === 0) {
                alert("IDに紐付くクエストIDが存在しません。:kmsOpenMessageOrderComplete");
                return null;
            }

            var questProgress = $questReportData.getQuestDataBySveData(questId).getOrderList();
            var questProgressList = questVariableNoSplitForOrderProgress(questProgress);
            questProgressList = questProgressList.reverse();
            var tmpIdx = 0;
            var tmpCnt = 0;
            var proggressNum = 0;
            if (!startFlag) {
                proggressNum = 1;
            }

            for (var i = 0; i < questProgressList.length; i++) {
                if (Number(questProgressList[i]) === proggressNum) {
                    cnt = i;
                    var order = orderList[cnt];
                    order = order.split(",");
                    var orderInfo = order[QUESTREPORT_ORDER_CSV_ITEMORDERINFO];
                    var text = startFlag ? '\\I[509] Order: ' : '\\I[510] Order Complete: ';
                    openKmsMessageWindow(text + orderInfo);
                    tmpCnt++;
                    if (tmpCnt === num) {
                        break;
                    }
                }
            }
            questProgressList = questProgressList.reverse();
        }
    }

    // 自動で下からではなく、対象の指令の番号の指令クリアウィンドウを表示する。
    function kmsOpenMessageTargetOrderComplete(questId, targetNo, startFlag) {
        if (dobby_useQuestSystem) {
            // tatsunoko
            //loadquestReportOrderCSVFile();
            var orderStr = loadquestReportOrderCSVFile();
            var tmp = orderStr.split("<br>");
            //var tmp = dobby_QuestOrderStr.split("<br>");
            //dobby_QuestOrderStr = null;
            var orderList = tmp.filter(function (value) {
                var tmpOrder = value.split(",");
                if (isNaN(tmpOrder[QUESTREPORT_ORDER_CSV_ITEMQUESTID])) {
                    return false;
                }

                return (Number(tmpOrder[QUESTREPORT_ORDER_CSV_ITEMQUESTID]) === Number(questId));

            });

            if (orderList === null || orderList.length === 0) {
                alert("IDに紐付くクエストIDが存在しません。:kmsOpenMessageTargetOrderComplete");
                return null;
            }

            var order = orderList[targetNo - 1];
            order = order.split(",");
            var orderInfo = order[QUESTREPORT_ORDER_CSV_ITEMORDERINFO];
            var text = startFlag ? '\\I[509] 指令開始：' : '\\I[510] 指令完了：';
            openKmsMessageWindow(text + orderInfo);
        }
    }

    // 外部プラグインを使用する事による実装。
    function kmsOpenMessageQuestComplete(questId, startFlag) {
        if (dobby_useQuestSystem) {
            // tatsunoko
            // loadQuestReportCSVFile();
            var questyStr = loadQuestReportCSVFile();
            //var tmp = dobby_QuestStr.split("<br>");
            var tmp = questyStr.split("<br>");
            //dobby_QuestStr = null;

            for (var i = 1; i < tmp.length; i++) {
                var tmpQuest = tmp[i].split(",");
                if (tmpQuest[0] != "") {
                    if (Number(tmpQuest[QUESTREPORT_CSV_ITEMQUESTID]) === Number(questId)) {
                        var text = startFlag ? '\\I[511] Quest Start: ' : '\\I[512] Quest Complete: ';
                        openKmsMessageWindow(text + tmpQuest[QUESTREPORT_CSV_ITEMQUESTNAME]);
                        break;
                    }
                }
            }
        }
    }

    function openKmsMessageWindow(txt) {
        $gameTemp.setQuickNotificationRegistrationMode(true);
        if (!$gameMessage.isBusy() && $gameTemp.isQuickNotificationRegistrationMode()) {
            $gameTemp.setQuickNotificationRegistrationMode(false);

            var notification = {
                text: txt, faceName: '', faceIndex: ''
            };
            // 通知の登録
            $gameTemp.registerQuickNotification(notification);

        }
    }

    function isOpenEventWarldMap() {
        return (_openEvent === QUEST_OPEN_EVENT_WARLD_MAP);
    }

    // クエストレポートや、メニューのファストトラベルではなく
    // 通常で外に出た場合のフラグ
    function isNormalOutWarldMap() {
        if (isOpenEventWarldMap() && !_openSystemByMenuFlag) {
            return true;
        }
        return false;
    }

    // ========================================================================
    // ========================================================================
    // ========================================================================
    // Newゲーム時に全てのクエストの情報を受注不可にする。
    // ========================================================================
    // ========================================================================
    // ========================================================================
    var _Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function () {
        if (_Scene_Title_commandNewGame) {
            _Scene_Title_commandNewGame.apply(this, arguments);
        }
        if (dobby_useQuestSystem) {
            if (!checkUseQuestOpenDispNew()) {
                alert("「newVariableNoUseFlag」がONの場合、「newVariableNo」には正しい変数番号を入れてください。");
                if (StorageManager.isLocalMode()) {
                    window.close();
                } else {
                    window.open('about:blank', '_self').close();
                }
            }
            //initializeQuestData();
        }
    };

    // メニューに追加する用のシーン
    //=============================================================================
    // Window_MenuCommand
    //=============================================================================
    var _TEST_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _TEST_Window_MenuCommand_addOriginalCommands.call(this);
        this.addCommand('Fast Travel', 'Dobby_FastTrevel', true);
        this.addCommand('Quest Report', 'Dobby_QuestReport', true);
        this.addCommand('Quests', 'Scene_QuestListView');

    };
    //=============================================================================
    // Scene_Menu
    //=============================================================================

    var _TEST_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _TEST_Scene_Menu_createCommandWindow.call(this);
        //追加メニューの挙動を指定（TestSymbol選択なら下記に自作したonCommandTestを読み込み）
        this._commandWindow.setHandler('Dobby_FastTrevel', this.dobbyFastTravelCall.bind(this));
        this._commandWindow.setHandler('Dobby_QuestReport', this.dobbyQuestReportCall.bind(this));
        this._commandWindow.setHandler('Scene_QuestListView', this.dobbyQuestListViewCall.bind(this));
    };

    //メニュー選択時即時表示
    Scene_Menu.prototype.dobbyFastTravelCall = function () {

        if (invalidFasttravelVarivable && invalidFasttravelVarivable > 0 && invalidFasttravelNo && invalidFasttravelNo > 0 && $gameVariables.value(Number(invalidFasttravelVarivable)) < invalidFasttravelNo) {
            if ((this._alertTutorialWindow && this._alertTutorialWindow != null)) {
                if (!this._alertTutorialWindow._animationFlag) {
                    this._alertTutorialWindow.startAnimation();
                }
            } else {
                this._alertTutorialWindow = new D_Window_Common_Alert_Window(500, 200, this);
                this._alertTutorialWindow.setInitialize(this._alertTutorialWindow);
                this.addChild(this._alertTutorialWindow);
                this._alertTutorialWindow.setTxt(SD_MSG_INVALID_FASTTRAVEL_BY_NOW);
                this._alertTutorialWindow.startAnimation();
            }
            this._commandWindow.activate();
            return;
        }

        var fastTravelswitch = true;
        if (enableFasttravelSwitchNo != 0) {
            if ($gameSwitches.value(enableFasttravelSwitchNo)) {
                fastTravelswitch = false;
            }
        }

        if (fastTravelswitch && !isInvalidFastTravel()) {
            _openEvent = QUEST_OPEN_EVENT_WARLD_MAP;
            _openSystemByMenuFlag = true;
            SceneManager.push(Scene_D_FastTravel);
        } else {
            if ((this._alertWindow && this._alertWindow != null)) {
                if (!this._alertWindow._animationFlag) {
                    this._alertWindow.startAnimation();
                }
            } else {
                this._alertWindow = new D_Window_Common_Alert_Window(300, 200, this);
                this._alertWindow.setInitialize(this._alertWindow);
                this.addChild(this._alertWindow);
                this._alertWindow.setTxt(SD_MSG_INVALID_FASTTRAVEL_BY_FILED);
                this._alertWindow.startAnimation();
            }

            this._commandWindow.activate();
        }
    };

    //メニュー選択時即時表示
    Scene_Menu.prototype.dobbyQuestReportCall = function () {
        _openEvent = QUEST_OPEN_EVENT_MENU_OPEN;
        _openSystemByMenuFlag = true;
        SceneManager.push(Scene_D_Menu_QuestReportScene);
    };

    Scene_Menu.prototype.dobbyQuestListViewCall = function () {
        SceneManager.push(Scene_QuestListView);
    };

    // ========================================================================
    // ========================================================================
    // ========================================================================
    // ワールドマップ画面用のScene
    // ========================================================================
    // ========================================================================
    // ========================================================================
    function Scene_D_FastTravel() {
        this.initialize.apply(this, arguments);
    }

    Scene_D_FastTravel.prototype = Object.create(Scene_Base.prototype);
    Scene_D_FastTravel.prototype.constructor = Scene_D_FastTravel;

    Scene_D_FastTravel.prototype.terminate = function () {
        _tmpRegionStr = null;
        _tmpTownStr = null;
        _tmpDangionStr = null;
        _tmpOtherStr = null;
        // tatsunoko
        // dobby_QuestStr = null;
        // dobby_QuestOrderStr = null;
        this._selectMapBaseSprite.removeChild(this._mapPointCursolSprite);
        this._selectMapBaseSprite.removeChild(this._backSprite);
        this._baseSprite.removeChild(this._selectMapBaseSprite);
        this._backgroundSprite.removeChild(this._titleLayoutImg);
        this._baseSprite.removeChild(this._backgroundSprite);
        this._field.removeChild(this._iconImgBase);
        this.removeChild(this._baseSprite);
        this._mapWindowList = null;
        this.removeChild(this._windowLayer);
        this._windowLayer = null;
        terminateAlertWindow(this);
    };

    Scene_D_FastTravel.prototype.initialize = function () {
        SceneManager.setFastTravelpopAfeterFlag(false);
        Scene_Base.prototype.initialize.call(this);
        //if (isNormalOutWarldMap()) {
        //AudioManager.playBgm({"name":fastTravelBgm,"volume":80,"pitch":100,"pan":0});
        $gameSystem.saveBgm();
        AudioManager.playBgm({ "name": "fastTravelBGM", "volume": 80, "pitch": 100, "pan": 0 });
        //}
        this._regionList = [];
        this._townList = [];
        this._dangionList = [];
        this._otherList = [];
        this._moveFlag = false;
        this._mapWindowList = [];
        this._AreaWindowMoveFlag = false;
        this._nowCorsolPosition = NOW_CORSOL_POSITION_WORLDMAP;
        this._tmpQuestReport = null;
        this._questReportList = [];
        this._tmpQuestReportOrder = null;
        this._selectOptionIndex = 0;
        _tmpRegionStr = dobbyloadCSVFile(SD_REGION_CSV);
        _tmpTownStr = dobbyloadCSVFile(SD_TOWN_CSV);
        _tmpDangionStr = dobbyloadCSVFile(SD_DANGION_CSV);
        _tmpOtherStr = dobbyloadCSVFile(SD_OTHER_CSV);
        this._nowSelect = NOW_SELECT_REGION_AREA;

        // クエストレポートを使うかどうか
        if (dobby_useQuestSystem) {
            //loadQuestReportCSVFile();
            //loadquestReportOrderCSVFile();
        }
        this._step = "fadein";
        // 現在プレイヤーがいる位置とマップを
        this.setPlayerNowPoint();
        this._areaWindowSelectIdx = 0;
        this._upperLowFlag = true;
        this._okClickFadeFlag = false;
    };

    // csv読み込み用拡張
    Scene_D_FastTravel.prototype.setPlayerNowPoint = function () {
        let mapId = $gameMap.mapId();
        switch (mapId) {
            case 58:
                D_FT_NowPoint.MapID = 52;
                break;
            default:
                D_FT_NowPoint.MapID = mapId;
                break;
        }
        //D_FT_NowPoint.MapID = $gameMap.mapId() === Number(58) ? 52 : $gameMap.mapId();
        D_FT_NowPoint.areaID = (mapId === Number(9) ? SD_FASTTRAVEL_KANONASU_ID : 0);
        D_FT_NowPoint.pointx = $gamePlayer.x;
        D_FT_NowPoint.pointy = $gamePlayer.y;
    };

    Scene_D_FastTravel.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        // csv読み込みが終わってなかった場合、終わるまで無限ループする。
        while (!this.convertCsvToArray()) {
        }
        var str = dobby_loadAndGetQuestReportCsvFile();
        while (!convertQuestReportCsvToArray(this, QUEST_ORDER_TARGET_SCENE_QUESTREPORT, str)) {
        }
        //while(!convertQuestReportCsvToArray(this, QUEST_ORDER_TARGET_SCENE_QUESTREPORT)){}
        var oStr = dobby_loadAndQuestReportOrderCSVFile();
        while (!convertQuestReportOrderCsvToArray(this, oStr)) {
        }
        //while(!convertQuestReportOrderCsvToArray(this)){}
        this.createBackground();
        this.createregionBase();
        this.setRegionAddChildAndCursolImg();
        // Scene_baseを継承した場合、これがないとWindowを作ることができない
        Scene_Base.prototype.createWindowLayer.call(this);
        Scene_Base.prototype.createAddWindowLayerForward.call(this);
        this.createDataWindow();
        if (dobby_useQuestSystem) {
            createQuestReport(this);
        }

        // trueは街の入り口からワールドマップへ遷移した時
        if (isOpenEventWarldMap()) {
            this.initializePlayerNowPoint(D_FT_NowPoint.MapID, D_FT_NowPoint.areaID);
        } else {
            // メニュー画面のクエストレポートから飛んだ場合
            this.initializePlayerNowPoint(_questreportOrderByMenu._mapId, _questreportOrderByMenu._areaId);
            this.moveBySelectedOrder(_questreportOrderByMenu, false);
            _questreportOrderByMenu = null;
        }
        this._questOrderListWindow.setHandler('ok', this.orderClickMapMove.bind(this));

    };

    Scene_D_FastTravel.prototype.convertCsvToArray = function () {
        if (nullOrEnpty(_tmpRegionStr) || nullOrEnpty(_tmpTownStr) || nullOrEnpty(_tmpDangionStr) || nullOrEnpty(_tmpOtherStr)) {
            return false;
        }

        var tmp = _tmpRegionStr.split("<br>");
        // 地方
        for (var i = 1; i < tmp.length; i++) {
            var tmpRegion = tmp[i].split(",");
            if (tmpRegion[0] != "") {
                var tmpRSprte = new Sprite();
                var fileName = tmpRegion[4];
                //var dispFlag = $gameVariables.value(tmpRegion[3]);
                var dispFlag = $dRegionData.getRegionData(Number(tmpRegion[0])).getOpenFlag();
                if (dispFlag) {
                    tmpRSprte.bitmap = loadBitmapByPluginFolder(fileName.substring(0, fileName.length - 4));
                    var tmpPositionx = ((Number(tmpRegion[5]) - (DISP_W_HALF + MAP_POSITION_X_ADJUST)) * -1);
                    var tmpPositiony = ((Number(tmpRegion[6]) - (DISP_H_HALF + MAP_POSITION_Y_ADJUST)) * -1);
                    this._regionList.push(new RegionData(tmpRegion[0], tmpRegion[1], tmpRegion[2], tmpRegion[3], tmpRegion[4], tmpRSprte, 0, tmpPositionx, tmpPositiony));
                }
            }
        }

        var svTownList = {};
        var svDangionList = {};
        var svOtherList = {};
        var regionDataList = $dRegionData.getRegionDataList();
        for (let key in regionDataList) {
            var tregionData = regionDataList[key];
            if (tregionData.getOpenFlag()) {
                var tTownDataList = tregionData.getTownDataList();
                var tDangionDataList = tregionData.getDangionDataList();
                var tOtherDataList = tregionData.getOtherDataList()
                for (let keyt in tTownDataList) {
                    svTownList[Number(keyt)] = tTownDataList[Number(keyt)];
                }

                for (let keyd in tDangionDataList) {
                    svDangionList[Number(keyd)] = tDangionDataList[Number(keyd)];
                }

                for (let keyo in tOtherDataList) {
                    svOtherList[Number(keyo)] = tOtherDataList[Number(keyo)];
                }
            }
        }

        tmp = _tmpTownStr.split("<br>");
        // 街
        for (var i = 1; i < tmp.length; i++) {
            var tmpTown = tmp[i].split(",");
            if (tmpTown[0] != "") {
                var townData = svTownList[Number(tmpTown[0])];
                if (townData && townData.getOpenFlag()) {
                    var tmpIdx = 0;
                    this._townList.push(new AreaInfo(tmpTown[tmpIdx++], tmpTown[tmpIdx++], tmpTown[tmpIdx++], tmpTown[tmpIdx++], tmpTown[tmpIdx++], tmpTown[tmpIdx++], tmpTown[tmpIdx++], tmpTown[tmpIdx++], tmpTown[tmpIdx++], tmpTown[tmpIdx++], tmpTown[tmpIdx++], tmpTown[tmpIdx++]));
                }
            }
        }

        if (this._townList.length > 0) {
            this._townList.sort(function (fisrt, second) {
                return Number(fisrt._dispNo) - Number(second._dispNo);
            });
        }

        tmp = _tmpDangionStr.split("<br>");
        // ダンジョン
        for (var i = 1; i < tmp.length; i++) {
            var tmpdangion = tmp[i].split(",");
            if (tmpdangion[0] != "") {
                var dangionData = svDangionList[Number(tmpdangion[0])];
                if (dangionData && dangionData.getOpenFlag()) {
                    var tmpIdx = 0;
                    this._dangionList.push(new AreaInfo(tmpdangion[tmpIdx++], tmpdangion[tmpIdx++], tmpdangion[tmpIdx++], tmpdangion[tmpIdx++], tmpdangion[tmpIdx++], tmpdangion[tmpIdx++], tmpdangion[tmpIdx++], tmpdangion[tmpIdx++], tmpdangion[tmpIdx++], tmpdangion[tmpIdx++], tmpdangion[tmpIdx++], tmpdangion[tmpIdx++],));
                }
            }
        }

        if (this._dangionList.length > 0) {
            this._dangionList.sort(function (fisrt, second) {
                return Number(fisrt._dispNo) - Number(second._dispNo);
            });
        }

        tmp = _tmpOtherStr.split("<br>");
        // その他
        for (var i = 1; i < tmp.length; i++) {
            var tmpother = tmp[i].split(",");
            if (tmpother[0] != "") {
                var otherData = svOtherList[Number(tmpother[0])];
                if (otherData && otherData.getOpenFlag()) {
                    var tmpIdx = 0;
                    this._otherList.push(new AreaInfo(tmpother[tmpIdx++], tmpother[tmpIdx++], tmpother[tmpIdx++], tmpother[tmpIdx++], tmpother[tmpIdx++], tmpother[tmpIdx++], tmpother[tmpIdx++], tmpother[tmpIdx++], tmpother[tmpIdx++], tmpother[tmpIdx++], tmpother[tmpIdx++], tmpother[tmpIdx++]));
                }
            }
        }

        if (this._otherList.length > 0) {
            this._otherList.sort(function (fisrt, second) {
                return Number(fisrt._dispNo) - Number(second._dispNo);
            });
        }

        this.clearReadFile();
        return true;
    };

    Scene_D_FastTravel.prototype.createDataWindow = function () {
        for (var i = 0; i < this._regionList.length; i++) {
            var tmpRegion = this._regionList[i];
            var tmpRegionId = tmpRegion._rd_regionId;
            var tmpTownList = [];
            var tmpdangionList = [];
            var tmpOtherList = [];
            // 街情報を地域情報にひもづけ
            for (var j = 0; j < this._townList.length; j++) {
                var tmpTown = this._townList[j];
                if (Number(tmpRegion._rd_regionId) === Number(tmpTown._regionId)) {
                    tmpTownList.push(tmpTown);
                }
            }

            tmpRegion._townWindow = new Window_townDangionOtherWindow(tmpRegionId, ARE_TOWN, tmpTownList, true);
            this._mapWindowList.push(tmpRegion._townWindow);
            if (tmpTownList && tmpTownList.length > 0) {
                tmpRegion._townWindow.setHandler("ok", this.mapOKClick.bind(this, tmpRegionId, ARE_TOWN));
            }
            this._baseSprite.addChild(tmpRegion._townWindow);

            // ダンジョン情報を地域情報にひもづけ
            for (var j = 0; j < this._dangionList.length; j++) {
                var tmpdangion = this._dangionList[j];
                if (Number(tmpRegion._rd_regionId) === Number(tmpdangion._regionId)) {
                    tmpdangionList.push(tmpdangion);
                }
            }

            tmpRegion._dangionWindow = new Window_townDangionOtherWindow(tmpRegionId, ARE_DANGION, tmpdangionList, false);
            this._mapWindowList.push(tmpRegion._dangionWindow);
            if (tmpdangionList && tmpdangionList.length > 0) {
                tmpRegion._dangionWindow.setHandler("ok", this.mapOKClick.bind(this, tmpRegionId, ARE_DANGION));
            }

            this._baseSprite.addChild(tmpRegion._dangionWindow);
            // その他情報を地域情報にひもづけ
            for (var j = 0; j < this._otherList.length; j++) {
                var tmpOther = this._otherList[j];
                if (Number(tmpRegion._rd_regionId) === Number(tmpOther._regionId)) {
                    tmpOtherList.push(tmpOther);
                }
            }

            tmpRegion._otherWindow = new Window_townDangionOtherWindow(tmpRegionId, ARE_OTHER, tmpOtherList, false);
            this._mapWindowList.push(tmpRegion._otherWindow);
            if (tmpOtherList && tmpOtherList.length > 0) {
                tmpRegion._otherWindow.setHandler("ok", this.mapOKClick.bind(this, tmpRegionId, ARE_OTHER));
            }
            this._baseSprite.addChild(tmpRegion._otherWindow);
        }

        this._backSprite = new Sprite();
        this._backSprite.bitmap = loadBitmapByPluginFolder("windowBack");
        this._backSprite.x = DISP_W;
        this._backSprite.y = ARE_WINDOW_POSITION_Y;
        //this._backSprite.scale.y = 0.75;
        //this._backSprite.opacity = 120;
        this._selectMapBaseSprite.addChild(this._backSprite);
    };

    Scene_D_FastTravel.prototype.orderClickMapMove = function () {
        var selectOrder = this._questOrderListWindow.getSelectedOrder();
        if (selectOrder && isNaN(selectOrder._mapId)) {
            invalidFasttravelMessage(this, SD_MSG_INVALID_FASTTRAVEL_BY_OREDER);
            this._questOrderListWindow.activate();
        } else {
            this.moveBySelectedOrder(selectOrder, true);
        }

    };

    Scene_D_FastTravel.prototype.moveBySelectedOrder = function (selectedOrder, orderFlag) {
        var result = false;
        var regionIdx = 0;
        var selectAreaNo = null;
        var tmpWindow = null;
        var aIdx = 0;
        this._regionList.some(function (regionData) {
            if (Number(regionData._rd_regionId) === Number(selectedOrder._regionId)) {
                if (regionData._townWindow._areaDataList.length > 0) {
                    var aResult = false;
                    // これは共通化可能
                    regionData._townWindow._areaDataList.some(function (areaData) {
                        // 魔法アカデミー用
                        let areaExists = false;
                        if (selectedOrder._areaId != null && selectedOrder._areaId && (selectedOrder._areaId === SD_FASTTRAVEL_MAHOUAKADEMY_ID || selectedOrder._areaId === SD_FASTTRAVEL_KANONASU_ID)) {
                            areaExists = (Number(areaData._mapId) === Number(selectedOrder._mapId) && Number(areaData._id) === Number(selectedOrder._areaId));
                        } else {
                            areaExists = Number(areaData._mapId) === Number(selectedOrder._mapId);
                        }
                        if (areaExists) {
                            tmpWindow = regionData._townWindow;
                            aResult = true;
                            return true;
                        } else {
                            aIdx++;
                            return false;
                        }
                    });
                }

                if (regionData._dangionWindow._areaDataList.length > 0 && !aResult) {
                    aIdx = 0;
                    regionData._dangionWindow._areaDataList.some(function (areaData) {
                        if (Number(areaData._mapId) === Number(selectedOrder._mapId)) {
                            tmpWindow = regionData._dangionWindow;
                            aResult = true;
                            return true;
                        } else {
                            aIdx++;
                            return false;
                        }
                    });
                }

                if (regionData._otherWindow._areaDataList.length > 0 && !aResult) {
                    aIdx = 0;
                    regionData._otherWindow._areaDataList.some(function (areaData) {
                        if (Number(areaData._mapId) === Number(selectedOrder._mapId)) {
                            tmpWindow = regionData._otherWindow;
                            aResult = true;
                            return true;
                        } else {
                            aIdx++;
                            return false;
                        }
                    });
                }

                if (aResult) {
                    result = aResult;
                    return true;
                } else {
                    regionIdx++;
                    return false;
                }

            } else {
                regionIdx++;
            }
        });

        if (result) {
            if (orderFlag) {
                this._upperLowFlag = true;
            }
            this.deActvateQuestReport();
            this.deactivateSelectAreaWindow();
            this.setRegionSelect();
            this._nowSelect = NOW_SELECT_AREA;
            this.setSelectIndex(regionIdx); // このメソッドの中にあるmoveAreaWindowでエリアウィンドウの動きを制御しているため、エリアウィンドウフラグはこのメソッド内では制御しない
            this.setSelectAreaWindow(tmpWindow._areaNo);
            this.setAreaSelectImg();
            this.moveStartByMoveFlag();
            tmpWindow.activate(); // 対象のエリアのウィンドウをアクティブにする。
            tmpWindow.select(aIdx);
            if (orderFlag) {
                this.moveAreaWindow();
            }

            if (!this._upperLowFlag) { // ここに来るときは実質falseになるからいらないかも
                this.moveAreaWindow();
            }
        }
    };

    // プレイヤーの位置によって、画面の選択位置を変更する
    // ワールドマップを開いた時（クエストレポートではない状態からの遷移）
    Scene_D_FastTravel.prototype.initializePlayerNowPoint = function (mapId, areaId) {
        // 枠の太さ、色、アニメーション要素
        var tmpRegionInfo = null;
        this._nowSelect = NOW_SELECT_REGION_AREA;
        var nowPointAreaInfo = null; // 自分が現在いるエリア（街/ダンジョン/その他の情報）

        // TODO　内部関数以外でやる方法ないか模索中
        var methodo = function (targetWindow) {
            var areaFlag = false;
            var areaDataList = targetWindow.getAreaDataList();
            var tmpPointAreaInfo = null;
            areaDataList.some(function (areaData) {
                if (areaId === 0) {
                    if (Number(areaData._mapId) === Number(mapId)) {
                        tmpPointAreaInfo = areaData;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (Number(areaData._mapId) === Number(mapId) && Number(areaData._id) === Number(areaId)) {
                        tmpPointAreaInfo = areaData;
                        return true;
                    } else {
                        return false;
                    }

                }

            });
            return tmpPointAreaInfo;
        };

        var townFlag = false;
        var dangionFlag = false;
        var otherFlag = false;

        this._regionList.some(function (regionData) {
            var result = false;
            var tmp2AreaInfo = methodo(regionData._townWindow);
            if (tmp2AreaInfo != null) {
                townFlag = true;
            } else {
                tmp2AreaInfo = methodo(regionData._dangionWindow);
                if (tmp2AreaInfo != null) {
                    dangionFlag = true;
                } else {
                    tmp2AreaInfo = methodo(regionData._otherWindow);
                    if (tmp2AreaInfo != null) {
                        otherFlag = true;
                    }
                }
            }

            if (townFlag || dangionFlag || otherFlag) {
                regionData._selectIndex = 1;
                tmpRegionInfo = regionData;
                nowPointAreaInfo = tmp2AreaInfo;
                return true;
            } else {
                return false;
            }
        });

        if (tmpRegionInfo != null && tmpRegionInfo != undefined) {

            // 現在自分がいるエリア（街/ダンジョン/その他）の画像の選択を有効にする。（内部データ的に）
            if (townFlag) {
                this.setSelectAreaWindow(ARE_TOWN);
            } else if (dangionFlag) {
                this.setSelectAreaWindow(ARE_DANGION);
            } else {
                this.setSelectAreaWindow(ARE_OTHER);
            }

            //this._cursolSprite.x = tmpRegionInfo._rd_sprite.x + (Math.floor(tmpRegionInfo._rd_sprite.width/2) - Math.floor(this._cursolSprite.width/2));
            this._cursolSprite.x = tmpRegionInfo._rd_sprite.x + (Math.floor(101 / 2) - Math.floor(61 / 2));
            this._cursolSprite.y = tmpRegionInfo._rd_sprite.y + 30 + SD_FT_CURSOL_ADUJST_Y;
            this._regionselectCursolSprite.x = tmpRegionInfo._rd_sprite.x;
            this._regionselectCursolSprite.y = tmpRegionInfo._rd_sprite.y;

            // 初期表示した時に動きを出したい場合は、trueのロジックを
            // 最初から固定で表示したい場合は、false側のロジックを有効にしてください。
            // デバッグコード
            if (ismapMoveFlag()) {
                // フィールド位置の初期化
                // 画像イメージの中心地に配置する。
                this._field.x = (MAP_IMG_HALF_SIZE_WIDTH - DISP_W_HALF) * -1;
                this._field.y = (MAP_IMG_HALF_SIZE_HEIGHT - DISP_H_HALF) * -1;
                this.moveStartByMoveFlag();
                this._AreaWindowMoveFlag = true;
            } else {
                if (townFlag) {
                    tmpRegionInfo._townWindow.x = ARE_WINDOW_POSITION_X;
                } else if (dangionFlag) {
                    tmpRegionInfo._dangionWindow.x = ARE_WINDOW_POSITION_X;
                } else {
                    tmpRegionInfo._otherWindow.x = ARE_WINDOW_POSITION_X;
                }
                this._field.x = tmpRegionInfo._positionx;
                this._field.y = tmpRegionInfo._positiony;
                this._backSprite.x = ARE_WINDOW_POSITION_X;
            }

        }
    };

    // 地方系の表示画像やカーソル周りを初期配置する処理
    Scene_D_FastTravel.prototype.setRegionAddChildAndCursolImg = function () {

        this._mapPointCursolSprite = new Sprite();
        this._mapPointCursolSprite.bitmap = loadBitmapByPluginFolder("mapCursol");
        this._mapPointCursolSprite.x = Graphics.width;
        this._mapPointCursolSprite.y = Graphics.height;
        this._selectMapBaseSprite.addChild(this._mapPointCursolSprite);

        var j = 1;
        var yPosition = 0.5;

        // TODO 選択するカーソル画像のサイズが変わった場合、変更を行う。
        for (var i = 0; i < this._regionList.length; i++) {
            var width = 97;
            var height = 47;
            var y = yPosition * height;
            var x = (100 * (j + 0.5));
            this._regionList[i]._rd_sprite.x = (280 + (101 * i));
            this._regionList[i]._rd_sprite.y = 15;
            this._selectMapBaseSprite.addChild(this._regionList[i]._rd_sprite);
        }

        this._cursolSprite = new Sprite();
        this._cursolSprite.bitmap = loadBitmapByPluginFolder("select");
        this._cursolSpriteCnt = 0;
        this._cursolSpriteYCnt = 0;
        //this._cursolSprite.setFrame(0,0,102,51);
        this._selectMapBaseSprite.addChild(this._cursolSprite);

        this._regionselectCursolSprite = new Sprite(loadBitmapByPluginFolder("regionselectCursol"));
        //this._cursolSprite.setFrame(0,0,102,51);
        this._selectMapBaseSprite.addChild(this._regionselectCursolSprite);

    };

    Scene_D_FastTravel.prototype.createregionBase = function () {
        this._selectMapBaseSprite = new Sprite();
        this._baseSprite.addChild(this._selectMapBaseSprite);
        this._regionSpriteList = [];
    };

    Scene_D_FastTravel.prototype.createBackground = function () {
        this._baseSprite = new Sprite();
        this._backgroundSprite = new Sprite();
        this._baseSprite.addChild(this._backgroundSprite);
        this.addChild(this._baseSprite);
        this._baseSprite.opacity = 0;

        this._field = new Sprite();
        this._field.bitmap = loadBitmapByPluginFolder("dMap");
        this._backgroundSprite.addChild(this._field);
        this._titleLayoutImg = new Sprite();
        this._titleLayoutImg.bitmap = loadBitmapByPluginFolder("worldMapTitle");
        this._backgroundSprite.addChild(this._titleLayoutImg);

        this._iconImgBase = new Sprite();
        this._field.addChild(this._iconImgBase);
        this._selectMapBaseSprite = new Sprite();
        this._baseSprite.addChild(this._selectMapBaseSprite);

        // フィールド位置の初期化
        this._field.x = 0;
        this._field.y = 0;

        // 街/ダンジョン/その他の画像情報および、どれを押したかを判定するための設定を行う処理
        var areaSelectBackImg = new Sprite();
        areaSelectBackImg.bitmap = loadBitmapByPluginFolder("areaSelectBack");
        areaSelectBackImg.x = ARE_WINDOW_POSITION_X - 24;
        areaSelectBackImg.y = ARE_IMG_TOWN_POSITION_Y - 15;
        this._selectMapBaseSprite.addChild(areaSelectBackImg);
        var townsImg = new Sprite();
        var dangionsImg = new Sprite();
        var othersImg = new Sprite();

        this._questImg = new Sprite();
        this._quildDirect = new Sprite();
        townsImg.bitmap = loadBitmapByPluginFolder("towns");
        dangionsImg.bitmap = loadBitmapByPluginFolder("dangion");
        othersImg.bitmap = loadBitmapByPluginFolder("other");
        this._questImg.bitmap = loadBitmapByPluginFolder("questReport");
        this._quildDirect.bitmap = loadBitmapByPluginFolder("guidDirect");
        townsImg.x = ARE_IMG_TOWN_POSITION_X;
        townsImg.y = ARE_IMG_TOWN_POSITION_Y;
        dangionsImg.x = ARE_IMG_DANGION_POSITION_X;
        dangionsImg.y = ARE_IMG_DANGION_POSITION_Y;
        othersImg.x = ARE_IMG_OTHER_POSITION_X;
        othersImg.y = ARE_IMG_OTHER_POSITION_Y;
        this._questImg.x = ARE_IMG_QUESTREPORT_POSITION_X;
        this._questImg.y = ARE_IMG_QUESTREPORT_POSITION_Y;

        this._quildDirect.x = ARE_IMG_GUILDDIRECT_POSITION_X;
        this._quildDirect.y = ARE_IMG_GUILDDIRECT_POSITION_Y;

        var townData = new AreaImgData(ARE_TOWN, townsImg);
        var dangionData = new AreaImgData(ARE_DANGION, dangionsImg);
        var otherData = new AreaImgData(ARE_OTHER, othersImg);
        townData._selectIndex = 1;
        this._townImgAndDanAndOtherImgList = [];
        this._townImgAndDanAndOtherImgList.push(townData);
        this._townImgAndDanAndOtherImgList.push(dangionData);
        this._townImgAndDanAndOtherImgList.push(otherData);

        for (var i = 0; i < this._townImgAndDanAndOtherImgList.length; i++) {
            var tmpImg = this._townImgAndDanAndOtherImgList[i]._sprite;
            this._selectMapBaseSprite.addChild(tmpImg);
        }

        this._selectMapBaseSprite.addChild(this._questImg);
        this._selectMapBaseSprite.addChild(this._quildDirect);

        this._optionImgDataList = [];
        var optionInfoQuestImg = new OptionImgData(FAST_TRAVEL_IMG_QUEST, this._questImg);
        var optionInfoGuildImg = new OptionImgData(FAST_TRAVEL_IMG_GUILD, this._quildDirect);
        this._optionImgDataList.push(optionInfoQuestImg);
        this._optionImgDataList.push(optionInfoGuildImg);

        // TODO
        // if (this._townList && this._townList.length > 0) {
        //     var test = this;
        //     // this._iconimgList = new Array();
        //     // for (var j = 0 ; j < this._townList.length ;j++){
        //     //     var iconImg = new Sprite();
        //     //     this._iconimgList.push(iconImg);
        //     //     iconImg.bitmap = loadBitmapByPluginFolder(this._townList[j]._iconImgName);
        //     //     this._field.addChild(iconImg);
        //     //     iconImg.x = Number(this._townList[j]._positionx);
        //     //     iconImg.y = Number(this._townList[j]._positiony);
        //     // }
        //     this._townList.forEach(function(value){
        //         var iconImg = new Sprite();
        //         iconImg.bitmap = loadBitmapByPluginFolder(value._iconImgName);
        //         test._iconImgBase.addChild(iconImg);
        //         iconImg.x = Number(value._positionx);
        //         iconImg.y = Number(value._positiony);
        //     });
        // }

    };

    // マップの各種ウィンドウをクリックした時の処理
    Scene_D_FastTravel.prototype.mapOKClick = function (regionId, areaNo) {
        var result = false;
        var tmpData = 0;
        var mapId = 0;
        var entrancePointX = 0;
        var entrancePointY = 0;
        var direction = 0;
        this._mapWindowList.some(function (mapWindow) {
            if (Number(mapWindow._regionId) === Number(regionId) && Number(mapWindow._areaNo) === Number(areaNo)) {
                tmpData = mapWindow.getSelectAreaData();
                mapId = Number(tmpData._mapId);
                entrancePointX = Number(tmpData._entrancePointX);
                entrancePointY = Number(tmpData._entrancePointY);
                direction = tmpData._direction;
                result = true;
                return true;
            } else {
                return false;
            }
        });

        if (result) {
            this._okClickFadeFlag = true;
            this.startFadeOut(60);
            // Number型になっていないと正常に遷移できない。
            // KMSミニマップ
            $gameSystem.setMinimapEnabled(true);
            SceneManager.setFastTravelpopAfeterFlag(true);
            var bMapId = $gameMap.mapId();
            var dMap = $dataMap;
            var eventId = 0;
            for (var i = 0; i < dMap.events.length; i++) {
                if (dMap.events[i] && dMap.events[i] != null) {
                    if (dMap.events[i].note != "" && dMap.events[i].note.indexOf("<DOBBY_PAR_BGM>") != -1) {
                        eventId = dMap.events[i].id;
                        break;
                    }
                }

            }

            // 移動先が同じマップの場合、BGMを流す並列処理を一度元に戻す。
            if (Number(bMapId) === Number(mapId) && eventId != 0) {
                $gameMap.event(eventId)._erased = false;
                $gameMap.event(eventId).refresh();
            }

            // todo オープン時に削除する
            if (this.isMoveHoraseCarriageMap(mapId)) {
                $gamePlayer.setTransparent(true);
                $gameSystem.setMinimapEnabled(false);
                this.changeSwitchWithMove();
                $gamePlayer.reserveTransfer(SD_DUMMY_HORSE_CARRIAGE_MAP, 0, 0, 1, 0);
            } else {
                this.changeSwitchWithMove();
                $gamePlayer.reserveTransfer(mapId, entrancePointX, entrancePointY, direction, 0);
            }

            // if (isNormalOutWarldMap()) {
            AudioManager.fadeOutBgm(3);
            // }
            this.popScene();
            // メニューのクエストレポートから飛んだ状態で、ワールドマップを表示させた場合は、二重でシーンをpopさせる。
            if (!isOpenEventWarldMap()) {
                this.popScene();
            }
            if (_openSystemByMenuFlag) {
                this.popScene();
            }
            $gameScreen.startFadeIn(60);
        }
    };

    Scene_D_FastTravel.prototype.changeSwitchWithMove = function () {
        $gameSwitches.setValue(12, false); //石像スイッチ
    };

    Scene_D_FastTravel.prototype.isMoveHoraseCarriageMap = function (mapId) {
        return $gameVariables.value(SD_SEINARIO_MEIWAKUNAIRAISHA) === SD_SEINARIO_MEIWAKUNAIRAISHA_TARGET_NO && Number(mapId) === SD_PARAVIRAGE_MAP_ID;
    };

    Scene_D_FastTravel.prototype.getMapWindowDataByMapId = function (mapId) {
        var mapWindowData = this._mapWindowList.filter(function (mapWindow) {
            var areaDataList = mapWindow.getAreaDataList();
            var targetAreadata = areaDataList.filter(function (tAreaData) {
                return Number(tAreaData._mapId) === Number(mapId);
            });
            return targetAreadata
        });

        for (var i = 0; i < this._mapWindowList.length; i++) {
            var mapWindowData = this._mapWindowList[i];
            var areaDataList = mapWindowData.getAreaDataList();
            var targetAreaData = areaDataList.filter(function (areaData) {
                return Number(areaData._mapId) === Number(mapId);
            });
            if (targetAreaData && targetAreaData.length > 0) {
                return targetAreaData[0];
            }
        }

        return null;
    };

    Scene_D_FastTravel.prototype.clearReadFile = function () {
        _tmpRegionStr = null;
        _tmpTownStr = null;
        _tmpDangionStr = null;
        _tmpOtherStr = null;
    };

    Scene_D_FastTravel.prototype.start = function () {
        this.startFadeOut(1);
        if (!ismapMoveFlag()) {
            this.moveEndByMoveFlag();
        }
    };

    //================================================================================================================
    //================================================================================================================
    // メイン処理(update処理)前の初期設定はここまで↑
    //================================================================================================================
    //================================================================================================================
    Scene_D_FastTravel.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        switch (this._step) {
            case "fadein":
                this.initFadeIn();
                break;
            case "init":
                this.init();
                break;
            default:
                this.animationBackground();
                this.animationCursol();

                this.updateCommand();
                if (this._moveFlag || this._AreaWindowMoveFlag) {
                    var tmpRegionInfo = this.getSelectRegionInfo();
                    if (this._moveFlag) {
                        this.mapMove(tmpRegionInfo);
                    }

                    if (this._AreaWindowMoveFlag) {
                        this.areaWindowMove(tmpRegionInfo);
                    }
                }

                break;
        }
    };

    Scene_D_FastTravel.prototype.initFadeIn = function () {
        if (this._fadeDuration <= 0) {
            this._baseSprite.opacity += 8;
            if (this._baseSprite.opacity >= 255) {
                conpleteOpendQuestReportWindow(this);
                this.startFadeIn(30);
                this._step = "init";
            }
        }
    };
    Scene_D_FastTravel.prototype.init = function () {
        if (this._fadeDuration <= 0) {
            this._step = "exec";
        }
    };

    Scene_D_FastTravel.prototype.animationBackground = function () {
        // cnt++;
        // if (cnt > 10) {
        //     yCnt++;
        //     cnt = 0;
        // }

        // if (yCnt === 3) {
        //     yCnt=2;
        // }
        // this._back.setFrame(0,yCnt*624,816,624);

        // if (yCnt === 2) {
        //     yCnt = 0;
        // }
    };

    Scene_D_FastTravel.prototype.animationCursol = function () {

        // 表示している時だけカーソルの動きをつける。
        // if (this._cursolSprite.opacity > 0) {
        //     this._cursolSprite.setFrame(0,this._cursolSpriteYCnt*51,102,51);

        //     this._cursolSpriteCnt++;
        //     if (this._cursolSpriteCnt > 8) {
        //         this._cursolSpriteYCnt++;
        //         this._cursolSpriteCnt = 0;
        //     }

        //     if (this._cursolSpriteYCnt === 4) {
        //         this._cursolSpriteYCnt = 0;
        //     }
        // }

        this.setAreaPointCursol();
        if (this._mapAreaPointoCursol) {
            if (this._activateAreaWindow != undefined) {
                var selectTownDangionOther = this._activateAreaWindow.getSelectAreaData();
                if (selectTownDangionOther) {
                    var selectRegion = this.getSelectRegionInfo();
                    var basePosx = (Number(selectRegion._positionx) * -1);
                    var basePosy = (Number(selectRegion._positiony) * -1);
                    var posX = Number(selectTownDangionOther._positionx) - basePosx - 15;
                    if (this._mapPointCursolSprite.x != posX) {
                        this._mapPointCursolSprite.x = posX;
                    }

                    var posY = Number(selectTownDangionOther._positiony) - basePosy - 60;
                    if (this._mapPointCursolSprite.y != posY) {
                        this._mapPointCursolSprite.y = posY;
                    }

                } else {
                    if (this._mapPointCursolSprite.x != Graphics.width) {
                        this._mapPointCursolSprite.x = Graphics.width;
                    }
                    if (this._mapPointCursolSprite.y != Graphics.height) {
                        this._mapPointCursolSprite.y = Graphics.height;
                    }
                }
            }
        }
    };

    // イベントハンドラ設定
    Scene_D_FastTravel.prototype.updateCommand = function () {
        if (!this._okClickFadeFlag) {
            switch (this._nowCorsolPosition) {
                case NOW_CORSOL_POSITION_WORLDMAP:
                    this.worldMapUpdateCommond();
                    break;
                case NOW_CORSOL_POSITION_QUESTREPORT:
                    this.questReportUpdateCommondByWorldMap();
                    break;
            }

        }
    };

    Scene_D_FastTravel.prototype.bgsReplay = function (mapId) {
        switch (mapId) {
            case 678:
                AudioManager.playBgs({ "name": "Sea", "volume": 40, "pitch": 100, "pan": 0 })
                break;
        }
    };

    Scene_D_FastTravel.prototype.worldMapUpdateCommond = function () {
        switch (this._nowSelect) {
            // 地方を選択するイベントハンドラ
            case NOW_SELECT_REGION_AREA:
                var idx = this.getSelectIndex();
                if (this._upperLowFlag) {
                    if (Input.isRepeated('left') || Input.isTriggered('left')) {
                        if (idx > 0) {
                            this.setSelectIndex(idx - 1);
                            this.setSelectAreaWindow(ARE_TOWN);
                            this.moveStartByMoveFlag();
                        } else {
                            this.setSelectIndex(this._regionList.length - 1);
                            this.setSelectAreaWindow(ARE_TOWN);
                            this.moveStartByMoveFlag();
                        }
                        SoundManager.playCursor();
                    } else if (Input.isRepeated('right') || Input.isTriggered('right')) {
                        if (idx < (this._regionList.length - 1)) {
                            this.setSelectIndex(idx + 1);
                            this.setSelectAreaWindow(ARE_TOWN);
                            this.moveStartByMoveFlag();
                        } else {
                            this.setSelectIndex(0);
                            this.setSelectAreaWindow(ARE_TOWN);
                            this.moveStartByMoveFlag();
                        }
                        SoundManager.playCursor();
                    } else if (Input.isRepeated('down') || Input.isTriggered('down')) {
                        // if (upperLowFlag) {
                        //     // TODO 6つ目から下の下段に行くためする。
                        //     var tmpIdx = idx + 6;
                        //     // 現在選択できる上限を超える場合、一番ラストに選択をさせる。
                        //     if (tmpIdx  > (this._regionList.length-1) ) {
                        //         tmpIdx = this._regionList.length -1;
                        //     }
                        //     this.setSelectIndex(tmpIdx);
                        //     this.moveStartByMoveFlag();
                        // } else {
                        //     // 下段の時は、クエストレポートを選択させるようにする。
                        // }
                        this.activateOption();
                        this._upperLowFlag = false;
                        SoundManager.playCursor();
                    } else if (Input.isRepeated('up') || Input.isTriggered('up')) {
                        // if (upperLowFlag) {
                        // } else {
                        //     var tmpIdx = idx - 6;
                        //     // 現在選択できる上限を超える場合、一番ラストに選択をさせる。
                        //     if (tmpIdx < 0) {
                        //         tmpIdx = 0;
                        //     }
                        //     this.setSelectIndex(tmpIdx);
                        //     this.moveStartByMoveFlag();
                        // }
                        this.activateOption();
                        this._upperLowFlag = false;
                        SoundManager.playCursor();
                    } else if (Input.isRepeated('ok') && Input.isTriggered('ok')) {
                        this._nowSelect = NOW_SELECT_AREA;
                        this.setAreaSelectImg();
                        this.fiexdAreaWindow();
                        SoundManager.playOk();
                    } else if (isInputCancelCheck()) {
                        if ((!isOpenEventWarldMap()) || (isOpenEventWarldMap() && _openSystemByMenuFlag) || (!_notBackBeforeArea)) {
                            //if (isNormalOutWarldMap()) {
                            AudioManager.fadeOutBgm(3);
                            $gameSystem.replayBgm();
                            //}
                            this.popScene();
                            $gameScreen.startFadeIn(30);
                            SoundManager.playCancel();
                            this.bgsReplay($gameMap.mapId());
                        }
                        // } else if(Input.isRepeated('M') && Input.isTriggered('M')){
                        //     this.actvateQuestReport();
                        // } else if (TouchInput.isTriggered()) {
                        //     this.touchInputCheck();
                    }
                } else {
                    if (Input.isRepeated('left') || Input.isTriggered('left')) {
                        this.setSelectIndex(-1);
                        SoundManager.playCursor();
                    } else if (Input.isRepeated('right') || Input.isTriggered('right')) {
                        this.setSelectIndex(1);
                        SoundManager.playCursor();
                    } else if ((Input.isRepeated('up') || Input.isTriggered('up')) || (Input.isRepeated('down') || Input.isTriggered('down'))) {
                        this.deActivateOption();
                        this._upperLowFlag = true;
                        SoundManager.playCursor();
                    } else if (Input.isRepeated('ok') || Input.isTriggered('ok')) {
                        this.okOptionButton();
                        SoundManager.playOk();
                    } else if (isInputCancelCheck()) {
                        if ((!isOpenEventWarldMap()) || (isOpenEventWarldMap() && _openSystemByMenuFlag) || (!_notBackBeforeArea)) {
                            //if (isNormalOutWarldMap()) {
                            AudioManager.fadeOutBgm(3);
                            $gameSystem.replayBgm();
                            //}
                            this.popScene();
                            $gameScreen.startFadeIn(30);
                            SoundManager.playCancel();
                        }
                    }
                }

                break;
            // 地方内の街/ダンジョン/その他を選択するイベントハンドラ
            case NOW_SELECT_AREA:
                var idx = this.getSelectAreaImgIndex();
                if (Input.isRepeated('left') || Input.isTriggered('left')) {
                    if (idx > 0) {
                        this.setAreaIndexImg(idx - 1);
                    } else {
                        this.setAreaIndexImg(this._townImgAndDanAndOtherImgList.length - 1);
                    }
                    SoundManager.playCursor();
                } else if (Input.isRepeated('right') || Input.isTriggered('right')) {
                    if (idx < (this._townImgAndDanAndOtherImgList.length - 1)) {
                        this.setAreaIndexImg(idx + 1);
                    } else {
                        this.setAreaIndexImg(0);
                    }
                    SoundManager.playCursor();
                } else if (Input.isRepeated('down') || Input.isTriggered('down')) {
                } else if (Input.isRepeated('up') || Input.isTriggered('up')) {
                } else if (Input.isRepeated('ok') && Input.isTriggered('ok')) {
                } else if (isInputCancelCheck()) {
                    this._nowSelect = NOW_SELECT_REGION_AREA;
                    this.fiexdAreaWindow();
                    this.setRegionSelect();
                    this.deactivateSelectAreaWindow();
                    SoundManager.playCancel();
                    // } else if(Input.isRepeated('M') && Input.isTriggered('M')){
                    //     this.actvateQuestReport();
                    // } else if (TouchInput.isTriggered()) {
                    //     this.touchInputCheck();
                }
                break;
        }

    };

    Scene_D_FastTravel.prototype.activateOption = function () {
        var optionData = getOptionTypeData(this._optionImgDataList, FAST_TRAVEL_IMG_QUEST);
        this._cursolSprite.x = optionData._sprite.x + (Math.floor(optionData._sprite.width / 2) - Math.floor(this._cursolSprite.width / 2));
        this._cursolSprite.y = optionData._sprite.y + optionData._sprite.height + SD_FT_CURSOL_ADUJST_Y;
        this._regionselectCursolSprite.opacity = 0;
        this._selectOptionIndex = FAST_TRAVEL_IMG_QUEST;
    };

    Scene_D_FastTravel.prototype.deActivateOption = function () {
        var regionInfo = this.getSelectRegionInfo();
        this._cursolSprite.x = regionInfo._rd_sprite.x + (Math.floor(regionInfo._rd_sprite.width / 2) - Math.floor(this._cursolSprite.width / 2));
        this._cursolSprite.y = regionInfo._rd_sprite.y + regionInfo._rd_sprite.height + SD_FT_CURSOL_ADUJST_Y;
        this._regionselectCursolSprite.opacity = 255;
        this._regionselectCursolSprite.x = regionInfo._rd_sprite.x;
        this._regionselectCursolSprite.y = regionInfo._rd_sprite.y;
    };

    Scene_D_FastTravel.prototype.okOptionButton = function () {
        var targetOptionButton = this._optionImgDataList[this._selectOptionIndex];
        switch (targetOptionButton._optionType) {
            case FAST_TRAVEL_IMG_QUEST:
                this.actvateQuestReport();
                break;
            case FAST_TRAVEL_IMG_GUILD:
                var bMapId = $gameMap.mapId();
                this._okClickFadeFlag = true;
                var mapData = this.getMapWindowDataByMapId(FAST_TRAVEL_GUILD_MAPID);
                this.startFadeOut(60);

                var dMap = $dataMap;
                var eventId = 0;
                for (var i = 0; i < dMap.events.length; i++) {
                    if (dMap.events[i] && dMap.events[i] != null) {
                        if (dMap.events[i].note != "" && dMap.events[i].note.indexOf("<DOBBY_PAR_BGM>") != -1) {
                            eventId = dMap.events[i].id;
                            break;
                        }
                    }
                }

                // 移動先が同じマップの場合、BGMを流す並列処理を一度元に戻す。
                if (Number(bMapId) === Number(FAST_TRAVEL_GUILD_MAPID) && eventId != 0) {
                    $gameMap.event(eventId)._erased = false;
                    $gameMap.event(eventId).refresh();
                }

                // KMSミニマップ
                $gameSystem.setMinimapEnabled(true);
                $gamePlayer.reserveTransfer(FAST_TRAVEL_GUILD_MAPID, Number(mapData._entrancePointX), Number(mapData._entrancePointY), Number(mapData._direction), 0);
                //if (isNormalOutWarldMap()) {
                AudioManager.fadeOutBgm(3);
                //}
                //$gamePlayer.reserveTransfer(FAST_TRAVEL_GUILD_MAPID, 0, 0, 0, 0);
                this.popScene();

                // メニューのクエストレポートから飛んだ状態で、ワールドマップを表示させた場合は、二重でシーンをpopさせる。
                if (!isOpenEventWarldMap()) {
                    this.popScene();
                }
                if (_openSystemByMenuFlag) {
                    this.popScene();
                }

                $gameScreen.startFadeIn(60);

                break;
        }
    };

    // クエストレポートでキャンセル（esc）を押した時
    // クエストレポート指令のキャンセルもここで制御
    Scene_D_FastTravel.prototype.questReportUpdateCommondByWorldMap = function () {
        if (this._questReportListlWindow.isOpenAndActive()) {
            if ((isInputCancelCheck()) || (Input.isRepeated('M') && Input.isTriggered('M'))) {
                this.deActvateQuestReport();
                SoundManager.playCancel();
            }
        } else if (this._questOrderListWindow.isOpenAndActive()) {
            if (isInputCancelCheck()) {
                // クエスト指令の選択をキャンセルした場合
                this._questOrderListWindow.select(-1);
                this._questOrderListWindow.deactivate();
                this._questReportListlWindow.activate();
            }
        }

    };

    // マウスでクリックした場合の挙動。
    Scene_D_FastTravel.prototype.touchInputCheck = function () {
        // ワールドマップを選択している状態
        if (this._nowCorsolPosition === NOW_CORSOL_POSITION_WORLDMAP) {
            for (var i = 0; i < this._regionList.length; i++) {
                if (this.isTouch(this._regionList[i]._rd_sprite)) {
                    this._nowSelect = NOW_SELECT_REGION_AREA;
                    this.setSelectIndex(i);
                    this.setRegionSelect();
                    this.deactivateSelectAreaWindow();
                    this.moveStartByMoveFlag();
                    break;
                }
            }

            for (var i = 0; i < this._townImgAndDanAndOtherImgList.length; i++) {
                if (this.isTouch(this._townImgAndDanAndOtherImgList[i]._sprite)) {
                    this._nowSelect = NOW_SELECT_AREA;
                    this.setAreaIndexImg(i);
                    this.setAreaSelectImg();
                    break;
                }
            }

            if (this.isTouch(this._questImg)) {
                this.actvateQuestReport();
            }
        } else {

        }
    };
    // クエストレポートをアクティブにする星r
    Scene_D_FastTravel.prototype.actvateQuestReport = function () {
        this._nowCorsolPosition = NOW_CORSOL_POSITION_QUESTREPORT;
        this._cursolSprite.opacity = 0;
        this._regionselectCursolSprite.opacity = 0;
        if (this._nowSelect === NOW_SELECT_AREA) {
            this._areaWindowSelectIdx = this.getActivateAreaWindow().index();
        }
        this.deactivateSelectAreaWindow();
        openQuestReportTmp(this);
    };

    // ワールドマップで使用する。
    Scene_D_FastTravel.prototype.deActvateQuestReport = function () {
        closeQuestReortWindowTmp(this)
        this._nowCorsolPosition = NOW_CORSOL_POSITION_WORLDMAP;
        if (this._nowSelect === NOW_SELECT_REGION_AREA) {
            //this.fiexdAreaWindow();
            //this.setRegionSelect();
        } else {
            this.activateSelectAreaWindow();
            if (this._nowSelect === NOW_SELECT_AREA) {
                this.getActivateAreaWindow().select(this._areaWindowSelectIdx)
                this._areaWindowSelectIdx = 0;
            }
        }

        this._cursolSprite.opacity = 255;
        this._regionselectCursolSprite.opacity = 255;

    };

    // 現在選択されているエリア（街/ダンジョン/その他）のウィンドウをアクティブにする処理
    Scene_D_FastTravel.prototype.activateSelectAreaWindow = function () {
        var tmpSelectArea = this.getSelectAreaInfoImg();
        var selectRegion = this.getSelectRegionInfo();
        selectRegion._townWindow.deactivate();
        selectRegion._townWindow.select(-1);
        selectRegion._dangionWindow.deactivate();
        selectRegion._dangionWindow.select(-1);
        selectRegion._otherWindow.deactivate();
        selectRegion._dangionWindow.select(-1);
        switch (tmpSelectArea._areaNo) {
            case ARE_TOWN:
                selectRegion._townWindow.activate();
                selectRegion._townWindow.select(0);
                break;
            case ARE_DANGION:
                selectRegion._dangionWindow.activate();
                selectRegion._dangionWindow.select(0);
                break;
            case ARE_OTHER:
                selectRegion._otherWindow.activate();
                selectRegion._otherWindow.select(0);
                break;
        }

    };

    // ウィンドウ全てをデアクティブ（否選択状態にする。）
    Scene_D_FastTravel.prototype.deactivateSelectAreaWindow = function () {
        for (var i = 0; i < this._regionList.length; i++) {
            var tmpRegion = this._regionList[i];
            tmpRegion._townWindow.deactivate();
            tmpRegion._townWindow.select(-1);
            tmpRegion._dangionWindow.deactivate();
            tmpRegion._dangionWindow.select(-1);
            tmpRegion._otherWindow.deactivate();
            tmpRegion._otherWindow.select(-1);
        }
    };

    Scene_D_FastTravel.prototype.setRegionSelect = function () {
        var tempIndex = this.getSelectIndex();
        let selectedRegion = this._regionList[tempIndex];
        this._cursolSprite.x = selectedRegion._rd_sprite.x + (Math.floor(selectedRegion._rd_sprite.width / 2) - Math.floor(this._cursolSprite.width / 2));
        this._cursolSprite.y = selectedRegion._rd_sprite.y + selectedRegion._rd_sprite.height + SD_FT_CURSOL_ADUJST_Y;
        this._regionselectCursolSprite.x = selectedRegion._rd_sprite.x;
        this._regionselectCursolSprite.y = selectedRegion._rd_sprite.y;
    };

    // 街/ダンジョン/その他のウィンドウを再表示させるための処理
    Scene_D_FastTravel.prototype.moveAreaWindow = function () {
        // 初期化
        this.resetAllAreaWindow();
        this._AreaWindowMoveFlag = true;
    };

    // 街/ダンジョン/その他のウィンドウを一度初期位置に戻すための処理
    Scene_D_FastTravel.prototype.resetAllAreaWindow = function () {
        // 初期化
        for (var i = 0; i < this._regionList.length; i++) {
            var tmpRegion = this._regionList[i];
            tmpRegion._townWindow.x = DISP_W;
            tmpRegion._dangionWindow.x = DISP_W;
            tmpRegion._otherWindow.x = DISP_W;
        }
        this._backSprite.x = DISP_W;
    };

    Scene_D_FastTravel.prototype.getSelectIndex = function () {
        for (var i = 0; i < this._regionList.length; i++) {
            if (this._regionList[i]._selectIndex === 1) {
                return i;
            }
        }
        return 0;
    };

    // クリックおよびキーボードの左/右で地方が選ばれる時の処理
    Scene_D_FastTravel.prototype.setSelectIndex = function (idx) {
        if (this._upperLowFlag) {
            for (var i = 0; i < this._regionList.length; i++) {
                this._regionList[i]._selectIndex = 0;
            }
            let selectedRegion = this._regionList[idx];
            this._regionList[idx]._selectIndex = 1;
            this._cursolSprite.x = selectedRegion._rd_sprite.x + (Math.floor(selectedRegion._rd_sprite.width / 2) - Math.floor(this._cursolSprite.width / 2));
            this._cursolSprite.y = selectedRegion._rd_sprite.y + selectedRegion._rd_sprite.height + SD_FT_CURSOL_ADUJST_Y;
            this._regionselectCursolSprite.x = selectedRegion._rd_sprite.x;
            this._regionselectCursolSprite.y = selectedRegion._rd_sprite.y;

            this.moveAreaWindow();
        } else {
            var nextIndex = this._selectOptionIndex + idx;
            if (nextIndex > (this._optionImgDataList.length - 1)) {
                nextIndex = 0;
            } else if (nextIndex < 0) {
                nextIndex = (this._optionImgDataList.length - 1);
            }
            this._selectOptionIndex = nextIndex;
            var optionData = this._optionImgDataList[nextIndex];
            this._cursolSprite.x = optionData._sprite.x + (Math.floor(optionData._sprite.width / 2) - Math.floor(this._cursolSprite.width / 2));
            this._cursolSprite.y = optionData._sprite.y + optionData._sprite.height + SD_FT_CURSOL_ADUJST_Y;
        }
    };

    Scene_D_FastTravel.prototype.getSelectRegionInfo = function () {
        for (var i = 0; i < this._regionList.length; i++) {
            if (this._regionList[i]._selectIndex === 1) {
                return this._regionList[i];
            }
        }
        alert("選択されている地方がありません。管理者に連絡をしてください。：getSelectRegionInfo");
        this.popScene();
        return null;
    };

    // 街/ダンジョン/その他が選ばれる処理
    // エリア（街/ダンジョン/その他）を選択している状態で左/右を押した時の処理
    Scene_D_FastTravel.prototype.setAreaIndexImg = function (idx) {
        for (var i = 0; i < this._townImgAndDanAndOtherImgList.length; i++) {
            this._townImgAndDanAndOtherImgList[i]._selectIndex = 0;
        }
        this._townImgAndDanAndOtherImgList[idx]._selectIndex = 1;
        // console.log(this._townImgAndDanAndOtherImgList[idx]._selectIndex);
        this._cursolSprite.x = this._townImgAndDanAndOtherImgList[idx]._sprite.x + (Math.floor(this._townImgAndDanAndOtherImgList[idx]._sprite.width / 2) - Math.floor(this._cursolSprite.width / 2));
        this._cursolSprite.y = this._townImgAndDanAndOtherImgList[idx]._sprite.y + this._townImgAndDanAndOtherImgList[idx]._sprite.height + SD_FT_CURSOL_ADUJST_Y;
        this.moveAreaWindow();
        this.activateSelectAreaWindow();
    };

    // 地方でOKを押した時に呼ばれる処理
    // カーソルをエリア（街/ダンジョン/その他）に合わせるための処理
    Scene_D_FastTravel.prototype.setAreaSelectImg = function () {
        var tmpSelectArea = this.getSelectAreaInfoImg();
        this.settingCursolPositionByArea(tmpSelectArea);
        this.activateSelectAreaWindow();
    };

    Scene_D_FastTravel.prototype.settingCursolPositionByArea = function (tmpSelectArea) {
        var tmpIdx = 0;
        switch (tmpSelectArea._areaNo) {
            case ARE_TOWN:
                tmpIdx = 0;
                break;
            case ARE_DANGION:
                tmpIdx = 1;
                break;
            case ARE_OTHER:
                tmpIdx = 2;
                break;
        }

        // 画像の読み込みが間に合わなかった場合、固定で数値を入れる
        var areaSpriteX = this._townImgAndDanAndOtherImgList[tmpIdx]._sprite.x;
        var areaSpriteWidthHalf = (Math.floor(this._townImgAndDanAndOtherImgList[tmpIdx]._sprite.width / 2));
        var cursolSpriteWidthHalf = Math.floor(this._cursolSprite.width / 2);
        var areaSpriteY = this._townImgAndDanAndOtherImgList[tmpIdx]._sprite.y;
        var areaSoriteHeight = this._townImgAndDanAndOtherImgList[tmpIdx]._sprite.height;
        if (areaSpriteX === 0 || areaSpriteWidthHalf === 0 || cursolSpriteWidthHalf === 0 || areaSpriteY === 0 || areaSoriteHeight === 0) {
            switch (tmpSelectArea._areaNo) {
                case ARE_TOWN:
                    areaSpriteX = 591;
                    break;
                case ARE_DANGION:
                    areaSpriteX = 725;
                    break;
                case ARE_OTHER:
                    areaSpriteX = 864;
                    break;
            }

            areaSpriteWidthHalf = 64;
            cursolSpriteWidthHalf = 30;
            areaSpriteY = 119;
            areaSoriteHeight = 44;
        }

        // this._cursolSprite.x = this._townImgAndDanAndOtherImgList[tmpIdx]._sprite.x + (Math.floor(this._townImgAndDanAndOtherImgList[tmpIdx]._sprite.width/2) - Math.floor(this._cursolSprite.width/2));
        // this._cursolSprite.y = this._townImgAndDanAndOtherImgList[tmpIdx]._sprite.y + this._townImgAndDanAndOtherImgList[tmpIdx]._sprite.height + SD_FT_CURSOL_ADUJST_Y;
        this._cursolSprite.x = areaSpriteX + (areaSpriteWidthHalf - cursolSpriteWidthHalf);
        this._cursolSprite.y = areaSpriteY + areaSoriteHeight + SD_FT_CURSOL_ADUJST_Y;
    };
    Scene_D_FastTravel.prototype.getSelectAreaImgIndex = function () {
        for (var i = 0; i < this._townImgAndDanAndOtherImgList.length; i++) {
            if (this._townImgAndDanAndOtherImgList[i]._selectIndex === 1) {
                return i;
            }
        }
        return 0;
    };

    Scene_D_FastTravel.prototype.getSelectAreaInfoImg = function () {
        for (var i = 0; i < this._townImgAndDanAndOtherImgList.length; i++) {
            if (this._townImgAndDanAndOtherImgList[i]._selectIndex === 1) {
                return this._townImgAndDanAndOtherImgList[i];
            }
        }
        return alert("getSelectAreaInfo:エラーです。管理者にご連絡ください。");
    };

    // 引数で指定したエリアのウィンドウ(および選択の枠画像)を選択状態にする。
    Scene_D_FastTravel.prototype.setSelectAreaWindow = function (areaNo) {
        // 一度リセット
        for (var i = 0; i < this._townImgAndDanAndOtherImgList.length; i++) {
            this._townImgAndDanAndOtherImgList[i]._selectIndex = 0;
        }

        for (var i = 0; i < this._townImgAndDanAndOtherImgList.length; i++) {
            if (Number(this._townImgAndDanAndOtherImgList[i]._areaNo) === Number(areaNo)) {
                this._townImgAndDanAndOtherImgList[i]._selectIndex = 1;
                break;
            }
        }
    };

    Scene_D_FastTravel.prototype.getActivateAreaWindow = function () {
        var selectRegionInfo = this.getSelectRegionInfo();
        // TODO 今アクティブになっているウィンドウで見るのがいいのか、
        // areaImgで選択している情報で見るのがいいのか要検討
        // if (this._nowSelect === NOW_SELECT_AREA) {
        //     if (this.isWindowOpenAndActive(selectRegionInfo._townWindow)) {
        //         return selectRegionInfo._townWindow;
        //     } else if (this.isWindowOpenAndActive(selectRegionInfo._dangionWindow)) {
        //         return selectRegionInfo._dangionWindow;
        //     } else if (this.isWindowOpenAndActive(selectRegionInfo._otherWindow)) {
        //         return selectRegionInfo._otherWindow;
        //     }
        // }

        return this.getActivateAreaWindowByRegionData(selectRegionInfo);
    };

    Scene_D_FastTravel.prototype.getActivateAreaWindowByRegionData = function (selectRegionInfo) {
        if (this._nowSelect === NOW_SELECT_AREA) {
            if (this.isWindowOpenAndActive(selectRegionInfo._townWindow)) {
                return selectRegionInfo._townWindow;
            } else if (this.isWindowOpenAndActive(selectRegionInfo._dangionWindow)) {
                return selectRegionInfo._dangionWindow;
            } else if (this.isWindowOpenAndActive(selectRegionInfo._otherWindow)) {
                return selectRegionInfo._otherWindow;
            }
        }

        return null;
    };

    Scene_D_FastTravel.prototype.isWindowOpenAndActive = function (tmpWindow) {
        return (tmpWindow != undefined && tmpWindow.isOpenAndActive());
    };

    Scene_D_FastTravel.prototype.isTouch = function (sprite) {
        var x = sprite.x;
        var y = sprite.y;
        var imgWidth = sprite.width;
        var imgHeight = sprite.height;
        if (TouchInput.x >= x && TouchInput.x <= (x + imgWidth) && TouchInput.y >= y && TouchInput.y <= (y + imgHeight)) {
            return true;
        }
        return false;
    };

    Scene_D_FastTravel.prototype.mapMove = function (selectRegion) {

        var mapx = this._field.x;
        var mapy = this._field.y;

        var absx = Math.abs(selectRegion._positionx - mapx);
        var moveSpeedx = 15;
        if (absx <= 100) {
            moveSpeedx = 2;
        } else if (absx <= 200) {
            moveSpeedx = 6;
        } else if (absx <= 300) {
            moveSpeedx = 10;
        }

        var absy = Math.abs(selectRegion._positiony - mapy);
        var moveSpeedy = 15;
        if (absy <= 100) {
            moveSpeedy = 2;
        } else if (absy <= 200) {
            moveSpeedy = 6;
        } else if (absy <= 300) {
            moveSpeedy = 10;
        }

        this._movex = (selectRegion._positionx >= mapx) ? moveSpeedx : (moveSpeedx * -1);
        this._movey = (selectRegion._positiony >= mapy) ? moveSpeedy : (moveSpeedy * -1);

        var stopxFlag = (mapx >= (selectRegion._positionx - 3) && mapx <= (selectRegion._positionx + 3));
        if (!stopxFlag) {
            this._field.x += this._movex;
        } else {
            this._field.x = selectRegion._positionx;
        }

        var stopyFlag = (mapy >= (selectRegion._positiony - 3) && mapy <= (selectRegion._positiony + 3));
        if (!stopyFlag) {
            this._field.y += this._movey;
        } else {
            this._field.y = selectRegion._positiony;
        }

        if (stopxFlag && stopyFlag) {
            this.moveEndByMoveFlag();
        }
    };

    Scene_D_FastTravel.prototype.moveStartByMoveFlag = function () {
        this.setMoveFlag(true);
        // マップの画像移動開始時にはマップ上のエリアを指し示す画像は非表示にする。（画面外に出すことで実質非表示）
        this._mapPointCursolSprite.x = Graphics.width;
        this._mapPointCursolSprite.y = Graphics.height;
        this._activateAreaWindow = undefined;
        this.removeIconImg();
    };

    Scene_D_FastTravel.prototype.removeIconImg = function () {
        if (this._areaIconImgList) {
            var tmpThisObj = this;
            this._areaIconImgList.forEach(function (value) {
                tmpThisObj._iconImgBase.removeChild(value)
            });

            this._areaIconImgList = null;
            this._areaIconImgList = undefined;
        }
    };

    Scene_D_FastTravel.prototype.moveEndByMoveFlag = function () {
        this.setMoveFlag(false);
        var selectRegion = this.getSelectRegionInfo();
        this._activateAreaWindow = this.getActivateAreaWindowByRegionData(selectRegion);
        //this._activateAreaWindow = this.getActivateAreaWindow();
        this.addIconImg(selectRegion);
    };

    Scene_D_FastTravel.prototype.addIconImg = function (selectRegion) {
        if (!this._areaIconImgList) {
            this._areaIconImgList = [];
            this.setIconImg(selectRegion._townWindow);
            this.setIconImg(selectRegion._dangionWindow);
            this.setIconImg(selectRegion._otherWindow);
        }
    };

    Scene_D_FastTravel.prototype.setIconImg = function (areaWindow) {
        if (areaWindow._areaDataList && areaWindow._areaDataList.length > 0) {
            var areaList = areaWindow._areaDataList;
            for (var i = 0; i < areaList.length; i++) {
                var areaSprite = new Sprite();
                areaSprite.bitmap = loadBitmapByPluginFolder(areaList[i]._iconImgName);
                this._iconImgBase.addChild(areaSprite);
                areaSprite.x = Number(areaList[i]._positionx);
                areaSprite.y = Number(areaList[i]._positiony);
                this._areaIconImgList.push(areaSprite);
            }
        }
    };

    Scene_D_FastTravel.prototype.setMoveFlag = function (flag) {
        this._moveFlag = flag;
    };

    Scene_D_FastTravel.prototype.setAreaPointCursol = function () {
        // Updateでずっと回しているので、一度だけで処理が住むように考えないといけない。
        if (!this._moveFlag && this._nowSelect === NOW_SELECT_AREA) {
            this._activateAreaWindow = this.getActivateAreaWindow();
            if (!this._mapAreaPointoCursol) {
                this._mapAreaPointoCursol = true;
            }
            //this._mapAreaPointoCursol = true;
        } else {
            if (this._mapAreaPointoCursol) {
                this._mapAreaPointoCursol = false;
            }
            //this._mapAreaPointoCursol = false;
            if (this._activateAreaWindow) {
                this._activateAreaWindow = undefined;
            }
            //this._activateAreaWindow = undefined;
            if (Number(this._mapPointCursolSprite.x) != Graphics.width) {
                this._mapPointCursolSprite.x = Graphics.width;
            }

            if (Number(this._mapPointCursolSprite.y) != Graphics.height) {
                this._mapPointCursolSprite.y = Graphics.height;
            }
            // this._mapPointCursolSprite.x = Graphics.width;
            // this._mapPointCursolSprite.y = Graphics.height;
        }
    };

    // 街/ダンジョン/その他のウィンドウを画面内に移動表示させる処理
    Scene_D_FastTravel.prototype.areaWindowMove = function (selectRegion) {
        var tmpSelectArea = this.getSelectAreaInfoImg();
        var tmpWindow = null;
        switch (tmpSelectArea._areaNo) {
            case ARE_TOWN:
                tmpWindow = selectRegion._townWindow;
                break;
            case ARE_DANGION:
                tmpWindow = selectRegion._dangionWindow;
                break;
            case ARE_OTHER:
                tmpWindow = selectRegion._otherWindow;
                break;
        }

        // tmpWindow.x -= ARE_WINDOW_MOVE_SPEED;
        // this._backSprite.x -= ARE_WINDOW_MOVE_SPEED;
        // if (tmpWindow.x <= ARE_WINDOW_POSITION_X) {
        this._AreaWindowMoveFlag = false;
        tmpWindow.x = ARE_WINDOW_POSITION_X;
        this._backSprite.x = tmpWindow.x;
        // }
    };

    Scene_D_FastTravel.prototype.resetRegionMap = function () {
        var selectRegion = this.getSelectRegionInfo();
        this._AreaWindowMoveFlag = false;
        this._backSprite.x = selectRegion._townWindow.x;
    };

    Scene_D_FastTravel.prototype.fiexdAreaWindow = function () {
        var tmpSelectArea = this.getSelectAreaInfoImg();
        var selectRegion = this.getSelectRegionInfo();
        var tmpWindow = null;
        switch (tmpSelectArea._areaNo) {
            case ARE_TOWN:
                tmpWindow = selectRegion._townWindow;
                break;
            case ARE_DANGION:
                tmpWindow = selectRegion._dangionWindow;
                break;
            case ARE_OTHER:
                tmpWindow = selectRegion._otherWindow;
                break;
        }

        tmpWindow.x = ARE_WINDOW_POSITION_X;
        this._backSprite.x = tmpWindow.x;
        this._AreaWindowMoveFlag = false;
    };

    ///////////////////////////////////////////////////////////////////////////////
    // メニュー画面用のクエストレポートのScene（メニューから開くか要相談）
    ///////////////////////////////////////////////////////////////////////////////

    function Scene_D_Menu_QuestReportScene() {
        this.initialize.apply(this, arguments);
    }

    Scene_D_Menu_QuestReportScene.prototype = Object.create(Scene_Base.prototype);
    Scene_D_Menu_QuestReportScene.prototype.constructor = Scene_D_Menu_QuestReportScene;

    Scene_D_Menu_QuestReportScene.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        //loadQuestReportCSVFile();
        //loadquestReportOrderCSVFile();
        this._step = "init";
    };

    Scene_D_Menu_QuestReportScene.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createQuestReportWindow();
    };

    Scene_D_Menu_QuestReportScene.prototype.createQuestReportWindow = function () {
        var str = dobby_loadAndGetQuestReportCsvFile();
        while (!convertQuestReportCsvToArray(this, QUEST_ORDER_TARGET_SCENE_QUESTREPORT, str)) {
        }
        //while(!convertQuestReportCsvToArray(this, QUEST_ORDER_TARGET_SCENE_QUESTREPORT)){}
        var oStr = dobby_loadAndQuestReportOrderCSVFile();
        while (!convertQuestReportOrderCsvToArray(this, oStr)) {
        }

        //while(!convertQuestReportOrderCsvToArray(this)){}
        this.createBackground();
        // これがないとWindowを作ることができない
        Scene_Base.prototype.createWindowLayer.call(this);
        Scene_Base.prototype.createAddWindowLayerForward.call(this);
        createQuestReport(this);
        closeQuestReortWindowTmp(this);
        updateWindowQuestReportScene(this, false);
        this._questOrderListWindow.setHandler('ok', this.orderClickMapMove.bind(this));
    };

    Scene_D_Menu_QuestReportScene.prototype.createBackground = function () {
        this._baseSprite = new Sprite();
        this.addChild(this._baseSprite);
        // this._backgroundSprite = new Sprite();
        // this._backgroundSprite.bitmap = loadBitmapByQuestSystemPluginFolder(IMG_QUESTREPORT_BACKGROUND);
        // this._backgroundSprite.x = 0;
        // this._backgroundSprite.y = 0;
        // this._baseSprite.addChild(this._backgroundSprite);

    };

    Scene_D_Menu_QuestReportScene.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        switch (this._step) {
            case "init":
                openQuestReportTmp(this);
                conpleteOpendQuestReportWindow(this);
                this._step = "exec";
                break;
            case "exec":
                if (this._questReportListlWindow.isOpenAndActive()) {
                    //if (Input.isRepeated('cancel') && Input.isTriggered('cancel')) {
                    if (isInputCancelCheck()) {
                        this.popScene();
                        SoundManager.playCancel();
                    }
                } else if (this._questOrderListWindow.isOpenAndActive()) {
                    // 指令ウィンドウを操作している時と、そうでないときで処理を分ける。
                    //if (Input.isRepeated('cancel') && Input.isTriggered('cancel')) {
                    if (isInputCancelCheck()) {
                        SoundManager.playCancel();
                        this._questOrderListWindow.select(0);
                        this._questOrderListWindow.deactivate();
                        this._questReportListlWindow.activate();
                    }

                }
                break;
        }

    };

    Scene_D_Menu_QuestReportScene.prototype.orderClickMapMove = function () {
        var fastTravelswitch = true;
        if (enableFasttravelSwitchNo != 0) {
            if ($gameSwitches.value(enableFasttravelSwitchNo)) {
                fastTravelswitch = false;
            }
        }

        if (invalidFasttravelVarivable && invalidFasttravelVarivable > 0 && invalidFasttravelNo && invalidFasttravelNo > 0 && $gameVariables.value(Number(invalidFasttravelVarivable)) < invalidFasttravelNo) {
            if ((this._alertTutorialWindow && this._alertTutorialWindow != null)) {
                if (!this._alertTutorialWindow._animationFlag) {
                    this._alertTutorialWindow.startAnimation();
                }
            } else {
                this._alertTutorialWindow = new D_Window_Common_Alert_Window(500, 200, this);
                this._alertTutorialWindow.setInitialize(this._alertTutorialWindow);
                this.addChild(this._alertTutorialWindow);
                this._alertTutorialWindow.setTxt(SD_MSG_INVALID_FASTTRAVEL_BY_NOW);
                this._alertTutorialWindow.startAnimation();
            }

            this._questOrderListWindow.activate();

        } else {
            if ((this._alertTutorialWindow && this._alertTutorialWindow != null)) {
                this._alertTutorialWindow = null;
                this._alertTutorialWindow = undefined;
            }

            if (isInvalidFastTravel()) {
                invalidFasttravelMessage(this, SD_MSG_INVALID_FASTTRAVEL_BY_FILED);
                this._questOrderListWindow.activate();
                return;
            }

            if (fastTravelswitch) {
                _questreportOrderByMenu = this._questOrderListWindow.getSelectedOrder();
                if (isNaN(_questreportOrderByMenu._mapId)) {
                    invalidFasttravelMessage(this, SD_MSG_INVALID_FASTTRAVEL_BY_OREDER);
                    this._questOrderListWindow.activate();
                } else {
                    SceneManager.push(Scene_D_FastTravel);
                }
            } else {
                invalidFasttravelMessage(this, SD_MSG_INVALID_FASTTRAVEL_BY_FILED);
                this._questOrderListWindow.activate();
            }
        }
    };

    // ==================================================================
    // ==================================================================
    // シーンの設定はここまで
    // ==================================================================
    // ==================================================================
    // 街/ダンジョン/その他の表示用ウィンドウ
    function Window_townDangionOtherWindow() {
        this.initialize.apply(this, arguments);
    }

    // 街、ダンジョン、その他のウィンドウ情報
    Window_townDangionOtherWindow.prototype = Object.create(Window_Selectable.prototype);
    Window_townDangionOtherWindow.prototype.constructor = Window_townDangionOtherWindow;

    Window_townDangionOtherWindow.prototype.initialize = function (regionId, areaNo, inputAreaDataList, test) {
        this._areaNo = areaNo;
        this._regionId = regionId;
        this._areaDataList = inputAreaDataList;
        Window_Selectable.prototype.initialize.call(this, DISP_W, ARE_WINDOW_POSITION_Y, ARE_WINDOW_POSITION_WIDTH, ARE_WINDOW_POSITION_HEIGHT);
        this.opacity = 0;
        this.refresh();
    };

    Window_townDangionOtherWindow.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
        return 1;
    };

    Window_townDangionOtherWindow.prototype.maxCols = function () {
        return 1;
    };

    Window_townDangionOtherWindow.prototype.maxItems = function () {
        return (this._areaDataList != null && this._areaDataList != undefined && this._areaDataList.length > 0) ? this._areaDataList.length : 0;
    };

    Window_townDangionOtherWindow.prototype.drawItem = function (index) {
        if (this._areaDataList) {
            var item = this._areaDataList[index];
            var rect = this.itemRect(index);
            this.drawText(item._name, rect.x, rect.y, this.width);
        }
    };

    Window_townDangionOtherWindow.prototype.getAreaDataList = function () {
        return this._areaDataList;
    };

    Window_townDangionOtherWindow.prototype.getSelectAreaData = function () {
        return this._areaDataList[this.index()];
    };

    Window_townDangionOtherWindow.prototype.processOk = function () {
        if (SceneManager._scene._backSprite.x > ARE_WINDOW_POSITION_X) return
        if (this.isCurrentItemEnabled()) {
            this.playOkSound();
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    // ==========================================================================================
    // クエストレポート関連のウィンドウ作成
    // ==========================================================================================
    // クエストのリスト表示用ウィンドウ
    function Window_questReport_Title_Window() {
        this.initialize.apply(this, arguments);
    }

    Window_questReport_Title_Window.prototype = Object.create(Window_Base.prototype);
    Window_questReport_Title_Window.prototype.constructor = Window_questReport_Title_Window;

    Window_questReport_Title_Window.prototype.initialize = function (allCnt, clearCnt, notCnt) {
        let xPos = 300;
        Window_Base.prototype.initialize.call(this, xPos, -10, Graphics.width - xPos, 90);
        this.drawText("Total: " + allCnt + "　Completed: " + clearCnt + "　In Progress: " + notCnt, 10, 10, 650);
    };

    Window_questReport_Title_Window.prototype.setTitle = function (text) {
        if (this.contents) {
            this.contents.clear();
        }
        this.drawText(text, 10, 10, this.width, this.height);
    };

    Window_questReport_Title_Window.prototype.update = function () {
        Window_Base.prototype.update.call(this);
    };

    // クエストレポートのリスト表示用ウィンドウ
    function Window_questReport_List_Window() {
        this.initialize.apply(this, arguments);
    }

    Window_questReport_List_Window.prototype = Object.create(Window_Selectable.prototype);
    Window_questReport_List_Window.prototype.constructor = Window_questReport_List_Window;

    Window_questReport_List_Window.prototype.initialize = function (questReportList, questDetailWindow, questReportTitleWindow) {
        Window_Selectable.prototype.initialize.call(this, 0, 100, QUEST_REPORT_QUESTLIST_WIDTH, QUEST_REPORT_QUESTLIST_HEIGHT);
        this._questReportList = questReportList;
        this._questDetailWindow = questDetailWindow;
        //        this._questReportTitleWindow = questReportTitleWindow;
        this._newImg = new Sprite();
        this._newImg.bitmap = loadBitmapByPluginFolder(IMG_QUESTREPORT_NEW);
        this._newImg.opacity = 0;
        this.addChild(this._newImg);
        this.refresh();

        if (this._questReportList != undefined && this._questReportList.length > 0) {
            this.setHandler('ok', this.questListProccesOK.bind(this));
        }
    };

    Window_questReport_List_Window.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
    };

    Window_questReport_List_Window.prototype.maxCols = function () {
        return 1;
    };

    Window_questReport_List_Window.prototype.maxItems = function () {
        return (this._questReportList != null && this._questReportList != undefined && this._questReportList.length > 0) ? this._questReportList.length : 0;
    };

    Window_questReport_List_Window.prototype.drawItem = function (index) {
        if (this._questReportList) {
            var item = this._questReportList[index];
            var rect = this.itemRect(index);
            //var isClear = $gameVariables.value(Number(item._variantNo)) === QUEST_REPORT_ORDER_FULLCOMPLETE;
            var questData = $questReportData.getQuestDataBySveData(item._questId);

            if (questData.getOrderList() === QUEST_REPORT_ORDER_FULLCOMPLETE || item._isClearonReport) {
                this.changePaintOpacity(false);
            } else {
                this.changePaintOpacity(true)
            }
            // var isClear = questData.getOrderList()  === QUEST_REPORT_ORDER_FULLCOMPLETE;

            // this.changePaintOpacity(!isClear);
            this.drawText(item._questName, rect.x + 10, rect.y, this.width);
            if (newVariableNoUseFlag && newVariableNoUseFlag === "true") {
                var tmpNewVariableNo = $gameVariables.value(Number(newVariableNo));
                if (tmpNewVariableNo > 0) {
                    //if (Number(item._variantNo) === Number(tmpNewVariableNo)) {
                    if (Number(questData.getQuestID()) === Number(tmpNewVariableNo)) {
                        this._newImg.x = rect.x + 10;
                        this._newImg.y = rect.y + 10;
                        this._newImg.opacity = 255;
                    }
                }
            }
        }
    };

    Window_questReport_List_Window.prototype.isCurrentItemEnabled = function () {
        var resultFlag = false;
        if (this._questReportList) {
            var item = this._questReportList[this.index()];
            var questData = $questReportData.getQuestDataBySveData(item._questId);
            if (Number(questData.getOrderList()) != QUEST_REPORT_ORDER_FULLCOMPLETE) {
                if (!item._isClearonReport) {
                    resultFlag = true;
                }
            }
            //return Number(questData.getOrderList()) != QUEST_REPORT_ORDER_FULLCOMPLETE;
            //return $gameVariables.value(Number(item._variantNo)) != QUEST_REPORT_ORDER_FULLCOMPLETE;
        }
        return resultFlag;
    };

    Window_questReport_List_Window.prototype.cursorDown = function (wrap) {
        Window_Selectable.prototype.cursorDown.call(this, wrap);
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        //if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
        this.reSelectQuest();
        //}
    };

    Window_questReport_List_Window.prototype.cursorUp = function (wrap) {
        Window_Selectable.prototype.cursorUp.call(this, wrap);
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        //if (index >= maxCols || (wrap && maxCols === 1)) {
        this.reSelectQuest();
        //}
    };

    // selectの処理のところにreSelectQuestの処理を入れるためにオーバーライド
    Window_questReport_List_Window.prototype.onTouch = function (triggered) {
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            } else if (this.isCursorMovable()) {
                this.select(hitIndex);
                this.reSelectQuest();
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            }
        }
        if (this.index() != lastIndex) {
            SoundManager.playCursor();
        }
    };

    Window_questReport_List_Window.prototype.questListProccesOK = function () {
        this._questDetailWindow._orderListWindow.activate();
        this._questDetailWindow._orderListWindow.select(0);
        this.deactivate();
    };

    Window_questReport_List_Window.prototype.reSelectQuest = function () {
        var tmpQuestInfo = this.getSelectedQuestInfo();
        // this._questReportTitleWindow.setTitle(tmpQuestInfo._questName);
        // QUEST_REPORT_ORDER_FULLCOMPLETE
        this._questDetailWindow.setOrder(tmpQuestInfo._questId, tmpQuestInfo._questName, tmpQuestInfo._note, tmpQuestInfo._clearCondition, tmpQuestInfo._clearReward, tmpQuestInfo._questOrderList, //$gameVariables.value(tmpQuestInfo._variantNo)
            tmpQuestInfo._isClearonReport ? QUEST_REPORT_ORDER_FULLCOMPLETE : $questReportData.getQuestDataBySveData(tmpQuestInfo._questId).getOrderList());
    };

    Window_questReport_List_Window.prototype.getSelectedQuestInfo = function () {
        return this._questReportList[this.index()];
    };

    Window_questReport_List_Window.prototype.standardFontSize = function () {
        return 15;
    };

    // クエストレポートの説明を記載するウィンドウ
    function Window_questReport_Detail_Window() {
        this.initialize.apply(this, arguments);
    }

    Window_questReport_Detail_Window.prototype = Object.create(Window_Base.prototype);
    Window_questReport_Detail_Window.prototype.constructor = Window_questReport_Detail_Window;

    Window_questReport_Detail_Window.prototype.initialize = function () {
        var windowWidth = Graphics.width - QUEST_REPORT_QUESTLIST_WIDTH - 30;
        var windowXPos = Graphics.width - windowWidth - 20;
        Window_Base.prototype.initialize.call(this, windowXPos, 100, windowWidth, QUEST_REPORT_QUESTLIST_HEIGHT);
        this._title = null;
        this._note = null;
        this._clearCondition = null;
        this._clearReward = null;
    };

    Window_questReport_Detail_Window.prototype.setOrderListWindow = function (orderListWindow) {
        this._orderListWindow = orderListWindow;
    };

    Window_questReport_Detail_Window.prototype.setOrder = function (questId, title, note, clearCondtion, clearReward, orderList, questProgressNumber) {

        if (this.contents) {
            this.contents.clear();
        }

        var notes = note.split(/\r\n|\n|\r/);
        for (var i = 0; i < notes.length; i++) {
            this.drawText(notes[i], -20, 5 + (20 * i), this.width, "center");
        }

        // this.drawTextEx(note,20,5);
        this.drawTextEx("報酬", this.width / 2 - 50, 100);
        //let textW = this.textWidth(clearReward);
        let spClearReward = clearReward.split("\n");
        for (let j = 0; j < spClearReward.length; j++) {
            let textW = this.textWidth(spClearReward[j]);
            if ("-" === spClearReward[j]) {
                this.drawTextEx(spClearReward[j], (this.width / 2) - (textW / 2) - 30, 140 + (j * 25));
            } else {
                this.drawTextEx(spClearReward[j], (this.width / 2) - (textW / 2) - 35, 140 + (j * 25));
            }

        }

        // this.drawTextEx(clearReward,(this.width/2)-(textW/2)-30,140);

        this._title = title;
        this._note = note;
        this._clearCondition = clearCondtion;
        this._clearReward = clearReward;
        var orderNowProgressList = questVariableNoSplitForOrderProgress(questProgressNumber);
        var dispOrderList = [];

        for (var i = orderNowProgressList.length - 1; i >= 0; i--) {
            var idx = (orderNowProgressList.length - 1) - i;
            if (Number(orderNowProgressList[i]) === QUEST_REPORT_ORDER_INPROGRESS || Number(orderNowProgressList[i]) === QUEST_REPORT_ORDER_COMPLETE) {
                orderList[idx]._nowProgress = Number(orderNowProgressList[i]);
                dispOrderList.push(orderList[idx]);
            }
            // 今あるリスト以上のカウント数になったら表示する指令の追加をやめる
            if ((orderList.length - 1) <= idx) {
                break;
            }
        }
        this._orderListWindow.setOrderList(dispOrderList.reverse());
    };

    Window_questReport_Detail_Window.prototype.standardFontSize = function () {
        return 20;
    };

    Window_questReport_Detail_Window.prototype.isOpenAndActive = function () {
        return this.isOpen() && this.active;
    };

    Window_questReport_Detail_Window.prototype.update = function () {
        Window_Base.prototype.update.call(this);
    };

    // 指令一覧
    function Window_OrderList_Window() {
        this.initialize.apply(this, arguments);
    }

    Window_OrderList_Window.prototype = Object.create(Window_Selectable.prototype);
    Window_OrderList_Window.prototype.constructor = Window_OrderList_Window;

    Window_OrderList_Window.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
    };

    Window_OrderList_Window.prototype.initialize = function (x, y, inwidth) {
        var windowHeight = (Graphics.height - 20) - y;
        Window_Selectable.prototype.initialize.call(this, x, y, inwidth, windowHeight);
        this._questReportListlWindow = null;
        this.refresh();
    };

    Window_OrderList_Window.prototype.setOrderList = function (orderList) {
        this._orderList = orderList;
        this.refresh();
    };

    Window_OrderList_Window.prototype.setQuestReportListlWindow = function (questReportListlWindow) {
        this._questReportListlWindow = questReportListlWindow;
    };

    Window_OrderList_Window.prototype.getSelectedOrder = function () {
        return this._orderList[this.index()];
    };

    Window_OrderList_Window.prototype.maxCols = function () {
        return 1;
    };

    Window_OrderList_Window.prototype.maxItems = function () {
        return (this._orderList != null && this._orderList != undefined && this._orderList.length > 0) ? this._orderList.length : 0;
    };

    Window_OrderList_Window.prototype.drawItem = function (index) {
        if (this._orderList) {
            var item = this._orderList[index];
            var rect = this.itemRect(index);
            var isClear = Number(item._nowProgress) === Number(QUEST_REPORT_ORDER_COMPLETE);
            this.changePaintOpacity(!isClear);
            var clearedMark = isClear ? "◆" : "◇";
            this.drawText(clearedMark + item._orderNote, rect.x, rect.y, this.width);
        }
    };

    Window_OrderList_Window.prototype.standardFontSize = function () {
        return 20;
    };

    Window_OrderList_Window.prototype.isCurrentItemEnabled = function () {
        if (this._orderList) {
            var item = this._orderList[this.index()];
            return (Number(item._nowProgress) != Number(QUEST_REPORT_ORDER_COMPLETE));
        }
        return false;
    };

    Window_OrderList_Window.prototype.processOk = function () {
        if (this.isCurrentItemEnabled()) {
            if ($gameSwitches.value(enableFasttravelSwitchNo)) {
                this.playBuzzerSound();
            } else {
                this.playOkSound();
            }
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    ///////////////////////////////////////////////////////////////////////////////
    // クエストシステム
    ///////////////////////////////////////////////////////////////////////////////

    function Scene_QuestMenuWindow() {
        this.initialize.apply(this, arguments);
    }

    Scene_QuestMenuWindow.prototype = Object.create(Scene_Base.prototype);
    Scene_QuestMenuWindow.prototype.constructor = Scene_QuestMenuWindow;

    Scene_QuestMenuWindow.prototype.isQuestOrderAutoStart = function () {
        return this._isQuestOrderAutoStart;
    };

    Scene_QuestMenuWindow.prototype.setQuestOrderAutoStart = function (flag) {
        this._isQuestOrderAutoStart = flag;
    };

    // クエスト入力項目　[イベントが自動で開始されるクエスト]

    // 自動開始クエスト
    // 野良クエおよび、ギルドクエスト後に何かしら処理を入れたい場合の処理
    // 戻り値をtrueにした場合、キー操作などの以降の処理は行わないようにする。
    // 追加機能オープン化する際は内容を削除する。
    // 同時に受注をさせないための処理
    Scene_QuestMenuWindow.prototype.isQuestAutoStart = function (questId) {
        var returnFlag = false;
        switch (Number(questId)) {
            case SD_QUESTSYSTEM_QUESTID_GUILDNOZATUYOU:
            case SD_QUESTSYSTEM_QUESTID_OONEZMINOKUJO:
            case SD_QUESTSYSTEM_QUESTID_AROSUDOUKUTSUTYOUSA:
            case SD_QUESTSYSTEM_QUESTID_SHOKUDOUNOWASURE:
            case SD_QUESTSYSTEM_QUESTID_YOGORETATE:
            case SD_QUESTSYSTEM_QUESTID_HAITATSUINNOIKINUKI:
            case SD_QUESTSYSTEM_QUESTID_RELMNOWASUREMONO:
            case SD_QUESTSYSTEM_QUESTID_OOKAMINOMURE:
            case SD_QUESTSYSTEM_QUESTID_KASAROYOKUJONOOOSOUJI:
            case SD_QUESTSYSTEM_QUESTID_MINATONOARUMACHI:
            case SD_QUESTSYSTEM_QUESTID_SHIZUKANASHURAKU:
            case SD_QUESTSYSTEM_QUESTID_KUROIKONA:
            case SD_QUESTSYSTEM_QUESTID_YUSOUROUTEWOKAKUHOSEYO:
            case SD_QUESTSYSTEM_QUESTID_SENSHINOODORIKO:
            case SD_QUESTSYSTEM_QUESTID_TOUZOKUNOODORIKO:
            case SD_QUESTSYSTEM_QUESTID_MAHOUTSUKAINOODORIKO:
            case SD_QUESTSYSTEM_QUESTID_SOURYONOODORIKO:
            case SD_QUESTSYSTEM_QUESTID_JOUHOUYANOSASOI:
            case SD_QUESTSYSTEM_QUESTID_KARIUDONOTANOSHIMI:
            case SD_QUESTSYSTEM_QUESTID_MAHOUTSUKAINOKUCHI:
            case SD_QUESTSYSTEM_QUESTID_IKARERUOTOKO:
            case SD_QUESTSYSTEM_QUESTID_AKUTARENOKYOSEI:
            case SD_QUESTSYSTEM_QUESTID_OUSHINOHIMITSU:
            case SD_QUESTSYSTEM_QUESTID_SHIAWASENORESHIPI:
            case SD_QUESTSYSTEM_QUESTID_NAMIDANOSHIZUKU:
            case SD_QUESTSYSTEM_QUESTID_GUSHANOTENBIN:
            case SD_QUESTSYSTEM_QUESTID_TSUKANOMANOKYUSOKU:
            case SD_QUESTSYSTEM_QUESTID_ZENINOHASSAN:
            case SD_QUESTSYSTEM_QUESTID_TANKOUFUNOYUUIN:
            case SD_QUESTSYSTEM_QUESTID_KYODAIHEBINOTOUBATSU:
            case SD_QUESTSYSTEM_QUESTID_ARABURUKYODAIHEBI:
            case SD_QUESTSYSTEM_QUESTID_KUROIIRAISHO:
            case SD_QUESTSYSTEM_QUESTID_TEIKOKUGUNKARANOIRAI:
            case SD_QUESTSYSTEM_QUESTID_DOKURONOUMI:
            case SD_QUESTSYSTEM_QUESTID_AKUSEKINOMAHOUTUKAI:
            case SD_QUESTSYSTEM_QUESTID_WANPAKUSHOUJONOBOUKEN:
            case SD_QUESTSYSTEM_QUESTID_GISHINANKINARENKINJUTSUSHI:
            case SD_QUESTSYSTEM_QUESTID_YASEIJINOSASOI:
            case SD_QUESTSYSTEM_QUESTID_DRAGONNOTOUBATSU:
            case SD_QUESTSYSTEM_QUESTID_NAMIDANOHANRAN:
            case SD_QUESTSYSTEM_QUESTID_KODAINOJONETSU:
            case SD_QUESTSYSTEM_QUESTID_TOROGOKOJIINKARANOIRAI:
            case SD_QUESTSYSTEM_QUESTID_ARKMAGENOTANGAN:
            case SD_QUESTSYSTEM_QUESTID_EMATOUZZOKUDANNOYUKUE:
            case SD_QUESTSYSTEM_QUESTID_IKOINOBASHOWOTORIMODOSE:
            case SD_QUESTSYSTEM_QUESTID_SANHONASHINOTAKA:
            case SD_QUESTSYSTEM_QUESTID_TOJITAHITOMI:
            case SD_QUESTSYSTEM_QUESTID_MAHONOKAGAMI:
            case SD_QUESTSYSTEM_QUESTID_KAGAMINOKAWARI:
            case SD_QUESTSYSTEM_QUESTID_NAYAMERUKUSURISHI:
            case 123: //試験官クレア
            case 125: //悩める薬師
            case 126: //無茶な注文
            case 129: //夢の終わり
            case 130: //訳ありのオークション
            case 131: //ドラゴンを宿す者
            case 133: //クリスタルの中の助手
            case 136: //魔法の鏡
            case 137: //鏡の代わり
            case 138: //新たなる巫女
            case 141: //立身出世の夢
            case 145: //放たれた獣
            case 146: //消えた商人
            case 147: //研究者の長い夜
            case 149: //勝てない相手
            case 151: //その顔がみたいから
            case 153: //自然に帰れ
            case 155: //悪魔と見る夢
            case 157: //最後の怪盗
            case 158: //姉妹像の返却
            case 159: //1枚のコイン
            case 160: //オークたちの秘宝
            case 161: //怪盗夜を往く
            case 165: //悪魔の花嫁
            case 168: //消えるもの残るもの
            case 170: //美食家の愉しみ
            case 172: //奇妙な友情
            case 173: //盤上から戦場へ
            case 174: //ホワイトブリムを外して
            case 175: //牙をむく疾風
            case 177: //気づかぬ悦び
            case 178: //危険な遊び
            case 179: //耽溺
            case 180: //出来心と下心
            case 181: //心雨
            case 183: //湖で見つけた理想
            case 185: //夜浜の獣
            case 186: //小生意気な魔法使い
            case 188: //無謀な注文
            case 192: //太陽の王子
            case 194: //時間稼ぎ
            case 195: //形見の指輪
            case 197: //デイレーの短刀
            case 198: //デイレーの巫女からの依頼
            case 199: //海は変わらない
            case 200: //怪盗の背中
            case 201: //月下の散歩
            case 202: //ふたりの獣
            case 204: //メイドと御主人様
            case 206: //浜辺の誘惑
            case 207: //裏切りの舌
            case 209: //優しい廃退
            case 212: //優しい魔法
            case 214: //悪魔の取り分
            case 215: //決戦！ロパロ略奪団
            case 218: //武器職人の夢
            case 219: //創設者の行方
            case 220: //見果てぬ夢
            case 221: //秘密のレシピ
            case 222: //偉大なる未亡人
            case 223: //黄昏の復讐者
            case 224: //復讐者たちの黄昏
            case 228: //楽園からの招待状
            case 231: //玉座に座る者A
            case 232: //玉座に座る者B
                returnFlag = true;
                break;
        }
        return returnFlag;
    };

    Scene_QuestMenuWindow.getQuestPlace = function () {
        return this._questPlace;
    };

    let ALT_questPlace;
    Scene_QuestMenuWindow.setQuestPlace = function (questPlace) {
        this._questPlace = questPlace;
        ALT_questPlace = questPlace;
    };

    // //　初期化処理(コンストラクタみたいなもの)
    Scene_QuestMenuWindow.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        this._animationCnt = 0;
        this._stopCnt = 0;
        this._movePattern = 1;
        this._questOrderedFlag = false;
        this._questNewOrderdList = [];
        //loadQuestReportCSVFile();
        this._orderedCOnfirmWindow = new Window_QuestOrderedConfirmWindow(100, -400, 616, 267);
        this._orderedCOnfirmWindow.opacity = 0;
        this._orderConfirmWindowImg = new Sprite();
        this._orderConfirmWindowImg.bitmap = loadBitmapByQuestSystemPluginFolder("confirmWindow");
        this._orderedCOnfirmWindow.setOrderConfirmWindowImg(this._orderConfirmWindowImg);
        this._orderedCOnfirmWindow.close();
        //this._orderedCOnfirmWindow.forcedClose();
        //this._orderedCOnfirmWindow.opacity = 255;
        createAlertMessageWindowByInitilize(this);
        this.setQuestOrderAutoStart(false);
    };

    // // ウィンドウの追加処理
    Scene_QuestMenuWindow.prototype.create = function () {
        Scene_Base.prototype.create.call(this);

        ALT_clearQuestData._questReportList = [];
        var str = dobby_loadAndGetQuestReportCsvFile();
        //while(!convertQuestReportCsvToArray(this, QUEST_ORDER_TARGET_SCENE_QUESTSYSTEM)){}
        while (!convertQuestReportCsvToArray(ALT_clearQuestData, QUEST_ORDER_TARGET_SCENE_QUESTREPORT, str)) {
        }
        var oStr = dobby_loadAndQuestReportOrderCSVFile();
        while (!convertQuestReportOrderCsvToArray(ALT_clearQuestData, oStr)) {
        }
        ALT_clearQuestData._questReportList = questReportinitSetting(ALT_clearQuestData._questReportList);

        var str = dobby_loadAndGetQuestReportCsvFile();
        //while(!convertQuestReportCsvToArray(this, QUEST_ORDER_TARGET_SCENE_QUESTSYSTEM)){}
        while (!convertQuestReportCsvToArray(this, QUEST_ORDER_TARGET_SCENE_QUESTSYSTEM, str)) {
        }

        this.createBackGround();
        this.createQuestWindowImgBaseRayer();
        this.createIndexWindow();
    };

    Scene_QuestMenuWindow.prototype.createBackGround = function () {
        this._backGroundImg = new Sprite();
        this._backGroundFrameImg = new Sprite();
        this._detailWindowImg = new Sprite();
        if (_questOpenPosition === SD_QUESTSYSTE_OPEN_GUILD) {
            this._backGroundImg.bitmap = loadBitmapByQuestSystemPluginFolder("guidBack");
            this._backGroundFrameImg.bitmap = loadBitmapByQuestSystemPluginFolder("guildQuest");
        } else {
            this._backGroundImg.bitmap = loadBitmapByQuestSystemPluginFolder("strayBack");
            this._backGroundFrameImg.bitmap = loadBitmapByQuestSystemPluginFolder("strayQuest");
        }
        this._detailWindowImg.bitmap = loadBitmapByQuestSystemPluginFolder("questDetail");
        this.addChild(this._backGroundImg);
        this.addChild(this._backGroundFrameImg);
        this.addChild(this._detailWindowImg);
    };

    Scene_QuestMenuWindow.prototype.createQuestWindowImgBaseRayer = function () {
        this._questWindowBackBase = new Sprite();
        this._arrowDownImg = new Sprite();
        this._arrowUpImg = new Sprite();
        this.addChild(this._questWindowBackBase);
        this._arrowDownImg.bitmap = loadBitmapByQuestSystemPluginFolder("arrowDown");
        this._arrowUpImg.bitmap = loadBitmapByQuestSystemPluginFolder("arrowUp");
        this._arrowUpImg.x = 129;
        this._arrowUpImg.y = 78;
        this._arrowDownImg.x = 129;
        this._arrowDownImg.y = 600;
        this._questWindowBackBase.addChild(this._arrowDownImg);
        this._questWindowBackBase.addChild(this._arrowUpImg);
    };

    Scene_QuestMenuWindow.prototype.createIndexWindow = function () {
        // 画面上部のウィンドウを作成する
        // クエスト分windowsを作成する
        // // Scene_baseを継承した場合、これがないとWindowを作ることができない
        Scene_Base.prototype.createWindowLayer.call(this);
        Scene_Base.prototype.createAddWindowLayerForward.call(this);
        this.createQuestWindow();
        this.createRankWindow();
        this.createQuestDetailWindow();
        //createAlertMessageWindow(this);
        addAlertMessageWindow(this);
    };

    // // ランク表示用の処理
    Scene_QuestMenuWindow.prototype.createRankWindow = function () {
        this._headWindow = new Window_Base(0, 0, Graphics.width, 100);
        this._headWindow.deactivate();
        this.addWindow(this._headWindow);
        this._headWindow.opacity = 0;

        if (_questOpenPosition === SD_QUESTSYSTE_OPEN_GUILD) {
            var rankName = "ランク：";
            var rankNo = getRank();
            if (rankNo != undefined && rankNo != null) {
                rankName = rankName + _sd_questSystem_rank_map[rankNo];
            }

            let position = "ギルド";
            rankName = rankName + "　総クエスト数：" + this.questLocationAllCnt[position] + "　クリア済み：" + this.questLocationCnt[position];

            this._headWindow.drawText(rankName, 300, 10, this._headWindow.width - 350);
        } else {
            let position = Scene_QuestMenuWindow.getQuestPlace();
            this._headWindow.drawText("総クエスト数：" + this.questLocationAllCnt[position] + "　クリア済み：" + this.questLocationCnt[position], 300, 10, this._headWindow.width - 350);
        }
    };

    Scene_QuestMenuWindow.prototype.createQuestWindow = function () {
        this._questList = [];
        this._questWindowBack = [];
        this._viewQuestWindows = [];
        if (this._questReportList.length > 0) {
            var firstPos = 120;
            var cnt = 0;

            // ===追加機能。オープン化する際は修正する。
            if (_questOpenPosition === SD_QUESTSYSTE_OPEN_GUILD) {
                for (var i = 0; i < this._questReportList.length; i++) {
                    if (this._questReportList[i]._orderPlace != "" && this._questReportList[i]._orderPlace === SD_QUESTSYSTEM_OPEN_GUILD_JP) {
                        this._questList.push((new Window_QuestWindow(10, (110 * (cnt + 1)), QUEST_SYSTEM_QUESTLIST_WIDTH - 30, 90, cnt, this._questReportList[i])));
                        this._questList[cnt].y = firstPos + 100 * cnt;
                        cnt++;
                    }

                }
            } else {
                for (var i = 0; i < this._questReportList.length; i++) {
                    if (this._questReportList[i]._orderPlace != "" && this._questReportList[i]._orderPlace === _questOpenPosition && this._questReportList[i]._orderPlaceDetail === "掲示板") {
                        this._questList.push((new Window_QuestWindow(10, (110 * (cnt + 1)), QUEST_SYSTEM_QUESTLIST_WIDTH - 30, 90, cnt, this._questReportList[i])));
                        this._questList[cnt].y = firstPos + 100 * cnt;
                        cnt++;
                    }

                }
            }

            for (var i = 0; i < this._questList.length; i++) {
                var questImg = new Sprite();
                questImg.bitmap = loadBitmapByQuestSystemPluginFolder("messageFrame");
                questImg.x = this._questList[i].x;
                questImg.y = this._questList[i].y;
                this._questWindowBack.push(questImg);
                this._questWindowBackBase.addChild(this._questWindowBack[i]);
                //this.addWindow(this._questList[i]);
                this._questList[i].updateTone();
                this._questList[i].setActivateByActivateFlag();
                this._questList[i].setWindowBackImg(this._questWindowBack[i]);
                this._viewQuestWindows.push(this._questList[i]);
                this.addWindow(this._viewQuestWindows[i]);
                this._viewQuestWindows[i].deactivate();
                this._viewQuestWindows[i].activeFlag = false;
                if (i === 4) {
                    break;
                }
            }

            if (this._questList.length > 0) {
                this._arrowUpImg.opacity = 0;
                if (this._questList.length < 6) {
                    this._arrowDownImg.opacity = 0;
                } else {
                    this._arrowDownImg.opacity = 255;
                }
                this._questList[0].activate();
                this._questList[0]._activeFlg = true;
                this._viewQuestWindows[0].activate();
                this._viewQuestWindows[0].activeFlag = true;
            } else {
                this._arrowUpImg.opacity = 0;
                this._arrowDownImg.opacity = 0;
            }
        }
    };

    Scene_QuestMenuWindow.prototype.createQuestDetailWindow = function () {
        this._detailWindow = new Window_QuestSystemDetailWindow(this._headWindow.height);
        this.addWindow(this._detailWindow);
        this._detailWindow.deactivate();
        if (this._questList != undefined && this._questList.length > 0) {
            var questData = this._questList[0].getQuestData();
            this._detailWindow.drawTextExCustome(questData._note);
            this._otherInfoWindowList = [];
            var detailCnt = 3;
            // var detailCnt = (_questOpenPosition === SD_QUESTSYSTE_OPEN_GUILD) ? 3 : 3;
            for (var i = 0; i < detailCnt; i++) {
                var titleTmp = "";
                var noteTmpe = "";
                var detailYpos = 0;
                switch (i) {
                    case 0:
                        titleTmp = "◎成功報酬";
                        noteTmpe = questData._clearReward;
                        detailYpos = 210;
                        break;
                    case 1:
                        titleTmp = "◎受注条件";
                        noteTmpe = questData._orderCondition;
                        detailYpos = 235;
                        break;
                    case 2:
                        if (_questOpenPosition != SD_QUESTSYSTE_OPEN_GUILD) {
                            titleTmp = "◎派生条件";
                            noteTmpe = questData._derivedCondition;
                        } else {
                            titleTmp = "◎ランク条件";
                            noteTmpe = questData._rank;
                        }
                        detailYpos = 330;
                        break;
                }

                this._otherInfoWindowList.push(new Window_QuestSystemDetailOtherWindow(detailYpos + (70 * i), titleTmp, noteTmpe));

                this._otherInfoWindowList[i].opacity = 0;
                this.addWindow(this._otherInfoWindowList[i]);
            }
        }

        this._detailWindow.deactivate();
        this.addChild(this._orderConfirmWindowImg);
        // 確認ウィンドウだけはレイヤーの関係上、addchildする必要がある。
        this.addChild(this._orderedCOnfirmWindow);
        if (!(this._questList != undefined && this._questList.length > 0)) {
            this._questReportNoOrderedMsgWindow = new Window_Base(250, 300, 500, 100);
            this._questReportNoOrderedMsgWindow.drawText("受注可能なクエストはありません", 20, 15, 450, 100);
            this.addWindow(this._questReportNoOrderedMsgWindow);
            this._questReportNoOrderedMsgWindow.deactivate();
        }

        if ((this._questList != undefined && this._questList.length > 0)) {
            this._questOrderedAnimationWindow = new Window_Base(Graphics.width, Graphics.height / 2, 600, 100);
            this._questOrderedAnimationWindow.opacity = 0;
            this._questOrderedAnimationWindow.drawTextEx("", 0, 0);
            this._questOrderedAnimationWindow.close();
            this.addWindowForward(this._questOrderedAnimationWindow);
            this._questOrderedAnimationWindow.deactivate();
            this._animationImg = new Sprite();
            this._animationImg.bitmap = loadBitmapByPluginFolder("questOrderAnimation");
            this._animationImg.opacity = 200;
            this._animationImg.x = this._questOrderedAnimationWindow.x;
            this._animationImg.y = this._questOrderedAnimationWindow.y + this._questOrderedAnimationWindow.height - 5;
            this.addChild(this._animationImg);
        }
    };

    Scene_QuestMenuWindow.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        if (this._questList && this._questList.length > 0) {
            this._questList[0].activate();
            this._questList[0]._activeFlag = true;
            this._viewQuestWindows[0].activate();
            this._viewQuestWindows[0].activeFlag = true;
        }
        this._cnt = 0;
    };

    // Scene_QuestMenuWindow.prototype.isReady = function() {
    //     if (this._questList && this._questList.length > 0) {
    //         return Scene_Base.prototype.isReady.call(this) && this._questList[0].active && this._questList[0]._activeFlg;
    //     } else {
    //         return Scene_Base.prototype.isReady.call(this);
    //     }
    // };

    Scene_QuestMenuWindow.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        // 画面表示が完了するまで以降の操作は行わせない。
        // そのためのカウント
        if (this._cnt < 30) {
            this._cnt++;
            return;
        }
        if (!this._isOrderedAnimationFlag) {
            if (this.isQuestOrderAutoStart()) {
                // if (orderAfterExec(this._questList, this)) {
                //     return;
                // }
                this.popScene();
                return;
            }
            this.updateCommand();
        } else {
            if (this._animationQuestData === undefined) {
                var activeFlagTrueWindow = this.getNowActiveFlagTrueWindow();
                this._animationQuestData = activeFlagTrueWindow.getQuestData();
                if (this._questOrderedAnimationWindow.contents) {
                    this._questOrderedAnimationWindow.contents.clear();
                }

                let questStr = "「" + this._animationQuestData._questName + "」を受注しました";
                let textWidth = this._questOrderedAnimationWindow.textWidth(questStr);
                let halfX = (this._questOrderedAnimationWindow.width / 2) - (textWidth / 2);
                this._questOrderedAnimationWindow.drawTextEx(questStr, halfX - 25, 15);

                this._questOrderedAnimationWindow.x = (Graphics.width / 2) - (this._questOrderedAnimationWindow.width / 2);
                this._animationCnt = 0;
                this._questOrderedAnimationWindow.open();
                AudioManager.playSe({ "name": SE_QUEST_ORDERED, "volume": 90, "pitch": 100, "pan": 0 });
            }

            if (this._animationCnt > 2) {
                this._animationCnt = 0;
                // if (this._movePattern === 2) {
                //     this._stopCnt++;
                // }
            }

            switch (this._movePattern) {
                case 2:
                    if ((Input.isRepeated('ok') && Input.isTriggered('ok'))) {
                        this._movePattern = 3;
                    }
                    break;
            }

            if (this._animationCnt === 2) {
                switch (this._movePattern) {
                    case 1:

                        if (this._questOrderedAnimationWindow.opacity < 255) {
                            this._questOrderedAnimationWindow.opacity += 15;
                            this._questOrderedAnimationWindow.contentsOpacity += 15;
                        }

                        if (this._animationImg.x > (Graphics.width / 2) - (this._animationImg.width / 2)) {
                            this._animationImg.x -= 200;
                        } else {
                            this._animationImg.x = (Graphics.width / 2) - (this._animationImg.width / 2);
                        }

                        if (this._questOrderedAnimationWindow.opacity >= 255 && this._animationImg.x === (Graphics.width / 2) - (this._animationImg.width / 2)) {
                            this._movePattern = 2;
                        }
                        break;
                    // case 2:
                    //     if (this._stopCnt > 5) {
                    //         this._stopCnt = 0;
                    //         this._movePattern = 3;
                    //     }
                    //     break;
                    case 3:
                        if (this._questOrderedAnimationWindow.opacity > 0) {
                            this._questOrderedAnimationWindow.opacity -= 15;
                            this._questOrderedAnimationWindow.contentsOpacity -= 15;
                        }

                        if (this._animationImg.x > (0 - this._animationImg.width)) {
                            this._animationImg.x -= 200;
                        } else {
                            this._animationImg.x = (0 - this._animationImg.width);
                        }

                        if (this._questOrderedAnimationWindow.opacity === 0 && this._animationImg.x === (0 - this._animationImg.width)) {
                            this._questOrderedAnimationWindow.x = Graphics.width;
                            this._animationImg.x = this._questOrderedAnimationWindow.x;
                            this._questOrderedAnimationWindow.opacity = 0;
                            this._questOrderedAnimationWindow.contentsOpacity = 0;
                            this._questOrderedAnimationWindow.close();
                            this._isOrderedAnimationFlag = false;
                            this._movePattern = 1;
                            this._animationQuestData = undefined;
                        }
                        break;
                }

            }

            this._animationCnt++;
        }
    };

    Scene_QuestMenuWindow.prototype.updateCommand = function () {
        if (this._questList != undefined && this._questList.length > 0) {
            if (this.isActiveQuestListWindow()) {
                if ((Input.isRepeated('up') || Input.isTriggered('up'))) {
                    SoundManager.playCursor();
                    if (this.updateSelectUp()) {
                        this.checkAndoMoveQuestWindow('up');
                    }
                } else if ((Input.isRepeated('down') || Input.isTriggered('down'))) {
                    SoundManager.playCursor();
                    if (this.updateSelectDown()) {
                        this.checkAndoMoveQuestWindow('down');
                    }
                } else if ((Input.isRepeated('pagedown') || Input.isTriggered('pagedown'))) {
                    SoundManager.playCursor();
                    this.updateSelectPageDown();
                } else if ((Input.isRepeated('pageup') || Input.isTriggered('pageup'))) {
                    SoundManager.playCursor();
                    this.updateSelectPageUp();
                } else if ((Input.isRepeated('ok') && Input.isTriggered('ok'))) {
                    if (!$gameSwitches.value(SD_QUESTSYSTEM_READONLYSWITCHNO)) {
                        this.selectQuestWindowOK();
                    }
                } else if (isInputCancelCheck()) {
                    this.checQuestOrdered();
                    this.popScene();
                    SoundManager.playCancel();
                } else {
                    //                    this.touchInputCheck();
                    //                    this.checkAndoMoveQuestWindow('touch');
                }
            } else {
                if (this._orderedCOnfirmWindow.isOpenAndActive()) {
                    if ((Input.isRepeated('left') && Input.isTriggered('left'))) {
                        this._orderedCOnfirmWindow.selectIdx(-1);
                        SoundManager.playCursor();
                    } else if ((Input.isRepeated('right') && Input.isTriggered('right'))) {
                        this._orderedCOnfirmWindow.selectIdx(1);
                        SoundManager.playCursor();
                    } else if ((Input.isRepeated('ok') && Input.isTriggered('ok'))) {
                        var tmpActiveButtonWindow = this._orderedCOnfirmWindow.getActiveButtonWindow();
                        if (tmpActiveButtonWindow.isOkButton()) {
                            this.questOrderOk();
                        } else {
                            this.cancelQuestOkButtonWindowSoundBuzzer();
                        }

                    } else if (isInputCancelCheck()) {
                        this.cancelQuestOkButtonWindowSoundBuzzer();
                    } else {
                        //this.touchInputCheck();
                    }
                }
            }
        } else {
            if (isInputCancelCheck()) {
                this.checQuestOrdered();
                this.popScene();
                SoundManager.playCancel();
            }
        }
    };

    Scene_QuestMenuWindow.prototype.updateSelectUp = function () {
        var nowActiveIdx = this.getNowActiveFlagTrueIdx();
        if (nowActiveIdx > 0) {
            this.questSystemListCursolMoveAction(nowActiveIdx, (nowActiveIdx - 1));
            return true;
        } else {
            // だいぶ無理くりにまわしている
            if (this._questList.length < 6) {
                this.questSystemListCursolMoveAction(nowActiveIdx, (this._questList.length - 1));
                return true;
            } else {
                var nowActiveIdx2 = this.getNowActiveFlagTrueIdx();
                // while (nowActiveIdx2 < (this._questList.length - 1)) {
                //     this.questSystemListCursolMoveAction(nowActiveIdx2,(nowActiveIdx2 + 1));
                //     this.checkAndoMoveQuestWindow('down');
                //     nowActiveIdx2 = this.getNowActiveFlagTrueIdx();
                // }
                this.updateSelectLoopDown(nowActiveIdx2, (this._questList.length - 1));
                return false;
            }
        }

    };

    Scene_QuestMenuWindow.prototype.updateSelectPageUp = function () {
        if (this._questList === null || (this._questList && this._questList.length < 1)) {
            return;
        }

        var nowActiveIdx = this.getNowActiveFlagTrueIdx();
        let loopPoint = nowActiveIdx - 9;
        if (loopPoint <= 0) {
            loopPoint = 0;
        }
        this.updateSelectLoopUp(nowActiveIdx, loopPoint);
        // while (nowActiveIdx > loopPoint) {
        //     this.questSystemListCursolMoveAction(nowActiveIdx,(nowActiveIdx - 1));
        //     this.checkAndoMoveQuestWindow('up');
        //     nowActiveIdx = this.getNowActiveFlagTrueIdx();
        // }
    };

    Scene_QuestMenuWindow.prototype.updateSelectDown = function () {
        var nowActiveIdx = this.getNowActiveFlagTrueIdx();
        if (nowActiveIdx < (this._questList.length - 1)) {
            this.questSystemListCursolMoveAction(nowActiveIdx, (nowActiveIdx + 1));
            return true;
        } else {
            // だいぶ無理くりにまわしている
            if (this._questList.length < 6) {
                this.questSystemListCursolMoveAction(nowActiveIdx, 0);
                return true;
            } else {
                var nowActiveIdx2 = this.getNowActiveFlagTrueIdx();
                // while (nowActiveIdx2 > 0) {
                //     this.questSystemListCursolMoveAction(nowActiveIdx2,(nowActiveIdx2 - 1));
                //     this.checkAndoMoveQuestWindow('up');
                //     nowActiveIdx2 = this.getNowActiveFlagTrueIdx();
                // }
                this.updateSelectLoopUp(nowActiveIdx2, 0);
                return false;
            }
        }
    };

    Scene_QuestMenuWindow.prototype.updateSelectPageDown = function () {
        if (this._questList === null || (this._questList && this._questList.length < 1)) {
            return;
        }

        var nowActiveIdx = this.getNowActiveFlagTrueIdx();
        let loopPoint = nowActiveIdx + 9;
        let maxIndex = (this._questList.length - 1);
        if (loopPoint > maxIndex) {
            loopPoint = maxIndex;
        }
        this.updateSelectLoopDown(nowActiveIdx, loopPoint);
        // while (nowActiveIdx > loopPoint) {
        //     this.questSystemListCursolMoveAction(nowActiveIdx,(nowActiveIdx - 1));
        //     this.checkAndoMoveQuestWindow('up');
        //     nowActiveIdx = this.getNowActiveFlagTrueIdx();
        // }
    };

    Scene_QuestMenuWindow.prototype.updateSelectLoopUp = function (initPoint, endPoint) {
        let initTmpPoint = initPoint;
        let endTmpPoint = endPoint;
        while (initTmpPoint > endTmpPoint) {
            this.questSystemListCursolMoveAction(initTmpPoint, (initTmpPoint - 1));
            this.checkAndoMoveQuestWindow('up');
            initTmpPoint = this.getNowActiveFlagTrueIdx();
        }
    };

    Scene_QuestMenuWindow.prototype.updateSelectLoopDown = function (initPoint, endPoint) {
        let initTmpPoint = initPoint;
        let endTmpPoint = endPoint;
        while (initTmpPoint < endTmpPoint) {
            this.questSystemListCursolMoveAction(initTmpPoint, (initTmpPoint + 1));
            this.checkAndoMoveQuestWindow('down');
            initTmpPoint = this.getNowActiveFlagTrueIdx();
        }
    };

    Scene_QuestMenuWindow.prototype.questSystemListCursolMoveAction = function (nowActiveIdx, nextActiveIdx) {
        this._questList[nowActiveIdx].setActiveFlg(false);
        this._questList[nextActiveIdx].setActiveFlg(true);
        this._questList[nowActiveIdx].setActivateByActivateFlag();
        this._questList[nextActiveIdx].setActivateByActivateFlag();
        //        this._questList[nowActiveIdx].setTone(0,0,0);
        this._questList[nowActiveIdx].resetImgtone();
    };

    // マウスでクリックした場合の挙動。
    Scene_QuestMenuWindow.prototype.touchInputCheck = function () {
        if (this.isActiveQuestListWindow()) {
            for (var i = 0; i < this._questList.length; i++) {
                if (this.isTouch(this._questList[i]) && TouchInput.isPressed() && TouchInput.isTriggered()) {
                    if (this._questList[i].isOpenAndActive()) {
                        this.selectQuestWindowOKByQuestWindow(this._questList[i])
                    } else {
                        this.resetActiveWindows();
                        this._questList[i].setActiveFlg(true);
                        this._questList.forEach(function (value) {
                            value.setTone(0, 0, 0);
                        });
                        //this._questList[i].updateTone();
                        this._questList[i].setActivateByActivateFlag();
                        SoundManager.playCursor();
                    }
                    break;
                }
            }
        } else {
            var buttonWindowList = this._orderedCOnfirmWindow.getButtonWindowList();
            for (var i = 0; i < buttonWindowList.length; i++) {

                var buttonWindow = buttonWindowList[i];
                if (this.isTouch(buttonWindow) && TouchInput.isPressed() && TouchInput.isTriggered()) {
                    if (!buttonWindow.isActive()) {
                        buttonWindowList.forEach(function (window) {
                            window.deactivate();
                        });
                        buttonWindow.activate();
                    } else {
                        if (buttonWindow.isOkButton()) {
                            this.questOrderOk();
                        } else {
                            this.cancelQuestOkButtonWindowSoundBuzzer();
                        }
                    }

                    break;
                }
            }
        }
    };

    Scene_QuestMenuWindow.prototype.checQuestOrdered = function () {
        // if (this._questOrderedFlag) {
        var questList = this._questList;
        for (var i = 0; i < questList.length; i++) {
            //var varivableNo = questList[i].getQuestData()._variantNo;
            //var questOrderedTiming = $gameVariables.value(Number(varivableNo));
            var questData = questList[i].getQuestData();
            var questOrderedTiming = $questReportData.getQuestDataBySveData(questData._questId).getOrderList();
            if (Number(questOrderedTiming) === QUEST_REPORT_UNORDERED_NEW) {
                questvalidOrderedNotNewByQuestId(questData._questId);
            }
        }
        // }
    };

    Scene_QuestMenuWindow.prototype.isTouch = function (window) {
        var x = window.x;
        var y = window.y;
        var width = window.width;
        var height = window.height;
        var touchX = TouchInput.x;
        var touchY = TouchInput.y;
        return targetWithinRange(touchX, touchY, x, y, width, height);
    };

    Scene_QuestMenuWindow.prototype.selectQuestWindowOK = function () {
        var activeFlagTrueWindow = this.getNowActiveFlagTrueWindow();
        this.selectQuestWindowOKByQuestWindow(activeFlagTrueWindow);
    };

    Scene_QuestMenuWindow.prototype.selectQuestWindowOKByQuestWindow = function (questWindow) {
        if (questWindow.getQuestData()._isQuestOrdered || questWindow.getQuestData()._isQuestInvalidWithDisp) {
            if (questWindow.getQuestData()._isQuestOrdered) {
                // todo

            } else if (questWindow.getQuestData()._isQuestInvalidWithDisp) {

            }
            SoundManager.playBuzzer();
        } else {
            // this._okButtonDetailWindow.activate();
            if (this._orderedCOnfirmWindow.isClosed()) {
                this._orderedCOnfirmWindow.y = Graphics.height / 2 - (this._orderedCOnfirmWindow.height / 2);
                this._orderedCOnfirmWindow.x = Graphics.width / 2 - (this._orderedCOnfirmWindow.width / 2);

                var questData = questWindow.getQuestData();

                this._orderedCOnfirmWindow.drawTextCustom(questData._questName, this.isQuestAutoStart(questData._questId));
                this._orderedCOnfirmWindow.open();
            }
            questWindow.deactivate();
            SoundManager.playOk();
        }
    };

    Scene_QuestMenuWindow.prototype.cancelQuestOkButtonWindowSoundBuzzer = function () {
        this.cancelQuestOkButtonWindow(true);
    };

    Scene_QuestMenuWindow.prototype.cancelQuestOkButtonWindowNoBuzzer = function () {
        this.cancelQuestOkButtonWindow(false);
    };

    Scene_QuestMenuWindow.prototype.cancelQuestOkButtonWindow = function (soundFlag) {
        var activeFlagTrueWindow = this.getNowActiveFlagTrueWindow();
        //this._okButtonDetailWindow.deactivate();
        // TODO 確認ボタンを閉じる
        // なおかつ「いいえ」を押された時の処理にする。（確認ウィンドウを閉じる）
        this._orderedCOnfirmWindow.close();
        activeFlagTrueWindow.activate();
        if (soundFlag) {
            SoundManager.playCancel();
        }
    };

    Scene_QuestMenuWindow.prototype.questOrderOk = function () {
        var activeFlagTrueWindow = this.getNowActiveFlagTrueWindow();
        var questData = activeFlagTrueWindow.getQuestData();
        this.questOrdered(questData);
        activeFlagTrueWindow.updateQuestStringColor();
        // キャンセルボタンを押した時と同じ挙動にする。
        this.cancelQuestOkButtonWindowNoBuzzer();
        SoundManager.playOk();

        this._questOrderedFlag = true;
    };

    Scene_QuestMenuWindow.prototype.questOrdered = function (questData) {
        questData._isQuestOrdered = true;
        questOrderedById(questData._questId);
        updateQuestVariableNo(questData._variantNo, 5); // 追加機能オープン化するときは消す
        this._isOrderedAnimationFlag = true;
        if (this.isQuestAutoStart(questData._questId)) {// 追加機能オープン化するときは消す
            this.checQuestOrdered();
            this.setQuestOrderAutoStart(true);
        }
    };

    Scene_QuestMenuWindow.prototype.resetActiveWindows = function () {
        for (var i = 0; i < this._questList.length; i++) {
            this._questList[i].setActiveFlg(false);
            this._questList[i].updateTone();
            this._questList[i].setActivateByActivateFlag();
        }
    };

    Scene_QuestMenuWindow.prototype.checkAndoMoveQuestWindow = function (type) {
        var activeWindow = this.getNowActiveFlagTrueWindow();
        // エラー処理
        if (activeWindow === null) {
            this.popScene();
        }

        var activeWindowIdx = activeWindow._windowId;

        var windowX = activeWindow.x;
        var windowY = activeWindow.y;
        var windowWidth = activeWindow.width;
        var windowHeight = activeWindow.height;
        var headWindowY = this._headWindow.y;
        var headWindowHeight = this._headWindow.height;

        var dispInActiveWindow = this._viewQuestWindows.filter(function (value) {
            if (value._windowId === activeWindowIdx) {
                return true;
            }
            return false;
        });

        var isDispIn = (dispInActiveWindow && dispInActiveWindow != null && dispInActiveWindow.length > 0);
        if (!isDispIn) {
            var firstPos = this._viewQuestWindows[0].y;
            if (type === 'up') {
                if (this._questList.length > 5 && activeWindowIdx === 0) {
                    if (this._arrowUpImg.opacity != 0) {
                        this._arrowUpImg.opacity = 0;
                    }
                }

                if (this._questList.length > 5 && activeWindowIdx <= ((this._questList.length - 1) - 5)) {
                    if (this._arrowDownImg.opacity != 255) {
                        this._arrowDownImg.opacity = 255;
                    }
                }

                for (var i = this._viewQuestWindows.length - 1; i >= 0; i--) {
                    this._viewQuestWindows[i].setWindowBackImg(null);
                    this.removeWindow(this._viewQuestWindows[i]);
                    if (i === 0) {
                        this._viewQuestWindows[i] = activeWindow;
                    } else {
                        this._viewQuestWindows[i] = this._viewQuestWindows[i - 1]
                    }
                    this._viewQuestWindows[i].setWindowBackImg(null);
                    this._viewQuestWindows[i].setWindowBackImg(this._questWindowBack[i]);
                }
            } else if (type === 'down') {
                if (activeWindowIdx === (this._questList.length - 1)) {
                    if (this._arrowDownImg.opacity != 0) {
                        this._arrowDownImg.opacity = 0;
                    }
                }

                if (activeWindowIdx > 4) {
                    if (this._arrowUpImg.opacity != 255) {
                        this._arrowUpImg.opacity = 255;
                    }
                }

                for (var i = 0; i < this._viewQuestWindows.length; i++) {
                    this._viewQuestWindows[i].setWindowBackImg(null);
                    this.removeWindow(this._viewQuestWindows[i]);
                    if (i === this._viewQuestWindows.length - 1) {
                        this._viewQuestWindows[i] = activeWindow;
                    } else {
                        this._viewQuestWindows[i] = this._viewQuestWindows[i + 1]
                    }
                    this._viewQuestWindows[i].setWindowBackImg(null);
                    this._viewQuestWindows[i].setWindowBackImg(this._questWindowBack[i]);
                }
            }

            for (var i = 0; i < this._viewQuestWindows.length; i++) {
                if (i === 0) {
                    this._viewQuestWindows[i].y = firstPos;
                } else {
                    this._viewQuestWindows[i].y = firstPos + 100 * i;
                }
                this.addWindow(this._viewQuestWindows[i]);
            }
        } else {
            if (this._questList.length) {
                for (var i = 0; i < this._questList.length; i++) {
                    this._questList[i].setWindowBackImg(null);
                }
                for (var i = 0; i < this._viewQuestWindows.length; i++) {
                    this._viewQuestWindows[i].setWindowBackImg(null);
                    this._viewQuestWindows[i].setWindowBackImg(this._questWindowBack[i]);
                }
            }
        }
        var actveQuestData = activeWindow.getQuestData();
        //this._detailWindow.drawTextExCustome(actveQuestData._questName,actveQuestData._note);
        this._detailWindow.drawTextExCustome(actveQuestData._note);
        for (var i = 0; i < this._otherInfoWindowList.length; i++) {
            var noteTmpe = "";
            if (_questOpenPosition != SD_QUESTSYSTE_OPEN_GUILD) {
                switch (i) {
                    case 0:
                        noteTmpe = actveQuestData._clearReward;
                        break;
                    case 1:
                        noteTmpe = actveQuestData._orderCondition;
                        break;
                    case 2:
                        noteTmpe = actveQuestData._derivedCondition;
                        break;
                }

            } else {
                switch (i) {
                    case 0:
                        noteTmpe = actveQuestData._clearReward;
                        break;
                    case 1:
                        noteTmpe = actveQuestData._orderCondition;
                        break;
                    case 2:
                        noteTmpe = actveQuestData._rank;
                        break;
                }

            }

            // TODOtet
            this._otherInfoWindowList[i].setNote(noteTmpe);
        }
    };

    Scene_QuestMenuWindow.prototype.removeWindow = function (window) {
        this._windowLayer.removeChild(window);
    };

    Scene_QuestMenuWindow.prototype.moveQuestWindow = function (type) {
        for (var i = 0; i < this._questList.length; i++) {
            var windowMovedX = this._questList[i].x;
            var windowMovedY = this._questList[i].y;
            var windowMovedWidth = this._questList[i].width;
            var windowMovedHeight = this._questList[i].height;
            var moveheight = type === 'up' ? 1 : -1;
            this._questList[i].move(windowMovedX, (windowMovedY + (windowMovedHeight * moveheight)), windowMovedWidth, windowMovedHeight);
            this._questWindowBack[i].move(windowMovedX, (windowMovedY + (windowMovedHeight * moveheight)), windowMovedWidth, windowMovedHeight);
        }
    }

    Scene_QuestMenuWindow.prototype.getNowActiveFlagTrueIdx = function () {
        for (var i = 0; i < this._questList.length; i++) {
            if (this._questList[i].getActiveFlg()) {
                return i;
            }
        }
        return 0;
    };

    Scene_QuestMenuWindow.prototype.getNowActiveFlagTrueWindow = function () {
        for (var i = 0; i < this._questList.length; i++) {
            if (this._questList[i].getActiveFlg()) {
                return this._questList[i];
            }
        }
        alert("アクティブになっているウィンドウがありません。管理者へご連絡ください。");
        return null;
    };

    Scene_QuestMenuWindow.prototype.isActiveQuestListWindow = function () {
        for (var i = 0; i < this._questList.length; i++) {
            if (this._questList[i].isOpenAndActive()) {
                return true;
            }
        }
        return false;
    };

    // シーン設定はここまで
    // クエスト一覧のウィンドウ
    function Window_QuestWindow() {
        this.initialize.apply(this, arguments);
    }

    Window_QuestWindow.prototype = Object.create(Window_Base.prototype);
    Window_QuestWindow.prototype.constructor = Window_QuestWindow;

    const activeTone = 80;
    Window_QuestWindow.prototype.initialize = function (wx, wy, ww, wh, id, questData) {
        Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
        this._colorMoveCnt = 0;
        this._r = activeTone;
        this._g = activeTone;
        this._b = activeTone;
        this._r_num = this._r / (activeTone / 10) * -1;
        this._g_num = this._g / (activeTone / 10) * -1;
        this._b_num = this._b / (activeTone / 10) * -1;
        this._opacityColro = 255
        this._questData = questData;
        this._windowId = id;
        this._isOrderedAnimationFlag = false;
        // if (id === 0) {
        //     this._activeFlg = true;
        //     this.activate();
        // } else {
        //     this._activeFlg = false;
        //     this.deactivate();
        // }
        this.deactivate();
        this._activeFlg = false;
        this._windowBackImg = null;
        this.opacity = 0;
        this.drawQuestItem();
    };

    Window_QuestWindow.prototype.setWindowBackImg = function (backImg) {
        this._windowBackImg = backImg;
    };

    Window_QuestWindow.prototype.drawQuestItem = function () {
        if (this._questData) {
            if (this._questData._isQuestOrdered || this._questData._isQuestInvalidWithDisp) {
                this.changeTextColor(this.getInvalitQuestTextColor());
            } else {
                this.changeTextColor(this.normalColor());
            }

            const questId = Number(this._questData._questId.replace("\n", ""));
            if (!$gameTemp.isPlaytest() && isUnsetQuest(questId)) {
                // if (!$gameTemp.isPlaytest() && isUnsetQuest(questId)) {
                this.contents.textColor = 'rgb(255,62,62)';
                this.drawText(this._questData._questName, 60, 0, this.width, "left");
                this.contents.fontSize = 12;
                // this.contents.outlineWidth = 0;
                // this.contents.textColor = 'rgb(192,192,192)';
                this.contents.textColor = 'rgb(255,249,96)';
                this.drawText("フラグ設定 or シナリオ組込 が未作業", 60, 25, this.width, "left");
                this.contents.fontSize = 19;
                // this.contents.outlineWidth = 4
                // this.contents.textColor = 'rgb(255,255,255)';
            } else if ($gameTemp.isPlaytest() && isDisplayFromBeginning(questId)) {
                this.drawText(this._questData._questName, 60, 0, this.width, "left");
                this.contents.fontSize = 12;
                // this.contents.outlineWidth = 0;
                // this.contents.textColor = 'rgb(192,192,192)';
                this.drawText("-Shown from the beginning-", 60, 25, this.width, "left");
                this.contents.fontSize = 19;
                // this.contents.outlineWidth = 4
                // this.contents.textColor = 'rgb(255,255,255)';
                this.drawText("☆" + this._questData._level, 230, 25, this.width, "left");
            } else {
                this.drawText(this._questData._questName, 60, 0, this.width, "left");
                this.drawText("☆" + this._questData._level, 200, 25, this.width, "left");
            }

            if (this._questIconImg === undefined) {
                this._questIconImg = this._questData._questIcon;
                this.addChild(this._questData._questIcon);
            }

            if (this._questIconImg != undefined) {
                this._questData._questIcon.x = 10;
                this._questData._questIcon.y = (this.height / 2 / 2) - 5;
            }

            if (this._questData._questType === SD_QUESTSYSTEM_QUESTTYPE_ADULT) {
                this.drawText("♡", 185, 30, this.width, "left");
            }

            //var questOrderedTiming = $gameVariables.value(Number(this._questData._variantNo));
            var questOrderedTiming = $questReportData.getQuestDataBySveData(this._questData._questId).getOrderList();
            if (Number(questOrderedTiming) === QUEST_REPORT_UNORDERED_NEW) {
                if (this._questNewImg === undefined) {
                    this._questNewImg = new Sprite();
                    this._questNewImg.bitmap = loadBitmapByPluginFolder(IMG_QUESTREPORT_NEW);
                    this.addChild(this._questNewImg);
                }
                this._questNewImg.x = 10;
                this._questNewImg.y = -5;
            }
        }
    };

    Window_QuestWindow.prototype.getWindowId = function () {
        return this._windowId;
    };

    Window_QuestWindow.prototype.getActiveFlg = function () {
        return this._activeFlg;
    };

    Window_QuestWindow.prototype.setActiveFlg = function (flg) {
        this._activeFlg = flg;
    };

    Window_QuestWindow.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        // クエストの受注状況によって文字色を変更する。
        //this.updateQuestStringColor();
    };

    Window_QuestWindow.prototype.updateQuestStringColor = function () {
        if (this.contents) {
            this.contents.clear();
        }
        this.changeTextColor(this.getInvalitQuestTextColor());
        this.drawQuestItem();
    };

    Window_QuestWindow.prototype.getInvalitQuestTextColor = function () {
        return this.textColor(16);
    };

    Window_QuestWindow.prototype.resetImgtone = function () {
        if (this._windowBackImg != null) {
            this._windowBackImg.setColorTone([0, 0, 0, 0]);
        }
    };
    Window_QuestWindow.prototype.updateTone = function () {

        if (this._activeFlg) {
            if (this.isOpenAndActive() && this._windowBackImg != null) {
                if (this._colorMoveCnt >= 3) {
                    this._r += this._r_num;
                    this._g += this._g_num;
                    this._b += this._b_num;
                    var systemTone1 = [this._r, this._g, this._b]
                    this._windowBackImg.setColorTone([systemTone1[0], systemTone1[1], systemTone1[2], 0]);
                    this._colorMoveCnt = 0;
                    if (this._r <= 0 || this._r > activeTone) {
                        this._r_num = this._r_num * -1;
                        this._g_num = this._g_num * -1;
                        this._b_num = this._b_num * -1;
                    }
                }
                this._colorMoveCnt++;
            }
        }
    };

    Window_QuestWindow.prototype.setActivateByActivateFlag = function () {
        if (this._activeFlg) {
            this.activate();
        } else {
            this.deactivate();
        }
    };

    Window_QuestWindow.prototype.getWidth = function () {
        return this._width;
    };

    Window_QuestWindow.prototype.getHeight = function () {
        return this._height;
    };

    Window_QuestWindow.prototype.activate = function () {
        Window_Base.prototype.activate.call(this);
    };

    Window_QuestWindow.prototype.isOpenAndActive = function () {
        return this.isOpen() && this.active;
    };

    Window_QuestWindow.prototype.getQuestData = function () {
        return this._questData;
    };

    Window_QuestWindow.prototype.standardFontSize = function () {
        return 19;
    };

    // ================================================================================================
    // クエストシステムの詳細画面を表示する。
    // ================================================================================================
    function Window_QuestSystemDetailTitleWindow() {
        this.initialize.apply(this, arguments);
    }

    Window_QuestSystemDetailTitleWindow.prototype = Object.create(Window_Base.prototype);
    Window_QuestSystemDetailTitleWindow.prototype.constructor = Window_QuestSystemDetailTitleWindow;
    Window_QuestSystemDetailTitleWindow.prototype.initialize = function (x, y, twidth) {
        Window_Base.prototype.initialize.call(this, x, y, twidth, 100);
    };

    Window_QuestSystemDetailTitleWindow.prototype.drawTextCustom = function (text) {
        if (this.contents) {
            this.contents.clear();
        }
        this.drawText(text, 0, 30, this.width, "center");
    };

    function Window_QuestSystemDetailWindow() {
        this.initialize.apply(this, arguments);
    }

    Window_QuestSystemDetailWindow.prototype = Object.create(Window_Base.prototype);
    Window_QuestSystemDetailWindow.prototype.constructor = Window_QuestSystemDetailWindow;

    Window_QuestSystemDetailWindow.prototype.initialize = function (y) {
        var windowWidth = Graphics.width - QUEST_SYSTEM_QUESTLIST_WIDTH;
        var windowHeight = Graphics.height - y;
        Window_Base.prototype.initialize.call(this, QUEST_SYSTEM_QUESTLIST_WIDTH - 5, y, windowWidth, windowHeight);
        //this._questTitleWindow = null;
        this.opacity = 0;
    };

    // Window_QuestSystemDetailWindow.prototype.setTitleWindow = function(window){
    //     this._questTitleWindow = window;
    // };

    Window_QuestSystemDetailWindow.prototype.drawTextExCustome = function (text) {
        if (this.contents) {
            this.contents.clear();
        }
        //this._questTitleWindow.drawTextCustom(title);
        //this.drawTextEx(text,100,50);
        var texts = text.split(/\r\n|\n|\r/);
        for (var i = 0; i < texts.length; i++) {
            this.drawText(texts[i], 0, 0 + (27 * i), this.width, "center");
        }
    };

    Window_QuestSystemDetailWindow.prototype.standardFontSize = function () {
        return 20;
    };

    // クエストシステムの受注確認ボタン
    function Window_QuestOrderedConfirmWindow() {
        this.initialize.apply(this, arguments);
    }

    Window_QuestOrderedConfirmWindow.prototype = Object.create(Window_Base.prototype);
    Window_QuestOrderedConfirmWindow.prototype.constructor = Window_QuestOrderedConfirmWindow;

    Window_QuestOrderedConfirmWindow.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._okButton = new Window_QuestOrderedConfirm_ButtonWindow(60, height - 60, 244, 44, true);
        //this._okButton.drawTextEx("はい",0,0);
        this._noButton = new Window_QuestOrderedConfirm_ButtonWindow(this.width - 304, height - 60, 244, 44, false);
        //this._noButton.drawTextEx("いいえ",0,0);
        this._okButtonImg = new Sprite();
        this._noButtonImg = new Sprite();
        this._okButtonImg.bitmap = loadBitmapByQuestSystemPluginFolder("confirmYes");
        this._noButtonImg.bitmap = loadBitmapByQuestSystemPluginFolder("confirmNo");
        this._okButtonImg.x = this._okButton.x;
        this._okButtonImg.y = this._okButton.y;
        this._noButtonImg.x = this._noButton.x;
        this._noButtonImg.y = this._noButton.y;

        this._okButton.setButtonImg(this._okButtonImg);
        this._noButton.setButtonImg(this._noButtonImg);

        this.opacity = 0;
        this._okButton.close();
        this._noButton.close();
        this.addChild(this._okButton);
        this.addChild(this._noButton);
        this.addChild(this._okButtonImg);
        this.addChild(this._noButtonImg);
        this._buttonList = [];
        this._buttonList.push(this._okButton);
        this._buttonList.push(this._noButton);
        this._orderConfirmWindowImg = null;
    };

    Window_QuestOrderedConfirmWindow.prototype.drawTextCustom = function (txt, isAutoPlay) {
        if (this.contents) {
            this.contents.clear();
        }
        this.drawTextEx("このクエストを受けますか？", 110, 50);
        this.drawText(txt, -20, 100, this.width, "center");
        if (isAutoPlay) {
            this.drawText("※このクエストは受注直後に強制で進行します", 30, 150, this.width - 100, "center");
            //this.drawTextEx("\\}※このクエストは受注直後に強制で進行します\\{",0,150);
        }

    };

    Window_QuestOrderedConfirmWindow.prototype.makeFontSmaller = function () {
        if (this.contents.fontSize >= 24) {
            this.contents.fontSize -= 10;    //ここの数値を少し小さくする
        }
    };

    Window_QuestOrderedConfirmWindow.prototype.setOrderConfirmWindowImg = function (img) {
        this._orderConfirmWindowImg = img;
    };

    Window_QuestOrderedConfirmWindow.prototype.forcedClose = function () {
        this.openness = 0;
        this._opening = false;
        this._okButton.forcedClose();
        this._noButton.forcedClose();
        this.deactivate();
    };

    Window_QuestOrderedConfirmWindow.prototype.close = function () {
        Window_Base.prototype.close.call(this);
        if (this._orderConfirmWindowImg) {
            this._orderConfirmWindowImg.opacity = 0;
        }

        if (this._noButtonImg) {
            this._noButtonImg.opacity = 0;
            this._noButton.resetImgTone();
        }

        if (this._okButtonImg) {
            this._okButtonImg.opacity = 0;
            this._okButton.resetImgTone();
        }
        this._okButton.close();
        this._noButton.close();

        this.deactivate();
    };

    Window_QuestOrderedConfirmWindow.prototype.open = function () {
        Window_Base.prototype.open.call(this);
        this._okButton.open();
        this._noButton.open();
        this._orderConfirmWindowImg.opacity = 255;
        this._orderConfirmWindowImg.x = this.x;
        this._orderConfirmWindowImg.y = this.y;
        this._okButtonImg.x = this._okButton.x;
        this._okButtonImg.y = this._okButton.y;
        this._noButtonImg.x = this._noButton.x;
        this._noButtonImg.y = this._noButton.y;
        this._noButtonImg.opacity = 255;
        this._okButtonImg.opacity = 255;
        this._okButton.activate();
        this._noButton.deactivate();
        this.activate();
    };

    Window_QuestOrderedConfirmWindow.prototype.deactivate = function () {
        Window_Base.prototype.deactivate.call(this);
        this._okButton.deactivate();
        this._noButton.deactivate();
    };

    Window_QuestOrderedConfirmWindow.prototype.selectIdx = function (idx) {
        for (var i = 0; i < this._buttonList.length; i++) {
            this._buttonList[i].deactivate();
            this._buttonList[i].resetImgTone();
        }
        var tIdx = idx;
        if (idx <= 0) {
            tIdx = 0;
        } else if (idx >= this._buttonList.length - 1) {
            tIdx = this._buttonList.length - 1;
        } else {
            tIdx = idx;
        }
        this._buttonList[tIdx].activate();
    };

    Window_QuestOrderedConfirmWindow.prototype.isOpenAndActive = function () {
        return this.isOpen() && this.active;
    };

    Window_QuestOrderedConfirmWindow.prototype.getActiveButtonWindow = function () {
        var rtnWindow = null;
        this._buttonList.forEach(function (window) {
            if (window.isOpenAndActive()) {
                rtnWindow = window;
            }
        });
        return rtnWindow;
    };

    Window_QuestOrderedConfirmWindow.prototype.getButtonWindowList = function () {
        return this._buttonList;
    };

    // 確認ウィンドウ用の確認ボタン
    function Window_QuestOrderedConfirm_ButtonWindow() {
        this.initialize.apply(this, arguments);
    }

    Window_QuestOrderedConfirm_ButtonWindow.prototype = Object.create(Window_Base.prototype);
    Window_QuestOrderedConfirm_ButtonWindow.prototype.constructor = Window_QuestOrderedConfirm_ButtonWindow;

    Window_QuestOrderedConfirm_ButtonWindow.prototype.initialize = function (x, y, width, height, okFlag) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._isOkButton = okFlag;
        this._colorMoveCnt = 0;
        this._r = 100;
        this._g = 100;
        this._b = 100;
        this._r_num = this._r / 10 * -1;
        this._g_num = this._g / 10 * -1;
        this._b_num = this._b / 10 * -1;
        // var systemTone = [this._r ,this._g, this._b];
        // this.setTone(systemTone[0],systemTone[1],systemTone[2]);
        this._buttonImg = null;
    };

    Window_QuestOrderedConfirm_ButtonWindow.prototype.setButtonImg = function (img) {
        this._buttonImg = img;
    };

    Window_QuestOrderedConfirm_ButtonWindow.prototype.forcedClose = function () {
        this.openness = 0;
        this._opening = false;
        this.deactivate();
    };

    Window_QuestOrderedConfirm_ButtonWindow.prototype.update = function () {
        //Window_Base.prototype.update.call(this);
        if (this.isOpenAndActive()) {
            if (this._colorMoveCnt >= 3) {
                this._r += this._r_num;
                this._g += this._g_num;
                this._b += this._b_num;
                this._buttonImg.setColorTone([this._r, this._g, this._b, 0]);
                this._colorMoveCnt = 0;

                if (this._r <= 0 || this._r > 100) {
                    this._r_num = this._r_num * -1;
                    this._g_num = this._g_num * -1;
                    this._b_num = this._b_num * -1;
                }
            }
            this._colorMoveCnt++;
        } else {
            // var systemTone = $gameSystem.windowTone();
            // this.setTone(systemTone[0],systemTone[1],systemTone[2]);
        }
    };

    Window_QuestOrderedConfirm_ButtonWindow.prototype.resetImgTone = function () {
        if (this._buttonImg) {
            this._r = 100;
            this._g = 100;
            this._b = 100;
            this._colorMoveCnt = 0;
            this._buttonImg.setColorTone([0, 0, 0, 0]);
        }
    };

    Window_QuestOrderedConfirm_ButtonWindow.prototype.isOpenAndActive = function () {
        return this.isOpen() && this.active;
    };

    Window_QuestOrderedConfirm_ButtonWindow.prototype.isActive = function () {
        return this.active;
    };

    Window_QuestOrderedConfirm_ButtonWindow.prototype.isOkButton = function () {
        return this._isOkButton;
    };

    // ================================================================================================
    // クエストシステムの依頼人を表示する。
    // ================================================================================================
    function Window_QuestSystemDetailOtherWindow() {
        this.initialize.apply(this, arguments);
    }

    Window_QuestSystemDetailOtherWindow.prototype = Object.create(Window_Base.prototype);
    Window_QuestSystemDetailOtherWindow.prototype.constructor = Window_QuestSystemDetailOtherWindow;

    Window_QuestSystemDetailOtherWindow.prototype.initialize = function (y, title, note) {
        var windowWidth = Graphics.width - QUEST_SYSTEM_QUESTLIST_WIDTH - 35;
        var windowXpos = QUEST_SYSTEM_QUESTLIST_WIDTH + 35;
        Window_Base.prototype.initialize.call(this, windowXpos, y, windowWidth, 200);
        this._title = title;
        this._note = note;
    };

    Window_QuestSystemDetailOtherWindow.prototype.setTitle = function (title) {
        this._title = title;
    };

    Window_QuestSystemDetailOtherWindow.prototype.setNote = function (note) {
        this._note = note;
    };

    Window_QuestSystemDetailOtherWindow.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        if (this.contents) {
            this.contents.clear();
        }
        this.drawTitle();
        this.drawNote();
    };

    Window_QuestSystemDetailOtherWindow.prototype.drawTitle = function () {
        this.drawTextEx(this._title, 10, 0);
    };

    Window_QuestSystemDetailOtherWindow.prototype.drawNote = function () {
        this.drawTextEx(this._note, 10, 25);
    };

    Window_QuestSystemDetailOtherWindow.prototype.standardFontSize = function () {
        return 17;
    };

    // ====================================================================================
    // クエストシステムおよび、ファストトラベル、クエストレポート共通の使用不可を伝えるメッセージウィンドウ
    // ====================================================================================
    function Window_Common_Message_Window() {
        this.initialize.apply(this, arguments);
    }

    Window_Common_Message_Window.prototype = Object.create(Window_Base.prototype);
    Window_Common_Message_Window.prototype.constructor = Window_Common_Message_Window;

    Window_Common_Message_Window.prototype.initialize = function () {
        Window_Base.prototype.initialize.call(this, (Graphics.width / 2 - 200), (Graphics.height / 2 - 100), 400, 200);
    };

    Window_Common_Message_Window.prototype.drawMessage = function (txt) {
        if (this.contents) {
            this.contents.clear();
        }
        this.drawTextEx(txt, 0, 0);
    };

    Window_Common_Message_Window.prototype.forcedClose = function () {
        this.openness = 0;
        this._opening = false;
        this.deactivate();
    };

    function Scene_QuestListView() {
        this.initialize.apply(this, arguments);
    }

    SceneManager._Scene_QuestListView_lastIndex = 0;
    Scene_QuestListView.prototype = Object.create(Scene_Base.prototype);
    Scene_QuestListView.prototype.constructor = Scene_QuestListView;
    Scene_QuestListView.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_QuestListView.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        Scene_Base.prototype.createWindowLayer.call(this);
        let regionList = {
            "Fotizona Region/Adventurer's Guild": "guild", "Barie Region/Tavern of the Valley City of Barie": "バリエ", "Kanonas Region/Magic Academy": "カノナス", "Kampus Region/Tavern of the Grassland City of Kampus": "カンプス", "Mykos Region/Sailor's Office in the Port Town of Mykos": "ミュコス", "Oros Region/Tavern in the Mountain City of Oros": "オロス", "Valt Region/Tavern in the Forest City of Valt": "ヴァルト"
        };
        this._regionListWindow = new Window_RegionListWindow(regionList);
        this.addWindow(this._regionListWindow);
        this._regionListWindow.activate();
        this._regionListWindow.setHandler("ok", this.okClick.bind(this));
        this._regionListWindow.setHandler("cancel", this.cancelClick.bind(this));
    };

    Scene_QuestListView.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadPicture("SceneRegionQuestList");
        this.addChild(this._backgroundSprite);
    };

    Scene_QuestListView.prototype.okClick = function () {
        SceneManager._Scene_QuestListView_lastIndex = this._regionListWindow.index();
        $gameSwitches.setValue(SD_QUESTSYSTEM_READONLYSWITCHNO, true);
        _questOpenPosition = this._regionListWindow.getIndexQuestSystemRegionArgKey();
        Scene_QuestMenuWindow.setQuestPlace(_questOpenPosition);
        SceneManager.push(Scene_QuestMenuWindow);
    };

    Scene_QuestListView.prototype.cancelClick = function () {
        SceneManager._Scene_QuestListView_lastIndex = 0;
        $gameSwitches.setValue(SD_QUESTSYSTEM_READONLYSWITCHNO, false);
        this.popScene();
    };

    function Window_RegionListWindow() {
        this.initialize.apply(this, arguments);
    }

    Window_RegionListWindow.prototype = Object.create(Window_Selectable.prototype);
    Window_RegionListWindow.prototype.constructor = Window_RegionListWindow;

    Window_RegionListWindow.prototype.initialize = function (regionList) {
        let windowWidth = 0;
        this._regionList = regionList;
        this._regionNameList = [];
        let windowHeight = (Object.keys(regionList).length * 43);
        let ypos = (Graphics.height / 2) - (windowHeight / 2);
        Window_Selectable.prototype.initialize.call(this, 0, 0, 800, windowHeight);
        for (let key in regionList) {
            this._regionNameList.push(key);
            let textWidth = this.textWidth(key);
            if (windowWidth < textWidth) {
                windowWidth = textWidth;
            }
        }
        let xpos = (Graphics.width / 2) - (windowWidth / 2);

        this.move(xpos, ypos, windowWidth + 50, windowHeight);
        this.refresh();
        this.select(SceneManager._Scene_QuestListView_lastIndex);
    };

    Window_RegionListWindow.prototype.create = function () {
        Window_Selectable.prototype.create.call(this);
    };

    Window_RegionListWindow.prototype.getIndexQuestSystemRegionArgKey = function () {
        let index = this.index();
        var item = this._regionNameList[index];
        return this._regionList[item];
    };

    Window_RegionListWindow.prototype.drawItem = function (index) {
        if (this._regionNameList) {
            var item = this._regionNameList[index];
            this.changePaintOpacity(this.islistRegionEnables(item));
            var rect = this.itemRect(index);
            this.drawText(item, rect.x, rect.y, this.width);
        }
    };

    Window_RegionListWindow.prototype.islistRegionEnables = function (item) {
        let returnResult = false;
        switch (item) {
            case "Fotizona Region/Adventurer's Guild":
                returnResult = ($gameVariables.value(502) >= 85);
                break;
            case "Barie Region/Tavern of the Valley City of Barie":
                returnResult = ($gameVariables.value(509) >= 75);
                break;
            case "Kanonas Region/Magic Academy":
                returnResult = ($gameVariables.value(511) >= 999);
                break;
            case "Kampus Region/Tavern of the Grassland City of Kampus":
                returnResult = ($gameVariables.value(514) >= 50);
                break;
            case "Mykos Region/Sailor's Office in the Port Town of Mykos":
                returnResult = ($gameVariables.value(526) >= 999);
                break;
            case "Oros Region/Tavern in the Mountain City of Oros":
                returnResult = ($gameVariables.value(535) >= 35);
                break;
            case "Valt Region/Tavern in the Forest City of Valt":
                returnResult = ($gameVariables.value(569) >= 10);
                break;
            default:
                break;
        }
        return returnResult;
    };

    Window_RegionListWindow.prototype.maxCols = function () {
        return 1;
    };

    Window_RegionListWindow.prototype.maxItems = function () {
        return (this._regionNameList != null && this._regionNameList != undefined && this._regionNameList.length > 0) ? this._regionNameList.length : 0;
    };

    Window_RegionListWindow.prototype.isCurrentItemEnabled = function () {
        if (this._regionNameList) {
            var item = this._regionNameList[this.index()];
            return this.islistRegionEnables(item);
        }
        return false;
    };
}

)();