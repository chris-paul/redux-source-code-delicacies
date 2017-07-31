import React from 'react';

import {Button,Field} from 'qnui'
import Select, {Option} from 'qnui/lib/select';
import './main.css'
import SearchTop from './components/Search/SearchTop.js'
import OptionCompent from './components/Option'
import InventoryTable from './components/Table/InventoryTable.js'
import Log from './components/Log'


class Inventory extends React.Component {


    render() {
        const {isLoading} = this.props;

        return (
            <div className="inventory">
                {/* 搜索  */}
                <SearchTop />
                {/* 操作、弹框区域 */}
                <OptionCompent  />
                {/* 表格内容展示区域 */}
                <InventoryTable  />
                {/* 表格日志详情弹窗 */}
                <Log/>
            </div>
        );
    }

}
export default Inventory;
