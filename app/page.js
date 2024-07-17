'use client'

import FilterDropdown from "@/components/FilterDropdown";
import { useState } from 'react'
import Title from "@/components/Title";
import DataTable from "@/components/DataTable";

export default function Home() {
  const [week, setWeek] =useState('')
  return (
    <main className="container mx-auto px-4">
      <Title /> 
      <FilterDropdown setWeek={setWeek}  />
      {week && <DataTable week={week} />}
    </main>
  );
}
