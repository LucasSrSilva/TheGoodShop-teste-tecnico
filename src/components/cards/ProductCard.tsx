import React from 'react';

type ProductCardProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    tags: string[];
};

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    description,
    price,
    category,
    image,
    rating,
    tags,
}) => {
    return (
        <div className="flex flex-col justify-between items-center border border-gray-200 rounded-lg p-4 max-w-xs shadow-md bg-white">
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
            <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                onClick={() => {
                    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    if (!cart.includes(id)) {
                        cart.push(id);
                        localStorage.setItem('cart', JSON.stringify(cart));
                    }
                }}
            >
                Adicionar ao carrinho
            </button>
        </div>
    );
};

export default ProductCard;
