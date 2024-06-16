import React, {useState} from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';

const ReportInput = styled.textarea`
  width: calc(100% - 20px);
  margin-top: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 1em;
  cursor: pointer;
  background-color: #add8e6;
  color: white;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || '#0056b3'};
  }
`;

const ReportModal = ({ isOpen, onRequestClose, postId }) => {
  const [reportContent, setReportContent] = useState('');

  const handleReportChange = (e) => {
    setReportContent(e.target.value);
  };

  const handleReportSubmit = async () => {
    if (reportContent.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:4000/api/post/report', {
        postId,
        reportContent: reportContent.trim(),
      });
      console.log('신고가 접수되었습니다:', response.data);
      setReportContent(''); // 신고 입력 창 비우기
      alert('신고가 접수되었습니다.');
      onRequestClose();
    } catch (error) {
      console.error('신고를 등록하는 데 실패했습니다:', error);
      alert('신고를 등록하는 데 실패했습니다.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="신고 모달"
      appElement={document.getElementById('root')}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <h2>신고 내용</h2>
      <ReportInput
        rows="4"
        placeholder="신고 내용을 입력하세요"
        value={reportContent}
        onChange={handleReportChange}
      />
      <ButtonContainer>
        <Button onClick={handleReportSubmit}>제출</Button>
        <Button onClick={onRequestClose}>닫기</Button>
      </ButtonContainer>
    </Modal>
  );
};

export default ReportModal;
