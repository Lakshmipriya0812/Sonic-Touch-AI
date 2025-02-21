import React from "react";
import { useNavigate } from "react-router-dom";

const allProducts = [
  {
    id: 1,
    name: "Adicolor Classics Joggers",
    category: "clothing",
    price: 63.85,
    image: "/images/joggers.jpg",
  },
  {
    id: 2,
    name: "Nike Sportswear Futura Luxe",
    category: "clothing",
    price: 130.0,
    image: "/images/bag.jpg",
  },
  {
    id: 3,
    name: "Geometric Print Scarf",
    category: "clothing",
    price: 53.0,
    image: "/images/scarf.jpg",
  },
  {
    id: 4,
    name: "Yellow Reserved Hoodie",
    category: "clothing",
    price: 155.0,
    image: "/images/hoodie.jpg",
  },
  {
    id: 5,
    name: "Dogs Food Premium",
    category: "pets",
    price: 29.99,
    image: "/images/dogs-food.jpg",
  },
  {
    id: 6,
    name: "Cat Scratching Post",
    category: "pets",
    price: 45.0,
    image: "/images/cat-scratcher.jpg",
  },
  {
    id: 7,
    name: "Bird Cage Large",
    category: "pets",
    price: 120.0,
    image: "/images/bird-cage.jpg",
  },
  {
    id: 8,
    name: "Fish Tank 20L",
    category: "pets",
    price: 89.99,
    image: "/images/fish-tank.jpg",
  },
];

const ProductGrid = ({ categoryType }) => {
  const navigate = useNavigate();
  const filteredProducts = allProducts.filter(
    (product) => product.category === categoryType
  );

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center text-2xl font-bold mb-6">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-4">
              <h5 className="font-medium text-lg">{product.name}</h5>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
