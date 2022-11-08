'use strict';

const anxeb = require('anxeb-node');

module.exports = function (terminal) {
	let _self = this;
	let _columns = 48;
	let _lines = [];

	if (terminal.settings != null) {
		if (terminal.settings.printer.type === 'esc32') {
			_columns = 32;
		} else if (terminal.settings.printer.type === 'esc48') {
			_columns = 48;
		} else if (terminal.settings.printer.type === 'nexgo') {
			_columns = 32;
		}
	} else {
		_columns = 48;
	}

	_self.isWide = _columns >= 48;

	let _align = function (value, len, alignRight) {
		value = value || '';
		let spaces = '';
		if (value.length > len) {
			value = value.substring(0, len);
		}

		for (let i = 0; i < len - value.length; i++) {
			spaces += ' ';
		}

		if (alignRight === true) {
			return spaces + value;
		} else {
			return value + spaces;
		}
	};

	let _line = function (char) {
		let line = '';
		for (let i = 0; i < _columns; i++) {
			line += char || '-';
		}
		return line;
	};

	_self.pair = function (prefix, value, params) {
		let len = params.offset;
		let char = params.char || null;
		let text = typeof value === 'string' ? value : anxeb.utils.format.number(value, { decimals : 2, comma : true });
		let cif = char != null ? char.length : 0;

		let leftString = '';
		for (let i = 0; i < _columns - prefix.length - len; i++) {
			leftString += ' ';
		}

		_self.add(leftString + prefix + (char || '') + _align(text, len - cif, true), {
			bold   : params.bold || undefined,
			align  : params.align || undefined,
			height : params.height || undefined,
			width  : params.width || undefined,
		});
	};

	_self.add = function (text, options) {
		_lines.push({
			text    : text,
			options : options
		});
	};

	_self.addRow = function (leftText, rightText, middle) {
		_self.add(_align(leftText, middle) + _align(rightText, _columns - middle, true));
	};

	_self.addDashLine = function () {
		_lines.push({
			text : _line()
		});
	};

	_self.addSolidLine = function () {
		_lines.push({
			text : _line('_')
		});
	};

	_self.addSignLine = function () {
		let line = '';
		for (let i = 0; i < _columns - 12; i++) {
			line += '_';
		}
		_lines.push({
			text    : line,
			options : { align : 'center' }
		});
	};

	_self.addJumb = function () {
		_lines.push({ text : '' });
	};

	_self.result = function () {
		let result = '';

		for (let i = 0; i < _lines.length; i++) {
			let line = _lines[i];
			let prefix = 'LN11';

			if (line.options) {
				let $align;
				let $weight;
				let $height;
				let $width;

				if (line.options.align === 'left') {
					$align = 'L';
				} else if (line.options.align === 'right') {
					$align = 'R'
				} else if (line.options.align === 'center') {
					$align = 'C'
				} else {
					$align = 'L'
				}

				if (line.options.bold) {
					$weight = 'B';
				} else {
					$weight = 'N';
				}

				if (line.options.height) {
					$height = line.options.height;
				} else {
					$height = 1;
				}

				if (line.options.width) {
					$width = line.options.width;
				} else {
					$width = 1;
				}

				prefix = $align + $weight + $height + $width;
			}

			result += prefix + ':' + line.text + '\n';
		}

		return result;
	}
};