import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // useHistory import 추가
import { LoginContainer, LoginBox, Title, Subtitle, Input, Button, FindLinks, StyledLink } from './LoginStyle';

function LoginForm() {
    // 상태 초기화
    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });
    const history = useHistory(); // useHistory 사용

    // 입력값 변경을 위한 핸들러 함수
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Form 제출 핸들러 함수
    const handleSubmit = async (event) => {
        event.preventDefault();

        try { // 서버에 POST 요청 보냄
            const response = await axios({
                method: "post",
                baseURL: "http://localhost:4000",
                url: "/api/login",
                data: formData
            });
            console.log(response.data);
            history.push('/'); // 로그인 성공 시 홈으로 이동
        } catch (error) {
            console.error('로그인 실패:', error);
            window.alert('아이디 또는 비밀번호가 올바르지 않습니다.'); // 팝업창으로 실패 메시지 표시
        }
    };

    // LoginForm 구성
    return (
        <LoginContainer>
            <Title>ConnectedHub</Title>
            <LoginBox>
                <Subtitle>로그인</Subtitle>
                <form id="login-form" onSubmit={handleSubmit}>
                    <Input type="text" id="userId" name="userId" placeholder="아이디" value={formData.userId} onChange={handleChange} />
                    <Input type="password" id="login-password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
                    <Button type="submit">로그인</Button>
                </form>
                <FindLinks>
                    <StyledLink href="/signup">회원가입</StyledLink>
                </FindLinks>
            </LoginBox>
        </LoginContainer>
    );
}

export default LoginForm;