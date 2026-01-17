// Basic contact form validation and modal acknowledgement
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('modal');
  const modalMsg = document.getElementById('modalMsg');
  const closeModal = document.getElementById('closeModal');

  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    const missing = [];
    if(!name) missing.push('Name');
    if(!email) missing.push('Email');
    if(!message) missing.push('Message');

    if(missing.length){
      alert('Please fill in the following: ' + missing.join(', '));
      return;
    }
    // simple email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
      alert('Please enter a valid email address.');
      return;
    }

    // Show modal acknowledgement
    modalMsg.textContent = `Thanks ${name}! We received your message and will reach out to ${email} soon.`;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
    // move focus into modal
    closeModal.focus();
  });

  if(closeModal){
    closeModal.addEventListener('click', ()=>{
      const form = document.getElementById('contactForm');
      document.getElementById('modal').style.display = 'none';
      document.getElementById('modal').setAttribute('aria-hidden','true');
      if(form) form.reset();
    });
  }

  // Set aria-current on active nav link for accessibility
  const setActiveNav = ()=>{
    const links = document.querySelectorAll('nav a');
    const path = window.location.pathname.split('/').pop();
    links.forEach(a=>{
      if(a.getAttribute('href') === path){
        a.setAttribute('aria-current','page');
      }
    });
  };
  setActiveNav();
});