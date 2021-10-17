import React,{useState,useEffect} from 'react';
import api from '../../services/api';
import {useDispatch} from 'react-redux';
import {MdFlightTakeoff} from 'react-icons/md';
import {addReserveRequest} from '../../store/modules/reserve/actions'
import './style.css'

export default function Home({history}){

  const dispatch = useDispatch();
  const [trips,setTrips] = useState([]);

  useEffect(()=>{
    async function loadApi(){
      const response = await api.get('trips');
      setTrips(response.data);
      console.log(response.data)
    }
    loadApi();
  },[]);

  function handleAdd(id){
    dispatch(addReserveRequest(id));
  }

  return(
    <div>
      <div className="box">
        {trips.map(trip => (
          <li key={trip.id}>
            <img src={trip.image} alt={trip.title} />
            <strong>{trip.title} </strong>
            <span> {trip.status ? 'Disponível' : 'Indisponível'} </span>
            <button 
              type="button"
              onClick={()=>handleAdd(trip.id)}>
                <MdFlightTakeoff size={16} color="#FFF"/>
                <span>SOLICITAR RESERVA</span>
            </button>
          </li>
        ))}
      </div>

    </div>
  )
}