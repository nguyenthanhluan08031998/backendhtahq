const express = require('express');
const morgan = require('morgan');
var cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/image', express.static('image'));
const PORT = 5001

app.get('/', (req, res) => {

})

//Đường dẫn API
app.use('/api/quanlitudien', require('./controllers/DictionaryManagementController'))
app.use('/api/hash', require('./controllers/PasswordController'))
app.use('/api/quanlichude', require('./controllers/TopicManagementController'))
app.use('/api/home', require('./controllers/FuncMenuController'))
app.use('/api/lichsu', require('./controllers/HistoryController'))
app.use('/api/yeuthich', require('./controllers/FavoriteController'))
app.use('/api/timkiem', require('./controllers/WordSearchController'))
app.use('/api/setting', require('./controllers/SettingController'))
app.use('/api/appbar', require('./controllers/AppBarController'))
app.use('/api/sync', require('./controllers/SyncController'))
app.use('/api/hoctienganhtheochude', require('./controllers/LearnEnglishByTopicController'))
app.listen(PORT, () => {
    console.log(`API is running in Port ${PORT}`)
})
