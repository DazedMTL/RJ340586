//=============================================================================
// Tatsu_PazzleGame.js
// 内容：パズルゲームをプレイするためのプラグインです。
// 製作者：タツノコ
// バージョン：Ver1.0.3
//=============================================================================
/*:
 * @plugindesc パズルゲームのプラグイン
 * @author タツノコ
 *
 * @param isClear
 * @text クリア情報を保持するスイッチ
 * @desc クリア情報を保持するスイッチ
 * @type @type switch
 * @default 0
 * 
 * @param columnum
 * @text デフォルトの横のピースの数
 * @desc デフォルトの横のピースの数
 * @type number
 * @min 2
 * @max 5
 * @default 3
 * 
 * @param rownum
 * @text デフォルトの縦のピースの数
 * @desc デフォルトの縦のピースの数
 * @type number
 * @min 2
 * @max 5
 * @default 3
 *
 * @param useMouse
 * @text マウス操作有無
 * @desc ピースの移動をマウスクリック（タップ操作）でもできるようにするかを設定できます。
 * @type Boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * 
 * @param useBGM
 * @text ゲームBGM鳴動設定
 * @desc ゲームプレイ中に設定した専用のBGMを流すかを設定することができます。
 * @type Boolean
 * @on 専用BGMを流す
 * @off 専用BGMを流さない
 * @default false
 * 
 * @param backBGM
 * @text ゲームBGM設定
 * @desc ゲームプレイ中に流したい専用のBGMのファイル名を入力してください。
 * @type String
 * 
 * @param useClearSe
 * @text クリア時の効果音鳴動有無
 * @desc クリア時、クリアSEを鳴らすかを設定することができます。
 * @type Boolean
 * @on SEを鳴らす
 * @off SEを鳴らさない
 * @default false
 * 
 * @param clearSe
 * @text クリア時の効果音設定
 * @desc クリアした時に流す専用のSEのファイル名を入力してください。
 * @type String
 * 
 * @param useWinAnimation
 * @text クリア画像表示
 * @desc クリア時、クリア画像を表示するかを設定することができます。
 * @type Boolean
 * @on クリア画像を表示する
 * @off クリア画像を表示しない
 * @default false
 * 
 * @param -> フェードイン/アウト画像 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param useStartFadeIn
 * @text フェードイン設定
 * @desc ゲーム開始時のフェードイン演出の有無を設定します。
 * @type Boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @parent -> フェードイン/アウト画像 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param useEndFadeOut
 * @text フェードアウト設定
 * @desc ゲーム終了時のフェードアウト演出の有無を設定します。
 * @type Boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @parent -> フェードイン/アウト画像 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> バックグラウンド画像用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param useBackground
 * @text 背景画像表示設定
 * @desc ゲーム中、ピースの後ろに背景画像を表示するかを設定します。
 * @type Boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 * @parent -> バックグラウンド画像用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param backgroundImage
 * @text 背景画像ファイル設定
 * @desc ピースの後ろに設定したい背景画像のファイル名を入力してください。
 * @type String
 * @parent -> バックグラウンド画像用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> フレームデザイン画像用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param useFrame
 * @text フレームデザイン画像表示設定
 * @desc ピースの前面全体に画像を表示するかを設定します。
 * @type Boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 * @parent -> フレームデザイン画像用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param frameImg
 * @text フレームデザイン画像ファイル設定
 * @desc ピースの前面全体に表示したい画像のファイル名を入力してください。
 * @type String
 * @parent -> フレームデザイン画像用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> 終了ボタン画像のポジション用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param useExitButton
 * @text 終了ボタン画像使用設定
 * @desc 終了ボタン画像を使用するかを設定します。
 * @type Boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @parent -> 終了ボタン画像のポジション用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param exitButtonImg
 * @text 終了ボタン画像ファイル設定
 * @desc 終了ボタンを使う際に、表示したい「終了ボタン画像」のファイル名を入力してください。
 * @type String
 * @parent -> 終了ボタン画像のポジション用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param exitImgX
 * @text 終了ボタン画像の表示位置設定（X座標）
 * @desc 終了ボタン画像のX座標を設定します。
 * @default 100
 * @parent -> 終了ボタン画像のポジション用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param exitImgY
 * @text 終了ボタン画像の表示位置設定（Y座標）
 * @desc 終了ボタン画像のY座標を設定します。
 * @default 294
 * @parent -> 終了ボタン画像のポジション用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> ウィンドウのポジション用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param confirmWindowX
 * @text 終了確認ウィンドウの表示位置設定（X座標）
 * @desc 終了確認ウィンドウのX座標を設定します。
 * @default 100
 * @parent -> ウィンドウのポジション用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param confirmWindowY
 * @text 終了確認ウィンドウの表示位置設定（Y座標）
 * @desc 終了確認ウィンドウのY座標を設定します。
 * @default 294
 * @parent -> ウィンドウのポジション用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param confirmWindowWidth
 * @text 終了確認ウィンドウの幅設定
 * @desc 終了確認ウィンドウの幅を設定します。(pixel指定)
 * @default 120
 * @parent -> ウィンドウのポジション用パラメータ <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param confirmWindowHeight
 * @text 終了確認ウィンドウの高さ設定
 * @desc 終了確認ウィンドウの高さを設定します。(pixel指定)
 * @default 120
 * @parent -> ウィンドウのポジション用パラメータ <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、ゲーム内にてパズルゲームを実装するプラグインです。
 * 
 * 【プラグインインストール方法】
 *   1.解凍後、出来上がった以下のフォルダを所定の位置に配置してください
 *     1-1.audio/bgm/bgm_kajino.ogg
 *     配置場所※1：RPGツクールのプロジェクト/audio/bgm/
 *
 *     1-2.audio/se/se_fanfale.ogg
 *           audio/se/slide.ogg 
 *     配置場所※1：RPGツクールのプロジェクト/audio/se/
 *
 *     1-3.jsファイルの配置場所
 *     配置場所：js/plugins
 *
 *     1-4.画像ファイルの配置場所
 *     配置場所：img/tatsuPazzle
 *     用途：
 *       「パズルに使いたい画像」（必須/複数可）
 *       「背景画像」（任意）
 *       「フレーム画像」（任意）
 *       「やめる画像」（任意）
 *
 *     ※1…そのファイルを利用する場合にのみ配置してください。
 *     利用しない場合は、プラグインパラメータからOFFにしてください。
 *
 * 【プラグイン設定方法】
 *    1.RPGツクールMVを起動
 *    2.メニュー画面より、「プラグイン管理」を選択
 *    3.プラグイン管理画面にて「Tatsu_PazzleGame」を追加後、「有効」に設定
 *
 * 【プラグイン呼び出し方法】
 *    ・イベントの「プラグインコマンド」に以下を入力
 *      RPGツクールMV版の場合
 *        Tatsu_PazzleGame start 使用したい画像のファイル名 横の分割数 縦の分割数
 *
 *      RPGツクールMZ版の場合
 *        プラグイン名：Tatsu_PazzleGameVerMZ
 *        コマンド名：パズルゲームの開始
 *        引数：「・引数の説明」にて記述
 *
 *    ・引数の説明
 *     ・使用したい画像のファイル名（必須項目）：img/tatsuPazzleに配置しているパズルに利用したいファイル名
 *     ・横の分割数（任意項目）：横に分割したい数(最低:2、最大5)
 *     ・縦の分割数（任意項目）：縦に分割したい数(最低:2、最大5)
 *      ※横/縦の分割数を省略した場合、プラグインパラメータに設定している値がそれぞれ設定されます。
 *      ※横の分割数のみの指定、縦の分割数のみの指定はできません。
 *
 * 【プラグインパラメータの説明】
 *   1.クリア情報を保持するスイッチ
 *     ゲームのクリアを判定するためのスイッチです。
 *     クリアしたことを検知したい場合にお使いください。
 *
 *   2.デフォルトの横のピースの数
 *     プラグイン呼び出し時に、横のピース数を設定しなかった場合、デフォルトで設定されるピース数です。
 *
 *   3.デフォルトの縦のピースの数
 *     プラグイン呼び出し時に、縦のピース数を設定しなかった場合、デフォルトで設定されるピース数です。
 *
 *   4.マウス操作有無
 *     ピースの移動をマウスクリック（タップ操作）でもできるようにするかを設定できます。
 *     true : キーボード（十字キー）または マウスクリック（タップ操作）で操作する
 *     false: キーボード（十字キー）のみで操作する
 *
 *   5.ゲームBGM鳴動設定
 *     ゲームプレイ中に設定した専用のBGMを流すかを設定することができます。
 *     true : 専用BGMを流す
 *     false: 専用BGMを流さない
 *
 *   6.ゲームBGM設定
 *      ゲームプレイ中に流したい専用のBGMのファイル名を入力してください。
 *      ※専用BGMを使わない場合は、空で大丈夫です。
 *
 *   7.クリア時の効果音鳴動有無
 *     クリア時、クリアSEを鳴らすかを設定することができます。
 *       true : クリア時にSEを鳴らす
 *       false: クリア時にSEを鳴らさない
 * 
 *   8.クリア時の効果音設定
 *      クリアした時に流す専用のSEのファイル名を入力してください。
 *      ※専用SEを使わない場合は、空で大丈夫です。
 *
 *   9.クリア画像表示
 *     クリア時、クリア画像を表示するかを設定することができます。
 *       true : 設定したクリア画像を表示する
 *       false: 設定したクリア画像を表示しない
 *
 *   10.フェードイン設定
 *     ゲーム開始時のフェードイン演出の有無を設定します。
 *       true  : 一度暗転し、ゲーム画面がフェードインされます
 *       false : 一瞬でゲーム画面が表示されます
 *
 *   11.フェードアウト設定
 *     ゲーム終了時のフェードアウト演出の有無を設定します。
 *       true  : フェードアウト後、元の画面に戻ります
 *       false : 一瞬で元の画面に戻ります
 *
 *   12.背景画像表示設定
 *     ゲーム中、ピースの後ろに背景画像を表示するかを設定します。
 *       true  : 表示する
 *       false : 表示しない
 *
 *   13.背景画像ファイル設定
 *     ピースの後ろに設定したい背景画像のファイル名を入力してください。
 *     （※使用したい画像はimg/tatsuPazzleに入れてください。）
 *
 *   14.フレームデザイン画像表示設定
 *     ピースの前面全体に画像を表示するかを設定します。
 *     true  : 表示する
 *     false : 表示しない
 *
 *   15.フレームデザイン画像ファイル設定
 *     ピースの前面全体に表示したい画像のファイル名を入力してください。
 *     （※使用したい画像はimg/tatsuPazzleに入れてください。）
 *
 *   16.終了ボタン画像使用設定
 *     終了ボタン画像を使用するかを設定します。
 *     true  : 使用する
 *     false : 使用しない
 *
 *   17.終了ボタン画像ファイル設定
 *     終了ボタンを使う際に、表示したい「終了ボタン画像」のファイル名を入力してください。
 *     （※使用したい画像はimg/tatsuPazzleに入れてください。）
 *
 *   18.終了ボタン画像の表示位置設定（X座標）
 *     終了ボタン画像のX座標を設定します。
 *
 *   19.終了ボタン画像の表示位置設定（Y座標）
 *     終了ボタン画像のY座標を設定します。
 *
 *   20.終了確認ウィンドウの表示位置設定（X座標）
 *     終了確認ウィンドウのX座標を設定します。
 *
 *   21.終了確認ウィンドウの表示位置設定（Y座標）
 *     終了確認ウィンドウのY座標を設定します。
 *
 *   22.終了確認ウィンドウの幅設定
 *     終了確認ウィンドウの幅を設定します。(pixel指定)
 *
 *   23.終了確認ウィンドウの高さ設定
 *     終了確認ウィンドウの高さを設定します。(pixel指定)
 *
 * 【ルール】
 *    「パズルに使いたい画像」が指定した数で分割された上で
 *    バラバラに並べ替えられて表示されます。
 *    ピースをスライドさせて、元の絵を完成させてください。
 *    ※スペースに隣接したピースしか動かせません。
 *
 * 【操作方法】
 *    ・十字キーを使う場合
 *      ↑キー : 上にスペースが空いているピースを上に移動させます
 *      ↓キー : 下にスペースが空いているピースを下に移動させます
 *      ←キー : 左にスペースが空いているピースを左に移動させます
 *      →キー : 右にスペースが空いているピースを右に移動させます
 *
 *    ・マウスを使う場合
 *      スペースが空いているピースに隣接するピースをクリックした場合、
 *      空いているスペースにピースを移動させます。
 *
 *    絵が完成できたらクリアとなります。
 *-----------------------------------------------------------------------------
 * 変更履歴
 *-----------------------------------------------------------------------------
 * 
 * Ver 1.0.0 初版
 * Ver 1.0.1 フェードイン/アウトが正しく動かない挙動を修正
 *                 プラグインパラメータの日本語修正
 * Ver 1.0.2 必要SEの導入不備を対応
 * Ver 1.0.3 ピース数が2X2の時にフリーズに陥りやすいバグを対応
 *-----------------------------------------------------------------------------
 *-----------------------------------------------------------------------------
 * 素材著作権
 *-----------------------------------------------------------------------------
 * 
 * 【デフォルトで使用している音楽、および効果音】
 * 　->魔王魂樣
 * 【URL】
 * 　->https://maoudamashii.jokersounds.com/
 * 
 *
 * 【ピース画像】
 * 　->タツノコ
 * 
 *-----------------------------------------------------------------------------
 * スペシャルサンクス
 *-----------------------------------------------------------------------------
 * 
 * ことりっぽ
 * aya
 * 
 *-----------------------------------------------------------------------------
 * その他利用規約
 *-----------------------------------------------------------------------------
 * その他利用規約については添付の「readme.txt」をご覧ください。
 *
 */
