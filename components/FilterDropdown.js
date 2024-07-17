'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
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
      console.log(error)
    }
    fetchWeeks()
  }, [])

  return (
    <Select onChange={(e) => setWeek(e.target.value)} className="mb-4 p-2 border">
        <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select date" />
      </SelectTrigger>
      <SelectContent>
      {weeks.sort().reverse().map(week => (
        <SelectItem key={week} value={week}>{week}</SelectItem>
      ))}
      </SelectContent>
    </Select>
  )
}

export default FilterDropdown

