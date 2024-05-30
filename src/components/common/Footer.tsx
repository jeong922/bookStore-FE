import { FaBook } from 'react-icons/fa';
import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterStyle>
      <h1 className='logo'>
        <FaBook />
        <span>Book Store</span>
      </h1>
      <div className='copyright'>
        <p>copyright(c), 2024, book store.</p>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  border-top: 1px solid ${({ theme }) => theme.color.background};
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }

  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.text};
    }
  }
`;
