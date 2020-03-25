import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import {DateTime} from 'luxon';

import {api} from '../config/envSettings';

import {UserTimezone} from './UserTimezone';
import {CalendarDates} from './CalendarDates';
import {TimeSlots} from './TimeSlots';

import '../styles/AvailabilityCalendar.css';

const dtUser = DateTime.local(); // .setZone('Europe/Paris'); // to test different user tz

class AvailabilityCalendar extends React.Component {
    static propTypes = {
        userTimeZone: PropTypes.object
    };

    state = {
        availabilityData: null,
        selectedDate: null,
        isFetchingData: true
    };

    async componentDidMount() {
        const resp = await axios.get(`${api.baseEndpoint}/availability`);

        // Normalize data: generate state object with dates adjusted to local time from server-returned UTC.
        const availabilityData = resp.data.map((avDate) => {
            let utcDate = DateTime.fromFormat(avDate.date, api.dateFormat, {zone: 'UTC'});
            let localDate = utcDate.setZone(dtUser.zoneName);

            return {
                date: localDate,
                availableSlots: avDate.availableSlots.map(slot => {
                    const [startHour, startMins] = slot.startTime.split(':');
                    const startTimeUTC = utcDate.set({hour: +startHour, minute: +startMins});
                    const adjustedStartTime = startTimeUTC.setZone(dtUser.zoneName);

                    const [endHour, endMins] = slot.endTime.split(':');
                    const endTimeUTC = utcDate.set({hour: +endHour, minute: +endMins});
                    const adjustedEndTime = endTimeUTC.setZone(dtUser.zoneName);

                    return {
                        startTime: adjustedStartTime,
                        endTime: adjustedEndTime
                    }
                })
            }
        });

        // Update state
        this.setState({availabilityData: availabilityData, isFetchingData: false});
    }

    onDateSelect = (date) => {
        this.setState({selectedDate: date});
    };

    onSlotSelect = (hour, minutes) => {
        // TODO: Do something with the selected hour and minutes.
    }

    render() {
        const {isFetchingData, availabilityData, selectedDate} = this.state;

        if(isFetchingData) {
            return (
                <div>Loading...</div>
            );
        }

        const dtStart = dtUser;
        const dtEnd = dtStart.plus(10, 'days');
        const availableDates = availabilityData.map(availableDate => availableDate.date);

        let availableSlots = null;
        if(selectedDate) {
            const date = availabilityData.find(date => date.date.hasSame(selectedDate, 'day'));
            if(date) {
                availableSlots = date.availableSlots;
            }
        }


        return (
            <div className='availabilityCal'>
                <UserTimezone dtLocal={dtUser} />
                <CalendarDates
                    dtLocal={dtUser}
                    dateStart={dtStart}
                    dateEnd={dtEnd}
                    availableDates={availableDates}
                    onDateSelect={this.onDateSelect}
                    selectedDate={selectedDate}
                />
                {availableSlots && (
                    <TimeSlots
                        date={selectedDate}
                        availableSlots={availableSlots}
                        onSlotSelect={this.onSlotSelect}
                    />
                )}
            </div>
        );
    }
}

export {AvailabilityCalendar};
