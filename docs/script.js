var map = L.map('map').setView([39, -100], 4.45);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var places = [
    {
        name: 'Gulf of Mexico',
        lat: 25.0,
        lon: -90.0,
        nameChanges: [
            { start: 1800, name: 'Gulf of Mexico' },
            { start: 2025, name: 'Gulf of America' }
        ],
        focus: true
    },
    {
        name: 'Denali',
        lat: 63.0695,
        lon: -151.0074,
        nameChanges: [
            { start: 1800, name: 'Mount McKinley' },
            { start: 2015, name: 'Mount Denali' },
            { start: 2025, name: 'Mount McKinley' }
        ],
        focus: true
    },

    {
        name: 'Hoover Dam',
        lat: 36.0161,
        lon: -114.7377,
        nameChanges: [
            { start: 1933, name: 'Boulder Dam' },
            { start: 1947, name: 'Hoover Dam' }
        ]
    },
    {
        name: 'Cape Canaveral',
        lat: 28.3922,
        lon: -80.6077,
        nameChanges: [
            { start: 1800, name: 'Cape Canaveral' },
            { start: 1963, name: 'Cape Kennedy' },
            { start: 1973, name: 'Cape Canaveral' }
        ]
    },
    {
        name: 'Truth or Consequences',
        lat: 33.1284,
        lon: -107.2528,
        nameChanges: [
            { start: 1856, name: 'Palomas Hot Springs' },
            { start: 1917, name: 'Hot Springs' },
            { start: 1950, name: 'Truth or Consequences' }
        ]
    },

    {
        name: 'Gateway Arch National Park',
        lat: 38.6247,
        lon: -90.1848,
        nameChanges: [
            { start: 1935, name: 'Jefferson National Expansion Memorial' },
            { start: 2018, name: 'Gateway Arch National Park' }
        ]
    },
    {
        name: 'Harry S. Truman Reservoir',
        lat: 38.2631,
        lon: -93.4049,
        nameChanges: [
            { start: 1964, name: 'Kaysinger Bluff Reservoir' },
            { start: 1970, name: 'Harry S. Truman Reservoir' }
        ]
    },
    {
        name: 'Mount Rushmore',
        lat: 43.8791,
        lon: -103.4591,
        nameChanges: [
            { start: 1800, name: 'Six Grandfathers' },
            { start: 1885, name: 'Mount Rushmore' }
        ]
    },
    {
        name: 'Nome',
        lat: 64.5011,
        lon: -165.4064,
        nameChanges: [
            { start: 1898, name: 'Anvil City' },
            { start: 1899, name: 'Nome' }
        ]
    },
    {
        name: 'New York',
        lat: 40.7128,
        lon: -74.0060,
        nameChanges: [
            { start: 1624, name: 'New Amsterdam' },
            { start: 1664, name: 'New York' }
        ]
    },
    {
        name: 'San Francisco',
        lat: 37.7749,
        lon: -122.4194,
        nameChanges: [
            { start: 1800, name: 'Yerba Buena' },
            { start: 1847, name: 'San Francisco' }
        ]
    },
    {
        name: 'Los Angeles',
        lat: 34.0522,
        lon: -118.2437,
        nameChanges: [
            { start: 1781, name: 'El Pueblo de Nuestra Señora la Reina de los Ángeles' },
            { start: 1835, name: 'Los Angeles' }
        ]
    },
    {
        name: 'Charleston',
        lat: 32.7765,
        lon: -79.9311,
        nameChanges: [
            { start: 1670, name: 'Charles Town' },
            { start: 1783, name: 'Charleston' }
        ]
    },
    {
        name: 'Fort Bragg',
        lat: 35.14,
        lon: -79.01,
        nameChanges: [
            { start: 1918, name: 'Camp Bragg' },
            { start: 1922, name: 'Fort Bragg' },
            { start: 2023, name: 'Fort Liberty' },
            { start: 2025, name: 'Fort Bragg' }
        ],
        focus: true
    },
    {
        name: 'Fort Benning',
        lat: 32.3633,
        lon: -84.9493,
        nameChanges: [
            { start: 1918, name: 'Fort Benning' },
            { start: 2023, name: 'Fort Moore' },
            { start: 2025, name: 'Fort Benning' }
        ]
    },
    {
        name: 'Fort Gordon',
        lat: 33.45,
        lon: -82.00,
        nameChanges: [
            { start: 1941, name: 'Camp Gordon' },
            {start: 1956, name: 'Fort Gordon' },
            { start: 2023, name: 'Fort Eisenhower' }
        ]
    }
];

function getName(place, year) {
    var changes = place.nameChanges.sort((a, b) => a.start - b.start);
    for (var i = changes.length - 1; i >= 0; i--) {
        if (changes[i].start <= year) {
            return changes[i].name;
        }
    }
    return changes[0].name;
}

var markerGroup = L.layerGroup().addTo(map);

places.forEach(function(place) {
    var marker = L.marker([place.lat, place.lon]);
    var initialName = getName(place, 2025);
    
    var tooltipOptions = {
        permanent: true,
        direction: 'top',
        className: place.focus ? 'focus-tooltip' : ''
    };
    marker.bindTooltip(initialName, tooltipOptions);
    
    marker.place = place;
    
    markerGroup.addLayer(marker);
});

document.getElementById('date-slider').addEventListener('input', function() {
    var selectedYear = parseInt(this.value);
    document.getElementById('selected-year').textContent = selectedYear;
    
    markerGroup.eachLayer(function(layer) {
        var name = getName(layer.place, selectedYear);
        layer.getTooltip().setContent(name);
    });
});
