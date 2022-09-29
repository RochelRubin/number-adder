import React from "react";
class NumberRow extends React.Component {
    render() {
        const { value, id } = this.props.number;
        const { onSelectClick, onUnSelectClick, isLocked, isSelected } = this.props;
        return (
            <tr>
                <td>{value}</td>
                <td><button className={`btn btn-${isSelected ? 'danger' : 'success'}`} disabled={isLocked} onClick={isSelected ? onUnSelectClick : onSelectClick}>{isSelected ? 'Remove From Selected' : 'Add To Selected'}</button></td>
            </tr>
        )
    }
}
export default NumberRow;