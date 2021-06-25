var mong = require('mongoose');
const schema = new mong.Schema({ 
name: 'string', 
department: 'string', 
age:'number', 
rollno:{ 
    type: 'String', 
    unique: true
}
});
module.exports = mong.model('Students', schema);
