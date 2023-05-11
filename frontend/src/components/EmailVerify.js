import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import success from '../images/emailVerifier.PNG'
import fail from '../images/notFound.PNG'
import styles from './EmailVerifyStyles.module.css'
import { Fragment } from 'react/cjs/react.production.min'
import Singin from './Signin'

const EmailVerify = () => {
  const [modalShow, setModalShow] = useState(false)
  const [validUrl, setValidUrl] = useState(true)
  const param = useParams()
  const history= useHistory()
  const verifyEmailUrl = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKURL}/user/${param.id}/verify/${param.token}`
      const { data } = await axios.get(url)
      console.log('hh', data)
      setValidUrl(true)
    } catch (error) {
      console.log(error)
      setValidUrl(false)
    }
  }
  useEffect(() => {
    console.log('verif')
    verifyEmailUrl()
  }, [param])

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img
            src={success}
            alt='success_img'
            style={{ height: '350px', width: '400px' }}
            className={styles.success_img}
          />
          <h1>Email verified successfully</h1>
          
            <Button onClick={() => {setModalShow(true);}} variant='success'>Se connecter</Button>

          <Singin show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      ) : (
        <>
          <div className={styles.container}>
            <img
              src={fail}
              alt='404'
              style={{ height: '350px', width: '400px' }}
              className={styles.success_img}
            />
            <h1>404 Not Found</h1>
          </div>
        </>
      )}
    </Fragment>
  )
}

export default EmailVerify
