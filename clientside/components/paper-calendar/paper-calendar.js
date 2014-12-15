Polymer({
  date: new Date(),
  items: [],

  created: function() {
    this.updateNowDate = this.debounce(this._updateNowDate, 1000);
  },
  ready: function() {
    this.now = moment();
    this.updateDate();
  },
  observe: {
    date: 'updateNowDate',
    now: 'updateInputDate',
    day: 'setNowDate',
    year: 'render'
  },
  prev: function() {
    this.now = this.now.clone().subtract(1, 'month');
    this.updateDate();
  },
  next: function() {
    this.now = this.now.clone().add(1, 'month');
    this.updateDate();
  },
  setItem: function(e, d, el) {
    if (el.className.indexOf('active') === -1) { return; }
    this.day = el.dataset.value;
    this.setNowDate();
    this.updateInputDate();
    console.log('calendar date = ' + this.date);
    this.fire("core-select");
  },

  render: function() {
    this.setNowDate();
    this.item = this.day;
    this.setDays();
  },

  _updateNowDate: function() {
    var now = this.date ? moment(this.date) : moment();
    if (!now.isValid()) { return; }
    this.now = now;
    this.updateDate();
  },
  updateInputDate: function() {
    this.date = this.now.toDate();
  },
  setNowDate: function() {
    var now = moment([this.day, this.month, this.year].join(' '), 'D MMMM YYYY');
    if (now.isValid()) {
      this.now = now;
    } else if (this.day > moment(this.month, 'MMMM').daysInMonth()) {
      this.day = moment(this.month, 'MMMM').daysInMonth();
    }
  },

  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  },
  updateDate: function() {
    this.day = this.now.format('D');
    this.month = this.now.format('MMMM');
    this.year = this.now.format('YYYY');
    this.item = this.day;
  },
  getDayNames: function() {
    var start = moment().day(0),
      end = moment().day(6),
      days = [];
    moment()
      .range(start, end)
      .by('days', function(moment) {
        days.push({
          val: moment.format('dd'),
          label: moment.format('dd'),
          cl: 'heading'
        });
      });
    return days;
  },
  setDays: function() {
    var start = this.now.clone().startOf('month').day(0),
      end = this.now.clone().endOf('month').day(6),
      items = this.items = this.getDayNames(),
      month = this.now.month();
    moment()
      .range(start, end)
      .by('days', function(moment) {
        items.push({
          val: moment.format('D'),
          label: moment.format('D'),
          cl: moment.month() === month ? 'active': 'fade'
        });
      });
  }
});
