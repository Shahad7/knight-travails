let moves;
let count = 1;
let root, lastLeaf;
let prevs = [];
let currentPrevs = [];
let node;

//helper functions
function Node(value = null) {
	return {
		value: value,
		prev: null,
	};
}

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

function linkToParent(nodes, parent) {
	if (prevs.length == 0) {
		parent = Node(parent);
		nodes.forEach((elt) => {
			node = Node(elt);
			node.prev = parent;
			prevs.push(node);
		});
	} else {
		prevs.forEach((elt) => {
			if (elt.value.toString() == parent.toString()) parent = elt;
		});

		nodes.forEach((elt) => {
			node = Node(elt);
			node.prev = parent;
			currentPrevs.push(node);
		});
	}
}

function printPath(dest) {
	let toPrint = [];
	prevs.forEach((elt) => {
		if (elt.value.toString() == dest.toString()) dest = elt;
	});
	let node = dest;
	while (node.prev != null) {
		toPrint.push(node.value);
		node = node.prev;
	}
	toPrint.push(node.value);
	toPrint = toPrint.reverse();
	toPrint.forEach((elt) => {
		console.log(elt);
	});
}

//main
function knightTravails(source, destination) {
	if (source.length == 2 && typeof source[0] == 'number') {
		moves = generateMoves(source);
		linkToParent(moves, source);
	} else {
		moves.length = 0;
		source.forEach((elt) => {
			let nextMoves = generateMoves(elt);
			linkToParent(nextMoves, elt);
			moves = moves.concat(nextMoves);
		});
		prevs = currentPrevs;
	}
	if (hasReached(moves, destination)) {
		console.log(`You made it in ${count} moves!  Here's your path:`);
		printPath(destination);
	} else {
		source = moves.slice();
		count++;
		knightTravails(source, destination);
	}
}

knightTravails([1, 1], [8, 8]);
