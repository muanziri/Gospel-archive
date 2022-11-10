import React from 'react';

const NewComment = ({name,comment}) => {
    return (
        <div  style={{ marginTop: '12px', overflowY: 'scroll', width: '90%',display:'none', height: '300px' }}>
        <div className="w3-card-4" style={{ width: "90%" }}>

          <div style={{ fontSize: "10px" }} className="w3-container">
            <br />
            <img src="img_avatar3.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: "100%" }} />
            <h6>{name}</h6>
            <br />
            <p>{comment}</p><br />
          </div>
        </div>
        <br />
        
      </div>
    );
}

export default NewComment;
