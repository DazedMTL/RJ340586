//=============================================================================
// Dobby_DispCharacterImg.js
// 内容：キャラクターの立ち絵を表示させる
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc 立ち絵表示プラグイン
 * @author スタジオドビー
 * 
 */
var d_movingSwitch = false;
var d_movingWalkSwitch = false;
var d_movingStep = 1;
var d_horsMovePoint = 0;

Game_System.prototype.setDmoveingStep = function (step) {
    this._d_movingStep = step;
};

Game_System.prototype.getDmoveingStep = function () {
    return this._d_movingStep;
};

(function () {

    function MoveingSprite() {
        this.initialize.apply(this, arguments);
    };


    MoveingSprite.prototype = Object.create(Sprite.prototype);
    MoveingSprite.prototype.constructor = MoveingSprite;

    MoveingSprite.prototype.adjustMovePoint = function () {
        this._moveSky_x = 10;
        this._moveSky2_x = 10;
        this._moveCloud_x = 5;
        this._moveCloud2_x = 5;
        this._moveJimen_x = 10;
        this._moveJimen2_x = 10;
        this._moveForest_x = 15;
        this._moveForest2_x = 15;
    };

    MoveingSprite.prototype.movePoint = function () {
        if (this._moveSky) this._moveSky.x -= this._moveSky_x;
        if (this._moveSky2) this._moveSky2.x -= this._moveSky2_x;
        if (this._moveCloud) this._moveCloud.x -= this._moveCloud_x;
        if (this._moveCloud2) this._moveCloud2.x -= this._moveCloud2_x;
        if (this._moveJimen) this._moveJimen.x -= this._moveJimen_x;
        if (this._moveJimen2) this._moveJimen2.x -= this._moveJimen2_x;
        if (this._moveForest) this._moveForest.x -= this._moveForest_x;
        if (this._moveForest2) this._moveForest2.x -= this._moveForest2_x;

        this._movePointCnt++;
        if (this._movePointCnt > 3) {
            this._movePointCnt = 0;
            d_horsMovePoint += this._dhorseHantentCnt;
        }
        if (d_horsMovePoint > 2 || d_horsMovePoint < 0) {
            // d_horsMovePoint = 0;
            this._dhorseHantentCnt = this._dhorseHantentCnt * -1;
            d_horsMovePoint += this._dhorseHantentCnt;
        }
        if (this._dot_horse) this._dot_horse.setFrame(d_horsMovePoint * 192, 200, 192, 100);
    };

    MoveingSprite.prototype.execMove = function () {
        if (this._moveSky && this._moveSky2 && this._moveSky.x <= -3072) {
            this._moveSky.x = 3084 + this._moveSky2.x - 100;
            //thisObj._moveSky.x = 3100;
        }

        if (this._moveSky && this._moveSky2 && this._moveSky2.x <= -3072) {
            this._moveSky2.x = 3084 + this._moveSky.x - 100;
            //thisObj._moveSky2.x = 3100;
        }

        if (this._moveCloud && this._moveCloud.x <= -3072) {
            this._moveCloud.x = 3072;
        }

        if (this._moveCloud2 && this._moveCloud2.x <= -3072) {
            this._moveCloud2.x = 3072;
        }

        if (this._moveJimen && this._moveJimen2 && this._moveJimen.x <= -3072) {
            this._moveJimen.x = 3084 + this._moveJimen2.x - 100;
        }

        if (this._moveJimen && this._moveJimen2 && this._moveJimen2.x <= -3072) {
            this._moveJimen2.x = 3084 + this._moveJimen.x - 100;
        }

        if (this._moveForest && this._moveForest2 && this._moveForest.x <= -3072) {
            this._moveForest.x = 3084 + this._moveForest2.x - 100;
        }

        if (this._moveForest && this._moveForest2 && this._moveForest2.x <= -3072) {
            this._moveForest2.x = 3084 + this._moveForest.x - 100;
        }
        this.movePoint();
    };


    MoveingSprite.prototype.moveImgInitilizeFunction = function () {
        this._moveForest = new Sprite(ImageManager.loadBitmap('img/pictures/', "forest"));
        this._moveForest2 = new Sprite(ImageManager.loadBitmap('img/pictures/', "forest"));
        this._moveCloud = new Sprite(ImageManager.loadBitmap('img/pictures/', "cloud"));
        this._moveCloud2 = new Sprite(ImageManager.loadBitmap('img/pictures/', "cloud"));
        this._moveJimen = new Sprite(ImageManager.loadBitmap('img/pictures/', "jimen"));
        this._moveJimen2 = new Sprite(ImageManager.loadBitmap('img/pictures/', "jimen"));
        this._moveSky = new Sprite(ImageManager.loadBitmap('img/pictures/', "blue-sky"));
        this._moveSky2 = new Sprite(ImageManager.loadBitmap('img/pictures/', "blue-sky"));

        this._dot_horse = new Sprite(ImageManager.loadBitmap('img/pictures/', "horseCarriage"));
        this._dot_horse.setFrame(0, 200, 192, 100);
        this._dobbyFadeSprite = new Sprite(ImageManager.loadBitmap('img/pictures/', "fadeSprite"));

        this._moveSky.x = 0;
        this._moveCloud.x = 0;
        this._moveJimen.x = 0;
        this._moveForest.x = 0;
        this._moveSky2.x = 3084 - 100;
        this._moveCloud2.x = 3084 - 100;
        this._moveJimen2.x = 3084 - 100;
        this._moveForest2.x = 3084 - 100;
        this._dot_horse.x = Graphics.width / 2 - 100;
        this._dot_horse.y = Graphics.height / 2 + 50;

        this._moveForest.y = 150;
        this._moveForest2.y = this._moveForest.y;
        this._moveSky.opacity = 0;
        this._moveSky2.opacity = 0;
        this._moveCloud.opacity = 0;
        this._moveCloud2.opacity = 0;
        this._moveJimen.opacity = 0;
        this._moveJimen2.opacity = 0;
        this._dot_horse.opacity = 0;
        this._moveForest.opacity = 0;
        this._moveForest2.opacity = 0;
        this.addChild(this._moveSky);
        this.addChild(this._moveSky2);
        this.addChild(this._moveCloud);
        this.addChild(this._moveCloud2);
        this.addChild(this._moveJimen);
        this.addChild(this._moveJimen2);

        this.addChild(this._dot_horse);

        this.addChild(this._moveForest);
        this.addChild(this._moveForest2);
        this.addChild(this._dobbyFadeSprite);
        d_movingStep = 2;
        this._movePointCnt = 0;
        this._dhorseHantentCnt = 1;
        d_horsMovePoint = 0;
        this._objstartSwitch = true;
        this.adjustMovePoint();
    };

    MoveingSprite.prototype.terminateDispMoving = function () {
        this.removeChild(this._moveSky);
        this.removeChild(this._moveSky2);
        this.removeChild(this._moveCloud);
        this.removeChild(this._moveCloud2);
        this.removeChild(this._moveJimen);
        this.removeChild(this._moveJimen2);
        this.removeChild(this._dot_horse);
        this.removeChild(this._moveForest);
        this.removeChild(this._moveForest2);
        this.removeChild(this._dobbyFadeSprite);
        this._moveSky = null;
        this._moveSky2 = null;
        this._moveCloud = null;
        this._moveCloud2 = null;
        this._moveJimen = null;
        this._moveJimen2 = null;
        this._dot_horse = null;
        this._moveForest = null;
        this._moveJimen2 = null;
        this._dobbyFadeSprite = null;

        this._moveSky_x = null;
        this._moveSky2_x = null;
        this._moveCloud_x = null;
        this._moveCloud2_x = null;
        this._moveJimen_x = null;
        this._moveJimen2_x = null;
        this._moveForest_x = null;
        this._moveForest2_x = null;
    };


    var pluginName = "dobby_enshutu";
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            switch (args[0]) {
                case 'start':
                    d_movingStep = 1;
                    d_movingSwitch = true;
                    d_movingWalkSwitch = false;
                    break;
                case 'stop':
                    d_movingStep = 3;
                    break;
                case 'walkStart':
                    d_movingStep = 1;
                    d_movingSwitch = false;
                    d_movingWalkSwitch = true;
                    break;
                case 'walkStop':
                    d_movingStep = 2;
                    break;
                case 'walkEnd':
                    d_movingStep = 3;
                    break;
            }
        }
    };

    var D_Scene_Base_prototype_createWindowLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function (mapId, eventId) {
        if ($dataMap && $dataMap.note != "" && $dataMap.note.indexOf("<DOBBY_BASHA_MOVE>") != -1 ||
            $dataMap && $dataMap.note != "" && $dataMap.note.indexOf("<DOBBY_WALK_MOVE>") != -1) {
            this.removeChild(this._moveImgBase);
            this._moveImgBase = new MoveingSprite();
            this.addChild(this._moveImgBase);
        }

        D_Scene_Base_prototype_createWindowLayer.call(this, mapId, eventId);
    };

    MoveingSprite.prototype.update = function () {
        if (d_movingSwitch) {
            switch (d_movingStep) {
                case 1:
                    this.moveImgInitilizeFunction();
                    break;
                case 2:
                    if (this._objstartSwitch) {
                        this._moveSky.opacity = 255;
                        this._moveSky2.opacity = 255;
                        this._moveCloud.opacity = 255;
                        this._moveCloud2.opacity = 255;
                        this._moveJimen.opacity = 255;
                        this._moveJimen2.opacity = 255;
                        this._dot_horse.opacity = 255;
                        this._moveForest.opacity = 255;
                        this._moveForest2.opacity = 255;
                        this._objstartSwitch = false;
                    }
                    if (this._dobbyFadeSprite && this._dobbyFadeSprite.opacity > 0) {
                        this._dobbyFadeSprite.opacity--;
                    }
                    this.execMove();
                    break;
                case 3:
                    this.execMove();

                    if (this._dobbyFadeSprite && this._dobbyFadeSprite.opacity < 255) {
                        this._dobbyFadeSprite.opacity = this._dobbyFadeSprite.opacity + 2;
                    }
                    if (this._dobbyFadeSprite && this._dobbyFadeSprite.opacity >= 255) {
                        d_movingStep = 4;
                    }

                    break;
                case 4:
                    this.terminateDispMoving(this);
                    d_movingSwitch = false;
                    d_movingStep = 1;
                    break;
            }
        } else if (d_movingWalkSwitch) {
            switch (d_movingStep) {
                case 1:
                    if (typeof moveImgInitilizeFunction === 'function') {
                        moveImgInitilizeFunction(this);
                    }
                    break;
                case 2:
                    if (this._objstartSwitch) {
                        this._moveSky.opacity = 255;
                        this._moveSky2.opacity = 255;
                        this._moveCloud.opacity = 255;
                        this._moveCloud2.opacity = 255;
                        this._moveJimen.opacity = 255;
                        this._moveJimen2.opacity = 255;
                        this._dot_horse.opacity = 255;
                        this._moveForest.opacity = 255;
                        this._moveForest2.opacity = 255;
                        this._objstartSwitch = false;
                    }
                    if (this._dobbyFadeSprite && this._dobbyFadeSprite.opacity > 0) {
                        this._dobbyFadeSprite.opacity--;
                    }

                    if (this.execMove && typeof this.execMove === 'function') {
                        //execMove(this);
                        this.execMove();
                    }
                    break;
                case 3:
                    if (this.execMove && typeof this.execMove === 'function') {
                        //execMove(this);
                        this.execMove();
                    }

                    if (this._dobbyFadeSprite && this._dobbyFadeSprite.opacity < 255) {
                        this._dobbyFadeSprite.opacity = this._dobbyFadeSprite.opacity + 2;
                    }
                    if (this._dobbyFadeSprite && this._dobbyFadeSprite.opacity >= 255) {
                        d_movingStep = 4;
                    }

                    break;
                case 4:
                    if (typeof terminateDispMoving === 'function') {
                        terminateDispMoving(this);
                        d_movingSwitch = false;
                        d_movingStep = 1;
                    }
                    break;
            }
        }
        Sprite.prototype.update.call(this);
    }

}());//EOF