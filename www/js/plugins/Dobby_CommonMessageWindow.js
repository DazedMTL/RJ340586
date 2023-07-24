//=============================================================================
// Dobbi_CommonMessageWindow.js
// 内容：動的に動く共通メッセージウィンドウ
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc 警告メッセージ用顧問ウィンドウ
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

    const ANIMATION_TIMER = 120;
    var _inputTxt = "";
    var _pluginCommandFlag = false;

    var pluginName = "dobby_dispmessage";
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            switch (args[0]) {
                case 'show':
                    _pluginCommandFlag = true;
                    // _inputTxt = args[1];
                    var cnt = $gameVariables.value(50);
                    $gameVariables.setValue(50, cnt + 1);
                    var sprite = new Sprite();
                    mainExec(args[1], cnt, sprite);

                    break;
            }
        }
    };

    function mainExec(str, cnt, sprite) {
        var execFlag = false;
        var execMethod = function () {
            var commonMessage = new Window_Common_Dinamic_Window(sprite);
            SceneManager._scene.addChild(sprite);
            commonMessage.drawMessageTxt("test");
            commonMessage.setThisWindow(commonMessage);
            commonMessage.startAnimation(SceneManager._scene);
        }
        setTimeout(execMethod, (cnt * 500));
    };
})();



function Window_Common_Dinamic_Window() {
    this.initialize.apply(this, arguments);
};

Window_Common_Dinamic_Window.prototype = Object.create(Window_Base.prototype);
Window_Common_Dinamic_Window.prototype.constructor = Window_Common_Dinamic_Window;

Window_Common_Dinamic_Window.prototype.initialize = function (sprite) {
    var graphicHalf = Math.floor(Graphics.width / 2);
    var graphicHalfAndMax = Graphics.width - graphicHalf;
    var objHeight = 100;
    Window_Base.prototype.initialize.call(this, 0, 0, 300, 100);
    //this.opacity = 0;
    this.deactivate();
    this._sprite = sprite;
    this._width = graphicHalf;
    this._height = objHeight;
    this._animationFlag = false;
    this._animationCnt = 0;
    this._animationStopCnt = 0;
    this._animationPos = 1;
};

Window_Common_Dinamic_Window.prototype.setThisWindow = function (window) {
    this._window = window
};

Window_Common_Dinamic_Window.prototype.drawMessageTxt = function (txt) {
    this.drawText(txt, 0, 0, this._width, this._height);
};

Window_Common_Dinamic_Window.prototype.setAnimationFlag = function (flag) {
    this._animationFlag = flag;
};

Window_Common_Dinamic_Window.prototype.startAnimation = function (sceneObj) {
    this.addWindowByScene(sceneObj);
    this._animationFlag = true;
    this._animationCnt = 0;
    this._animationPos = 1;
};

Window_Common_Dinamic_Window.prototype.addWindowByScene = function (sceneObj) {
    this._sceneObj = sceneObj;
    this._sceneObj.addWindow(this);
};

Window_Common_Dinamic_Window.prototype.removeWindowByScene = function () {
    this._sceneObj._windowLayer.removeChild(this);
    this._sceneObj.removeChild(this._sprite);
    this._sprite = null;
    this._window = null;
};

Window_Common_Dinamic_Window.prototype.endAnimation = function () {
    this._animationFlag = false;
    this._animationCnt = 0;
};

Window_Common_Dinamic_Window.prototype.pauseAnimation = function () {
    this._animationPos = 2;
};

Window_Common_Dinamic_Window.prototype.restartAnimation = function () {
    this._animationPos = 3;
};

Window_Common_Dinamic_Window.prototype.stopAnimation = function () {
    this._animationPos = 4;
};

Window_Common_Dinamic_Window.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (this._animationFlag) {
        switch (this._animationPos) {
            case 1:
                this.animationWindow();
                if (this.y >= Graphics._height / 2) {
                    this.pauseAnimation();
                }
                break;
            case 2:
                this._animationCnt++;
                if (this._animationCnt >= 60) {
                    this._animationCnt = 0;
                    this.restartAnimation();
                }
                break;
            case 3:
                this.animationWindow();
                if (this.y >= Graphics._height) {
                    this.stopAnimation();
                }
                break;
            case 4:
                this.moveAfter();
                break;
        }
    }
};

