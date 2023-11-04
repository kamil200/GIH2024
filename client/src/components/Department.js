import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Department({ department }) {
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  return (
    <div className="card p-2 cursor-pointer my-card-style" onClick={() => navigate(`/book-appointment/${department._id}`)}>
      <h1 className="card-title-7">{t(department.departmentName)}</h1>
      <hr />
      <p>
        <b>{t("Phone Number")}: {department.phoneNumber}</b>
      </p>
      <p>
        <b>{t("Address")}: {department.address}</b>
      </p>
      <p>
        <b>{t("Fees per document")}: {department.minFee}</b>
      </p>
      <p>
        <b>{t("Timings")}: {department.timings[0]} - {department.timings[1]}</b>
      </p>
    </div>
  );
}

export default Department;

