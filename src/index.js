import React from 'react';
import { Promise } from 'es6-promise';
import { Upload } from 'antd';
import PropTypes from 'prop-types';
import SortedUpload from './SortedUpload';

class UploadImg extends React.Component {
  constructor(props) {
    super(props);
    this.fileList = [];
    this.selectedFileList = [];
    this.uploadError = false;
    // 上传校验完成
    this.uploadCheckFlag = false;
    this.uploadCheckCount = 0;
    this.state = {
      test: false
    };
    this.beforeUpload = this.beforeUpload.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  // 上传商品图片前
  async beforeUpload(file, selectedFileList) {
    const { beforeUpload } = this.props;
    const { fileList } = this;
    this.uploadError = false;
    this.uploadCheckFlag = false;
    this.uploadCheckCount = 0;
    const imgUrl = window.URL.createObjectURL(file);
    const img = new Image();
    img.src = imgUrl;
    // eslint-disable-next-line no-param-reassign
    file.url = imgUrl;
    return new Promise((resolve, reject) => {
      if (beforeUpload) {
        beforeUpload(file).then(() => {
          const handler = setInterval(() => {
            if (this.uploadError) {
              clearInterval(handler);
              reject();
            } else if (this.uploadCheckFlag) {
              if (this.selectedFileList.length === 0) {
                this.selectedFileList = selectedFileList;
                this.fileList = fileList.concat(selectedFileList);
              }
              clearInterval(handler);
              resolve();
            } else {
              this.uploadCheckCount += 1;
              if (this.uploadCheckCount === selectedFileList.length) {
                this.uploadCheckFlag = true;
              }
            }
          }, 10);
        }).catch(() => {
          this.uploadError = true;
          reject();
        });
      } else {
        resolve();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { fileList } = nextProps;
    this.fileList = fileList;
  }

  onChange(e) {
    const { onChange } = this.props;
    const { file, fileList } = e;
    const { status, response } = file;
    this.selectedFileList = [];
    if (response) {
      const { dataMap = [] } = response;
      const newUrl = dataMap[0] ? dataMap[0].fileUrl : '';
      this.fileList.find((fileItem, idx) => {
        if (fileItem.uid == file.uid) {
          this.fileList[idx].url = newUrl;
          return true;
        }
        return false;
      });
    }
    if (status == 'done' || status == 'error') {
      const tempObj = Object.assign({}, e, {fileList: this.fileList.map(fileItem => fileList.find(eFile => fileItem.uid == eFile.uid))});
      onChange && onChange(tempObj);
    }
    this.setState({
      test: !this.state.test
    });
  }

  onRemove(file) {
    const { uid, percent } = file;
    const index = this.fileList.findIndex(item => item.uid == uid);
    this.fileList.splice(index, 1);
    this.setState({
      test: !this.state.test
    });
    const hasPercent = percent && percent !== 100;
    const { onRemove } = this.props;
    onRemove && onRemove(this.fileList, hasPercent);
  }

  render() {
    const {
      className, onSorted, fileList, onRemove
    } = this.props;
    const cls = `parampic-uploader ${className}`;
    let result;
    if (onSorted) {
      result = (
        <SortedUpload
          className={cls}
          showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
          multiple
          listType="picture-card"
          accept="image/*"
          {...this.props}
          fileList={this.fileList}
          onChange={this.onChange}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          onSorted={onSorted}
        >
          {this.props.children}
        </SortedUpload>
      );
    } else {
      result = (
        <Upload
          className={cls}
          showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
          multiple
          listType="picture-card"
          accept="image/*"
          {...rest}
          fileList={this.fileList}
          onChange={this.onChange}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
        >
          {this.props.children}
        </Upload>
      );
    }
    return result;
  }
}

UploadImg.defaultProps = {
  beforeUpload: () => { },
  onChange: () => { },
  onRemove: () => { },
  onSorted: () => { },
  fileList: [],
  className: ''
};

UploadImg.propTypes = {
  beforeUpload: PropTypes.func,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  onSorted: PropTypes.func,
  fileList: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string
};

export default UploadImg;