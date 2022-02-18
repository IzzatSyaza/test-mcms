import React from "react";
import {Button} from "react-bootstrap";
import DisplayGrid from "../../DisplayEmployeeGrid/DisplayGrid";
import {Link} from "react-router-dom"
// import {Wrapper} from "./DisplayFamilly.styles"

function NoAvailable(props) {
    
    return(
    <div>
        {/* <Wrapper> */}
            <h4>The is no available information for this section...</h4>
            <Link to={"/add"+props.section+"/"+props.tcNo}>
                <Button> Add {props.section}</Button>
            </Link>
        {/* </Wrapper> */}
    </div>
    );
}

export default NoAvailable