
import React from 'react';
import HeroImage from "../assests/heroImage.png"
import { Link } from 'react-router-dom';
const HeroSection = () => {
	return (
		<section className="py-16 bg-gray-100">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
					<div className="flex justify-center">
						<img
							src={HeroImage}
							alt="Network Inventory Hero"
							className="w-full max-w-2xl rounded-xl shadow-lg"
						/>
					</div>
					<div>
						<h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Welcome to Network Inventory</h1>
						<p className="text-lg md:text-xl text-gray-700 mb-6">
							Manage and track your network devices efficiently with our intuitive platform.
						</p>
						<button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
							<Link to={'/inventory'}>Get Started</Link>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
