// analysis specific

const coverageData = [];

// branch can be boolean (for if and br_if) or integer (for br_table, i.e., switches)
function addBranch(location, branch) {
    if (coverageData[location.func] === undefined) {
        coverageData[location.func] = [];
    }
    if (coverageData[location.func][location.instr] === undefined) {
        coverageData[location.func][location.instr] = new Set();
    }
    coverageData[location.func][location.instr].add(branch);
}

function results() {
    for (const [fnIdx, fnCov] of coverageData.entries()) {
        if (fnCov !== undefined) {
            for (const [instrIdx, instrCov] of fnCov.entries()) {
                if (instrCov !== undefined)
                    console.log("function", fnIdx, "instruction", instrIdx, "branches covered:", [...instrCov])
            }
        }
    }
}

// callbacks from analysis API

function if_(location, condition) {
    addBranch(location, condition);
}

function br_if(location, conditionalTarget, condition) {
    addBranch(location, condition);
}

function br_table(location, table, defaultTarget, tableIdx) {
    addBranch(location, tableIdx);
}

function select(location, condition) {
    addBranch(location, condition);
}
