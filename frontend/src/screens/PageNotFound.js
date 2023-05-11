import React from 'react'
import { Button } from 'react-bootstrap'
import notFound from '../images/notFound.PNG'
import styles from '../components/EmailVerifyStyles.module.css'
import { useHistory } from 'react-router'

const PageNotFound = () => {
  const history = useHistory()
  const homePage = () => {
    let path = '/'
    history.push(path)
  }

  return (
    <div className='py-5'>
      <div className={styles.container}>
        <img
          src={notFound}
          alt='404'
          style={{ height: '350px', width: '400px' }}
          className={styles.success_img}
        />
        <h1>404 Not Found</h1>
        <Button variant='success' onClick={homePage}>
          <i class='fa fa-regular fa-house'></i> Accueil
        </Button>
      </div>
    </div>
  )
}

export default PageNotFound
