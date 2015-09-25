// trunk: r1 r2 r3 r4 r5
//        G     *     B
// findBug(1, 5) === 3

function hasBug(revision) {
    // return true if revision has a bug
    // typeof revision === 'number'
    // this is given
    return revision >= 3 ? true : false
}

function findBug(goodRevision, badRevision) {
    // returns the first bad revision between goodRevision and badRevision
    // your code here!

    var testRange = badRevision - goodRevision // testRange = 4
    // guard statement
    if(testRange === 1) {return badRevision}

    // divide search range, determine viable test case
    var testCase = Math.ceil(testRange/2) + goodRevision // testCase = 3, what about odd testRanges?

    // test with ternary for next range
    return hasBug(testCase) ? findBug(goodRevision, testCase): findBug(testCase,badRevision )

    // recurse
}
