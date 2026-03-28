import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        options: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        options: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    const updateQuery = (value) => {
        dispatch(setSearchedQuery(value));
    }

    useEffect(() => {
        const query = searchText.trim() || selectedValue;
        updateQuery(query);
    }, [searchText, selectedValue]);

    const clearFilters = () => {
        setSelectedValue('');
        setSearchText('');
        updateQuery('');
    }

    return (
        <div className='w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-200'>
            <div className='flex items-start justify-between gap-3'>
                <div>
                    <h1 className='font-bold text-xl'>Filter Jobs</h1>
                    <p className='text-sm text-gray-500 mt-1'>Search by title, company, location or select a filter.</p>
                </div>
                <Button variant='outline' size='sm' className='h-9' onClick={clearFilters}>Clear</Button>
            </div>

            <div className='mt-4'>
                <Label className='text-sm font-medium'>Search</Label>
                <Input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder='Search skills, location, role...'
                    className='mt-2'
                />
            </div>

            <div className='mt-5 space-y-6'>
                <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
                    {filterData.map((group, groupIndex) => (
                        <div key={group.filterType} className='space-y-3'>
                            <h2 className='text-sm font-semibold text-gray-700'>{group.filterType}</h2>
                            <div className='grid grid-cols-2 gap-2'>
                                {group.options.map((option, optionIndex) => {
                                    const optionId = `filter-${groupIndex}-${optionIndex}`;
                                    return (
                                        <label
                                            key={optionId}
                                            htmlFor={optionId}
                                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-colors ${selectedValue === option ? 'border-[#001f3f] bg-[#e6f0ff]' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <RadioGroupItem value={option} id={optionId} />
                                            <span className='text-sm'>{option}</span>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}

export default FilterCard