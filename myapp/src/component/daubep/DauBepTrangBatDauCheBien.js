import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';
import { Navigate, useNavigate } from 'react-router-dom';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';


function DauBepTrangBatDauCheBien() {
  const { taiMap } =useLoadScript({
    googleMapsApiKey: "AIzaSyC3UImNlymTywn0Bue3qgp2aj-0HWyljGw",
  })

 
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error2, setError2] = useState(null);

     

    var timer;
     
    const navigate = useNavigate()

    useEffect(() => {

      
    //    fetchData();

      timer = setInterval(() => {
            setSeconds(seconds+1);

            if(seconds===59){
                setMinutes(minutes+1);
                setSeconds(0);

                if(minutes===59){
                    setHours(hours+1);
                    setMinutes(0);
                    setSeconds(0);
                }
            }
        },1000)
    
    
    return () => clearInterval(timer);
    });

    const hoanThanhSanPham = (hours,minutes,seconds) => {
      console.log('Id ca truc: '+localStorage.getItem('idCaTruc')+', id admin: '+localStorage.getItem('idAdmin')+
      ' id gio hang: '+ localStorage.getItem('idDonHang') + 'id san pham: '+localStorage.getItem('idSanPham')
      +'thoigianbatdauchebien: '+localStorage.getItem('thoigianbatdauchebien'))

      function cnvToStr(number){
        var str =""
        console.log(number)
        
        if(number<10){
          str = "0" + String(number)
          console.log(str)
        }else{
          str = String(number)
          console.log(str)
        }
        return str
      } 

       
      var strHours = cnvToStr(hours);
      console.log('hour: ', strHours)
      var strMins = cnvToStr(minutes);
      var strSecs = cnvToStr(seconds);

      var thoiGian = strHours.concat(":", strMins, ":", strSecs)
      console.log('str thoi gian: ', thoiGian);

      var formdata = new FormData();
        formdata.append("idDauBepThucHien", localStorage.getItem('idAdmin'));
        formdata.append("idSanPhamDuocGiao", localStorage.getItem('idSanPham'));
        formdata.append("idDonHang", localStorage.getItem('idDonHang'));
        formdata.append("idCaLamViec", localStorage.getItem('idCaTruc'));
        formdata.append("thoiGianSanPhamBatDauDuocCheBien", localStorage.getItem('thoigianbatdauchebien'));
        formdata.append("thoiGianHoanThanh", thoiGian)
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch(`http://127.0.0.1:8000/api/daubepchebien/hoanthanhsanpham`, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        
          navigate('/daubep')  

          
           
    }
  return (
     
      
      
    
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/kJ0MSVT0WbwSyQ76DrLX3vTaNGjwoYXx.jpg`}
    imageStyle={{opacity:0.5}}
    >
    <div className="container">
      <div class="d-flex justify-content-center align-items-center vh-100">
      <div>
      <h1 style={{color: "#ffff33", margin: '10px', }}>{hours<10 ? "0" + hours : hours}:{minutes<10 ? "0" + minutes : minutes}:{seconds<10 ? "0" + seconds : seconds}</h1>
      <button onClick={()=>hoanThanhSanPham(hours,minutes,seconds )}>Hoàn thành sản phẩm</button>
        </div>
       
         
      </div>
    </div>
    </ImageBackground>
    </div>
  )
}

// function Map(){
//   return <GoogleMap
//           zoom={10}
//           center={{lat:44, lng:-80}} 
//           mapContainerClassName="map-container"
//           >
//             <Marker position={{lat:44, lng:-80}}/>
//           </GoogleMap>
// }
export default DauBepTrangBatDauCheBien
