import React from 'react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    { name: "Frontend Developer", icon: "🎨" },
    { name: "Backend Developer", icon: "⚙️" },
    { name: "Full-stack", icon: "🔗" },
    { name: "UI/UX Design", icon: "✨" },
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate(`/browse?q=${encodeURIComponent(query)}`);
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <h2 className='text-3xl font-bold text-center mb-12'>
                <span className='text-[#001f3f]'>Popular</span> Categories
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                {
                    category.map((cat, index) => (
                        <div key={index} className='group'>
                            <Button 
                                onClick={()=>searchJobHandler(cat.name)} 
                                variant="outline" 
                                className="w-full py-6 px-4 rounded-lg text-base font-semibold border-2 border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            >
                                <span className='mr-2 text-xl'>{cat.icon}</span>
                                {cat.name}
                            </Button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryCarousel