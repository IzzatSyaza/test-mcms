import React, {useState} from "react";
import DatePicker from "react-datepicker";



export default function TableDatePicker() {
    const [date, setDate] = useState(new Date());
   
    return (
      <DatePicker dateFormat="yyyy-MM-dd" selected={date} onChange={date => setDate(date)} />
    );
   }