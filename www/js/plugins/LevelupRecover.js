//
/*:
@plugindesc レベルアップの時に回復するプラグインです。
@author 霧島万
*/




(function (_global) {
	var CPOlevelUp = Game_Actor.prototype.levelUp;

	Game_Actor.prototype.levelUp = function () {
		//元の定義
		var defaultLevelUp = CPOlevelUp.call(this);
		//追記
		this._hp = this.mhp;
		this._mp = this.mmp;
		if ($gameSwitches && $gameSwitches.value(132)) {
			return;
		}

		// tasunoko
		let idxs = ["1", "2", "3"];
		let voiceId = idxs[(Math.floor(Math.random() * idxs.length))];
		if (this._actorId) {
			AudioManager.stopSe();
			switch (this._actorId) {
				case 1:
					charVoiceByCharSymbol("clea", "all-battle-clea-00" + voiceId);
					//AudioManager.playSe({"name":"all-battle-clea-00"+voiceId,"volume":90,"pitch":100,"pan":0});
					break;
				case 2:
					charVoiceByCharSymbol("relm", "all-battle-relm-00" + voiceId);
					//AudioManager.playSe({"name":"all-battle-relm-00"+voiceId,"volume":90,"pitch":100,"pan":0});
					break;
				case 3:
					charVoiceByCharSymbol("nora", "all-battle-nora-00" + voiceId);
					//AudioManager.playSe({"name":"all-battle-nora-00"+voiceId,"volume":90,"pitch":100,"pan":0});
					break;
				case 4:
					charVoiceByCharSymbol("sophia", "all-battle-sophia-00" + voiceId);
					//AudioManager.playSe({"name":"all-battle-sophia-00"+voiceId,"volume":90,"pitch":100,"pan":0});
					break;
			}
		}

	};

})();　