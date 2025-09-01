import React from 'react'

const Helper = () => {

    const getDateFormatted = (date)=>{
        if(date && date instanceof Object){
          return date.toISOString().split("T")[0]
        } else {
          return new Date().toISOString().split("T")[0]
        }
    }

    const getWeekRange = () => {
      
      const today = new Date();
      const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

      // Calculate Monday of this week
      const startDate = new Date(today);
      const diffToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek); 
      startDate.setDate(today.getDate() + diffToMonday);

      // Calculate Sunday of this week
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      return {
        startDate,
        endDate
      };

    }


  return {
    getWeekRange,
    getDateFormatted
  }
}

export default Helper