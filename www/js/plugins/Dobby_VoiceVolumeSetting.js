//=============================================================================
// Dobby_VoiceVolumeSetting.js
// 内容：音声設定を行う画面を作成するプラグイン
// 製作者：スタジオドビー
// バージョン：Ver1.0
//=============================================================================
/*:
 * @plugindesc 音声設定を行う画面を作成するプラグイン
 * @author スタジオドビー
 */

var _dobby_CharMappingVolume = {
    "Clea": "clea",
    "Bandit Nora": "nora",
    "Wizard Relm": "relm",
    "Monk Sophia": "sophia",
    "Celis of the Gale": "celis",
    "Receptionist Piste": "piste",
    "Explorer Ect": "ect",
    "Queen Caron": "caron",
    "Dark Imperial Emoni": "emoni",
    "Maid Amina": "amina",
    "Explorer Armada": "armada",
    "Priestess Phoni": "phoni",
    "Sister Eleo": "eleo",
    "Phantom Thief Perno": "perno",
    "Armor Break": "abm",
    "Storekeeper NPC": "shopNPC"
};

const SD_VVS_PREFIX = "d";
const SD_VVS_SUFFIX = "Volume";

function charVoiceByJaName(charName, fileName) {
    var symbol = _dobby_CharMappingVolume[charName];
    charVoiceByCharSymbol(symbol, fileName);
};

function charVoiceByCharSymbol(symbol, fileName) {
    AudioManager.playDobbySe({
        "name": fileName,
        "volume": Number(ConfigManager[SD_VVS_PREFIX + symbol + SD_VVS_SUFFIX]),
        "pitch": 100,
        "pan": 0
    });
};

AudioManager.playDobbySe = function (se) {
    if (se.name) {
        this._seBuffers = this._seBuffers.filter(function (audio) {
            return audio.isPlaying();
        });
        var buffer = this.createBuffer('se/charVoice', se.name);
        this.updateSeParametersDobby(buffer, se);
        buffer.play(false);
        this._seBuffers.push(buffer);
    }
};

AudioManager.updateSeParametersDobby = function (buffer, se) {
    this.updateBufferParametersDobby(buffer, this._seVolume, se);
};

AudioManager.updateBufferParametersDobby = function (buffer, configVolume, audio) {
    if (buffer && audio) {
        buffer.volume = 100 * (audio.volume || 0) / 10000;
        buffer.pitch = (audio.pitch || 0) / 100;
        buffer.pan = (audio.pan || 0) / 100;
    }
};

var _dobby_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
    var config = _dobby_ConfigManager_makeData.apply(this, arguments);
    config.dcleaVolume = this.dcleaVolume;
    config.dnoraVolume = this.dnoraVolume;
    config.drelmVolume = this.drelmVolume;
    config.dsophiaVolume = this.dsophiaVolume;
    config.dcelisVolume = this.dcelisVolume;
    config.dpisteVolume = this.dpisteVolume;
    config.dectVolume = this.dectVolume;
    config.dcaronVolume = this.dcaronVolume;
    config.demoniVolume = this.demoniVolume;
    config.daminaVolume = this.daminaVolume;
    config.darmadaVolume = this.darmadaVolume;
    config.dphoniVolume = this.dphoniVolume;
    config.deleoVolume = this.deleoVolume;
    config.dpernoVolume = this.dpernoVolume;
    config.dabmVolume = this.dabmVolume;
    config.dshopNPCVolume = this.dshopNPCVolume;


    return config;
};

