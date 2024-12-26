import React from 'react';
import Components from '../../components/components';

import './style.css';

const ShowStaffs = () => {
    return (
        <div className="show-staffs-container">
            <Components.StaffEdit title="公司成员列表" />
        </div>
    );
};

export default ShowStaffs;
