import { useEffect, useState } from 'react'
import ProductCard from './cards/ProductCard'

const Cart = () => {
    const [items, setItems] = useState<any[]>([])

    useEffect(() => {
        const storedItems = localStorage.getItem('cart')
        if (storedItems) {
            setItems(JSON.parse(storedItems))
        }
    }, [])

    const groupedItems = items.reduce((acc: Record<string, any>, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, quantity: 1 }
        } else {
            acc[item.id].quantity += 1
        }
        return acc
    }, {})

    const uniqueItems = Object.values(groupedItems)

    const handleRemove = (id: string) => {
        const updatedItems = items.filter(item => item.id !== id)
        setItems(updatedItems)
        localStorage.setItem('cart', JSON.stringify(updatedItems))
    }

    const totalPrice = items.reduce(
        (sum, item) => sum + (typeof item.price === 'number' ? item.price : Number(item.price) || 0),
        0
    )

    return (
        <div>
            <div id="total-price" className="text-3xl font-bold text-gray-400 py-5">
                Total: R$ {totalPrice.toFixed(2)}
            </div>
            {uniqueItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-lg font-semibold text-gray-200">Seu carrinho está vazio!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {uniqueItems.map((item: any, idx: number) => (
                        <ProductCard
                            isCart
                            key={item.id || idx}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={typeof item.price === 'number' ? item.price : Number(item.price) || 0}
                            category={item.category}
                            image={item.image}
                            rating={item.rating}
                            tags={Array.isArray(item.tags) ? item.tags : []}
                            quantity={item.quantity}
                            onRemove={() => handleRemove(item.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Cart