var _dobby_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
    _dobby_ConfigManager_applyData.apply(this, arguments);
    const DEFAULT_CHAR_VOL = 20;
    this.dcleaVolume = this.readVolume(config, SD_VVS_PREFIX + 'clea' + SD_VVS_SUFFIX);
    if (config.dcleaVolume == null) {
        this.dcleaVolume = DEFAULT_CHAR_VOL;
    }
    this.dnoraVolume = this.readVolume(config, SD_VVS_PREFIX + 'nora' + SD_VVS_SUFFIX);
    if (config.dnoraVolume == null) {
        this.dnoraVolume = DEFAULT_CHAR_VOL;
    }
    this.drelmVolume = this.readVolume(config, SD_VVS_PREFIX + 'relm' + SD_VVS_SUFFIX);
    if (config.drelmVolume == null) {
        this.drelmVolume = DEFAULT_CHAR_VOL;
    }
    this.dsophiaVolume = this.readVolume(config, SD_VVS_PREFIX + 'sophia' + SD_VVS_SUFFIX);
    if (config.dsophiaVolume == null) {
        this.dsophiaVolume = DEFAULT_CHAR_VOL;
    }
    this.dcelisVolume = this.readVolume(config, SD_VVS_PREFIX + 'celis' + SD_VVS_SUFFIX);
    if (config.dcelisVolume == null) {
        this.dcelisVolume = DEFAULT_CHAR_VOL;
    }
    this.dpisteVolume = this.readVolume(config, SD_VVS_PREFIX + 'piste' + SD_VVS_SUFFIX);
    if (config.dpisteVolume == null) {
        this.dpisteVolume = DEFAULT_CHAR_VOL;
    }
    this.dectVolume = this.readVolume(config, SD_VVS_PREFIX + 'ect' + SD_VVS_SUFFIX);
    if (config.dectVolume == null) {
        this.dectVolume = DEFAULT_CHAR_VOL;
    }
    this.dcaronVolume = this.readVolume(config, SD_VVS_PREFIX + 'caron' + SD_VVS_SUFFIX);
    if (config.dcaronVolume == null) {
        this.dcaronVolume = DEFAULT_CHAR_VOL;
    }
    this.demoniVolume = this.readVolume(config, SD_VVS_PREFIX + 'emoni' + SD_VVS_SUFFIX);
    if (config.demoniVolume == null) {
        this.demoniVolume = DEFAULT_CHAR_VOL;
    }
    this.daminaVolume = this.readVolume(config, SD_VVS_PREFIX + 'amina' + SD_VVS_SUFFIX);
    if (config.daminaVolume == null) {
        this.daminaVolume = DEFAULT_CHAR_VOL;
    }
    this.darmadaVolume = this.readVolume(config, SD_VVS_PREFIX + 'armada' + SD_VVS_SUFFIX);
    if (config.darmadaVolume == null) {
        this.darmadaVolume = DEFAULT_CHAR_VOL;
    }
    this.dphoniVolume = this.readVolume(config, SD_VVS_PREFIX + 'phoni' + SD_VVS_SUFFIX);
    if (config.dphoniVolume == null) {
        this.dphoniVolume = DEFAULT_CHAR_VOL;
    }
    this.deleoVolume = this.readVolume(config, SD_VVS_PREFIX + 'eleo' + SD_VVS_SUFFIX);
    if (config.deleoVolume == null) {
        this.deleoVolume = DEFAULT_CHAR_VOL;
    }
    this.dpernoVolume = this.readVolume(config, SD_VVS_PREFIX + 'perno' + SD_VVS_SUFFIX);
    if (config.dpernoVolume == null) {
        this.dpernoVolume = DEFAULT_CHAR_VOL;
    }
    this.dabmVolume = this.readVolume(config, SD_VVS_PREFIX + 'abm' + SD_VVS_SUFFIX);
    if (config.dabmVolume == null) {
        this.dabmVolume = DEFAULT_CHAR_VOL;
    }
    this.dshopNPCVolume = this.readVolume(config, SD_VVS_PREFIX + 'shopNPC' + SD_VVS_SUFFIX);
    if (config.dshopNPCVolume == null) {
        this.dshopNPCVolume = DEFAULT_CHAR_VOL;
    }
};

function testtest2() {
    SceneManager.push(Dobby_Scene_VolumeSetting);
};

function Dobby_Scene_VolumeSetting() {
    this.initialize.apply(this, arguments);
}

Dobby_Scene_VolumeSetting.prototype = Object.create(Scene_Base.prototype);
Dobby_Scene_VolumeSetting.prototype.constructor = Dobby_Scene_VolumeSetting;

Dobby_Scene_VolumeSetting.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
};

Dobby_Scene_VolumeSetting.prototype.create = function () {
    this.createBackground();
    Scene_Base.prototype.create.call(this);
    Scene_Base.prototype.createWindowLayer.call(this);
    this._windowOptionSDobby = new Window_Options_Dobby();
    this.addWindow(this._windowOptionSDobby);
    this._windowOptionSDobby.setHandler('cancel', this.popScene.bind(this));
};

Dobby_Scene_VolumeSetting.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture("SceneCharValue");
    this.addChild(this._backgroundSprite);
};

var _dobby_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function () {
    _dobby_Window_Options_makeCommandList.call(this);
    this.addCommand("Voice Volume", 'dCharVolSetting');
};

var _dobby_Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function () {
    if (!this.isCharVolumeSymbol()) {
        _dobby_Window_Options_processOk.call(this);
    } else {
        SoundManager.playOk();
        SceneManager.push(Dobby_Scene_VolumeSetting);
    }
};

var _dobby_Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function (wrap) {
    if (!this.isCharVolumeSymbol()) {
        _dobby_Window_Options_cursorRight.call(this, wrap);
    }
};
var _dobby_Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function (wrap) {
    if (!this.isCharVolumeSymbol()) {
        _dobby_Window_Options_cursorLeft.call(this, wrap);
    }
};

var _dobby_Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function (index) {
    var symbol = this.commandSymbol(index);
    if (symbol == 'dCharVolSetting') {
        var value = this.getConfigValue(symbol);
        return value;
    } else {
        return _dobby_Window_Options_statusText.call(this, index);
    }
};

Window_Options.prototype.isCharVolumeSymbol = function () {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol == 'dCharVolSetting') {
        return true;
    } else {
        return false;
    }
}

function Window_Options_Dobby() {
    this.initialize.apply(this, arguments);
}

Window_Options_Dobby.prototype = Object.create(Window_Options.prototype);
Window_Options_Dobby.prototype.constructor = Window_Options_Dobby;

Window_Options_Dobby.prototype.makeCommandList = function () {
    this.addVolumeOptions();
};

Window_Options_Dobby.prototype.addVolumeOptions = function () {
    for (var key in _dobby_CharMappingVolume) {
        var charName = _dobby_CharMappingVolume[key];
        this.addCommand(key + " Volume", SD_VVS_PREFIX + charName + SD_VVS_SUFFIX);
    }
};

Window_Options_Dobby.prototype.windowWidth = function () {
    return 500;
};