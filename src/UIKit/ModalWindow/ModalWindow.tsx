import { FC, ReactNode } from 'react';
import Modal from 'react-modal';

const customModalStyles = {
  content: {
    borderRadius: '0',
    backgroundColor: '#fff',
    padding: '0',
    width: 'fit-content',
    height: 'fit-content',
    margin: '0 auto',
    zIndex: 2000,
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, .15)',
  },
};

Modal.setAppElement('#root');

interface ModalWindowProps {
  isShowModal: boolean;
  children: ReactNode;

  handleModalClose(): void;
}

export const ModalWindow: FC<ModalWindowProps> = ({
  isShowModal,
  handleModalClose,
  children,
}) => {
  return (
    <Modal
      isOpen={isShowModal}
      onRequestClose={handleModalClose}
      style={customModalStyles}
      bodyOpenClassName="g-overflow-hidden"
      closeTimeoutMS={300}
    >
      <>{children}</>
    </Modal>
  );
};
