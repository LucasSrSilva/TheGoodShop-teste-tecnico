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

    const handleRemove = (id: string) => {
        const updatedItems = items.filter(item => item.id !== id)
        setItems(updatedItems)
        localStorage.setItem('cart', JSON.stringify(updatedItems))
    }

    return (
        <div>
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">

                    <p className="text-lg font-semibold text-gray-200">Seu carrinho está vazio!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item, idx) => (
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
                            onRemove={() => handleRemove(item.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Cart
