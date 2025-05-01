import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    subsubcategory: "",
    image: "",
    description: "",
    stock: "",
    size: [],
    color: [],
    material: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleAddProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.image ||
      !newProduct.description ||
      !newProduct.stock
    ) {
      console.error("All fields are required.");
      alert("Please fill all fields before adding the product.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/api/products`, newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts([...products, response.data.product]);
      setNewProduct({
        name: "",
        price: "",
        category: "",
        subcategory: "",
        subsubcategory: "",
        image: "",
        description: "",
        stock: "",
        size: [],
        color: [],
        material: "",
      });
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin - Product Management
      </h1>

      <div className="mb-6 border p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Size (comma-separated)
            </label>
            <input
              type="text"
              placeholder="Enter sizes (e.g. S,M,L)"
              value={newProduct.size.join(",")}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  size: e.target.value.split(","),
                })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Color (comma-separated)
            </label>
            <input
              type="text"
              placeholder="Enter colors (e.g. Red,Blue)"
              value={newProduct.color.join(",")}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  color: e.target.value.split(","),
                })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Material
            </label>
            <input
              type="text"
              placeholder="Enter material (e.g. Cotton, Polyester)"
              value={newProduct.material}
              onChange={(e) =>
                setNewProduct({ ...newProduct, material: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductManagement;
