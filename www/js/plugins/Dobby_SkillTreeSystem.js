//=============================================================================
// Dobby_SkillTreeSystem.js
// 内容：スキルツリー/裏スキル習得システムを実装するプラグイン
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc スキルツリーのプラグイン
 * @author スタジオドビー
 *
 * @param aspVariableList
 * @desc 各キャラのASPの変数を設定する。１列目からActor1となる。
 * @type variable[]
 * @default ["75","77","79","81"]
 *
 * @param spVariableList
 * @desc 各キャラのスキルポイントの変数を設定する。１列目からActor1となる。
 * @type variable[]
 * @default ["74","76","78","80"]
 *
 * @param nastyParameList
 * @desc 各キャラの淫乱値を管理する変数
 * @type variable[]
 * @default ["37","41","39","43"]
 *
 * @param nastyLvList
 * @desc 各キャラの淫乱レベルを管理する変数
 * @type variable[]
 * @default ["36","40","38","42"]
 *
 * @param cleahissatu
 * @text クレアの必殺1スイッチ
 * @type switch
 * @default 0
 * @desc クレアの必殺1スイッチ
 *
 * @param cleahissatu2
 * @text クレアの必殺Lv2スイッチ
 * @type switch
 * @default 0
 * @desc クレアの必殺Lv2スイッチ
 *
 * @param cleahissatu3
 * @text クレアの必殺Lv3スイッチ
 * @type switch
 * @default 0
 * @desc クレアの必殺Lv3スイッチ
 *
 * @param cleahissatu4
 * @text クレアの必殺Lv4スイッチ
 * @type switch
 * @default 0
 * @desc クレアの必殺Lv4スイッチ
 *
 * @param cleazangeki
 * @text クレアの斬撃1スイッチ
 * @type switch
 * @default 0
 * @desc クレアの斬撃1スイッチ
 *
 * @param cleazangeki2
 * @text クレアの斬撃Lv2スイッチ
 * @type switch
 * @default 0
 * @desc クレアの斬撃Lv2スイッチ
 *
 * @param cleazangeki3
 * @text クレアの斬撃Lv3スイッチ
 * @type switch
 * @default 0
 * @desc クレアの斬撃Lv3スイッチ
 *
 * @param cleazangeki4
 * @text クレアの斬撃Lv4スイッチ
 * @type switch
 * @default 0
 * @desc クレアの斬撃Lv4スイッチ
 *
 * @param cleakaosu
 * @text クレアの混沌1スイッチ
 * @type switch
 * @default 0
 * @desc クレアの混沌1スイッチ
 *
 * @param cleakaosu2
 * @text クレアの混沌Lv2スイッチ
 * @type switch
 * @default 0
 * @desc クレアの混沌Lv2スイッチ
 *
 * @param cleakaosu3
 * @text クレアの混沌Lv3スイッチ
 * @type switch
 * @default 0
 * @desc クレアの混沌Lv3スイッチ
 *
 * @param cleakaosu4
 * @text クレアの混沌Lv4スイッチ
 * @type switch
 * @default 0
 * @desc クレアの混沌Lv4スイッチ
 *
 * @param cleaiatsu
 * @text クレアの威圧1スイッチ
 * @type switch
 * @default 0
 * @desc クレアの威圧1スイッチ
 *
 * @param cleaiatsu2
 * @text クレアの威圧Lv2スイッチ
 * @type switch
 * @default 0
 * @desc クレアの威圧Lv2スイッチ
 *
 * @param cleaiatsu3
 * @text クレアの威圧Lv3スイッチ
 * @type switch
 * @default 0
 * @desc クレアの威圧Lv3スイッチ
 *
 * @param cleaiatsu4
 * @text クレアの威圧Lv4スイッチ
 * @type switch
 * @default 0
 * @desc クレアの威圧Lv4スイッチ
 *
 * @param norakaijo
 * @text ノラの解錠1スイッチ
 * @type switch
 * @default 0
 * @desc ノラの解錠1スイッチ
 *
 * @param norakaijo2
 * @text ノラの解錠Lv2スイッチ
 * @type switch
 * @default 0
 * @desc ノラの解錠Lv2スイッチ
 *
 * @param norakaijo3
 * @text ノラの解錠Lv3スイッチ
 * @type switch
 * @default 0
 * @desc ノラの解錠Lv3スイッチ
 *
 * @param norakaijo4
 * @text ノラの解錠Lv4スイッチ
 * @type switch
 * @default 0
 * @desc ノラの解錠Lv4スイッチ
 *
 * @param norakairiki
 * @text ノラの怪力1スイッチ
 * @type switch
 * @default 0
 * @desc ノラの怪力1スイッチ
 *
 * @param norakairiki2
 * @text ノラの怪力Lv2スイッチ
 * @type switch
 * @default 0
 * @desc ノラの怪力Lv2スイッチ
 *
 * @param norakairiki3
 * @text ノラの怪力Lv3スイッチ
 * @type switch
 * @default 0
 * @desc ノラの怪力Lv3スイッチ
 *
 * @param norakairiki4
 * @text ノラの怪力Lv4スイッチ
 * @type switch
 * @default 0
 * @desc ノラの怪力Lv4スイッチ
 *
 * @param norakyukaku
 * @text ノラの嗅覚1スイッチ
 * @type switch
 * @default 0
 * @desc ノラの嗅覚1スイッチ
 *
 * @param norakyukaku2
 * @text ノラの嗅覚Lv2スイッチ
 * @type switch
 * @default 0
 * @desc ノラの嗅覚Lv2スイッチ
 *
 * @param norakyukaku3
 * @text ノラの嗅覚Lv3スイッチ
 * @type switch
 * @default 0
 * @desc ノラの嗅覚Lv3スイッチ
 *
 * @param norakyukaku4
 * @text ノラの嗅覚Lv4スイッチ
 * @type switch
 * @default 0
 * @desc ノラの嗅覚Lv4スイッチ
 *
 * @param noraonmitu
 * @text ノラの隠密1スイッチ
 * @type switch
 * @default 0
 * @desc ノラの隠密1スイッチ
 *
 * @param noraonmitu2
 * @text ノラの隠密Lv2スイッチ
 * @type switch
 * @default 0
 * @desc ノラの隠密Lv2スイッチ
 *
 * @param noraonmitu3
 * @text ノラの隠密Lv3スイッチ
 * @type switch
 * @default 0
 * @desc ノラの隠密Lv3スイッチ
 *
 * @param noraonmitu4
 * @text ノラの隠密Lv4スイッチ
 * @type switch
 * @default 0
 * @desc ノラの隠密Lv4スイッチ
 *
 * @param relmkaiho
 * @text リルムの解放1スイッチ
 * @type switch
 * @default 0
 * @desc リルムの解放1スイッチ
 *
 * @param relmkaiho2
 * @text リルムの解放Lv2スイッチ
 * @type switch
 * @default 0
 * @desc リルムの解放Lv2スイッチ
 *
 * @param relmkaiho3
 * @text リルムの解放Lv3スイッチ
 * @type switch
 * @default 0
 * @desc リルムの解放Lv3スイッチ
 *
 * @param relmkaiho4
 * @text リルムの解放Lv4スイッチ
 * @type switch
 * @default 0
 * @desc リルムの解放Lv4スイッチ
 *
 * @param relmhaken
 * @text リルムの発見1スイッチ
 * @type switch
 * @default 0
 * @desc リルムの発見1スイッチ
 *
 * @param relmhaken2
 * @text リルムの発見Lv2スイッチ
 * @type switch
 * @default 0
 * @desc リルムの発見Lv2スイッチ
 *
 * @param relmhaken3
 * @text リルムの発見Lv3スイッチ
 * @type switch
 * @default 0
 * @desc リルムの発見Lv3スイッチ
 *
 * @param relmhaken4
 * @text リルムの発見Lv4スイッチ
 * @type switch
 * @default 0
 * @desc リルムの発見Lv4スイッチ
 *
 * @param relmkaidoku
 * @text リルムの解読1スイッチ
 * @type switch
 * @default 0
 * @desc リルムの解読1スイッチ
 *
 * @param relmkaidoku2
 * @text リルムの解読Lv2スイッチ
 * @type switch
 * @default 0
 * @desc リルムの解読Lv2スイッチ
 *
 * @param relmkaidoku3
 * @text リルムの解読Lv3スイッチ
 * @type switch
 * @default 0
 * @desc リルムの解読Lv3スイッチ
 *
 * @param relmkaidoku4
 * @text リルムの解読Lv4スイッチ
 * @type switch
 * @default 0
 * @desc リルムの解読Lv4スイッチ
 *
 * @param relmidou
 * @text リルムの移動1スイッチ
 * @type switch
 * @default 0
 * @desc リルムの移動1スイッチ
 *
 * @param relmidou2
 * @text リルムの移動Lv2スイッチ
 * @type switch
 * @default 0
 * @desc リルムの移動Lv2スイッチ
 *
 * @param relmidou3
 * @text リルムの移動Lv3スイッチ
 * @type switch
 * @default 0
 * @desc リルムの移動Lv3スイッチ
 *
 * @param relmidou4
 * @text リルムの移動Lv4スイッチ
 * @type switch
 * @default 0
 * @desc リルムの移動Lv4スイッチ
 *
 * @param sophiashukuhuku
 * @text ソフィアの祝福Lv1スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの祝福Lv1スイッチ
 *
 * @param sophiashukuhuku2
 * @text ソフィアの祝福Lv2スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの祝福Lv2スイッチ
 *
 * @param sophiashukuhuku3
 * @text ソフィアの祝福Lv3スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの祝福Lv3スイッチ
 *
 * @param sophiashukuhuku4
 * @text ソフィアの祝福Lv4スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの祝福Lv4スイッチ
 *
 * @param sophiakyoukatsu
 * @text ソフィアの恐喝Lv1スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの恐喝Lv1スイッチ
 *
 * @param sophiakyoukatsu2
 * @text ソフィアの恐喝Lv2スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの恐喝Lv2スイッチ
 *
 * @param sophiakyoukatsu3
 * @text ソフィアの恐喝Lv3スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの恐喝Lv3スイッチ
 *
 * @param sophiakyoukatsu4
 * @text ソフィアの恐喝Lv4スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの恐喝Lv4スイッチ
 *
 * @param sophiakitou
 * @text ソフィアの祈祷Lv1スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの祈祷Lv1スイッチ
 *
 * @param sophiakitou2
 * @text ソフィアの祈祷Lv2スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの祈祷Lv2スイッチ
 *
 * @param sophiakitou3
 * @text ソフィアの祈祷Lv3スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの祈祷Lv3スイッチ
 *
 * @param sophiakitou4
 * @text ソフィアの祈祷Lv4スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの祈祷Lv4スイッチ
 *
 * @param sophiayuwaku
 * @text ソフィアの誘惑Lv1スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの誘惑Lv1スイッチ
 *
 * @param sophiayuwaku2
 * @text ソフィアの誘惑Lv2スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの誘惑Lv2スイッチ
 *
 * @param sophiayuwaku3
 * @text ソフィアの誘惑Lv3スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの誘惑Lv3スイッチ
 *
 * @param sophiayuwaku4
 * @text ソフィアの誘惑Lv4スイッチ
 * @type switch
 * @default 0
 * @desc ソフィアの誘惑Lv4スイッチ
 *
 */

