import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Job = ({job}) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='p-5 rounded-xl shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-200'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-3 my-4'>
                <div className='p-3 rounded-lg bg-indigo-50'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-semibold text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-xl mb-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex flex-col sm:flex-row items-stretch gap-3 mt-5'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline" className='flex-1'>Details</Button>
                {user ? (
                    <Button className="bg-[#7209b7] text-white flex-1" onClick={() => navigate(`/description/${job?._id}`)}>
                        Apply Now
                    </Button>
                ) : (
                    <Button className="bg-[#7209b7] text-white flex-1" onClick={() => navigate('/login')}>
                        Login to Apply
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Job