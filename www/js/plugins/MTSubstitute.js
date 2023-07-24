//=============================================================================
// MTSubstitute.js
// 文章の表示を別の文字に置きかえるプラグイン
// ----------------------------------------------------------------------------
// (C) 2019 Moooty
// This plugin include functions (C) 2015 Triacontane (MIT License)
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
 * @plugindesc Substitute characters for 'show Text'
 * @author Moooty
 * 
 * @param originalChars
 * @desc Characters before substitute.
 * @type string
 * @default abcdefghijklmnopqrstuvwxyz
 * 
 * @param substituteChars
 * @desc Characters substituted.
 * @type string
 * 
 * @param isSubstituteControlChars
 * @desc Flag control characters substitute.(default：true)
 * @type boolean
 * @default true
 * 
 * @param substituteColorIndex
 * @desc Color index substituted character.(default：16)
 * @type number
 * @default 16
 * 
 * @param resubstituteColorIndex
 * @desc Color index resubstitute character.(default：2)
 * @type number
 * @default 2
 * 
 * @param prefix 
 * @desc Sentence prefix apply this plugin.(default：[MTS])
 * @type string
 * @default [MTS]
 *
 * @help
 * === Description ===
 * Substitute characters for event commands 'Show Text' and 'Show Scrolling Text'.
 * 
 * Plugin Commands: 
 * MTSubstitute replace 'a'  // Resubstitute 'a' to original character.
 * MTSubstitute replaceAll   // Resubstitute all character to original character.
 * MTSubstitute reset        // Clear resubstitute character.
 *
 * === Change Log ===
 * Mar 31, 2019 ver1.00 initial release
 * 
 * === Manual & License(Japanese) ===
 * https://www.5ing-myway.com/rpgmaker-plugin-mtsubstitute/
 */

/*:ja
 * @plugindesc 文章の表示を別の文字に置きかえるプラグイン
 * @author むーてぃ
 * 
 * @param originalChars
 * @desc 置換前の文字列
 * @type string
 * @default あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょ
 * 
 * @param substituteChars
 * @desc 置換後の文字列
 * @type string
 * 
 * @param isSubstituteControlChars
 * @desc 制御文字を展開して置きかえるか(デフォルト：true)
 * @type boolean
 * @default true
 * 
 * @param substituteColorIndex
 * @desc 置換した文字色のインデックス(デフォルト：16)
 * @type number
 * @default 16
 * 
 * @param resubstituteColorIndex
 * @desc 再置換した文字色のインデックス(デフォルト：2)
 * @type number
 * @default 2
 * 
 * @param prefix 
 * @desc プラグインを適用する文章につける接頭辞(デフォルト：[MTS])
 * @type string
 * @default [MTS]
 *
 * @help
 * === 説明 ===
 * メッセージの表示で表示される文字を別の文字に置きかえるプラグインです。
 * 自作ゲームで使う独自言語などを設定できます。
 * 
 * プラグインコマンド: 
 * MTSubstitute replace 'あ' // 置換する元の文字が「あ」の場合、元の文字に再置換するようにします。
 * MTSubstitute replaceAll   // すべての文字を再置換するようにします。
 * MTSubstitute reset        // 再置換文字をすべてクリアします。
 *
 * === 更新履歴 ===
 * 2019/3/31 ver1.00 初版
 * 
 * === マニュアル＆ライセンス ===
 * https://www.5ing-myway.com/rpgmaker-plugin-mtsubstitute/
 * 
 */


// 自作オブジェクトのコンストラクタ
function Game_MTSubstitute() {
    this.initialize.apply(this, arguments);
}


