import MainReview from '@/components/main/MainReview';
import { useMain } from '@/hooks/useMain';
import styled from 'styled-components';

export default function Home() {
  const { reviews } = useMain();
  return (
    <HomeStyle>
      <h1>Home</h1>
      <MainReview reviews={reviews} />
    </HomeStyle>
  );
}

const HomeStyle = styled.div``;