Window_Common_Dinamic_Window.prototype.animationWindow = function () {
    this.y = this.y + 10;
    this._sprite.y = this._sprite.y + 10;
};

Window_Common_Dinamic_Window.prototype.moveAfter = function () {
    this.y = 0;
    this._sprite.y = 0;
    this.removeWindowByScene();
    var cnt = $gameVariables.value(50);
    if (cnt > 0) {
        $gameVariables.setValue(50, cnt - 1);
    }
};

function D_Window_Common_Alert_Window() {
    this.initialize.apply(this, arguments);
};

D_Window_Common_Alert_Window.prototype = Object.create(Window_Base.prototype);
D_Window_Common_Alert_Window.prototype.constructor = D_Window_Common_Alert_Window;

D_Window_Common_Alert_Window.prototype.initialize = function (width, height, sceneObj) {
    // 引数使わない
    // var widthHalf = width/2;
    // var heightHalf = height/2;
    var widthHalf = 570 / 2;
    var heightHalf = 104 / 2;
    this._sceneObj = sceneObj;
    this._sprite = new Sprite(ImageManager.loadBitmap('img/system/', "Layout_Help", null, true));
    //Window_Base.prototype.initialize.call(this, (Graphics.width/2)-widthHalf, (Graphics/height/2) -heightHalf ,width, height);
    Window_Base.prototype.initialize.call(this, (Graphics.width / 2) - widthHalf, 30, 570, 80);
    this._sprite.x = (Graphics.width / 2) - widthHalf;
    this._sprite.y = 30;
    this.deactivate();
    this._thisWindow = null;
    this._animationCnt = 0;
    this._spriteOpacityCnt = 0;
    this._windowOpacityCnt = 0;
    this._animationFlag = false;
    this._animationPos = 1;
    this.opacity = 0;
    this._sprite.opacity = 0;
    this.close();
};

D_Window_Common_Alert_Window.prototype.setTxt = function (txt) {
    if (this._animationFlag) {
        return;
    }

    if (this.contents) {
        this.contents.clear();
    }
    this._txt = txt;
    let alignment = this.textWidth(txt);
    this.drawTextEx(this._txt, (this.width / 2) - (alignment / 2) - 20, 0);
};

D_Window_Common_Alert_Window.prototype.setInitialize = function (thisWindow) {
    this._thisWindow = thisWindow;
    this._sceneObj.addChild(this._sprite);
    this._sceneObj.addWindow(this._thisWindow);
};

D_Window_Common_Alert_Window.prototype.startAnimation = function () {
    if (this._animationFlag) {
        return;
    }
    this._animationCnt = 0;
    this._animationFlag = true;
    this._animationPos = 1;
};

D_Window_Common_Alert_Window.prototype.animationWindow = function () {
    this._sprite.opacity = 255;
    this.open();
    this._animationPos = 2;
};

D_Window_Common_Alert_Window.prototype.pauseAnimation = function () {
    this._animationCnt++;
    if (this._animationCnt > 90) {
        this._animationPos = 3;
    }
};

D_Window_Common_Alert_Window.prototype.endAnimation = function () {
    this._sprite.opacity = 0;
    this._animationCnt = 0;
    this._animationFlag = false;
    this.close();
    this._animationPos = 4;
};

D_Window_Common_Alert_Window.prototype.moveAfter = function () {
    this._thisWindow = null;
    this.removeWindowByScene();

};

D_Window_Common_Alert_Window.prototype.removeWindowByScene = function () {
    this._sceneObj._windowLayer.removeChild(this._thisWindow);
    this._sceneObj.removeChild(this._sprite);
    this._sprite = null;
    this._window = null;
};

D_Window_Common_Alert_Window.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (this._animationFlag) {
        switch (this._animationPos) {
            case 1:
                this.animationWindow();
                break;
            case 2:
                this.pauseAnimation();
                break;
            case 3:
                this.endAnimation();
                break;
            case 4:
                this.moveAfter();
                break;
        }
    }
};

D_Window_Common_Alert_Window.prototype.updateBackgroundOpacity = function () {
    this.opacity = 0;
};

// D_Window_Common_Alert_Window.prototype.open = function(){
//     this._sprite.opacity = 255;
//     Window_Base.prototype.open.call(this);
// };

// D_Window_Common_Alert_Window.prototype.close = function(){
//     this._sprite.opacity = 255;
//     Window_Base.prototype.close.call(this);
// };