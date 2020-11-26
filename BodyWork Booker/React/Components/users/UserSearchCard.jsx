import React from "react";
import { Col, Card, CardHeader, CardFooter, Media } from "reactstrap";
import PropTypes from "prop-types";
import "./UserSearchCard-Style.css";
//import UserSearchDeactivated from "./UserSearchCardDeactivated";

const UserSearchCard = (props) => {
  const aUser = props.userObj;

  const onDeactivate = () => {
    props.onDeactivate(aUser);
  };

  const onActivate = () => {
    props.onActivate(aUser);
  };

  const getBckGrnd = () => {
    return aUser.userStatusId !== 1
      ? "https://christslegacyacademy.org/wp-content/uploads/sites/27/2016/01/backgrounds-gradient-red-red-background-844915-1920x1080.png"
      : "https://i.imgur.com/GCJRhiA.png";
  };

  return (
    <React.Fragment>
      <Col className="col-md-3 col-lg-3 col-xl-3 box-col-3">
        <Card className="custom-card card">
          <CardHeader>
            <Media body className="img-fluid" src={getBckGrnd()} alt="" />
          </CardHeader>
          <div className="card-profile">
            <Media
              body
              className="rounded-circle"
              src={
                (aUser.userProfile && aUser.userProfile.avatarUrl) ||
                "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
              }
              alt=""
            />
          </div>

          <div className="text-center profile-details">
            <h4>
              {(aUser.userProfile && aUser.userProfile.firstName) || "Uknown"}{" "}
              {aUser.userProfile && aUser.userProfile.mi}{" "}
              {(aUser.userProfile && aUser.userProfile.lastName) || "Name"}
            </h4>
            <h6 className="customCardBottom">
              {(aUser && aUser.roles) || "Undefined Role"}
            </h6>
            <h6 className="customCardBottom">
              {(aUser && aUser.email) || "Uknown Name"}
            </h6>

            {/* <h6>
                  User Profile Id: {""}
                  {aUser.id}
                </h6> */}
          </div>
          <CardFooter className="row">
            <Col sm="6 col-4">
              {aUser.userStatusId && aUser.userStatusId === 1 ? (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm d-inline-flex-reverse p-2 ml-2"
                  disabled
                >
                  Active
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-sm d-inline-flex-reverse p-2 ml-2"
                  onClick={onActivate}
                >
                  Reactivate
                </button>
              )}
            </Col>
            <Col sm="6 col-4">
              {/* {aUser.userStatusId && aUser.userStatusId === 1 ? (
                <button
                  type="button"
                  className="btn btn-danger btn-sm d-inline-flex-reverse p-2 ml-0"
                  onClick={onDeactivate}
                >
                  Deactivate
                </button>
              ) : (
                <h5 className="text-danger">INACTIVE</h5>
              )} */}
              {aUser.userStatusId && aUser.userStatusId === 1 ? (
                <button
                  type="button"
                  className="btn btn-danger btn-sm d-inline-flex-reverse p-2 ml-0"
                  onClick={onDeactivate}
                >
                  Deactivate
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm d-inline-flex-reverse p-2 ml-0"
                  disabled
                >
                  INACTIVE
                </button>
              )}
            </Col>
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};

// {aUser.userStatusId ? (): ()}

UserSearchCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    isConfirmed: PropTypes.bool,
    userStatusId: PropTypes.number,
    userProfile: PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string,
      locationId: PropTypes.number,
      phone: PropTypes.string,
    }),
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
  onDeactivate: PropTypes.func,
  onActivate: PropTypes.func,
};

export default UserSearchCard;
