'use client'

import FilterDropdown from "@/components/FilterDropdown";
import { useState } from 'react'
import Title from "@/components/Title";
import Image from "next/image";

export default function Home() {
  const [week, setWeek] =useState('')
  return (
    <main className="container mx-auto px-4">
      <Title /> 
      <FilterDropdown setWeek={setWeek}  />
    </main>
  );
}
