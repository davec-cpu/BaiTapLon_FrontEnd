import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';
import { useNavigate } from 'react-router-dom';

function GiaoHang() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

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

    const hoanThanhGiaoHang = (hours, minutes, seconds) => {
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
      formdata.append("idCaLamViec", localStorage.getItem("idCaLamViec"));
      formdata.append("idNhanVienGiaoHang", localStorage.getItem("idNguoiGiaoHang"));
      formdata.append("idDonHang", localStorage.getItem("idDonHangGiao"));
      formdata.append("trangThaiDonHang", "daGiaoToiNoi");
      formdata.append("thoiGianHoanThanhDonHang", thoiGian);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:8000/api/giohang/capnhattrangthai", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));                 

      navigate('/giaohang')

    }
  return (
    <div>
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/dRIm8rFoBqfpsfQaKKCbYMgjgnhJ5GXz.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={3}
    >
      <div className="container">
      <div class="d-flex justify-content-center align-items-center vh-100">
      <div>
      <h1>{hours<10 ? "0" + hours : hours}:{minutes<10 ? "0" + minutes : minutes}:{seconds<10 ? "0" + seconds : seconds}</h1>
      <button onClick={() => hoanThanhGiaoHang(hours, minutes, seconds)}>Hoàn thành giao hàng</button>
      </div>
      </div></div>
      </ImageBackground>
      </div>
    </div>
  )
}

export default GiaoHang
