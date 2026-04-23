import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const BACKED_URL = 'https://69df62c9d6de26e119294a16.mockapi.io'
const API_URL = `${BACKED_URL}/api/v1/todo`

function App() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [products, setData] = useState(null)

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

    async function addStock(id) {
        setLoading(true)
        try {
            const product = products.find(p => p.id === id)

            await axios.put(`${API_URL}/products/${id}`, {
                ...product,
                stock: Number(product.stock) + 1
            })
            Loadingproducts()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDeleteMyStock(id) {
        setLoading(true)
        try {
            const product = products.find(p => p.id === id)

            await axios.put(`${API_URL}/products/${id}`, {
                ...product,
                had: false
            })

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

    const myProducts = products ? products.filter(p => p.had) : []
    const totalStock = myProducts.reduce(
        (sum, p) => sum + Number(p.stock),0
    )
    const totalPrice = myProducts.reduce(
        (sum, p) => sum + (Number(p.price) * Number(p.stock)),0
    )
    const netPrice = totalPrice

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-2">My Stock List</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-4xl mx-auto">

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow">
                    <p className="text-gray-400 text-sm">Total Stock</p>
                    <h2 className="text-2xl font-bold text-yellow-400">
                        {totalStock}
                    </h2>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow">
                    <p className="text-gray-400 text-sm">Total Price</p>
                    <h2 className="text-2xl font-bold text-green-400">
                        ${totalPrice.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow">
                    <p className="text-gray-400 text-sm">Net Price</p>
                    <h2 className="text-2xl font-bold text-indigo-400">
                        ${netPrice.toLocaleString()}
                    </h2>
                </div>

            </div>

            {/* ✅ LIST */}
            <div className="grid grid-cols-1 gap-4 ">
                {products && products.map((product) => (
                    product.had && (
                        <div key={product.id} className="p-4 mb-4 bg-gray-800 rounded-xl border border-gray-700 flex flex-row items-center gap-6 w-full max-w-4xl mx-auto shadow-lg">

                            <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col items-start gap-1 min-w-0">
                                <h2 className="text-xl font-bold text-white truncate">{product.name}</h2>
                                <p className="text-indigo-400 text-sm mb-2">{product.category}</p>

                                <div className="flex items-center gap-4">
                                    <p className="text-2xl font-black text-green-400">
                                        ${product.price}
                                    </p>

                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${product.stock < 5
                                            ? 'bg-red-900/50 text-red-400'
                                            : 'bg-gray-700 text-gray-300'
                                        }`}>
                                        Stock: {product.stock}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-24">
                                <button
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 rounded-lg text-sm font-semibold transition"
                                    onClick={() => addStock(product.id)}
                                >
                                    Add
                                </button>

                                <button
                                    className="bg-rose-600 hover:bg-rose-500 text-white py-1.5 rounded-lg text-sm font-semibold transition"
                                    onClick={() => handleDeleteMyStock(product.id)}
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default App