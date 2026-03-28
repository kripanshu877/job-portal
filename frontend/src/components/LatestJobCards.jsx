import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin, DollarSign, Users } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='p-6 rounded-lg shadow-md bg-white border-l-4 border-l-[#001f3f] cursor-pointer transition-all duration-300 transform hover:shadow-xl hover:scale-105 hover:border-l-[#F83002]'
        >
            <div className='flex justify-between items-start mb-4'>
                <div>
                    <h2 className='font-bold text-xl text-[#001f3f]'>{job?.company?.name}</h2>
                    <div className='flex items-center gap-1 text-gray-500 text-sm mt-1'>
                        <MapPin className='h-4 w-4' />
                        <p>India</p>
                    </div>
                </div>
            </div>
            
            <div className='mb-4'>
                <h3 className='font-bold text-lg text-gray-800'>{job?.title}</h3>
                <p className='text-sm text-gray-600 line-clamp-2 mt-2'>{job?.description}</p>
            </div>
            
            <div className='flex flex-wrap gap-2 mb-4'>
                <Badge className='bg-blue-100 text-blue-700 font-semibold' variant="outline">
                    <Users className='h-3 w-3 mr-1' />
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-orange-100 text-[#F83002] font-semibold' variant="outline">{job?.jobType}</Badge>
                <Badge className='bg-purple-100 text-purple-700 font-semibold' variant="outline">
                    <DollarSign className='h-3 w-3 mr-1' />
                    {job?.salary}LPA
                </Badge>
            </div>
            
            <button className='w-full bg-[#001f3f] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#003d7a] transition-all duration-300 transform hover:scale-105'>
                Apply Now
            </button>
        </div>
    )
}

export default LatestJobCards