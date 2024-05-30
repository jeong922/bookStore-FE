import styled from 'styled-components';
import { FaBook, FaSignInAlt, FaRegUser } from 'react-icons/fa';

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
        <FaBook />
        <span>Book Store</span>
      </h1>
      <nav className='category'>
        <ul>
          {CATEGORY.map((item) => (
            <li key={item.id}>
              <a
                href={
                  item.id === null ? '/books' : `/books?category_id=${item.id}`
                }
              >
                {item.category}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <nav className='auth'>
        <ul>
          <li>
            <a href='/login'>
              <FaSignInAlt />
              로그인
            </a>
          </li>
          <li>
            <a href='/login'>
              <FaRegUser />
              회원가입
            </a>
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
    display: flex;
    align-items: center;
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
