import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {ImageBackground} from 'react-native'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

function Home() {
    const datVaiTro = (role) => {
        var vaiTrokey = 'vaiTro';
        localStorage.setItem(vaiTrokey, role)
        console.log(role)
    }

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [thongtin, setThongtin] = useState([])
   
  
   
  const getDonHangUrl = `http://127.0.0.1:8000/api/calamviec/laycalamviec`
  useEffect(() => {
    let unmounted = false;
    const ourReq = axios.CancelToken.source();
    
    
    axios.get(getDonHangUrl, {
      cancelToken: ourReq.token,
      
    })
    .then( a=> {
      if(!unmounted) {
        setThongtin(a.data);
         
         
        console.log('thong tin la: ',thongtin.gio)
        setLoading(false);
        console.log(a.data.trugio.id);
        const idCaTruc = a.data.trugio.id
        localStorage.setItem('idCaTruc', idCaTruc)
      } 
    })
    .catch(function (e) {
      if(!unmounted){
        setError(true);
        setLoading(false);
        
        if(axios.isCancel(e)){
          console.log(`request cancel: ${e.message}`);
        }else{
          console.log("another error happen:" + e.message);
        }
      }
    });
    return () => {
        unmounted = true;
        ourReq.cancel();
        ourReq.cancel("Canceling in cleanup");
    };
    
}, [])
//styling
const anhNen = (anh) => ({
  backgroundImage: `url(http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg)`,
 // backgroundSize: '300px 100px',
  backgroundRepeat: "no-repeat",
 // backgroundSize: '100% 100%',
  backgroundSize:'cover',
  backgroundPosition:'center' 
});

  return (
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    >
    <div className="container">
      <div class="d-flex justify-content-center align-items-center vh-100">
      <div>
         <h2 className='luaChonText'>Lựa chọn vai trò</h2>  
         <br></br>
        
        
          <Link className='chonVaiTro' to ='/login' onClick={() => datVaiTro('khachHang')}> Khách hàng</Link>  
          
          <Link className='chonVaiTro' to ='/login' onClick={() => datVaiTro('giaoHang')}>Giao hàng</Link>
          <Link className='chonVaiTro' to ='/login' onClick={() => datVaiTro('dauBep')}>Đầu bếp</Link>
          <Link className='chonVaiTro' to ='/login' onClick={() => datVaiTro('quanLi')}>Quản lí</Link>
        </div>
       
         
      </div>
    </div>
    </ImageBackground>
    </div>
    
  )
}

export default Home
