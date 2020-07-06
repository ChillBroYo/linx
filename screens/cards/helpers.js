const symbols = new Map([
	[1, ['neutral_face', 'joy']],
	[2, ['triumph', 'clap']],
	[3, ['nauseated_face', 'heart_eyes']],
	[4, ['hankey', 'heart']],
	[5, ['toilet', 'dollar']],
	['default', ['-1', '+1']]
]);

export function getSymbols(index) {
	return symbols.get(Number(index)) || symbols.get('default');
}