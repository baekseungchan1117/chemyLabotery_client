import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import FriendResult from './FinalResult';
import PageMoveButton from './Button/PageMoveButton';

const ResultForm = () => {
    const [numdate, setNumdate] = useState("");
    const [friendnum, setFriendnum] = useState("");
    const url = window.location.href;

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        axios.get('https://chemylab.shop/result', {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'codenum': {friendnum}
            }   
        })
        .then(res  => {
           setNumdate(res.data.numdata);
        })
        .catch(error => {
            return console.error(error);
        });
    }, []);

    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("클립보드에 링크가 복사되었어요.");
        } catch (err) {
            console.log(err);
        }
    };
    

const location = useLocation();

    return (
        <div className='mainview'>
            <h4 className='title'>물약 제조 완료</h4>
            <img alt='최종 물약 아이콘' src='/icons/finishIcon.png' />
            <h2 className='greyFont'>나의 물약 코드</h2> 
            <p style={{fontSize: '24px'}}>{numdate}</p>
            
            <input type="text" placeholder="상대물약 코드 입력 후 결과 확인하기"onChange={e => setFriendnum(e.target.value)}/>
            {
                friendnum.length != 0 ? 
                <Link to={`/final?friendnum=${friendnum}`}><img alt='blueArrow' src='/icons/blueArrow.png' className='arrow' /></Link>
                : ""
            }
            

            <button className='moveButton fontStyle' onClick={() => handleCopyClipBoard(`${url}`)}>URL 공유하기</button> 
            <PageMoveButton path="/main" text="메인 화면으로 돌아가기" />
            <p className='greyFont'>메인화면으로 돌아가도 코드는 저장됩니다.</p>

            
        </div>
    );
}

export default ResultForm;
