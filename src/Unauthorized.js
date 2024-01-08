
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from "react-router-dom";


function Unauthorized() {

    const navigate = useNavigate();
    function handleSubmitUnauthorized(event) {
        navigate("/login")
    }

return (
    <form onSubmit={handleSubmitUnauthorized} className="container mt-5">
        Acces Unauthorized
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Unauthorized;