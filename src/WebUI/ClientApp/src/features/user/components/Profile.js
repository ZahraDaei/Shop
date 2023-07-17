import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileMenu from "./ProfileMenu";
import UserInfo from "./UserInfo";
import { AppPath } from "../../../AppPathConstant";
import AuthorizeRoute from "../../../components/api-authorization/AuthorizeRoute";
import ActivitySummary from "./ActivitySummary";

const Profile = () => {
  return (
    <ProfileMenu>
      <AuthorizeRoute exact path={AppPath.Profile} component={ActivitySummary} />
      <AuthorizeRoute exact path={AppPath.User_Info} component={UserInfo} />
    </ProfileMenu>
  );
};

export default Profile;
