import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

class TimeSlot extends React.Component {
    static propTypes = {
        hour: PropTypes.number,
        minutes: PropTypes.number,
        isAvailable: PropTypes.bool,
        onClick: PropTypes.func
    };

    onClick = () => {
        const {onClick, hour, minutes} = this.props;
        onClick(hour, minutes);
    };

    render() {
        const {hour, minutes, isAvailable} = this.props;

        const strHour = String(hour).padStart(2, '0');
        const strMinutes = String(minutes).padStart(2, '0');

        return (
            <div className={classnames('timeSlot', {
                'available': isAvailable
            })}
                 onClick={this.onClick}
            >
                {strHour}:{strMinutes}
            </div>
        );
    }
}

export {TimeSlot};
