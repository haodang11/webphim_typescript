import "../../assets/css/index.css";
import { PhimService } from "../service/phimSV";
import {Phim} from '../models/phim';
import { NguoiDung } from "../models/nguoidung";
import { NguoiDungService } from "../service/nguoidungSV";

import * as $ from "jquery";
import Swal from 'sweetalert2';

import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);
 
// Generate the chart
//
Highcharts.chart('statitics', {

    title: {
      text: 'Solar Employment Growth by Sector, 2010-2016'
    },
  
    subtitle: {
      text: 'Source: thesolarfoundation.com'
    },
  
    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
  
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
  
    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  
  });


//Instance form PhimService
const phimSv = new PhimService();
const nguoiDungSV = new NguoiDungService();
let danhSachPhim:Phim[] = [];
let gioHang:Phim[] = [];

window.onload = function(){
    phimSv.layDanhSachPhim().done(function(res){
        danhSachPhim = res;
        renderMovieItem();
        console.log(res);
    }).fail(function(err){
        console.log(err);
    })
    loadLoginInfo();
}

let renderMovieItem = () => {
    let content = "";
    for(let phim of danhSachPhim){
        //Destructering
        let {MaPhim,TenPhim,Trailer,HinhAnh,MaNhom,MoTa,NgayKhoiChieu,DanhGia} = phim
        content += `
        <div class="col-sm-6 col-md-3 text-center">
        <div class="movie__item">
            <img src="${HinhAnh}" onerror="this.onerror===null; this.src='http://www.safexone.com/images/old/default.gif'" style="height: 350px" class="img-fluid w-100">
            <div class="movie__overlay"></div>
            <div class="movie__detail w-100 text-center text-white">
                <i class="fa fa-play d-block mx-auto mb-3 video-playvenobox  vbox-item" href="${Trailer}" data-vbtype="video"></i>
                <p>
                <a class="movie_icon"><i class="fa fa-file-o"></i></a>
                <a
                data-maphim="${MaPhim}"
                data-tenphim="${TenPhim}"
                data-trailer="${Trailer}"
                data-hinhanh="${HinhAnh}"
                data-mota="${MoTa}"
                data-manhom=${MaNhom}
                data-ngaychieu=${NgayKhoiChieu}
                data-danhgia=${DanhGia}
                class="movie_icon btnAddToCart"><i class="fa fa-cart-plus"></i></a>
                </p>
                <a></a>
                <span>Released: ${phim.NgayKhoiChieu ? phim.NgayKhoiChieu.substr(0,10) : "2018-20-10"}</span>
            </div>
        </div>
        <p class="movie__name text-center my-3">${phim.TenPhim}</p>
        ${renderStar(parseInt(phim.DanhGia))}
    </div>
        `;
    }
    (<HTMLElement>document.getElementById("movieList")).innerHTML = content;
    addCart("btnAddToCart")
};

let renderStar = (num:number) => {
    let star = "";
    if(!num) num = 5;
    for(let i = 0; i < num; i ++)
    {
        star += `<i class="fa fa-star movie__star"></i>`;
    }
    for(let k = num; k < 5; k++)
    {
        star += `<i class="fa fa-star-o movie__star"></i>`
    }
    return star;
}

let addCart = (btnClass) => {
    let btnCarts:any = (<HTMLCollection>document.getElementsByClassName(btnClass)) ;
    for(let btn of btnCarts) {
        btn.addEventListener("click", ()=> {
            let ma = btn.getAttribute("data-maphim");
            let ten = btn.getAttribute("data-tenphim");
            let trailer = btn.getAttribute("data-trailer");
            let hinhanh = btn.getAttribute("data-hinhanh");
            let mota = btn.getAttribute("data-mota");
            let manhom = btn.getAttribute("data-manhom");
            let ngaychieu = btn.getAttribute("data-ngaychieu");
            let danhgia = btn.getAttribute("data-danhgia");

            let phimItem = new Phim(ma, ten, trailer, hinhanh, mota, manhom, ngaychieu, danhgia);
            //Spread operator
            if(timPhimTheoMa(ma)) {
                gioHang =  [...gioHang, phimItem];
            }
            console.log(gioHang);
            document.getElementById("totalAmount").innerHTML = gioHang.length.toString();
            localStorage.setItem("cartItems", JSON.stringify(gioHang));
        });
    }
}

let timPhimTheoMa = (maPhim:string) => {
    for(let cart of gioHang) {
        if(cart.MaPhim == maPhim)
            return false;
    }
    return true;
}


//Dang ky
let DangKyNguoiDung = () => {
    let taiKhoan = (<HTMLInputElement>document.getElementById("txtTaiKhoan")).value;
    let matKhau = (<HTMLInputElement>document.getElementById("txtMatKhau")).value;
    let hoTen = (<HTMLInputElement>document.getElementById("txtName")).value;
    let email = (<HTMLInputElement>document.getElementById("txtEmail")).value;
    let phone = (<HTMLInputElement>document.getElementById("txtPhone")).value;
    let maNhom = "GP01";
    let maLoai = "KhachHang";

    let nguoiDung = new NguoiDung(taiKhoan, matKhau, email, phone, maNhom, maLoai, hoTen);

    nguoiDungSV.DangKy(nguoiDung).done( res => {
        //console.log(res);
        if(res != null)
        {
            Swal('Thông báo', 'Đăng ký thành công!', 'success');
            (<HTMLElement>document.getElementById("closeModal")).click();
        }
    }).fail(err => {
        console.log(err);
    })
}

let DangNhap = () => {
    let taiKhoan = (<HTMLInputElement>document.getElementById("txtTaiKhoanDN")).value;
    let matKhau = (<HTMLInputElement>document.getElementById("txtMatKhauDN")).value;
    nguoiDungSV.DangNhap(taiKhoan, matKhau).done(res => {
        if(typeof(res) !== "string")
        {
            (<HTMLElement>document.getElementById("closeModalDN")).click();
            Swal('Thông báo', 'Đăng nhập thành công!', 'success');
            localStorage.setItem("TaiKhoan", JSON.stringify(res));
            loadLoginInfo();
        }
    }).done(err => {

    })
}


(<HTMLElement>document.getElementById("btnDangKy")).addEventListener("click", DangKyNguoiDung);
(<HTMLElement>document.getElementById("btnDangNhap")).addEventListener("click", DangNhap);

let loadLoginInfo = () => {
    let taiKhoan = JSON.parse(localStorage.getItem("TaiKhoan"));
    if(taiKhoan){
        (<HTMLElement>document.getElementById("lbTaiKhoan")).innerText = taiKhoan.HoTen;
    }
}