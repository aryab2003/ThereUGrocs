// Mock data simulating products fetched from an API
const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    imageURL: "https://via.placeholder.com/150", // Replace with actual image URLs
    price: "$19.99",
  },
  {
    id: 2,
    name: "Product 2",
    imageURL: "https://via.placeholder.com/150", // Replace with actual image URLs
    price: "$29.99",
  },
  {
    id: 3,
    name: "Product 3",
    imageURL: "https://via.placeholder.com/150", // Replace with actual image URLs
    price: "$29.99",
  },
  {
    id: 4,
    name: "Product 4",
    imageURL: "https://via.placeholder.com/150", // Replace with actual image URLs
    price: "$29.99",
  },
  {
    id: 5,
    name: "Product 5",
    imageURL: "https://via.placeholder.com/150", // Replace with actual image URLs
    price: "$29.99",
  },
  {
    id: 6,
    name: "Product 6",
    imageURL: "https://via.placeholder.com/150", // Replace with actual image URLs
    price: "$29.99",
  },
];

// Simulated fetch function (similar to an API call)
const fetchProductsFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts); // Simulated API response with product data
    }, 1000); // Simulating a delay as if fetching from a server
  });
};

export default fetchProductsFromAPI;
