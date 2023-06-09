import React, { useState } from 'react'
import axios from 'axios';
import { ImageBackground } from 'react-native';

function ThemSanPham() {
    const [fileInputState, setFileInputState] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState()
    const [tenSanPham, setTenSanPham] = useState('')
    const [giaSanPham, setGiaSanPham] = useState(0)

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
        
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file) //convert to url
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    } 

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if(!previewSource) return
        uploadImg(previewSource)
    }

    const uploadImg = async (base64EncodedImage) => {
        console.log(base64EncodedImage)
        try {
            await fetch('http://127.0.0.1:8000/api/sanpham/themsanpham', {
                method: 'POST',
                body: JSON.stringify({data: base64EncodedImage}),
                headers: {'Content-type': 'application/json'}
            })
        } catch (error) {
            console.log(error)
        }
    }
    const [image, setImage] =useState([])
    const handleChange = (e) => {
        const imgArr = []
        

        for(let i = 0; i<e.target.files.length; i++){
            imgArr.push(e.target.files[i])
        }
        setImage(imgArr)
    }
    
    

    const submitHandler = (e) => {
        e.preventDefault()
        const data = new FormData()
        for(let i =0; i<image.length;  i++){
            data.append("images[]", image[i])
        }
        data.append('tensp', tenSanPham)
        data.append('giasp', giaSanPham)
        console.log('Ten san pham: '+ tenSanPham+', gia sp: '+giaSanPham)
        if(typeof giaSanPham === 'string') {
            console.log("Vui long nhap gia kieu int")
         }

        axios.post("http://127.0.0.1:8000/api/sanpham/themsanpham", data)
        .then((response) => {
            if(response.status === 200){
                
            }
            setTimeout(() => {
                setImage("")

            }, 10000)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    
  return (
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
    <div>
     
      <p style={{color: "#ade29d"}}>Ảnh sản phẩm: </p>
      <form onSubmit={submitHandler} className="form">
        <input 
        type="file" 
        name="image" 
        onChange={handleChange}
        // onChange={handleFileInputChange}
        
        className="form-input"/>
        <p style={{color: "#ade29d"}}>Tên sản phẩm: </p>
        <br></br>
        <input 
        type="text"
        name="tensp"
        onChange={(e)=>setTenSanPham(e.target.value)}/>
        <p style={{color: "#ade29d"}}>Giá sản phẩm: </p>
        <br></br>
        <input 
        type="text"
        name="giasp"
        onChange={(e)=>setGiaSanPham(e.target.value)}/>
        <br></br>
        <button  type="submit">Submit</button>
      </form>
      {previewSource && (
            <img src={previewSource} width="200" height="400"/>
        )}
    </div>
    </ImageBackground>
    </div>
  )
}

export default ThemSanPham
