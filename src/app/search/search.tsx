import './search.less';

import * as React from 'react';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';

const SEARCH_MIN_LENGTH = 2;
const SEARCH_MAX_LENGTH = 12;

interface Props {
    onFetch: (searchString: string) => void;
    className?: string;
}

@observer
export class Search extends React.Component<Props> {
    @observable searchString: string = "";

    @computed
    get isValidSearchString(): boolean {
        return this.searchString != null &&
            this.searchString.length >= SEARCH_MIN_LENGTH &&
            this.searchString.length <= SEARCH_MAX_LENGTH
    }

    @action
    setSearchString = (value: string) => {
        this.searchString = value;
    }

    keyPressHandler = (event) => {
        const key = event.which || event.keyCode;
        if (key === 13) {
            // Enter key was pressed
            this.fetchClickHandler()
        }
    }

    fetchClickHandler = () => {
        const { onFetch } = this.props;
        if (this.isValidSearchString && onFetch) {
            onFetch(this.searchString);
        }
    }

    inputChangeHandler = ({ target: { value } }) => {
        this.setSearchString(value);
    }    

    render() {
        const searchClasses = classnames('search', this.props.className);
        const inputClasses = classnames({ invalid: !this.isValidSearchString });

        return (
            <div className={searchClasses}>
                <div className="input-container">
                    <div className="input-label">Tester Name</div>
                    <input
                        value={this.searchString}
                        className={inputClasses}
                        onChange={this.inputChangeHandler}
                        onKeyPress={this.keyPressHandler}
                        placeholder="Enter the tester name"
                    />
                </div>
                <button onClick={this.fetchClickHandler} disabled={!this.isValidSearchString}>Fetch</button>
            </div>
        );
    }
};