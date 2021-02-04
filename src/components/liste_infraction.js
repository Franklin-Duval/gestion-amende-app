import React from 'react'
import { BeatLoader } from 'react-spinners'

import API_URL from '../assets/constant'

export default class ListInfraction extends React.Component{

    componentDidMount(){
        this.fetchInfraction()
    }

    state = {
        isLoading: true,
        infraction: [],
        fuyard: [],
        amende: [],
        policier: [],
        liste_infraction: []
    }

    fetchInfraction = () => {
        fetch(API_URL + 'infraction/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({infraction: responseJson})
            this.fetchFuyard()
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    fetchFuyard = () => {
        fetch(API_URL + 'fuyard/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({fuyard: responseJson})
            this.fetchAmende()
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    fetchAmende = () => {
        fetch(API_URL + 'amende/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({amende: responseJson})
            this.fetchPolicier()
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    fetchPolicier = () => {
        fetch(API_URL + 'policier/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({policier: responseJson})
            this.ClassifyInfractions()
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    ClassifyInfractions = () => {
        for (let item of this.state.infraction) {
            let user = {
                id: item.id,
                fuyard: "",
                amende: "",
                policier: "",
                date: item.date,
                lieux: item.lieux,
                nombre_infraction: "",
                paye: item.payé ? 'Vrai' : 'Faux'
            }
            
            for (let amende of this.state.amende) {
                if (item.amende.slice(-2, -1).includes(amende.id)){
                    user.amende = amende.nom_amende
                    break
                }
            }

            for (let police of this.state.policier) {
                if (item.policier.slice(-2, -1).includes(police.id)){
                    user.policier = police.nom + ' ' + police.prenom
                    break
                }
            }

            for (let fuy of this.state.fuyard) {
                if (item.fuyard.slice(-2, -1).includes(fuy.id)){
                    user.nombre_infraction = fuy.nombre_infraction
                    fetch(API_URL + 'bd_police/' + fuy.fuyeur.slice(-2, -1) + '/')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        user.fuyard = responseJson.nom + ' ' + responseJson.prenom
                        let list = this.state.liste_infraction
                        list.push(user)
                        this.setState({liste_infraction: list})
                    })
                    .catch((error) =>{
                        console.log(error)
                    })
                    break
                }
            }
            
        }
        this.setState({isLoading: false})
    }

    render(){
        return(
            this.state.isLoading
            ?
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <BeatLoader loading={this.state.isLoading} size={100} color="#673ab7" />
            </div>
            :
            <div className="container-fluid">
                <h1 className="text-center" style={{marginTop: 50, marginBottom: 30, fontFamily: 'Times New Roman'}}>Liste des Usagers Routiers au Cameroun</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Nom et Prénom</th>
                            <th scope="col">Amende</th>
                            <th scope="col">Policier</th>
                            <th scope="col">Date</th>
                            <th scope="col">Lieux</th>
                            <th scope="col">Nombre d'Infraction</th>
                            <th scope="col">Payé</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.liste_infraction.map((item, index) => {
                                return(
                                    <tr key={index} className={item.paye === 'Faux' ? "table-danger" : ""} >
                                        <td>{item.id} </td>
                                        <td>{item.fuyard} </td>
                                        <td>{item.amende} </td>
                                        <td>{item.policier} </td>
                                        <td>{item.date.slice(0, 21).replace('T', ' -Hr- ')} </td>
                                        <td>{item.lieux} </td>
                                        <td>{item.nombre_infraction} </td>
                                        <td>{item.paye} </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        )
    }
}