function login(role) {
  // Save role to localStorage
  localStorage.setItem('userRole', role);

  if (role === 'landlord') {
    window.location.href = 'landlord.html';
  } else {
    window.location.href = 'view.html';
  }
}
