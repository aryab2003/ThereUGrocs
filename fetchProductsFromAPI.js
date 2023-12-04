import axios from "axios";

const fetchFoodImages = async () => {
  const options = {
    method: "GET",
    url: "https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser",
    params: {
      "nutrition-type": "cooking",
      "category[0]": "generic-foods",
      "health[0]": "alcohol-free",
    },
    headers: {
      "X-RapidAPI-Key": "2c196108a0msha295f3b1da648b7p1839d2jsnafec703275ae",
      "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching food images:", error);
    return [];
  }
};

const generateMockProducts = async () => {
  const mockProducts = [];
  const foodImages = await fetchFoodImages(); 

  for (let i = 1; i <= 100; i++) {
    const randomIndex = Math.floor(Math.random() * foodImages.length);
    const randomImage = foodImages[randomIndex];
    mockProducts.push({
      id: i,
      name: `Product ${i}`,
      imageURL: randomImage,
      price: (Math.random() * 100).toFixed(2),
    });
  }

  return mockProducts;
};

const fetchProductsFromAPI = async () => {
  const mockProducts = await generateMockProducts();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
};

export default fetchProductsFromAPI;
