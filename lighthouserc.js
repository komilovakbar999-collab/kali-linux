module.exports = {
  ci: {
    collect: {
      url: [
        'http://127.0.0.1:4175/index.html',
        'http://127.0.0.1:4175/cheatsheet.html',
        'http://127.0.0.1:4175/learn.html',
        'http://127.0.0.1:4175/lab.html',
        'http://127.0.0.1:4175/all.html'
      ],
      numberOfRuns: 1,
      /* Playwright webServer testlardan keyin to'xtaydi: LHCI uchun serverni ochamiz */
      startServerCommand: 'python3 -m http.server 4175 --directory .',
      startServerPort: 4175
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }]
      }
    }
  }
};
