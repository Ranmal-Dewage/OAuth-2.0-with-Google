import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBMask,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBFormInline,
    MDBAnimation
} from "mdbreact";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from './Error';
import "../style.css";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            userName: '',
            collapseID: "",
            city: "",
            hotel: "",
            date: "",
            time: "",
            persons: "",
            id: 'RES-IT-' + Math.floor(Math.random() * 10000000),
            city_selection: ['Colombo', 'Kandy', 'Galle'],
            hotel_selection: ['Shangri-La Hotel', 'Jetwing Hotel', 'Cinnamon Hotel']
        }

    }

    componentDidMount() {

        //check whether user is authenticated
        const option = {
            method: "GET",
            credentials: 'include'
        }

        fetch("http://localhost:3000/profile/", option).
            then(res => res.json()).
            then(res => {
                this.setState({
                    loggedIn: res.status,
                    userName: res.name
                })
            });

    }

    // reset form details
    resetForm = () => {
        this.setState({
            city: "",
            hotel: "",
            date: "",
            time: "",
            persons: ""
        })
    }

    //  submit form details
    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";

        if (this.state.city != "" && this.state.hotel != "" && this.state.date != "" && this.state.time != "" && this.state.persons != "") {

            var reservation_data = {
                city: this.state.city,
                hotel: this.state.hotel,
                date: this.state.date,
                time: this.state.time,
                persons: this.state.persons,
                id: this.state.id
            }

            const option = {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(reservation_data),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            // call end point to make reservation by sending email and creating google calendar event
            fetch("http://localhost:3000/profile/reserve", option).
                then(res => res.json()).
                then(res => {
                    if (res.status) {
                        toast.success("Email and Calendar Event created Successfully")
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000)
                    }
                    else {
                        toast.error("Error creating Email and Calendar Event")
                    }
                });
        }
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    render() {
        const overlay = (
            <div
                id="sidenav-overlay"
                style={{ backgroundColor: "transparent" }}
                onClick={this.toggleCollapse("navbarCollapse")}
            />
        );

        var i = 0;
        var k = 0;

        const citiySelection = this.state.city_selection.map(city => {
            return <option key={i++} value={city}>{city}</option>
        });

        const hotelSelection = this.state.hotel_selection.map(hotel => {
            return <option key={i++} value={hotel}>{hotel}</option>
        });

        return (
            <div>
                {
                    this.state.loggedIn ?
                        <div id="classicformpage">
                            <Router>
                                <div>
                                    <MDBNavbar dark expand="md" fixed="top">
                                        <MDBContainer>
                                            <MDBNavbarBrand>
                                                <MDBCol md="15">
                                                    <img src={require("./images/MainLogo_Home.png")} className="img-fluid" alt="Main Logo" />
                                                </MDBCol>
                                            </MDBNavbarBrand>
                                            <MDBNavbarBrand>
                                                <strong className="white-text">RESERVE IT</strong>
                                            </MDBNavbarBrand>
                                            <MDBNavbarToggler
                                                onClick={this.toggleCollapse("navbarCollapse")}
                                            />
                                            <MDBCollapse
                                                id="navbarCollapse"
                                                isOpen={this.state.collapseID}
                                                navbar
                                            >
                                                <MDBNavbarNav left>
                                                    <MDBNavItem active>
                                                        <MDBNavLink to="/home">Home</MDBNavLink>
                                                    </MDBNavItem>
                                                    <MDBNavItem>
                                                        <MDBNavLink to="/home">Profile</MDBNavLink>
                                                    </MDBNavItem>
                                                </MDBNavbarNav>
                                                <MDBNavbarNav right>
                                                    <MDBNavItem>
                                                        <MDBFormInline waves>
                                                            <div className="md-form my-0">
                                                                <input
                                                                    className="form-control mr-sm-2"
                                                                    type="text"
                                                                    placeholder="Search"
                                                                    aria-label="Search"
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </MDBFormInline>
                                                    </MDBNavItem>
                                                </MDBNavbarNav>

                                                <MDBNavbarNav right>
                                                    <MDBNavbarBrand>
                                                        <MDBCol md="10">
                                                            <img src={require("./images/proPic.png")} className="img-fluid" alt="Main Logo" />&nbsp;
                                                <strong className="white-text">Hi {this.state.userName}</strong>
                                                        </MDBCol>
                                                    </MDBNavbarBrand>
                                                    <MDBNavbarBrand>

                                                    </MDBNavbarBrand>
                                                </MDBNavbarNav>
                                            </MDBCollapse>
                                        </MDBContainer>
                                    </MDBNavbar>
                                    {this.state.collapseID && overlay}
                                </div>
                            </Router>

                            <MDBView>
                                <MDBMask className="d-flex justify-content-center align-items-center gradient">
                                    <MDBContainer>
                                        <MDBContainer style={{ marginTop: "8%" }}>
                                        </MDBContainer>

                                        <MDBRow>
                                            <MDBAnimation
                                                type="fadeInLeft"
                                                delay=".3s"
                                                className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
                                            >
                                                <h1 className="h1-responsive font-weight-bold">
                                                    Reserve Right Now!
                                                </h1>
                                                <hr className="hr-light" />
                                                <h6 className="mb-4">
                                                    Just select your dining preferences and WE will TAKE CARE the REST 🙂!!!
                                                </h6>
                                                <MDBBtn color="danger" href="http://localhost:3000/auth/logout">&nbsp;&nbsp;Logout &nbsp;&nbsp;</MDBBtn>
                                            </MDBAnimation>

                                            <MDBCol md="6" xl="5" className="mb-4">
                                                <MDBAnimation type="fadeInRight" delay=".3s">
                                                    <MDBCard id="classic-card">
                                                        <MDBCardBody className="white-text">
                                                            <h3 className="text-center">
                                                                <MDBIcon icon="hotel" /> Reservation Details:
                                                            </h3>
                                                            <hr className="hr-light" />

                                                            {/* Form Details Start*/}
                                                            <div>
                                                                <form
                                                                    className="needs-validation"
                                                                    onSubmit={this.submitHandler}
                                                                    noValidate
                                                                >
                                                                    <MDBRow>
                                                                        <MDBCol md="6" className="mb-3">
                                                                            <label
                                                                                htmlFor="defaultFormRegisterNameEx"
                                                                                className="grey-text"
                                                                            >
                                                                                City
                                                                            </label>
                                                                            <select
                                                                                value={this.state.city}
                                                                                name="city"
                                                                                onChange={this.changeHandler}
                                                                                id="defaultFormRegisterNameEx"
                                                                                className="form-control"
                                                                                required>
                                                                                <option value="">---Choose City---</option>
                                                                                {citiySelection}
                                                                            </select>

                                                                            <div className="invalid-feedback">
                                                                                Please provide a valid city.
                                                                            </div>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </MDBCol>
                                                                        <MDBCol md="6" className="mb-3">
                                                                            <label
                                                                                htmlFor="defaultFormRegisterEmailEx2"
                                                                                className="grey-text"
                                                                            >
                                                                                Hotel Name
                                                                            </label>
                                                                            <select
                                                                                value={this.state.hotel}
                                                                                name="hotel"
                                                                                onChange={this.changeHandler}
                                                                                id="defaultFormRegisterNameEx"
                                                                                className="form-control"
                                                                                required>
                                                                                <option value="">---Choose Hotel---</option>
                                                                                {hotelSelection}
                                                                            </select>
                                                                            <div className="invalid-feedback">
                                                                                Please provide a valid hotel.
                                                                            </div>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </MDBCol>
                                                                    </MDBRow>
                                                                    <MDBRow>
                                                                        <MDBCol md="6" className="mb-3">
                                                                            <label
                                                                                htmlFor="defaultFormRegisterPasswordEx4"
                                                                                className="grey-text"
                                                                            >
                                                                                Date
                                                                            </label>
                                                                            <input
                                                                                value={this.state.date}
                                                                                onChange={this.changeHandler}
                                                                                type="date"
                                                                                id="defaultFormRegisterPasswordEx4"
                                                                                className="form-control"
                                                                                name="date"
                                                                                required
                                                                            />
                                                                            <div className="invalid-feedback">
                                                                                Please provide a valid date.
                                                                            </div>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </MDBCol>
                                                                        <MDBCol md="6" className="mb-3">
                                                                            <label
                                                                                htmlFor="defaultFormRegisterPasswordEx4"
                                                                                className="grey-text"
                                                                            >
                                                                                Time
                                                                            </label>

                                                                            <input
                                                                                value={this.state.time}
                                                                                onChange={this.changeHandler}
                                                                                type="time"
                                                                                id="defaultFormRegisterPasswordEx4"
                                                                                className=" form-control"
                                                                                name="time"
                                                                                placeholder="hh:mm am/pm"
                                                                                required
                                                                            />

                                                                            <div className="invalid-feedback">
                                                                                Please provide a valid time.
                                                                            </div>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </MDBCol>

                                                                    </MDBRow>
                                                                    <MDBRow>
                                                                        <MDBCol md="6" className="mb-3">
                                                                            <label
                                                                                htmlFor="defaultFormRegisterPasswordEx4"
                                                                                className="grey-text"
                                                                            >
                                                                                No. of Persons
                                                                            </label>
                                                                            <input
                                                                                value={this.state.persons}
                                                                                onChange={this.changeHandler}
                                                                                type="text"
                                                                                id="defaultFormRegisterPasswordEx4"
                                                                                className="form-control"
                                                                                name="persons"
                                                                                placeholder="No. of Persons"
                                                                                required
                                                                            />
                                                                            <div className="invalid-feedback">
                                                                                Please provide a valid person count.
                                                                            </div>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </MDBCol>
                                                                        <MDBCol md="6" className="mb-3">
                                                                            <label
                                                                                htmlFor="defaultFormRegisterPasswordEx4"
                                                                                className="grey-text"
                                                                            >
                                                                                Reservation Id
                                                                            </label>
                                                                            <input
                                                                                value={this.state.id}
                                                                                onChange={this.changeHandler}
                                                                                type="text"
                                                                                id="defaultFormRegisterPasswordEx4"
                                                                                className="form-control"
                                                                                name="id"
                                                                                placeholder="ID"
                                                                                readOnly
                                                                            />
                                                                            <div className="invalid-feedback">
                                                                                Please provide a valid ID.
                                                                            </div>
                                                                            <div className="valid-feedback">Looks good!</div>
                                                                        </MDBCol>
                                                                    </MDBRow>

                                                                    <div className="text-center mt-4 black-text">
                                                                        <MDBBtn color="success" type='submit'>&nbsp;&nbsp;Sign Up&nbsp;&nbsp;</MDBBtn>
                                                                        <MDBBtn color="warning" onClick={this.resetForm}>&nbsp;&nbsp;Reset&nbsp;&nbsp;</MDBBtn>
                                                                    </div>

                                                                </form>
                                                            </div>

                                                            {/* Form Details End*/}

                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </MDBAnimation>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </MDBMask>
                            </MDBView>

                            <ToastContainer
                                autoClose={2000}
                                position="bottom-right"
                            />

                        </div> :
                        <Error />
                }
            </div>
        );
    }
}

export default Home;