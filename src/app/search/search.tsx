import './search.less';

import * as React from 'react';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

const SEARCH_MIN_LENGTH = 2;
const SEARCH_MAX_LENGTH = 12;

interface Props {
    onFetch: (searchString: string) => void;
    className?: string;
}

@observer
export class Search extends React.Component<Props> {
    @observable searchString: string = "";

    @action
    setSearchString = (value: string) => {
        this.searchString = value;
    }

    get isValidSearchString(): boolean {
        return this.searchString != null &&
            this.searchString.length >= SEARCH_MIN_LENGTH &&
            this.searchString.length <= SEARCH_MAX_LENGTH
    }

    fetchClickHandler = () => {
        const { onFetch } = this.props;
        if (onFetch)
            onFetch(this.searchString);
    }

    inputChangeHandler = ({ target: { value } }) => {
        this.setSearchString(value);
    }

    keyPressHandler = (event) => {
        const key = event.which || event.keyCode;
        if (key === 13) {
            // Enter key was pressed
            this.props.onFetch(this.searchString);
        }
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