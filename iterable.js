const FxJS = require("fxjs");
const _ = require("fxjs/Strict");
const L = require("fxjs/Lazy");
const C = require("fxjs/Concurrency");
const { add, delay, go, reduce, rangeL } = require("fxjs");


// 객체를 이터러블 프로그래밍으로 다루기
// 1. values

const obj1 = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
}

L.values = function *(obj) {
    for(const k in obj) {
        console.log('k:', k)
        yield obj[k];
    }
};

L.values(obj1);

// 2. entries
// 이터러블아 아닌 어떤 값을 이터러블화 하는 어떤 함수 L.values / L.entries 둠으로써
// 이후에 이터르블 프로그링을 할 수 있도록 하는 것

// 제네레이터 함수를 통해 이터러블로 만듬
L.entries = function *(obj) {
    for(const k in obj) {
        yield [k, obj[k]];
    }
};

_.go(
    obj1,
    L.entries,
    L.filter(([_, v]) => v % 2),
    L.map(([k, v]) => ({[k]: v})),
    _.reduce(Object.assign),
    console.log
)

// 3. keys
L.keys = function *(obj) {
    for(const k in obj) {
        yield k;
    } 
}

_.go(
    obj1,
    L.keys,
    _.each(console.log)    
)

// 4. 어떠한 값이든 이터러블 프로그래밍으로 다루기