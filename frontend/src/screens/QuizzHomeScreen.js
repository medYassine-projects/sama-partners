import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizzList } from '../actions/quizzAction'
import { Row, Col, Button, Card, Container, Figure } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import slide1 from '../images/imageslide1.jpg'
import slide2 from '../images/imageslide2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa1, fa2, fa3, fa4, fa5 } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'


const QuizzHomeScreen = () => {
  const history = useHistory()
  const user = useSelector((state) => state.userLogin)
  const routeChange = () => {
    if (user?.userInfo?.data) {
    let path = `/quizz-list`

    history.push(path) }else{
      toast.error('Veuillez vous connecter pour passer un quiz', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getQuizzList())
  }, [])

  return (
    <div>
      <Row className='bg-primary py-5'>
        <h1 align='center' className='text-success'>
          Ton Niveau !
        </h1>
        <h4 className='text-white' align='center'>
          Découvre ton niveau sur notre échelle de 1 à 5 !
        </h4>{' '}
        <h4 className='text-white' align='center'>
          Prends 1 minute pour répondre à ces 5 questions.
        </h4>
        <div align='center'>
          <Button type='button' className='btn-success' onClick={routeChange}>
            Commencer
          </Button>
        </div>
      </Row>
      <Row className='py-2'>
        <Figure align='center'>
          <Figure.Image
            rounded
            width={900}
            height={560}
            alt='600x560'
            src={slide1}
          />
        </Figure>
      </Row>
      <Row className='py-5'>
        <Col>
          <center>
            <FontAwesomeIcon icon={fa1} size='6x' className='facolor' />
          </center>
          <p className='px-5 text-center'>
            Tu peux marcher, te déplacer sans contraintes pendant plusieurs
            heures, mais tu n’as pas de bagage technique. Tu es niveau 1 !
          </p>
        </Col>
        <Col>
          <center>
            <FontAwesomeIcon icon={fa2} size='6x' className='facolor' />
          </center>
          <p className='px-5 text-center'>
            Aucune compétence technique à avoir, seulement l’envie de sortir de
            la routine et de découvrir ce dont tu es capable dans un cadre
            naturel dépaysant, et pourquoi pas dans une activité nouvelle. Tu es
            niveau 2
          </p>
        </Col>
      </Row>

      <Row className='py-5'>
        <Col>
          <center>
            <FontAwesomeIcon icon={fa3} size='6x' className='facolor' />
          </center>
          <p className='px-5 text-center'>
            Envie de découverte ou de challenge, ce niveau t’offre la
            possibilité de mieux connaître tes limites et de te dépasser dans un
            environnement qui peut parfois se révéler exigeant selon les
            conditions météorologiques (neige, pluie, vents). Néanmoins, tu n’as
            pas nécessairement besoin d’un bagage technique poussé. Tu es niveau
            3 !
          </p>
        </Col>
        <Col>
          <center>
            <FontAwesomeIcon icon={fa4} size='6x' className='facolor' />
          </center>
          <p className='px-5 text-center'>
            Il te faudra pratiquer un sport d’endurance (natation, course à
            pieds ou cyclisme) plusieurs fois par semaine et à haute intensité
            pour t’engager sur cette expé. Prêt à vivre une aventure humaine
            avec des moments d’effort physique soutenus, dans un environnement
            parfois imprévisible ? Tu es niveau 4
          </p>
        </Col>
      </Row>
      <Row className='py-3'>
        <div align='center'>
          <div className='w-80'>
            <center>
              <FontAwesomeIcon icon={fa5} size='6x' className='facolor' />
            </center>
            <p className='px-5 text-center w-50'>
              Au delà d’une condition physique irréprochable, Il te faudra de
              l’engagement, une capacité à endurer le risque et les conditions
              météorologiques complexes, et accepter l’éloignement de tout
              secours/civilisation. Prêt pour l’aventure ultime ? Tu es niveau 5
              !
            </p>
          </div>
        </div>
      </Row>
      <div align='center'>
        <Button type='button' className='btn-success' onClick={routeChange}>
          Commencer
        </Button>
      </div>
    </div>
  )
}

export default QuizzHomeScreen
