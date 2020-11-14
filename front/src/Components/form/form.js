import React, { useState, useEffect } from "react";
import InputBrand from "../input/inputBrand";
// import InputModel from "../input/inputModel";
import InputSeat from "../input/inputSeat";
import Price from "../input/price";
import Porsche from "../../assets/img/porscheModel.png";
import SliderPrice from "../slider/sliderPrice";
import axios from "axios";
import InputType from "../input/inputType";
import SliderAutonomy from "../slider/sliderAutonomy";
import InputTime from "../input/inputTime";

const Form = () => {
  const [autoList, setAutoList] = useState([]);
  const [brand, setBrand] = useState();

  const [optionListByBrand, setOptionListByBrand] = useState([]);
  const [optionListByModel, setOptionListByModel] = useState([]);

  const fetchInputValue = async () => {
    const res = await axios.post("http://localhost:4000/auto/filter/", {
      brand: "Zoé",
      seat: null,
      type: null,
    });
    setAutoList(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchInputValue();
  }, []);
  useEffect(() => {
    const filterBrand = () => {
      const newArrayAuto = autoList.filter((auto) => auto.brand === brand);
      setOptionListByBrand(newArrayAuto);
    };
    filterBrand();
  }, [brand]);

  return (
    <div className="w-full h-full flex flex-wrap md:flex-no-wrap">
      <div className="w-full md:w-1/2 lg:w-1/2 ml-10">
        <img
          src={Porsche}
          alt="porsche4s"
          className="w-auto md:mt-10 rounded-md "
        />
        <h2 className="uppercase text-center md:text-left text-gray-100 text-3xl font-bold">
          Passer à une
          <br />
          conduite plus <br />
          intelligente
        </h2>
      </div>
      <form className="w-full md:w-1/2 bg-gray-800 rounded-md p-10 m-10">
        <InputBrand
          autoList={autoList}
          brand={brand}
          setBrand={(e) => setBrand(e)}
        />
        {/* <InputModel optionListByBrand={optionListByBrand} /> */}
        <InputSeat />
        <InputType autoList={autoList} />

        <SliderPrice />
        <hr className="border-2 border-gray-900 rounded-full mb-5" />
        <SliderAutonomy />
        <InputTime autoList={autoList} />

        <input
          type="button"
          value="CHERCHER"
          className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 tracking-wider cursor-pointer hover:bg-green-500 hover:text-gray-900"
        />
      </form>
    </div>
  );
};

export default Form;
