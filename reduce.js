const FxJS = require("fxjs");
const _ = require("fxjs/Strict");
const L = require("fxjs/Lazy");
const C = require("fxjs/Concurrency");
const { add, delay, go, reduce, rangeL } = require("fxjs");


// const users = [
//     { name: 'arch1', age: 28 },
//     { name: 'arch2', age: 29 },
//     { name: 'arch3', age: 27 },
// ]

// const total = _.reduce((total, u) => total+u.age, 0, users);
// console.log('total:', total);

// const addF = (a, b) => a + b;
// const ages = L.map(u => u.age);

// const total2 = _.reduce(addF, ages(users));
// console.log('total2: ', total2)

// 3. query, queryToObject
const obj1 = {
    a: 1,
    b: undefined,
    c: "a",
    d: "d",
}

function query1(obj) {
    let result = '';
    for (const k in obj1) {
        let v = obj1[k];
        if (k === undefined) continue;
        if (result !== '') {
            result += '&';
        }
        result += k + "=" + v;
    }
    console.log('result: ', result);
}
query1(obj1);

const join  = _.curry((sep, iter) => _.reduce((a, b) => `${a}${sep}${b}`, iter))

const query2 = _.pipe(
    Object.entries,
    L.reject(([_, v]) => v === undefined),
    L.map(join('=')),
    join('&')
)
console.log(query2(obj1));


// 4. query to object
const objectToString = query2(obj1);
// console.log('objectToString: ', objectToString);
// const split = _.curry((sep, str) => str.split(sep));

// const queryToObject = _.pipe(
//     split('&'),
//     L.map(split('=')),
//     L.map(([k, v]) => ({[k]: v})),
//     _.reduce(Object.assign)   
// )

// console.log(queryToObject(objectToString));

// 5. find 대신 L.filter
const split = _.curry((sep, str) => str.split(sep));

const queryToObject = _.pipe(
    split('&'),
    L.map(split('=')),
    _.map(([k, v]) => ({[k]: v})),
    // _.reduce(Object.assign)   
)

console.log('result: ', queryToObject(objectToString));

const result = _.pipe(
    L.map(v => Object.keys(v)),
    _.filter((v) => v === 'a'),
    // _.take(1),
    // _.each(console.log)
)

console.log(result(queryToObject(objectToString)));