import axios from "axios";
import { Col, Row } from "antd";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import Department from "../components/Department";
import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import C2 from "../img/C2.png";
import C3 from "../img/C3.png";
import mainc1 from "../img/MAAIN C1.png";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "../i18n";
function Home() {
  const { t,i18n } = useTranslation(); // Initialize the t function for translations
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/get-all-approved-departments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDepartments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      // Handle errors
    }
  };

  useEffect(() => {
    getData();
  }, []);
  
  const toggleLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <Layout>
          <button onClick={() => toggleLanguage('en')}>Switch to English</button>
      <button onClick={() => toggleLanguage('hi')}>Switch to Hindi</button>
      <div className="wrapped-carousel">
      <div className="c-container">
            <div className="slides">
                
                <input type="radio" name="c-radio-btn" id="radio1"/>
                <input type="radio" name="c-radio-btn" id="radio2"/>
                <input type="radio" name="c-radio-btn" id="radio3"/>
            <div className="slide first">
                <img src={mainc1} alt=""/>
            </div>
            <div className="slide">
            <img src={C2} alt=""/>
            </div>
            <div className="slide">
            <img src={C3} alt=""/>
            </div>
            {/* <!-- automatic navigation starts --> */}
            {/* <div className="navigation-auto">
                <div className="auto-btn1"></div>
                <div className="auto-btn2"></div>
                <div className="auto-btn3"></div>
            </div> */}
            {/* <!-- automatic navigation end --> */}
            </div>
            {/* <!-- manual navigation start --> */}
            {/* <div className="navigation-manual">
                <label htmlFor="radio1" className="manual-btn"></label>
                <label htmlFor="radio2" className="manual-btn"></label>
                <label htmlFor="radio3" className="manual-btn"></label>
            </div> */}
            {/* <!-- manual navigation end --> */}
        </div>
      </div>
      <hr />
      <h2 className="my-head">{t("SERVICES")}</h2> {/* Use t function for translations */}
      <hr />
      <Row gutter={20}>
        {departments.map((department) => (
          <Col span={8} xs={24} sm={24} lg={8} key={department.id}> {/* Add a unique key */}
            <Department department={department} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