(function () {
    'use strict';

    // 定数の定義
    const PLUGIN_NAME = "MTSubstitute";
    const NO_DATA = -1;

    // ---------- プラグインコマンドの定義 ここから ----------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === PLUGIN_NAME) {
            switch (args[0]) {
                case 'replace':
                    $gameSystem.MTSubstitute().addReSubstituteChar(args[1]);
                    break;
                case 'replaceAll':
                    $gameSystem.MTSubstitute().completeReSubstituteChar();
                    break;
                case 'reset':
                    $gameSystem.MTSubstitute().resetReSubstituteChars();
                    break;
            }
        }
    };
    // ---------- プラグインコマンドの定義 ここまで ----------


    // ---------- Game_System ここから ----------
    // 再置換する文字をセーブデータに保存する必要があるので、
    // Game_Systemにオブジェクトを追加しておく
    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_initialize.call(this);
        this._MTSubstitute = new Game_MTSubstitute();
    };

    Game_System.prototype.MTSubstitute = function () {
        return this._MTSubstitute;
    };
    // ---------- Game_System ここまで ----------


    // ---------- Game_MTSubstitute ここから ----------
    Game_MTSubstitute.prototype = Object.create(Game_MTSubstitute.prototype);
    Game_MTSubstitute.prototype.costructor = Game_MTSubstitute;

    Game_MTSubstitute.prototype.initialize = function () {
        this._mode = null;
        this._from = getParamString('originalChars');
        this._to = getParamString('substituteChars');
        this._reSubstitute = '';
        this._isSubstituteControlChars = getParamBoolean('isSubstituteControlChars');
        this._substituteColorIndex = getParamNumber('substituteColorIndex');
        this._reSubstituteColorIndex = getParamNumber('resubstituteColorIndex');
        this._prefix = getParamString('prefix');
    };


    // 再置換文字を追加
    Game_MTSubstitute.prototype.addReSubstituteChar = function (char) {
        this._reSubstitute += char;
    };

    // すべての文字を再置換するようにする
    Game_MTSubstitute.prototype.completeReSubstituteChar = function () {
        this._reSubstitute = this._from;
    };

    // 再置換文字のリセット
    Game_MTSubstitute.prototype.resetReSubstituteChars = function () {
        this._reSubstitute = '';
    };

    // 文字置換の処理
    Game_MTSubstitute.prototype.substitute = function (text) {
        // prefixを取りのぞく
        text = text.substring(this._prefix.length);

        if (this._isSubstituteControlChars) {
            this._mode = new ExpandControlChar(text);
        } else {
            this._mode = new UnExpandControlChar(text);
        }

        text = this._mode.getText();

        var result = '';
        // 制御文字を見つけやすくするために逆順でループ
        for (var i = text.length - 1; i >= 0; i--) {
            var originalChar = this.getOriginalChar(text.substring(0, i + 1), this._mode.getEscapeChar());
            var substitutedChar;

            // 置換処理
            if (originalChar.length === 1 || '\\\\') {
                // 置換後の文字を色変更の制御文字をつけて取得
                substitutedChar = this.getSubstitutedChar(originalChar);

                // 再置換文字にあれば再置換色の制御文字をつけて元の文字に戻す        
                var indexReSubstitute = this._reSubstitute.indexOf(originalChar, 0);
                if (indexReSubstitute !== NO_DATA) {
                    substitutedChar = this.setColorReSubstitute(originalChar);
                }
            } else {
                //制御文字の場合は置換しない
                substitutedChar = originalChar;
            }

            // 現在の文字位置を調整
            i -= originalChar.length - 1;


            result = substitutedChar + result;
        }

        return result;
    };


    // 接頭辞があるかチェック
    Game_MTSubstitute.prototype.hasPrefix = function (text) {
        text = String(text || '');
        if (text.length < this._prefix.length) {
            return false;
        }

        if (text.substring(0, this._prefix.length) !== this._prefix) {
            return false;
        }

        return true;

    };

    // 置換前の文字を取得
    // 制御文字の場合     :エスケープ文字〜末尾まで
    // 制御文字以外の場合 :末尾の1文字
    Game_MTSubstitute.prototype.getOriginalChar = function (text, escapeChar) {
        var result;
        if (isControlChar(text, escapeChar)) {
            result = getControlChar(text, escapeChar);
        } else {
            result = text.charAt(text.length - 1);
        }

        return result;
    };

    // 置きかえる文字を取得
    // Fromに文字があった場合   : 置換後の文字(色変更制御文字つき)
    // Fromに文字がなかった場合 : 元の文字(ただし\の場合は\\にする)
    Game_MTSubstitute.prototype.getSubstitutedChar = function (char) {
        var searchChar = char;
        if (searchChar === '\\\\') {
            searchChar = '\\';
        }
        var result = char;
        var indexFrom = this._from.indexOf(searchChar, 0);

        if (indexFrom !== NO_DATA) {
            var findChar = this._to.charAt(indexFrom);
            if (findChar === '\\') {
                findChar = '\\\\';
            }
            result = this.setColorSubstitute(findChar);
        }

        // 置換対象が\で置換文字に設定されていない場合
        if (result === "\\") {
            result = '\\\\';
        }

        return result;

    };

    // 置換する文字色の設定
    Game_MTSubstitute.prototype.setColorSubstitute = function (char) {
        return "\\C[" + this._substituteColorIndex + "]" + char + "\\C[0]";
    };

    // 再置換する文字色の設定
    Game_MTSubstitute.prototype.setColorReSubstitute = function (char) {
        return "\\C[" + this._reSubstituteColorIndex + "]" + char + "\\C[0]";
    };
    // ---------- Game_MTSubstitute ここまで ----------    


    //制御文字の処理モードのスーパークラス
    // ---------- MTSubstituteMethod ここから ----------    
    function MTSubstituteMethod() {
        throw new Error('This is a static class');
    }

    MTSubstituteMethod.prototype = Object.create(MTSubstituteMethod.prototype);
    MTSubstituteMethod.constructor = MTSubstituteMethod;

    MTSubstituteMethod.prototype.initialize = function () {
    };

    MTSubstituteMethod.prototype.getText = function () {
        return this._text;
    };

    MTSubstituteMethod.prototype.getEscapeChar = function () {
        return this._escapeChar;
    };
    // ---------- MTSubstituteMethod ここまで ----------


    // 制御文字を展開するモード
    // ---------- ExpandControlChar ここから ----------
    function ExpandControlChar() {
        this.initialize.apply(this, arguments);
    }

    ExpandControlChar.prototype = Object.create(MTSubstituteMethod.prototype);
    ExpandControlChar.prototype.costructor = ExpandControlChar;

    ExpandControlChar.prototype.initialize = function (text) {
        this._text = convertEscapeCharacters(text);
        this._escapeChar = '\x1b';
    };
    // ---------- ExpandControlChar ここまで ----------


    // 制御文字を展開しないモード    
    // ---------- UnExpandControlChar ここから ----------
    function UnExpandControlChar() {
        this.initialize.apply(this, arguments);
    }

    UnExpandControlChar.prototype = Object.create(MTSubstituteMethod.prototype);
    UnExpandControlChar.prototype.costructor = UnExpandControlChar;

    UnExpandControlChar.prototype.initialize = function (text) {
        this._text = text;
        this._escapeChar = '\\';
    };
    // ---------- UnExpandControlChar ここまで ----------


    // =============================================
    // 内部スクリプトのオーバーライド
    // =============================================
    // Game_Message(rpg_objects.js)
    var _Game_Message_add = Game_Message.prototype.add;
    Game_Message.prototype.add = function (text) {
        if ($gameSystem.MTSubstitute().hasPrefix(text)) {
            this._texts.push($gameSystem.MTSubstitute().substitute(text));
        } else {
            _Game_Message_add.call(this, text);
        }
    };


    // =============================================
    // 制御文字チェック関数
    // =============================================
    // 制御文字に使われる特殊記号かチェック
    function isSpecialChar(char) {
        // 以下の文字は特殊記号
        // ] G { } $ . | ! > < ^ \
        var pattern = /[\]G\{\}\$\.\|\!><\^\\]/;

        return pattern.test(char);
    }

    // 制御文字かチェック
    function isControlChar(text, escapeChar) {
        var lastChar = text.charAt(text.length - 1);
        var result = isSpecialChar(lastChar);

        var indexEscapeChar = getControlCharStartPosition(text, escapeChar);

        if (indexEscapeChar === NO_DATA) {
            result = false;
        }

        if (indexEscapeChar > 0 && text.charAt(indexEscapeChar - 1) === escapeChar) {
            result = false;
        }

        // 特殊文字が ] 以外の場合、エスケープ文字〜現在位置までの間に
        // ほかの特殊文字がないかチェック
        // ほかの特殊文字があった場合は制御文字ではないと判定する
        if (lastChar !== ']') {
            for (var i = indexEscapeChar + 1; i < text.length - 1; i++) {
                if (isSpecialChar(text.charAt(i))) {
                    result = false;
                    break;
                }
            }
        }

        return result;
    }

    // 制御文字を取得
    function getControlChar(text, escapeChar) {
        // エスケープ文字〜末尾までを制御文字とする
        var indexEscapeChar = getControlCharStartPosition(text, escapeChar);
        var result = text.substring(indexEscapeChar);

        return result;
    }

    // 制御文字の開始位置を調べる(制御文字の入れ子対応版)
    // <戻り値>
    // エスケープ文字がある場合: エスケープ文字のインデックス番号
    // エスケープ文字がない場合: -1
    function getControlCharStartPosition(text, escape_char) {
        var lastIndex = text.length - 1;

        // 基本はエスケープ文字のある位置
        var indexEscapeChar = text.lastIndexOf(escape_char, lastIndex - 1);

        // 制御文字が]の場合は最初のエスケープ文字までの]の数を数える
        // (制御文字の入れ子対策)
        if (text.charAt(lastIndex) === "]") {
            var str = text.substring(indexEscapeChar);
            var count = str.split(']').length - 1;

            // 後ろからcount-1番めのエスケープ文字の位置を調べる
            for (var i = 0; i < count - 1; i++) {
                indexEscapeChar = text.lastIndexOf(escape_char, indexEscapeChar - 1);
            }
        }

        return indexEscapeChar;

    }


    // ==============================================
    // ここから先はトリアコンタン様のプラグインから拝借
    // (C) 2015 Triacontane (MIT License)
    // http://opensource.org/licenses/mit-license.php
    // ==============================================
    // プラグインパラメータ取得用関数
    function getParamString(paramNames) {
        var value = getParamOther(paramNames);
        return value === null ? '' : value;
    }

    function getParamNumber(paramNames, min, max) {
        var value = getParamOther(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value, 10) || 0).clamp(min, max);
    }

    function getParamOther(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(PLUGIN_NAME)[paramNames[i]];
            if (name) return name;
        }
        return null;
    }

    function getParamBoolean(paramNames) {
        var value = (getParamOther(paramNames) || '').toUpperCase();
        return value === 'ON' || value === 'TRUE';
    }

    // 制御文字の変換処理呼び出し
    function convertEscapeCharacters(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    }
})();
