import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
import {MdOutlineShoppingBag} from "react-icons/md"
import {AiOutlineHome} from "react-icons/ai"
import {ApplicationPaths} from "../../../components/api-authorization/ApiAuthorizationConstants"
import { Container, Row, Col } from "react-bootstrap";
import { HiOutlineUser } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { TbAddressBook } from "react-icons/tb";
import { AppPath } from '../../../AppPathConstant'

const ProfileMenu = ({children}) => {
  return (
    
  <Container>
    <Row className="d-flex justify-content-center">
     <Col className="col-lg-4 col-sm-12 border rounded p-3">
          <ul className='list-group list-group-flush'>
              <li className="list-group-item">zahra</li>
              <li className="list-group-item"><Link><AiOutlineHome className="ml-1" size={20}/>خلاصه فعالیت ها</Link></li>
              <li className="list-group-item"><Link><MdOutlineShoppingBag className="ml-1" size={20} />سفارش ها</Link></li>
              <li className="list-group-item"><Link><TbAddressBook className="ml-1" size={20} /> آدرس ها</Link></li>
              <li className="list-group-item"><Link to={AppPath.User_Info}><HiOutlineUser className="ml-1" size={20}/>اطلاعات حساب کاربری</Link></li>
              <li className="list-group-item"><Link to={{ pathname: `${ApplicationPaths.LogOut}`, state: { local: true } }}> <TbLogout className="ml-1" size={20} />خروج</Link></li>
          </ul>
      </Col>
      <Col className="col-lg-7 col-sm-12 mr-2">
        {children}
      </Col>
    </Row>
  </Container>
    
  )
}

ProfileMenu.propTypes = {}

export default ProfileMenu