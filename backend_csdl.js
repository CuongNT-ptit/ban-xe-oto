const express = require('express');
const mysql2  = require('mysql2');
const cors    = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const db = mysql2.createConnection({
    host:     'localhost',
    user:     'root',
    password: '',          
    database: 'btjvscr'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Kết nối database thất bại:', err.message);
        return;
    }
    console.log('✅ Kết nối database thành công!');
});
app.get('/api/cars', (req, res) => {
const { brand, fuel, gearbox, status, sortPrice, sortYear, tab } = req.query;

    let sql    = 'SELECT * FROM xe_oto WHERE 1=1';
    let params = [];
    if (brand) {
        sql += ' AND LOWER(hang_xe) = LOWER(?)';
        params.push(brand);
    }

    if (fuel) {
        sql += ' AND LOWER(nhien_lieu) = LOWER(?)';
        params.push(fuel);
    }

    if (gearbox) {
        sql += ' AND LOWER(hop_so) = LOWER(?)';
        params.push(gearbox);
    }

    if (status) {
        sql += ' AND LOWER(tinh_trang) = LOWER(?)';
        params.push(status);
    }
    if ( tab && tab !== 'Tất cả'){
        sql+= ' AND LOWER(loai_nguoi_ban) = LOWER(?)';
        params.push(tab);
    }

    if (sortPrice === 'asc') {
        sql += ' ORDER BY gia_xe ASC';
    } else if (sortPrice === 'desc') {
        sql += ' ORDER BY gia_xe DESC';
    } else if (sortYear === 'asc') {
        sql += ' ORDER BY nam_san_xuat ASC';
    } else if (sortYear === 'desc') {
        sql += ' ORDER BY nam_san_xuat DESC';
    }
    console.log('SQL:', sql);
    console.log('Params:', params);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('❌ Lỗi truy vấn SQL:', err.message);
            return res.status(500).json({ error: 'Lỗi Server', details: err.message });
        }
        console.log(`✅ Trả về ${result.length} xe`);
        res.json(result);
    });
});
app.get('/api/cars/:id', (req, res) => {

    const id = req.params.id;

    db.query(
        'SELECT * FROM xe_oto WHERE id = ?',
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    error: 'Không tìm thấy xe'
                });
            }

            res.json(result[0]);

        }
    );

});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});