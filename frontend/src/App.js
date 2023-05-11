import React from 'react'
import 'swiper/css/bundle'

import '@stripe/react-stripe-js'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import AventuresScreen from './screens/AventuresScreen'
import EventScreen from './screens/EventScreen'
import DashboardScreen from './screens/DashboardScreen'
import UserScreen from './screens/UserScreen'
import ReservationScreen from './screens/ReservationScreen'
import PayementScreen from './screens/PayementScreen'
import SettingsScreen from './screens/SettingsScreen'
import ContactScreen from './screens/ContactScreen'
import FavoriScreen from './screens/FavoriScreen'

import QuizzHomeScreen from './screens/QuizzHomeScreen'
import ResetPasswordRequestScreen from './screens/ResetPasswordRequestScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import QuizzScreen from './screens/QuizzScreen'
import QuizzListScreen from './screens/QuizzListScreen'
import CreateEventScreen from './screens/CreateEventScreen'
import EventDetailsScreen from './screens/EventDetailsScreen'

import CardList from './components/CardList'
import { ToastContainer } from 'react-toastify'
import ChatScreen from './screens/ChatScreen'
import UserEventCalendar from './screens/UserEventCalendar'
import EventMapScreen from './screens/EventMapScreen'

import 'leaflet/dist/leaflet.css'
import EventMap from './components/EventMap'
import AdminSideBar from './components/AdminSideBar'
import AdminDashboardScreen from './screens/AdminDashboardScreen'
import AdminEventDetails from './components/AdminEventDetails'
import EmailVerify from './components/EmailVerify'
import EmailVerifyModelTest from './components/EmailVerifyModelTest'
import PageNotFound from './screens/PageNotFound'

require('react-datepicker/dist/react-datepicker.css')

const App = () => {
  return (
    <div className='app-main-container'>
      <Router>
        <Header />
        <main className='py-3'>
          <Switch>
            <Route path='/map' component={EventMap} />
            <Route path='/AdminDashBoard'>
              <AdminDashboardScreen />
            </Route>
            <Route path='/payement' component={PayementScreen} />
            <Route path='/aventures' component={AventuresScreen} exact />
            <Route path='/quizz' component={QuizzHomeScreen} />
            <Route path='/contactez-nous' component={ContactScreen} />
            <Route path='/event/:id' component={EventScreen} />
            <Route path='/dashboard/' component={DashboardScreen} />
            <Route path='/parametres' component={SettingsScreen} />
            <Route path='/favori' component={FavoriScreen} />
            <Route path='/profile' component={UserScreen} />
            <Route path='/chat' component={ChatScreen} />
            <Route path='/calendrier' component={UserEventCalendar} />
            <Route
              path='/reinisialise-mot-de-passe'
              component={ResetPasswordRequestScreen}
            />
            <Route
              path='/reinisialisation-mot-de-passe/:token'
              component={ResetPasswordScreen}
            />
            <Route path='/users/:id/verify/:token' component={EmailVerify} />
            <Route path='/verify' component={EmailVerifyModelTest} />
            <Route path='/card-list' component={CardList} />
            <Route path='/event-details/:id' component={EventDetailsScreen} />
            <Route path='/create-event' component={CreateEventScreen} />
            <Route path='/take-quizz/:id' component={QuizzScreen} />
            <Route path='/quizz-list' component={QuizzListScreen} />
            <Route path='/panier' component={ReservationScreen} />
            <Route path='/' component={HomeScreen} exact />
            <Route component={PageNotFound} />
          </Switch>
        </main>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
