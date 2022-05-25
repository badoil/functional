const FxJS = require("fxjs");
const _ = require("fxjs/Strict");
const L = require("fxjs/Lazy");
const C = require("fxjs/Concurrency");
const { add, delay, go, reduce, rangeL } = require("fxjs");

// 객체지향과 함께 사용하기, 사용자 정의 객체를 이터러블 프로그래밍

// 1. map, set

const m = new Map();
m.set('a', 1);
m.set('b', 2);
m.set('c', 3);

const alphabet = _.go(
    m,
    _.filter(([k, v]) => v % 2),
    a => new Map(a)
)

console.log(alphabet);


// 2. model, collection
// 함수형 프로그래밍은 특정 패러다임을 대체하는 것이 아니라
// 언어의 특정 문법을 대체하는 것

class Model {
    constructor(attrs = {}) {
        this._attrs = attrs;
    }

    get(k) {
        return this._attrs[k];
    }

    set(k, v) {
        this._attrs[k] = v;
        return this;
    }


}

class Collection {
    constructor(models = []) {
        this._models = models;
    }

    at(idx) {
        return this._models[idx];
    }

    add(model) {
        this._models.push(model);
        return this;
    }

    // *[Symbol.iterator]() {
    //     for (const model of this._models) {
    //         yield model;
    //     }
    // }

    *[Symbol.iterator]() {
        yield *this._models;
    }
}

const coll = new Collection();
coll.add(new Model({id: 1, name: 'a'}));
coll.add(new Model({id: 2, name: 'b'}));
coll.add(new Model({id: 3, name: 'c'}));

console.log('coll: ', coll.at(0).get('id'));
console.log('models: ', coll._models);

_.go(
    coll, 
    L.map((m) => m.get("name")),
    _.each(console.log)
)