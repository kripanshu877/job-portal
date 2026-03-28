import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message || "Something went wrong.");
        }
    }
    return (
        <div className='bg-white shadow-md sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16'>
                <Link to="/">
                    <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
                        Job<span className='text-[#001f3f]'>Portal</span>
                    </h1>
                </Link>
                <div className='flex items-center gap-8'>
                    <ul className='hidden md:flex font-medium items-center gap-8'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='text-gray-700 hover:text-[#001f3f] transition-colors duration-300'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='text-gray-700 hover:text-[#001f3f] transition-colors duration-300'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='text-gray-700 hover:text-[#001f3f] transition-colors duration-300'>Home</Link></li>
                                    <li><Link to="/jobs" className='text-gray-700 hover:text-[#001f3f] transition-colors duration-300'>Jobs</Link></li>
                                    <li><Link to="/browse" className='text-gray-700 hover:text-[#001f3f] transition-colors duration-300'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login"><Button variant="outline" className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#001f3f] hover:bg-[#003d7a] text-white font-semibold">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#001f3f] transition-all duration-300">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 shadow-xl">
                                    <div className=''>
                                        <div className='flex gap-3 space-y-2 mb-4'>
                                            <Avatar className="cursor-pointer h-12 w-12">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-bold text-lg'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-500'>{user?.profile?.bio || "User"}</p>
                                            </div>
                                        </div>
                                        <div className='border-t pt-4'>
                                            <div className='flex flex-col gap-3 text-gray-700'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-[#001f3f] transition-colors duration-300'>
                                                            <User2 className='h-4 w-4' />
                                                            <Link to="/profile" className='font-medium'>View Profile</Link>
                                                        </div>
                                                    )
                                                }

                                                <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-red-600 transition-colors duration-300'>
                                                    <LogOut className='h-4 w-4' />
                                                    <button onClick={logoutHandler} className='font-medium'>Logout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar
