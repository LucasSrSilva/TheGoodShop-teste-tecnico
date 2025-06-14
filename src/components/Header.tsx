import React, { useState } from 'react'

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	}
	return (
		<>
			<header className='flex w-full bg-gray-600 justify-between'>
				<h1>Logo</h1>
				<div className='hidden md:block'>

					<nav className='hidden md:block'>
						<ul className='flex'>
							<li><a href="/">Home</a></li>
							<li><a href="/about">About</a></li>
							<li><a href="/contact">Contact</a></li>
						</ul>
					</nav>
					<div>
						<button>Cart</button>
					</div>
				</div>
				<div>
					<button className='block md:hidden' onClick={toggleMenu}>Menu</button>
				</div>
			</header>
			{isMenuOpen && (
				<menu>
					<nav>
						<a href="/">Home</a>
						<a href="/about">About</a>
						<a href="/contact">Contact</a>
						<button>Cart</button>
						<button onClick={toggleMenu}>Close</button>
					</nav>
				</menu>
			)}
		</>
	)
}

export default Header
