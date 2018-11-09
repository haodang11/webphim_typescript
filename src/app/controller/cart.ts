import {Phim} from '../models/phim';

import 'bootstrap'
import "../../assets/css/cart.css"; 
import { DanhSachPhim } from '../models/danhsachphim';

let cartItems: Phim[] = [];

window.onload = function () {
    getCart();
    taoBang(cartItems);
}

let getCart = () => {
    if(localStorage.getItem("cartItems")){
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
}

let setCart = (cart: Phim[]) => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}

let taoBang = (cart:Phim[]) => {
    if(localStorage.getItem("cartItems")){
        cart = JSON.parse(localStorage.getItem("cartItems"));
        var content = "";
        let stt = 1;
        for(let phim of cart)
        {
            let {TenPhim, NgayKhoiChieu, MoTa, HinhAnh, DanhGia} = phim;
            content += `
                <tr>
                    <td>${stt++}</td>
                    <td>${phim.TenPhim}</td>
                    <td>${phim.MoTa}</td>
                    <td><img class="img-fluid" style="height: 200px; width: 200px" src="${phim.HinhAnh}"></td>
                    <td>${phim.NgayKhoiChieu}</td>
                    <td>
                        <button data-ma="${phim.MaPhim}" class="btn btn-info btnXoaCart">Xóa</button>
                    </td>
                </tr>
            `;
        }
        document.getElementById("movieList").innerHTML = content;
        addEventRemove("btnXoaCart");
    }
}

let addEventRemove = (btnXoaClass) => {
    let btnRemoves:any = (<HTMLCollection>document.getElementsByClassName("btnXoaCart"));
    for(let btn of btnRemoves){
        btn.addEventListener("click", function(){
            let ma = btn.getAttribute("data-ma");
            let cart = getCart();
            let index = timPhimTheoMa(ma, cartItems);
            if(index != -1)
            {
                cartItems.splice(index, 1);
            }
            setCart(cartItems);
            getCart();
            taoBang(cartItems);
        });
    }
}

let timPhimTheoMa = (maPhim:string, carts: Phim[]) => {
    for(let i in carts) {
        if(carts[i].MaPhim == maPhim)
            return parseInt(i);
    }
    return -1;
}