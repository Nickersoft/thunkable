import React, { Component } from "react";

import styled from "styled-components";

import questionIcon from "../../images/icon-question.svg";
import { Modal } from "antd";

// Inner wrapper of the modal window
const ModalInner = styled.div`
  display: flex;
  flex-direction: row;
`;

// The tiny icon that appears left of the text
const ModalIcon = styled.div`
  width: 22px;
  height: 22px;
  margin-top: 6px;
  margin-right: 1rem;
`;

// The main modal text body (title + description)
const ModalText = styled.div`
  flex: 1;
`;

// The title of the modal
const ModalTitle = styled.h6`
  color: rgba(0, 0, 0, 0.85);
  font-size: 1rem;
  margin: 0;
  padding: 0;
  line-height: 1.875rem;
`;

// The description of the modal
const ModalDescription = styled.p`
  margin: 0;
  line-height: 1.875rem;
  font-size: 1rem;
  padding: 0;
  color: rgba(0, 0, 0, 0.5);
`;

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

class ProjectsDeletionModal extends Component<Props> {
  render() {
    const { visible, onConfirm, onCancel } = this.props;

    return (
      <Modal
        visible={visible}
        closable={false}
        onOk={onConfirm}
        onCancel={onCancel}
        okText="Yes"
        cancelText="No"
      >
        <ModalInner>
          <ModalIcon>
            <img src={questionIcon} />
          </ModalIcon>
          <ModalText>
            <ModalTitle>
              Are you sure you want to delete this project?
            </ModalTitle>
            <ModalDescription>This action can't be undone.</ModalDescription>
          </ModalText>
        </ModalInner>
      </Modal>
    );
  }
}

export default ProjectsDeletionModal;
