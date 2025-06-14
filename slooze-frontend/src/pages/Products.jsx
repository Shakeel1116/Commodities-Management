import { useState } from 'react'

const mockProducts = [
  { id: 1, name: 'Wheat', category: 'Grains', stock: 45, price: '$5.20' },
  { id: 2, name: 'Corn', category: 'Grains', stock: 32, price: '$4.80' },
  { id: 3, name: 'Rice', category: 'Grains', stock: 8, price: '$7.50' },
  { id: 4, name: 'Coffee', category: 'Beverages', stock: 15, price: '$12.30' },
]

export default function Products({ role, darkMode }) {
  const [products, setProducts] = useState(mockProducts)
  const [showForm, setShowForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    stock: 0,
    price: ''
  })

  const updateStock = (id, newStock) => {
    setProducts(products.map(p => 
      p.id === id ? {...p, stock: newStock} : p
    ))
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    setProducts([...products, {
      ...newProduct,
      id: products.length + 1
    }])
    setNewProduct({ name: '', category: '', stock: 0, price: '' })
    setShowForm(false)
  }

  return (
    <div className={`products-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="products-header">
        <h2>Product Inventory</h2>
        {role === 'manager' && (
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="add-product-btn"
          >
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleAddProduct} className="product-form">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            required
          />
          <button type="submit">Save Product</button>
        </form>
      )}

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              {role === 'manager' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className={product.stock < 10 ? 'low-stock' : ''}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
                {role === 'manager' && (
                  <td>
                    <button 
                      onClick={() => {
                        const newStock = prompt('Enter new stock:', product.stock)
                        if (newStock) updateStock(product.id, parseInt(newStock))
                      }}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}