//=============================================================================

(function () {

    let getArgJson = function (arg, defaultValue) {
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

    var TatsuPazzleGameP = TatsuPazzleGameP || {};
    let parameters = PluginManager.parameters('Tatsu_PazzleGame');
    TatsuPazzleGameP.backgroundImage = String(parameters['backgroundImage'] || null);
    TatsuPazzleGameP.frameImg = String(parameters['frameImg'] || null);
    TatsuPazzleGameP.useFrameStr = String(parameters['useFrame'] || 'false');
    TatsuPazzleGameP.useBackgroundStr = String(parameters['useBackground'] || 'false');
    TatsuPazzleGameP.isClearNum = Number(parameters['isClear'] || 0);
    TatsuPazzleGameP.columnum = Number(parameters['columnum'] || 3);
    TatsuPazzleGameP.rownum = Number(parameters['rownum'] || 3);
    TatsuPazzleGameP.useMouseStr = String(parameters['useMouse'] || 'false');

    // 開始
    TatsuPazzleGameP.useStartFadeInStr = String(parameters['useStartFadeIn'] || 'false');
    TatsuPazzleGameP.useEndFadeOutStr = String(parameters['useEndFadeOut'] || 'false');

    // BGM
    TatsuPazzleGameP.useBGMStr = String(parameters['useBGM'] || 'false');
    TatsuPazzleGameP.backBGM = String(parameters['backBGM'] || null);

    // SE
    TatsuPazzleGameP.useClearSeStr = String(parameters['useClearSe'] || 'false');
    TatsuPazzleGameP.clearSe = String(parameters['clearSe'] || null);

    // アニメーション
    TatsuPazzleGameP.useWinAnimationStr = String(parameters['useWinAnimation'] || 'false');

    // 確認ウィンドウ
    TatsuPazzleGameP.confirmWindowX = Number(parameters['confirmWindowX'] || 0);
    TatsuPazzleGameP.confirmWindowY = Number(parameters['confirmWindowY'] || 0);
    TatsuPazzleGameP.confirmWindowWidth = Number(parameters['confirmWindowWidth'] || 120);
    TatsuPazzleGameP.confirmWindowHeight = Number(parameters['confirmWindowHeight'] || 120);

    // やめるボタン
    TatsuPazzleGameP.useExitButtonStr = String(parameters['useExitButton'] || 'false');
    TatsuPazzleGameP.exitButtonImg = String(parameters['exitButtonImg'] || null);
    TatsuPazzleGameP.exitImgX = Number(parameters['exitImgX'] || 0);
    TatsuPazzleGameP.exitImgY = Number(parameters['exitImgY'] || 0);

    TatsuPazzleGameP.useExitButton = false;
    TatsuPazzleGameP.useFrame = false;
    TatsuPazzleGameP.useBackground = false;
    TatsuPazzleGameP.useBGM = false;
    TatsuPazzleGameP.useBGM = false;
    TatsuPazzleGameP.useClearSe = false;
    TatsuPazzleGameP.useWinAnimation = false;
    TatsuPazzleGameP.useStartFadeIn = false;
    TatsuPazzleGameP.useEndFadeOut = false;

    TatsuPazzleGameP.img = "";

    'use strict';

    const EMPTY_NUM = 999999;
    function PanelInfo() {
        this.initialize.apply(this, arguments);
    };

    PanelInfo.prototype.initialize = function (initPosition, sprite, nowPostion, imgWidth, imgHeghit) {
        this._sprite = sprite;
        this._imgWidth = imgWidth;
        this._imgHeghit = imgHeghit;
        this._initPosition = initPosition;
        this._nowPostion = nowPostion;
    };

    PanelInfo.prototype.getInitPosition = function () {
        return this._initPosition;
    };

    PanelInfo.prototype.getSprite = function () {
        return this._sprite;
    };

    PanelInfo.prototype.setNowPostion = function (nowPostion) {
        this._nowPostion = nowPostion;
    };

    PanelInfo.prototype.getNowPostion = function () {
        return this._nowPostion;
    };

    PanelInfo.prototype.getNowPositionCol = function () {
        return Math.floor(this._nowPostion % TatsuPazzleGameP.columnum);
    };

    PanelInfo.prototype.getNowPositionRow = function () {
        return Math.floor(this._nowPostion / TatsuPazzleGameP.columnum);
    };

    PanelInfo.prototype.getImgWidth = function () {
        return this._imgWidth;
    };

    PanelInfo.prototype.getImgHeghit = function () {
        return this._imgHeghit;
    };

    let pluginName = "Tatsu_PazzleGame";
    let _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            switch (args[0]) {
                case 'start':
                    if (args[1] != "" && args[1] != null) {
                        TatsuPazzleGameP.img = args[1];
                        if (args.length > 3) {
                            if (args[2]) {
                                TatsuPazzleGameP.columnum = Number(args[2]);
                            }

                            if (args[3]) {
                                TatsuPazzleGameP.rownum = Number(args[3]);
                            }

                        }
                        SceneManager.push(Scene_PazzleGameScene);
                        break;
                    } else {
                        alert("パズル用の画像が指定されてません。");
                        break;
                    }
            }
        }
    };

    function Scene_PazzleGameScene() {
        this.initialize.apply(this, arguments);
    };

    Scene_PazzleGameScene.prototype = Object.create(Scene_Base.prototype);
    Scene_PazzleGameScene.prototype.constructor = Scene_PazzleGameScene;
    Scene_PazzleGameScene.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        if (TatsuPazzleGameP.isClearNum != 0) {
            $gameSwitches.setValue(TatsuPazzleGameP.isClearNum, false);
        }

        TatsuPazzleGameP.useMouse = String(TatsuPazzleGameP.useMouseStr) === "true" ? true : false;
        TatsuPazzleGameP.useExitButton = String(TatsuPazzleGameP.useExitButtonStr) === "true" ? true : false;
        TatsuPazzleGameP.useFrame = String(TatsuPazzleGameP.useFrameStr) === "true" ? true : false;
        TatsuPazzleGameP.useBackground = String(TatsuPazzleGameP.useBackgroundStr) === "true" ? true : false;
        TatsuPazzleGameP.useBGM = String(TatsuPazzleGameP.useBGMStr) === "true" ? true : false;
        TatsuPazzleGameP.useWinAnimation = String(TatsuPazzleGameP.useWinAnimationStr) === "true" ? true : false;
        TatsuPazzleGameP.useStartFadeIn = String(TatsuPazzleGameP.useStartFadeInStr) === "true" ? true : false;
        TatsuPazzleGameP.useEndFadeOut = String(TatsuPazzleGameP.useEndFadeOutStr) === "true" ? true : false;
        TatsuPazzleGameP.useClearSe = String(TatsuPazzleGameP.useClearSeStr) === "true" ? true : false;

        let mas = TatsuPazzleGameP.rownum * TatsuPazzleGameP.columnum;
        let tmppicutreImgList = {};
        this._pictureImgList = new Array();
        this._makePictureImgList = new Array();
        this._randArray = new Array();
        this._moveFlag = false;
        this._moveTargetPiece = null;
        this._mappingArea = new Array();
        this._clearAnimationStartFlag = false;
        this._animationCnt = 0;
        let row = 0;
        let col = 0;
        this._step = 'init';
        for (let i = 0; i < mas; i++) {
            if (i < mas - 1) {
                if (col >= TatsuPazzleGameP.columnum) {
                    col = 0;
                    row += 1;
                }
                this._pictureImgList.push(new Sprite(ImageManager.loadBitmap('img/tatsuPazzle/', TatsuPazzleGameP.img)));
                this._randArray.push({ "num": i, "col": col, "row": row });
                this._mappingArea.push(0);
            } else {
                this._mappingArea.push(EMPTY_NUM);
            }
            col += 1;
        }
    };

    Scene_PazzleGameScene.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createOtherImg();

        this.createWindowLayer();
        this._WindowExitMsg = new Window_Message();
        this._WindowExitMsg.drawText("終わりますか？", 0, 0, Graphics.width, 300);
        this.addWindow(this._WindowExitMsg);
        this._WindowWinMsg = new Window_Message();
        this._WindowWinMsg.drawText("クリアしました", 0, 0, Graphics.width, 300);
        this.addWindow(this._WindowWinMsg);

        this._confirmMsgSelectWindow = new Window_continue_Select();
        this._confirmMsgSelectWindow.setHandler('ok', this.confirmExit.bind(this));
        this.addWindow(this._confirmMsgSelectWindow);
        this._WindowExitMsg.close();
        this._WindowExitMsg.deactivate();
        this._WindowWinMsg.close();
        this._WindowWinMsg.deactivate();
        this._confirmMsgSelectWindow.close();
        this._confirmMsgSelectWindow.deactivate();
        this._confirmMsgSelectWindow.opacity = 0;

    };

    Scene_PazzleGameScene.prototype.createBackground = function () {
        this._backGroundImg = new Sprite();
        if (TatsuPazzleGameP.backgroundImage &&
            TatsuPazzleGameP.backgroundImage != null &&
            TatsuPazzleGameP.backgroundImage != "" &&
            TatsuPazzleGameP.backgroundImage != "null" &&
            TatsuPazzleGameP.useBackground) {
            this._backGroundImg.bitmap = ImageManager.loadBitmap('img/tatsuPazzle/', TatsuPazzleGameP.backgroundImage);
        }

        this.addChild(this._backGroundImg);
    };

    Scene_PazzleGameScene.prototype.createOtherImg = function () {
        this._pieceGroundImg = new Sprite();
        this.addChild(this._pieceGroundImg);
        this._coverGroundImg = new Sprite();
        this.addChild(this._coverGroundImg);
        this._otherGroundImg = new Sprite();
        this.addChild(this._otherGroundImg);
        this._exitButtonImg = new Sprite();
        this._frameImg = new Sprite();
        this._animationImg = new Sprite();
        this._fadeSprite = new Sprite();

        if (TatsuPazzleGameP.frameImg &&
            TatsuPazzleGameP.frameImg != null &&
            TatsuPazzleGameP.frameImg != "" &&
            TatsuPazzleGameP.frameImg != "null" &&
            TatsuPazzleGameP.useFrame) {
            this._frameImg.bitmap = ImageManager.loadBitmap('img/tatsuPazzle/', TatsuPazzleGameP.frameImg);
            this._otherGroundImg.addChild(this._frameImg);
        }

        if (TatsuPazzleGameP.exitButtonImg &&
            TatsuPazzleGameP.exitButtonImg != null &&
            TatsuPazzleGameP.exitButtonImg != "" &&
            TatsuPazzleGameP.exitButtonImg != "null" &&
            TatsuPazzleGameP.useExitButton) {
            this._exitButtonImg.bitmap = ImageManager.loadBitmap('img/tatsuPazzle/', TatsuPazzleGameP.exitButtonImg);
            this._otherGroundImg.addChild(this._exitButtonImg);
            this._exitButtonImg.x = TatsuPazzleGameP.exitImgX;
            this._exitButtonImg.y = TatsuPazzleGameP.exitImgY;
        }

        if (TatsuPazzleGameP.useWinAnimation) {
            this._animationImg.bitmap = ImageManager.loadBitmap('img/tatsuPazzle/', "win");
            this._otherGroundImg.addChild(this._animationImg);
            this._animationImg.x = Graphics.width;
            this._animationImg.opacity = 0;
        }

        if (TatsuPazzleGameP.useStartFadeIn || TatsuPazzleGameP.useEndFadeOut) {
            this._fadeSprite.bitmap = ImageManager.loadBitmap('img/tatsuPazzle/', "fadeSprite");
            this._otherGroundImg.addChild(this._fadeSprite);
            if (!TatsuPazzleGameP.useStartFadeIn) {
                this._fadeSprite.opacity = 0;
            }
        }
    };

    Scene_PazzleGameScene.prototype.isReady = function () {
        if (!Scene_Base.prototype.isReady.call(this)) {
            return false;
        }

        if (TatsuPazzleGameP.useBackground) {
            let isReadedBackImg = (this._backGroundImg.width > 0 && this._backGroundImg.height > 0);
            if (!isReadedBackImg) {
                return false;
            }
        }

        if (TatsuPazzleGameP.useExitButton) {
            let isReadedExiyImg = (this._exitButtonImg.width > 0 && this._exitButtonImg.height > 0);
            if (!isReadedExiyImg) {
                return false;
            }
        }

        if (TatsuPazzleGameP.useFrame) {
            let isReadedFrameImg = (this._frameImg.width > 0 && this._frameImg.height > 0);
            if (!isReadedFrameImg) {
                return false;
            }
        }

        if (TatsuPazzleGameP.useWinAnimation) {
            let isReadedAnimationImg = (this._animationImg.width > 0 && this._animationImg.height > 0);
            if (!isReadedAnimationImg) {
                return false;
            }
        }

        if (TatsuPazzleGameP.useStartFadeIn || TatsuPazzleGameP.useEndFadeOut) {
            let isReadedFadeSprite = (this._fadeSprite.width > 0 && this._fadeSprite.height > 0);
            if (!isReadedFadeSprite) {
                return false;
            }
        }
        return this.pazzleImageIsReady() && this._WindowExitMsg.isClosed();
    };

    Scene_PazzleGameScene.prototype.pazzleImageIsReady = function () {
        for (let i = 0; i < this._pictureImgList.length; i++) {
            let result = (this._pictureImgList[i] &&
                this._pictureImgList[i].bitmap &&
                this._pictureImgList[i].width > 0 &&
                this._pictureImgList[i].height > 0);

            if (!result) {
                return false;
            }
        }
        return true;
    };

    Scene_PazzleGameScene.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        let row = 0;
        let col = 0;
        let pictureWidth = this._pictureImgList[0].width;
        let pictureHeight = this._pictureImgList[0].height;
        let pieceWidthSize = Math.floor(pictureWidth / TatsuPazzleGameP.columnum);
        let pieceHeightSize = Math.floor(pictureHeight / TatsuPazzleGameP.rownum);

        for (let i = 0; i < this._pictureImgList.length; i++) {
            if (col >= TatsuPazzleGameP.columnum) {
                col = 0;
                row += 1;
            }
            this._pictureImgList[i].setFrame(
                col * pieceWidthSize,
                row * pieceHeightSize,
                pieceWidthSize,
                pieceHeightSize
            );

            this._pictureImgList[i].x = col * pieceWidthSize;
            this._pictureImgList[i].y = row * pieceHeightSize;
            this._pieceGroundImg.addChild(this._pictureImgList[i]);
            this._makePictureImgList.push(new PanelInfo(
                i,
                this._pictureImgList[i],
                i,
                pieceWidthSize,
                pieceHeightSize
            )
            );
            col += 1;
        }

        row = 0;
        col = 0;
        let indx = 0;
        while (this._randArray.length > 0) {
            if (col >= TatsuPazzleGameP.columnum) {
                col = 0;
                row += 1;
            }

            let ran = 0;
            let piece = null;
            if (TatsuPazzleGameP.columnum == 2 && TatsuPazzleGameP.rownum == 2) {
                switch (indx) {
                    case 0:
                        ran = 2;
                        break;
                    case 1:
                        ran = 0;
                        break;
                    case 2:
                        ran = 1;
                        break;
                }
                let tmpNum = this._randArray[ran];
                piece = this._makePictureImgList[tmpNum.num];
                piece.setNowPostion(indx);
                if (indx == 2) {
                    this._randArray.length = 0;
                }
            } else {
                // tatsunoko
                let tmpNum = this._randArray[0];
                piece = this._makePictureImgList[tmpNum.num];
                piece.setNowPostion(piece.getInitPosition());
                this._randArray.splice(0, 1);
            }

            let sprite = piece.getSprite();
            sprite.x = col * piece.getImgWidth();
            sprite.y = row * piece.getImgHeghit();
            col += 1;
            indx += 1;
        }



        if (TatsuPazzleGameP.useWinAnimation) {
            this._animationImg.y = (Graphics.height / 2) - (this._animationImg.height / 2);
        }

        if (TatsuPazzleGameP.useBGM) {
            $gameSystem.saveBgm();
            AudioManager.fadeOutBgm(1);
            if (TatsuPazzleGameP.backBGM != "" && TatsuPazzleGameP.backBGM != null) {
                AudioManager.playBgm({ "name": TatsuPazzleGameP.backBGM, "volume": 80, "pitch": 100, "pan": 0 });
            } else {
                alert("警告：BGMが設定されていません。\nBGMを使わない場合は、プラグインパラメータ「 専用BGMを使うかどうか」を「false」にしてください。");
            }
        }

        // tatsunoko
        // 並べ替え
        // 初期状態がクリアだった場合は、再度やり直す
        if (!(TatsuPazzleGameP.columnum == 2 && TatsuPazzleGameP.rownum == 2)) {
            const isClear = false;
            let movePos = ['up', 'down', 'left', 'right'];
            while (!isClear) {
                for (let i = 0; i < 4000; i++) {
                    let ran2 = Math.floor(Math.random() * movePos.length);
                    if (!this._moveFlag) {
                        this._moveFlag = true;
                        this.moveStartPiece(movePos[ran2]);
                    }
                }
                for (let i = 0; i < TatsuPazzleGameP.columnum; i++) {
                    if (!this._moveFlag) {
                        this._moveFlag = true;
                        this.moveStartPiece('up');
                    }
                }

                for (let i = 0; i < TatsuPazzleGameP.rownum; i++) {
                    if (!this._moveFlag) {
                        this._moveFlag = true;
                        this.moveStartPiece('left');
                    }
                }

                if (!this.checkClear()) {
                    break;
                }
            }
            this._moveFlag = false;

        }
    };

    Scene_PazzleGameScene.prototype.resetInitialize = function () {
        for (let i = 0; i < this._pictureImgList.length; i++) {
            this._pictureImgList[i] = null;

        }
        this._pictureImgList.length = 0;

        for (let i = 0; i < this._makePictureImgList.length; i++) {
            this._pieceGroundImg.removeChild(this._makePictureImgList[i].getSprite());
        }
        this._makePictureImgList.length = 0;
    };


    Scene_PazzleGameScene.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        switch (this._step) {
            case 'init':
                if (TatsuPazzleGameP.useStartFadeIn) {
                    if ((this._fadeSprite.opacity - 7) <= 0) {
                        this._fadeSprite.opacity = 0;
                    }

                    if (this._fadeSprite.opacity > 0) {
                        this._fadeSprite.opacity = this._fadeSprite.opacity - 7;
                    }

                    if (this._fadeSprite.opacity <= 0) {
                        this._step = 'start';
                    }

                } else {
                    this._step = 'start';
                }

                break;
            case 'start':
                if (!this._moveFlag) {
                    if (this.isClosedExitWindow()) {
                        if (Input.isTriggered('down')) {
                            this._moveFlag = true;
                            this.moveStartPiece('down');
                        } else if (Input.isTriggered('up')) {
                            this._moveFlag = true;
                            this.moveStartPiece('up');
                        } else if (Input.isTriggered('left')) {
                            this._moveFlag = true;
                            this.moveStartPiece('left');
                        } else if (Input.isTriggered('right')) {
                            this._moveFlag = true;
                            this.moveStartPiece('right');
                        } else if (TouchInput.isTriggered() && TatsuPazzleGameP.useMouse) {
                            this.touchinputMovePiece(TouchInput.x, TouchInput.y);
                        } else if (Input.isTriggered('cancel')) {
                            this.openConfirmExitWindow();
                        }
                    }
                }
                break;
            case 'lose':
                break;
            case 'clear':
                this.clearExec();
                break;
        }
    };

    Scene_PazzleGameScene.prototype.touchinputMovePiece = function (x, y) {
        let emptyIndex = this.getEmptyIndex();
        if (TatsuPazzleGameP.useExitButton && this._exitButtonImg.width > 0) {
            if (this._exitButtonImg.x <= x &&
                (this._exitButtonImg.x + this._exitButtonImg.width) >= x &&
                this._exitButtonImg.y <= y &&
                (this._exitButtonImg.y + this._exitButtonImg.height) >= y) {
                this.openConfirmExitWindow();
                return;
            }

        }

        for (let i = 0; i < this._makePictureImgList.length; i++) {
            let piece = this._makePictureImgList[i];
            let imgx = piece.getSprite().x;
            let imgwidth = piece.getImgWidth();
            let imgy = piece.getSprite().y;
            let imgheight = piece.getImgHeghit();

            if (imgx <= x &&
                (imgx + imgwidth) >= x &&
                imgy <= y &&
                (imgy + imgheight) >= y) {

                let piceInfo = this._makePictureImgList[i];
                if (emptyIndex != -1) {
                    if ((piece.getNowPostion() + TatsuPazzleGameP.columnum) == emptyIndex) {
                        this._moveFlag = true;
                        this.moveStartPiece('down');
                    } else if ((piece.getNowPostion() - TatsuPazzleGameP.columnum) == emptyIndex) {
                        this._moveFlag = true;
                        this.moveStartPiece('up');
                    } else if ((piece.getNowPostion() + 1) == emptyIndex &&
                        (Math.floor(piece.getNowPostion() / TatsuPazzleGameP.columnum) == (Math.floor(emptyIndex / TatsuPazzleGameP.columnum)))
                    ) {
                        this._moveFlag = true;
                        this.moveStartPiece('right');
                    } else if ((piece.getNowPostion() - 1) == emptyIndex &&
                        (Math.floor(piece.getNowPostion() / TatsuPazzleGameP.columnum) == (Math.floor(emptyIndex / TatsuPazzleGameP.columnum)))
                    ) {
                        this._moveFlag = true;
                        this.moveStartPiece('left');
                    }
                }
                break;
            }
        }
    };


    Scene_PazzleGameScene.prototype.getEmptyIndex = function () {
        for (let i = 0; i < this._mappingArea.length; i++) {
            if (this._mappingArea[i] == EMPTY_NUM) {
                return i;
            }
        }
        return -1;
    };

    Scene_PazzleGameScene.prototype.getTargetPiece = function (index) {
        for (let i = 0; i < this._makePictureImgList.length; i++) {
            if (this._makePictureImgList[i].getNowPostion() == index) {
                return this._makePictureImgList[i];
            }
        }
    };

    Scene_PazzleGameScene.prototype.checkClear = function () {
        for (let i = 0; i < this._makePictureImgList.length; i++) {
            if (this._makePictureImgList[i].getNowPostion() != this._makePictureImgList[i].getInitPosition()) {
                return false;
            }
        }
        return true;
    };

    Scene_PazzleGameScene.prototype.moveStartPiece = function (moveInd) {
        let targetIndex = 0;
        let emptyIndex = 0;
        let isNewLine = false;
        if (this._moveFlag && !this._moveStart) {
            for (let i = 0; i < this._mappingArea.length; i++) {
                if (this._mappingArea[i] == EMPTY_NUM) {
                    switch (moveInd) {
                        case 'down':
                            targetIndex = (i - TatsuPazzleGameP.columnum);
                            isNewLine = true;
                            break;
                        case 'up':
                            targetIndex = (i + TatsuPazzleGameP.columnum);
                            isNewLine = true;
                            break;
                        case 'right':
                            targetIndex = (i - 1);
                            isNewLine = (Math.floor(i / TatsuPazzleGameP.columnum) == (Math.floor(targetIndex / TatsuPazzleGameP.columnum)));
                            break;
                        case 'left':
                            targetIndex = (i + 1);
                            isNewLine = (Math.floor(i / TatsuPazzleGameP.columnum) == (Math.floor(targetIndex / TatsuPazzleGameP.columnum)));
                            break;

                    };
                    emptyIndex = i;
                    if (targetIndex >= 0 &&
                        targetIndex < this._mappingArea.length &&
                        isNewLine) {
                        this._mappingArea[targetIndex] = EMPTY_NUM;
                        this._mappingArea[emptyIndex] = 0;
                        this._moveStart = true;
                        this._moveTargetPiece = this.getTargetPiece(targetIndex);
                    }
                    break;
                }
            }
        }

        if (this._moveStart) {
            // tatsunoko
            if (this._step == 'start') {
                AudioManager.playSe({ "name": "slide", "volume": 100, "pitch": 100, "pan": 0 });
            }
            this._moveTargetPiece.setNowPostion(emptyIndex);
            let sprite = this._moveTargetPiece.getSprite();
            sprite.x = (emptyIndex % TatsuPazzleGameP.columnum) * this._moveTargetPiece.getImgWidth();
            sprite.y = (Math.floor(emptyIndex / TatsuPazzleGameP.columnum)) * this._moveTargetPiece.getImgHeghit();
            this._moveStart = false;
            if (this._step == 'start') {
                if (this.checkClear()) {
                    this._step = 'clear';
                }
            }
        }
        this._moveFlag = false;
    };

    Scene_PazzleGameScene.prototype.clearExec = function () {
        $gameSwitches.setValue(TatsuPazzleGameP.isClearNum, true);
        if (!TatsuPazzleGameP.useWinAnimation) {
            if (this.fadeoutExec()) {
                this.popScene();
            }
        }

        if (!this._clearAnimationStartFlag && TatsuPazzleGameP.useWinAnimation) {
            this._clearAnimationStartFlag = true;
            this._animationImg.x = (Graphics.width / 2) - (this._animationImg.width / 2);
            this._animationCnt = 0;
            if (TatsuPazzleGameP.useClearSe) {
                AudioManager.playSe({ "name": TatsuPazzleGameP.clearSe, "volume": 100, "pitch": 100, "pan": 0 });
            }
        }

        if (this._clearAnimationStartFlag) {
            if ((this._animationImg.opacity + 20) > 255) {
                this._animationImg.opacity = 255;
            }
            if (this._animationImg.opacity < 255) {
                this._animationImg.opacity = this._animationImg.opacity + 20;
            }
            if (this._animationImg.opacity == 255) {
                this._animationCnt++;
                if (TatsuPazzleGameP.useEndFadeOut) {

                } else {
                }
            }

            // アニメーション後のウェイト(アニメーション後のウェイトの時間を変更したい場合はここを修正)
            if (this._animationCnt > 90) {
                if (this.fadeoutExec()) {
                    AudioManager.stopSe();
                    this.popScene();
                }
            }
        }
    };

    Scene_PazzleGameScene.prototype.fadeoutExec = function () {
        if (!TatsuPazzleGameP.useEndFadeOut) {
            return true;
        }

        if ((this._fadeSprite.opacity + 7) > 255) {
            this._fadeSprite.opacity = 255;
        }

        if (this._fadeSprite.opacity < 255) {
            this._fadeSprite.opacity = this._fadeSprite.opacity + 7;
        }

        if (this._fadeSprite.opacity >= 255) {
            return true;
        }

        return false;
    };

    Scene_PazzleGameScene.prototype.isClosedExitWindow = function () {
        return this._WindowExitMsg.isClosed() && this._confirmMsgSelectWindow.isClosed();
    };

    Scene_PazzleGameScene.prototype.openConfirmExitWindow = function () {
        this._WindowExitMsg.open();
        this._confirmMsgSelectWindow.open();
        this._confirmMsgSelectWindow.activate();
        this._confirmMsgSelectWindow.opacity = 255;
    };

    Scene_PazzleGameScene.prototype.confirmExit = function () {
        let idx = this._confirmMsgSelectWindow.index();
        switch (idx) {
            case 0:
                this.popScene();
                break;
            case 1:
                this._confirmMsgSelectWindow.deactivate();
                this._WindowExitMsg.deactivate();
                this._confirmMsgSelectWindow.close();
                this._WindowExitMsg.close();
                break;
        };
    };



    Scene_PazzleGameScene.prototype.popScene = function () {
        if (TatsuPazzleGameP.useBGM) {
            AudioManager.fadeOutBgm(1);
            $gameSystem.replayBgm();
        }
        Scene_Base.prototype.popScene.call(this);
    };

    // ===========================================
    // プレイヤーが選択する「続行/やめる」の選択肢を表示させるウィンドウ
    // ===========================================
    function Window_continue_Select() {
        this.initialize.apply(this, arguments);
    };

    Window_continue_Select.prototype = Object.create(Window_Selectable.prototype);
    Window_continue_Select.prototype.constructor = Window_continue_Select;

    Window_continue_Select.prototype.initialize = function () {
        Window_Selectable.prototype.initialize.call(this, TatsuPazzleGameP.confirmWindowX,
            TatsuPazzleGameP.confirmWindowY,
            TatsuPazzleGameP.confirmWindowWidth,
            TatsuPazzleGameP.confirmWindowHeight);
        this._data = new Array();
        this._data.push('はい');
        this._data.push('いいえ');
        this.select(0);
        this.refresh();
    };

    Window_continue_Select.prototype.maxCols = function () {
        return 1;
    };

    Window_continue_Select.prototype.maxItems = function () {
        return 2;
    };

    Window_continue_Select.prototype.drawItem = function (index) {
        if (this._data) {
            let item = this._data[index];
            let rect = this.itemRect(index);
            this.drawText(item, rect.x, rect.y, this.width);
        }
    };


    Window_continue_Select.prototype.processTouch = function () {
        if (TatsuPazzleGameP.useMouse) {
            Window_Selectable.prototype.processTouch.call(this);
        }
    };


})();