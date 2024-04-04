const test = 5;
db.getCollection("dogs").find({})

use course

db.createCollection('cars')

db.dogs.stats()


db.dogs.find({})

db.getCollection('dogs').find({})

db.getCollection('dogs').insertOne({
    name: 'burek',
    age: 3,
    features: ['zjada kapcie', 'pozwala się głaskać', 'rudy'],
})

ObjectId("66086e6ae6f9ff29001279f9") !== 66086e6ae6f9ff29001279f9


db.getCollection('dogs').insertMany(
    [
        {
            name: 'Mamba',
            age: 2,
            features: ['poluje na samochody', 'szczerzy zęby', 'czarna'],
        },
        {
            name: 'Pirat',
            age: 4,
            features: ['ma tylko jedno oko', 'pozwala się głaskać', 'kudłaty'],
        },
        {
            name: 'Azor',
            age: 10,
            features: ['świszczy'],
        },
        {
            name: 'Kajtek',
            age: 15,
            features: ['zjada trawę', 'poluje na Azora'],
        },
    ]
)

db.getCollection('dogs').find({ name: "Kajtek" })

db.getCollection('dogs').find({ age: {
        $gt: 5
    } })

db.getCollection('dogs').find({ age: {
        $eq: 4
    } })


db.getCollection('dogs').find({ features: 'zjada trawę'})

db.getCollection('dogs').find({ features: {
        $eq: 'zjada trawę'
    }})

db.getCollection('dogs').find({
    age: {
        $gt: 3
    }
}, {name: 1})

db.getCollection('dogs').find({
    age: {
        $gt: 3
    }
}, {name: 1, _id: 0})

db.getCollection('dogs').find({
    age: {
        $gt: 3
    }
}, {name: 0})

db.getCollection('dogs').find({
    age: {
        $gt: 3
    }
}, {name: 0, age: 1})

db.getCollection('dogs').find({
    age: {
        $gt: 3
    }
}, {_id: 0, age: 1})

db.getCollection('dogs').find({
    age: {
        $gt: 2
    }
}, {name:1, age: 1})

db.getCollection('dogs').find({
    age: {
        $gt: 2
    }
}, {name:1, age: 1}).sort({
    name: 1,
    age: -1
})

db.getCollection('dogs').find({
    age: {
        $gt: 2
    }
}, {name:1, age: 1}).sort({
    name: 1,
    age: -1
})

db.getCollection('dogs').find({
    age: {
        $gt: 2
    }
}, {name:1, age: 1}).sort({
    name: 1,
    age: -1
}).limit(2)

db.getCollection('dogs').find({
    age: {
        $gt: 2
    }
}, {name:1, age: 1}).sort({
    name: 1,
    age: -1
})
    .skip(1)
    .limit(3)

db.getCollection('dogs').count()

db.getCollection('dogs').count({age: 3})

db.getCollection('dogs').insertOne(
    {
        "name" : "Klusia",
        "age" : 10.0,
        "features" : [
            "w kształcie kadłuba",
            "szara"
        ],
        "owner" : {
            "name" : "Jola",
            "age" : 27.0,
            "address" : "Kraków"
        }
    }
)

db.getCollection('dogs').find({
    age: { $type: 'number' }
})

db.getCollection('dogs').find({
    owner: { $exists: true }
})

db.getCollection('dogs').find({
    name: { $regex: 'A' }
})

db.getCollection('dogs').find({
    name: { $regex: /A/ }
})

db.getCollection('dogs').find({
    name: { $regex: /A/i }
})

db.getCollection('dogs').find({
    name: /A/i
})

db.getCollection('dogs').find({
    name: /A/i,
    age: 10
})

db.getCollection('dogs').find({
    $or: [
        {name: "Kajtek", age: 15},
        {age: 3}
    ]
})

db.getCollection('dogs').find({
    $and: [
        {$or: [{name: "Kajtek", age: 15}]},
        {age: 15}
    ]
})

const cursor = db.dogs.find();
while (cursor.hasNext()) {
    obj = cursor.next();
    print(obj['name']);
}

db.dogs.deleteOne({});

db.getCollection("dogs").deleteOne({ name: 'Kajtek'});

db.getCollection("dogs").updateOne(
    {},
    {},
    {},
);

db.getCollection("dogs").updateOne(
    {name: "Azor"},
    {$set: { name: "Tom" }, $inc: {age: 2}},
    {},
);

db.getCollection("dogs").find(
    {name: "Azor"}
);

db.getCollection("dogs").updateMany(
    {},
    {$inc: {age: 1}},
    {},
);

db.getCollection("dogs").find({})


db.getCollection("dogs").updateOne(
    {name: "Azor"},
    {$set: { name: "Tom", age: 15, features: ['some text']}, $setOnInsert: {createdAt: new Date()}},
    { upsert: true },
);

db.getCollection("dogs").updateOne(
    {name: "burek"},
    {$set: { age: 10, updatedAt: new Date() }, $setOnInsert: {createdAt: new Date()}},
    { upsert: true },
);
