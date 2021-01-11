import React from 'react'
import DatePicker from "react-datepicker"
//import { Redirect } from 'react-router-dom'

import API_URL from '../assets/constant'
import '../assets/css/forms.css'
import logo from '../assets/images/finger.png'
import "react-datepicker/dist/react-datepicker.css"

export default class Register_User extends React.Component{

    state = {
        CNI: "",
        nom: "",
        prenom: "",
        contact: "",
        adresse: "",
        date_naissance: new Date(),
        age: "",
        statut_mat: "",

        finish: false,
    }


    handleSubmit = (event) => {
        event.preventDefault()
        fetch(API_URL + 'bd_police/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                matricule: this.state.matricule,
                name: this.state.name,
                surename: this.state.surename,
                contact: this.state.contact,
                email: this.state.email,
                level: this.state.level,
                department: this.state.department,
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)

        })
        .catch((error) =>{
            console.log(error)
        })
    }

    render(){
        
            return(
                <div className="container-fluid body" >
                    <form onSubmit={(event) => this.handleSubmit(event)} >
                        <img src={logo} alt="" style={{width: 150, height: 150, borderRadius: 75, marginLeft: 175, marginBottom: 70}} />
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="text-field" id="CNI"
                                placeholder="CNI"
                                value={this.state.CNI}
                                onChange={(event) => {
                                    this.setState({CNI: event.target.value})
                                }}
                            />
                        </div>
    
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="text-field" id="nom"
                                placeholder="Nom"
                                value={this.state.nom}
                                onChange={(event) => {
                                    this.setState({nom: event.target.value})
                                }}
                            />
                        </div>
    
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="text-field" id="prenom"
                                placeholder="Prénom"
                                value={this.state.prenom}
                                onChange={(event) => {
                                    this.setState({prenom: event.target.value})
                                }}
                            />
                        </div>
    
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="text-field" id="contact"
                                placeholder="Contact"
                                value={this.state.contact}
                                onChange={(event) => {
                                    this.setState({contact: event.target.value})
                                }}
                            />
                        </div>
    
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="text-field" id="adresse"
                                placeholder="Adresse"
                                value={this.state.adresse}
                                onChange={(event) => {
                                    this.setState({adresse: event.target.value})
                                }}
                            />
                        </div>

                        <DatePicker
                            className="datepicker"
                            dateFormat="yyyy-MM-dd"
                            selected={this.state.date_naissance}
                            onChange={(date) => this.setState({date_naissance: date})}
                        />

                        <div className="form-group">
                            <input 
                                type="number" 
                                className="text-field" id="age"
                                placeholder="Age"
                                value={this.state.age}
                                onChange={(event) => {
                                    this.setState({age: event.target.value})
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <select 
                                className="dropdown" 
                                id="statut" 
                                placeholder="Statut Matrimoniale" 
                                onChange={(event) => this.setState({statut_mat: event.target.value})}
                            >
                                <option></option>
                                <option value={1}>Célibataire</option>
                                <option value={2}>Marié</option>
                                <option value={3}>Compliqué</option>
                            </select>
                        </div>
                        
                        <div style={{marginBottom: 30, marginTop: 15}} >
                            <button type="submit" className="button col-md-12 text-center" >Submit</button>
                        </div>
                    </form>
                </div>
            )
        
    }
}