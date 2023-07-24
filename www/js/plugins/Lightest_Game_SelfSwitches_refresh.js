const _Game_SelfSwitches_setValue = Game_SelfSwitches.prototype.setValue
Game_SelfSwitches.prototype.setValue = function (key, value) {
    _Game_SelfSwitches_setValue.apply(this, arguments)
    this.onChange(key);//onChangeが2回呼ばれることになるが、1回目はkeyがないので弾かれる
}
Game_SelfSwitches.prototype.onChange = function (key) {
    if (!Array.isArray(key)) { return; }// keyが渡されなかったり配列でなかったら抜ける
    const [mapId, eventId, switchId] = key;
    // mapIdが一致しなかったら更新しない(マップ読み込み時に更新される)
    if ($dataMap != null && mapId) {
        if (mapId === $gameMap.mapId() && $gameMap.event(eventId)) { $gameMap.event(eventId).refresh(); }
    }
    // if(mapId === $gameMap.mapId() && $gameMap.event(eventId)){ $gameMap.event(eventId).refresh(); }
};