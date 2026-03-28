import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    const location = useLocation();
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store=>store.job);
    const [filteredJobs, setFilteredJobs] = useState(allJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get('q') || '';
        if (queryParam && queryParam !== searchedQuery) {
            dispatch(setSearchedQuery(queryParam));
        }
    }, [location.search, searchedQuery, dispatch]);

    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[dispatch])

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <h1 className='font-bold text-4xl mb-2 text-[#001f3f]'>Search Results <span className='text-yellow-300'>({filteredJobs.length})</span></h1>
                <p className='text-gray-600 mb-8'>Browse and apply to jobs that match your skills</p>

                {filteredJobs.length <= 0 ? (
                    <div className='text-center py-16'>
                        <p className='text-xl text-gray-500'>No jobs found matching your criteria</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse