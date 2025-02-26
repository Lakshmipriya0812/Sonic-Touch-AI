import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: "",
  });

  // ✅ Fetch existing products from backend
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

  // ✅ Handle adding new product (with authentication)
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
      const token = localStorage.getItem("token"); // Get token

      const response = await axios.post(`${API_URL}/api/products`, newProduct, {
        headers: { Authorization: `Bearer ${token}` }, // Send token
      });

      setProducts([...products, response.data.product]);
      setNewProduct({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
        stock: "",
      });
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Handle deleting a product (with authentication)
  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get token

      await axios.delete(`${API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Send token
      });

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ✅ Handle editing a product (prefill form with existing data)
  const handleEditProduct = (product) => {
    setEditingProduct(product._id);
    setNewProduct(product);
  };

  // ✅ Handle updating a product (with authentication)
  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      const token = localStorage.getItem("token"); // Get token

      const response = await axios.put(
        `${API_URL}/api/products/${editingProduct}`,
        newProduct,
        { headers: { Authorization: `Bearer ${token}` } } // Send token
      );

      setProducts(
        products.map((p) =>
          p._id === editingProduct ? response.data.product : p
        )
      );
      setEditingProduct(null);
      setNewProduct({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin - Product Management
      </h1>

      {/* ✅ Product Form (Used for Adding & Updating) */}
      <div className="mb-6 border p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Price ($)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              type="text"
              placeholder="Enter category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Image URL
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Stock Quantity
            </label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* ✅ Align button to the right */}
        <div className="flex justify-end mt-4">
          {editingProduct ? (
            <button
              onClick={handleUpdateProduct}
              className="bg-yellow-500 text-white px-5 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Update Product
            </button>
          ) : (
            <button
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add Product
            </button>
          )}
        </div>
      </div>
      {/* ✅ Product List */}
      <h2 className="text-xl font-semibold mt-6">Existing Products</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product._id}
            className="p-2 border-b flex justify-between items-center"
          >
            <span>
              {product.name} - ${product.price}
            </span>
            <div>
              {/* Edit Button */}
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductManagement;
