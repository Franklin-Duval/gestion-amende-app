import React from 'react'

import API_URL from '../assets/constant'
import '../assets/css/forms.css'
import logo from '../assets/images/finger.png'

export default class Login extends React.Component{

    state = {
        user_name: "",
        password: "",

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
                            type="password" 
                            className="text-field" id="password"
                            placeholder="Mot de Passe"
                            value={this.state.password}
                            onChange={(event) => {
                                this.setState({password: event.target.value})
                            }}
                        />
                    </div>
                    
                    <div style={{marginBottom: 30, marginTop: 50}} >
                        <button type="submit" className="button col-md-12 text-center" >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}