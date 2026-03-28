import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
                <header className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
                    <div>
                        <h1 className='text-4xl font-bold text-[#001f3f]'>Find Your <span className='text-yellow-400'>Dream Job</span></h1>
                        <p className='text-gray-500 mt-1'>Browse open roles and filter by location, industry, or salary.</p>
                    </div>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-sm text-gray-600'>Showing</span>
                        <span className='text-2xl font-bold text-[#001f3f]'>{filterJobs.length}</span>
                        <span className='text-sm text-gray-500'>job{filterJobs.length === 1 ? "" : "s"}</span>
                    </div>
                </header>

                <div className='flex flex-col lg:flex-row gap-8 mt-8'>
                    <aside className='lg:w-80 w-full'>
                        <div className='sticky top-24'>
                            <FilterCard />
                        </div>
                    </aside>

                    <main className='flex-1'>
                        {filterJobs.length <= 0 ? (
                            <div className='text-center py-16'>
                                <p className='text-xl text-gray-500'>No jobs found matching your criteria</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        key={job?._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Jobs