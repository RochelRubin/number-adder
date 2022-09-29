import React from "react";
class SelectedRow extends React.Component {
    render() {
        const { id, value } = this.props.number;
        const { onLockedClick, onUnLockedClick, isLocked } = this.props;
        
        return (
            <li className='list-group-item'>{value}
                <br></br>
                    <button className={`btn btn-primary`} onClick={isLocked ? onUnLockedClick : onLockedClick}>
                        {isLocked ? 'Unlock' : 'Lock'}
                    </button>
            </li>
        )

    }
}
export default SelectedRow;