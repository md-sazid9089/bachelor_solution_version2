const axios = require('axios');

const maids = [
  {
    name: "Rokeya Sultana",
    services: ["cleaning", "laundry"],
    hourlyRate: 150,
    rating: 4.8,
    contact: "015432 123456",
    experience: "5 years",
    availability: "Mon-Sat, 9 AM - 6 PM",
    description: "Experienced in maintaining clean and organized homes. Punctual and trustworthy."
  },
  {
    name: "Rashma Khatun",
    services: ["cooking", "cleaning"],
    hourlyRate: 200,
    rating: 4.9,
    contact: "01732 123456",
    experience: "8 years",
    availability: "Daily, 7 AM - 2 PM",
    description: "Expert cook specializing in Bangladeshi cuisine. Also provides cleaning services."
  },
  {
    name: "Kamrun Nahar Sultana",
    services: ["Cooking", "cleaning"],
    hourlyRate: 180,
    rating: 4.6,
    contact: "+01632 123456",
    experience: "3 years",
    availability: "Flexible timings",
    description: "Neat and Clean."
  }
];

async function seedMaids() {
  for (const maid of maids) {
    try {
      const res = await axios.post('http://localhost:3001/api/maids', maid);
      console.log('Added:', res.data.name);
    } catch (err) {
      console.error('Error adding maid:', maid.name, err.response?.data || err.message);
    }
  }
}

seedMaids();