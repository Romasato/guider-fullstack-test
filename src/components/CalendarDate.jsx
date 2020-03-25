import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {DateTime} from 'luxon';

import '../styles/CalendarDate.css';

class CalendarDate extends React.Component {
    static propTypes = {
        date: PropTypes.instanceOf(DateTime),
        isAvailable: PropTypes.bool,
        showMonth: PropTypes.bool,
        isSelected: PropTypes.bool
    };

    static defaultProps = {
        isAvailable: false,
        showMonth: false
    }

    getOrdinalSuffixForNum = (num) => {
        var j = num % 10,
            k = num % 100;
        if (j === 1 && k !== 11) {
            return 'st';
        }
        if (j === 2 && k !== 12) {
            return 'nd';
        }
        if (j === 3 && k !== 13) {
            return 'rd';
        }
        return 'th';
    };

    onClick = () => {
        const {onClick, date} = this.props;
        if(onClick) {
            onClick(date);
        }
    };

    render() {
        const {date, isAvailable, showMonth, isSelected} = this.props;
        const dateSuffix = this.getOrdinalSuffixForNum(date.day);

        return (
            <div className={classnames('calendarDate', {
                available: isAvailable,
                selected: isSelected
            })}
                onClick={this.onClick}
            >
                <div className='date'>
                    {showMonth && date.monthShort}
                    {date.day}
                    <span className='dateOrdinal'>{dateSuffix}</span>
                </div>
                <div className='weekday'>
                    {date.weekdayShort}
                </div>
            </div>
        );
    }
}

export {CalendarDate};
