import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import TrangSanPham from './component/TrangSanPham';
import { NavBar } from './component/NavBar';
import Giohang from './component/Giohang';
import { useLocation } from 'react-router-dom';
import TrangChuAdmin from './component/admin/TrangChuAdmin';
import Admin_trangChiTietDonHang from './component/admin/Admin_trangChiTietDonHang';
import TrangDSDonHangDaNhan from './component/admin/TrangDSDonHangDaNhan';
import { NavBarChoQuanLi } from './component/admin/NavBarChoQuanLi';
import ChiDinhDauBep from './component/admin/ChiDinhDauBep';
import DauBepXemDsMonAnChiDinh from './component/daubep/DauBepXemDsMonAnChiDinh';
import DauBepTrangBatDauCheBien from './component/daubep/DauBepTrangBatDauCheBien';
import DanhSachDonHangDaCheBienXong from './component/admin/DanhSachDonHangDaCheBienXong';
import ChiDinhNguoiGiaoHang from './component/admin/ChiDinhNguoiGiaoHang';
import XemDanhSachDonHangDuocGiao from './component/nguoigiaohang/XemDanhSachDonHangDuocGiao';
import GiaoHang from './component/nguoigiaohang/GiaoHang';
import TrangDsDonHangDaDenNoi from './component/TrangDsDonHangDaDenNoi';
import TrangDsDonHangDaThanhToan from './component/TrangDsDonHangDaThanhToan';
import NavBarNguoiGiaoHang from './component/nguoigiaohang/NavBarNguoiGiaoHang';
import XemDanhSachNguoiDungDanhGia from './component/nguoigiaohang/XemDanhSachNguoiDungDanhGia';
import XemThongTinCaNhanGiaoHang from './component/nguoigiaohang/XemThongTinCaNhanGiaoHang';
import ThemSanPham from './component/admin/ThemSanPham';
import XemCaLamViec from './component/admin/XemCaLamViec';
import XemChiTietDonHangDaThanhToan from './component/XemChiTietDonHangDaThanhToan';
import ThemDiaChiThanhToan from './component/ThemDiaChiThanhToan';
import TestTrangSanPham from './component/TestTrangSanPham';
import DanhSachSanPham from './component/admin/DanhSachSanPham';
import DanhSachDanhGiaDauBep from './component/daubep/DanhSachDanhGiaDauBep';
import NavBarDauBep from './component/daubep/NavBarDauBep';

function App() {

  const Rendernav = () => {
    const location = useLocation();
    
    var type = typeof location.pathname;
    console.log('ten:',location.pathname);
    console.log('type:',type);
    if(location.pathname.includes('/kh') ){
      return(
        <NavBar/>
      )
    }else{
      return(
        <></>
        
      )
    }
  }

  const RenderNavBarChoQuanLi = () => {
    const location = useLocation();
    
    var type = typeof location.pathname;
    console.log('ten:',location.pathname);
    console.log('type:',type);
    if(location.pathname.includes('quanli')){
      return(
        <NavBarChoQuanLi/>
      )
    }else{
      return(
        
        <></>
      )
    }
  }

  const RenderNavBarr = () => {
    const location = useLocation();
    
    var type = typeof location.pathname;
    console.log('ten:',location.pathname);
    console.log('type:',type);
    if(location.pathname.includes('quanli')){
      return(
        <NavBarChoQuanLi/>
      )
    }else if(location.pathname.includes('giaohang')){
      return(
        
        <NavBarNguoiGiaoHang/>
      )
    }else if(location.pathname.includes('daubep')){
      return(
        <NavBarDauBep/>
      )
    }else if(location.pathname.includes('kh')){
      return(
        <NavBar/>
      )
    }else{
      return <></>
    }
  }

  return (
    <>
    {/* {Rendernav()} */}
    {/* <NavBar/> */}
      {RenderNavBarr()}
      <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/kh/trangsp' element={<TrangSanPham/>}></Route>
          <Route path='/kh/giohang' element={<Giohang/>}></Route>
          <Route path='/kh/dsdonhangdadennoi' element={<TrangDsDonHangDaDenNoi/>}/>
          <Route path='/kh/dsdonhangdathanhtoan' element={<TrangDsDonHangDaThanhToan/>}/>
          <Route path='/kh/chitietdonhangdathanhtoan' element={<XemChiTietDonHangDaThanhToan/>}/>
          <Route path='/kh/themdiachi' element={<ThemDiaChiThanhToan/>}/>
          <Route path='/sanpham' element={<TestTrangSanPham/>}/>

          <Route path='quanli/trangquanli' element={<TrangChuAdmin/>}></Route>
          <Route path='quanli/trangsp' element={<DanhSachSanPham/>}></Route>
          <Route path='quanli/chitietgiohang' element={<Admin_trangChiTietDonHang/>}></Route>
          <Route path='quanli/themsp' element={<ThemSanPham/>}></Route>
          <Route path='quanli/calamviec' element={<XemCaLamViec/>}></Route>

          <Route path='quanli/dsdonhangdanhan' element={<TrangDSDonHangDaNhan/>}></Route>
          <Route path='quanli/chitietgiohang/chidinhdaubep' element={<ChiDinhDauBep/>}></Route>
          <Route path='quanli/dsdonhangdachebienxong' element={<DanhSachDonHangDaCheBienXong/>}></Route>
          <Route path='quanli/dsdonhangdachebienxong/chidinhnguoigiaohang' element={<ChiDinhNguoiGiaoHang/>}></Route>
          
          

          <Route path='daubep' element={<DauBepXemDsMonAnChiDinh/>}></Route>
          <Route path='daubep/dsdanhgia' element={<DanhSachDanhGiaDauBep/>}></Route>
          <Route path='daubep/batdauchebien' element={<DauBepTrangBatDauCheBien/>}></Route>

          <Route path='giaohang'>
            <Route path='' element={<XemDanhSachDonHangDuocGiao/>}></Route>
            <Route path='tienhanhgiao' element={<GiaoHang/>}></Route>
            <Route path='dsdoanhgia' element={<XemDanhSachNguoiDungDanhGia/>}></Route>
            <Route path='thongtincanhan' element={<XemThongTinCaNhanGiaoHang/>}></Route>

          </Route>
          

      </Routes>
    </>
  );
}

export default App;
