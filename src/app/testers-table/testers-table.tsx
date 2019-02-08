import './testers-table.less';

import * as React from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

import { Tester } from '../../models';

type SortType = "first" | "last" | "country";

interface Props {
    testers: Tester[];
}

@observer
export class TestersTable extends React.Component<Props> {
    @observable sortBy: SortType = "first";

    @action
    setFilter = (value: SortType) => {
        this.sortBy = value;
    }

    @computed
    get sortedTesters(): Tester[] {
        return this.props.testers.sort((a, b) => {
            const aProp = this.getPropertyBySortType(a);
            const bProp = this.getPropertyBySortType(b);
            return aProp.localeCompare(bProp);
        })
    }

    getPropertyBySortType(tester: Tester): string {
        switch (this.sortBy) {
            case "last":
                return tester.lastName;
            case "country":
                return tester.country;
            case "first":
            default:
                return tester.firstName;
        }
    }

    render() {
        return (
            <div className="testers-table">
                <table>
                    {this.renderTableHeaders()}
                    <tbody>
                        {this.sortedTesters.map(this.testerToRowMapper)}
                    </tbody>
                </table>
            </div>
        );
    }

    renderTableHeaders(): JSX.Element {
        return (
            <thead>
                <tr>
                    <th className="clickable" onClick={() => this.setFilter("first")}>First Name</th>
                    <th className="clickable" onClick={() => this.setFilter("last")}>Last Name</th>
                    <th className="clickable" onClick={() => this.setFilter("country")}>Country</th>
                    <th>Bugs</th>
                </tr>
            </thead>
        );
    }

    testerToRowMapper({ firstName, lastName, country, bugs }: Tester): JSX.Element {
        return (
            <tr key={`${firstName}${lastName}${country}`}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{country}</td>
                <td>{bugs.map(bug => bug.title).join(", ")}</td>
            </tr>
        )
    }
};