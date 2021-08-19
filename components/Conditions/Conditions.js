import React from 'react';
import classes from './Conditions.module.css'

const Conditions=(props)=>{
    return(
        <div className={classes.wrapper} >
            {props.error&&<small>Please Enter a valid city.</small>}
            {props.loading&&<div>loading</div>}
            {
                props.responseObj.cod ===200?
                <div>
                    <p>
                        <strong>
                            {props.responseObj.name}
                        </strong>
                        <p>Its currently
                            {Math.round(props.responseObj.main.temp)} degrees out with
                            {props.responseObj.weather[0].description}.
                        </p>
                    </p>
                </div>
                :null
            }
        </div>
    )
}
export default Conditions