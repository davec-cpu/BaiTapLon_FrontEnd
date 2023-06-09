import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { hamPost } from './HamPost'
import useApiRequest from './useApiRequest'
import {ImageBackground} from 'react-native'
function Login() {
   // const history = useHistory();
    const navigate = useNavigate()
    const [tenDangNhap, settenDangNhap] = useState("")
    const [matKhau, setmatKhau] = useState("")
    const [thongbao, setThongbao] = useState("")

    
    const layVaitro = () => {
        const vaiTro = localStorage.getItem('vaiTro');
        console.log(vaiTro);
    }

    const login = () =>{
      var formdata = new FormData();
      formdata.append("tenDangNhap", tenDangNhap);
      formdata.append("matKhau", matKhau);
     // console.log(tenDangNhap)
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:8000/api/khachhang/dangnhap", requestOptions)
        .then(response => {
         // console.log(response)
          if(response.status === 200){
            console.log('Dang nhap thanh cong')
             console.log(response.body)
           // navigate(' ')
          }else{
            throw Error(response.status)
            console.log('Dang nhap that bai')
          }
          
        })
        .then(result => {
          console.log('REsult: ', result)
        })
        .catch(error => console.log('Loi la:   ', error));
    }
    
    const taoGioHang = (url) => {
      var formdata = new FormData();

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(url, requestOptions)
        .then(res => res.json())
        .then(result => {
          console.log('Data gio hang: ', result.id)
          localStorage.setItem('idGioHangKhachHang', result.id)
          console.log('Id tu localStorage gio hang: ', localStorage.getItem('idGioHangKhachHang'))
          console.log('Vai tro nguoi dung: ', localStorage.getItem('vaiTro'))
        })
        .catch(error => console.log('error', error));
    } 

    const layIdCaLamViec = () => {
      var formdata = new FormData();
    
    const url = `http://127.0.0.1:8000/api/calamviec/laycalamviec`;
      
      
    }
    
    var trangThaiDangNhap = ''
    var idNguoiDung = 0
    var url =''
    function login3(){
      if(localStorage.getItem('vaiTro') === 'khachHang'){
        url = 'http://127.0.0.1:8000/api/khachhang/dangnhap' 
      }else{
        url = 'http://127.0.0.1:8000/api/admin/admindangnhap'
      }
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          tenDangNhap: tenDangNhap,
          matKhau: matKhau,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            })
        .then(res => res.json())
        .then((data) => {
          
          trangThaiDangNhap = data.mess
          console.log('Trang thai:', trangThaiDangNhap)
          if(trangThaiDangNhap === 'Dang nhap thanh cong' && localStorage.getItem('vaiTro') === 'khachHang'){

            console.log('thongtinkhachhang', data.idkhachhang)
           
            localStorage.setItem('idNguoiDung', data.idkhachhang.id);
            idNguoiDung = localStorage.getItem('idNguoiDung')
            var url = `http://127.0.0.1:8000/api/giohang/taogiohang/${idNguoiDung}`
            taoGioHang(url)
            navigate('/kh/trangsp', {replace : true})
          // history.push('/home')
          
          }else if(trangThaiDangNhap === 'Sai mat khau'){

            console.log('Nguoi dung mat khau sai')
            setThongbao('Mật khẩu không đúng')

          }else if(trangThaiDangNhap === 'Ten dang nhap khong ton tai'){
            console.log('Khong tim thay ten dang nhap')
          }else if(trangThaiDangNhap === 'Dang nhap thanh cong' && localStorage.getItem('vaiTro') === 'quanLi') {
            localStorage.setItem('idCaLamViec', data.idCaLamViec)
            navigate('/quanli/trangquanli', { replace : true})
          }else if(trangThaiDangNhap === 'Dang nhap thanh cong' && localStorage.getItem('vaiTro') === 'dauBep') {
          //  layIdCaLamViec()
            localStorage.setItem('idAdmin', data.thongtinadmin.id)
            
          //  console.log('thong tin admin', data.thongtinadmin.id)
            navigate('/daubep', { replace : true})
          }else if(trangThaiDangNhap === 'Dang nhap thanh cong' && localStorage.getItem('vaiTro') === 'giaoHang') {
            //  layIdCaLamViec()
              localStorage.setItem('idAdmin', data.thongtinadmin.id)
              console.log('thong tin nguoi giao hang', data.thongtinadmin.id)
              console.log('thong tin ca lam viec', data.idCaLamViec)
              localStorage.setItem('idNguoiGiaoHang', data.thongtinadmin.id)
              localStorage.setItem('idCaLamViec', data.idCaLamViec)
              navigate('/giaohang')
            }
        });
    }
  const [vaiTro, setVaiTro] = useState("")
  
  const xacDinhVT = () => {
    let vaiTro = ""
    if(localStorage.getItem('vaiTro') === 'khachHang'){
      vaiTro ='Khách hàng' 
    }else if(localStorage.getItem('vaiTro') === 'giaoHang'){
      vaiTro ='Giao hàng' 
    }else if(localStorage.getItem('vaiTro') === 'dauBep'){
      vaiTro ='Đầu bếp' 
    }else if(localStorage.getItem('vaiTro') === 'quanLi'){
      vaiTro ='Quản lí'  
    
  }
  return vaiTro
}




  const testroute = () => {
    navigate('/blas', { replace : true})
  }

  const dangnhapthu = () => {
    navigate('/quanli/trangquanli', { replace : true})
  }
    
  return (
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    >
    <div className="container">
      <div class="d-flex justify-content-center align-items-center vh-100">
    <div>
       {}
         <p className='xdvt'>Bạn đang sử dụng website với vai trò : {xacDinhVT()}</p>
        <h3 className='textFormDangNhap'>Tên đăng nhập</h3>
        <input type='text' 
        className='formDangNhap'
        name='tenDangNhap' 
        value={tenDangNhap} 
        onChange={(e) => {settenDangNhap(e.target.value)}}></input>
        <br></br>
        <br></br>
        <h3 className='textFormDangNhap'>Mật khẩu</h3>
        <input type='password'
        className='formDangNhap' 
        name='matKhau'
        value={matKhau}
        onChange={(e) => {setmatKhau(e.target.value)}}></input>
        <br></br>
        <button className ='nutDangNhap' onClick={login3}>Đăng nhập </button>
        <h3>  {thongbao}</h3>
        
         
        
         
    </div>
    </div>
    </div>
    </ImageBackground>
    </div>
  )
}

export default Login
 