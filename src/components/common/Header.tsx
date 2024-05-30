import styled from 'styled-components';
import { FaBook, FaSignInAlt, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CATEGORY = [
  { id: null, category: '전체' },
  { id: 1, category: '동화' },
  { id: 2, category: '소설' },
  { id: 3, category: '사회' },
];

export default function Header() {
  return (
    <HeaderStyle>
      <h1 className='logo'>
        <Link to='/' className='link'>
          <FaBook />
          <span className='title'>Book Store</span>
        </Link>
      </h1>
      <nav className='category'>
        <ul>
          {CATEGORY.map((item) => (
            <li key={item.id}>
              <Link
                to={
                  item.id === null ? '/books' : `/books?category_id=${item.id}`
                }
              >
                {item.category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className='auth'>
        <ul>
          <li>
            <Link to='/login'>
              <FaSignInAlt />
              로그인
            </Link>
          </li>
          <li>
            <Link to='/login'>
              <FaRegUser />
              회원가입
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    .link {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
  }

  .category {
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.2rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 16px;
      li {
        a {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          line-height: 1;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }
`;
