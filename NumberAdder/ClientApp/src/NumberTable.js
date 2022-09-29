import React from "react";
import NumberRow from "./numberRow";
import SelectedRow from "./SelectedRow";
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
class NumberTable extends React.Component {
    getRandomInt = () => {
        let min = 1;
        let max = 1000;
        min = Math.ceil(1);
        max = Math.floor(1000);
        return Math.floor(Math.random() * (max - min) + min)
    };
    state = {
        number: { id: uuidv4(), value: 0 },
        selectedNumber: [],
        numbers: [],
        lockedNumbers: []
    }
    onAddClick = () => {
        const number = { id: uuidv4(), value: this.getRandomInt() };
        const newState = produce(this.state, draftState => {
            draftState.numbers.push(number);
        });
        this.setState(newState);
    }
    onSelectClick = p => {
        const newState = produce(this.state, draftState => {
            draftState.selectedNumber.push(p)
        });
        this.setState(newState);
    }
    onUnSelectClick = p => {
        const selectedNumber = this.state.selectedNumber.filter(n => p.id !== n.id);
        this.setState({ selectedNumber });
    }
    onLockedClick = p => {
        const newState = produce(this.state, draftState => {
            draftState.lockedNumbers.push(p)
        });
        this.setState(newState);
    }
    onUnLockedClick = p => {
        const lockedNumbers = this.state.lockedNumbers.filter(n => p.id !== n.id);
        this.setState({lockedNumbers});
    }
    isSelected = p => {
        const { selectedNumber } = this.state;
        return selectedNumber.some(s => s.id === p.id);
    }
    isLocked = p => {
        const { lockedNumbers } = this.state;
        return lockedNumbers.some(s => s.id === p.id);
    }
    render() {
        const { numbers, selectedNumber,lockedNumbers } = this.state;
        return (
            <div className="container mt-5">
                <button className="btn btn-lg btn-success" onClick={this.onAddClick}>Add</button>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Add/Remove</th>

                        </tr>
                    </thead>
                    <tbody>
                        {numbers.map((p, i) => {
                            return <NumberRow
                                onSelectClick={() => this.onSelectClick(p)}
                                onUnSelectClick={() => this.onUnSelectClick(p)}
                                number={p}
                                isSelected={this.isSelected(p)}
                                isLocked={this.isLocked(p)}
                                key={i} />
                        })}
                    </tbody>
                </table>
                {!!selectedNumber.length && <div className="row jumbotron">
                    <div className="col-md-6 col-md-offset-3">
                        <h3>Selected Numbers</h3>
                        <ul className="list group">
                            {selectedNumber.map((n, i) => {
                                return <SelectedRow
                                    onLockedClick={() => this.onLockedClick(n)}
                                    onUnLockedClick={() => this.onUnLockedClick(n)}
                                    number={n}

                                    isLocked={this.isLocked(n)}
                                    key={i} />
                            })}
                        </ul>
                    </div>
                </div>
                } </div>



        )
    }
}



export default NumberTable;
