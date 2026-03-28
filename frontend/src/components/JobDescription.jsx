import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar'
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const navigate = useNavigate();

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
                    <div className='flex items-center justify-between mb-8'>
                        <div>
                            <h1 className='font-bold text-3xl text-[#001f3f]'>{singleJob?.title}</h1>
                            <p className='text-gray-600 mt-2'>{singleJob?.company?.name}</p>
                            <div className='flex items-center gap-2 mt-4'>
                                <Badge className='bg-blue-100 text-blue-700 font-bold'>{singleJob?.postion} Positions</Badge>
                                <Badge className='bg-orange-100 text-[#F83002] font-bold'>{singleJob?.jobType}</Badge>
                                <Badge className='bg-purple-100 text-purple-700 font-bold'>₹{singleJob?.salary}LPA</Badge>
                            </div>
                        </div>
                        <Button
                        onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-lg font-bold px-8 py-2 ${isApplied ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-[#001f3f] hover:bg-[#003d7a] text-white'}`}>
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>
                    <div className='border-t-2 border-t-gray-300 pt-6'>
                        <h2 className='font-bold text-2xl mb-6 text-[#001f3f]'>Job Details</h2>
                        <div className='space-y-4'>
                            <div className='flex gap-4'>
                                <h3 className='font-bold text-gray-700 min-w-[120px]'>Role:</h3>
                                <p className='text-gray-800'>{singleJob?.title}</p>
                            </div>
                            <div className='flex gap-4'>
                                <h3 className='font-bold text-gray-700 min-w-[120px]'>Location:</h3>
                                <p className='text-gray-800'>{singleJob?.location}</p>
                            </div>
                            <div className='flex gap-4'>
                                <h3 className='font-bold text-gray-700 min-w-[120px]'>Description:</h3>
                                <p className='text-gray-800'>{singleJob?.description}</p>
                            </div>
                            <div className='flex gap-4'>
                                <h3 className='font-bold text-gray-700 min-w-[120px]'>Experience:</h3>
                                <p className='text-gray-800'>{singleJob?.experience} years</p>
                            </div>
                            <div className='flex gap-4'>
                                <h3 className='font-bold text-gray-700 min-w-[120px]'>Salary:</h3>
                                <p className='text-gray-800 font-semibold text-green-600'>₹{singleJob?.salary}LPA</p>
                            </div>
                            <div className='flex gap-4'>
                                <h3 className='font-bold text-gray-700 min-w-[120px]'>Applicants:</h3>
                                <p className='text-gray-800'>{singleJob?.applications?.length}</p>
                            </div>
                            <div className='flex gap-4'>
                                <h3 className='font-bold text-gray-700 min-w-[120px]'>Posted:</h3>
                                <p className='text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription