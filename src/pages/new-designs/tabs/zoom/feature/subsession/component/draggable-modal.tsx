/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useRef, useCallback } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { Modal } from 'antd';

interface DraggableModalProps {
  title: string | React.ReactNode;
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  width?: number;
}

interface DragBound {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const DraggableModal = (props: DraggableModalProps) => {
  const { title, visible, children, onClose, onCancel, onOk, okText, cancelText, width } = props;
  const [disabled, setDisabled] = useState<boolean>(true);
  const [bounds, setBounds] = useState<DragBound>({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  });
  const draggleRef = useRef<HTMLDivElement>(null);

  const onModalMouseOver = useCallback(() => {
    if (disabled) {
      setDisabled(false);
    }
  }, [disabled]);

  const onModalMouseOut = useCallback(() => {
    setDisabled(true);
  }, []);

  const onDragStart = useCallback<DraggableEventHandler>((event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    setBounds({
      left: -(targetRect?.left ?? 0) + uiData.x,
      right: clientWidth - ((targetRect?.right ?? 0) - uiData.x),
      top: -(targetRect?.top ?? 0) + uiData.y,
      bottom: clientHeight - ((targetRect?.bottom ?? 0) - uiData.y)
    });
  }, []);

  const isShowFooter = !!onOk;
  const restModalProps = isShowFooter
    ? {
        okText,
        cancelText,
        onOk,
        onCancel
      }
    : { footer: null };

  return (
    <Modal
      title={
        <div className="breakout-room-title" onMouseOver={onModalMouseOver} onMouseOut={onModalMouseOut}>
          {title}
        </div>
      }
      visible={visible}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={onDragStart as DraggableEventHandler}
          nodeRef={draggleRef}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
      onCancel={onClose}
      width={width || 600}
      className="room-modal"
      {...restModalProps}
    >
      {children}
    </Modal>
  );
};

export default DraggableModal;
