import React from "react"
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon } from "mdbreact"
import { MDBFooter } from "mdbreact"
import "../style.css"

class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {

        return (

            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBJumbotron style={{ padding: 0 }}>
                            <MDBCol className="text-white text-center py-5 px-4 my-5" style={{ backgroundImage: `url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)` }}>
                                <MDBCol md="2" className="rounded mx-auto d-block">
                                    <img src={require("./images/MainLogo.png")} className="img-fluid" alt="Main Logo" />
                                </MDBCol>
                                <MDBCol md="2" className="rounded mx-auto d-block">
                                    <MDBCardTitle className="text-center font-bold">RESERVE IT</MDBCardTitle>
                                </MDBCol>
                                <MDBCol className="py-5">
                                    <p className="mx-5">We are a Online Platform that enables you to reserve dinning oppertunity at most popular Hotels in Sri Lanka. You
                                    can login and resgister to our platform using any of the social logins mention below. We will ensure getting you a reservation.
                                        </p>
                                    <MDBRow>
                                        {/* call http://localhost:3000/auth/google to begin OAuth flow  */}
                                        <MDBCol><MDBBtn href="http://localhost:3000/auth/google" color="danger" size="lg"><MDBIcon fab icon="google-plus-g" className="pr-1" /> Google</MDBBtn></MDBCol>
                                        <MDBCol> <MDBBtn color="primary" size="lg"><MDBIcon fab icon="facebook-f" className="pr-1" /> Facebook</MDBBtn></MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBCol>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>

                <MDBFooter color="blue" className="font-small pt-4 mt-4">
                    <div className="footer-copyright text-center py-3">
                        <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Copyright: Ranmal Dewage &amp; Aravinda Kulasooriya <a href="https://ranmaldewage.wordpress.com/posts/"> ( ranmaldewage.wordpress.com ) </a>
                        </MDBContainer>
                    </div>
                </MDBFooter>
            </MDBContainer>

        );
    }

}

export default LogIn;