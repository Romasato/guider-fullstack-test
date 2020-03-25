import React from 'react';
import PropTypes from 'prop-types';

import {DateTime} from 'luxon';

class UserTimezone extends React.Component {
    static propTypes = {
        dtLocal: PropTypes.instanceOf(DateTime)
    };

    render() {
        const {dtLocal} = this.props;
        const plusMinus = dtLocal.offset >= 0 ? '+' : '-';
        const offsetAbs = Math.abs(dtLocal.offset);
        const offsetHours = String(Math.floor(offsetAbs / 60)).padStart(2, '0');
        const offsetMins = String(offsetAbs % 60).padStart(2, '0');
        const timezoneName = dtLocal.offsetNameShort.replace(/\+\d+/i, '');

        return (
            <div className='userTimezone'>
                <span>Your timezone: {timezoneName} {plusMinus}{offsetHours}:{offsetMins}</span>
            </div>
        );
    }
}

export {UserTimezone};
