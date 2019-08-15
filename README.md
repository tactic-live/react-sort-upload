# react-sort-upload
基于react+antd的图片拖拽排序组件

## Installing

```bash
$ npm install react-sort-upload --save
```

## devDependencies
React ```>= 15.6.1``` , React DOM ``` >= 15.6.1 ```, antd ``` 3.15.0 ``` .

## Usage

```js
import UploadImg from 'react-sort-upload';

...

<UploadImg
  {...props}
  className={className}
  action={action}
  fileList={fileList}
  beforeUpload={this.beforeUpload}
  onChange={this.onChange}
  onRemove={this.onRemove}
  onSorted={this.onSorted}
>
  {uploadButton}
</UploadImg>
```
------

## Props
Name|Type|Default|Description
-|-|-|-
onSorted|Function (list)=>{}||拖拽排序的回调
className|String||自定义className

其他属性比如action、fileList、onChange等等，同antd的Upload组件相同
