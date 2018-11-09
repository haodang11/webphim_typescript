export class Phim{
    public MaPhim: string;
    public TenPhim: string;
    public Trailer: string;
    public HinhAnh: string;
    public MoTa: string;
    public MaNhom: string;
    public NgayKhoiChieu: string;
    public DanhGia: string;

    constructor(maPhim:string, tenPhim:string, trailer:string, hinhAnh:string, moTa:string, maNhom:string, ngayKhoiChieu:string, danhGia:string){
        this.MaPhim = maPhim;
        this.TenPhim = tenPhim;
        this.Trailer = trailer;
        this.HinhAnh = hinhAnh;
        this.MoTa = moTa;
        this.MaNhom = maNhom;
        this.NgayKhoiChieu = ngayKhoiChieu;
        this.DanhGia = danhGia;
    }
}

//var phimMoi = new Phim(1, 'a', 'b', 'd', 'e', 'f', 'g', 'h');