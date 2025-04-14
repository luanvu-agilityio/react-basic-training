import styled from 'styled-components';
import Title from '@components/common/Title';
import Text from '@components/common/Text';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  height: 70vh;

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
    height: 60vh;
  }

  @media screen and (max-width: 480px) {
    padding: 1rem;
    height: auto;
    min-height: 50vh;
  }
`;

const Header = styled.div`
  margin-bottom: 1rem;

  @media screen and (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

const PageTitle = styled(Title)`
  font-size: 2rem;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  max-width: 50rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    padding: 2rem;
  }

  @media screen and (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 480px) {
    margin-bottom: 1rem;

    img {
      max-width: 8rem;
    }
  }
`;

const Notification = styled(Text)`
  font-size: 2.5rem;
  color: #252733;
  margin-bottom: 1rem;

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

const Message = styled(Text)`
  color: #9fa2b4;
  line-height: 1.6;
  max-width: 50rem;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    max-width: 100%;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const PageNotAvailable = ({ pageName }: { pageName: string }) => {
  return (
    <Container>
      <Header>
        <PageTitle title={pageName} />
      </Header>
      <Content>
        <ImageContainer>
          <img
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868072/page-not-found_omhbr6.png"
            alt="Page Not Found"
          />
        </ImageContainer>
        <Notification text="Page not available at the moment" />
        <Message text="This feature is under development and will be updated soon. Please check back later." />
      </Content>
    </Container>
  );
};

export default PageNotAvailable;
