const links = document.querySelectorAll('.account_info a');
links.forEach((link) => link.addEventListener('click', handleClick));

function handleClick(event) {
  event.preventDefault();

  const target = document.getElementById(
    event.currentTarget.getAttribute('href'),
  );

  const rootElement = event.currentTarget.parentElement.parentElement;
  rootElement.classList.remove('show');
  target.classList.add('show');
}
