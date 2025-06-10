// Login.tsx
import React, { useState } from 'react'
import styled from 'styled-components'
import InputMail from '../../components/elements/inputs/InputMail'
import InputPassword from '../../components/elements/inputs/InputPassword'
import Button from '../../components/elements/buttons/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { login } from '../../features/auth/authSlice'
import { Link } from 'react-router-dom'

const Container = styled.div`
  width: 700px;
  height: 100%;
  margin: 0 auto;
  .login-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    height: 60vh;
    h1{
      color: #fff;
    }
    form{
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }

    .register-link{
      text-align: center;
      p{
        color: #fff;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-md);
      }
      a{
        color: #96a825;
        text-decoration: underline;
       font-size: var(--font-size-sm);
        font-weight: var(--font-weight-md);
      }
    }
  }

  @media (max-width: 800px) {
    width: 400px;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`

const Login = () => {

  const dispatch = useDispatch<AppDispatch>()
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(data))
  }

  const changePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  if(localStorage.getItem("token")) {
    window.location.href = "/"
  }

  return (
    <Container>
      <div className="container">
        <div className="login-container">
          <h1>Cineverse' e Hoşgeldiniz!</h1>
          <form onSubmit={handleSubmit}> 
            <InputMail data={data.email} setData={handleChange} name="email" labelText="E-Mail" width='100%' height="50px" />
            <InputPassword data={data.password} setData={handleChange} handleClick={changePasswordVisibility} type={passwordVisible ? "text" : "password"} name="password" labelText="Şifre" width='100%' height="50px" />
            <Button color='#fff' bgColor='#96a825' type='submit' border='1px solid #96a825' borderRadius='10px' text="Giriş Yap" />
          </form>
          <div className='register-link'>
            <p>Hesabınız yok mu? <Link to="/kayit-ol">Kayıt Olun</Link></p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Login
