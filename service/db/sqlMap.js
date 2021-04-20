var sqlMap = {
    user: {
        add: 'insert into user (username, account, password, repeatPass, email, phone, card, birth, sex) values (?,?,?,?,?,?,?,?,?)',
        select_name: 'select * from user', 
        update_user: 'update user set'
    },
    food:{
        add:'insert into food (blockchainId,foodName,productDate,exp,manufacturer,advicePrice,serialNumber,imgHash,status) values (?,?,?,?,?,?,?,?,?)',
    }
}

module.exports = sqlMap;