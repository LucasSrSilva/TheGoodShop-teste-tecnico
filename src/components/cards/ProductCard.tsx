import React, { useState } from 'react';
import Toast from "../../libs/Toast"

type ProductCardProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    tags: string[];
    isCart?: boolean;
    onRemove?: (id: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    category,
    image,
    rating,
    tags,
    isCart = false,
    onRemove,
}) => {
    const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' | 'warning' } | null>(null);

    const showToast = (message: string, type?: 'success' | 'error' | 'info' | 'warning') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 2000);
    };

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const product = { id, name, price, category, image, rating, tags };
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        showToast('Produto adicionado ao carrinho!', 'success');
    };

    const handleRemoveFromCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const newCart = cart.filter((item: any) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        if (onRemove) onRemove(id);
        showToast('Produto removido do carrinho!', 'info');
    };

    return (
        <div className="flex flex-col justify-between items-center border border-gray-200 rounded-lg p-4 max-w-xs shadow-md bg-white relative">
            {toast && (
                <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
                    <Toast message={toast.message} type={toast.type} />
                </div>
            )}
            <img
                src={image}
                alt={name}
                className="w-full h-44 object-cover rounded-md"
            />
            <h2 className="text-xl mt-3 mb-1 font-semibold">{name}</h2>
            <div className="font-medium text-lg mb-2">
                R$ {price.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 mb-2">
                category: {category}
            </div>
            <div className="text-sm text-yellow-500 mb-2">
                Avaliação: {rating} ★
            </div>
            <div>
                {tags.map(tag => (
                    <span
                        key={tag}
                        className="inline-block bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs mr-2 mb-1"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
            {isCart ? (
                <button
                    onClick={handleRemoveFromCart}
                    className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition cursor-pointer"
                >
                    Remover do carrinho
                </button>
            ) : (
                <button
                    onClick={handleAddToCart}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    Adicionar ao carrinho
                </button>
            )}
        </div>
    );
};

export default ProductCard;
