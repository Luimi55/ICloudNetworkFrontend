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


  return {
    getDateFormatted
  }
}

export default Helper