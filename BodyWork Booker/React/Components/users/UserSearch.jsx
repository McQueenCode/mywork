import React from "react";
import UserSearchCard from "../users/UserSearchCard";
import * as usersService from "../../services/usersService";
//import BreadCrumb from "../../layout/Breadcrumb";
//import Swal from "sweetalert2";
import { CardDeck } from "reactstrap";
import Swal from "sweetalert2";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import debug from "sabio-debug";
const _logger = debug.extend("Comment");

class UserSearch extends React.Component {
  state = {
    userData: {
      id: "",
      email: "",
      isConfirmed: true,
      userStatusId: 0,
      userProfile: {
        id: "",
        userId: 0,
        firstName: "",
        lastName: "",
        mi: "",
        avatarUrl: "",
        locationId: 0,
        phone: "",
      },
    },

    roles: "",
    users: [],
    usersList: [],
    currentPage: 1,
    pageSize: 8,
    totalCount: 0,
    query: "",
  };

  componentDidMount = () => {
    this.getAllUsers();
  };

  //--Get-All-Users----------------------------------------------------------------//

  getAllUsers = () => {
    const pageIndex = this.state.currentPage - 1;
    const pageSize = this.state.pageSize;
    const query = this.state.query;

    if (query)
      usersService
        .getSearch(pageIndex, pageSize, query)
        .then(this.onGetAllSuccess)
        .catch(this.onGetAllError);
    else {
      usersService
        .getAllDetailedUsers(pageIndex, pageSize)
        .then(this.onGetAllSuccess)
        .catch(this.onGetAllError);
    }
  };

  onGetAllSuccess = (data) => {
    let users = data.item.pagedItems;

    this.setState((prevState) => ({
      ...prevState,
      users,
      usersList: users.map(this.mapUsers),
      totalCount: data.item.totalCount,
    }));
  };

  onGetAllError = (error) => {
    _logger(error);
  };

  mapUsers = (aUser) => (
    <UserSearchCard
      key={aUser.id}
      userObj={aUser}
      onDeactivate={this.onDeactivate}
      onActivate={this.onActivate}
    />
  );

  //--FormInputChanged----------------------------------------------------------------//

  // onFormInputChanged = (e) => {
  //   let currentTarget = e.currentTarget;
  //   let value = currentTarget.value;
  //   let name = currentTarget.name;

  //   this.setState((prevState) => {
  //     return {
  //       ...prevState,
  //       userData: { ...prevState.userData, [name]: value },
  //     };
  //   });
  //   _logger(value);
  // };

  //--Pagination-Functions----------------------------------------------------------------//

  onSelectFilterChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    const pageIndex = this.state.currentPage - 1;
    const pageSize = this.state.pageSize;

