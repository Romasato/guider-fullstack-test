const {expect} = require('chai');
const {DateTime} = require('luxon');
const {transformMSOffice365Res} = require('../../server/utils/transformMSOffice365Res');

const mockDataSingleDay = require('./data/msOffice365Data-singleDay');
const mockDataMultiDay = require('./data/msOffice365Data-multipleDays');

describe('transformMSOffice365Res - should transform MS Office data to expected format', () => {
    it('one day span', () => {
        const startDate = DateTime.utc(2018, 8, 6);
        const endDate = DateTime.utc(2018, 8, 6);

        const data = transformMSOffice365Res(startDate, endDate, mockDataSingleDay);

        expect(data).to.be.eql([
            {
                date: '06/08/2018',
                availableSlots: [
                    {
                        startTime: '8:00',
                        endTime: '9:00',
                    },
                    {
                        startTime: '9:00',
                        endTime: '10:00',
                    },
                    {
                        startTime: '10:00',
                        endTime: '11:00',
                    },
                    // 11:00 - 13:00 - busy
                    {
                        startTime: '13:00',
                        endTime: '14:00',
                    },
                    {
                        startTime: '14:00',
                        endTime: '15:00',
                    },
                    {
                        startTime: '15:00',
                        endTime: '16:00',
                    },
                    {
                        startTime: '16:00',
                        endTime: '17:00',
                    },
                ]
            }]);
    });

    it('multiple-days span', () => {
        // 2020-03-31
        const startDate = DateTime.utc(2020, 3, 31);
        const endDate = DateTime.utc(2020, 4, 1);

        const data = transformMSOffice365Res(startDate, endDate, mockDataMultiDay);

        expect(data).to.be.eql([
            {
                date: '31/03/2020',
                availableSlots: [
                    {
                        startTime: '9:00',
                        endTime: '10:00',
                    },
                    {
                        startTime: '10:00',
                        endTime: '11:00',
                    },
                    // 11:00 - 13:00 - busy
                    {
                        startTime: '13:00',
                        endTime: '14:00',
                    },
                    {
                        startTime: '14:00',
                        endTime: '15:00',
                    },
                    {
                        startTime: '15:00',
                        endTime: '16:00',
                    },
                    {
                        startTime: '16:00',
                        endTime: '17:00',
                    },
                ]
            },
            {
                date: '01/04/2020',
                availableSlots: [
                    {
                        startTime: '8:00',
                        endTime: '9:00',
                    },
                    {
                        startTime: '9:00',
                        endTime: '10:00',
                    },
                    {
                        startTime: '10:00',
                        endTime: '11:00',
                    },
                    // 11:00 - 13:00 - busy
                    {
                        startTime: '13:00',
                        endTime: '14:00',
                    },
                    {
                        startTime: '14:00',
                        endTime: '15:00',
                    },
                    {
                        startTime: '15:00',
                        endTime: '16:00',
                    },
                    {
                        startTime: '16:00',
                        endTime: '17:00',
                    },
                ]
            }
        ]);
    });
});
