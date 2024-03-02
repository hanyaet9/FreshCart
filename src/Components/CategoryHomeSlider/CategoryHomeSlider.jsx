import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Puff } from "react-loader-spinner";


export default function CategoryHomeSlider() {


function getCategorySlider(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}

let {data , isLoading} = useQuery('getCategorySlider' , getCategorySlider)

// console.log(data);

if(isLoading){
    return <div className="d-flex justify-content-center align-items-center vh-100">

<Puff
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

</div>
}


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {data.data.data.map((category , idx)=> <div key={idx} className="category my-3"><img style={{height: '130px'}} className="w-100" src={category.image} alt={category.name}/>
      <h6 className="text-center text-black fw-bold mt-1">{category.name}</h6>
      </div> )}
    </Slider>
  );
}