import React from "react";

import tableContext from "./tableContext";

const tableState = (props) => {
    const state ={

    }
    return(
        <tableContext.provider value={state}>
            {props.children}

        </tableContext.provider>
    )

}

export default tableState;