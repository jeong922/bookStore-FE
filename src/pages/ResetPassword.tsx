import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../hooks/useAlert';
import { useForm } from 'react-hook-form';
import { resetPassword, resetRequest } from '../api/auth.api';
import { SignupStyle } from './Signup';
import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { useState } from 'react';

export interface SingupProps {
  name: string;
  email: string;
  password: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [resetRequested, setResetRequested] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingupProps>();

  const onSubmit = (data: SingupProps) => {
    if (resetRequested) {
      resetPassword(data)
        .then(() => {
          showAlert('비밀번호가 초기화 되었습니다.');
          navigate('/login');
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    } else {
      setError('');
      resetRequest(data)
        .then(() => {
          setResetRequested(true);
        })
        .catch((error) => {
          const code = error.response.request.status;
          let message: string = '';

          switch (code) {
            case 401:
              message = '이메일을 확인해 주세요.';
              break;
            default:
              console.log(`${code}에 해당하는 값이 없음!`);
          }
          setError(message);
        });
    }
  };

  return (
    <>
      <Title size='large'>비밀번호 초기화</Title>
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
          {resetRequested && (
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
          )}
          <fieldset>
            <Button type='submit' size='medium' scheme='primary'>
              {resetRequested ? '비밀번호 초기화' : '초기화 요청'}
            </Button>
          </fieldset>
          {error && <p className='error-text'>{error}</p>}
          <div className='info'>
            <Link to='/login'>로그인 페이지</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
}
