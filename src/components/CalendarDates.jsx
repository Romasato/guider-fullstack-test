import React from 'react';
import PropTypes from 'prop-types';
import {DateTime} from 'luxon';

import {CalendarDate} from './CalendarDate';

import '../styles/CalendarDates.css';

class CalendarDates extends React.Component {
    static propTypes = {
        userTimeZone: PropTypes.object,
        dateStart: PropTypes.instanceOf(DateTime),
        dateEnd: PropTypes.instanceOf(DateTime),
        selectedDate: PropTypes.instanceOf(DateTime),
        availableDates: PropTypes.arrayOf(PropTypes.instanceOf(DateTime)),
        onDateSelect: PropTypes.func
    };

    generateDates = (dateStart, dateEnd, availableDates) => {
        // Generate dates list
        const diffInDays = dateEnd.diff(dateStart, 'days');
        const datesArr = [];
        for(let i = 0; i < diffInDays; i++) {
            const nextDay = dateStart.plus({ days: i });
            const matchingAvailableDate = availableDates.find(dt => nextDay.hasSame(dt, 'day'));
            datesArr.push({date: nextDay, hasAvailability: !!matchingAvailableDate});
        }

        return datesArr;
    };

    render() {
        const {dateStart, dateEnd, availableDates, onDateSelect, selectedDate} = this.props;
        const datesArr = this.generateDates(dateStart, dateEnd, availableDates);

        return (
            <div className='calendarDates'>
                {datesArr.map(({date, hasAvailability}, idx) => (
                    <CalendarDate
                        key={date.toISO()}
                        showMonth={idx === 0 || date.day === 1}
                        date={date}
                        isAvailable={hasAvailability}
                        isSelected={selectedDate && selectedDate.hasSame(date, 'day')}
                        onClick={onDateSelect}
                    />
                ))}
            </div>
        );
    }
}

export {CalendarDates};
