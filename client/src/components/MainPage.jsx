import React, { useState } from 'react'
import PageMoveButton from './Button/PageMoveButton'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function MainPage() {
  const token = localStorage.getItem("accessToken");
  // console.log(token);
  const cnt = 0;
  const { name } = useParams();
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const deleteData =  (cnt) => {
    axios.get(`http://ec2-52-78-9-158.ap-northeast-2.compute.amazonaws.com:8080/find/${name}`)
    .then(res => {
      // 테스트를 처음하는 경우
      if (res.data.length == 0) { 
        if(cnt == 1) {
          navigate("/start");
        }
        else if (cnt == 2 || cnt == 0) {
          alert("테스트를 먼저 진행해주세요!");
          navigate("/start");
        }
      }

      // 테스 경험이 있는 경우
      else {
        if (cnt == 1) {
          // 테스트 기록 삭제 확인
          if (window.confirm('기존의 테스트 결과를 모두 지우고 새롭게 테스트를 시작할까요?'))
          { // '확인' 을 누른 경우 -> 데이터 삭제
            axios
            .delete(`http://ec2-52-78-9-158.ap-northeast-2.compute.amazonaws.com:8080/delete/${name}/${cnt}`,{})
            .then((res) => {
              navigate("/start")
              
            })
            .catch((error) => {
              console.log('error');
              return console.error(error);
            });
    
          }

          else { // '취소'를 누른 경우
             navigate(`/main/${name}`);}
        }
        else if (cnt == 2) {

          if (window.confirm('내 테스트 결과는 그대로 두고 상대에 대한 테스트만 다시 진행할까요?'))
          { // '확인'을 누른 경우 -> persondata 데이터만 삭제
            
            axios
            .delete(`http://ec2-52-78-9-158.ap-northeast-2.compute.amazonaws.com:8080/delete/${name}/${cnt}`,{})
            .then((res) => {
              console.log(res);
              
            })
            .catch((error) => {
              console.log('error');
              return console.error(error);
            });
            navigate("/value/loading");
          }
          else{ // '취소'를 누른 경우
            navigate(`/main/${name}`);}
        }
        }
          
        }) 
    }

  return (
    <div className='mainview'>
      <img alt='logo' src='../icons/logo.png' className='img1'/>

      <div className='homeBtn'>
      <PageMoveButton text="처음부터 실험하기" onClick={() => deleteData(1)}/>
      <PageMoveButton text="상대 물약만 다시 제조하기" onClick={() => deleteData(2)} />
      <PageMoveButton path="/result" text="물약 코드로 케미 확인하기" onClick={() => deleteData(0)} />
      </div>
    </div>
  )
}

export default MainPage
