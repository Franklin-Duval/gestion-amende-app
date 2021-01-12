import React from 'react'
import Pane from './pane.js'
import '../assets/css/infraction.css'

export default class Infraction extends React.Component{

    render(){
        return(
            <div className="main-infraction">
                <div className="infraction-top round-box">
                    <div>
                        <span>CNI : </span>
                        <input className="round-box" type="text"></input>
                    </div>
                </div>

                <div className="infraction-information">
                    <div className="fautif round-box">
                        <div>
                            <span>Matricule véhicule : </span>
                            <input className="round-box" type="text"></input>
                        </div>

                        <p className="infraction-number">
                            4 Infractions
                        </p>
                    </div>
                    <div className="information round-box">
                    </div>
                </div>
            </div>
        )
    }
}