import './app.less';

import * as React from 'react';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import DevTools from 'mobx-react-devtools';

import { Tester } from '../model';
import { TestersTable } from './testers-table/testers-table';
import { searchTester, getAllTesters } from '../services/testers-search-service'
import { Search } from './search/search';
import { Spinner } from './spinner/spinner';

@observer
export class App extends React.Component {
    @observable showError: boolean;
    @observable showSpinner: boolean;
    @observable testers: Tester[] = [];

    @action setShowErrors = (value: boolean) => { this.showError = value; }

    @action setShowSpinner = (value: boolean) => { this.showSpinner = value; }

    @action setTesters = (value: Tester[]) => { this.testers = value; }

    @action
    onFetch = (searchString: string) => {
        this.setShowSpinner(true);
        this.setShowErrors(false);
        if (searchString === 'all') {
            getAllTesters()
                .then(this.getAllTestersHandler)
                .catch(this.searchErrorHandler);
        } else {
            searchTester(searchString)
                .then(this.searchTesterHandler)
                .catch(this.searchErrorHandler);
        }
    }

    @action
    getAllTestersHandler = (testers: Tester[]) => {
        this.setShowSpinner(false);
        if (testers != null) {
            this.setTesters(testers);
        } else {
            this.setTesters([]);
        }
    }

    @action
    searchTesterHandler = (tester: Tester) => {
        this.setShowSpinner(false);
        if (tester != null) {
            this.setTesters([tester]);
        } else {
            this.setTesters([]);
        }
    }

    @action
    searchErrorHandler = (error) => {
        this.setShowSpinner(false);
        this.setShowErrors(true);
        this.setTesters([]);
    }

    render() {
        const errorClasses = classnames("error-msg", { show: this.showError });

        return (
            <div className="homepage">
                <div className="main-title section">Search Bugs</div>
                {this.showSpinner && <Spinner />}
                <Search className="section" onFetch={this.onFetch} />
                <div className={errorClasses}>
                    Temporary error occurred, please try again later
                </div>
                <TestersTable testers={this.testers} />
                <DevTools />
            </div>
        );
    }
};