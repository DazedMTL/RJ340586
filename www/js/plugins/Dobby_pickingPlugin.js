//=============================================================================
// Dobby_pickingPlugin.js
// 内容：Dobby_pickingPlugin
// 製作者：タツノコ
// バージョン：Ver1.0.0
//=============================================================================
/*:
 * @plugindesc ダイヤルピッキングプラグイン
 * @author タツノコ
 *
 * @param isClear
 * @text クリア情報を保持するスイッチ
 * @desc クリア情報を保持するスイッチ
 * @type @type switch
 * @default 0
 *
 **/

(function () {

    var DobbyPickingparameterP = DobbyPickingparameterP || {};
    let parameters = PluginManager.parameters('Dobby_pickingPlugin');
    DobbyPickingparameterP.isClearSwitchNo = Number(parameters['isClear'] || 0);

    let pickpluginName = "Dobby_pickingPlugin";
    let _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pickpluginName) {
            switch (args[0]) {
                case 'start':
                    let numList = new Array();
                    for (let i = 1; i < args.length; i++) {
                        numList.push(args[i]);
                    }
                    Scnene_PickingScene.numList = numList;
                    SceneManager.push(Scnene_PickingScene);
            }
        }
    };

    function Scnene_PickingScene() {
        this.initialize.apply(this, arguments);
    };

    Scnene_PickingScene.prototype = Object.create(Scene_Base.prototype);
    Scnene_PickingScene.prototype.constructor = Scnene_PickingScene;
    Scnene_PickingScene.prototype.loadBitmapPluginImgFolder = function (imgName) {
        return ImageManager.loadBitmap('img/pictures/pickngPlugin/', imgName, null, true);
    };

    Scnene_PickingScene.numList;

    Scnene_PickingScene.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        this._moveFlag = false;
        this._movePoint = "";
        this._nowPoint = 0;
        this._totalNum = new Array();
        this._ringTime = 0;
        $gameSwitches.setValue(DobbyPickingparameterP.isClearSwitchNo, false);
    };

    Scnene_PickingScene.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        this._baseSprite = new Sprite();
        this.addChild(this._baseSprite);
        this._pickBoxSprite = new Sprite(this.loadBitmapPluginImgFolder("base"));
        this._pickDialSprite = new Sprite(this.loadBitmapPluginImgFolder("dial"));
        this._baseSprite.addChild(this._pickBoxSprite);
        this._baseSprite.addChild(this._pickDialSprite);

    };

    Scnene_PickingScene.prototype.createBackground = function () {
        this._backGroundImg = new Sprite();
        this.addChild(this._backGroundImg);
    };

    Scnene_PickingScene.prototype.isReady = function () {
        if (!Scene_Base.prototype.isReady()) {
            return false;
        }

        if (!(this._pickBoxSprite && this._pickBoxSprite.width > 0 && this._pickBoxSprite.height > 0)) {
            return false;
        }

        if (!(this._pickDialSprite && this._pickDialSprite.width > 0 && this._pickDialSprite.height > 0)) {
            return false;
        }

        return true;
    };


    Scnene_PickingScene.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        let pickBoxWidth = this._pickBoxSprite.width;
        let pickBoxHeight = this._pickBoxSprite.height;
        let pickDialWidth = this._pickDialSprite.width;
        let pickDialHeight = this._pickDialSprite.height;
        let baseXpos = (Graphics.width / 2) - (pickBoxWidth / 2);
        let baseYpos = (Graphics.height / 2) - (pickBoxHeight / 2);
        let dialXPos = (Graphics.width / 2);
        let dialYPos = (Graphics.height / 2);
        this._pickBoxSprite.x = baseXpos;
        this._pickBoxSprite.y = baseYpos;
        this._pickDialSprite.x = dialXPos;
        this._pickDialSprite.y = dialYPos;
        this._pickDialSprite.anchor.x = 0.5;
        this._pickDialSprite.anchor.y = 0.5;
    };

    Scnene_PickingScene.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        if (!this._moveFlag) {
            if (Input.isTriggered('left')) {
                if (this._movePoint == "right") {
                    this._totalNum.push("r" + this._nowPoint);
                }
                this._moveFlag = true;
                this._movePoint = "left";
                this._nowPoint--;
                if (this._nowPoint < 0) {
                    this._nowPoint = 7;
                }
            } else if (Input.isTriggered('right')) {
                this._moveFlag = true;
                if (this._movePoint == "left") {
                    this._totalNum.push("l" + this._nowPoint);
                }
                this._movePoint = "right";
                this._nowPoint++;
                if (this._nowPoint >= 8) {
                    this._nowPoint = 0;
                }
            } else if (Input.isTriggered('ok')) {
                this._nowPoint = 0;
                this._totalNum.length = 0;
                this._movePoint = "";
                this._pickDialSprite.rotation = 0;
            } else if (Input.isTriggered('cancel')) {
                SceneManager.pop();
            }
        }

        if (this._moveFlag) {
            this.moveDial();
            if (!this._moveFlag) {
                this.checkOpenPick(this._movePoint);
            }
        }
    };

    Scnene_PickingScene.prototype.moveDial = function () {
        this.dialMoveUpdate(this._movePoint);
    };

    Scnene_PickingScene.prototype.dialMoveUpdate = function (movePoint) {
        if (this._ringTime >= 9) {
            this._ringTime = 0;
            this._moveFlag = false;
            return;
        }
        this._ringTime += 1;

        var kakudo = 5;
        if (movePoint == "left") {
            kakudo = kakudo * -1;
        }
        this._pickDialSprite.rotation += kakudo * (Math.PI / 180);
    };

    Scnene_PickingScene.prototype.checkOpenPick = function (movePoint) {
        if (this._totalNum.length > 0) {

            if (this._totalNum.length >= Scnene_PickingScene.numList.length - 1) {

                if (this._totalNum.length >= Scnene_PickingScene.numList.length) {
                    this._totalNum.pop();
                }

                switch (this._movePoint) {
                    case "left":
                        this._totalNum.push("l" + this._nowPoint);
                        break;
                    case "right":
                        this._totalNum.push("r" + this._nowPoint);
                        break;
                }
                let cnt = 0;
                for (let i = 0; i < Scnene_PickingScene.numList.length; i++) {
                    if (this._totalNum[i] === Scnene_PickingScene.numList[i]) {
                        cnt++;
                    }
                }
                if (Scnene_PickingScene.numList.length === cnt) {
                    $gameSwitches.setValue(DobbyPickingparameterP.isClearSwitchNo, true);
                    SceneManager.pop();
                }
            }


        }
    };

})();