import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Product from './component/Product.jsx'

const BACKED_URL = 'https://69df62c9d6de26e119294a16.mockapi.io'
const API_URL = `${BACKED_URL}/api/v1/todo`

function App() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [products, setData] = useState(null)
  const [tagetProduct, setTargetProduct] = useState(null)

  const [Edit, setEdit] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  })

  async function Loadingproducts() {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/products`)
      setData(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(id) {
    const found = products.find((p) => p.id === id)
    setTargetProduct(found)

    setEdit({
      name: found.name,
      category: found.category,
      price: found.price,
      stock: found.stock
    })
  }

  async function handleDelete(id) {
    setLoading(true)
    try {
      await axios.delete(`${API_URL}/products/${id}`)
      Loadingproducts()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate() {
    if (!tagetProduct) return

    setLoading(true)
    try {
      await axios.put(`${API_URL}/products/${tagetProduct.id}`, Edit)
      setTargetProduct(null)
      Loadingproducts()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    Loadingproducts()
  }, [])

  if (loading) {
    return (
      <div className="p-8 bg-gray-900 min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-6">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>

      {tagetProduct && (
        <Product {...tagetProduct} handleDelete={handleDelete} handleEdit={handleEdit} />
      )}

      <div className="p-4 mb-4 bg-gray-800 rounded-xl border border-gray-700 flex flex-row items-center gap-6 w-full max-w-4xl mx-auto shadow-lg">

        <input
          type="text"
          value={Edit.name}
          onChange={(e) => setEdit({...Edit, name: e.target.value})}
          placeholder="Product Name"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
        />

        <input
          type="text"
          value={Edit.category}
          onChange={(e) => setEdit({...Edit, category: e.target.value})}
          placeholder="Category"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
        />

        <input
          type="number"
          value={Edit.price}
          onChange={(e) => setEdit({...Edit, price: e.target.value})}
          placeholder="Price"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
        />

        <input
          type="number"
          value={Edit.stock}
          onChange={(e) => setEdit({...Edit, stock: e.target.value})}
          placeholder="Stock"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
        />

        {/* ✅ FIX: เรียก update */}
        <button
          onClick={handleUpdate}
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-semibold transition"
        >
          Update
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 ">
        {products && products.map((product) => (
          <Product
            key={product.id}
            {...product}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default App