// =========================================================
// Slider de témoignages
// Fonctionne même s'il n'y a qu'un seul témoignage dans le HTML :
// pour en ajouter, dupliquez le bloc <div class="testimonial">...</div>
// à l'intérieur de .testimonial-slider et les points/flèches
// s'adapteront automatiquement.
// =========================================================
(function initPageLoader() {
  const loader = document.querySelector('#page-loader');
  const progress = loader && loader.querySelector('.loader-progress');
  const percent = loader && loader.querySelector('.loader-percent');

  if (!loader || !progress || !percent) return;

  let current = 0;
  let pageReady = document.readyState === 'complete';

  function update(value) {
    current = Math.min(value, 100);
    progress.style.width = `${current}%`;
    percent.textContent = `${Math.floor(current)}%`;
  }

  function finish() {
    pageReady = true;
  }

  window.addEventListener('load', finish, { once: true });

  const interval = setInterval(() => {
    const limit = pageReady ? 100 : 92;
    const target = Math.min(current + 2, limit);
    update(target);

    if (current === 100) {
      clearInterval(interval);
      setTimeout(() => loader.classList.add('is-hidden'), 220);
    }
  }, 65);
})();

// =========================================================
// Slider de témoignages
// Fonctionne même s'il n'y a qu'un seul témoignage dans le HTML :
// pour en ajouter, dupliquez le bloc <div class="testimonial">...</div>
// à l'intérieur de .testimonial-slider et les points/flèches
// s'adapteront automatiquement.
// =========================================================
(function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;

  const testimonials = Array.from(slider.querySelectorAll('.testimonial'));
  const dots = Array.from(slider.querySelectorAll('.slider-dots .dot'));
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');

  if (testimonials.length === 0) return;

  let current = 0;
  let rotationTimer;

  function show(index) {
    current = (index + testimonials.length) % testimonials.length;
    testimonials.forEach((t, i) => t.classList.toggle('is-active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function restartRotation() {
    clearInterval(rotationTimer);
    rotationTimer = setInterval(() => show(current + 1), 5000);
  }

  prevBtn && prevBtn.addEventListener('click', () => { show(current - 1); restartRotation(); });
  nextBtn && nextBtn.addEventListener('click', () => { show(current + 1); restartRotation(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); restartRotation(); }));

  // Si un seul témoignage : masquer les contrôles inutiles
  if (testimonials.length <= 1) {
    prevBtn && (prevBtn.style.display = 'none');
    nextBtn && (nextBtn.style.display = 'none');
    dots.forEach((d, i) => { if (i > 0) d.style.display = 'none'; });
  }

  show(0);
  if (testimonials.length > 1) restartRotation();
})();

// =========================================================
// Formulaire de contact (démo front-end uniquement)
// À brancher sur un vrai service d'envoi (backend, Formspree,
// EmailJS...) à la place du message simulé ci-dessous.
// =========================================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const note = contactForm.querySelector('.form-note');
    const originalNote = note ? note.textContent : '';

    if (note) {
      note.textContent = 'Demande envoyée — réponse sous 24 heures.';
    }

    contactForm.reset();

    // Remet le message d'origine après quelques secondes
    if (note) {
      setTimeout(() => { note.textContent = originalNote; }, 5000);
    }
  });
}

// =========================================================
// Lien "Défilez vers le bas pour explorer" : défilement fluide
// (déjà géré par le CSS scroll-behavior, ce script assure aussi
// la compatibilité sur les navigateurs qui l'ignorent)
// =========================================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId.length <= 1) return;

    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Modale des tarifs de création de contenu
(function initPricingModal() {
  const modal = document.querySelector('.pricing-modal');
  const openButton = document.querySelector('[data-pricing-open]');
  const closeButtons = document.querySelectorAll('[data-pricing-close]');

  if (!modal || !openButton) return;

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  openButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.pricing-close').focus();
  });

  closeButtons.forEach(button => button.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
})();

