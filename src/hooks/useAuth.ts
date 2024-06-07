import { login, resetPassword, resetRequest, signup } from '@/api/auth.api';
import { LoginProps } from '@/pages/Login';
import { useAuthStore } from '@/store/authStore';
import { useAlert } from './useAlert';
import { useNavigate } from 'react-router-dom';
import { SingupProps } from '@/pages/Signup';
import { useState } from 'react';

export const useAuth = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { storeLogin, storeLogout, isloggedIn } = useAuthStore();
  const [error, setError] = useState('');
  const [resetRequested, setResetRequested] = useState(false);

  useAuthStore();

  const userLogin = (data: LoginProps) => {
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

  const userSignup = (data: SingupProps) => {
    signup(data).then((res) => {
      showAlert('회원가입이 완료되었습니다.');
      navigate('/login');
    });
  };

  const userResetPassword = (data: SingupProps) => {
    resetPassword(data)
      .then(() => {
        showAlert('비밀번호가 초기화 되었습니다.');
        navigate('/login');
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const userResetRequest = (data: SingupProps) => {
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
  };

  return {
    userLogin,
    userSignup,
    userResetPassword,
    error,
    userResetRequest,
    resetRequested,
  };
};
