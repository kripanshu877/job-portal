import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

const LatestJobs = () => {
    const { allJobs, searchedQuery } = useSelector(store=>store.job);
    const navigate = useNavigate();

    const filteredJobs = React.useMemo(() => {
        if (!searchedQuery) return allJobs;
        const query = searchedQuery.toLowerCase();
        return allJobs.filter((job) => {
            return (
                job.title.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                job.location.toLowerCase().includes(query)
            );
        });
    }, [allJobs, searchedQuery]);
   
    return (
        <div className='w-full bg-gray-50 py-16'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center mb-12'>
                    <h1 className='text-3xl sm:text-4xl font-bold'>
                        <span className='text-[#001f3f]'>Latest & Top </span>
                        <span className='text-[#F83002]'>Job Openings</span>
                    </h1>
                    {filteredJobs.length > 6 && (
                        <button 
                            onClick={() => navigate('/browse')}
                            className='text-[#001f3f] font-semibold hover:text-[#003d7a] transition-colors duration-300'
                        >
                            View all →
                        </button>
                    )}
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                        filteredJobs.length <= 0 ? (
                            <span className='col-span-full text-center text-gray-500 text-lg py-8'>No Job Available</span>
                        ) : (
                            filteredJobs.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default LatestJobs