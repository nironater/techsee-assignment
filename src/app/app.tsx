import './app.less';

import * as React from 'react';
import * as classnames from 'classnames';

import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import { getResource } from '../http-service';
import { Tester } from '../models';
import { TestersTable } from './testers-table/testers-table';
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
        getResource<Tester[]>(searchString)
            .then(this.searchTestersHandler)
            .catch(this.searchTestersErrorHandler);
    }

    @action
    searchTestersHandler = (testers: Tester[]) => {
        this.setShowSpinner(false);
        if (testers != null) {
            this.setTesters(testers);
        } else {
            this.setTesters([]);
        }
    }

    @action
    searchTestersErrorHandler = (error) => {
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