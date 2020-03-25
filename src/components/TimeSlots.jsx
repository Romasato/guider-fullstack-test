import React from 'react';
import PropTypes from 'prop-types';
import {DateTime} from 'luxon';

import {TimeSlot} from './TimeSlot';

import '../styles/TimeSlots.css';

class TimeSlots extends React.Component {
    static propTypes = {
        date: PropTypes.instanceOf(DateTime),
        availableSlots: PropTypes.arrayOf(
            PropTypes.shape({
                startTime: PropTypes.instanceOf(DateTime),
                endTime: PropTypes.instanceOf(DateTime)
            })
        ),
        onSlotSelect: PropTypes.func
    };

    generateTimeSlots = (date, availableSlots) => {
        const HOURS_TO_DISPLAY = 12;
        const START_HOUR = 8;
        const START_MINUTE = 0;

        const zone = date.zoneName;
        const dtStartHourUTC = date.setZone('UTC').set({hours: START_HOUR, minute: START_MINUTE});
        const dtStartHour = dtStartHourUTC.setZone(zone);

        const slotsArr = [];
        for(let i = 0; i < HOURS_TO_DISPLAY; i++) {
            const nextHour = dtStartHour.plus({hours: i});
            const matchingAvailableDate = availableSlots.find(dt => nextHour.hasSame(dt.startTime, 'hour'));
            slotsArr.push({timeslot: nextHour, hasAvailability: !!matchingAvailableDate});
        }

        return slotsArr;
    };

    onClick = (date) => {
        const {onSlotSelect} = this.props;
        onSlotSelect(date);
    };

    render() {
        const {date, availableSlots} = this.props;
        const datesArr = this.generateTimeSlots(date, availableSlots);

        return (
            <div className='timeSlots'>
                {datesArr.map(({timeslot, hasAvailability}) => {
                    return (
                        <TimeSlot
                            hour={timeslot.hour}
                            minutes={timeslot.minute}
                            isAvailable={hasAvailability}
                            onClick={this.onClick}
                        />
                    );
                })}
            </div>
        );
    }
}

export {TimeSlots};
