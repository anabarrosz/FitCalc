function showPage(pageNumber) {
    // Esconder todas as páginas
    const pages = document.querySelectorAll('.post-container');
    pages.forEach(page => page.style.display = 'none');
  
    // Mostrar a página selecionada
    const selectedPage = document.getElementById(`page-${pageNumber}`);
    selectedPage.style.display = 'block';
  }




  
  
  let currentIndex = 0;
  const totalItems = document.querySelectorAll('.carousel-item').length;
  const itemsPerView = 3; // Quantos itens são visíveis ao mesmo tempo
  
  function updateCarousel() {
      const carousel = document.querySelector('.carousel');
      const itemWidth = document.querySelector('.carousel-item').clientWidth;
      const newTransform = -currentIndex * (itemWidth + 20); // 20px é o espaçamento entre os itens
      carousel.style.transform = `translateX(${newTransform}px)`;
  }
  
  function nextSlide() {
      // Avança apenas se houver mais itens após os visíveis
      if (currentIndex < totalItems - itemsPerView) {
          currentIndex++;
          updateCarousel();
      } else {
          // Volta para o início se não houver mais itens após os visíveis
          currentIndex = 0;
          updateCarousel();
      }
  }
  
  function previousSlide() {
      // Retrocede apenas se não estiver no início
      if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
      } else {
          // Vai para o último grupo se já estiver no início
          currentIndex = totalItems - itemsPerView;
          updateCarousel();
      }
  }
  