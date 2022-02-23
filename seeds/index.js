
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('DB CONNECTED!');
};

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// const seedImg = async () => {
//     try {
//         const res = await fetch('https://api.unsplash.com/photos/random', {
//             params: {
//                 client_id: 'CVT6XlSdhSQCPd3Z0zlw2tfN3qmroNErMHhNEx_NSRw',
//                 collections: 483251,
//             },
//         })
//         res = res.json();
//         return res.urls.small
//     } catch (err) {
//         console.log('ERROR!', err);
//     }
// }

const seedDB = async () => {
    await Campground.deleteMany();
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '621248da63c4d923ae06f1cb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse veritatis autem blanditiis officiis dolores beatae accusantium modi sed, dicta iste. Explicabo fugit veniam iure obcaecati ratione laudantium ipsum quas laborum?',
            price,
            image: [
                {
                    url: 'https://res.cloudinary.com/dxtupl3ke/image/upload/v1645539698/YelpCamp/ggx8nshotyh9frod47ar.png',
                    filename: 'YelpCamp/ggx8nshotyh9frod47ar',
                },
                {
                    url: 'https://res.cloudinary.com/dxtupl3ke/image/upload/v1645539697/YelpCamp/pdemo7tflgp1wpyv0qfy.jpg',
                    filename: 'YelpCamp/pdemo7tflgp1wpyv0qfy'
                },
                {
                    url: 'https://res.cloudinary.com/dxtupl3ke/image/upload/v1645539696/YelpCamp/gb9lrgcawds4z6ituywc.jpg',
                    filename: 'YelpCamp/gb9lrgcawds4z6ituywc'
                }
            ]
        });
        await camp.save();
    }

}



seedDB().then(() => {
    mongoose.connection.close();
    console.log('DB CONNECTION CLOSED!');
})