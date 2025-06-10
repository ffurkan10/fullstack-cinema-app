import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { RootState } from "../../store/store";
import PaymentCard from "../../components/cards/PaymentCard";

const Container = styled.div`
    width: 100%;
    height: 100%;
    
    .error{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
        height: 40vh;
        h1{
            color: #fff;
        }
        p{
            color: #fff;
            font-size: var(--font-size-sm);
        }
        a{
            background-color: var(--color-main);
            color: #fff;
            padding: 10px 20px;
            border-radius: 10px;
            text-decoration: none;
            font-size: var(--font-size-md);
            font-weight: var(--font-weight-md);
        }
    }
    .payment-detail{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 80vh;

        .auth-info{
            text-align: center;
            margin-block: 20px;
            p{
                color: #fff;
                font-size: var(--font-size-sm);
            }
            a{
                color: var(--color-main);
                text-decoration: underline;
                font-weight: var(--font-weight-md);

            }
        }
    }
`

const Payment = () => {

    const token = localStorage.getItem("token");
    const {selectedSeatList} = useSelector((state: RootState) => state.seat)

    if(selectedSeatList?.length < 1){
        return (
            <Container>
                <div className="error">
                    <h1>Ödeme Yapmak İçin Öncelikle Bir Film Seçmelisiniz</h1>
                    <p>Favori filmlerinizi seçip, biletlerinizi alabilirsiniz.</p>
                    <Link to={"/filmler"}>Filmler</Link>
                </div>
            </Container>
        )
    }

  return (
    <Container>
        <div className="container">
            <div className="payment-detail">
                <PaymentCard />

                {!token && 
                    <div className="auth-info">
                        <p>Gördüğümüz karadıyla henüz giriş yapmamışsınız. Kampanyalardan yararlanmak ve bilgilendirmelerden haberdar olmak için üye olabilirsiniz. <Link to={"/kayit-ol"}>Kayıt Ol</Link></p>
                    </div>
                }
            </div>

        </div>
    </Container>
  )
}

export default Payment