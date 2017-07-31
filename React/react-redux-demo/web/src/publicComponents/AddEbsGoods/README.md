### `添加商品sku`

| 属性 | 说明 | 类型 | 默认值 |
| - | - | -| --|
| onConfirm | 在点击 `确认创建` 时候触发的函数 | Function(records) | null |

### 使用说明

```js
//  默认显示链接
<AddEbsGoods
    onConfirm = {(records)=>{ ... }}
/>

//  改变为按钮
<AddEbsGoods
    onConfirm = {(records)=>{ ... }}
>
    <button>添加商品</button>
</AddEbsGoods>

```
