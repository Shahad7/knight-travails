function generateMoves([x, y]) {
	let moves = [];
	if (isValid([x + 2, y + 1])) moves.push([x + 2, y + 1]);
	if (isValid([x + 2, y - 1])) moves.push([x + 2, y - 1]);
	if (isValid([x - 2, y + 1])) moves.push([x - 2, y + 1]);
	if (isValid([x - 2, y - 1])) moves.push([x - 2, y - 1]);
	if (isValid([x + 1, y + 2])) moves.push([x + 1, y + 2]);
	if (isValid([x + 1, y - 2])) moves.push([x + 1, y - 2]);
	if (isValid([x - 1, y + 2])) moves.push([x - 1, y + 2]);
	if (isValid([x - 1, y - 2])) moves.push([x - 1, y - 2]);

	return moves;
}

function isValid([x, y]) {
	if (x >= 1 && x <= 8 && y <= 8 && y >= 1) return true;
	else return false;
}

function hasReached(locations, dest) {
	locations = locations.map((elt) => elt.toString());
	dest = dest.toString();
	if (locations.includes(dest)) return true;
	else return false;
}

let moves;
let i = 1;

function knightTravails(source, destination) {
	if (source.length == 2 && typeof source[0] == 'number') {
		moves = generateMoves(source);
	} else {
		moves.length = 0;
		source.forEach((elt) => {
			moves = moves.concat(generateMoves(elt));
		});
	}
	if (hasReached(moves, destination)) console.log(i + ' moves');
	else {
		source = moves.slice();
		i++;
		knightTravails(source, destination);
	}
}

knightTravails([3, 3], [5, 4]);
