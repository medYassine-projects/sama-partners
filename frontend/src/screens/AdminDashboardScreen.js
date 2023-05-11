import React from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import {
  withRouter,
  Route,
  Switch,
  useRouteMatch,
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom'
import AdminEventDetails from '../components/AdminEventDetails'
import AdminEventList from '../components/AdminEventList'
import AdminHome from '../components/AdminHome'
import AdminQuizList from '../components/AdminQuizList'
import AdminSideBar from '../components/AdminSideBar'
import AdminUserList from '../components/AdminUserList'
import { useSelector } from 'react-redux'


const AdminDashboardScreen = (props) => {
  const { path, url } = useRouteMatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const role=userInfo?.data?.role
  const history=useHistory()
  return (
    <>{role==="admin"? (
      <Container fluid>
        <Row>
          <Col md={2}>
            <AdminSideBar />
          </Col>
          <Col md={10}>
            <Route path='/AdminDashboard' exact={true} component={AdminHome} />
            <Route path={`${path}/users`} component={AdminUserList} />
            <Route path={`${path}/events`} component={AdminEventList} />
            <Route path={`${path}/events/` + ':id'}>
              <AdminEventDetails />
            </Route>
            <Route path={`${path}/quiz`} component={AdminQuizList} />
          </Col>
        </Row>
      </Container>
    ):history.push('/')}</>
  )
}

const Dashboard = withRouter(AdminDashboardScreen)

export default AdminDashboardScreen
