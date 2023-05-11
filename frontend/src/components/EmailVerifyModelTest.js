import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav } from 'react-bootstrap'
import Singin from './Signin'
import success from '../images/emailVerifier.PNG'
import fail from '../images/notFound.PNG'
import styles from './EmailVerifyStyles.module.css'

const EmailVerifyModelTest = () => {
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <div className={styles.container}>
      <img
        src={success}
        alt='success_img'
        style={{ height: '350px', width: '400px' }}
        className={styles.success_img}
      />
      <h1>Email verified successfully</h1>

      <Link onClick={() => setModalShow(true)}>
        <Button variant='success'>Se connecter</Button>
      </Link>
      <Singin show={modalShow} onHide={() => setModalShow(false)} />

      {/* <img src={fail} alt='404' style={{ height: '350px', width: '400px' }} className={styles.success_img} />
      <h1>404 Not Found</h1> */}
    </div>
  )
}

export default EmailVerifyModelTest
