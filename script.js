const platsData = {
    donburi: {
        titre: "Donburi",
        description: "Un bol de riz garni de viandes, poissons et légumes mijotés. Un plat traditionnel japonais réconfortant et savoureux."
    },
    ramen: {
        titre: "Ramen",
        description: "Nouilles servies dans un bouillon riche, garni de porc chachu, œuf mariné, algues nori et légumes croquants."
    },
    udon: {
        titre: "Udon",
        description: "Épaisses nouilles de blé servies dans un bouillon dashi fumant avec tempura de crevettes et légumes de saison."
    },
    soba: {
        titre: "Soba",
        description: "Fines nouilles de sarrasin accompagnées d'un bouillon chaud ou froid, garnies de ciboule et tempura."
    },
    sukiyaki: {
        titre: "Sukiyaki",
        description: "Soupe mijotée avec bœuf tranché finement, légumes, champignons et nouilles dans un bouillon sucré-salé."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const platCircles = document.querySelectorAll('.plat-circle');
    const descriptionTitre = document.querySelector('.carousel-description h3');
    const descriptionTexte = document.querySelector('.carousel-description p');
    
    // Clone les premiers et derniers éléments pour l'effet infini
    const firstClone = platCircles[0].cloneNode(true);
    const lastClone = platCircles[platCircles.length - 1].cloneNode(true);
    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, platCircles[0]);

    let currentIndex = 1;
    let isTransitioning = false;
    const slideWidth = platCircles[0].offsetWidth + 50; // 50 est le gap

    // Position initiale
    carousel.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    function updateDescription(index) {
        const platId = platCircles[index].dataset.plat;
        const plat = platsData[platId];
        
        // Animation de fondu pour la description
        const description = document.querySelector('.carousel-description');
        description.style.opacity = '0';
        
        setTimeout(() => {
            descriptionTitre.textContent = plat.titre;
            descriptionTexte.textContent = plat.description;
            description.style.opacity = '1';
        }, 300);
    }

    function slideCarousel(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        carousel.style.transition = 'transform 0.5s ease-in-out';
        currentIndex += direction;
        carousel.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

        // Met à jour la description avec l'index correct
        const actualIndex = (currentIndex - 1 + platCircles.length) % platCircles.length;
        updateDescription(actualIndex);

        // Gestion du défilement infini
        setTimeout(() => {
            if (currentIndex === platCircles.length + 1) {
                carousel.style.transition = 'none';
                currentIndex = 1;
                carousel.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            }
            if (currentIndex === 0) {
                carousel.style.transition = 'none';
                currentIndex = platCircles.length;
                carousel.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            }
            isTransitioning = false;
        }, 500);
    }

    // Auto-défilement
    let autoSlide = setInterval(() => slideCarousel(1), 5000);

    // Arrête l'auto-défilement au survol
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    
    // Reprend l'auto-défilement quand la souris quitte le carousel
    carousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => slideCarousel(1), 5000);
    });

    // Initialisation
    updateDescription(0);

    // Modal Réservation
    const modal = document.getElementById('modalReservation');
    const reservationLink = document.querySelector('a[href="#reservation"]');
    const closeBtn = document.querySelector('.close-modal');
    const reservationForm = document.getElementById('reservationForm');

    // Ouvrir la modal
    reservationLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêche le défilement de la page
    });

    // Fermer la modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Réactive le défilement
    });

    // Fermer la modal en cliquant en dehors
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Gestion du formulaire
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Ici vous pouvez ajouter le code pour traiter la réservation
        // Par exemple, envoyer les données à un serveur
        
        alert('Votre demande de réservation a été envoyée !');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        reservationForm.reset();
    });

    // Empêcher la fermeture de la modal quand on clique sur son contenu
    document.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}); 

document.addEventListener('DOMContentLoaded', () => {
    // Gestion du zoom de l'image fiche sur mobile
    const menuFiche = document.querySelector('.menufiche img');
    const modalFiche = document.querySelector('.modal-fiche');
    const modalImg = document.querySelector('.modal-fiche-content');
    const closeFiche = document.querySelector('.close-fiche');

    menuFiche.addEventListener('click', () => {
        modalFiche.style.display = 'flex';
        modalImg.src = menuFiche.src;
        document.body.style.overflow = 'hidden';
    });

    closeFiche.addEventListener('click', () => {
        modalFiche.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modalFiche.addEventListener('click', (e) => {
        if (e.target === modalFiche) {
            modalFiche.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Gestion du burger menu
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});
