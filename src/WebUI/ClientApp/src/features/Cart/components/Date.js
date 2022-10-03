import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'

const Date = props => {
    const [yearSelected, setYearSelected] = useState();
    const [monthSelected, setMonthSelected] = useState();
    const [daySelected, setDaySelected] = useState();
  
    const [years, setYears] = useState(() => {
      var arr = new Array();
      var year = 1299;
  
      for (let index = 0; index < 101; index++) {
        year++;
        arr.push(year);
      }
      return arr.reverse();
    });
    const [months, setMonths] = useState([
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ]);
  
    const [days, setDays] = useState(() => {
      var arr = new Array();
      var day = 0;
  
      for (let index = 0; index < 31; index++) {
        day++;
        arr.push(day);
      }
      return arr;
    });
    const selectYear = (e) => {
      setYearSelected(e);
    };
    const selectMonth = (e) => {
      setMonthSelected(e);
    };
    const selectDay = (e) => {
      setDaySelected(e);
    };
  return (
    <div
    dir="ltr"
    className="d-flex flex-direction-row justify-content-center"
  >
    <div>
      <Dropdown as={ButtonGroup} onSelect={selectDay}>
        <Dropdown.Toggle
          split
          variant="light"
          id="dropdown-split-basic"
        />
        <Button variant="light"> {daySelected || "روز"}</Button>
        <Dropdown.Menu bsPrefix="dropdown-menu">
          {days.map((y, i) => (
            <Dropdown.Item key={i} eventKey={y} href="#/action-1">
              {y}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>

    <div>
      <Dropdown as={ButtonGroup} onSelect={selectMonth}>
        <Dropdown.Toggle
          split
          variant="light"
          id="dropdown-split-basic"
        />
        <Button variant="light"> {monthSelected || "ماه"}</Button>

        <Dropdown.Menu>
          {months.map((y, i) => (
            <Dropdown.Item key={i} eventKey={y} href="#/action-1">
              {y}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
    <div>
      <Dropdown as={ButtonGroup} onSelect={selectYear}>
        <Dropdown.Toggle
          split
          variant="light"
          id="dropdown-split-basic"
        />
        <Button variant="light"> {yearSelected || "سال"}</Button>

        <Dropdown.Menu>
          {years.map((y, i) => (
            <Dropdown.Item key={i} eventKey={y} href="#/action-1">
              {y}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </div>
  )
}

Date.propTypes = {}

export default Date