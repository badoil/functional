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
// 예를 들면, 객체를 제네레이터를 이용해서 이터러블 프로그래밍
// 즉 어떤 제네레이터든 이터레이터로 만들어서 이터러블 프로그래밍
// 어떤 상황에서든 제네레이터로 그 상황을 다룰 수 있음

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

const g1 = function *(stop) {
    const i = -1;
    while(i < stop) {
        yield 10;
        yield 30;
    }
};

_.go(
    g1(3),
    L.take(1),
    _.reduce((a,b) => a+b),
    console.log
);

// 5. object
const object = entries => _.reduce((obj, [k, v]) => (obj[k] = v, obj), {}, entries);

// 6. mapObject

const mapObject = (f, obj) => _.go(
    obj,
    L.entries,
    _.map(([k, v]) => [k, f(v)]), 
    object
)

console.log(mapObject(x=>x+10, {a:1, b:2, c:3}));


// 7. pick
const obj2 = {a:1, b:2, c:3, d:4, e:5};
const pick = (ks, obj) => _.go(
    ks,
    L.map(k => [k, obj[k]]),
    L.reject(([k, v]) => v === undefined),
    object
)
const pick2 = (ks, obj) => object(_.map(k => [k, obj[k]], ks));

console.log(pick(['b', 'c'], obj2));
// {b:2, c:3}
console.log(pick2(['b', 'c'], obj2));
