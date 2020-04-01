const {DateTime, Interval} = require('luxon');
const CFG = require('../../config/envSettings');

function transformMSOffice365Res(startDate, endDate, data) {
    const [value] = data.value;
    const {scheduleItems, workingHours} = value;

    startDate = startDate.startOf('day');
    endDate = endDate.endOf('day');

    /* Filter and prepare scheduledItems
    -------------------------------------------------------------*/
    const scheduledItemsFiltered = scheduleItems.filter(({status}) => status === 'Busy');
    const scheduleItemsArr = scheduledItemsFiltered.map(({status, start, end}) => {
        const startDateTime = start.dateTime.replace(/\.\d+$/i, '');
        const endDateTime = end.dateTime.replace(/\.\d+$/i, '');

        const dtStart = DateTime.fromISO(startDateTime, {zone: 'utc'});
        const dtEnd = DateTime.fromISO(endDateTime, {zone: 'utc'});

        return {
            status,
            start: dtStart,
            end: dtEnd,
            interval: Interval.fromDateTimes(dtStart, dtEnd)
        };
    });

    /* Generate available time slots
    -------------------------------------------------------------*/
    const DAYS_TO_GENERATE = Math.ceil(endDate.diff(startDate, 'days').days);

    const arrDays = [];

    for(let iDay = 0; iDay < DAYS_TO_GENERATE; iDay++) {
        const availableSlots = [];

        const date = startDate.plus({days: iDay});
        const dayObj = createDayObj(date, availableSlots);
        arrDays.push(dayObj);

        let dtStartTime = DateTime.fromISO(`${date.toFormat('yyyy-MM-dd')}T${workingHours.startTime}`, {zone: 'utc'});
        let dtEndTime = DateTime.fromISO(`${date.toFormat('yyyy-MM-dd')}T${workingHours.endTime}`,  {zone: 'utc'});

        const HOURS_COUNT = dtEndTime.diff(dtStartTime, 'hours').hours;

        for(let iHour = 0; iHour < HOURS_COUNT; iHour++) {
            const hourStart = dtStartTime.plus({hours: iHour});
            const hourEnd = dtStartTime.plus({hours: iHour + 1});

            const hourInterval = Interval.fromDateTimes(hourStart, hourEnd);

            const hasBusyTime = scheduleItemsArr.find((item) => {
                return hourInterval.overlaps(item.interval);
            });

            if(!hasBusyTime) {
                availableSlots.push({
                    startTime: `${String(hourStart.hour)}:${String(hourStart.minute).padStart(2, '0')}`,
                    endTime: `${String(hourEnd.hour)}:${String(hourEnd.minute).padStart(2, '0')}`
                });
            }
        }
    }

    return arrDays;
}

// Day object factory method
function createDayObj(date, availableSlots) {
    const dateStr = date.toFormat(CFG.api.dateFormat);
    return {
        date: dateStr,
        availableSlots: availableSlots
    }
};

module.exports = {transformMSOffice365Res};
