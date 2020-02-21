import React from "react";
import "./Form.css";

function User(props) {
  return (
    <div className="onpage-card">
      <div className="saved-user-card">
        {props.user.Name && (
          <ul key={props.user.id}>
            <li>Name: {props.user.Name}</li>
            <li>Email: {props.user.Email}</li>
          </ul>
        )}
      </div>
    </div>
  );
}
export default User;