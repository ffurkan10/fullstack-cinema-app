// Login.tsx
import React, { useState } from 'react'
import styled from 'styled-components'
import InputMail from '../../components/elements/inputs/InputMail'
import InputPassword from '../../components/elements/inputs/InputPassword'
import Button from '../../components/elements/buttons/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { login, register } from '../../features/auth/authSlice'
import { Link } from 'react-router-dom'
import InputText from '../../components/elements/inputs/InputText'

const Container = styled.div`
  width: 700px;
  height: 100%;
  margin: 0 auto;
  .register-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    min-height: 80vh;
    h1{
      color: #fff;
    }
    form{
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }

    .login-link{
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

const Register = () => {

  const dispatch = useDispatch<AppDispatch>()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  })
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    e.preventDefault()
    if(data.password === data.passwordConfirm) {
      dispatch(register(data))
    }
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
        <div className="register-container">
          <h1>Cineverse' e Hoşgeldiniz!</h1>
          <form onSubmit={handleSubmit}> 
            <InputText data={data.name} setData={handleChange} name="name" labelText="Ad Soyad" width='100%' height="50px" />
            <InputMail data={data.email} setData={handleChange} name="email" labelText="E-Mail" width='100%' height="50px" />
            <InputPassword data={data.password} setData={handleChange} handleClick={changePasswordVisibility} type={passwordVisible ? "text" : "password"} name="password" labelText="Şifre" width='100%' height="50px" />
            <InputPassword data={data.passwordConfirm} setData={handleChange} handleClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} type={confirmPasswordVisible ? "text" : "password"} name="passwordConfirm" labelText="Şifre Tekrar" width='100%' height="50px" />
            { isSubmitting && (data.password !== data.passwordConfirm) && <p style={{ color: 'red' }}>Şifreler eşleşmiyor!</p>}
            <Button color='#fff' bgColor='#96a825' type='submit' border='1px solid #96a825' borderRadius='10px' text="Giriş Yap" />
          </form>
          <div className='login-link'>
            <p>Zaten hesabınız var mı? <Link to="/giris-yap">Giriş Yapın</Link></p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Register