// Traduction FR/EN du contenu principal
(function initLanguageSwitcher() {
  const switcher = document.querySelector('[data-language-switch]');
  if (!switcher) return;

  const translations = {
    en: {
      '.nav-link:nth-child(1)': 'Biography',
      '.nav-link:nth-child(2)': 'Projects',
      '.nav-link:nth-child(3)': 'Expertise',
      '.nav-link:nth-child(4)': 'Training',
      '.nav-link:nth-child(5)': 'Neri-Data',
      '.nav-link:nth-child(6)': 'Contact',
      '.btn-header': 'START A PROJECT',
      '.status span:last-child': 'AVAILABLE: DATA SCIENTIST',
      '.hero-title': 'I turn data into <span class="accent-green">insights</span>, insights into <span class="accent-blue">decisions</span>, and AI into <span class="accent-blue">concrete solutions</span>.',
      '.hero-subtitle': 'Data Analyst and content creator, I design robust analytics architectures and web applications with Shiny and Streamlit to help your organization grow.',
      '.hero-cta .btn-primary': 'START A PROJECT',
      '.hero-cta .btn-secondary': 'VIEW MY PROJECTS',
      '.presentation .section-label': 'ABOUT & PHILOSOPHY',
      '.presentation .subheader-label': 'THE JOURNEY',
      '.presentation .section-title': 'At the intersection of <span class="accent-green">rigorous analysis</span> and <span class="accent-green">impact strategy</span>.',
      '.presentation-text': 'My role goes beyond simple data analysis. I work with decision-makers to design sustainable data-driven solutions that combine data, AI and technology to solve concrete business challenges.',
      '.skills .skill-title:nth-of-type(1)': 'Performance and optimization',
      '.mentorship .subheader-label': 'MENTORING & KNOWLEDGE SHARING',
      '.mentorship .section-title': 'Learn <span class="accent-green">apply</span> Build.',
      '.mentorship-text': 'I share my knowledge and experience in data, artificial intelligence and digital technology through content, training, practical projects and mentoring.',
      '.projects .section-label': 'SELECTED PROJECTS & RESULTS',
      '.projects .section-title': 'Concrete solutions designed to <span class="accent-green">convert</span>.',
      '.projects .section-subtitle': 'Discover how I help clients turn technical challenges into measurable business performance.',
      '.testimonials .section-label': 'TESTIMONIALS',
      '.expertise .section-label': 'MY EXPERTISE',
      '.expertise .section-title': 'From raw data to <span class="accent-green">clear decisions</span>.',
      '.expertise .section-subtitle': 'I support every step of your data journey, from collection to concrete solutions for your business.',
      '.expertise-sectors-intro': 'When data meets business, the connection becomes actionable.',
      '.neri-data-subtitle': 'A platform designed to turn data into concrete opportunities.',
      '.transmission .subheader-label': 'TECHNICAL KNOWLEDGE SHARING',
      '.transmission .section-title': 'Making complexity simple, <span class="accent-green">sharing to help others grow</span>.',
      '.transmission-text': 'Beyond data analysis, I share technical feedback and experience with the community through accessible content.',
      '.contact .subheader-label': 'LET’S WORK TOGETHER',
      '.contact .section-title': 'Let’s turn your <span class="accent-blue">ideas into concrete solutions</span>.',
      '.contact-text': 'Do you have a project, an idea or an analysis to develop? Let’s discuss your strategic roadmap.',
      '.copyright': '© 2027 - ALL RIGHTS RESERVED - HENOC YOBO'
    }
  };

  const textTranslations = {
    'DÉMARRER UN PROJET': 'START A PROJECT',
    'CONSULTER MES RÉALISATIONS': 'VIEW MY PROJECTS',
    'MAÎTRISE STATISTIQUE & IA': 'STATISTICS & AI MASTERY',
    'SCORE DE PERFORMANCE': 'PERFORMANCE SCORE',
    'PRÉSENTATION & PHILOSOPHIE': 'ABOUT & PHILOSOPHY',
    'LE CHEMINEMENT': 'THE JOURNEY',
    'ÉCOSYSTÈME DE TRAVAIL': 'WORK ECOSYSTEM',
    'Technologies clés': 'Key technologies',
    'STATISTIQUE': 'STATISTICS',
    'MACHINE LEARNING': 'MACHINE LEARNING',
    'VISUALISATION': 'VISUALIZATION',
    'ANALYSE DE DONNÉES': 'DATA ANALYSIS',
    'Performance et optimisation': 'Performance and optimization',
    'solution orientées métier': 'Business-oriented solutions',
    'Autonomie & Clarté': 'Autonomy & clarity',
    'Performance & efficacité': 'Performance & efficiency',
    'Data System & logique': 'Data systems & logic',
    'Rigueur & Transparence': 'Rigor & transparency',
    'Chaque modèle et solutions optimisés se traduit par une fiabilité, une éfficacité ainsi qu’une amélioration des prédictions et des décisions. L’optimisation technique est au cœur de ma démarche et chaque outils apporte une experiences fluide et une reelle valeur metier': 'Every optimized model and solution improves reliability, efficiency, predictions and decision-making. Technical optimization is at the heart of my approach, with every tool delivering a smooth experience and real business value.',
    'La technologie doit repondre à un besoin concret. je pars du probleme pour concvoir des solutions simples intuitives et adapter au metier': 'Technology must answer a concrete need. I start with the problem to design simple, intuitive solutions adapted to the business.',
    'Rapports réguliers, intégration continue, code auto-documenté et tests automatisés. une approche structurer et transparente de la conception a la livraison. Un processus fluide du premier contact jusqu’à la mise en production.': 'Regular reports, continuous integration, self-documented code and automated tests. A structured and transparent approach from design to delivery, from first contact to production.',
    'MENTORAT & TRANSMISSION': 'MENTORING & KNOWLEDGE SHARING',
    'DÉCOUVRIR MES FORMATIONS': 'DISCOVER MY TRAINING',
    'PROJETS SÉLECTIONNÉS & RÉSULTATS': 'SELECTED PROJECTS & RESULTS',
    'Des solutions concrètes conçues pour': 'Concrete solutions designed to',
    'convertir': 'convert',
    'Découvrez comment j’aide mes clients à transformer des défis techniques en performances commerciales mesurables.': 'Discover how I help clients turn technical challenges into measurable business performance.',
    'DÉFILEZ VERS LE BAS POUR EXPLORER': 'SCROLL DOWN TO EXPLORE',
    'IMPACT SOCIAL': 'SOCIAL IMPACT',
    'PRÉCISION': 'ACCURACY',
    'Solution digitale de prévention du suicide en Afrique francophone, utilisant l’IA pour offrir un soutien psychologique accessible et anonyme.': 'A digital suicide-prevention solution for French-speaking Africa, using AI to provide accessible and anonymous psychological support.',
    'Étude statistique sur les indicateurs économiques en Côte d’Ivoire, avec visualisations interactives pour les décideurs.': 'A statistical study of economic indicators in Côte d’Ivoire, with interactive visualizations for decision-makers.',
    'TÉMOIGNAGES': 'TESTIMONIALS',
    'MON EXPERTISE': 'MY EXPERTISE',
    'Data Analytics': 'Data Analytics',
    'Statistique & Data Science': 'Statistics & Data Science',
    'Application data': 'Data applications',
    'Visualisation & aide à la décision': 'Visualization & decision support',
    '05 / RESTITUER L’ESSENTIEL': '05 / DELIVER THE ESSENTIAL',
    "SECTEURS D'INTERVENTION": 'AREAS OF EXPERTISE',
    'Finance': 'Finance',
    'Assurance': 'Insurance',
    'Ressources humaines': 'Human resources',
    'Comptabilité': 'Accounting',
    'Éducation': 'Education',
    'Santé': 'Healthcare',
    'Analyser les indicateurs financiers pour mieux piloter les performances et anticiper les évolutions.': 'Analyze financial indicators to manage performance and anticipate changes.',
    'Exploiter les données pour évaluer les risques et améliorer la qualité des décisions.': 'Use data to assess risk and improve decision quality.',
    'Mettre les données au service du recrutement, du suivi des équipes et de la fidélisation.': 'Use data to improve recruitment, team monitoring and retention.',
    'Automatiser et fiabiliser le suivi des chiffres pour gagner en clarté et en efficacité.': 'Automate and secure financial tracking for greater clarity and efficiency.',
    'Transformer les données pédagogiques en leviers de progression pour les apprenants.': 'Turn educational data into progress levers for learners.',
    'Structurer et visualiser l’information pour soutenir des décisions plus rapides et pertinentes.': 'Structure and visualize information to support faster, more relevant decisions.',
    'UNE EXPERTISE DEVENUE INNOVATION': 'EXPERTISE TURNED INTO INNOVATION',
    'Étudiants': 'Students',
    'Établissements': 'Institutions',
    'Entreprises': 'Companies',
    'Formations, ateliers et accompagnement pour apprendre la data, construire son portfolio et développer des compétences utiles.': 'Training, workshops and support to learn data, build a portfolio and develop useful skills.',
    'Conférences, workshops et accompagnements pédagogiques pour intégrer la data et l’IA dans les parcours de formation.': 'Conferences, workshops and educational support to integrate data and AI into training programs.',
    'Formations IA, conseils, dashboards et solutions data pour mieux comprendre les données et accélérer les décisions.': 'AI training, consulting, dashboards and data solutions to understand data and accelerate decisions.',
    'Découvrez la plateforme': 'Discover the platform',
    'DÉCOUVRIR NERI DATA': 'DISCOVER NERI DATA',
    'TRANSMISSION TECHNIQUE': 'TECHNICAL KNOWLEDGE SHARING',
    'ABONNÉS CUMULÉS': 'TOTAL FOLLOWERS',
    'VUES TOTALES DE CONTENUS': 'TOTAL CONTENT VIEWS',
    'Les femmes jouent un rôle crucial pour l’évolution technologique.': 'Women play a crucial role in technological progress.',
    'Optimisation et automatisation des tâches avec l’IA.': 'Task optimization and automation with AI.',
    'La data science appliquée aux développeurs.': 'Data science applied to developers.',
    'Le data scientist talentueux a besoin d’un réseau.': 'A talented data scientist needs a network.',
    'Les femmes et la tech': 'Women and technology',
    'L’intelligence artificielle': 'Artificial intelligence',
    'Astuces Data pour développeurs': 'Data tips for developers',
    'L’importance d’une communauté': 'The importance of community',
    'VOIR MES TARIFS CRÉATEUR': 'VIEW CREATOR PRICING',
    'DÉCOUVRIR MES FORMATIONS': 'DISCOVER MY TRAINING',
    'RÉSEAUX SOCIAUX & COMMUNAUTÉ': 'SOCIAL MEDIA & COMMUNITY',
    'COLLABORONS ENSEMBLE': 'LET’S WORK TOGETHER',
    'EMAIL PROFESSIONNEL': 'PROFESSIONAL EMAIL',
    'WHATSAPP PRIORITAIRE': 'PRIORITY WHATSAPP',
    'NUMÉRO DE TÉLÉPHONE': 'PHONE NUMBER',
    'VOTRE NOM OU ENTREPRISE': 'YOUR NAME OR COMPANY',
    'EMAIL DE CONTACT': 'CONTACT EMAIL',
    'OBJECTIF PRINCIPAL': 'MAIN OBJECTIVE',
    'Sélectionnez un objectif': 'Select an objective',
    'DESCRIPTION DU PROJET & IMPACT ATTENDU': 'PROJECT DESCRIPTION & EXPECTED IMPACT',
    'ENVOYER LA DEMANDE D’AUDIT': 'SEND AUDIT REQUEST',
    'ESPACE ADMIN': 'ADMIN AREA',
    'Modifier le portfolio': 'Edit the portfolio',
    'Modifier les contenus': 'Edit content',
    'MOT DE PASSE': 'PASSWORD',
    'SE CONNECTER': 'LOG IN',
    'COPYRIGHT': 'COPYRIGHT',
    'MESSAGE DU FORMULAIRE': 'FORM MESSAGE',
    'SOUS-TITRE D’ACCUEIL': 'HERO SUBTITLE',
    'TEXTE CONTACT': 'CONTACT TEXT',
    'ENREGISTRER': 'SAVE',
    'SE DÉCONNECTER': 'LOG OUT',
    'ADMIN': 'ADMIN',
    'Tarifs Création de Contenu': 'Content Creation Pricing',
    'PONCTUEL': 'ONE-OFF',
    'MENSUEL': 'MONTHLY',
    'PARTENARIAT LONG TERME': 'LONG-TERM PARTNERSHIP',
    'POPULAIRE': 'POPULAR',
    '/ vidéo': '/ video',
    '/ mois': '/ month',
    'DISCUTONS DE VOTRE PROJET': 'LET’S DISCUSS YOUR PROJECT',
    'Chaque jour sans visibilité tech, c’est une opportunité manquée.': 'Every day without tech visibility is a missed opportunity.'
    ,
    'Une collaboration unique, idéale pour tester l’impact de votre message.': 'A one-off collaboration, ideal for testing the impact of your message.',
    'Une présence régulière avec trois vidéos mensuelles et un suivi stratégique.': 'A regular presence with three monthly videos and strategic follow-up.',
    'Un partenariat premium pour installer votre marque dans la durée.': 'A premium partnership to establish your brand over time.',
    '1 vidéo dédiée': '1 dedicated video',
    'Script co-créé': 'Co-created script',
    'Publication TikTok + réseaux': 'TikTok + social media publication',
    'Statistiques de performance': 'Performance statistics',
    '3 vidéos / mois': '3 videos / month',
    'Planification éditoriale': 'Editorial planning',
    'Mention en story & post': 'Story & post mention',
    'Rapport d’engagement mensuel': 'Monthly engagement report',
    'Priorité de planning': 'Priority scheduling',
    '4 vidéos / mois': '4 videos / month',
    'Stratégie de contenu dédiée': 'Dedicated content strategy',
    'Intégration dans mes formations': 'Integration into my training',
    'Accès à ma communauté privée': 'Access to my private community',
    'Lien permanent en bio': 'Permanent link in bio',
    'Appel stratégique mensuel': 'Monthly strategy call',
    'Analyse et exploration de données': 'Data analysis and exploration',
    'Création de tableaux de bord interactifs': 'Interactive dashboard creation',
    'Développement d’une application web': 'Web application development',
    'Développement d’une application Shiny ou Streamlit': 'Shiny or Streamlit application development',
    'Intégration de l’intelligence artificielle': 'Artificial intelligence integration',
    'Machine Learning et modélisation prédictive': 'Machine learning and predictive modeling',
    'Automatisation et optimisation des processus': 'Process automation and optimization',
    'Conseil et accompagnement Data': 'Data consulting and support',
    'Autre projet': 'Other project'
  };

  const french = new Map();
  const originalText = new WeakMap();
  const normalizeText = value => value.replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
  const normalizedTranslations = Object.fromEntries(
    Object.entries(textTranslations).map(([key, value]) => [normalizeText(key), value])
  );
  Object.keys(translations.en).forEach(selector => {
    document.querySelectorAll(selector).forEach(element => french.set(element, element.innerHTML));
  });

  function setLanguage(language) {
    Object.entries(translations.en).forEach(([selector, english]) => {
      document.querySelectorAll(selector).forEach(element => {
        element.innerHTML = language === 'en' ? english : french.get(element);
      });
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const original = originalText.get(node);
      const key = normalizeText(original);
      if (!key) continue;
      const translated = normalizedTranslations[key];
      if (language === 'en' && translated) {
        const leading = original.match(/^\s*/)[0];
        const trailing = original.match(/\s*$/)[0];
        node.nodeValue = `${leading}${translated}${trailing}`;
      }
      if (language === 'fr') node.nodeValue = original;
    }
    document.documentElement.lang = language;
    document.querySelectorAll('[data-language]').forEach(option => option.classList.toggle('is-active', option.dataset.language === language));
    localStorage.setItem('portfolioLanguage', language);
  }

  switcher.addEventListener('click', event => {
    const option = event.target.closest('[data-language]');
    if (option) setLanguage(option.dataset.language);
  });

  setLanguage(localStorage.getItem('portfolioLanguage') || 'fr');
})();

// Administration locale du copyright et du message de formulaire
(function initLocalAdmin() {
  const modal = document.querySelector('#admin-modal');
  const openButton = document.querySelector('[data-admin-open]');
  if (!modal || !openButton) return;

  const login = modal.querySelector('[data-admin-login]');
  const editor = modal.querySelector('[data-admin-editor]');
  const password = modal.querySelector('#admin-password');
  const error = modal.querySelector('[data-admin-error]');
  const storageKey = 'portfolioAdminContent';
  const siteContentKey = 'portfolioSiteContent';
  const projectsKey = 'portfolioProjects';
  const adminPassword = 'admin123';
  const projectGrid = document.querySelector('.projects-grid');
  const projectManager = modal.querySelector('[data-project-manager]');
  const projectList = modal.querySelector('[data-project-list]');

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  function readProjects() {
    const htmlProjects = Array.from(projectGrid.querySelectorAll('.project-card')).map(card => ({
      title: card.querySelector('.project-title')?.textContent.trim() || 'Projet',
      description: card.querySelector('.project-description')?.textContent.trim() || '',
      image: card.querySelector('.project-image')?.getAttribute('src') || '',
      link: card.querySelector('.project-title a')?.getAttribute('href') || card.querySelector('.project-link')?.getAttribute('href') || card.dataset.projectLink || '',
      tag: card.querySelector('.project-tags span')?.textContent.trim() || 'PROJET',
      metricValue: card.querySelector('.metric-value')?.textContent.trim() || '',
      metricLabel: card.querySelector('.metric-label')?.textContent.trim() || ''
    }));

    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(projectsKey) || 'null');
    } catch (error) {
      localStorage.removeItem(projectsKey);
    }

    if (!Array.isArray(saved)) return htmlProjects;

    const repaired = saved.map((project, index) => ({
      ...project,
      link: String(project.link || '').trim() || htmlProjects[index]?.link || ''
    }));
    localStorage.setItem(projectsKey, JSON.stringify(repaired));
    return repaired;
  }

  let projects = readProjects();

  function renderProjects() {
    projectGrid.innerHTML = projects.map((project, index) => `
      <article class="project-card" data-project-link="${escapeHtml(project.link)}" ${project.link ? `role="link" tabindex="0" aria-label="Ouvrir le projet ${escapeHtml(project.title)}"` : ""}>
        <div class="project-image-container">
          ${project.link
            ? `<a href="${escapeHtml(project.link)}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir le projet ${escapeHtml(project.title)}"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="project-image"></a>`
            : `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="project-image">`}
          <div class="project-tags"><span>${escapeHtml(project.tag)}</span></div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.link
            ? `<a href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.title)} <i class="fas fa-external-link-alt"></i></a>`
            : `${escapeHtml(project.title)} <i class="fas fa-external-link-alt"></i>`}</h3>
          <p class="project-description">${escapeHtml(project.description)}</p>
          <div class="project-metric"><span class="metric-value">${escapeHtml(project.metricValue)}</span><span class="metric-label">${escapeHtml(project.metricLabel)}</span></div>
        </div>
      </article>`).join('');
      window.dispatchEvent(new Event('resize'));
      if (document.documentElement.lang === 'en') document.querySelector('[data-language="en"]').click();
  }

  function renderProjectManager() {
    projectList.innerHTML = projects.map((project, index) => `
      <div class="admin-project-row" data-project-row="${index}">
        <strong>Projet ${index + 1}</strong>
        <input class="admin-input" data-project-field="title" value="${escapeHtml(project.title)}" placeholder="Titre">
        <textarea class="admin-input" data-project-field="description" rows="2" placeholder="Description">${escapeHtml(project.description)}</textarea>
        <input class="admin-input" data-project-field="image" value="${escapeHtml(project.image)}" placeholder="Chemin ou URL de l'image">
        <input class="admin-file" type="file" accept="image/*" data-project-file>
        <input class="admin-input" data-project-field="link" value="${escapeHtml(project.link)}" placeholder="Lien de l'application (https://...)" type="url">
        <div class="admin-project-inline"><input class="admin-input" data-project-field="tag" value="${escapeHtml(project.tag)}" placeholder="Tag"><input class="admin-input" data-project-field="metricValue" value="${escapeHtml(project.metricValue)}" placeholder="Valeur"></div>
        <input class="admin-input" data-project-field="metricLabel" value="${escapeHtml(project.metricLabel)}" placeholder="Libellé de la valeur">
        <button class="btn btn-danger" type="button" data-project-remove>SUPPRIMER</button>
      </div>`).join('');

    projectList.querySelectorAll('[data-project-file]').forEach(input => input.addEventListener('change', event => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        event.target.closest('[data-project-row]').querySelector('[data-project-field="image"]').value = reader.result;
      });
      reader.readAsDataURL(file);
    }));
    projectList.querySelectorAll('[data-project-remove]').forEach(button => button.addEventListener('click', () => {
      projects.splice(Number(button.closest('[data-project-row]').dataset.projectRow), 1);
      renderProjectManager();
    }));
  }

  function collectProjects() {
    projects = Array.from(projectList.querySelectorAll('[data-project-row]')).map(row => {
      const project = {};
      row.querySelectorAll('[data-project-field]').forEach(field => { project[field.dataset.projectField] = field.value; });
      return project;
    });
    localStorage.setItem(projectsKey, JSON.stringify(projects));
    renderProjects();
  }

  renderProjects();

  projectGrid.addEventListener('click', event => {
    if (projectGrid.classList.contains('is-dragging') || event.target.closest('a')) return;
    const card = event.target.closest('.project-card');
    const link = card?.dataset.projectLink;
    if (link) window.open(link, '_blank', 'noopener,noreferrer');
  });

  projectGrid.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('.project-card');
    const link = card?.dataset.projectLink;
    if (!link) return;
    event.preventDefault();
    window.open(link, '_blank', 'noopener,noreferrer');
  });

  function editableElements() {
    const candidates = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, a, button, label, span, li, option'))
      .filter(element => !element.closest('.admin-modal, .page-loader'))
      .filter(element => !element.matches('.language-option, .logo-mark, .status-dot, .tag, .project-tags span'));

    return candidates.filter(element => !candidates.some(parent => parent !== element && parent.contains(element)));
  }

  function restoreSiteContent() {
    const saved = JSON.parse(localStorage.getItem(siteContentKey) || '{}');
    editableElements().forEach((element, index) => {
      element.dataset.siteEditId = String(index);
      if (saved[index] !== undefined) element.innerHTML = saved[index];
    });
  }

  function setEditing(enabled) {
    editableElements().forEach(element => {
      element.contentEditable = enabled ? 'true' : 'false';
      element.classList.toggle('is-admin-editable', enabled);
    });
    modal.querySelector('[data-admin-edit]').textContent = enabled ? 'DÉSACTIVER LE MODE ÉDITION' : 'ACTIVER LE MODE ÉDITION';
    modal.querySelector('[data-admin-status]').textContent = enabled ? 'Modifie directement les textes encadrés, puis clique sur Enregistrer.' : 'Le mode édition est désactivé.';
  }

  function saveSiteContent() {
    const saved = {};
    editableElements().forEach((element, index) => { saved[index] = element.innerHTML; });
    localStorage.setItem(siteContentKey, JSON.stringify(saved));
  }

  restoreSiteContent();

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function loadContent() {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    ['copyright', 'contactNote', 'heroSubtitle', 'contactText'].forEach(field => {
      const source = document.querySelector(`[data-admin-field="${field}"]`);
      modal.querySelector(`[data-admin-input="${field}"]`).value = saved[field] || source.textContent.trim();
    });
  }

  function applyContent(content) {
    Object.entries(content).forEach(([field, value]) => {
      const target = document.querySelector(`[data-admin-field="${field}"]`);
      if (target) target.textContent = value;
    });
  }

  const savedContent = JSON.parse(localStorage.getItem(storageKey) || '{}');
  if (Object.keys(savedContent).length > 0) applyContent(savedContent);

  openButton.addEventListener('click', () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    login.hidden = false;
    editor.hidden = true;
    password.value = '';
    password.focus();
  });
  modal.querySelectorAll('[data-admin-close]').forEach(button => button.addEventListener('click', close));
  modal.querySelector('[data-admin-login-submit]').addEventListener('click', () => {
    if (password.value !== adminPassword) {
      error.textContent = 'Mot de passe incorrect.';
      return;
    }
    error.textContent = '';
    login.hidden = true;
    editor.hidden = false;
    projectManager.hidden = false;
    loadContent();
    renderProjectManager();
  });
  modal.querySelector('[data-admin-save]').addEventListener('click', () => {
    const saved = {};
    modal.querySelectorAll('[data-admin-input]').forEach(input => { saved[input.dataset.adminInput] = input.value; });
    localStorage.setItem(storageKey, JSON.stringify(saved));
    applyContent(saved);
    saveSiteContent();
    collectProjects();
    modal.querySelector('[data-admin-status]').textContent = 'Modifications enregistrées.';
  });
  modal.querySelector('[data-project-add]').addEventListener('click', () => {
    projects.push({ title: 'Nouveau projet', description: 'Décrivez ce projet.', image: '', link: '', tag: 'NOUVEAU PROJET', metricValue: '', metricLabel: '' });
    renderProjectManager();
  });
  modal.querySelector('[data-admin-edit]').addEventListener('click', () => {
    document.body.classList.add('admin-editing');
    setEditing(true);
    close();
  });
  modal.querySelector('[data-admin-logout]').addEventListener('click', () => {
    document.body.classList.remove('admin-editing');
    setEditing(false);
    projectManager.hidden = true;
    close();
  });
})();

