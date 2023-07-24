/*: @target MZ
 * @base TRP_ParticleMZ
 * @plugindesc 自作パーティクル設定の一覧
 * @help
 * ed_memory <character> ＠2023/4/18
 * fireworks_niagala1 <character> ＠2023/4/18
 * fireworks_niagala2 <character> ＠2022/12/9
 * newmiko_eff_01 <character> ＠2022/12/9
 * newmiko_eff_02 <character> ＠2022/12/10
 * newmiko_eff_03 <character> ＠2022/12/10
 * test <character> ＠---
 *
 * @command set_character
 * @text set/表示 > キャラ対象(2)
 * @desc パーティクル表示
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default weather
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option ed_memory <character> ＠2023/4/18
 * @value ed_memory
 * @option test <character> ＠---
 * @value test
 *
 * @arg z
 * @text Z値
 * @desc 重なり順。above:上、below:後ろ、screen、spritesetなど。数値指定も可
 * @default def
 *
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名
 *
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command play_character
 * @text play/１回再生 > キャラ対象(5)
 * @desc パーティクルを１回だけ再生
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default weather
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option fireworks_niagala1 <character> ＠2023/4/18
 * @value fireworks_niagala1
 * @option fireworks_niagala2 <character> ＠2022/12/9
 * @value fireworks_niagala2
 * @option newmiko_eff_01 <character> ＠2022/12/9
 * @value newmiko_eff_01
 * @option newmiko_eff_02 <character> ＠2022/12/10
 * @value newmiko_eff_02
 * @option newmiko_eff_03 <character> ＠2022/12/10
 * @value newmiko_eff_03
 *
 * @arg z
 * @text Z値
 * @desc 重なり順。above:上、below:後ろ、screen、spritesetなど。数値指定も可
 * @default def
 *
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名
 *
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 *
 *
 *
 *
 * @requiredAssets img/particles/flame1
 * @requiredAssets img/particles/particle9
 * @requiredAssets img/particles/__ANIM_30FPS_AC2Q002_Blow_0
 * @requiredAssets img/particles/__ANIM_30FPS_AC2Q015_Bind_14
 */
PluginManager._parameters.trp_particle_list = {
	animImages: ["_ANIM_30FPS_AC2Q002_Blow_0", "_ANIM_30FPS_AC2Q015_Bind_14"]
};