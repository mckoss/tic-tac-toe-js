// Return {pos, side}
function findBestMove(board, side) {
    var best;
    var bestPos;

    // Either we've already won, or our opponent
    // has won.  Either way, make no move.
    if (hasWon(board) !== 0) {
        return {
            pos: undefined,
            side: hasWon(board)
        };
    }
    if (isFull(board)) {
        return {
            pos: undefined,
            side: 0
        }
    }
    for (var pos = 0; pos < 9; pos++) {
        if (board[pos] !== 0) {
            continue;
        }
        board[pos] = side;
        var result = findBestMove(board, -side);
        board[pos] = 0;
        if (result.side === side) {
            return {
                pos: pos,
                side: side
            }
        }
        // 
        if (best === undefined ||
            best === -side && result.side === 0) {
            best = result.side;
            bestPos = pos;
        }
    }
    return {pos: bestPos, side: best};
}

function isFull(board) {
    for (var pos = 0; pos < 9; pos++) {
        if (board[pos] == 0) {
            return false;
        }
    }
    return true;
}

var ranks = [
    // Rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // Columns
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // Diagonals
    [0, 4, 8], [2, 4, 6]
];

// Returns 1 if X wins, -1 if O wins, 0 otherwise
function hasWon(board) {
    for (var i = 0; i < ranks.length; i++) {
        var rank = ranks[i];
        var sum = board[rank[0]] + board[rank[1]] + board[rank[2]];
        if (Math.abs(sum) === 3) {
            return board[rank[0]];
        }
    }
    return 0;
}

// Testing functions

function testAll() {
    testIsFull();
    testHasWon();
    testFindBestMove();
    testSelfPlay();
}

function testFindBestMove() {
    startTest("findBestMove");

    var testCases = [
        {
            board: [1, -1, 1, -1, 1, -1, 1, -1, 0],
            side: 1,
            expect: {pos: undefined, side: 1}
        },

        {
            board: [-1, 0, 0, 0, 1, 0,  0, 1, 0],
            side: 1,
            expect: {pos: 1, side: 1}
        },

        {
            board: [-1, 0, 0, -1, 1, 1, 0, 0, 0],
            side: 1,
            expect: {pos: 6, side: 0}
        },

        {
            board: [-1, 1, 0,  0, 1, 0,  0, 0, 0],
            side: -1,
            expect: {pos: 7, side: 0}
        },

        {
            board: [-1, -1, 1, 0, 1, 0, -1, 0, 1],
            side: 1,
            expect: {pos: 5, side: 1}
        }
    ];

    for (var i = 0; i < testCases.length; i++) {
        var testCase = testCases[i];
        var result = findBestMove(testCase.board, testCase.side);
        assertEqual(result.pos, testCase.expect.pos, `${i+1}. Correct postion.`);
        assertEqual(result.side, testCase.expect.side, `${i+1}. Correct Side.`);
    }

    endTest();
}

function testSelfPlay() {
    startTest("testSelfPlay");

    var testCases = [
        {
            board: [1, -1, 1, -1, 1, -1, 1, -1, 0],
            side: 1,
            expect: []
        },

        {
            board: [-1, 0, 0, 0, 1, 0, 0, 0, 1],
            side: -1,
            expect: [2, 1, 7, 3, 5, 6]
        },

        {
            board: [-1, -1, 1, 0, 1, 0, -1, 0, 1],
            side: 1,
            expect: [5]
        },

        {
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            side: 1,
            expect: [0, 4, 1, 2, 6, 3, 5, 7, 8]
        },
    ];

    for (var i = 0; i < testCases.length; i++) {
        var testCase = testCases[i];
        var result = selfPlay(testCase.board, testCase.side);
        assertEqual(result, testCase.expect, `${i+1}. Move list.`);
     }

    endTest();
}

function testIsFull() {
    startTest("testIsFull");
    assertEqual(isFull([0,0,0, 0,0,0, 0,0,0]), false, "empty board");
    assertEqual(isFull([1,1,1, 1,1,1, 1,1,1]), true, "full of Xs");
    assertEqual(isFull([1,1,1, 1,0,1, 1,1,1]), false, "mixed board");
    assertEqual(isFull([1,-1, 1, -1, 1, -1, 1, -1, 1]), true, "mixed full");
    endTest();
}

function testHasWon() {
    startTest("testHasWon");
    var testCases = [
        {
            board: [1, 1, -1, 0, -1, 0, -1, 0, 0],
            expect: -1
        },

        {
            board: [1, 1, -1, 0, -1, 0, 0, 0, 0],
            expect: 0
        },

        {
            board: [-1, -1, 1, 0, 0, 1, 0, 0, 1],
            expect: 1
        },

        // Dialogals
        {
            board: [1, 0, 0, 0, 1, 0, 0, 0, 1],
            expect: 1
        },

        {
            board: [0, 0, 1, 0, 1, 0, 1, 0, 0],
            expect: 1
        }
    ];

    for (var i = 0; i < testCases.length; i++) {
        var testCase = testCases[i];
        assertEqual(hasWon(testCase.board), testCase.expect, `${i}`);
    }

    // Test all rows.
    for (var i = 0; i < 3; i++) {
        var board = [0,0,0,0,0,0,0,0,0];
        for (var j = 0; j < 3; j++) {
            board[i*3 + j] = 1;
        }
        assertEqual(hasWon(board), 1, `Row ${i}`);
    }

    // Test all columns.
    for (var i = 0; i < 3; i++) {
        var board = [0,0,0,0,0,0,0,0,0];
        for (var j = 0; j < 3; j++) {
            board[i + j*3] = 1;
        }
        assertEqual(hasWon(board), 1, `Column ${i}`);
    }

    endTest();
}

function selfPlay(board, side) {
    var moves = [];

    while (!isFull(board) && hasWon(board) === 0) {
        var result = findBestMove(board, side);
        board[result.pos] = side;
        moves.push(result.pos);
        side = -side;
    }

    return moves;
}

// Testing helper functions

var testCount = 0;
var passCount = 0;

function assertEqual(val, expected, name) {
    testCount += 1;

    // HACK: Convert values to JSON format and compare
    // that - to handle arrays and objects better.
    // Note: Might be wrong for objects...
    val = JSON.stringify(val);
    expected = JSON.stringify(expected);

    if (val === expected) {
        passCount += 1;
    } else {
        console.error(`${name} failed (${val} != ${expected})`);
    }
}

function startTest(name) {
    console.log(`Testing ${name}`);
    testCount = 0;
    passCount = 0;
}

function endTest(name) {
    console.log(`  Passed ${passCount} out of ${testCount} tests.`);
}

function displayTestCount() {

}

// 1, 1, 2, 3, 5, 8, 13, 21, ....
function fib(n) {
    if (n <= 2) {
        return 1;
    }
    return fib(n-2) + fib(n-1);
}