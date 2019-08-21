# react-sort-upload
基于react+antd的图片拖拽排序组件

## Installing

```bash
$ npm install react-sort-upload --save
```

## dependencies
es6-promise ``` 4.1.0 ```, prop-types ``` ^15.5.7 ```, react-beautiful-dnd ``` >= 8.0.0 ``` .

## peerDependencies
React ```>= 15.3.0``` , React DOM ``` >= 15.3.0 ```, antd ``` >= 3.0.0 ``` .

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
Name|Type|isRequired|Description
-|-|-|-
onSorted|Function (list)=>{}|true|拖拽排序的回调
className|String||自定义className

其他属性比如action、fileList、onChange等等，同antd的Upload组件相同
