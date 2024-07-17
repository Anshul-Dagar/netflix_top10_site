'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const DataTable = ({ week }) => {
  const [data, setData] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: 'weekly_rank', direction: 'ascending' })

  useEffect(() => {
    const fetchData = async () => {
        console.log ("Selected week: ", week)
        if(week) {
      const { data, error } = await supabase
        .schema('netflix_top10')
        .from('netflix_top10')
        .select('*')
        .eq('week', week)
    
        if(error) {
            console.error('Error fetching data: ', error)
        }
        else{
            console.log("Fetched data" ,data)
            setData(data)
            
        }
    }
}
     fetchData()
  }, [week])

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 py-4">
      <thead>
        <tr>
          {['show_title', 'weekly_rank', 'weekly_hours_viewed', 'runtime', 'weekly_views'].map(column => (
            <th
              key={column}
              onClick={() => handleSort(column)}
              className="cursor-pointer px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.replace('_', ' ')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sortedData.map((row, idx) => (
          <tr key={idx}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.show_title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.weekly_rank}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.weekly_hours_viewed}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.runtime}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.weekly_views}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable

