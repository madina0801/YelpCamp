const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected")
})

//*RANDOM CAMP TITLE AND LOCATION
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
	await Campground.deleteMany({})
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '624bc9f6872f6dafd29bc9a0',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias magni distinctio porro, cum dicta perspiciatis nam? Ad maiores, nisi voluptatum obcaecati magni neque omnis ab et nobis amet molestias exercitationem.',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			price,
			geometry: {
				type: "Point",
				coordinates: [
						cities[random1000].longitude,
						cities[random1000].latitude,
				]
		},
			images:
				[
					{
						url: 'https://res.cloudinary.com/dzawq5pok/image/upload/v1650793718/YelpCamp/okbce8ivwnieh480uf4d.jpg',
						filename: 'YelpCamp/okbce8ivwnieh480uf4d',
					},
					{
						url: 'https://res.cloudinary.com/dzawq5pok/image/upload/v1650645465/YelpCamp/shkah9cpiivi9rjupndg.jpg',
						filename: 'YelpCamp/shkah9cpiivi9rjupndg',
					}
				],
		})
		await camp.save();
	}
}

seedDb().then(() => {
	mongoose.connection.close();
});