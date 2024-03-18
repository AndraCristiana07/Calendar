import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DayDrawer from "./DayDrawer";
// import { startOfMonth, endOfMonth } from 'date-fns'

export default function Calendar() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const navigate = useNavigate()
    const [month, setMonth] = useState(months[new Date().getMonth()])
    const [year, setYear] = useState(new Date().getFullYear())
    const [days, setDays] = useState([])
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null)
    const monthIndex = months.indexOf(month);
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();


    const [open, setOpen] = useState(false)


    useEffect(() => {
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
        const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
        const days = [];
        

        
        //before the start of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        
        // days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        //after the end of the month
        const totalDays = days.length;
        const remainingEmptyCells = 7 - (totalDays % 7);
        for (let i = 0; i < remainingEmptyCells; i++) {
            days.push(null);
        }

        setDays(days);
    }, [month, year])

    const handleDayClick = (day) => {
        setSelectedDay(day)
        setOpen(true)
    };
    const handleCloseDrawer = () => {
        setOpen(false)
        setSelectedDay(null)
    };
    const handleEventAdd = (day, event) => {
        const newEvent = { ...event, day };
    };


    return (
        <div>
            <h1 style={{display:"flex", justifyContent:"center"}}>Calendar</h1>
            <Stack direction="row" spacing={2} style={{display:"flex", justifyContent:"center"}} padding={2}>
                <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => {
                    setMonth(months[monthIndex === 0 ? 11 : monthIndex - 1])
                    setYear(monthIndex === 0 ? year - 1 : year)
                }}></Button>
                <h2>{month} {year}</h2>
                <Button variant="contained" endIcon={<ArrowForwardIosIcon />} onClick={() => {
                    setMonth(months[monthIndex === 11 ? 0 : monthIndex + 1])
                    setYear(monthIndex === 11 ? year + 1 : year)
                }}></Button>
            </Stack>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 100px)' }}>
                {daysOfWeek.map((day, index) => (
                    <div key={index} style={{ border: '1px solid black', textAlign: 'center', padding: '10px' }}>{day}</div>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 100px)' }}>
                {days.map((day, index) => (
                    <div key={index} 
                    onClick={() => handleDayClick(day)}
                    style={{ 
                        border: '1px solid black', 
                        textAlign: 'center', 
                        padding: '10px',
                        cursor: day === null ? 'default': 'pointer',
                       backgroundColor: day === currentDay && monthIndex === currentMonth && year === currentYear ? 'blueviolet' : 'transparent',
                    }}>

                            {day}
                    </div>
                ))}
            </div>
            <DayDrawer
                open={open}
                onClose={handleCloseDrawer}
                day={selectedDay}
                events={events[selectedDay || -1] || []}
                onEventAdd={handleEventAdd}
            />

        </div>
    )
}
