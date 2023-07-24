//=============================================================================
// MessageSelectPicture.js
// ----------------------------------------------------------------------------
// (C) 2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.2.4 2020/07/12 1.2.3の対応で選択肢をイベントコマンドの上限を超えて指定すると正常に機能しない問題を修正
// 1.2.3 2020/07/12 MPP_ChoiceEX.jsと併用したとき、非表示の選択肢があると選択肢と表示ピクチャとがズレる競合を修正
// 1.2.2 2019/09/29 ピクチャ選択と無関係な選択肢を選択後に、ピクチャ選択肢のコマンドを実行すると
//                  以前に選択した選択肢の番号に対応するピクチャが一瞬表示される問題を修正
// 1.2.1 2019/04/07 1.2.0で選択肢のインデックスが1つずれていた問題を修正
// 1.2.0 2019/04/07 複数のピクチャを選択肢に関連づけられる機能を追加
// 1.1.1 2017/05/27 競合の可能性のある記述（Objectクラスへのプロパティ追加）をリファクタリング
// 1.1.0 2016/02/20 選択肢拡張プラグイン（MPP_ChoiceEX.js）に対応
// 1.0.2 2016/01/24 マウス操作でピクチャが更新されない問題を修正
// 1.0.1 2016/01/24 起動しないバグ修正(笑)
// 1.0.0 2016/01/23 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 選択肢のピクチャ表示プラグイン
 * @author トリアコンタン
 *
 * @help イベントコマンド「選択肢の表示」で選択肢にカーソルを合わせた際に
 * 選択肢に対応するピクチャを表示するようにします。
 *
 * あらかじめ不透明度0でピクチャを表示したうえで
 * プラグインコマンドを実行して、関連づけを指定してください。
 *
 * 選択肢を決定後、プラグイン側でピクチャを非表示にすることはないので
 * 自由にイベントコマンドで操作してください。
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （パラメータの間は半角スペースで区切る）
 *
 * 選択肢ピクチャ設定 or
 * MSP_SET [ピクチャ番号] [選択肢#(1-6)]
 * 　選択肢の番号と表示するピクチャ番号とを関連づけます。
 * 　関連づけは、選択肢を決定した時点で解除されます。
 * 　複数のピクチャを選択肢に関連づけたい場合は、その分コマンドを実行してください。
 *
 * 例：選択肢ピクチャ設定 1 1
 *
 * MPP_ChoiceEX.jsと併用する場合、このプラグインを下に配置してください。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function () {
    'use strict';

    var getArgNumber = function (arg, min, max) {
        if (arguments.length <= 2) min = -Infinity;
        if (arguments.length <= 3) max = Infinity;
        return (parseInt(convertEscapeCharacters(arg), 10) || 0).clamp(min, max);
    };

    var convertEscapeCharacters = function (text) {
        if (text == null) text = '';
        var win = SceneManager._scene._windowLayer.children[0];
        return win ? win.convertEscapeCharacters(text) : text;
    };

    var getCommandName = function (command) {
        return (command || '').toUpperCase();
    };

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        this.pluginCommandMessageSelectPicture(command, args);
    };

    Game_Interpreter.prototype.pluginCommandMessageSelectPicture = function (command, args) {
        switch (getCommandName(command)) {
            case '選択肢ピクチャ設定':
            case 'MSP_SET':
                var index = getArgNumber(args[1], 1) - 1;
                var pictureId = getArgNumber(args[0], 1, $gameScreen.maxPictures());
                $gameMessage.setSelectPictureId(index, pictureId);
                break;
            // tatsunoko
            case 'MSP_SET_DOBBY':
                let swittchods = null;
                switch (args[0]) {
                    case "クレア":
                        swittchods = [3801, 3802, 3803, 3804, 3805, 3806, 3807, 3808, 3809, 3810, 3811, 3812, 3813, 3814, 3815, 3816, 3817, 3818, 3819, 3820, 3821, 3822, 3823, 3824, 3825];
                        break;
                    case "ノラ":
                        swittchods = [3849, 3850, 3851, 3852, 3853, 3854, 3855, 3856, 3857, 3858, 3859, 3860, 3861, 3862, 3863, 3864, 3865, 3866, 3867, 3868, 3869, 3870];
                        break;
                    case "リルム":
                        swittchods = [3826, 3827, 3828, 3829, 3830, 3831, 3832, 3833, 3834, 3835, 3836, 3837, 3838, 3839, 3840, 3841, 3842, 3843, 3844, 3845, 3846, 3847];
                        break;
                    case "ソフィア":
                        swittchods = [3872, 3873, 3874, 3875, 3876, 3877, 3878, 3879, 3880, 3881, 3882, 3883, 3884, 3885, 3886, 3887, 3888, 3889, 3890, 3891, 3892, 3893, 3894, 3895];
                        break;
                    case "その他":
                        swittchods = [3871, 3896, 3897, 3898, 3899, 3900, 3901, 3902, 3903, 3904, 3905, 3906, 3848, 3301, 3302, 3303, 3304, 3305, 3306, 3307, 3308, 3309, 3310, 3311, 3312, 3315, 3317, 3318];
                        break;
                }
                let j = 0;
                let exists = false;
                for (let i = 0; i < swittchods.length; i++) {
                    // console.log(swittchods[i], $gameSwitches.value(Number(swittchods[i])));
                    if ($gameSwitches.value(Number(swittchods[i]))) {
                        var pictureId = getArgNumber(String(i + 1), 1, $gameScreen.maxPictures());
                        $gameMessage.setSelectPictureId(j, pictureId);
                        j = j + 1;
                        exists = true;
                    } else {
                        var pictureId = getArgNumber(String(i + 1), 1, $gameScreen.maxPictures());
                        $gameScreen.showPicture(pictureId, "recollectionBackImg", 0, 0, 0, 100, 100, 0, 0);
                        $gameMessage.setSelectPictureId(j, pictureId);
                        j = j + 1;
                        exists = true;
                    }
                }
                $gameMessage.setSelectPictureId(j, 99);
                break;
        }
    };

    var _Game_Message_initialize = Game_Message.prototype.initialize;
    Game_Message.prototype.initialize = function () {
        _Game_Message_initialize.apply(this, arguments);
        this.clearSelectPictures();
    };

    Game_Message.prototype.setSelectPictureId = function (index, pictureId) {
        this._selectPictures.push({ index: index, pictureId: pictureId });
    };

    Game_Message.prototype.clearSelectPictures = function () {
        this._selectPictures = [];
    };

    Game_Message.prototype.getSelectPictures = function () {
        return this._selectPictures;
    };

    var _Game_Message_onChoice = Game_Message.prototype.onChoice;
    Game_Message.prototype.onChoice = function (n) {
        _Game_Message_onChoice.apply(this, arguments);
        this.clearSelectPictures();
    };

    Game_Picture.prototype.setOpacity = function (value) {
        this._opacity = value;
    };

    var _Window_ChoiceList_update = Window_ChoiceList.prototype.update;
    Window_ChoiceList.prototype.update = function () {
        _Window_ChoiceList_update.apply(this, arguments);
        if (this.isOpen()) {
            this.updateSelectPicture();
        }
    };

    Window_ChoiceList.prototype.updateSelectPicture = function () {
        $gameMessage.getSelectPictures().forEach(function (data) {
            var picture = $gameScreen.picture(data.pictureId);
            if (!picture) {
                return;
            }
            picture.setOpacity(data.index === this.findMessageIndex() ? 255 : 0);
        }, this);
    };

    // for MPP_ChoiceEX.js start
    Window_ChoiceList.prototype.findMessageIndex = function () {
        var index = this.index();
        if ($gameMessage.hiddenIndexList) {
            $gameMessage.hiddenIndexList.forEach(function (hidden, i) {
                if (hidden && index >= i) {
                    index++;
                }
            });
        }
        return index;
    };

    var _Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
    Game_Interpreter.prototype.setupChoices = function (params) {
        if (this.addChoices) {
            $gameMessage.hiddenIndexList = [];
        }
        _Game_Interpreter_setupChoices.apply(this, arguments);
    };

    var _Game_Interpreter_addChoices = Game_Interpreter.prototype.addChoices;
    Game_Interpreter.prototype.addChoices = function (params, i, data, d) {
        var regIf = /\s*if\((.+?)\)/;
        var hiddenIndexList = $gameMessage.hiddenIndexList;
        for (var n = 0; n < params[0].length; n++) {
            var str = params[0][n];
            if (regIf.test(str)) {
                str = str.replace(regIf, '');
                hiddenIndexList.push(RegExp.$1 && !this.evalChoice(RegExp.$1));
            } else {
                hiddenIndexList.push(false);
            }
        }
        return _Game_Interpreter_addChoices.apply(this, arguments);
    }
    // for MPP_ChoiceEX.js end
})();
