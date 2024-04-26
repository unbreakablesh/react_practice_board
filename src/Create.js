import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreatePost() {
    // 상태 관리를 위한 useState 훅 사용
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);


    const [userRealName, setUserRealName] = useState('');

    useEffect(() => {
        // 세션 데이터를 가져오는 요청
        axios.get('http://localhost:3001/session', { withCredentials: true })
            .then(response => {
                // 서버로부터 받은 세션 정보를 상태에 저장
                if (response.data.loggedIn) {
                    setUserRealName(response.data.userRealName);
                } else {
                    // 사용자가 로그인하지 않았을 경우의 처리
                    window.location.href = '/login'; // 로그인 페이지로 리다이렉트
                }
            })
            .catch(error => {
                console.error('세션 정보를 가져오는 중 오류 발생:', error);
            });
    }, []);

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        // 파일들을 formData에 추가
        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        // Fetch API를 사용하여 서버에 폼 데이터 전송
        fetch('/create', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // 성공적으로 데이터를 전송한 후 사용자를 게시판 메인 페이지로 리다이렉트
                window.location.href = '/boardMain';
            })
            .catch(error => console.error('Error:', error));
    };

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    return (
        <div>

            <div style={{position: 'absolute', top: '10px', right: '10px'}}>
                {userRealName ? (
                    <p>
                        {userRealName}님 환영합니다. &nbsp;&nbsp;
                        <a href="/" className="button">로그아웃</a>
                        {/*a 태그로 이동하면 seasion끊기는거 이용*/}
                    </p>
                ) : (
                    <a href="/login" className="button">로그인</a>
                )}
            </div>


            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="title">제목:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                /><br/>

                <label htmlFor="content">내용:</label><br/>
                <textarea
                    id="content"
                    name="content"
                    rows="24"
                    cols="50"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                /><br/>

                <label htmlFor="files">파일 첨부:</label><br/>
                <input
                    type="file"
                    id="files"
                    name="files"
                    multiple
                    onChange={handleFileChange}
                /><br/>

                <input type="submit" value="작성하기기기"/>
            </form>

            <Link to="/">이전 페이지로 돌아가기</Link>
        </div>
    );
}

export default CreatePost;
