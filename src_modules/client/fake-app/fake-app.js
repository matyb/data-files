const onFileChange = require('../client.js');
const fileSelectId = 'file';
document.getElementById(fileSelectId).onchange = () => {
  onFileChange(fileSelectId,
               {separator: " ", keys: ["type", "data"]},
               (record) => {alert("type:" + record.type + " data:" + record.data);},
               () => {alert("resetting view")});
};
