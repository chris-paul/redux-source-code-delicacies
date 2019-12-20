import React from 'react';


import BatchUpdate from './BatchUpdate.js';
import OptionDialog from './OptionDialog.js'


class Option extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div  className="inventory-button" >
                    {/* <OptionDialog /> */}
                    <BatchUpdate />
                </div>

            </div>
        );
    }

}

export default Option;
