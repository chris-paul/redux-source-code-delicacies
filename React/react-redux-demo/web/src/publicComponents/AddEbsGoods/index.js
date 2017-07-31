import React from "react";
import Select, { Option } from "qnui/lib/select";
import { Dialog, Search, Tab, Table, Balloon, Button, Input, Checkbox, Pagination } from "qnui";
import { Group as RadioGroup } from "qnui/lib/radio";
import { api } from "../../redux/actions/AY_API";
import "./style.css";

const API_GOODS_INFO = "ebs.getGoodsInfo.search"; // 请求商品信息api

export default class AddGoodsDialog extends React.Component {
    state = {
        visible: false, //弹框显示状态
        brandcat_list: [],
        brandcat: "", // 搜索字段 分类
        goods_list: [], //搜索结果 商品信息
        page_no: 1, // 页码
        total: 0, //总数
        isLoading: false, //是否加载
        goods_selected: [] //商品已选中的
    };
    brandcat_list = [{ label: "全部分类", value: "" }, { label: "未分类", value: "未分类" }];

    //弹窗显示切换
    toggle = () => this.setState(prevState => ({ visible: !prevState.visible }));

    //添加商品弹窗
    show = () => {
        this.toggle();
        api(API_GOODS_INFO, { type: "show" }, e => {
            this.setState({ brandcat_list: e.data.map(res => res.brandcat) });
        });
    };
    hide = () => {
        this.toggle();
        this.setState({ goods_selected: [], goods_list: [], page_no: 1 });
    };

    //商品搜索
    searchGoods = () => {
        this.setState({ isLoading: true });
        const { brandcat } = this.state;
        const title = this.title.state.value;
        const prop_name = this.prop_name.state.value;
        const params = { type: "search", brandcat, title, prop_name };
        api(API_GOODS_INFO, params, e =>
            this.setState({ goods_list: e.data, total: e.total, isLoading: false })
        );
    };

    //重置
    resetSearch = () => this.setState({ brandcat: "" });

    // 条件筛选
    changeBrandcat = value => this.setState({ brandcat: value });
    changeTitle = value => this.setState({ title: value });
    changeProperties = value => this.setState({ prop_name: value });

    //表格cell 渲染
    cellPrice = value =>
        <div style={{ color: "#ffa033" }}> {value ? `￥${value.toFixed(2)}` : "-"} </div>;
    cellRender = value => value || "-";
    cellCheckbox = value =>
        <Checkbox
            checked={this.state.goods_selected.map(good => good.ebs_sku_id).indexOf(value) !== -1}
        />;
    cellProps = (value, index, record) => value.split(":").slice(-1);
    cellTitle = (value, index, record) =>
        <div style={{ display: "flex", alignItems: "center" }}>
            <div>
                <img width="30px" height="30px" src={`${record.pic_path}_30x30.jpg`} />
            </div>
            <div
                style={{
                    marginLeft: 5,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}
            >
                {record.title}
            </div>
        </div>;

    onConfirm = () => {
        const { goods_selected } = this.state;
        this.props.onConfirm(goods_selected);
        this.hide();
    };

    //单击行
    onRowClick = record => {
        const { ebs_sku_id } = record;
        const goods_selected = this.state.goods_selected
            .map(good => good.ebs_sku_id)
            .indexOf(ebs_sku_id) === -1
            ? this.state.goods_selected.concat(record)
            : this.state.goods_selected.filter(good => good.ebs_sku_id !== ebs_sku_id);
        this.setState({ goods_selected });
    };

    //翻页
    handlePageChange = page_no => {
        this.setState({ isLoading: true });
        const { brandcat } = this.state;
        const title = this.title.state.value;
        const prop_name = this.prop_name.state.value;
        const params = { type: "search", brandcat: "", title, prop_name, page_no };
        api(API_GOODS_INFO, params, e =>
            this.setState({ goods_list: e.data, page_no, isLoading: false })
        );
    };

    render() {
        const { visible, brandcat, goods_list, brandcat_list, total, page_no } = this.state;
        return (
            <span>
                <span onClick={this.show} style={{cursor: "pointer"}}>
                    {this.props.children || <a href="javascript:;">+ 添加商品</a>}
                </span>
                <Dialog
                    style={{ width: 800 }}
                    title="添加商品"
                    className="ebs-add-goods"
                    onClose={this.hide}
                    onCancel={this.hide}
                    onOk={this.onConfirm}
                    autoFocus={false}
                    visible={visible}
                >
                    <Select
                        style={{ verticalAlign: "middle" }}
                        defaultValue=""
                        onChange={this.changeBrandcat}
                        value={brandcat}
                        dataSource={this.brandcat_list.concat(brandcat_list)}
                    />&nbsp;&nbsp;
                    <label htmlFor="add_title">商品：</label>
                    <Input
                        style={{ width: 100 }}
                        placeholder="请输入关键词"
                        id="add_title"
                        ref={title => (this.title = title)}
                        onPressEnter={this.searchGoods}
                    />&nbsp;&nbsp;
                    <label htmlFor="add_prop_name">规格：</label>
                    <Input
                        style={{ width: "100px" }}
                        placeholder="编码/条码/规格名"
                        id="add_prop_name"
                        onPressEnter={this.searchGoods}
                        ref={prop_name => (this.prop_name = prop_name)}
                    />
                    <Button
                        type="primary"
                        style={{ marginLeft: "10px" }}
                        onClick={this.searchGoods}
                    >
                        搜索
                    </Button>
                    <Button style={{ marginLeft: "10px" }} type="normal" onClick={this.resetSearch}>
                        重置
                    </Button>
                    <div style={{ border: "1px solid #e6e6e6", height: 390, marginTop: 15 }}>
                        <Table
                            dataSource={goods_list}
                            hasBorder={false}
                            fixedHeader={true}
                            maxBodyHeight={356}
                            className="add-goods-table"
                            onRowClick={this.onRowClick}
                            primaryKey="ebs_sku_id"
                            isLoading={this.state.isLoading}
                        >
                            <Table.Column
                                title=""
                                dataIndex="ebs_sku_id"
                                width={18}
                                cell={this.cellCheckbox}
                            />
                            <Table.Column
                                title="商品信息"
                                className="add-goods-text-overflow"
                                dataIndex="title"
                                width={150}
                                cell={this.cellTitle}
                            />
                            <Table.Column
                                title="商品规格"
                                className="add-goods-text-overflow"
                                dataIndex="properties_name"
                                cell={this.cellProps}
                                width={40}
                            />
                            <Table.Column
                                title="商品编码"
                                dataIndex="sub_outer_id"
                                width={40}
                                cell={this.cellRender}
                            />
                            <Table.Column
                                title="售价"
                                dataIndex="price"
                                width={40}
                                cell={this.cellPrice}
                            />
                            <Table.Column title="实际库存" dataIndex="default_num" width={36} />
                        </Table>
                    </div>
                    <Pagination
                        type="simple"
                        style={{ position: "relative", top: 12, textAlign: "center" }}
                        current={page_no}
                        size="large"
                        pageSize={100}
                        shape="no-border"
                        total={total}
                        onChange={this.handlePageChange}
                    />
                </Dialog>
            </span>
        );
    }
}
