const os = require('os');
const fs = require('fs');
const hostile = require('hostile');

const badSites = [];

const block = (url) => {
  const redirectTo = '127.0.0.0'
  
  let hosts;

  if (os.platform == 'win32') {
    hosts = "C:\\Windows\\System32\\drivers\\etc\\hosts";
  } else {
    hosts = '/etc/hosts';
  }

  badSites.push(url.value);

  fs.readFile(hosts, (err, data) => {
    if (err) console.log(err);

    const contents = data.toString();

    badSites.forEach((site) => {
      if (!contents.includes(site)) {
        hostile.set(redirectTo, site, (err) => {
          if (err) {
            console.log(err, 'error');
          } else {
            new Notification('Success', {
              body: `You have blocked ${site}!`
            });
          }
        });
      }
    });
  });
};


const blockButton = document.getElementById('block');

blockButton.addEventListener('click', () => {
  const url = document.getElementById('url');

  console.log('starting blocking sites');
  block(url);
  console.log('done');

  url.value = '';

});
