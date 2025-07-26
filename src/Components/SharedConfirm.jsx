import React from 'react';
import './sharedConfirm.css'

const SharedConfirm = ({ texto }) => {
  
  return (
    <section className="container-shared">
      <div className="container-shared-text">      
        <p>{`${texto} Copiado al portapapeles`}</p>         
      </div>
    </section>
  )
}
export default SharedConfirm;