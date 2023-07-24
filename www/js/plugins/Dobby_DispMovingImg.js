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
var d_movingStep = 1;
var d_horsMovePoint = 0;
Game_System.prototype.setDmoveingStep = function (step) {
    this._d_movingStep = step;
};

Game_System.prototype.getDmoveingStep = function () {
    return this._d_movingStep;
};

Scene_Base.prototype.adjustMovePoint = function () {
    this._moveSky.x += 10;
    this._moveSky2.x += 10;
    this._moveCloud.x += 5;
    this._moveCloud2.x += 5;
    this._moveJimen.x += 10;
    this._moveJimen2.x += 10;
    this._moveForest.x += 15;
    this._moveForest2.x += 15;
};

Scene_Base.prototype.movePoint = function () {
    if (this._moveSky) this._moveSky.x -= 10;
    if (this._moveSky2) this._moveSky2.x -= 10;
    if (this._moveCloud) this._moveCloud.x -= 5;
    if (this._moveCloud2) this._moveCloud2.x -= 5;
    if (this._moveJimen) this._moveJimen.x -= 10;
    if (this._moveJimen2) this._moveJimen2.x -= 10;
    if (this._moveForest) this._moveForest.x -= 15;
    if (this._moveForest2) this._moveForest2.x -= 15;

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

Scene_Base.prototype.execMove = function () {
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

(function () {

    function moveImgInitilizeFunction(thisObj) {
        if (thisObj._moveImgBase) {
            thisObj._moveForest = new Sprite(ImageManager.loadBitmap('img/pictures/', "forest"));
            thisObj._moveForest2 = new Sprite(ImageManager.loadBitmap('img/pictures/', "forest"));
            thisObj._moveCloud = new Sprite(ImageManager.loadBitmap('img/pictures/', "cloud"));
            thisObj._moveCloud2 = new Sprite(ImageManager.loadBitmap('img/pictures/', "cloud"));
            thisObj._moveJimen = new Sprite(ImageManager.loadBitmap('img/pictures/', "jimen"));
            thisObj._moveJimen2 = new Sprite(ImageManager.loadBitmap('img/pictures/', "jimen"));
            thisObj._moveSky = new Sprite(ImageManager.loadBitmap('img/pictures/', "blue-sky"));
            thisObj._moveSky2 = new Sprite(ImageManager.loadBitmap('img/pictures/', "blue-sky"));
            thisObj._dot_horse = new Sprite(ImageManager.loadBitmap('img/pictures/', "horseCarriage"));
            thisObj._dot_horse.setFrame(0, 200, 192, 100);
            thisObj._dobbyFadeSprite = new Sprite(ImageManager.loadBitmap('img/pictures/', "fadeSprite"));
            thisObj._moveSky.x = 0;
            thisObj._moveCloud.x = 0;
            thisObj._moveJimen.x = 0;
            thisObj._moveForest.x = 0;
            thisObj._moveSky2.x = 3084 - 100;
            thisObj._moveCloud2.x = 3084 - 100;
            thisObj._moveJimen2.x = 3084 - 100;
            thisObj._moveForest2.x = 3084 - 100;
            thisObj._dot_horse.x = Graphics.width / 2 - 100;
            thisObj._dot_horse.y = Graphics.height / 2 + 50;

            thisObj._moveForest.y = 150;
            thisObj._moveForest2.y = thisObj._moveForest.y;
            thisObj._moveSky.opacity = 0;
            thisObj._moveSky2.opacity = 0;
            thisObj._moveCloud.opacity = 0;
            thisObj._moveCloud2.opacity = 0;
            thisObj._moveJimen.opacity = 0;
            thisObj._moveJimen2.opacity = 0;
            thisObj._dot_horse.opacity = 0;
            thisObj._moveForest.opacity = 0;
            thisObj._moveForest2.opacity = 0;
            thisObj._moveImgBase.addChild(thisObj._moveSky);
            thisObj._moveImgBase.addChild(thisObj._moveSky2);
            thisObj._moveImgBase.addChild(thisObj._moveCloud);
            thisObj._moveImgBase.addChild(thisObj._moveCloud2);
            thisObj._moveImgBase.addChild(thisObj._moveJimen);
            thisObj._moveImgBase.addChild(thisObj._moveJimen2);
            thisObj._moveImgBase.addChild(thisObj._dot_horse);
            thisObj._moveImgBase.addChild(thisObj._moveForest);
            thisObj._moveImgBase.addChild(thisObj._moveForest2);
            thisObj._moveImgBase.addChild(thisObj._dobbyFadeSprite);
            d_movingStep = 2;
            thisObj._movePointCnt = 0;
            thisObj._dhorseHantentCnt = 1;
            d_horsMovePoint = 0;
            thisObj._objstartSwitch = true;
        }
    };

    // function execMove(thisObj){
    //     if (thisObj._moveSky && thisObj._moveSky2 && thisObj._moveSky.x <= -3072) {
    //         thisObj._moveSky.x = 3084 + thisObj._moveSky2.x-100;
    //         //thisObj._moveSky.x = 3100;
    //     }

    //     if (thisObj._moveSky && thisObj._moveSky2 && thisObj._moveSky2.x <= -3072) {
    //         thisObj._moveSky2.x = 3084 + thisObj._moveSky.x-100;
    //         //thisObj._moveSky2.x = 3100;
    //     }

    //     if (thisObj._moveCloud && thisObj._moveCloud.x <= -3072) {
    //         thisObj._moveCloud.x = 3072;
    //     }

    //     if (thisObj._moveCloud2 && thisObj._moveCloud2.x <= -3072) {
    //         thisObj._moveCloud2.x = 3072;
    //     }

    //     if (thisObj._moveJimen && thisObj._moveJimen2 && thisObj._moveJimen.x <= -3072) {
    //         thisObj._moveJimen.x = 3084 + thisObj._moveJimen2.x-100;
    //     }

    //     if (thisObj._moveJimen && thisObj._moveJimen2 && thisObj._moveJimen2.x <= -3072) {
    //         thisObj._moveJimen2.x = 3084 + thisObj._moveJimen.x-100;
    //     }

    //     if (thisObj._moveForest && thisObj._moveForest2 && thisObj._moveForest.x <= -3072) {
    //         thisObj._moveForest.x = 3084 + thisObj._moveForest2.x-100;
    //     }

    //     if (thisObj._moveForest && thisObj._moveForest2 && thisObj._moveForest2.x <= -3072) {
    //         thisObj._moveForest2.x = 3084 + thisObj._moveForest.x-100;
    //     }
    //     thisObj.movePoint(thisObj);
    // };

    function terminateDispMoving(thisObj) {
        thisObj._moveImgBase.removeChild(thisObj._moveSky);
        thisObj._moveImgBase.removeChild(thisObj._moveSky2);
        thisObj._moveImgBase.removeChild(thisObj._moveCloud);
        thisObj._moveImgBase.removeChild(thisObj._moveCloud2);
        thisObj._moveImgBase.removeChild(thisObj._moveJimen);
        thisObj._moveImgBase.removeChild(thisObj._moveJimen2);
        thisObj._moveImgBase.removeChild(thisObj._dot_horse);
        thisObj._moveImgBase.removeChild(thisObj._moveForest);
        thisObj._moveImgBase.removeChild(thisObj._moveForest2);
        thisObj._moveImgBase.removeChild(thisObj._dobbyFadeSprite);
        thisObj._moveSky = null;
        thisObj._moveSky2 = null;
        thisObj._moveCloud = null;
        thisObj._moveCloud2 = null;
        thisObj._moveJimen = null;
        thisObj._moveJimen2 = null;
        thisObj._dot_horse = null;
        thisObj._moveForest = null;
        thisObj._moveJimen2 = null;
        thisObj._dobbyFadeSprite = null;
    };

    // function movePoint(thisObj){
    //     if(thisObj._moveSky)thisObj._moveSky.x -=10; 
    //     if(thisObj._moveSky2)thisObj._moveSky2.x -=10;
    //     if(thisObj._moveCloud)thisObj._moveCloud.x -=5;
    //     if(thisObj._moveCloud2)thisObj._moveCloud2.x -=5;
    //     if(thisObj._moveJimen)thisObj._moveJimen.x -=10;
    //     if(thisObj._moveJimen2)thisObj._moveJimen2.x -=10;
    //     if(thisObj._moveForest)thisObj._moveForest.x -=15;
    //     if(thisObj._moveForest2)thisObj._moveForest2.x -=15;

    //     thisObj._movePointCnt++;
    //     if (thisObj._movePointCnt > 3) {
    //         thisObj._movePointCnt = 0;
    //         d_horsMovePoint += thisObj._dhorseHantentCnt;
    //     }
    //     if (d_horsMovePoint > 2 || d_horsMovePoint < 0) {
    //         // d_horsMovePoint = 0;
    //         thisObj._dhorseHantentCnt = thisObj._dhorseHantentCnt * -1;
    //         d_horsMovePoint += thisObj._dhorseHantentCnt;
    //     }
    //     if(thisObj._dot_horse)thisObj._dot_horse.setFrame(d_horsMovePoint*192,200,192,100);
    // };

    var pluginName = "dobby_enshutu";
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            switch (args[0]) {
                case 'start':
                    d_movingStep = 1;
                    d_movingSwitch = true;
                    break;
                case 'stop':
                    d_movingStep = 3;
                    break;
            }
        }
    };

    var D_Scene_Base_prototype_createWindowLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function () {
        if ($dataMap && $dataMap.note != "" && $dataMap.note.indexOf("<DOBBY_BASHA_MOVE>") != -1) {
            this._moveImgBase = new Sprite();
            this.addChild(this._moveImgBase);
            this._fadeSprite;
            var sc = SceneManager._scene;
            var aa = "";

        }
        D_Scene_Base_prototype_createWindowLayer.call(this);
    };


    var D_Scene_Base_prototype_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        if (d_movingSwitch) {
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
        D_Scene_Base_prototype_update.call(this);
    }

}());//EOF