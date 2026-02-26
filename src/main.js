// Simple "Updated …" text without needing a build step.
// Uses the browser's locale/timezone (fine for UK audience).
const el = document.getElementById('updated');
const d = new Date();
const opts = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
el.textContent = d.toLocaleString('en-GB', opts);

// Load calendars from JSON and insert iframes + source list items.
fetch('/calendars.json')
  .then(function(r) { return r.json(); })
  .then(function(calendars) {
    var container = document.getElementById('calendars');
    var sourcesList = document.getElementById('sources-list');
    calendars.forEach(function(cal) {
      if (!cal.name || !cal.url) { return; }

      var iframe = document.createElement('iframe');
      iframe.title = cal.name + ' events';
      iframe.className = 'calendar';
      iframe.src = cal.url;
      iframe.loading = 'lazy';
      container.appendChild(iframe);

      var li = document.createElement('li');
      li.textContent = cal.name;
      sourcesList.appendChild(li);
    });
  })
  .catch(function(err) { console.error('Failed to load calendars.json:', err); });