(function initProjectsAutoScroll() {
  const track = document.querySelector('.projects-grid');
  if (!track) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const speed = 0.6; // pixels par frame
  const resumeDelay = 2500; // délai avant reprise de l'auto-scroll (ms)

  let isPaused = false;
  let isDragging = false;
  let startX = 0;
  let startScroll = 0;
  let resumeTimer;

  function pause() {
    isPaused = true;
    clearTimeout(resumeTimer);
  }

  function scheduleResume() {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { isPaused = false; }, resumeDelay);
  }

  function tick() {
    if (!isPaused && !isDragging && !prefersReducedMotion) {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll > 0) {
        track.scrollLeft += speed;
        if (track.scrollLeft >= maxScroll) track.scrollLeft = 0;
      }
    }
    requestAnimationFrame(tick);
  }

  // Glissement manuel à la souris
  track.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse') return; // le tactile garde le défilement natif
    isDragging = true;
    pause();
    track.classList.add('is-dragging');
    startX = event.pageX;
    startScroll = track.scrollLeft;
  });

  window.addEventListener('pointermove', event => {
    if (!isDragging) return;
    event.preventDefault();
    track.scrollLeft = startScroll - (event.pageX - startX);
  });

  window.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');
    scheduleResume();
  });

  // Molette / trackpad / tactile : comportement natif conservé, on met juste en pause puis on reprend
  track.addEventListener('wheel', () => { pause(); scheduleResume(); }, { passive: true });
  track.addEventListener('touchstart', () => pause(), { passive: true });
  track.addEventListener('touchend', scheduleResume);

  requestAnimationFrame(tick);
})();
