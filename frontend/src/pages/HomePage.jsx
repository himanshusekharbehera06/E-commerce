import React, { useEffect } from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { ProductList } from '../features/products/components/ProductList'
import { resetAddressStatus, selectAddressStatus } from '../features/address/AddressSlice'
import { useDispatch, useSelector } from 'react-redux'
import {Footer} from '../features/footer/Footer'

export const HomePage = () => {
const products = [
  {
    id: 1,
    name: "Stylish Sneakers",
    price: "$120",
    image: "https://images.unsplash.com/photo-1618354698321-12b3082e51e8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Elegant Watch",
    price: "$250",
    image: "https://images.unsplash.com/photo-1516822003757-9f19c0b7d7c4?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Leather Bag",
    price: "$180",
    image: "https://images.unsplash.com/photo-1589187151864-6c81c43d90a1?auto=format&fit=crop&w=400&q=80",
  },
];
  const dispatch=useDispatch()
  const addressStatus=useSelector(selectAddressStatus)

  useEffect(()=>{
    if(addressStatus==='fulfilled'){

      dispatch(resetAddressStatus())
    }
  },[addressStatus])

  return (
    <>
     <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Upgrade Your Style
          </h1>
          <p className="mb-6 text-lg md:text-xl">
            Discover the latest trends in fashion, accessories, and more.
          </p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1520975698516-7ee5d946f30c?auto=format&fit=crop&w=600&q=80"
            alt="People shopping"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-purple-600 font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-purple-600 text-white py-16 px-6 md:px-20 text-center rounded-tl-3xl rounded-tr-3xl mt-16">
        <h3 className="text-2xl md:text-4xl font-bold mb-4">
          Subscribe for Updates
        </h3>
        <p className="mb-6">Get the latest offers and new arrivals directly to your inbox.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-lg w-full sm:w-1/3 text-gray-800"
          />
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Subscribe
          </button>
        </div>
      </section>
    </div>

    <Navbar isProductList={true}/>
    <ProductList/>
    <Footer/>
    </>
  )
}
