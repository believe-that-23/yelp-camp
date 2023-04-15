require('dotenv').config()
const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')
const dbKey = process.env.DB_KEY;

mongoose.connect(dbKey)
    .then(() => {
        console.log('connection open');
    })
    .catch(err => console.log(err))

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    // for (let i = 0; i < 50; i++) {
    //     const random1000 = Math.floor(Math.random() * 1000);
    //     const price = Math.floor(Math.random() * 20) + 10;
    //     const camp = new Campground({
    //         author: '643858c209ab04da207ba319',
    //         location: `${cities[random1000].city}, ${cities[random1000].state}`,
    //         title: `${sample(descriptors)} ${sample(places)}`,
    //         geometry: {
    //             type: "Point",
    //             coordinates: [
    //                 cities[random1000].longitude,
    //                 cities[random1000].latitude,
    //             ]
    //         },
    //         images: [{
    //             url: 'https://res.cloudinary.com/di27hiv3z/image/upload/v1681494982/YelpCamp/bqlvx7jhpaxoqlbfhoss.png',
    //             filename: 'YelpCamp/bqlvx7jhpaxoqlbfhoss',
    //         },
    //         {
    //             url: 'https://res.cloudinary.com/di27hiv3z/image/upload/v1681495152/YelpCamp/hvjkj6xiskvfvd5crdan.png',
    //             filename: 'YelpCamp/hvjkj6xiskvfvd5crdan',
    //         }
    //         ],
    //         description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero aliquid obcaecati dolorem dolor voluptatibus aliquam, dignissimos architecto cumque. Facere quidem quaerat tenetur debitis fuga enim ratione natus vero mollitia quod!',
    //         price
    //     })
    //     await camp.save();
    // }
}

seedDB().then(() => {
    mongoose.connection.close();
})

