document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded!');
    
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        console.log('Clicked:', e.target.href);
      });
    });
  });