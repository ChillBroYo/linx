import moment from 'moment';
import seedrandom from 'seedrandom';

const messages = new Map([
	[0, 'We think you and [NAME] might get along well. Say hi!'],
	[1, 'You guys like the same memes. Must meant to be. Time to say hi!'],
	['default', 'There’s no better time to make a new friend than during a pandamic. Say hi!']
]);

const dayOfYear = moment().format('DDD');

export function getImageMessage() {
	const result = 3 % (dayOfYear + 2);
	return messages.get(result) || messages.get('default');
}

export function getRandomImage(images) {
	const rand = seedrandom(dayOfYear.toString());
	const result = Math.floor(rand() * images);
	return result;
}
