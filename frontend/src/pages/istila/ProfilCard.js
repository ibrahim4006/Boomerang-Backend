import React, { useContext } from 'react'
import "./ProfilCard.css"
import PersonIcon from '@mui/icons-material/Person';
import zincir from "./zincir.svg"
import HexagonIcon from '@mui/icons-material/Hexagon';
import { AuthContext } from '../../context/AuthContext';

function ProfilCard() {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='profilcard'>
        {/* <PersonIcon /> */}
        <img src = {currentUser.photoURL} className='istila-profimage'/>
        <div className='personalinfo'>
            <p>İbrahim Ergen</p>
            <p>Derece</p>
        </div>
        <p className='seviye'>25</p>
        <img src={zincir} alt="zincir" />
        <HexagonIcon className='level-icon'/>
    </div>
  )
}

export default ProfilCard
