import React from "react"
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon } from "mdbreact"
import "../style.css"

// error page when user is not authenticated
class Error extends React.Component {

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
                            <MDBCol className="text-white text-center py-5 px-4 my-5 errorBackground">
                                <MDBCol className="py-5">
                                    <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">Access Denied for the Route</MDBCardTitle>
                                    <p className="mx-5 mb-5">Click Redirect to Login for the App</p>
                                    <MDBCol><MDBBtn href="http://localhost:1234" color="secondary" size="lg">Redirect</MDBBtn></MDBCol>
                                </MDBCol>
                            </MDBCol>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>

        );
    }

}

export default Error;