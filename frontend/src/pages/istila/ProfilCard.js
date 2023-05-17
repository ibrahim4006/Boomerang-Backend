import React from 'react'
import "./ProfilCard.css"
import PersonIcon from '@mui/icons-material/Person';
import zincir from "./zincir.svg"
import HexagonIcon from '@mui/icons-material/Hexagon';

function ProfilCard() {
  return (
    <div className='profilcard'>
        <PersonIcon />
        <div className='personalinfo'>
            <p>İbrahim Ergen</p>
            <p>Olimpiyat</p>
            <p>Derece</p>
        </div>
        <p className='seviye'>25</p>
        <img src={zincir} alt="zincir" />
        <HexagonIcon className='level-icon'/>
    </div>
  )
}

export default ProfilCard
