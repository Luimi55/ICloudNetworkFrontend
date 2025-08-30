import React from 'react'

const Helper = () => {

    const getDateFormatted = (date)=>{
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();

        // Add leading zero if month or day is a single digit
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return `${year}/${month}/${day}`;
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