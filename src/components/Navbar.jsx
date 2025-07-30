import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/ecomunch logo (transparent).png';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(() =>
        localStorage.getItem("theme") === "dark"
    );
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <nav className="bg-lime-100 dark:bg-gray-800 text-gray-800 dark:text-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-lime-600">
                    <img src={logo} alt="Ecomunch Logo" className="w-8 h-8 object-contain" />
                    <span>EcoMunch</span>
                </Link>

                <div className="flex items-center space-x-4">
                    {/* Display Mode */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="bg-emerald-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-emerald-300 text-sm font-medium"
                    >
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>

                    {/* Default Navbar */}
                    <div className="hidden md:flex space-x-4 text-sm font-medium">
                        <Link to="/about" className="hover:text-lime-600">About Us</Link>
                        <Link to="/products" className="hover:text-lime-600">Our Products</Link>
                    </div>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden block text-xl"
                        aria-label="Toggle Menu"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Navbar */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-start px-4 pb-4 space-y-2 text-sm font-medium">
                    <Link to="/about" className="hover:text-lime-600">About Us</Link>
                    <Link to="/products" className="hover:text-lime-600">Our Products</Link>
                </div>
            )}
        </nav>
    );
}