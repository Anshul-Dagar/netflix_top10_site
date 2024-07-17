'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectGroup,
    SelectLabel,
    SelectValue,
  } from "@/components/ui/select"

const FilterDropdown = ({ setWeek }) => {
  const [weeks, setWeeks] = useState([])

  useEffect(() => {
    const fetchWeeks = async () => {
      const { data, error } = await supabase
      .schema('netflix_top10')  
      .from('distinct_week')
        .select('*')
      setWeeks(data.map(item => item.week))
      console.log('Fetched Weeks: ', data.map(item => item.week ))
    }
    fetchWeeks()
  }, [])

  const handleChange = (value) => {
    console.log("Selected week :", value)
    setWeek(value)
  }

  return (
    <Select onValueChange={handleChange} className="mb-4 p-2 border">
        <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select date" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
      <SelectLabel>Weeks</SelectLabel>
      {weeks.sort().reverse().map(week => (
        <SelectItem key={week} value={week}>{week}</SelectItem>
      ))}
        </SelectGroup>
      </SelectContent>
      
    </Select>
  //   <select onChange={handleChange} className="mb-4 p-2 border">
  //   {weeks.sort().reverse().map(week => (
  //     <option key={week} value={week}>{week}</option>
  //   ))}
  // </select>

  )
}

export default FilterDropdown

