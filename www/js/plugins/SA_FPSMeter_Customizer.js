//=============================================================================
// SA_FPSMeter_Customizer.js
// ----------------------------------------------------------------------------
// Created by seea
// License: MIT License  https://opensource.org/licenses/mit-license.php
//
// Plugin author:
//  Contact: https://nekono.org
//=============================================================================
// History
// 18.0 2018/01/30 Initial release.
//=============================================================================
// 更新履歴
// 18.0 2018/01/30 初版

/*:
 * ==============================================================================
 * @plugindesc v18.0 SA FPSMeter Customizer
 * @author seea
 * @require rpg_core.js v1.5.1
 *
 * @help
 * SA FPSMeter Customizer -- FPS表示をカスタマイズします
 *
 * 必須 - rpg_core.js v1.5.1
 *
 */

var Imported = Imported || {};
Imported.SA_FPSMeter_Customizer = true;

//-----------------------------------------------------------------------------
(function () {
	'use strict';

	/**
	 * @static
	 * @method _createFPSMeter
	 * @private
	 */
	Graphics._createFPSMeter = function () {
		var options = { graph: 1, theme: 'transparent', toggleOn: null, interval: 500, threshold: 500, decimals: 1 };
		this._fpsMeter = new FPSMeter(options);
		this._fpsMeter.hide();
	};

})();
