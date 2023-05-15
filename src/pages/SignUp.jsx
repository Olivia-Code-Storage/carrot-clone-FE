import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { SlArrowLeft } from "react-icons/sl";
import { Input, CommonButton, Flx, IntroLayout } from '../components/ui';
import { useMutation } from 'react-query';
import { userSignup } from '../api/users';

function SignUp() {
    // 회원가입에서 필요한 Hook연결하기
    const navigate = useNavigate();
    const mutate = useMutation();

    //Input창 저장용 state
    const [input, setInput] = useState({
        userId:'',
        password:'',
        pwConfirm:'',
        nickname:'',
        address:{
            region1depthName:'',
            region2depthName:'',
            region3depthName:'',
        }
    });

    // Input창 작성용 onChangehandler
    const onChangeInputHandler = (e) => {
        const { id, value } = e.target;
        if (id === "region1depthName" || id === "region2depthName" || id === "region3depthName") {
            setInput({
              ...input,
              address: {
                ...input.address,
                [id]: value,
              },
            });
          } else {
            setInput({
              ...input,
              [id]: value,
            });
          }
    };

    //중복체크용 이벤트핸들러
    const onDoubleCheckHandler = () => {
        const userInfo = {
            userId:input.userId,
            password:input.password,
            nickname:input.nickname,
            address:{
                region1depthName:input.address.region1depthName,
                region2depthName:input.address.region2depthName,
                region3depthName:input.address.region3depthName,
            }
        };
        userSignup(userInfo);
    }

    // 가입하기 버튼 클릭 이벤트핸들러
    const onSubmitJoinHandler = (e) => {
        e.preventDefault()
        const userInfo = {
            userId:input.userId,
            password:input.password,
            nickname:input.nickname,
            address:{
                region1depthName:input.address.region1depthName,
                region2depthName:input.address.region2depthName,
                region3depthName:input.address.region3depthName,
            }
        };
        userSignup(userInfo);
    };

  return (
    <IntroLayout>
        <Backbutton type='button' onClick={() => navigate(-1)}><SlArrowLeft /></Backbutton>
        <h1 style={{marginTop:"40px",marginBottom:"0px"}}>회원가입</h1>
        <StForm onSubmit={onSubmitJoinHandler}>
            <div>
                <Flx>
                    <label htmlFor='nickname'>닉네임</label>
                    <Input 
                    type="text" 
                    value={input.nickname} 
                    id='nickname' 
                    placeholder='3~10글자 사이 영문' 
                    onChange={onChangeInputHandler}/>
                    {/* <CommonButton size='small' onClick={() => onSubmitJoinHandler}>중복확인</CommonButton> */}
                    {
                        /^[a-zA-Z]{3,10}$/.test(input.nickname) ?
                        null
                        :
                        <p className='alertText'>5~10글자 사이 영문을 사용하세요.</p>
                    }
                </Flx>

                <Flx>
                    <label htmlFor='userId'>아이디</label>
                    <StyledInput 
                    type="text" 
                    value={input.userId} 
                    id='userId' 
                    placeholder='5~10글자 사이 영문 소문자,숫자' 
                    onChange={onChangeInputHandler}/>
                    <CommonButton size='small' onClick={() => userSignup}>중복확인</CommonButton>
                    {
                        /^[a-z0-9]{8,15}$/.test(input.userId) ?
                        null
                        :
                        <p className='alertText'>8~15글자 사이 영문 소문자,숫자를 사용하세요.</p>
                    }
                </Flx>
                
                <Flx>
                    <label htmlFor='password'>패스워드</label>
                    <Input 
                    type="password" 
                    value={input.password} 
                    id='password' 
                    placeholder='8~15글자 사이 영문,숫자,특수문자' 
                    onChange={onChangeInputHandler}/>
                    {
                        /^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,.<>?[\]\\/]{8,15}$/.test(input.password) ?
                        null
                        :
                        <p className='alertText'>8~15글자 사이 영문,숫자,특수문자를 사용하세요.</p>
                    }
                    
                </Flx>

                <Flx>
                    <label htmlFor='PWConfirm'>중복확인</label>
                    <Input 
                    type="password" 
                    value={input.pwConfirm} 
                    id='pwConfirm' 
                    placeholder='비밀번호 확인을 위해 한번 더 입력해주세요' 
                    onChange={onChangeInputHandler}/>
                    {
                        input.password === input.pwConfirm ?
                        null
                        :
                        <p className='alertText'>비밀번호가 일치하지 않습니다.</p>
                    }
                </Flx>

                <Flx>
                    <label htmlFor='address'>주소</label>
                    <Input 
                        type="text" 
                        value={input?.address?.region1depthName} 
                        id="region1depthName"
                        style={{width:"30%",marginBottom:"15px"}} 
                        placeholder='ex) 서울시' 
                        onChange={onChangeInputHandler}/>
                    <Input 
                        type="text" 
                        value={input?.address?.region2depthName} 
                        id='region2depthName' 
                        style={{width:"30%",marginBottom:"15px"}} 
                        placeholder='ex) 노원구' 
                        onChange={onChangeInputHandler}/>
                    <Input 
                        type="text" 
                        value={input?.address?.region3depthName} 
                        id='region3depthName'
                        style={{width:"30%",marginBottom:"15px"}} 
                        placeholder='ex) 공릉동' 
                        onChange={onChangeInputHandler}/>
                </Flx>
                <CommonButton size="small" style={{float:"right"}} onClick={() => onSubmitJoinHandler}>주소 확인</CommonButton>
                
            </div>
            <CommonButton size='large'>가입하기</CommonButton>
        </StForm>
    </IntroLayout>
  )
}

export default SignUp;

const Backbutton = styled.button`
    position:relative;
    top:20px;
    left:0;
    border:none;
    background-color:transparent;
    font-size:22px;
    color:#777;
`
const StForm = styled.form`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height:calc(100vh - 190px);
    padding-top:30px;
    box-sizing:border-box;
    &>div>div{
        position:relative;
        border:1ps solid #f00;
    }

    & label{
        display:inline-block;
        width:65px;
        line-height:43px;
        font-weight:500;
    }
    & .alertText{
        position:absolute;
        top:45px;
        display:inline-block;
        color:#f00;
        margin:3px 0 25px;
        transform:translateX(70px);
    }
    & input{
        display:inline-block;
        width:calc(100% - 65px);
        margin-bottom:50px;
    }
`
const StyledInput = styled(Input)`
  display: inline-block;
  width:calc(100% - 168px) !important;
  margin-right:8px;
`;
