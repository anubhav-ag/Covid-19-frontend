import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import "./Landing.css";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/users/dashboard" />;
  }
  const [sgcovid, sgCovidData] = useState({});
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch(
      "https://api.apify.com/v2/key-value-stores/yaPbKe9e5Et61bl7W/records/LATEST?disableRedirect=true"
    )
      .then((response) => response.json())
      .then((data) => {
        sgCovidData(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>SINGAPORE COVID-19 LATEST SITUATION</h1>
        </div>
        <div className="sg_total">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="SG Infected Cases (Total)"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(sgcovid.infected)}
          />
        </div>
        <div className="app_sg1">
          <InfoBox
            title="SG Active Cases# "
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(sgcovid.activeCases)}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="SG Discharged Cases"
            isGreen
            active={casesType === "cases"}
            cases={prettyPrintStat(sgcovid.recovered)}
          />
        </div>
        <div className="app_sg2">
          <InfoBox
            title="SG In Community Facilites*"
            isGreen
            active={casesType === "cases"}
            cases={prettyPrintStat(sgcovid.inCommunityFacilites)}
          />
          <InfoBox
            title="SG Hospitalised (Stable)"
            isGreen
            active={casesType === "cases"}
            cases={prettyPrintStat(sgcovid.stableHospitalized)}
          />
          <InfoBox
            title="SG Hospitalised (Critical)"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(sgcovid.criticalHospitalized)}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths^"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(sgcovid.deceased)}
          />
        </div>
        <h1>WORLDWIDE COVID-19 LATEST SITUATION </h1>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
