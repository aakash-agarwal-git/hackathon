const fs = require("fs"); // Import the file system module

const data = {
    "Agriculture": [
      "farming news",
      "crop reports",
      "agricultural technology",
      "sustainable farming",
      "agriculture policies",
      "livestock",
      "agribusiness"
    ],
    "Art": [
      "art exhibitions",
      "art history",
      "art movements",
      "artist profiles",
      "gallery reviews"
    ],
    "Artificial Intelligence": [
      "AI research",
      "machine learning",
      "robotics",
      "AI ethics",
      "AI applications",
      "AI startups",
      "AI policy"
    ],
    "Automobile": [
      "car reviews",
      "auto industry news",
      "vehicle safety",
      "electric vehicles",
      "car maintenance",
      "driving tips",
      "auto shows",
      "car technology",
      "automotive trends"
    ],
    "Aviation": [
      "airline news",
      "aviation technology",
      "flight safety",
      "pilot news",
      "air traffic control",
      "aviation industry",
      "airports"
    ],
    "Books": [
      "book releases",
      "author interviews",
      "literary reviews",
      "bestsellers",
      "literary awards",
      "reading trends",
      "book clubs"
    ],
    "Business": [
      "stock market",
      "corporate earnings",
      "mergers and acquisitions",
      "startups",
      "small business",
      "industry reports",
      "trade agreements"
    ],
    "Crime": [
      "homicides",
      "robberies",
      "fraud",
      "court trials",
      "law enforcement",
      "criminal investigations",
      "public safety"
    ],
    "Culture": [
      "cultural festivals",
      "heritage sites",
      "literature",
      "art movements",
      "traditions",
      "cultural diversity",
      "museums"
    ],
    "Defense": [
      "military news",
      "defense policies",
      "military technology",
      "defense contracts",
      "armed forces",
      "military strategy",
      "national security"
    ],
    "Economy": [
      "economic policies",
      "GDP reports",
      "inflation",
      "unemployment rates",
      "trade deals",
      "economic forecasts",
      "economic growth"
    ],
    "Education": [
      "education reform",
      "school rankings",
      "university research",
      "scholarships",
      "online learning",
      "teaching methods",
      "student life"
    ],
    "Electronics": [
      "gadgets",
      "smartphones",
      "home tech",
      "electronics reviews",
      "tech news",
      "consumer tech trends",
      "product launches"
    ],
    "Energy": [
      "renewable energy",
      "oil and gas",
      "energy policies",
      "sustainable energy",
      "nuclear energy",
      "energy companies",
      "energy conservation"
    ],
    "Entertainment": [
      "movies",
      "television",
      "music",
      "celebrity gossip",
      "gaming",
      "streaming",
      "awards",
      "theater",
      "books",
      "comics"
    ],
    "Environment": [
      "climate change",
      "renewable energy",
      "wildlife conservation",
      "environmental policies",
      "pollution",
      "sustainable living",
      "natural resources"
    ],
    "Fashion": [
      "runway shows",
      "designer profiles",
      "fashion trends",
      "style tips",
      "fashion week",
      "sustainable fashion",
      "fashion industry news"
    ],
    "Finance": [
      "investment strategies",
      "retirement planning",
      "stock market analysis",
      "banking services",
      "loans",
      "personal budgeting",
      "economic indicators"
    ],
    "Fitness": [
      "workout routines",
      "fitness trends",
      "exercise tips",
      "gym reviews",
      "home workouts",
      "personal training",
      "fitness equipment"
    ],
    "Food": [
      "recipes",
      "restaurants",
      "food trends",
      "culinary techniques",
      "nutrition",
      "diet",
      "food reviews"
    ],
    "Gaming": [
      "video game releases",
      "game reviews",
      "eSports",
      "gaming industry news",
      "game guides",
      "gaming technology",
      "gaming culture"
    ],
    "Health": [
      "fitness",
      "nutrition",
      "medicine",
      "diseases",
      "mental health",
      "wellness",
      "public health",
      "alternative medicine",
      "parenting",
      "aging"
    ],
    "History": [
      "historical events",
      "archaeological discoveries",
      "historical figures",
      "war history",
      "ancient civilizations",
      "historical documentaries",
      "museum exhibits"
    ],
    "Insurance": [
      "health insurance",
      "life insurance",
      "car insurance",
      "home insurance",
      "travel insurance",
      "insurance policies",
      "insurance claims"
    ],
    "Law": [
      "legal news",
      "court cases",
      "legislation",
      "law firms",
      "legal advice",
      "criminal law",
      "civil rights"
    ],
    "Lifestyle": [
      "fashion trends",
      "travel destinations",
      "recipes",
      "home decor",
      "personal development",
      "leisure activities",
      "social media trends"
    ],
    "Local News": [
      "city council",
      "local government",
      "community events",
      "local elections",
      "neighborhood news",
      "local businesses",
      "municipal services"
    ],
    "Media": [
      "media industry news",
      "journalism",
      "advertising trends",
      "media ethics",
      "broadcasting",
      "digital media",
      "media mergers"
    ],
    "Music": [
      "new releases",
      "concerts",
      "music festivals",
      "artist interviews",
      "album reviews",
      "music awards",
      "industry news"
    ],
    "National News": [
      "domestic policies",
      "national elections",
      "federal government",
      "congress",
      "senate",
      "national security",
      "countrywide events"
    ],
    "Parenting": [
      "childcare tips",
      "parenting advice",
      "education",
      "children's health",
      "family activities",
      "parenting styles",
      "parenting challenges"
    ],
    "Pets": [
      "pet care",
      "animal health",
      "pet adoption",
      "pet training",
      "exotic pets",
      "pet products",
      "pet behavior"
    ],
    "Politics": [
      "government",
      "elections",
      "law",
      "policy",
      "international relations",
      "war",
      "diplomacy",
      "crime",
      "social issues",
      "human rights"
    ],
    "Real Estate": [
      "property prices",
      "housing market trends",
      "real estate investment",
      "mortgage rates",
      "home buying tips",
      "commercial real estate",
      "property management"
    ],
    "Religion": [
      "faith news",
      "religious events",
      "spirituality",
      "interfaith dialogue",
      "religious leaders",
      "religious holidays",
      "theological discussions"
    ],
    "Retail": [
      "retail news",
      "shopping trends",
      "e-commerce",
      "consumer behavior",
      "retail technology",
      "store openings",
      "retail industry"
    ],
    "Science": [
      "technology",
      "space exploration",
      "medicine",
      "environment",
      "physics",
      "chemistry",
      "biology",
      "engineering",
      "mathematics",
      "archaeology"
    ],
    "Social Issues": [
      "poverty",
      "inequality",
      "human rights",
      "social justice",
      "activism",
      "community initiatives",
      "social policy"
    ],
    "Space": [
      "space missions",
      "astronomy",
      "space technology",
      "cosmology",
      "space exploration",
      "astronauts",
      "space research"
    ],
    "Sports": [
      "football",
      "basketball",
      "baseball",
      "soccer",
      "hockey",
      "tennis",
      "golf",
      "olympics",
      "extreme sports",
      "cricket"
    ],
    "Sustainability": [
      "sustainable living",
      "eco-friendly products",
      "green technology",
      "sustainability initiatives",
      "environmental impact",
      "sustainable business",
      "climate action"
    ],
    "Technology": [
      "computers",
      "internet",
      "gadgets",
      "software",
      "artificial intelligence",
      "cybersecurity",
      "robotics",
      "social media",
      "science",
      "gaming"
    ],
    "Telecommunications": [
      "telecom news",
      "5G technology",
      "internet providers",
      "mobile networks",
      "telecom policies",
      "fiber optics",
      "satellite communication"
    ],
    "Transportation": [
      "public transit",
      "traffic news",
      "aviation",
      "railways",
      "shipping industry",
      "transport policies",
      "urban mobility"
    ],
    "Travel": [
      "tourist attractions",
      "travel tips",
      "flight deals",
      "hotel reviews",
      "travel advisories",
      "cultural experiences",
      "adventure travel"
    ],
    "Urban Development": [
      "city planning",
      "urban renewal",
      "infrastructure",
      "smart cities",
      "urban policy",
      "housing development",
      "public spaces"
    ],
    "Veterans": [
      "military news",
      "veteran benefits",
      "veteran health",
      "military families",
      "veteran organizations",
      "war history",
      "veteran stories"
    ],
    "Weather": [
      "weather forecasts",
      "hurricanes",
      "tornadoes",
      "floods",
      "droughts",
      "seasonal changes",
      "climate patterns"
    ],
    "Wellness": [
      "mental health",
      "self-care",
      "stress management",
      "meditation",
      "wellness retreats",
      "holistic health",
      "mindfulness"
    ],
    "World": [
      "global news",
      "current events",
      "international affairs",
      "travel",
      "culture",
      "humanitarian crises",
      "natural disasters",
      "climate change",
      "conflict",
      "development"
    ]
  };


const sortedData = Object.keys(data).sort();

const finalData = {};
for (const category of sortedData) {
  finalData[category] = data[category];
}

const jsonData = JSON.stringify(finalData, null, 2); // Stringify with indentation

fs.writeFile("sorted_data.json", jsonData, (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("Data successfully written to sorted_data.json");
  }
});
