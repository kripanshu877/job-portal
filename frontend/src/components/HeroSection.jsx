import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate(`/browse?q=${encodeURIComponent(query)}`);
    }

    return (
        <div className='relative w-full min-h-[600px] overflow-hidden' style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            {/* Solid color overlay */}
            <div className='absolute inset-0 bg-[#003d7a] opacity-70'></div>

            {/* Content */}
            <div className='relative z-10 flex items-center justify-center min-h-[600px] px-4 sm:px-6 lg:px-8'>
                <div className='text-center w-full'>
                    <div className={`flex flex-col gap-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <span className='mx-auto px-4 py-2 rounded-full bg-white bg-opacity-20 text-white font-medium backdrop-blur-sm border border-white border-opacity-30 inline-block w-fit'>No. 1 Job Hunt Website</span>
                        
                        <div>
                            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight'>
                                Search, Apply & Get Your <br className='hidden sm:block' />
                                <span className='text-yellow-300'>Dream Job</span>
                            </h1>
                        </div>
                        
                        <p className='text-base sm:text-lg text-gray-100 max-w-2xl mx-auto'>Browse your lucrative opportunity with all the qualifications, perks and benefits you deserve.</p>
                        
                        {/* Search Bar */}
                        <div className='flex flex-col sm:flex-row w-full max-w-2xl shadow-2xl rounded-lg items-stretch gap-2 mx-auto bg-white p-2 transition-all duration-300 hover:shadow-3xl'>
                            <div className='flex-1 flex items-center px-4'>
                                <input
                                    type="text"
                                    placeholder='Job title, company or keyword'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                                    className='outline-none border-none w-full text-gray-700 font-medium'
                                />
                            </div>
                            <Button 
                                onClick={searchJobHandler} 
                                className="bg-[#001f3f] hover:bg-[#003d7a] text-white font-bold px-8 rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                <Search className='h-5 w-5 mr-2' />
                                Find
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection