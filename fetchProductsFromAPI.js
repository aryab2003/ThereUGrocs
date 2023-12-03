const fetchFoodImages = async () => {
  const API_KEY = "b0c2e993fbmsh15f6c675a933a3dp105740jsn29b53efc4405";
  try {
    const response = await fetch(
      "https://restaurants222.p.rapidapi.com/currencies"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data; // Assuming the API returns an array of image URLs
  } catch (error) {
    console.error("Error fetching food images:", error);
    return [];
  }
};

const generateMockProducts = async () => {
  const mockProducts = [];
  const foodImages = await fetchFoodImages(); // Fetch food images from your API

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

const mockProducts = await generateMockProducts(); // Call the function to get mock products

const fetchProductsFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
};

export default fetchProductsFromAPI;
