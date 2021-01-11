import React from 'react'
import API_URL from '../assets/constant'
import '../assets/css/amende.css'

export default class Amande extends React.Component{

    componentDidMount(){
        this.fetchAmende()
    }

    state = {
        amende: []
    }

    fetchAmende = () => {
        fetch(API_URL + 'amende/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({amende: responseJson})
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    render(){
        return(
            <div className="container-fluid">
                <h1 className="text-center" style={{marginTop: 50, marginBottom: 30, fontFamily: 'Times New Roman'}}>Liste des Amendes en rigueur au Cameroun</h1>
                <div style={{marginBottom: 50, marginTop: 20}} >
                    <button type="button" className="ajouter col-md-12 text-center" >Ajouter une Amende</button>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Amende</th>
                            <th scope="col">Description</th>
                            <th scope="col">Pénalité (FCFA) </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.amende.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td className="id">{item.id} </td>
                                        <td>{item.nom_amende} </td>
                                        <td>{item.desciption} </td>
                                        <td>{item.prix_penalite} </td>
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