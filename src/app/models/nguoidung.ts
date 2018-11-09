
export class NguoiDung {
    TaiKhoan: string;
    MatKhau: string;
    Email: string;
    SoDT: string;
    MaNhom: string;
    MaLoaiNguoiDung: string;
    HoTen: string;

    constructor(taiKhoan:string, matKhau:string, email:string, soDt: string, maNhom:string, maLoaiNguoiDung: string, hoTen: string)
    {
        this.TaiKhoan = taiKhoan;
        this.MatKhau = matKhau;
        this.Email = email;
        this.SoDT = soDt;
        this.MaNhom = maNhom;
        this.MaLoaiNguoiDung = maLoaiNguoiDung;
        this.HoTen = hoTen;
    }
}