    if (newValue === "All") {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            currentPage: 1,
            pageSize,
            roles: newValue,
          };
        },
        () => {
          this.getAllUsers();
        }
      );
    } else {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            currentPage: 1,
            pageSize,
            roles: newValue,
          };
        },
        () => {
          usersService
            .getFilter(pageIndex, pageSize, newValue)
            .then(this.onGetAllSuccess)
            .catch(this.onGetAllError);
        }
      );
    }
  };

  onSelectStatusChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    const pageIndex = this.state.currentPage - 1;
    const pageSize = this.state.pageSize;

    if (newValue === "All") {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            currentPage: 1,
            pageSize,
            userStatusId: newValue,
          };
        },
        () => {
          this.getAllUsers();
        }
      );
    } else {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            currentPage: 1,
            pageSize,
            userData: { userStatusId: newValue },
          };
        },
        () => {
          usersService
            .getByUserStatus(pageIndex, pageSize, newValue)
            .then(this.onGetAllSuccess)
            .catch(this.onGetAllError);
        }
      );
    }
  };

  onUserSizeChange = (e) => {
    let pageSize = Number(e.currentTarget.value);

    this.setState(
      { ...this.state, currentPage: 1, pageSize },
      this.changePage(1)
    );
  };

  changePage = (pageNumber) => {
    this.setState({ ...this.state, currentPage: pageNumber }, this.getAllUsers);
  };

  //--Search-Engine---------------------------------------------------------------------//

  onSearchInputChanged = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState((prevState) => {
      return { ...prevState, query: newValue };
    }, this.getAllUsers);

    _logger(newValue);
  };

  //--Activate/Deactivate-Buttons------------------------------------------------------//

  onDeactivate = (aUser) => {
    _logger("Deactivate Firing", aUser);
    aUser.userStatusId = 2;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Disable User!",
    }).then((result) => {
      if (result.isConfirmed) {
        let users = [...this.state.users];
        const findUserIdx = (user) => user.id === aUser.id;
        const userIdx = users.findIndex(findUserIdx);
        _logger(userIdx);
        users[userIdx] = aUser;

        this.setState((prevState) => ({
          ...prevState,
          usersList: users.map(this.mapUsers),
        }));

        usersService
          .updateUserStatus(aUser.id, aUser.userStatusId)
          .then(this.onUpdateSuccess)
          .catch(this.onUpdateError);

        Swal.fire("Done!", "This User Is Now Inactive.", "success");
      }
    });
  };

  onActivate = (aUser) => {
    _logger("Activate Firing", aUser);
    aUser.userStatusId = 1;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Enable User!",
    }).then((result) => {
      if (result.isConfirmed) {
        let users = [...this.state.users];
        const findUserIdx = (user) => user.id === aUser.id;
        const userIdx = users.findIndex(findUserIdx);
        _logger(userIdx);
        users[userIdx] = aUser;

        this.setState((prevState) => ({
          ...prevState,
          usersList: users.map(this.mapUsers),
        }));

        usersService
          .updateUserStatus(aUser.id, aUser.userStatusId)
          .then(this.onUpdateSuccess)
          .catch(this.onUpdateError);

        Swal.fire("Done!", "This User Is Now Active.", "success");
      }
    });
  };

  onUpdateSuccess = (data) => {
    _logger("Sucess", data);
  };

  onUpdateError = (error) => {
    _logger("Error", error);
  };

  //--------------------------------------------------------------------------//

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="container-fluid">
            <div className="page-header">
              <div className="col-lg-6 header-aligned">
                <h3>Users</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/creative/dashboard/default">Home</a>
                    </li>
                    <li className="breadcrumb-item">Users</li>
                    <li className="active breadcrumb-item" aria-current="page">
                      All
                    </li>
                  </ol>
                </nav>
              </div>
              <div></div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-mb-faq xs-mt-search">
                  <div className="faq-header card-header">
                    <h5>Search Users</h5>
                  </div>
                  <div></div>
                  <div className="faq-body card-body">
                    <div className="faq-form">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search.."
                        name="query"
                        onChange={this.onSearchInputChanged}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="search-icon"
                      >
                        <circle cx={11} cy={11} r={8} />
                        <line x1={21} y1={21} x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                    <div>
                      <form>
                        <label htmlFor="paginateAmount"></label>
                        <select
                          value={this.state.roles}
                          onChange={this.onSelectFilterChange}
                          className="form-control"
                          id="paginateAmount"
                          name="filterby"
                        >
                          <option>Filter By Type</option>
                          <option value="All">All</option>
                          <option value="Admin">Admin</option>
                          <option value="Client">Clients</option>
                          <option value="Corporate Client">
                            Corporate Clients
                          </option>
                        </select>
                      </form>
                    </div>
                    <div>
                      <form>
                        <label htmlFor="paginateAmount"></label>
                        <select
                          value={this.state.pageSize}
                          onChange={this.onUserSizeChange}
                          className="form-control"
                          id="paginateAmount"
                        >
                          <option>Display Amount Per Page</option>
                          <option value={8}>Display: 8 Users Per Page</option>
                          <option value={16}>Display: 16 Users Per Page</option>
                          <option value={50}>Display: 50 Users Per Page</option>
                          <option value={100}>
                            Display: 100 Users Per Page
                          </option>
                        </select>
                      </form>
                    </div>
                    <div>
                      <form>
                        <label htmlFor="paginateAmount"></label>
                        <select
                          value={this.state.userData.userStatusId}
                          onChange={this.onSelectStatusChange}
                          className="form-control"
                          id="paginateAmount"
                        >
                          <option>Display Active/Inactive Users</option>
                          <option value={"All"}> All Users</option>
                          <option value={1}>Active</option>
                          <option value={2}>Inactive</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardDeck className="row col-md-12 my-4">
          {this.state.usersList}
        </CardDeck>

        <div className="mx-auto">
          <Pagination
            current={this.state.currentPage}
            pageSize={this.state.pageSize}
            total={this.state.totalCount}
            onChange={this.changePage}
          ></Pagination>
        </div>

        <div className="p-5"></div>
      </React.Fragment>
    );
  }
}

export default UserSearch;
