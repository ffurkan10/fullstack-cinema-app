import styled from 'styled-components';

const SpinnerContainer = styled.div`
    width: 100%;
    min-height: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .spinner{
        width: 50px;
        height: 50px;
        border: 4px solid rgba(0, 0, 0, 0.1); 
        border-top-color: #96a825;              
        border-radius: 50%;
        animation: spin 1s ease-in-out infinite;
        margin: auto;                           
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`

const Spinner = () => {

  return (
    <SpinnerContainer>
        <div className="spinner" />
    </SpinnerContainer>
  )
};

export default Spinner;
