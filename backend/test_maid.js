const axios = require('axios');

const maids = [
  {
    name: "Priya Sharma",
    services: ["cleaning", "laundry"],
    hourlyRate: 150,
    rating: 4.8,
    contact: "+91 98765 43210",
    experience: "5 years",
    availability: "Mon-Sat, 9 AM - 6 PM",
    description: "Experienced in maintaining clean and organized homes. Punctual and trustworthy."
  },
  {
    name: "Lakshmi Devi",
    services: ["cooking", "cleaning"],
    hourlyRate: 200,
    rating: 4.9,
    contact: "+91 87654 32109",
    experience: "8 years",
    availability: "Daily, 7 AM - 2 PM",
    description: "Expert cook specializing in South Indian cuisine. Also provides cleaning services."
  },
  {
    name: "Sunita Kumari",
    services: ["babysitting", "cleaning"],
    hourlyRate: 180,
    rating: 4.6,
    contact: "+91 76543 21098",
    experience: "3 years",
    availability: "Flexible timings",
    description: "Caring and responsible babysitter with experience in child care and light housekeeping."
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
