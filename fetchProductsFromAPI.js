import axios from "axios";

const fetchAllProductsFromAPI = async (totalPages = 10) => {
  const allProducts = [];

  const fetchPage = async (pageNumber) => {
    const options = {
      method: "GET",
      url: "https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser",
      params: {
        "nutrition-type": "cooking",
        category: "generic-foods",
        health: "alcohol-free",
        page: pageNumber,
      },
      headers: {
        "X-RapidAPI-Key": "2c196108a0msha295f3b1da648b7p1839d2jsnafec703275ae",
        "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const products = response.data.hints.map((hint, index) => ({
        id: index + 1,
        name: hint.food.label,
        imageURL: hint.food.image,
        price: (Math.random() * 100).toFixed(2),
      }));

      allProducts.push(...products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchPromises = [];
  for (let i = 1; i <= totalPages; i++) {
    fetchPromises.push(fetchPage(i));
  }

  await Promise.all(fetchPromises);

  return allProducts;
};

export default fetchAllProductsFromAPI;