(function () {

    var getArgJson = function (arg, defaultValue) {
        try {
            arg = JSON.parse(arg || null);
            if (arg === null) {
                arg = defaultValue;
            }
        } catch (e) {
            alert(`!!!Plugin param is wrong.!!!\nPlugin:Dobby_SkillTreeSystem.js\nValue:${arg}`);
            arg = defaultValue;
        }
        return arg;
    };

    var SkillTreeP = SkillTreeP || {};
    var parameters = PluginManager.parameters('Dobby_SkillTreeSystem');

    SkillTreeP.spVariableList = getArgJson(parameters['spVariableList'] || ["74", "76", "78", "80"]);
    SkillTreeP.aspVariableList = getArgJson(parameters['aspVariableList'] || ["75", "77", "79", "81"]);
    SkillTreeP.nastyParameList = getArgJson(parameters['nastyParameList'] || ["37", "41", "39", "43"]);
    SkillTreeP.nastyLvList = getArgJson(parameters['nastyLvList'] || ["36", "40", "38", "42"]);

    // クレア
    SkillTreeP.cleahissatu = parseInt(parameters['cleahissatu'] || 0);
    SkillTreeP.cleahissatu2 = parseInt(parameters['cleahissatu2'] || 0);
    SkillTreeP.cleahissatu3 = parseInt(parameters['cleahissatu3'] || 0);
    SkillTreeP.cleahissatu4 = parseInt(parameters['cleahissatu4'] || 0);
    SkillTreeP.cleazangeki = parseInt(parameters['cleazangeki'] || 0);
    SkillTreeP.cleazangeki2 = parseInt(parameters['cleazangeki2'] || 0);
    SkillTreeP.cleazangeki3 = parseInt(parameters['cleazangeki3'] || 0);
    SkillTreeP.cleazangeki4 = parseInt(parameters['cleazangeki4'] || 0);
    SkillTreeP.cleakaosu = parseInt(parameters['cleakaosu'] || 0);
    SkillTreeP.cleakaosu2 = parseInt(parameters['cleakaosu2'] || 0);
    SkillTreeP.cleakaosu3 = parseInt(parameters['cleakaosu3'] || 0);
    SkillTreeP.cleakaosu4 = parseInt(parameters['cleakaosu4'] || 0);
    SkillTreeP.cleaiatsu = parseInt(parameters['cleaiatsu'] || 0);
    SkillTreeP.cleaiatsu2 = parseInt(parameters['cleaiatsu2'] || 0);
    SkillTreeP.cleaiatsu3 = parseInt(parameters['cleaiatsu3'] || 0);
    SkillTreeP.cleaiatsu4 = parseInt(parameters['cleaiatsu4'] || 0);
    // ノラ
    SkillTreeP.norakaijo = parseInt(parameters['norakaijo'] || 0);
    SkillTreeP.norakaijo2 = parseInt(parameters['norakaijo2'] || 0);
    SkillTreeP.norakaijo3 = parseInt(parameters['norakaijo3'] || 0);
    SkillTreeP.norakaijo4 = parseInt(parameters['norakaijo4'] || 0);
    SkillTreeP.norakairiki = parseInt(parameters['norakairiki'] || 0);
    SkillTreeP.norakairiki2 = parseInt(parameters['norakairiki2'] || 0);
    SkillTreeP.norakairiki3 = parseInt(parameters['norakairiki3'] || 0);
    SkillTreeP.norakairiki4 = parseInt(parameters['norakairiki4'] || 0);
    SkillTreeP.norakyukaku = parseInt(parameters['norakyukaku'] || 0);
    SkillTreeP.norakyukaku2 = parseInt(parameters['norakyukaku2'] || 0);
    SkillTreeP.norakyukaku3 = parseInt(parameters['norakyukaku3'] || 0);
    SkillTreeP.norakyukaku4 = parseInt(parameters['norakyukaku4'] || 0);
    SkillTreeP.noraonmitu = parseInt(parameters['noraonmitu'] || 0);
    SkillTreeP.noraonmitu2 = parseInt(parameters['noraonmitu2'] || 0);
    SkillTreeP.noraonmitu3 = parseInt(parameters['noraonmitu3'] || 0);
    SkillTreeP.noraonmitu4 = parseInt(parameters['noraonmitu4'] || 0);
    // リルム
    SkillTreeP.relmkaiho = parseInt(parameters['relmkaiho'] || 0);
    SkillTreeP.relmkaiho2 = parseInt(parameters['relmkaiho2'] || 0);
    SkillTreeP.relmkaiho3 = parseInt(parameters['relmkaiho3'] || 0);
    SkillTreeP.relmkaiho4 = parseInt(parameters['relmkaiho4'] || 0);
    SkillTreeP.relmhaken = parseInt(parameters['relmhaken'] || 0);
    SkillTreeP.relmhaken2 = parseInt(parameters['relmhaken2'] || 0);
    SkillTreeP.relmhaken3 = parseInt(parameters['relmhaken3'] || 0);
    SkillTreeP.relmhaken4 = parseInt(parameters['relmhaken4'] || 0);
    SkillTreeP.relmkaidoku = parseInt(parameters['relmkaidoku'] || 0);
    SkillTreeP.relmkaidoku2 = parseInt(parameters['relmkaidoku2'] || 0);
    SkillTreeP.relmkaidoku3 = parseInt(parameters['relmkaidoku3'] || 0);
    SkillTreeP.relmkaidoku4 = parseInt(parameters['relmkaidoku4'] || 0);
    SkillTreeP.relmidou = parseInt(parameters['relmidou'] || 0);
    SkillTreeP.relmidou2 = parseInt(parameters['relmidou2'] || 0);
    SkillTreeP.relmidou3 = parseInt(parameters['relmidou3'] || 0);
    SkillTreeP.relmidou4 = parseInt(parameters['relmidou4'] || 0);
    // ソフィア
    SkillTreeP.sophiashukuhuku = parseInt(parameters['sophiashukuhuku'] || 0);
    SkillTreeP.sophiashukuhuku2 = parseInt(parameters['sophiashukuhuku2'] || 0);
    SkillTreeP.sophiashukuhuku3 = parseInt(parameters['sophiashukuhuku3'] || 0);
    SkillTreeP.sophiashukuhuku4 = parseInt(parameters['sophiashukuhuku4'] || 0);
    SkillTreeP.sophiakyoukatsu = parseInt(parameters['sophiakyoukatsu'] || 0);
    SkillTreeP.sophiakyoukatsu2 = parseInt(parameters['sophiakyoukatsu2'] || 0);
    SkillTreeP.sophiakyoukatsu3 = parseInt(parameters['sophiakyoukatsu3'] || 0);
    SkillTreeP.sophiakyoukatsu4 = parseInt(parameters['sophiakyoukatsu4'] || 0);
    SkillTreeP.sophiakitou = parseInt(parameters['sophiakitou'] || 0);
    SkillTreeP.sophiakitou2 = parseInt(parameters['sophiakitou2'] || 0);
    SkillTreeP.sophiakitou3 = parseInt(parameters['sophiakitou3'] || 0);
    SkillTreeP.sophiakitou4 = parseInt(parameters['sophiakitou4'] || 0);
    SkillTreeP.sophiayuwaku = parseInt(parameters['sophiayuwaku'] || 0);
    SkillTreeP.sophiayuwaku2 = parseInt(parameters['sophiayuwaku2'] || 0);
    SkillTreeP.sophiayuwaku3 = parseInt(parameters['sophiayuwaku3'] || 0);
    SkillTreeP.sophiayuwaku4 = parseInt(parameters['sophiayuwaku4'] || 0);

    // 他プラグインから持ってきた処女スイッチ
    var skillTreeAddParameterNastyPP = PluginManager.parameters('Dobby_NastyParamaterCheck');
    SkillTreeP.cleaNotVirginSwitch = parseInt(skillTreeAddParameterNastyPP['cleaNotVirginSwitch'] || 0);
    SkillTreeP.noraNotVirginSwitch = parseInt(skillTreeAddParameterNastyPP['noraNotVirginSwitch'] || 0);
    SkillTreeP.relmNotVirginSwitch = parseInt(skillTreeAddParameterNastyPP['relmNotVirginSwitch'] || 0);
    SkillTreeP.sophiaNotVirginSwitch = parseInt(skillTreeAddParameterNastyPP['sophiaNotVirginSwitch'] || 0);

    const SKILL_TYPE_A = "A";
    const SKILL_TYPE_B = "B";
    const SKILL_TYPE_C = "C";
    const SKILL_TYPE_D = "D";
    const SKILL_TYPE_E = "E";
    const SKILL_TYPE_F = "F";
    const SE_QUEST_ORDERED = "se_maoudamashii_jingle06";
    const SE_INRAN_WARNING = "inranWarnig";
    const MAX_LEVEL = 3;
    const INRANCHI_ZOUKARITSU = 2;
    const INRANCHI_MAX = 108;

    var g_skillTypeList = [SKILL_TYPE_A, SKILL_TYPE_B, SKILL_TYPE_C, SKILL_TYPE_D, SKILL_TYPE_E, SKILL_TYPE_F];
    var g_skillGroupDescriptnList = {
        "A": "「アタック」のスキルツリーです",
        "B": "「レジスト」のスキルツリーです",
        "C": "「テクニカル」のスキルツリーです",
        "D": "「ユニーク」のスキルツリーです",
        "E": "「ステータス」のスキルツリーです",
        "F": "「ＡＡＡ」のスキルツリーです"
    };
    var startPosition = [5, 8];

    Main_Window._iconWidth = 32;
    Main_Window._iconHeight = 32;

    const SKILL_ICON_DISP_BASE_X = 430 - 6;
    const SKILL_ICON_DISP_BASE_Y = 320;
    const RING_DISP_BASE_X = 450;
    const RING_DISP_BASE_Y = 480;
    const NEXT_ALL_BASE_X = 1024;
    const NEXT_ALL_BASE_Y = 640;

    const SKILL_LEARN_COLOR = "#00aaff";

    const NASTYSKILL_VIEWEDCNT_STR = "viewedCnt";
    const NASTYSKILL_ALLCNT_STR = "allCnt";

    const NASTYSKILL_LIST = {
        1: 4801,
        2: 4837,
        3: 4819,
        4: 4855
    };

    function SkillData(skillId,
        skillName,
        backSkillId,
        derivationIdList,
        reinforcementDestinationFlag,
        reinforcementDestinationId,
        x,
        y,
        start,
        hospitality,
        actorIds,
        sp,
        groupType,
        skillIconFileName,
        variableNo,
        taikenban) {

        this._skillId = skillId;
        this._skillName = skillName;
        this._backSkillid = backSkillId;
        this._derivationIdList = new Array();
        var tmp = this._derivationIdList;
        if (derivationIdList != null) {
            derivationIdList.split("_").forEach(function (tderivationId) {
                if (!isNaN(tderivationId)) {
                    tmp.push(Number(tderivationId));
                }
            });
        }

        if (reinforcementDestinationFlag != null) {
            this._reinforcementDestinationFlag = reinforcementDestinationFlag.toLowerCase() == "true" ? true : false;
        }

        this._reinforcementDestinationId;
        if (!isNaN(reinforcementDestinationId)) {
            this._reinforcementDestinationId = Number(reinforcementDestinationId);
        } else {
            this._reinforcementDestinationId = reinforcementDestinationId;
        }
        // var tmp2 = this._reinforcementDestinationId;

        // var tmp2 = this._reinforcementDestinationId;
        // if (reinforcementDestinationId != null) {
        //     reinforcementDestinationId.split("_").forEach(function(id){
        //         if (!isNaN(id)) {
        //             tmp2.push(Number(id));
        //         }
        //     });
        // }

        this._derivationIdList = new Array();
        var tmp = this._derivationIdList;
        if (derivationIdList != null) {
            derivationIdList.split("_").forEach(function (tderivationId) {
                if (!isNaN(tderivationId)) {
                    tmp.push(Number(tderivationId));
                }
            });
        }

        this._iconIndex = 0;
        this._sp = Number(sp);
        this._x = Number(x);
        this._y = Number(y);
        this._start = false;
        if (start != null) {
            this._start = start.toLowerCase() == "true" ? true : false;
        }

        this._hospitality = false;
        if (hospitality != null) {
            this._hospitality = hospitality.toLowerCase() == "true" ? true : false;
        }

        this._dispX = 0;
        this._dispY = 0;
        this._actorIds = new Array();
        var tmp3 = this._actorIds;
        if (actorIds != null) {
            actorIds.split("_").forEach(function (id) {
                if (!isNaN(id)) {
                    tmp3.push(Number(id));
                }
            });
        }

        this._variableNo = 0;
        if (!isNaN(variableNo)) {
            this._variableNo = Number(variableNo);
        }

        this._iconSizeWidth = 52;
        this._iconSizeHeight = 52;
        this._isLearn = false;
        this._active = false;
        this._getPossible = false;
        this._typeGroup = groupType;
        this._skillIcon = null;
        this._skillIconFileName = "";
        if ($gameSwitches.value(74) && taikenban != null && taikenban != "") {
            this._skillIconFileName = skillIconFileName + "_" + taikenban;
        } else {
            this._skillIconFileName = skillIconFileName;
        }
        this._description = null;
        this._backSkillDescription = null;
        this._dmp = 0;
        this._taikenban = taikenban;
    };

    function SkillPeggingSkillLine(childSkillId, parentSKillId, lineFromX, lineFromY, lineToX, lineToY) {
        this._skillId = childSkillId;
        this._parentSkillId = parentSKillId;
        this._lineFromX = lineFromX;
        this._lineFromY = lineFromY;
        this._lineToX = lineToX;
        this._lineToY = lineToY;
    };

    function adjustPadding(size) {
        return size + 19;
    };

    function adjustNextAllBaseX(movePoint) {
        var nextAllBaseX = NEXT_ALL_BASE_X;
        if (movePoint != undefined && movePoint < 0) {
            nextAllBaseX = nextAllBaseX * -1;
        }
        return nextAllBaseX;
    };

    // 拡張子によって読み込むファイルを変更する
    // csv読み込み用拡張
    var path2 = require('path');
    //jsonから直接抜く
    var fs2 = require('fs');
    var projectFilePath2 = decodeURIComponent(path2.dirname(window.location.pathname.slice(1)));

    function loadCSVFile(src) {
        return fs2.readFileSync(projectFilePath2 + '/data/dobbyPlugin/db/' + src, 'utf-8');
    };

    // クエストレポートの読み込み処理
    function loadTreeInfo() {
        return loadCSVFile("skillInfo.csv");
    };

    function nullOrEnpty(test) {
        return (test == null || test == "");
    };

    function getSKillInfoCsv() {
        var skillInfoStr = loadTreeInfo();
        if (nullOrEnpty(skillInfoStr)) {
            return false;
        }

        var tmp = skillInfoStr.split("<br>");
        var skillDataList = new Array();
        for (var i = 1; i < tmp.length; i++) {
            var tmpSkill = tmp[i].split(",");
            var idx = 1;
            var skilldata = new SkillData(
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++],
                tmpSkill[idx++]
            );
            skillDataList.push(skilldata);
        }

        return skillDataList;
    };

    // 現在表示しているキャラのスキル情報を取得する。
    function getAllParameter(thisObj) {
        var skillDataList = getSKillInfoCsv();
        var skills = $dataSkills;
        var actor = thisObj._actor;
        for (var i = 0; i < skillDataList.length; i++) {
            var csvSkillData = skillDataList[i];
            var skillDbDataList = skills.filter(function (value) {
                return (value != null && Number(csvSkillData._skillId) === Number(value.id));
            });

            if (csvSkillData._hospitality) {
                if (skillDbDataList != null && skillDbDataList.length > 0 && csvSkillData._actorIds != null && csvSkillData._actorIds.includes(Number(actor._actorId))) {
                    var skillDbData = skillDbDataList[0];
                    csvSkillData._skillName = skillDbData.name;
                    csvSkillData._skillId = skillDbData.id;
                    csvSkillData._iconIndex = skillDbData.iconIndex;
                    csvSkillData._dmp = skillDbData.mpCost;

                    //csvSkillData._description = skillDbData.description;
                    csvSkillData._description = getNormalSkillDescriptionRegExpStr(skillDbData.note);

                    if (csvSkillData._derivationIdList != null && csvSkillData._derivationIdList.length > 0 && !csvSkillData._start) {
                        var resultList = csvSkillData._derivationIdList.filter(function (derId) {
                            var tmpSKillDataList = skillDataList.filter(function (value) {
                                return value != null && Number(derId) == Number(value._skillId);
                            });
                            var sData = RecursionGetSkill(thisObj, tmpSKillDataList[0], skillDataList);
                            if (sData == null) {
                                return actor.hasSkill(Number(tmpSKillDataList[0]._skillId))
                            } else {
                                return actor.hasSkill(Number(sData._skillId))
                            }

                        });

                        if (resultList.length == csvSkillData._derivationIdList.length) {
                            csvSkillData._getPossible = true;
                        }

                    } else if (csvSkillData._start) {
                        csvSkillData._getPossible = true;
                    }

                    if (!csvSkillData._reinforcementDestinationFlag) {
                        if (csvSkillData._reinforcementDestinationId != null && csvSkillData._reinforcementDestinationId != 0) {
                            var tmpCsvSkillData = RecursionGetSkill(thisObj, csvSkillData, skillDataList);
                            if (tmpCsvSkillData == null) {
                                thisObj._selectCharaSkillList[Number(csvSkillData._skillId)] = csvSkillData;
                                thisObj._typeList[csvSkillData._typeGroup].push(Number(csvSkillData._skillId));
                                if (csvSkillData._typeGroup == "A") {
                                    thisObj._skillMap[Number(csvSkillData._x)][Number(csvSkillData._y)] = Number(csvSkillData._skillId);
                                }
                                if (actor.hasSkill(csvSkillData._skillId)) {
                                    csvSkillData._isLearn = true;
                                    csvSkillData._getPossible = false;
                                }
                            } else {
                                tmpCsvSkillData._typeGroup = csvSkillData._typeGroup;
                                tmpCsvSkillData._x = csvSkillData._x;
                                tmpCsvSkillData._y = csvSkillData._y;
                                skillDataList.forEach(function (value) {
                                    if (value._derivationIdList != null) {
                                        for (var j = 0; j < value._derivationIdList.length; j++) {
                                            if (Number(value._derivationIdList[j]) == Number(csvSkillData._skillId)) {
                                                value._derivationIdList[j] = tmpCsvSkillData._skillId;
                                                break;
                                            }
                                        }
                                    }
                                });


                                thisObj._selectCharaSkillList[Number(tmpCsvSkillData._skillId)] = tmpCsvSkillData;
                                thisObj._typeList[tmpCsvSkillData._typeGroup].push(Number(tmpCsvSkillData._skillId));
                                if (csvSkillData._typeGroup == "A") {
                                    thisObj._skillMap[Number(tmpCsvSkillData._x)][Number(tmpCsvSkillData._y)] = Number(tmpCsvSkillData._skillId);
                                }
                                if (actor.hasSkill(tmpCsvSkillData._skillId)) {
                                    tmpCsvSkillData._isLearn = true;
                                    tmpCsvSkillData._getPossible = false;
                                }
                            }

                        } else {
                            thisObj._selectCharaSkillList[Number(csvSkillData._skillId)] = csvSkillData;
                            thisObj._typeList[csvSkillData._typeGroup].push(Number(csvSkillData._skillId));
                            if (csvSkillData._typeGroup == "A") {
                                thisObj._skillMap[Number(csvSkillData._x)][Number(csvSkillData._y)] = Number(csvSkillData._skillId);
                            }
                            if (actor.hasSkill(csvSkillData._skillId)) {
                                csvSkillData._isLearn = true;
                                csvSkillData._getPossible = false;
                            }
                        }
                    } else {
                        csvSkillData._getPossible = false;
                    }
                }
            }
        }
    };

    function getbackSkillParameter(thisObj) {
        thisObj._allSkillDataList = getSKillInfoCsv();
        var backSkillDataList = new Array();
        var skills = $dataSkills;
        for (var i = 0; i < thisObj._allSkillDataList.length; i++) {
            var skillData = thisObj._allSkillDataList[i];
            if (!skillData._hospitality && skillData._actorIds.includes(Number(thisObj._actor._actorId))) {
                for (var j = 1; j < skills.length; j++) {
                    if (Number(skills[j].id) === Number(skillData._skillId)) {
                        skillData._skillName = skills[j].name;
                        skillData._skillId = skills[j].id;
                        skillData._iconIndex = skills[j].iconIndex;
                        //skillData._description = skills[j].description;
                        if (skills[j].note && skills[j].note != null && skills[j].note != "") {
                            skillData._backSkillDescription = getDescriptionRegExpStr(skills[j].note);
                        }
                        break;
                    }
                }

                backSkillDataList.push(skillData);
            }
        }
        thisObj._backSkillDataList = backSkillDataList;
    };

    function getDescriptionRegExpStr(txt) {
        let descriptions = {};
        for (let i = 0; i < 4; i++) {
            let matchStr = "";
            switch (i) {
                case 0:
                    matchStr = txt.match(/<DOBBY_BACKSKILLINFO0>.*<\/DOBBY_BACKSKILLINFO0>/s);
                    break;
                case 1:
                    matchStr = txt.match(/<DOBBY_BACKSKILLINFO1>.*<\/DOBBY_BACKSKILLINFO1>/s);
                    break;
                case 2:
                    matchStr = txt.match(/<DOBBY_BACKSKILLINFO2>.*<\/DOBBY_BACKSKILLINFO2>/s);
                    break;
                case 3:
                    matchStr = txt.match(/<DOBBY_BACKSKILLINFO3>.*<\/DOBBY_BACKSKILLINFO3>/s);
                    break;

            }
            if (matchStr && matchStr != null && matchStr.length > 0) {
                descriptions[String(i)] = deleteDobbyTag(matchStr[0], i);
            }
        }
        return descriptions;
    };

    function getNormalSkillDescriptionRegExpStr(txt) {
        if (txt && txt.indexOf("<DOBBY_SKILLINFO>") != -1) {
            let matchStr = txt.match(/<DOBBY_SKILLINFO>.*<\/DOBBY_SKILLINFO>/s);
            if (matchStr && matchStr != null && matchStr.length > 0) {
                let dobbyStartTag = "<DOBBY_SKILLINFO>";
                let dobbyEndTag = "</DOBBY_SKILLINFO>";
                return matchStr[0].replace(dobbyStartTag, "").replace(dobbyEndTag, "").trim();
            }
        }
        return "";
    };

    function deleteDobbyTag(matchStr, num) {
        let dobbyStartTag = "<DOBBY_BACKSKILLINFO___n>".replace("___n", String(num));
        let dobbyEndTag = "</DOBBY_BACKSKILLINFO___n>".replace("___n", String(num));
        return matchStr.replace(dobbyStartTag, "").replace(dobbyEndTag, "").trim();
    };

    function RecursionGetSkill(thisObj, skillData, skillDataList) {
        if (skillData._reinforcementDestinationId != null && isNaN(skillData._reinforcementDestinationId)) {
            if (thisObj._actor.hasSkill(skillData._skillId)) {
                return skillData;
            } else {
                return null;
            }
        }

        var upSKillDataList = skillDataList.filter(function (value) {
            return value != null && Number(skillData._reinforcementDestinationId) == Number(value._skillId);
        });
        var tmpSkillData = RecursionGetSkill(thisObj, upSKillDataList[0], skillDataList)
        if (tmpSkillData == null) {
            if (thisObj._actor.hasSkill(skillData._skillId)) {
                return skillData;
            } else {
                return null;
            }
        } else {
            return tmpSkillData;
        }
    };

    function RecursionGetAllSkill(skillData, skillDataList, addedSkill) {
        if (skillData._reinforcementDestinationId != null && isNaN(skillData._reinforcementDestinationId)) {
            addedSkill.push(skillData);
            return addedSkill;
        } else {
            var upSKillDataList = skillDataList.filter(function (value) {
                return value != null && Number(skillData._reinforcementDestinationId) == Number(value._skillId);
            });
            addedSkill = RecursionGetAllSkill(upSKillDataList[0], skillDataList, addedSkill)
        }

        return addedSkill.concat(skillData);
    };

    function createConfirmtMessageWindow(thisObj) {
        thisObj._confirmMessageWindow = new Window_Confirm_Window();
        thisObj._confirmMessageWindow.opacity = 0;
        thisObj._confirmMessageWindow.close();
        thisObj._confirmMessageWindow.opacity = 255;
        thisObj._confirmMessageWindow.deactivate();
        let confirmWindowx = thisObj._confirmMessageWindow.x;
        let confirmWindowWidth = thisObj._confirmMessageWindow.width;
        let yesNoWindowWidth = 130;
        let yesNoWindowAllWidthHalf = Math.floor(((yesNoWindowWidth * 2) + 10) / 2);
        let yesButtonXpos = ((Graphics.width) / 2) - yesNoWindowAllWidthHalf;

        var buttonYpos = thisObj._confirmMessageWindow.y + thisObj._confirmMessageWindow.height + 20;
        // thisObj._yesButtonWindow = new Window_YesNo_Button_Window(thisObj._confirmMessageWindow.x,buttonYpos, yesNoWindowWidth, "はい", true);
        thisObj._yesButtonWindow = new Window_YesNo_Button_Window(yesButtonXpos, buttonYpos, yesNoWindowWidth, "はい", true);
        thisObj._yesButtonWindow.deactivate();
        thisObj._yesButtonWindow.close();
        var noButtonXpos = thisObj._yesButtonWindow.x + thisObj._yesButtonWindow.width;

        thisObj._noButtonWindow = new Window_YesNo_Button_Window(noButtonXpos + 10, buttonYpos, yesNoWindowWidth, "いいえ", false);
        thisObj._noButtonWindow.deactivate();
        thisObj._noButtonWindow.close();
        thisObj._confirmMessageWindow.addButtonWindow(thisObj._yesButtonWindow);
        thisObj._confirmMessageWindow.addButtonWindow(thisObj._noButtonWindow);
    };

    function addWindowConfirmtMessageWindow(thisObj) {
        thisObj.addWindow(thisObj._confirmMessageWindow);
        thisObj.addWindow(thisObj._yesButtonWindow);
        thisObj.addWindow(thisObj._noButtonWindow);
    };

    function getConfirmMessageWindow(thisObj) {
        return thisObj._confirmMessageWindow;
    };

    function openConfirmMessageWindow(thisObj) {
        if (thisObj._confirmMessageWindow && thisObj._confirmMessageWindow.isClosed()) {
            thisObj._confirmMessageWindow.open();
        }
    };

    function closeConfirmMessageWindow(thisObj) {
        if (thisObj._confirmMessageWindow && !thisObj._confirmMessageWindow.isClosed()) {
            thisObj._confirmMessageWindow.close();
        }
    };

    function isActiveConfirmMessageWindow(thisObj) {
        if (thisObj._confirmMessageWindow) {
            return thisObj._confirmMessageWindow.isOpenAndActive();
        }
        return false;
    };

    function setConfirmMessageWindow(thisObj, windowObj) {
        thisObj._confirmMessageWindow = windowObj;
    };

    function controlConfirmWindow(thisObj) {
        var window = thisObj._confirmMessageWindow;
        if (!window.isCompleteOpenFlag()) {
            if ((Input.isRepeated('left') && Input.isTriggered('left'))) {
                confirmMoveCursol(thisObj, 'left');
            } else if ((Input.isRepeated('right') && Input.isTriggered('right'))) {
                confirmMoveCursol(thisObj, 'right');
            } else if (((Input.isRepeated('ok') && Input.isTriggered('ok')))) {
                confirmOk(thisObj);
            } else if ((Input.isRepeated('cancel') && Input.isTriggered('cancel'))) {
                window.closeAndDeActivate();
                if (thisObj instanceof Scene_BackSKillTree_Scene) {
                    thisObj._skillWindow.activate();
                }
            }
        }
    }


    function confirmMoveCursol(thisObj, pos) {
        var index = 0;
        var confirmWindow = thisObj._confirmMessageWindow;
        for (var i = 0; i < confirmWindow._buttonWindowList.length; i++) {
            var window = confirmWindow._buttonWindowList[i];
            if (window.isOpenAndActive()) {
                index = i;
            }
            window.deactivate();
        }

        switch (pos) {
            case 'left':
                if (index <= 0) {
                    confirmWindow._buttonWindowList[confirmWindow._buttonWindowList.length - 1].activate();
                } else {
                    confirmWindow._buttonWindowList[index - 1].activate();
                }
                break;
            case 'right':
                if (index >= confirmWindow._buttonWindowList.length - 1) {
                    confirmWindow._buttonWindowList[0].activate();
                } else {
                    confirmWindow._buttonWindowList[index + 1].activate();
                }
                break;
        }
        ;
    };


    function confirmOk(thisObj) {
        var confirmWindow = getConfirmMessageWindow(thisObj);
        for (var i = 0; i < confirmWindow._buttonWindowList.length; i++) {
            var buttonWindow = confirmWindow._buttonWindowList[i];
            if (buttonWindow.isOpenAndActive()) {
                if (buttonWindow._isYesWindow) {
                    thisObj.skillIconOkLearnSkill();
                    confirmWindow.closeAndDeActivate();
                    if (thisObj instanceof Scene_BackSKillTree_Scene) {
                        confirmWindow.drawBackComplete();
                    } else {
                        confirmWindow.drawHosComplete();
                    }
                    confirmWindow.openCompleteWindow();
                    AudioManager.playSe({ "name": SE_QUEST_ORDERED, "volume": 90, "pitch": 100, "pan": 0 });
                    break;
                } else {
                    confirmWindow.closeAndDeActivate();
                    if (thisObj instanceof Scene_BackSKillTree_Scene) {
                        thisObj._skillWindow.activate();
                    }
                    break;
                }
            }
        }
    };


    // function isNextLvCheckM(actorId){
    //         let num = $gameSystem.getCharacterNastyNum(actorId);
    //         num = num + INRANCHI_ZOUKARITSU;
    //         var isNextLv = false;
    //         switch ($gameSystem.getCharacterNastyLevel(actorId)) {
    //             case 1:
    //                 isNextLv = (num >= Math.floor(INRANCHI_MAX/3));
    //                 break;
    //             case 2:
    //                 isNextLv = (num >= Math.floor(INRANCHI_MAX/3*2));
    //                 break;
    //             case 3:
    //                 isNextLv = (num >= INRANCHI_MAX);
    //                 break;
    //             case 4:
    //                 break;
    //         }

    //         return isNextLv;
    // };
    function isNextLvCheckM(actorId) {
        let num = $gameSystem.getCharacterNastyNum(actorId);
        num = num + INRANCHI_ZOUKARITSU;
        var isNextLv = false;
        let nastyLv = $gameSystem.getCharacterNastyLevel(actorId);
        switch (nastyLv) {
            case 1:
            case 2:
            case 3:
                isNextLv = (num >= funNastyLvNum(nastyLv));
                break;
            case 4:
                break;
        }

        return isNextLv;
    };


    function funNastyLvNum(lv) {
        let rtn = 0;
        switch (lv) {
            case 1:
                rtn = 10;
                break;
            case 2:
                rtn = 40;
                break;
            case 3:
                rtn = 80;
                break;
            case 4:
                break;
        }
        return rtn;
    };


    function Scene_SKillTree_Scene() {
        this.initialize.apply(this, arguments);
    }

    Scene_SKillTree_Scene.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_SKillTree_Scene.prototype.constructor = Scene_SKillTree_Scene;

    Scene_SKillTree_Scene.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_SKillTree_Scene.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        var headerYPos = Graphics.height - 180;
        createConfirmtMessageWindow(this);
        var confirmWindow = getConfirmMessageWindow(this);
        this._headWindow = new Window_Header_Window(0, headerYPos, Graphics.width, 180);
        this._mainWindow = new Main_Window(this._headWindow, this, confirmWindow);
        this._mainWindow.opacity = 0;
        this._headWindow.opacity = 0;
        //this._mainWindow.setHandler('cancel',   this.onCancelButton.bind(this));
        this._mainWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._mainWindow.setHandler('pageup', this.previousActor.bind(this));
        this.addWindow(this._mainWindow);
        this.addWindow(this._headWindow);
        addWindowConfirmtMessageWindow(this);
        this._messageWindowImg = new Sprite();
        this._messageWindowImg.bitmap = ImageManager.loadBitmap("img/pictures/", "WindowMessageFrame");
        this._messageWindowImg.x = this._headWindow.x;
        this._messageWindowImg.y = this._headWindow.y;
        this._baseMessageWindowImg.addChild(this._messageWindowImg);
        this._alertWindow = new D_Window_Common_Alert_Window(500, 200, this);
        this._alertWindow.setInitialize(this._alertWindow);
        this._mainWindow.setAlertWindow(this._alertWindow);
        this.addChild(this._alertWindow);
    };

    Scene_SKillTree_Scene.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadBitmap("img/dSkillTree/", "backGroundImg");
        this.addChild(this._backgroundSprite);
        this.createCharImgBase();
        this.createRingImgBase();
        this.createMessageWindowImgBase();
    };

    Scene_SKillTree_Scene.prototype.createCharImgBase = function () {
        this._baseCharImg = new Sprite();
        this._baseCharImg.x = 0;
        this._baseCharImg.y = 0;
        this.addChild(this._baseCharImg);
    };

    Scene_SKillTree_Scene.prototype.createRingImgBase = function () {
        this._baseRingImg = new Sprite();
        this._baseRingImg.x = 0;
        this._baseRingImg.y = 0;
        this.addChild(this._baseRingImg);
    };

    Scene_SKillTree_Scene.prototype.createMessageWindowImgBase = function () {
        this._baseMessageWindowImg = new Sprite();
        this._baseMessageWindowImg.x = 0;
        this._baseMessageWindowImg.y = 0;
        this.addChild(this._baseMessageWindowImg);
    };

    Scene_SKillTree_Scene.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        this.refreshActor();
    };

    Scene_SKillTree_Scene.prototype.refreshActor = function () {
        var actor = this.actor();
        this._mainWindow.setActor(actor);

        if (this._charImg) {
            this._baseCharImg.removeChild(this._charImg);
            this._charImg = null;
            this._charImg = undefined;
        }

        this._charImg = new Sprite();
        var lBitMap = getCharCosplayImgByActorId(actor._actorId);
        this._charImg.bitmap = lBitMap;
        switch (actor._actorId) {
            case 1:
                this._charImg.x = 350;
                this._charImg.y = -130;
                break;
            case 2:
                this._charImg.x = 380;
                this._charImg.y = -180;
                break;
            case 3:
                this._charImg.x = 350;
                this._charImg.y = -70;
                break;
            case 4:
                this._charImg.x = 350;
                this._charImg.y = -100;
                break;
        }
        this._charImg.scale.x = 0.607;
        this._charImg.scale.y = 0.607;
        this._baseCharImg.addChild(this._charImg);
    };

    Scene_SKillTree_Scene.prototype.onActorChange = function () {
        this.refreshActor();
        this._mainWindow.activate();
    };

    // Subシーン用のステータス画面表示処理
    function Main_Window() {
        this.initialize.apply(this, arguments);
    };

    Main_Window.prototype = Object.create(Window_Selectable.prototype);
    Main_Window.prototype.constructor = Main_Window;
    Main_Window.prototype.initialize = function (headerWindow, sceneObj, confirmWindowObj) {
        this._sceneObj = sceneObj;
        setConfirmMessageWindow(this, confirmWindowObj);
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight - headerWindow.height;
        this._mWidth = width;
        this._mHeight = height;
        this._headerWindow = headerWindow;
        Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
        this._actor = null;
        this._selectCharaSkillList = {};
        this._lineList = new Array();
        this._newLineList = new Array();
        this._ringTime = 0;
        this._ringMoveFlag = false;
        this._skillSelectFlag = false;
        this._pos = 10;
        this._dispDrawIconList = new Array();
        this._nextDrawIconList = new Array();
        this._typeList = {};
        this._skillMap = null;
        this._nextSkillMap = null;
        for (var i = 0; i < g_skillTypeList.length; i++) {
            var typeList = new Array();
            this._typeList[g_skillTypeList[i]] = typeList;
        }

        this._selectSkillType = g_skillTypeList[0];
        this._nextSkillType = null;
        this._nowCursolPostion = [startPosition[0], startPosition[1]];
        this._movePoint = 0;
        this._dispBaseSkill = new Sprite();
        this._dispBaseNextSkill = new Sprite();
        this._dispimgBaseSkill = new Sprite();
        this.addChild(this._dispimgBaseSkill);
        this._cursolDisp = new Sprite();
        this._peggingSkillAndSkillLine = {};
        this._addPaintSKillLine = new Sprite();
        this.refresh();
        this.activate();
        this._cursol = new Sprite();
        this._cursol.bitmap = ImageManager.loadBitmap("img/dSkillTree/", "cursol");
        this._cursol.opacity = 0;
        this.addChild(this._cursol);
        this._alertWindow = null;
        this._cursolBlinkingCnt = 0;
    };

    Main_Window.prototype.setAlertWindow = function (alertWindow) {
        this._alertWindow = alertWindow;
    };

    Main_Window.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Main_Window.prototype.refresh = function () {
        if (this.contents) {
            this.contents.clear();
        }
        this.initSkillMap();
        this._skillSelectFlag = false;
        this._ringMoveFlag = false;
        this._selectSkillType = g_skillTypeList[0];

        if (this._selectCharaSkillList) {
            this._selectCharaSkillList = {};
        }

        for (let key in this._typeList) {
            if (this._typeList[key] && this._typeList[key].length > 0) {
                this._typeList[key].length = 0;
            }
        }

        if (this._lineList != null && this._lineList != undefined && this._lineList.length > 0) {
            for (var i = 0; i < this._lineList.length; i++) {
                this.removeChild(this._lineList[i]);
            }
            this._lineList = null;
            this._lineList = undefined;
            this._lineList = new Array();
        }

        if (this._newLineList != null && this._newLineList != undefined && this._newLineList.length > 0) {
            for (var i = 0; i < this._newLineList.length; i++) {
                this.removeChild(this._newLineList[i]);
            }
            this._newLineList = null;
            this._newLineList = undefined;
            this._newLineList = new Array();
        }


        if (this._dispBaseSkill) {
            if (this._addPaintSKillLine) {
                this._dispBaseSkill.removeChild(this._addPaintSKillLine);
            }
            //this.removeChild(this._dispBaseSkill);
            this._dispimgBaseSkill.removeChild(this._dispBaseSkill);
            this._dispBaseSkill = null;
            this._dispBaseSkill = undefined;
            this._dispBaseSkill = new Sprite();
            //this.addChild(this._dispBaseSkill);
            this._dispimgBaseSkill.addChild(this._dispBaseSkill);
            if (this._addPaintSKillLine) {
                this._addPaintSKillLine = null;
                this._addPaintSKillLine = undefined;
                this._addPaintSKillLine = new Sprite();
                this._addPaintSKillLine.bitmap = new Bitmap(Graphics.width, Graphics.height);
            }
        }

        if (this._dispBaseNextSkill) {
            //this.removeChild(this._dispBaseNextSkill);
            this._dispimgBaseSkill.removeChild(this._dispBaseNextSkill);
            this._dispBaseNextSkill = null;
            this._dispBaseNextSkill = undefined;
            this._dispBaseNextSkill = new Sprite();
            //this.addChild(this._dispBaseNextSkill);
            this._dispimgBaseSkill.addChild(this._dispBaseNextSkill);
        }

        if (this._cursol) {
            this._cursol.opacity = 0;
            this._cursol.x = 0;
            this._cursol.y = 0;
        }

        if (this._actor) {
            this.getParameter();
            this.initDrawSkillLine(false)
            this.testPr();
            this.setInitPosition();
            this.drawAsp();
        }
    };

    // 現在表示しているキャラのスキル情報を取得する。
    Main_Window.prototype.getParameter = function () {
        getAllParameter(this);
    };

    Main_Window.prototype.testPr = function () {
        if (this._imgRing) {
            this._sceneObj._baseRingImg.removeChild(this._imgRing);
            this._imgRing = null;
            this._imgRing = undefined;
        }
        this._imgRing = new Sprite();
        this._imgRing.bitmap = ImageManager.loadBitmap("img/dSkillTree/", "ring", null, true);
        this._imgRing.anchor.x = 0.5;
        this._imgRing.anchor.y = 0.5;
        this._imgRing.x = RING_DISP_BASE_X;
        this._imgRing.y = RING_DISP_BASE_Y + 80;
        this._sceneObj._baseRingImg.addChild(this._imgRing);
    };

    Main_Window.prototype.initDrawSkillLine = function (isNext, movePoint) {
        var skiiIdList = null;
        var lineList = null;

        if (!isNext) {
            skiiIdList = this._typeList[this._selectSkillType];
            lineList = this._lineList;
        } else {
            skiiIdList = this._typeList[this._nextSkillType];
            lineList = this._newLineList;
        }

        var dispSkillList = {};
        var tmpSelCSKillList = this._selectCharaSkillList;
        //自分がもってるスキルの情報だけ抜き出す
        skiiIdList.forEach(function (id) {
            dispSkillList[id] = tmpSelCSKillList[id];
        });

        var tmpWidth = this.width;
        var tmpHeight = this.height;

        var nextAllBaseX = adjustNextAllBaseX(movePoint);
        var nextAllBaseY = NEXT_ALL_BASE_Y;
        for (let key in dispSkillList) {
            var tskillData = dispSkillList[key];
            tskillData = this.dispDrawIconAndSetPostion(tskillData, isNext);

            if (!tskillData._isLearn) {
                tskillData._skillIcon.opacity = 120;
            }
        }

        var sp = new Sprite();
        sp.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
        for (let key in dispSkillList) {
            var skillData = dispSkillList[key];
            sp = this.getSkillLineInfo(sp, skillData, dispSkillList);
        }

        lineList.push(sp);

        for (let key in dispSkillList) {
            var tskillData = dispSkillList[key];
            if (tskillData != undefined) {
                if (isNext) {
                    this._nextSkillMap[dispSkillList[key]._x][dispSkillList[key]._y] = dispSkillList[key]._skillId;
                } else {
                    this._skillMap[dispSkillList[key]._x][dispSkillList[key]._y] = dispSkillList[key]._skillId;
                }
            }
        }

        if (!isNext) {
            this._dispBaseSkill.x = 0;
            this._dispBaseSkill.y = 0;
            for (var i = 0; i < this._lineList.length; i++) {
                this._dispBaseSkill.addChild(this._lineList[i]);
            }
        } else {
            this._dispBaseNextSkill.x = nextAllBaseX;
            this._dispBaseNextSkill.y = nextAllBaseY;
            for (var i = 0; i < this._newLineList.length; i++) {
                this._dispBaseNextSkill.addChild(this._newLineList[i]);
            }
        }

        for (let key in dispSkillList) {
            var tskillData = dispSkillList[key];
            if (isNext) {
                this._dispBaseNextSkill.addChild(tskillData._skillIcon);
            } else {
                this._dispBaseSkill.addChild(tskillData._skillIcon);
            }
        }

    };

    Main_Window.prototype.initSkillMap = function () {
        this._skillMap = this.setSkillMap();
    };

    Main_Window.prototype.getSkillLineInfo = function (sp, skillData, dispSkill) {
        if (skillData._derivationIdList != null && skillData._derivationIdList.length > 0) {
            var peggingSkillAndSkillLine = this._peggingSkillAndSkillLine;
            var actor = this._actor;
            skillData._derivationIdList.forEach(function (id) {
                var parentSkill = dispSkill[id];
                var px = parentSkill._x;
                var py = parentSkill._y;
                var cx = skillData._x;
                var cy = skillData._y;
                var lineFromX = 0;
                var lineFromY = 0;
                var lineToX = 0;
                var lineToY = 0;
                if (px > cx) {
                    lineFromX = parentSkill._dispX;
                    lineToX = skillData._dispX + skillData._iconSizeWidth;
                } else if (px < cx) {
                    lineFromX = parentSkill._dispX + parentSkill._iconSizeWidth;
                    lineToX = skillData._dispX;
                } else {
                    lineFromX = parentSkill._dispX + (parentSkill._iconSizeWidth / 2);
                    lineToX = skillData._dispX + (skillData._iconSizeWidth / 2);
                }

                if (py > cy) {
                    lineFromY = parentSkill._dispY;
                    lineToY = skillData._dispY + skillData._iconSizeHeight;
                } else if (py < cy) {
                    lineFromY = parentSkill._dispY + parentSkill._iconSizeHeight;
                    lineToY = skillData._dispY;
                } else {
                    lineFromY = parentSkill._dispY + (parentSkill._iconSizeHeight / 2);
                    lineToY = skillData._dispY + (skillData._iconSizeHeight / 2);
                }

                // sp.bitmap.clear();
                var context = sp.bitmap._context;
                context.beginPath();
                context.moveTo(lineFromX, lineFromY);
                context.lineTo(lineToX, lineToY);
                if (actor.hasSkill(skillData._skillId)) {
                    context.strokeStyle = SKILL_LEARN_COLOR;
                }
                context.closePath();
                context.stroke();
                context.strokeStyle = "#000000";
                sp.bitmap._setDirty();

                var cSkillIdAndParentId = skillData._skillId + "_" + id;
                if (cSkillIdAndParentId in peggingSkillAndSkillLine) {
                } else {
                    var peggingSkillLine = new SkillPeggingSkillLine(skillData._skillId, id, lineFromX, lineFromY, lineToX, lineToY);
                    peggingSkillAndSkillLine[cSkillIdAndParentId] = peggingSkillLine;
                }
            });
        }

        return sp;
    };

    Main_Window.prototype.initNextSkillMap = function () {
        this._nextSkillMap = this.setSkillMap();
    };

    Main_Window.prototype.setSkillMap = function () {
        var rtnMap = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        return rtnMap;
    };

    Main_Window.prototype.setInitPosition = function () {
        this._nowCursolPostion[0] = startPosition[0];
        this._nowCursolPostion[1] = startPosition[1];
        this._headerWindow.drawSkillGroupInfo(g_skillGroupDescriptnList[this._selectSkillType]);
    };

    Main_Window.prototype.drawAsp = function () {
        if (this.contents) {
            this.contents.clear();
        }
        var sp = $gameVariables.value(Number(SkillTreeP.spVariableList[this._actor._actorId - 1]));
        var txt = ":" + sp;
        this.drawTextEx(txt, 200, 100);
    };

    Main_Window.prototype.lineHeight = function () {
        return 50;
    };


    Main_Window.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
        if (!this._ringMoveFlag) {
            if (!this._skillSelectFlag) {
                if ((Input.isRepeated('left') && Input.isTriggered('left'))) {
                    this._ringMoveFlag = true;
                    this.setNextSkill();
                    AudioManager.playSe({ "name": "skilltreeRing", "volume": 100, "pitch": 100, "pan": 0 });
                } else if ((Input.isRepeated('right') && Input.isTriggered('right'))) {
                    this._ringMoveFlag = true;
                    AudioManager.playSe({ "name": "skilltreeRing", "volume": 100, "pitch": 100, "pan": 0 });
                    this.setPreviusSkill();
                } else if ((Input.isRepeated('cancel') && Input.isTriggered('cancel'))) {
                    this._sceneObj.popScene();
                    SoundManager.playCancel();
                } else if ((Input.isRepeated('ok') && Input.isTriggered('ok'))) {
                    this.onCursol();
                    SoundManager.playOk();
                    this._skillSelectFlag = true;
                }
            } else {
                var confirmWindow = getConfirmMessageWindow(this);
                if (!confirmWindow.isOpenAndActive()) {
                    if ((Input.isRepeated('up') && Input.isTriggered('up'))) {
                        SoundManager.playCursor();
                        this.moveCursol('up');
                    } else if ((Input.isRepeated('down') && Input.isTriggered('down'))) {
                        SoundManager.playCursor();
                        this.moveCursol('down');
                    } else if ((Input.isRepeated('left') && Input.isTriggered('left'))) {
                        SoundManager.playCursor();
                        this.moveCursol('left');
                    } else if ((Input.isRepeated('right') && Input.isTriggered('right'))) {
                        SoundManager.playCursor();
                        this.moveCursol('right');
                    } else if ((Input.isRepeated('ok') && Input.isTriggered('ok'))) {
                        this.skillIconOk();
                    } else if ((Input.isRepeated('cancel') && Input.isTriggered('cancel'))) {
                        this.cancelCursol();
                        this._skillSelectFlag = false;
                    }
                    this.blinkingCursol();
                } else {
                    controlConfirmWindow(this);
                }
            }
        } else {
            this.ringMoveUpdate();
            this.moveSKillTree();
            this.moveAfter();
        }
    };

    Main_Window.prototype.onCursol = function () {
        var skillId = this._skillMap[startPosition[0]][startPosition[1]];
        var skillData = this._selectCharaSkillList[skillId];
        var iconX = skillData._skillIcon.x;
        var iconY = skillData._skillIcon.y;
        this._cursol.x = iconX;
        this._cursol.y = iconY + 1;
        this._cursol.opacity = 255;
        this._cursolBlinkingCnt = -5;
        this.setInitPosition();
        this._headerWindow.drawSkillnfo(skillData);
    };

    Main_Window.prototype.cancelCursol = function () {
        this._cursol.opacity = 0;
        this._cursol.x = 0;
        this._cursol.y = 0;
        this._headerWindow.drawSkillGroupInfo(g_skillGroupDescriptnList[this._selectSkillType]);
        SoundManager.playCancel();
    };

    Main_Window.prototype.moveCursol = function (pos) {
        var moveX = 0;
        var moveY = 0;
        switch (pos) {
            case 'up':
                moveY = -1;
                this.moveCursolVertical(moveY);
                break;
            case 'down':
                moveY = 1;
                this.moveCursolVertical(moveY);
                break;
            case 'left':
                moveX = -1;
                this.moveCursolSide(moveX)
                break;
            case 'right':
                moveX = 1;
                this.moveCursolSide(moveX)
                break;
        }
        ;
    };

    Main_Window.prototype.moveCursolVertical = function (moveY) {
        var nowCursolPostx = this._nowCursolPostion[0];
        var nowCursolPosty = this._nowCursolPostion[1];
        var nextCursolPosy = nowCursolPosty + moveY;

        if (nextCursolPosy >= 0 && nextCursolPosy < this._skillMap.length) {
            var skillId = this._skillMap[nowCursolPostx][nextCursolPosy];
            if (skillId > 0) {
                this._nowCursolPostion[1] = nextCursolPosy;
                var skillData = this._selectCharaSkillList[skillId];
                this._cursol.y = skillData._skillIcon.y + 1;
                this._headerWindow.drawSkillnfo(skillData);
            }
        }
    };

    Main_Window.prototype.moveCursolSide = function (moveX) {
        var nowCursolPostx = this._nowCursolPostion[0];
        var nowCursolPosty = this._nowCursolPostion[1];
        var nextCursolPosx = nowCursolPostx + moveX;

        if (nextCursolPosx >= 0 && nextCursolPosx < this._skillMap.length) {
            var skillId = this._skillMap[nextCursolPosx][nowCursolPosty];
            if (skillId > 0) {
                this._nowCursolPostion[0] = nextCursolPosx;
                var skillData = this._selectCharaSkillList[skillId];
                this._cursol.x = skillData._skillIcon.x;
                this._headerWindow.drawSkillnfo(skillData);
            }
        }
    };

    Main_Window.prototype.blinkingCursol = function () {
        if (this._cursol) {
            if (this._cursol.opacity <= 0 || this._cursol.opacity >= 255) {
                this._cursolBlinkingCnt *= -1;
            }
            this._cursol.opacity += this._cursolBlinkingCnt;
        }
    };

    Main_Window.prototype.skillIconOk = function () {
        var nowCursolPostx = this._nowCursolPostion[0];
        var nowCursolPosty = this._nowCursolPostion[1];
        var skillId = this._skillMap[nowCursolPostx][nowCursolPosty];
        if (skillId > 0) {
            var skillData = this._selectCharaSkillList[skillId];
            if (skillData._taikenban != "" && $gameSwitches.value(74)) {
                this._alertWindow.setTxt("体験版では取得できません");
                this._alertWindow.startAnimation();
                SoundManager.playBuzzer();
            } else if (!this._actor.hasSkill(skillId) && skillData._getPossible) {
                var confirmWindow = getConfirmMessageWindow(this);
                var spVariableNo = SkillTreeP.spVariableList[this._actor._actorId - 1];
                var aspPoint = $gameVariables.value(Number(spVariableNo));
                if (aspPoint >= skillData._sp) {
                    if (!confirmWindow.isOpenAndActive()) {
                        var backSkill = this.getBackSkill(skillData._backSkillid);
                        if (backSkill) {
                            confirmWindow.setBackSkillData(backSkill);
                        } else {
                            confirmWindow.setBackSkillData(null);
                            confirmWindow.setBackSkillData(undefined);
                        }
                        confirmWindow.setSkillData(skillData);
                        confirmWindow.drawConfirm();
                        confirmWindow.openAndActivate();
                        SoundManager.playOk();
                    }
                } else {
                    this._alertWindow.setTxt("SPが足りません");
                    this._alertWindow.startAnimation();
                    SoundManager.playBuzzer();
                }
            } else {
                if (this._actor.hasSkill(skillId)) {
                    this._alertWindow.setTxt("すでに習得済みのスキルです");
                    this._alertWindow.startAnimation();
                } else {
                    this._alertWindow.setTxt("派生元のスキルを取得しておりません");
                    this._alertWindow.startAnimation();
                }
                SoundManager.playBuzzer();
            }
        }
    };

    Main_Window.prototype.confirmMoveCursol = function (pos) {
        var index = 0;
        var confirmWindow = getConfirmMessageWindow(this);
        for (var i = 0; i < confirmWindow._buttonWindowList.length; i++) {
            var window = confirmWindow._buttonWindowList[i];
            if (window.isOpenAndActive()) {
                index = i;
            }
            window.deactivate();
        }

        switch (pos) {
            case 'left':
                if (index <= 0) {
                    confirmWindow._buttonWindowList[confirmWindow._buttonWindowList.length - 1].activate();
                } else {
                    confirmWindow._buttonWindowList[index - 1].activate();
                }
                break;
            case 'right':
                if (index >= confirmWindow._buttonWindowList.length - 1) {
                    confirmWindow._buttonWindowList[0].activate();
                } else {
                    confirmWindow._buttonWindowList[index + 1].activate();
                }

                break;
        }
        ;
    };

    // おもてスキル取得の実処理
    Main_Window.prototype.skillIconOkLearnSkill = function () {
        var nowCursolPostx = this._nowCursolPostion[0];
        var nowCursolPosty = this._nowCursolPostion[1];
        var skillId = this._skillMap[nowCursolPostx][nowCursolPosty];
        var skillData = this._selectCharaSkillList[skillId];
        this._actor.learnSkill(skillId);
        this.setSkillTargetSwitch(skillId);
        skillData._isLearn = true;
        skillData._skillIcon.opacity = 255;
        var childSkillList = this.getChildSkill(skillId);
        if (childSkillList.length > 0) {
            childSkillList.forEach(function (childSkillData) {
                childSkillData._getPossible = true;
            });
        }

        if (!isNaN(skillData._backSkillid)) {
            this._actor.learnSkill(skillData._backSkillid);
        }

        var spVariableNo = SkillTreeP.spVariableList[this._actor._actorId - 1];
        var spPoint = $gameVariables.value(Number(spVariableNo));
        $gameVariables.setValue(Number(spVariableNo), spPoint - skillData._sp);
        this.drawAsp();
        this.paintSKillOfSkillLine(skillData._skillId);
    };

    // AAAのスイッチ切り替え スキル IDが変わったらここを変更
    Main_Window.prototype.setSkillTargetSwitch = function (skillId) {
        switch (skillId) {
            case 472:
                $gameSwitches.setValue(Number(SkillTreeP.cleahissatu2), true);
                break;
            case 473:
                $gameSwitches.setValue(Number(SkillTreeP.cleahissatu3), true);
                break;
            case 474:
                $gameSwitches.setValue(Number(SkillTreeP.cleahissatu4), true);
                break;
            case 475:
                $gameSwitches.setValue(Number(SkillTreeP.cleazangeki2), true);
                break;
            case 476:
                $gameSwitches.setValue(Number(SkillTreeP.cleazangeki3), true);
                break;
            case 477:
                $gameSwitches.setValue(Number(SkillTreeP.cleazangeki4), true);
                break;
            case 478:
                $gameSwitches.setValue(Number(SkillTreeP.cleakaosu2), true);
                break;
            case 479:
                $gameSwitches.setValue(Number(SkillTreeP.cleakaosu3), true);
                break;
            case 480:
                $gameSwitches.setValue(Number(SkillTreeP.cleakaosu4), true);
                break;
            case 481:
                $gameSwitches.setValue(Number(SkillTreeP.cleaiatsu2), true);
                break;
            case 482:
                $gameSwitches.setValue(Number(SkillTreeP.cleaiatsu3), true);
                break;
            case 483:
                $gameSwitches.setValue(Number(SkillTreeP.cleaiatsu4), true);
                break;//================================================
            case 365: // ノラ関連
                $gameSwitches.setValue(Number(SkillTreeP.norakaijo2), true);
                break;
            case 366:
                $gameSwitches.setValue(Number(SkillTreeP.norakaijo3), true);
                break;
            case 367:
                $gameSwitches.setValue(Number(SkillTreeP.norakaijo4), true);
                break;
            case 368:
                $gameSwitches.setValue(Number(SkillTreeP.norakairiki2), true);
                break;
            case 369:
                $gameSwitches.setValue(Number(SkillTreeP.norakairiki3), true);
                break;
            case 370:
                $gameSwitches.setValue(Number(SkillTreeP.norakairiki4), true);
                break;
            case 371:
                $gameSwitches.setValue(Number(SkillTreeP.norakyukaku2), true);
                break;
            case 372:
                $gameSwitches.setValue(Number(SkillTreeP.norakyukaku3), true);
                break;
            case 373:
                $gameSwitches.setValue(Number(SkillTreeP.norakyukaku4), true);
                break;
            case 374:
                $gameSwitches.setValue(Number(SkillTreeP.noraonmitu2), true);
                break;
            case 375:
                $gameSwitches.setValue(Number(SkillTreeP.noraonmitu3), true);
                break;
            case 376:
                $gameSwitches.setValue(Number(SkillTreeP.noraonmitu4), true);
                break;//================================================
            case 277: // リルム関連
                $gameSwitches.setValue(Number(SkillTreeP.relmkaiho2), true);
                break;
            case 278:
                $gameSwitches.setValue(Number(SkillTreeP.relmkaiho3), true);
                break;
            case 279:
                $gameSwitches.setValue(Number(SkillTreeP.relmkaiho4), true);
                break;
            case 280:
                $gameSwitches.setValue(Number(SkillTreeP.relmhaken2), true);
                break;
            case 281:
                $gameSwitches.setValue(Number(SkillTreeP.relmhaken3), true);
                break;
            case 282:
                $gameSwitches.setValue(Number(SkillTreeP.relmhaken4), true);
                break;
            case 283:
                $gameSwitches.setValue(Number(SkillTreeP.relmkaidoku2), true);
                break;
            case 284:
                $gameSwitches.setValue(Number(SkillTreeP.relmkaidoku3), true);
                break;
            case 285:
                $gameSwitches.setValue(Number(SkillTreeP.relmkaidoku4), true);
                break;
            case 286:
                $gameSwitches.setValue(Number(SkillTreeP.relmidou2), true);
                break;
            case 287:
                $gameSwitches.setValue(Number(SkillTreeP.relmidou3), true);
                break;
            case 288:
                $gameSwitches.setValue(Number(SkillTreeP.relmidou4), true);
                break;//================================================
            case 174: // ソフィア関連
                $gameSwitches.setValue(Number(SkillTreeP.sophiashukuhuku2), true);
                break;
            case 175:
                $gameSwitches.setValue(Number(SkillTreeP.sophiashukuhuku3), true);
                break;
            case 176:
                $gameSwitches.setValue(Number(SkillTreeP.sophiashukuhuku4), true);
                break;
            case 177:
                $gameSwitches.setValue(Number(SkillTreeP.sophiakyoukatsu2), true);
                break;
            case 178:
                $gameSwitches.setValue(Number(SkillTreeP.sophiakyoukatsu3), true);
                break;
            case 179:
                $gameSwitches.setValue(Number(SkillTreeP.sophiakyoukatsu4), true);
                break;
            case 180:
                $gameSwitches.setValue(Number(SkillTreeP.sophiakitou2), true);
                break;
            case 181:
                $gameSwitches.setValue(Number(SkillTreeP.sophiakitou3), true);
                break;
            case 182:
                $gameSwitches.setValue(Number(SkillTreeP.sophiakitou4), true);
                break;
            case 183:
                $gameSwitches.setValue(Number(SkillTreeP.sophiayuwaku2), true);
                break;
            case 184:
                $gameSwitches.setValue(Number(SkillTreeP.sophiayuwaku3), true);
                break;
            case 185:
                $gameSwitches.setValue(Number(SkillTreeP.sophiayuwaku4), true);
                break;
            default:
                break;

        }
    };

    // 一時的にスキル取得した時のラインを引く処理
    Main_Window.prototype.paintSKillOfSkillLine = function (skillId) {
        var peggingSkillAndSkillLine = this._peggingSkillAndSkillLine;
        var parentSKillIdList = this.getParentSkillIdList(skillId);
        var baseSkill = this._baseSkill;
        var sp = this._addPaintSKillLine;
        parentSKillIdList.forEach(function (id) {
            var cSkillIdAndParentId = skillId + "_" + id;
            var skillLineInfo = peggingSkillAndSkillLine[cSkillIdAndParentId];
            var context = sp.bitmap._context;
            context.beginPath();
            context.moveTo(skillLineInfo._lineFromX, skillLineInfo._lineFromY);
            context.lineTo(skillLineInfo._lineToX, skillLineInfo._lineToY);
            context.strokeStyle = SKILL_LEARN_COLOR;
            context.closePath();
            context.stroke();
            sp.bitmap._setDirty();
        });

        this._dispBaseSkill.removeChild(this._addPaintSKillLine);
        this._dispBaseSkill.addChild(this._addPaintSKillLine);

    };

    Main_Window.prototype.getChildSkill = function (skillId) {
        var skillList = this._selectCharaSkillList;
        var skillDataList = new Array();
        for (let key in skillList) {
            var skillData = skillList[key];
            if (skillData._derivationIdList && skillData._derivationIdList.length > 0 && skillData._derivationIdList.includes(Number(skillId))) {
                skillDataList.push(skillData);
            }
        }

        return skillDataList;
    };

    Main_Window.prototype.getParentSkillList = function (skillId) {
        var selectCharaSkillList = this._selectCharaSkillList;
        var skillData = selectCharaSkillList[skillId];
        var skillDataList = new Array();
        if (skillData && skillData._derivationIdList && skillData._derivationIdList.length > 0) {
            skillData._derivationIdList.forEach(function (id) {
                var parentSkill = selectCharaSkillList[id];
                if (parentSkill) {
                    skillDataList.push(parentSkill);
                }
            });
        }
        return skillDataList;
    };

    Main_Window.prototype.getParentSkillIdList = function (skillId) {
        var selectCharaSkillList = this._selectCharaSkillList;
        var skillData = selectCharaSkillList[skillId];
        var skillIdList = new Array();
        if (skillData && skillData._derivationIdList && skillData._derivationIdList.length > 0) {
            skillData._derivationIdList.forEach(function (id) {
                var parentSkill = selectCharaSkillList[id];
                if (parentSkill) {
                    skillIdList.push(parentSkill._skillId);
                }
            });
        }
        return skillIdList;
    };

    // 裏スキル情報は表スキル画面内で表示しないのでそのまま取得する。
    Main_Window.prototype.getBackSkill = function (skillId) {
        if (skillId != null && skillId != "") {
            var skills = $dataSkills;
            var backSkills = skills.filter(function (value) {
                return value && Number(value.id) === Number(skillId);
            });

            if (backSkills != null && backSkills && backSkills.length > 0) {
                return new SkillData(skillId, backSkills[0].name);
            }
        }

        return null;
    };

    Main_Window.prototype.ringMoveUpdate = function () {
        if (this._ringTime >= 60) {
            this._ringTime = 0;
            this._ringMoveFlag = false;
            return;
        }
        this._ringTime += 5;

        var kakudo = 5;
        if (this._movePoint > 0) {
            kakudo = kakudo * -1;
        }
        this._imgRing.rotation += kakudo * (Math.PI / 180);
        this._pos += 1;
    };

    Main_Window.prototype.moveSKillTree = function () {
        var newMoveX = this._movePoint * -46;
        var oldMoveX = this._movePoint * -55;
        var newMoveY = -38;
        var oldMoveY = 55;

        if (this._movePoint > 0) {
            moveIconXFlag = this._dispBaseNextSkill.x >= 0;
        } else {
            moveIconXFlag = this._dispBaseNextSkill.x < 0;
        }

        if (moveIconXFlag) {
            this._dispBaseNextSkill.x += newMoveX;
        } else {
            var diff = Math.abs(this._dispBaseNextSkill.x - 0);
            if (diff != 0 && diff < 46) {
                this._dispBaseNextSkill.x = 0;
            }
        }

        if (this._dispBaseNextSkill.y >= 0) {
            this._dispBaseNextSkill.y += newMoveY;
        } else {
            var ydiff = Math.abs(this._dispBaseNextSkill.y - 0);
            if (ydiff != 0 && ydiff < 38) {
                this._dispBaseNextSkill.y = 0;
            }
        }
        if (!this._ringMoveFlag) {
            this._dispBaseNextSkill.x = 0;
            this._dispBaseNextSkill.y = 0;
        }
        this._dispBaseSkill.x += oldMoveX;
        this._dispBaseSkill.y += oldMoveY;
    };

    Main_Window.prototype.setPreviusSkill = function () {
        this.moveInitSkillIcon(-1);
        this._movePoint = -1;
    };

    Main_Window.prototype.setNextSkill = function () {
        this.moveInitSkillIcon(1);
        this._movePoint = 1;
    };

    Main_Window.prototype.moveInitSkillIcon = function (movePoint) {
        var nextIndex = 0;
        var nowIndex = 0;

        for (var i = 0; i < g_skillTypeList.length; i++) {
            if (this._selectSkillType == g_skillTypeList[i]) {
                nowIndex = i;
                break;
            }
        }

        if (nowIndex + movePoint >= g_skillTypeList.length) {
            nextIndex = 0;
        } else if (nowIndex + movePoint < 0) {
            nextIndex = g_skillTypeList.length - 1;
        } else {
            nextIndex = nowIndex + movePoint;
        }

        this._nextSkillType = g_skillTypeList[nextIndex];
        this.initNextSkillMap();
        this.drawNextDispSkillLine(movePoint);
    };

    Main_Window.prototype.dispDrawIconAndSetPostion = function (tskillData, isNext) {
        var iconIndex = tskillData._iconIndex;
        var x = tskillData._x;
        var y = tskillData._y;
        var baseDispx = SKILL_ICON_DISP_BASE_X;
        var baseDispy = SKILL_ICON_DISP_BASE_Y;
        var yMinusNum = Math.abs(startPosition[1] - y);
        var xMinusNum = startPosition[0] - x;

        if (yMinusNum > 0) {
            baseDispy = baseDispy - (yMinusNum * 60);
        }

        if (x != 0) {
            baseDispx = baseDispx - (xMinusNum * 60);
        }

        var sprite = new Sprite();
        sprite.bitmap = ImageManager.loadBitmap("img/dSkillTree/", tskillData._skillIconFileName);
        sprite.x = baseDispx;
        sprite.y = baseDispy;
        tskillData._dispX = baseDispx;
        tskillData._dispY = baseDispy;
        tskillData._skillIcon = sprite;
        return tskillData;
    };

    Main_Window.prototype.drawNextDispSkillLine = function (movePoint) {
        this.initDrawSkillLine(true, movePoint);
    };

    Main_Window.prototype.moveAfter = function () {
        if (!this._ringMoveFlag) {
            this.removeContents();
            this._lineList = null;
            this._lineList = undefined;
            this._lineList = new Array();
            for (var i = 0; i < this._newLineList.length; i++) {
                this._lineList.push(this._newLineList[i]);
            }

            this._newLineList = null;
            this._newLineList = undefined;
            this._newLineList = new Array();
            this.copyNextContents();
            this._skillMap = JSON.parse(JSON.stringify(this._nextSkillMap));
            this._selectSkillType = this._nextSkillType;
            this._headerWindow.drawSkillGroupInfo(g_skillGroupDescriptnList[this._selectSkillType]);
        }
    };

    Main_Window.prototype.removeContents = function () {
        var baseSkill = this._dispBaseSkill;
        var oldSKillList = this.getCaracterSkillList(this._selectSkillType);
        oldSKillList.forEach(function (skillData) {
            baseSkill.removeChild(skillData._skillIcon);
        });

        for (var i = 0; i < this._lineList.length; i++) {
            baseSkill.removeChild(this._lineList[i]);
        }
        baseSkill.removeChild(this._addPaintSKillLine);
        this._addPaintSKillLine.bitmap = new Bitmap(Graphics.width, Graphics.height);
    };

    Main_Window.prototype.copyNextContents = function () {
        var baseNextSKill = this._dispBaseSkill;
        baseNextSKill.x = 0;
        baseNextSKill.y = 0;
        var nextCharaSKillList = this.getCaracterSkillList(this._nextSkillType);
        nextCharaSKillList.forEach(function (skillData) {
            baseNextSKill.addChild(skillData._skillIcon);
        });

        for (var i = 0; i < this._lineList.length; i++) {
            baseNextSKill.addChild(this._lineList[i]);
        }
    };


    Main_Window.prototype.getCaracterSkillList = function (skillType) {
        var skillIdList = this._typeList[skillType];
        var charSkillList = this._selectCharaSkillList;
        var skillList = new Array();
        skillIdList.forEach(function (id) {
            skillList.push(charSkillList[id]);
        });
        return skillList;
    };

    function Window_Header_Window() {
        this.initialize.apply(this, arguments);
    };

    Window_Header_Window.prototype = Object.create(Window_Base.prototype);
    Window_Header_Window.prototype.constructor = Window_Header_Window;

    Window_Header_Window.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.drawTextEx("１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０", 0, 0);
        this.drawTextEx("１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０", 0, 35);
        this.drawTextEx("１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０", 0, 70);
        this.drawTextEx("１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０", 0, 105);
    };

    Window_Header_Window.prototype.drawSkillnfo = function (skillData) {
        if (this.contents) {
            this.contents.clear();
        }
        var skillName = skillData._skillName;
        var sp = "消費SP：" + skillData._sp;
        var description = skillData._description;
        if (skillData._dmp > 0) {
            skillName = skillName + " （消費MP：" + skillData._dmp + "）"
        }

        //;csvSkillData._dmp;

        this.drawTextInfo(skillName, 0, 0);
        this.drawTextInfo(description, 0, 35);
        // this.drawTextInfo(sp, 0,105);
    };

    Window_Header_Window.prototype.drawSkillGroupInfo = function (text) {
        if (this.contents) {
            this.contents.clear();
        }
        this.drawTextInfo(text, 0, 0);
    };

    Window_Header_Window.prototype.drawTextInfo = function (text, x, y) {
        this.drawTextEx(text, x, y);
    };

    // ================================================
    // 裏スキル用画面作成
    // ================================================
    function Scene_BackSKillTree_Scene() {
        this.initialize.apply(this, arguments);
    };

    Scene_BackSKillTree_Scene.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_BackSKillTree_Scene.prototype.constructor = Scene_BackSKillTree_Scene;

    Scene_BackSKillTree_Scene.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
        this._baseSprite = new Sprite();
        this.addChild(this._baseSprite);
        this._adultSceneCntMap = {};
    };

    Scene_BackSKillTree_Scene.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        var fotterHeight = 200;
        var fotterPositionY = Graphics.height - fotterHeight;
        this.counChartViewAdultScene();
        this._headerWindow = new Window_BackSkill_Header_Window(0, 0, Graphics.width, 130);
        this._fotterWindow = new Window_BackSkill_Fotter_Window(0, fotterPositionY, Graphics.width - 280, fotterHeight);
        var skillWindowHeight = Graphics.height - this._headerWindow.height - this._fotterWindow.height - 50;
        var skillWindowYPostion = this._headerWindow.y + this._headerWindow.height;
        this._skillWindow = new Window_BackSkill_selectWindow(0, skillWindowYPostion, Graphics.width / 2, skillWindowHeight, this._fotterWindow);
        this._skillWindow.opacity = 0;
        this._headerWindow.opacity = 0
        this._fotterWindow.opacity = 0
        this._skillWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._skillWindow.setHandler('pageup', this.previousActor.bind(this));
        this._skillWindow.setHandler('cancel', this.popScene.bind(this));
        this._skillWindow.setHandler('ok', this.skillSelectOK.bind(this));

        this.addWindow(this._headerWindow);
        this.addWindow(this._fotterWindow);
        this.addWindow(this._skillWindow);
        this._skillWindow.select(0);
        this._skillWindow.activate();
        createConfirmtMessageWindow(this);
        addWindowConfirmtMessageWindow(this);
        this._alertWindow = new D_Window_Common_Alert_Window(500, 200, this);
        this._alertWindow.setInitialize(this._alertWindow);
        this._skillWindow.setAlertWindow(this._alertWindow);
        this.addChild(this._alertWindow);
    };

    Scene_BackSKillTree_Scene.prototype.counChartViewAdultScene = function () {
        let ignoreList = new Array();
        // todo アペンドになる除外リスト
        // アペンドに移動したやつはignoreListから削除
        // ignoreList.push(2823);
        // ignoreList.push(2836);
        // ignoreList.push(2839);
        // ignoreList.push(2848);
        // ignoreList.push(2894);
        // 809,817をどうするかを確認,818
        this.countViewAdultScene(1,
            [806, 813],
            [803, 809, 814, 817],
            [804, 807, 812, 818, 821],
            [810, 815, 820, 823, 824, 825],
            ignoreList);
        this.countViewAdultScene(2,
            [826, 831],
            [827, 828, 832, 840],
            [835, 837, 841, 842, 845],
            [833, 836, 838, 843, 846, 847],
            ignoreList);
        this.countViewAdultScene(3,
            [852, 854],
            [849, 862, 859, 866],
            [853, 855, 856, 864, 867],
            [850, 857, 860, 868, 869, 870],
            ignoreList);
        this.countViewAdultScene(4,
            [873, 874],
            [876, 880, 883, 889],
            [877, 879, 882, 885, 888, 890],
            [884, 886, 891, 893, 894, 895],
            ignoreList);

    };

    Scene_BackSKillTree_Scene.prototype.countViewAdultScene = function (charId,
        lv1List,
        lv2List,
        lv3List,
        lv4List,
        ignoreList) {
        let lvMap = {};
        lvMap[1] = this.countViewAdultSceneTypeLv(lv1List, ignoreList);
        lvMap[2] = this.countViewAdultSceneTypeLv(lv2List, ignoreList);
        lvMap[3] = this.countViewAdultSceneTypeLv(lv3List, ignoreList);
        lvMap[4] = this.countViewAdultSceneTypeLv(lv4List, ignoreList);
        this._adultSceneCntMap[charId] = lvMap;
    };

    Scene_BackSKillTree_Scene.prototype.countViewAdultSceneTypeLv = function (lvList, ignoreList) {
        let viewMap = {};
        let lvMap = {};
        let allcnt = 0;
        let viewedCnt = 0;

        for (let i = 0; i < lvList.length; i++) {
            let lvNumber = (lvList[i] + 2000);
            if (!ignoreList.includes(lvNumber)) {
                allcnt++;
                if ($gameSwitches.value(lvNumber)) {
                    viewedCnt++;
                }
            }
        }
        viewMap[NASTYSKILL_VIEWEDCNT_STR] = viewedCnt;
        viewMap[NASTYSKILL_ALLCNT_STR] = allcnt;
        return viewMap;
    };

    Scene_BackSKillTree_Scene.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadBitmap("img/dSkillTree/", "adultSkillBackgound");
        this._baseSprite.addChild(this._backgroundSprite);

        this._backCharBaseImg = new Sprite();
        this._baseSprite.addChild(this._backCharBaseImg);

        this._messageWindowImg = new Sprite();
        this._messageWindowImg.bitmap = ImageManager.loadBitmap("img/dSkillTree/", "messageWindow");
        this._messageWindowImg.y = 401
        this._baseSprite.addChild(this._messageWindowImg);
    };

    Scene_BackSKillTree_Scene.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        this.refreshActor();
    };

    Scene_BackSKillTree_Scene.prototype.isReady = function () {
        return Scene_MenuBase.prototype.isReady();
    };

    Scene_BackSKillTree_Scene.prototype.refreshActor = function () {
        var actor = this.actor();
        this._skillWindow.setActor(actor);
        if (this._charImg) {
            this._backCharBaseImg.removeChild(this._charImg);
            this._charImg = null;
            this._charImg = undefined;
        }
        this._charImg = new Sprite();
        var nastyLevel = $gameSystem.getCharacterNastyLevel(actor._actorId);
        var imgNumber = "0" + actor._actorId + "1";
        nastyLevel = nastyLevel == 0 ? 1 : nastyLevel;
        let xPos = 0;
        let yPos = 0;
        let nastyFlag = false;
        switch (actor._actorId) {
            case 1:
                switch (nastyLevel) {
                    case 1:
                        imgNumber = "01203_n";
                        break;
                    case 2:
                        imgNumber = "01104_n";
                        break;
                    case 3:
                        imgNumber = "01110_n";
                        break;
                    case 4:
                        imgNumber = "01111_n";
                        break;
                }
                ;
                xPos = 435;
                yPos = -100;
                nastyFlag = $gameSwitches.value(SkillTreeP.cleaNotVirginSwitch);
                break;
            case 2:
                switch (nastyLevel) {
                    case 1:
                        imgNumber = "02109_n";
                        break;
                    case 2:
                        imgNumber = "02208_n";
                        break;
                    case 3:
                        imgNumber = "02110_n";
                        break;
                    case 4:
                        imgNumber = "02111_n";
                        break;
                }
                ;
                xPos = 450;
                yPos = -150;
                nastyFlag = $gameSwitches.value(SkillTreeP.relmNotVirginSwitch);
                break;
            case 3:
                switch (nastyLevel) {
                    case 1:
                        imgNumber = "03109_n";
                        break;
                    case 2:
                        imgNumber = "03104_n";
                        break;
                    case 3:
                        imgNumber = "03210_n";
                        break;
                    case 4:
                        imgNumber = "03211_n";
                        break;
                }
                ;
                xPos = 450;
                yPos = -20;
                nastyFlag = $gameSwitches.value(SkillTreeP.noraNotVirginSwitch);
                break;
            case 4:
                switch (nastyLevel) {
                    case 1:
                        imgNumber = "04105_n";
                        break;
                    case 2:
                        imgNumber = "04006_n";
                        break;
                    case 3:
                        imgNumber = "04010_n";
                        break;
                    case 4:
                        imgNumber = "04111_n";
                        break;
                }
                ;
                xPos = 450;
                yPos = -20;
                nastyFlag = $gameSwitches.value(SkillTreeP.sophiaNotVirginSwitch);
                break;
        }


        this._charImg.bitmap = getCharCosplayFacialExpressionImg(actor, imgNumber);
        this._charImg.x = xPos;
        this._charImg.y = yPos;
        this._charImg.scale.x = 0.607;
        this._charImg.scale.y = 0.607;
        this._backCharBaseImg.addChild(this._charImg);

        let nowNastyLvNum = $gameSystem.getCharacterNastyNum(this.actor()._actorId);
        let nextNastyLvNum = 0;
        // switch ($gameSystem.getCharacterNastyLevel(this.actor()._actorId)) {
        //     case 1:
        //         nextNastyLvNum = (Math.floor(INRANCHI_MAX/3) - nowNastyLvNum);
        //         break;
        //     case 2:
        //         nextNastyLvNum = (Math.floor(INRANCHI_MAX/3*2) - nowNastyLvNum);
        //         break;
        //     case 3:
        //         nextNastyLvNum = (INRANCHI_MAX - nowNastyLvNum);
        //         break;
        //     case 4:
        //         break;
        // }
        let cNastylv = $gameSystem.getCharacterNastyLevel(this.actor()._actorId);
        switch (cNastylv) {
            case 1:
            case 2:
            case 3:
                nextNastyLvNum = funNastyLvNum(cNastylv) - nowNastyLvNum;
                break;
            case 4:
                break;
        }

        this._headerWindow.setNastyLvAndASP(
            nastyLevel,
            $gameVariables.value(Number(SkillTreeP.aspVariableList[actor._actorId - 1])),
            $gameSystem.getCharacterNastyNum(actor._actorId),
            nastyFlag,
            nextNastyLvNum
        );
        this._skillWindow.setNastyFlag(nastyFlag);

        let viewMap = this._adultSceneCntMap[actor._actorId];
        let lvmap = viewMap[$gameVariables.value(SkillTreeP.nastyLvList[actor._actorId - 1])];
        this._headerWindow.setViewdAdultScene(lvmap[NASTYSKILL_VIEWEDCNT_STR],
            lvmap[NASTYSKILL_ALLCNT_STR]);
        this._headerWindow.refresh();
        this._skillWindow.changeSkillText();
    };

    Scene_BackSKillTree_Scene.prototype.onActorChange = function () {
        this.refreshActor();
        this._skillWindow.activate();
    };

    Scene_BackSKillTree_Scene.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);
        var confirmWindow = getConfirmMessageWindow(this);
        if (confirmWindow.isAnimationCompleteFlag()) {
            confirmWindow.setAnimationCompleteFlag(false);
            confirmWindow.closeCompleteWindow();
            this._skillWindow.activate();
        } else {
            if (this._confirmMessageWindow.isOpenAndActive()) {
                controlConfirmWindow(this)
            }
        }
    };

    Scene_BackSKillTree_Scene.prototype.skillSelectOK = function () {
        var confirmWindow = getConfirmMessageWindow(this);
        if (!confirmWindow.isOpenAndActive()) {
            var item = this._skillWindow._backSkillDataList[this._skillWindow.index()];
            confirmWindow.resetSkillData();
            confirmWindow.setBackSkillData(item);
            var hospotalitySkill = this.getHospitalityByBackSkill(item._skillId);
            var lv = $gameVariables.value(Number(item._variableNo));
            var plusLv = lv + 1;
            var skillList = new Array();
            // 紐づいている表スキルを画面に表示する
            // 表スキルの段階強化があるので、それの最大を取得する
            // そのため、再起的にスキルを全て取得する
            skillList = RecursionGetAllSkill(hospotalitySkill, this._skillWindow._allSkillDataList, skillList);
            skillList = skillList.reverse();
            confirmWindow.setSkillData(skillList[lv]);
            confirmWindow.setIsNextLv(this.checkNextLv());
            confirmWindow.setReinforcementDestinationData(skillList[plusLv]);
            this._skillWindow.deactivate();
            this._skillWindow.changeSkillText();
            confirmWindow.drawBackConfirm();
            confirmWindow.openAndActivateIsBack();
        }
    };

    Scene_BackSKillTree_Scene.prototype.checkNextLv = function () {
        // let num = $gameSystem.getCharacterNastyNum(this.actor()._actorId);
        // num = num + INRANCHI_ZOUKARITSU;
        // var isNextLv = false;
        // switch ($gameSystem.getCharacterNastyLevel(this.actor()._actorId)) {
        //     case 1:
        //         isNextLv = (num >= Math.floor(INRANCHI_MAX/3));
        //         break;
        //     case 2:
        //         isNextLv = (num >= Math.floor(INRANCHI_MAX/3*2));
        //         break;
        //     case 3:
        //         isNextLv = (num >= INRANCHI_MAX);
        //         break;
        //     case 4:
        //         break;
        // }

        // return isNextLv;
        return isNextLvCheckM(this.actor()._actorId);
    };

    Scene_BackSKillTree_Scene.prototype.skillIconOkLearnSkill = function () {
        let actor = this.actor();
        var confirmWindow = getConfirmMessageWindow(this);
        var nowSkill = confirmWindow.getSkillData();
        var newSkill = confirmWindow.getReinforcementDestinationData();
        if (newSkill) {
            this._skillWindow._actor.forgetSkill(Number(nowSkill._skillId));
            this._skillWindow._actor.learnSkill(Number(newSkill._skillId));
        }

        var backSkillData = confirmWindow.getBackSkillData();
        var lv = $gameVariables.value(Number(backSkillData._variableNo));
        var plusLv = lv + 1;
        $gameVariables.setValue(Number(backSkillData._variableNo), Number(plusLv));
        var asp = $gameVariables.value(Number(SkillTreeP.aspVariableList[actor._actorId - 1]));
        var newAsp = Number(asp) - Number(backSkillData._sp);
        $gameVariables.setValue(Number(SkillTreeP.aspVariableList[actor._actorId - 1]), Number(newAsp));
        if (this.checkNextLv()) {
            $gameSystem.addNastyLv(actor._actorId);
        }
        $gameSystem.addNastyNum(actor._actorId, INRANCHI_ZOUKARITSU);
        this._skillWindow.refreshView();
        this.refreshActor();
        // this._skillWindow.activate();
        let actorId = actor._actorId;

        let nastySkillStartId = NASTYSKILL_LIST[actorId];
        let cnt = 0;
        for (let i = 0; i < 18; i++) {
            if ($gameVariables.value(nastySkillStartId + i) < 3) {
                break;
            }
            cnt++;
        }

        if (cnt == 18) {
            let achArg = new Array();
            switch (actorId) {
                case 1:
                    achArg.push("気努愛落");
                    break;
                case 2:
                    achArg.push("禁断魔術");
                    break;
                case 3:
                    achArg.push("狂犬注意");
                    break;
                case 4:
                    achArg.push("気努愛落");
                    break;
            }
            Game_Interpreter.prototype.pluginCommand('実績', achArg);
        }


        for (let i = 1; i <= 4; i++) {
            if (i != actorId) {
                let actorSkillId = NASTYSKILL_LIST[i];
                for (let j = 0; j < 18; j++) {
                    if ($gameVariables.value(actorSkillId + j) < 3) {
                        break;
                    }
                    cnt++;
                }
            }
        }

        if (cnt == 72) {
            Game_Interpreter.prototype.pluginCommand('実績', ['性豪']);
        }
    };

    Scene_BackSKillTree_Scene.prototype.getHospitalityByBackSkill = function (backSkillId) {
        var hosSkillDataList = this._skillWindow._allSkillDataList.filter(function (value) {
            return value && !isNaN(value._backSkillid) && Number(value._backSkillid) === Number(backSkillId);
        });

        if (hosSkillDataList && hosSkillDataList.length > 0) {
            return hosSkillDataList[0];
        }
        return null;
    };

    function Window_BackSkill_Header_Window() {
        this.initialize.apply(this, arguments);
    };

    Window_BackSkill_Header_Window.prototype = Object.create(Window_Base.prototype);
    Window_BackSkill_Header_Window.prototype.constructor = Window_BackSkill_Header_Window;

    Window_BackSkill_Header_Window.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._nastyLv = 0;
        this._asp = 0;
        this._nastyNum = 0;
        this._allAdultSceneNum = 0;
        this._nowSceneNum = 0;
        this._nastyFlag = false;
        this._nextNastyLvNum = 0;
        this._viewdCnt = 0;
        this._allCnt = 0;
    };

    Window_BackSkill_Header_Window.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    };

    Window_BackSkill_Header_Window.prototype.setNastyLvAndASP = function (nastyLv, asp, nastyNum, nastyFlag, nextNastyLvNum) {
        this._nastyLv = nastyLv;
        this._asp = asp;
        this._nastyNum = nastyNum
        this._nastyFlag = nastyFlag;
        this._nextNastyLvNum = nextNastyLvNum;
    };

    Window_BackSkill_Header_Window.prototype.setViewdAdultScene = function (viewdCnt, allCnt) {
        this._viewdCnt = viewdCnt;
        this._allCnt = allCnt;
    };

    Window_BackSkill_Header_Window.prototype.drawHead = function () {
        this.drawText(this._nastyLv, 320, 0, this.width);
        this.drawText(this._asp, 720, 0, this.width);
        this.drawText((this._nastyFlag ? "非処女" : "処女"), 840, 0, this.width);
        this.drawText(this._nastyNum, 400, 53, this.width);
        this.drawText(this._nextNastyLvNum, 740, 53, this.width);

        this.drawText(this._viewdCnt + " / " + this._allCnt, 520, 0, this.width);

    };

    Window_BackSkill_Header_Window.prototype.refresh = function () {
        if (this.contents) {
            this.contents.clear();
        }
        this.drawHead();
    };

    function Window_BackSkill_Fotter_Window() {
        this.initialize.apply(this, arguments);
    };

    Window_BackSkill_Fotter_Window.prototype = Object.create(Window_Base.prototype);
    Window_BackSkill_Fotter_Window.prototype.constructor = Window_BackSkill_Fotter_Window;

    Window_BackSkill_Fotter_Window.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        // var text =　"１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋\n" +
        // "１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋\n" +
        // "１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋\n" +
        // "１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋\n" +
        // "１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋\n" +
        // "１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋１２３４５６７８９＋";
        //this.drawTextEx('\\c[2]'+text,0,0);
    };

    Window_BackSkill_Fotter_Window.prototype.update = function () {
        Window_Base.prototype.update.call(this);
    };

    Window_BackSkill_Fotter_Window.prototype.standardFontSize = function () {
        return 20;
    };

    Window_BackSkill_Fotter_Window.prototype.drawDescription = function (text) {
        if (this.contents) {
            this.contents.clear();
        }
        this.drawTextEx(text, 0, 10);
    };

    function Window_BackSkill_selectWindow() {
        this.initialize.apply(this, arguments);
    };

    Window_BackSkill_selectWindow.prototype = Object.create(Window_Selectable.prototype);
    Window_BackSkill_selectWindow.prototype.constructor = Window_BackSkill_selectWindow;

    Window_BackSkill_selectWindow.prototype.initialize = function (x, y, width, height, fotterWindow) {
        Window_Selectable.prototype.initialize.call(this, x, y, width + 180, height);
        this._allSkillDataList = null;
        this._backSkillDataList = null;
        this._fotterWindow = fotterWindow;
        this.create(x, y, width, height);
        this._nastyFlag = false;
    };

    Window_BackSkill_selectWindow.prototype.setNastyFlag = function (nastyFlag) {
        this._nastyFlag = nastyFlag;
    };

    Window_BackSkill_selectWindow.prototype.create = function (x, y, width, height) {
        this.refresh();
        this.activate();
    };

    Window_BackSkill_selectWindow.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_BackSkill_selectWindow.prototype.refresh = function () {
        if (this._actor) {
            getbackSkillParameter(this);
            this.refreshView();
        }

    };

    Window_BackSkill_selectWindow.prototype.refreshView = function () {
        if (this.contents) {
            this.contents.clear();
            this.drawAllItems();
        }
    };

    Window_BackSkill_selectWindow.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
    };

    Window_BackSkill_selectWindow.prototype.maxItems = function () {
        return this._backSkillDataList ? this._backSkillDataList.length : 0;
    };

    Window_BackSkill_selectWindow.prototype.maxCols = function () {
        return 3;
    };

    Window_BackSkill_selectWindow.prototype.standardFontSize = function () {
        return 19;
    };

    Window_BackSkill_selectWindow.prototype.drawItem = function (index) {
        if (this._backSkillDataList) {
            var item = this._backSkillDataList[index];
            var rect = this.itemRect(index);
            if (this._actor.hasSkill(item._skillId)) {
                this.changeTextColor(this.normalColor());
                this.drawText(item._skillName + " Lv." + $gameVariables.value(Number(item._variableNo)), rect.x, rect.y, this.width);
            } else {
                this.changeTextColor(this.textColor(8));
                this.drawText(item._skillName + " Lv.0", rect.x, rect.y, this.width);
            }
            this.changeTextColor(this.normalColor());
        }
    };

    Window_BackSkill_selectWindow.prototype.isCurrentItemEnabled = function () {
        if (this._backSkillDataList) {
            var item = this._backSkillDataList[this.index()];
            return this._actor.hasSkill(item._skillId);
        }
        return false;
    };

    Window_BackSkill_selectWindow.prototype.setAlertWindow = function (alertWindow) {
        this._alertWindow = alertWindow;
    };

    Window_BackSkill_selectWindow.prototype.processOk = function () {

        let isNextLv = isNextLvCheckM(this._actor._actorId);
        if ($gameSwitches.value(74)) {
            if ($gameSystem.getCharacterNastyLevel(this._actor._actorId) >= 2 && isNextLv) {
                this._alertWindow.setTxt("体験版ではこれ以上強化できません");
                this._alertWindow.startAnimation();
                this.playBuzzerSound();
                return;
            }
        } else if (!this._nastyFlag) {
            if ($gameSystem.getCharacterNastyLevel(this._actor._actorId) >= 2 && isNextLv) {
                this._alertWindow.setTxt("処女では淫乱Lv.3に上げられません");
                this._alertWindow.startAnimation();
                this.playBuzzerSound();
                return;
            }
        }

        if (this.isCurrentItemEnabled()) {
            if (!this.isLernSkill()) {
                //Lvが最大ではないか？
                this._alertWindow.startAnimation();
                this.playBuzzerSound();
            } else {
                if (isNextLv) {
                    AudioManager.playSe({ "name": SE_INRAN_WARNING, "volume": 90, "pitch": 100, "pan": 0 });
                } else {
                    this.playOkSound();
                }
                this.updateInputData();
                this.deactivate();
                this.callOkHandler();
            }

        } else {
            this._alertWindow.setTxt("スキルを取得していません");
            this._alertWindow.startAnimation();
            this.playBuzzerSound();
        }
    };

    Window_BackSkill_selectWindow.prototype.isLernSkill = function () {
        if (!this.checkHasSkill()) {
            // スキルを持っているかどうか
            // 多分デッドロジック
            this._alertWindow.setTxt("スキルを取得していません");
            return false;
        } else if (!this.checkAsp()) {
            // ポイントが足りているか？
            this._alertWindow.setTxt("APが足りません");
            return false;
        } else if (!this.checkLv()) {
            //Lvが最大ではないか？
            this._alertWindow.setTxt("LVが最大の為、強化できません");
            return false;
        }
        return true;
    };

    Window_BackSkill_selectWindow.prototype.checkHasSkill = function () {
        if (this._backSkillDataList) {
            var item = this._backSkillDataList[this.index()];
            return this._actor.hasSkill(item._skillId);
        }
        return false;
    };

    Window_BackSkill_selectWindow.prototype.checkAsp = function () {
        if (this._backSkillDataList) {
            var item = this._backSkillDataList[this.index()];
            //var hasResult = this._actor.hasSkill(item._skillId);
            var asp = $gameVariables.value(Number(SkillTreeP.aspVariableList[this._actor._actorId - 1]));
            return (Number(item._sp) <= Number(asp));
        }
        return false;
    };

    Window_BackSkill_selectWindow.prototype.checkLv = function () {
        if (this._backSkillDataList) {
            var item = this._backSkillDataList[this.index()];
            var lv = $gameVariables.value(Number(item._variableNo));
            return (lv < MAX_LEVEL);
        }
        return false;
    };

    Window_BackSkill_selectWindow.prototype.changeSkillText = function () {
        var item = this._backSkillDataList[this.index()];
        if (item) {
            let description = item._backSkillDescription;
            let lv = $gameVariables.value(Number(item._variableNo));
            if (description != null && description && description[String(lv)]) {
                this._fotterWindow.drawDescription(description[String(lv)]);
            }
            //this._fotterWindow.drawDescription(description);
        }
    };

    Window_BackSkill_selectWindow.prototype.cursorDown = function (wrap) {
        Window_Selectable.prototype.cursorDown.call(this, wrap);
        this.changeSkillText();
    };

    Window_BackSkill_selectWindow.prototype.cursorUp = function (wrap) {
        Window_Selectable.prototype.cursorUp.call(this, wrap);
        this.changeSkillText();
    };

    Window_BackSkill_selectWindow.prototype.cursorLeft = function (wrap) {
        Window_Selectable.prototype.cursorLeft.call(this, wrap);
        this.changeSkillText();
    };

    Window_BackSkill_selectWindow.prototype.cursorRight = function (wrap) {
        Window_Selectable.prototype.cursorRight.call(this, wrap);
        this.changeSkillText();
    };

    // ================================================
    // スキル用画面確認ウィンドウ
    // ================================================
    function Window_Confirm_Window() {
        this.initialize.apply(this, arguments);
    };

    Window_Confirm_Window.prototype = Object.create(Window_Base.prototype);
    Window_Confirm_Window.prototype.constructor = Window_Confirm_Window;

    Window_Confirm_Window.prototype.initialize = function () {
        let graphicHalf = Graphics.width / 2;
        let windowWidth = 450;
        let windowWidthHalf = windowWidth / 2;

        //Window_Base.prototype.initialize.call(this,300,100,450,200);
        Window_Base.prototype.initialize.call(this, graphicHalf - windowWidthHalf, 100, windowWidth, 200);

        this.opacity = 0;
        this._buttonWindowList = new Array();
        this._skillData = null;
        this._backSkillData = null;
        this._reinforcementDestinationData = null;
        this._completeOpenFlag = false;
        this._completeOpenCnt = 0;
        this._animationCompleteFlag = false;
        this._isNextLv = false;
    };

    Window_Confirm_Window.prototype.lineHeight = function () {
        return 30;
    };

    Window_Confirm_Window.prototype.setSkillData = function (skillData) {
        this._skillData = skillData;
    };

    Window_Confirm_Window.prototype.getSkillData = function () {
        return this._skillData;
    };

    Window_Confirm_Window.prototype.setIsNextLv = function (isNextLv) {
        this._isNextLv = isNextLv;
    };

    Window_Confirm_Window.prototype.isNextLv = function () {
        return this._isNextLv;
    };

    Window_Confirm_Window.prototype.setBackSkillData = function (backSkillData) {
        this._backSkillData = backSkillData;
    };

    Window_Confirm_Window.prototype.getBackSkillData = function () {
        return this._backSkillData;
    };

    Window_Confirm_Window.prototype.isCompleteOpenFlag = function () {
        return this._completeOpenFlag;
    };

    Window_Confirm_Window.prototype.isAnimationCompleteFlag = function () {
        return this._animationCompleteFlag;
    };

    Window_Confirm_Window.prototype.setAnimationCompleteFlag = function (flag) {
        return this._animationCompleteFlag = flag;
    };

    Window_Confirm_Window.prototype.setReinforcementDestinationData = function (reinforcementDestinationData) {
        this._reinforcementDestinationData = reinforcementDestinationData;
    };

    Window_Confirm_Window.prototype.getReinforcementDestinationData = function () {
        return this._reinforcementDestinationData;
    };

    Window_Confirm_Window.prototype.drawConfirm = function () {
        if (this.contents) {
            this.contents.clear();
        }

        let text = "このスキルを取得しますか？";
        let textWidth = Math.floor(this.textWidth(text) / 2);
        let windowWidthHalf = Math.floor(this.width / 2) - 22;
        let centerXPos = windowWidthHalf - textWidth;
        let skillNameWidthHalf = Math.floor(this.textWidth(this._skillData._skillName) / 2);
        this.drawTextEx('\\c[2]' + text, centerXPos + 5, 10 + this.lineHeight());
        this.drawTextEx(this._skillData._skillName, windowWidthHalf - skillNameWidthHalf + 5, 45 + this.lineHeight());
    };

    Window_Confirm_Window.prototype.drawHosComplete = function () {
        if (this.contents) {
            this.contents.clear();
        }
        let windowWidthHalf = Math.floor(this.width / 2) - 22;
        let addY = 0;
        if (!this._backSkillData) {
            addY += this.lineHeight();
        }

        let text = "スキル取得";
        let textWidth = Math.floor(this.textWidth(text) / 2);
        let centerXPos = windowWidthHalf - textWidth;
        let skillNameWidthHalf = Math.floor(this.textWidth(this._skillData._skillName) / 2);


        this.drawTextEx('\\c[2]' + text, centerXPos + 5, 10 + addY);
        this.drawTextEx(this._skillData._skillName, windowWidthHalf - skillNameWidthHalf + 5, 45 + addY);
        if (this._backSkillData) {
            let backSKillTexttext = "性技解放";
            let backTextWidth = Math.floor(this.textWidth(backSKillTexttext) / 2);
            let backCenterXPos = windowWidthHalf - backTextWidth;
            let backSkillNameWidthHalf = Math.floor(this.textWidth(this._backSkillData._skillName) / 2);

            this.drawTextEx('\\c[2]' + backSKillTexttext, backCenterXPos + 5, 90 + addY);
            this.drawTextEx(this._backSkillData._skillName, windowWidthHalf - backSkillNameWidthHalf + 5, 120 + addY);
        }
    };

    Window_Confirm_Window.prototype.openCompleteWindow = function () {
        this._completeOpenCnt = 0;
        this._completeOpenFlag = true;
        this._animationCompleteFlag = false;
        this.open();
        this.activate();
    };

    Window_Confirm_Window.prototype.closeCompleteWindow = function () {
        this.close();
        this.deactivate();
        this._completeOpenFlag = false;
        this._completeOpenCnt = 0;
        this._animationCompleteFlag = false;
    };

    Window_Confirm_Window.prototype.drawBackConfirm = function () {
        if (this.contents) {
            this.contents.clear();
        }
        let text = "この性技を強化しますか？";
        let textWidth = Math.floor(this.textWidth(text) / 2);
        let windowWidthHalf = Math.floor(this.width / 2) - 22;
        let centerXPos = windowWidthHalf - textWidth;
        let skillNameWidthHalf = Math.floor(this.textWidth(this._backSkillData._skillName) / 2);
        let addY = 0;
        if (!this.isNextLv()) {
            addY += this.lineHeight() / 2;
        }
        this.drawTextEx('\\c[2]' + text, centerXPos, this.lineHeight() + addY);
        this.drawTextEx(this._backSkillData._skillName, windowWidthHalf - skillNameWidthHalf, 30 + this.lineHeight() + addY);
        if (this.isNextLv()) {
            this.drawTextEx('\\c[6]' + "\\}\n※現在のレベルでプレイしていないアダルトシーンが\n　　　見られなくなりますが、よろしいですか？\\{", (windowWidthHalf - skillNameWidthHalf) / 3 - 10, 80 + this.lineHeight() - 20 - 20);
        }
    };

    Window_Confirm_Window.prototype.drawBackComplete = function () {
        if (this.contents) {
            this.contents.clear();
        }

        let windowWidthHalf = Math.floor(this.width / 2) - 22;

        let text = "性技開発成功";
        let textWidth = Math.floor(this.textWidth(text) / 2);
        let centerXPos = windowWidthHalf - textWidth;
        let skillNameWidthHalf = Math.floor(this.textWidth(this._backSkillData._skillName) / 2);

        this.drawTextEx('\\c[2]' + text, centerXPos + 5, 0 + this.lineHeight());
        this.drawTextEx(this._backSkillData._skillName, windowWidthHalf - skillNameWidthHalf + 5, 30 + this.lineHeight());

        if (this._reinforcementDestinationData && this._skillData) {
            // let hospitarityKillText = "性技解放！";
            let hospitalitySkillNameWidwth = Math.floor(this.textWidth(this._reinforcementDestinationData._skillName) / 2);
            let hospitalitySkillNameCenterXPos = windowWidthHalf - hospitalitySkillNameWidwth;
            let hospitalitySkillNameWidthHalf = Math.floor(this.textWidth(this._reinforcementDestinationData._skillName) / 2);
            // this.drawTextEx('\\c[2]"以下のスキルが強化されました',0,60);
            // this.drawTextEx(this._skillData._skillName+"ー＞"+this._reinforcementDestinationData._skillName,0,90);
            this.drawTextEx(this._reinforcementDestinationData._skillName, windowWidthHalf - hospitalitySkillNameWidthHalf + 5, 65 + this.lineHeight());
        }

    };

    Window_Confirm_Window.prototype.isOpenAndActive = function () {
        return this.isOpen() && this.active;
    };


    Window_Confirm_Window.prototype.addButtonWindow = function (window) {
        this._buttonWindowList.push(window);
    };

    Window_Confirm_Window.prototype.openAndActivate = function () {
        this.open();
        this.activate();
        this._buttonWindowList.forEach(function (buttonWindow) {
            buttonWindow.open();
            if (buttonWindow._isYesWindow) {
                buttonWindow.activate();
            } else {
                buttonWindow.deactivate();
            }
        });
    };

    Window_Confirm_Window.prototype.openAndActivateIsBack = function () {
        this.open();
        this.activate();
        let loNextLv = this.isNextLv();
        if (loNextLv) {
            this._buttonWindowList.forEach(function (buttonWindow) {
                buttonWindow.open();
                if (buttonWindow._isYesWindow) {
                    buttonWindow.deactivate();
                } else {
                    buttonWindow.activate();
                }
            });
        } else {
            this._buttonWindowList.forEach(function (buttonWindow) {
                buttonWindow.open();
                if (buttonWindow._isYesWindow) {
                    buttonWindow.activate();
                } else {
                    buttonWindow.deactivate();
                }
            });
        }
    };

    Window_Confirm_Window.prototype.closeAndDeActivate = function () {
        this.deactivate();
        this.close();
        this._buttonWindowList.forEach(function (buttonWindow) {
            buttonWindow.open();
            buttonWindow.deactivate();
            buttonWindow.close();
        });
    };

    Window_Confirm_Window.prototype.resetSkillData = function () {
        this._backSkillData = null;
        this._backSkillData = undefined;
        this._skillData = null;
        this._skillData = undefined;
        this._reinforcementDestinationData = null;
        this._reinforcementDestinationData = undefined;
    };

    Window_Confirm_Window.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        if (this._completeOpenFlag) {
            if (this._completeOpenCnt > 10 &&
                (Input.isPressed('ok'))) {
                // if (this._completeOpenCnt > 120) {
                this._completeOpenCnt = 0;
                this._completeOpenFlag = false;
                this.closeAndDeActivate();
                this._animationCompleteFlag = true;
            }
            this._completeOpenCnt++;
            if (this._completeOpenCnt > 30) this._completeOpenCnt = 31;
        }
    };
    // Window_Confirm_Window.prototype.update = function() {
    //     Window_Base.prototype.update.call(this);
    //     if (this._completeOpenFlag) {
    //         if (this._completeOpenCnt > 120) {
    //             this._completeOpenCnt  = 0;
    //             this._completeOpenFlag = false;
    //             this.closeAndDeActivate();
    //             this._animationCompleteFlag = true;
    //         }
    //         this._completeOpenCnt++;
    //     }
    // };


    //=============================================================================
    // はい/いいえを表示するためのウィンドウ
    //=============================================================================
    function Window_YesNo_Button_Window() {
        this.initialize.apply(this, arguments);
    };

    Window_YesNo_Button_Window.prototype = Object.create(Window_Base.prototype);
    Window_YesNo_Button_Window.prototype.constructor = Window_YesNo_Button_Window;

    Window_YesNo_Button_Window.prototype.initialize = function (x, y, width, txt, yesFlag) {
        let windowWidth = width;
        let windowHeight = 85;
        Window_Base.prototype.initialize.call(this, x, y, windowWidth, windowHeight);

        let txtWidthHalf = Math.floor(this.textWidth(txt) / 2);
        let txtHeightHalf = 15;

        let widthHalf = Math.floor(windowWidth / 2) - 20;
        let heightHalf = Math.floor(windowHeight / 2) - 22;
        this.drawTextEx(txt, widthHalf - txtWidthHalf, heightHalf - txtHeightHalf);
        this._toneMovecnt = 0;
        this._r = 255;
        this._g = 155;
        this._b = 255;
        this._r_num = this._r / 5 * -1;
        this._g_num = this._g / 5 * -1;
        this._b_num = this._b / 5 * -1;
        this._isYesWindow = yesFlag;
    };

    Window_YesNo_Button_Window.prototype.isOpenAndActive = function () {
        return this.isOpen() && this.active;
    };

    Window_YesNo_Button_Window.prototype.update = function () {
        Window_Base.prototype.update.call(this);
    };


    Window_YesNo_Button_Window.prototype.activate = function () {
        Window_Base.prototype.activate.call(this);
        this._toneMovecnt = 0;
        this._r = 255;
        this._g = 155;
        this._b = 255;
        this._r_num = this._r / 5 * -1;
        this._g_num = this._g / 5 * -1;
        this._b_num = this._b / 5 * -1;
    };

    Window_YesNo_Button_Window.prototype.deactivate = function () {
        Window_Base.prototype.deactivate.call(this);
        var systemTone = $gameSystem.windowTone();
        this.setTone(systemTone[0], systemTone[1], systemTone[2]);
    };

    Window_YesNo_Button_Window.prototype.updateTone = function () {
        if (this.active) {
            if (this._toneMovecnt >= 6) {
                this._r += this._r_num;
                this._g += this._g_num;
                this._b += this._b_num;
                var systemTone1 = [this._r, this._g, this._b]
                this.setTone(systemTone1[0], systemTone1[1], systemTone1[2]);
                this._toneMovecnt = 0;
                if (this._r <= 0 || this._r > 255) {
                    this._r_num = this._r_num * -1;
                    this._g_num = this._g_num * -1;
                    this._b_num = this._b_num * -1;
                }
            }

            this._toneMovecnt++;
        }
    };

    //=============================================================================
    // Window_MenuCommand
    //=============================================================================

    var _TEST_Window_MenuCommand_addOriginalCommands2 = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        //既存のメニュー一覧を読み込み
        _TEST_Window_MenuCommand_addOriginalCommands2.call(this);
        //本プラグラインにおける追加メニューをセット
        this.addCommand('Skill Tree', 'Dobby_skilltree', true);
        this.addCommand('Sex Development', 'Dobby_Back_skilltree', true);
    };

    //=============================================================================
    // Scene_Menu
    //=============================================================================

    var _TEST_Scene_Menu_createCommandWindow2 = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _TEST_Scene_Menu_createCommandWindow2.call(this);
        //追加メニューの挙動を指定（TestSymbol選択なら下記に自作したonCommandTestを読み込み）
        this._commandWindow.setHandler('Dobby_skilltree', this.commandPersonal.bind(this));
        this._commandWindow.setHandler('Dobby_Back_skilltree', this.commandPersonal.bind(this));
    };

    //メニュー選択時即時表示
    Scene_Menu.prototype.onCommandTest = function () {
        SceneManager.push(Scene_SKillTree_Scene);
    };

    //アクター選択可能版
    var _TEST_Scene_Menu_onPersonalOk2 = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function () {
        _TEST_Scene_Menu_onPersonalOk2.call(this);
        switch (this._commandWindow.currentSymbol()) {
            case 'Dobby_skilltree':
                SceneManager.push(Scene_SKillTree_Scene);
                break;
            case 'Dobby_Back_skilltree':
                SceneManager.push(Scene_BackSKillTree_Scene);
                break;
        }
    };

}());//EOF