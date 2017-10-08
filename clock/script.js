const $ = s => document.documentElement.querySelector(s);

const prettyNumber = (n = 0, separator = ',') => {
  return `${n}`
    .split('')
    .reverse()
    .reduce((arr, a, i) => {
      if (i != 0 && i % 3 === 0) {
        arr.unshift(separator);
      }
      arr.unshift(a);

      return arr;
    }, [])
    .join('');
};

const checkChange = (element, newValue) => {
  if (newValue != element.textContent) {
    element.textContent = newValue;
    // return true;
  }
};

const unixEl = $('#unix');
let hourFormat12 = true;

const printTimeAndDate = () => {
  const dateObj = new Date();
  const dateArr = dateObj
    .toLocaleDateString('es-US', {
      hour12: hourFormat12,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    })
    .split(' ');
  const timeArr = dateArr[4].split(':');
  const dateFull = dateArr
    .slice(0, 4)
    .join(' ')
    .replace(/[a-z\xE1\xE9]{3,}/g, word =>
      word.replace(/^./, firstLetter => firstLetter.toUpperCase()),
    );

  const hour = timeArr[0].padStart(2, '0');
  const minute = timeArr[1];
  const second = timeArr[2];

  checkChange($('#hour'), hour);
  checkChange($('#minute'), minute);
  $('#second').textContent = second;
  checkChange($('#date'), dateFull);

  if (unixEl.textContent === '0' || !unixEl.hidden) {
    unixEl.textContent = prettyNumber(parseInt(dateObj.getTime() / 1000));
  }

  if (second === '00' || !document.title.startsWith(`${hour}`)) {
    document.title = document.title.replace(/[\d:]{5}/, `${hour}:${minute}`);
  }
};

const reSync = () => {
  clearInterval(clock);
  sync();
};

const sync = () => {
  const calculateOffset = () => 999 - new Date().getMilliseconds();
  setTimeout(() => {
    window.clock = setInterval(printTimeAndDate, 1000);
    setTimeout(() => {
      $('.container').classList.add('show');
    }, 1000);
  }, calculateOffset());
};

sync();
window.clockSync = setInterval(reSync, 15 * 60000);

const body = $('body');

// const setCssVar = (element, properties) => {
//   Object.entries(properties).forEach(([name, value]) => {
//     element.style.setProperty(`--${name}`, value);
//   });
// };

const toggleTheme = (value) => {
  if (body.dataset.theme === value) {
    body.dataset.theme = '';
  } else {
    body.dataset.theme = value;
  }
};

// const toggleDataValue = (element, attribute, value) => {
//   if (element.dataset[attribute] === value) {
//     element.dataset[attribute] = '';
//   } else {
//     element.dataset[attribute] = value;
//   }
// };

body.addEventListener('keyup', e => {
  switch (e.keyCode) {
    case 70: // key: F
      if (document.webkitIsFullScreen) {
        document.webkitExitFullscreen(true);
      } else {
        body.webkitRequestFullscreen(true);
      }
      break;
    case 72: // key: H
      hourFormat12 = !hourFormat12;
      break;
    case 76: // key: L
      toggleTheme('light');
      break;
    case 78: // key: N
      toggleTheme('night');
      break;
    case 82: // key: R
      reSync();
      break;
    case 85: // key: U
      unixEl.hidden = !unixEl.hidden;
      break;
  }
});
