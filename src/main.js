// Simple "Updated …" text without needing a build step.
// Uses the browser's locale/timezone (fine for UK audience).
const el = document.getElementById('updated');
const d = new Date();
const opts = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
el.textContent = d.toLocaleString('en-GB', opts);

// Load calendars from JSON and insert iframes + source list items.
const GCAL_BASE = 'https://calendar.google.com/calendar/embed?mode=AGENDA&showTitle=0&showTabs=0&showCalendars=0&showTz=0&wkst=2&hl=en_GB&ctz=Europe%2FLondon&src=';

fetch('/calendars.json')
  .then(function(r) { return r.json(); })
  .then(function(calendars) {
    var container = document.getElementById('calendars');
    var sourcesList = document.getElementById('sources-list');
    calendars.forEach(function(cal) {
      if (!cal.name || !cal.src) { return; }

      var iframe = document.createElement('iframe');
      iframe.title = cal.name + ' events';
      iframe.className = 'calendar';
      iframe.src = GCAL_BASE + cal.src;
      iframe.loading = 'lazy';
      container.appendChild(iframe);

      var li = document.createElement('li');
      li.textContent = cal.name;
      sourcesList.appendChild(li);
    });
  })
  .catch(function(err) { console.error('Failed to load calendars.json:', err); });
