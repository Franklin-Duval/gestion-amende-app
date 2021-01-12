import React from 'react'
import DatePicker from "react-datepicker"
//import { Redirect } from 'react-router-dom'

import API_URL from '../assets/constant'
import '../assets/css/forms.css'
import logo from '../assets/images/finger.png'

export default class Register_Police extends React.Component{

    state = {
        firstPage: true,
        CNI: "",
        nom: "",
        prenom: "",
        contact: "",
        adresse: "",
        date_naissance: new Date(),
        age: "",
        statut_mat: "",

        num_identification: "",
        user_name: "",
        email: "",
        password: "",

        finish: false,
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch(API_URL + 'policier/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                CNI: this.state.CNI,
                nom: this.state.nom,
                prenom: this.state.prenom,
                adresse: this.state.adresse,
                contact: this.state.contact,
                date_naissance: this.state.date_naissance,
                age: this.state.age,
                statut_matrimoniale: this.state.statut_mat,
                num_identification: this.state.num_identification,
                user_name: this.state.user_name,
                email: this.state.email,
                password: this.state.password,
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

    formatDate = (date) => {
        let month = '' + (date.getMonth() + 1)
        

        return month
    }

    render(){
        
            return(
                <div className="container-fluid body" >                        
                    <form className="forms" onSubmit={(event) => this.handleSubmit(event)} >
                        {
                            this.state.firstPage ?

                            <div>
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
                                        type="text" 
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
                                    <button type="button" className="button col-md-12 text-center" onClick={() => this.setState({firstPage: false})} >Next</button>
                                </div>
                            </div>
                            
                            :
                            <div>
                                <div style={{marginBottom: 30, marginTop: 15, width: 150}} >
                                    <button type="button" className="button col-md-12 text-center" onClick={() => this.setState({firstPage: true})} >Previous</button>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="text-field" id="username"
                                        placeholder="Nom d'Utilisateur"
                                        value={this.state.user_name}
                                        onChange={(event) => {
                                            this.setState({user_name: event.target.value})
                                        }}
                                    />
                                </div>
            
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="text-field" id="num_id"
                                        placeholder="Numéro d'Indentification"
                                        value={this.state.num_identification}
                                        onChange={(event) => {
                                            this.setState({num_identification: event.target.value})
                                        }}
                                    />
                                </div>
            
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        className="text-field" id="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={(event) => {
                                            this.setState({email: event.target.value})
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className="text-field" id="password"
                                        placeholder="Mot de Passe"
                                        value={this.state.password}
                                        onChange={(event) => {
                                            this.setState({password: event.target.value})
                                        }}
                                    />
                                </div>

                                <div style={{marginBottom: 30, marginTop: 15}} >
                                    <button type="submit" className="button col-md-12 text-center" >Submit</button>
                                </div>
                            </div>
                        }
                    </form>
                </div>
            )
        
    }
}