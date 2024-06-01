import styled from 'styled-components';
import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login, signup } from '../api/auth.api';
import { useAlert } from '../hooks/useAlert';
import { SignupStyle } from './Signup';
import { useAuthStore } from '../store/authStore';

export interface SingupProps {
  name: string;
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const { storeLogin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingupProps>();

  const onSubmit = (data: SingupProps) => {
    login(data)
      .then((res) => {
        storeLogin(res.token);

        showAlert('로그인이 완료되었습니다.');
        navigate('/');
      })
      .catch((error) => {
        showAlert(
          '이메일 또는 비밀번호가 유효하지 않습니다. 다시 한번 확인해 주세요'
        );
      });
  };

  return (
    <>
      <Title size='large'>로그인</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeHolder='이메일'
              inputType='email'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className='error-text'>이메일을 입력해 주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeHolder='비밀번호'
              inputType='password'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className='error-text'>비밀번호를 입력해 주세요</p>
            )}
          </fieldset>
          <fieldset>
            <Button type='submit' size='medium' scheme='primary'>
              로그인
            </Button>
          </fieldset>
          <div className='info'>
            <Link to='/reset'>비밀번호 초기화</Link>
            <Link to='/signup'>회원가입</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
}
