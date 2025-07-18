import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findByCode } from "../store/urlData";

function RedirectPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const item = findByCode(code);
    if (item && new Date() < new Date(item.expiry)) {
      customLog("Redirect", { code });
      window.location.href = item.original;
    } else {
      customLog("Failed Redirect", { code });
      navigate("/");
    }
  }, [code, navigate]);

  return <p>Redirecting...</p>;
}

export default RedirectPage;
