import React, { useContext } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';

const Wishlist = () => {
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const { addToCart: addToCartContext } = useContext(CartContext);

  const handleMoveToCart = async (product) => {
    await addToCartContext(product, null, null); 
        await removeFromWishlist(product._id);
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <FaHeart className="text-gray-400 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added any treasures yet.</p>
        <Link
          to="/categorylandingpage" 
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">My Wishlist</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          item && item.product ? (
            <div
              key={item.product._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <Link to={`/product/${item.product._id}`} className="block">
                <img
                  src={item.product.image || '/placeholder-image.jpg'} 
                  alt={item.product.name || 'Product Image'}
                  className="w-full h-48 object-contain border-b"
                />
              </Link>
              
              <div className="p-4 flex flex-col flex-grow">
                <Link to={`/product/${item.product._id}`} className="block mb-2 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
                    {item.product.name || 'Unnamed Product'}
                  </h3>
                </Link>
                
                <p className="text-xl font-bold text-gray-900 mb-4">
                  ${item.product.price ? item.product.price.toFixed(2) : 'N/A'}
                </p>
                
                <div className="mt-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                  <button
                    onClick={() => handleMoveToCart(item.product)}
                    className="flex w-full sm:w-auto items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    <FaShoppingCart />
                    Move to Cart
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(item.product._id)}
                    title="Remove from Wishlist"
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ) : null 
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 