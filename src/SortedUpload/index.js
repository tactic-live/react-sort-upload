import React from 'react';
import { Upload as AntdUpload } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.less';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 16px 20px 0`,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, listLength = 0) => ({
  display: 'flex',
  padding: grid
});

class Upload extends React.Component {
  state = {
    fileList: [],
  }

  onDragEnd = (result) => {
    // dropped outside the list
    const { onSorted } = this.props;
    if (!result.destination) {
      return;
    }

    const fileList = reorder(
      this.state.fileList,
      result.source.index,
      result.destination.index
    );
    onSorted && onSorted(fileList);
    this.setState({
      fileList,
    });
  }

  componentWillReceiveProps(next) {
    const { fileList } = next;
    this.setState({
      fileList
    })
  }
  onRemove = (file) => {
    const { onRemove } = this.props;
    return onRemove && onRemove(file);
  }
  render() {
    const { fileList } = this.state;
    let fileListElem = null;
    if (fileList) {
      fileListElem = <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, fileList.length)}
            {...provided.droppableProps}
          >
            {fileList.map((item, index) => (
              <Draggable key={item.uid} draggableId={item.uid} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div className="upload-list-item-card">
                      <img src={item.url} />
                      <span className="upload-list-item-actions" onClick={() => {
                        this.onRemove(item);
                      }}>
                        <i title="删除文件" className="anticon anticon-delete"><svg viewBox="64 64 896 896" className="" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg></i>
                      </span>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    };
    return (
      <div className="upload-list upload-list-picture-card">
        <DragDropContext onDragEnd={this.onDragEnd}>
          {fileListElem}
        </DragDropContext>
        <AntdUpload
          {...this.props}
          showUploadList={false}
        />
      </div>
    );
  }
}

export default Upload;
