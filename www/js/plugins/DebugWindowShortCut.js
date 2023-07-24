/*---------------------------------------------------------------------------*
 * 2018/07/04 kido
 * https://kido0617.github.io/
 * Ver.1.1
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc デバッグウィンドウにショートカットキーを追加するプラグイン
 * @author kido
 * @help
 * 以下を参照
 * https://kido0617.github.io/rpgmaker/2018-07-04-debug-shortcut/
 * 
*/


(function () {

    Scene_Debug.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);

        Input.keyMapper[83] = 'S';
        Input.keyMapper[86] = 'V';
        Input.keyMapper[8] = 'BackSpace';
        for (var i = 0; i <= 9; i++) {
            Input.keyMapper[48 + i] = String(i);
        }

        Input.keyMapper[111] = 'S';
        Input.keyMapper[106] = 'V';
        for (var i = 0; i <= 9; i++) {
            Input.keyMapper[96 + i] = String(i);
        }

    };

    Scene_Debug.prototype.popScene = function () {
        Input.keyMapper = {
            9: 'tab',       // tab
            13: 'ok',       // enter
            16: 'shift',    // shift
            17: 'control',  // control
            // 18: 'control',  // alt
            27: 'escape',   // escape
            32: 'ok',       // space
            33: 'pageup',   // pageup
            34: 'pagedown', // pagedown
            37: 'left',     // left arrow
            38: 'up',       // up arrow
            39: 'right',    // right arrow
            40: 'down',     // down arrow
            45: 'escape',   // insert
            81: 'pageup',   // Q
            87: 'pagedown', // W
            88: 'escape',   // X
            90: 'ok',       // Z
            96: 'escape',   // numpad 0
            98: 'down',     // numpad 2
            100: 'left',    // numpad 4
            102: 'right',   // numpad 6
            104: 'up',      // numpad 8
            120: 'debug'    // F9
        };
        SceneManager.pop();
    };




    Scene_Debug.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        if (Input.isTriggered('S')) {
            this.shortCutType = 'S';
            this.strNum = "";
            this.jump();
        } else if (Input.isTriggered('V')) {
            this.shortCutType = 'V';
            this.strNum = "";
            this.jump();
        } else if (Input.isTriggered('BackSpace')) {
            if (this.strNum && this.strNum.length > 0) this.strNum = this.strNum.substr(0, this.strNum.length - 1);
            this.jump();
        }
        for (var i = 0; i <= 9; i++) {
            if (Input.isTriggered(String(i))) {
                if (this.strNum == "" && i == 0) return;
                "いきなり0は無し"
                this.strNum += String(i);
                this.jump();
            }
        }
    };

    Scene_Debug.prototype.jump = function () {
        if (!this.shortCutType) return;
        var rangeIndex = this.shortCutType == 'S' ? 0 : this._rangeWindow._maxSwitches;
        if (this.strNum != '') {
            var num = parseInt(this.strNum);
            if ((this.shortCutType == 'S' && num > $dataSystem.switches.length - 1) ||
                (this.shortCutType == 'V' && num > $dataSystem.variables.length - 1)) {
                SoundManager.playBuzzer();
                //最大超えたら最大値にしておく
                num = this.shortCutType == 'S' ? $dataSystem.switches.length - 1 : $dataSystem.variables.length - 1;
            }
            rangeIndex += Math.floor((num - 1) / 10);
            this._rangeWindow.select(rangeIndex);
            this._rangeWindow.deactivate();
            this._editWindow.activate();
            this._editWindow.select((num - 1) % 10);
        } else {
            this._rangeWindow.select(rangeIndex);
            this._rangeWindow.activate();
            this._editWindow.deactivate();
        }
        this.refreshHelpWindow();
    }

    var refreshHelpWindow = Scene_Debug.prototype.refreshHelpWindow;
    Scene_Debug.prototype.refreshHelpWindow = function () {
        refreshHelpWindow.call(this);
        var str = this.shortCutType + this.strNum;
        this._debugHelpWindow.drawTextEx(str, 450, this._debugHelpWindow.lineHeight() * 4);
    };

    //===================================================================
    // テンキー0の仕様
    //===================================================================

    /**
     * Checks whether a key is currently pressed down.
     *
     * @static
     * @method isPressed
     * @param {String} keyName The mapped name of the key
     * @return {Boolean} True if the key is pressed
     */
    Input.isPressed = function (keyName) {
        // if (SceneManager._scene !== null &&
        //     SceneManager._scene.constructor.name === "Scene_Debug") {
        //     if (this._isEscapeCompatible(keyName) && this.isPressed('escape')) {
        //         return true;
        //     } else {
        //         return !!this._currentState[keyName];
        //     }
        // }
        if (this._isEscapeCompatible(keyName) && (this.isPressed('escape') || this.isPressed('0'))) {
            return true;
        } else {
            return !!this._currentState[keyName];
        }
    };

    /**
     * Checks whether a key is just pressed.
     *
     * @static
     * @method isTriggered
     * @param {String} keyName The mapped name of the key
     * @return {Boolean} True if the key is triggered
     */
    Input.isTriggered = function (keyName) {
        // if (SceneManager._scene !== null &&
        //     SceneManager._scene.constructor.name === "Scene_Debug") {
        //     if (this._isEscapeCompatible(keyName) && this.isTriggered('escape')) {
        //         return true;
        //     } else {
        //         return this._latestButton === keyName && this._pressedTime === 0;
        //     }
        // }
        if (this._isEscapeCompatible(keyName) && (this.isTriggered('escape') || this.isTriggered('0'))) {
            return true;
        } else {
            return this._latestButton === keyName && this._pressedTime === 0;
        }
    };

    // /**
    //  * Checks whether a key is just pressed or a key repeat occurred.
    //  *
    //  * @static
    //  * @method isRepeated
    //  * @param {String} keyName The mapped name of the key
    //  * @return {Boolean} True if the key is repeated
    //  */
    // Input.isRepeated = function(keyName) {
    //     // if (SceneManager._scene.constructor.name === "Scene_Debug") {
    //     //     if (this._isEscapeCompatible(keyName) && this.isRepeated('escape') ) {
    //     //         return true;
    //     //     } else {
    //     //         return (this._latestButton === keyName &&
    //     //             (this._pressedTime === 0 ||
    //     //                 (this._pressedTime >= this.keyRepeatWait &&
    //     //                     this._pressedTime % this.keyRepeatInterval === 0)));
    //     //     }
    //     // }
    //     if (this._isEscapeCompatible(keyName) && (this.isRepeated('escape') || this.isRepeated('0'))) {
    //         return true;
    //     } else {
    //         return (this._latestButton === keyName &&
    //             (this._pressedTime === 0 ||
    //                 (this._pressedTime >= this.keyRepeatWait &&
    //                     this._pressedTime % this.keyRepeatInterval === 0)));
    //     }
    // };
    //
    // /**
    //  * Checks whether a key is kept depressed.
    //  *
    //  * @static
    //  * @method isLongPressed
    //  * @param {String} keyName The mapped name of the key
    //  * @return {Boolean} True if the key is long-pressed
    //  */
    // Input.isLongPressed = function(keyName) {
    //     // if (SceneManager._scene.constructor.name === "Scene_Debug") {
    //     //     if (this._isEscapeCompatible(keyName) && this.isLongPressed('escape')) {
    //     //         return true;
    //     //     } else {
    //     //         return (this._latestButton === keyName &&
    //     //             this._pressedTime >= this.keyRepeatWait);
    //     //     }
    //     // }
    //     if (this._isEscapeCompatible(keyName) && (this.isLongPressed('escape') || this.isLongPressed('0'))) {
    //         return true;
    //     } else {
    //         return (this._latestButton === keyName &&
    //             this._pressedTime >= this.keyRepeatWait);
    //     }
    // };
})();