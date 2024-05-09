"use client"
 
import * as React from "react" 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
 
const countries = [
    { label: "Poland", id: 171 },
    { label: "France", id: 73 },
    { label: "German", id: 80 },
    { label: "Spain", id: 199 },
    { label: "Portugal", id: 172 },
    { label: "Russia", id: 177 },
    { label: "Japan", id: 107 },
    { label: "Korea", id: 112 },
    { label: "China", id: 44 }
];
 
function SelectCountry(props) {
    
    return (
        <Select {...props}>
            <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                {countries.map((country, index) => (
                    <SelectItem key={index} value={country.id}>{country.label}</SelectItem>
                ))}
                
            </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectCountry;