import React, { useState } from 'react'

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<>
			<header className="flex items-center justify-between w-full px-6 py-4 bg-gray-800 text-white shadow-md">
				<a href="/"><h1 className="text-2xl font-bold font-title">TheGoodShop</h1></a>
				<nav className="hidden md:flex items-center space-x-8">
					<a href="/products" className="hover:text-gray-300 transition">Produtos</a>
					<a href="/about" className="hover:text-gray-300 transition">Sobre</a>
					<a href="/contact" className="hover:text-gray-300 transition">Contato</a>
					<button className="ml-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"><i className="bi bi-cart"></i></button>
				</nav>
				<button
					className="md:hidden flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
					onClick={toggleMenu}
					aria-label="Open menu"
					aria-expanded={isMenuOpen}
				>
					Menu
				</button>
			</header>
			{isMenuOpen && (
				<div className="fixed inset-0 z-50 bg-opacity-60 flex justify-end" onClick={toggleMenu}>
					<menu
						className="bg-gray-800 text-white w-3/4 max-w-xs h-full p-6 shadow-lg flex flex-col space-y-6"
						onClick={e => e.stopPropagation()}
					>
						<div className="flex justify-between items-center mb-8">
							<span className="text-xl font-bold">Menu</span>
							<button
								onClick={toggleMenu}
								className="text-gray-400 hover:text-white"
								aria-label="Close menu"
							>
								✕
							</button>
						</div>
						<nav className="flex flex-col space-y-4">
							<a href="/" className="hover:text-gray-300 transition" onClick={toggleMenu}>Home</a>
							<a href="/about" className="hover:text-gray-300 transition" onClick={toggleMenu}>About</a>
							<a href="/contact" className="hover:text-gray-300 transition" onClick={toggleMenu}>Contact</a>
							<button className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">Cart</button>
						</nav>
					</menu>
				</div>
			)}
		</>
	)
}

export default Header
