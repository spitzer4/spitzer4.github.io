(function() {
	"use strict";
	
	document.addEventListener('DOMContentLoaded', () => {
	  // Get the project ID from URL parameter
	  const urlParams = new URLSearchParams(window.location.search);
	  const projectId = urlParams.get('id');
	  
	  if (!projectId) {
		// If no ID is provided, redirect to the portfolio page
		window.location.href = 'index.html#portfolio';
		return;
	  }
	  
	  // Load project data
	  loadProjectDetails(projectId);
	});
	
	// Sample projects data - in a real app this would come from a backend
	const projects = [
	  {
		id: 1,
		title: 'E-commerce Website',
		category: 'Web Design / Development',
		client: 'Fashion Boutique',
		date: 'January 2023',
		url: 'https://example.com/ecommerce',
		image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		description: `
		  <p>This project involved designing and developing a fully responsive e-commerce website for a fashion boutique. The client needed a modern, user-friendly platform to showcase their products and handle online transactions.</p>
		  
		  <p>Key features implemented:</p>
		  <ul>
			<li>Responsive design that works seamlessly on all devices</li>
			<li>Product filtering and search functionality</li>
			<li>Secure payment gateway integration</li>
			<li>Customer account management and order tracking</li>
			<li>Admin dashboard for inventory management</li>
		  </ul>
		  
		  <p>The site was built using HTML5, CSS3, JavaScript, and PHP with MySQL database. Special attention was given to the user experience, ensuring fast load times and intuitive navigation.</p>
		`
	  },
	  {
		id: 2,
		title: 'Fitness Tracker App',
		category: 'Mobile App / UI Design',
		client: 'FitLife Gym',
		date: 'March 2023',
		url: 'https://example.com/fitnesstracker',
		image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		description: `
		  <p>Designed and developed a mobile fitness tracking application for a health and wellness company. The app helps users track their workouts, set fitness goals, and monitor their progress over time.</p>
		  
		  <p>Key features implemented:</p>
		  <ul>
			<li>Personalized workout plans based on user goals</li>
			<li>Real-time workout tracking with GPS integration</li>
			<li>Nutrition and calorie tracking capabilities</li>
			<li>Progress visualization with charts and graphs</li>
			<li>Social sharing and community challenges</li>
		  </ul>
		  
		  <p>The app was built using React Native for cross-platform compatibility, with Node.js backend and MongoDB for data storage. User experience was a primary focus, with intuitive navigation and vibrant, motivating visuals.</p>
		`
	  },
	  {
		id: 3,
		title: 'Brand Identity',
		category: 'Branding / Logo Design',
		client: 'Green Earth Organics',
		date: 'May 2023',
		url: 'https://example.com/greenearthbranding',
		image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		description: `
		  <p>Created a comprehensive brand identity for an organic food company. The project involved developing a cohesive visual language that communicates the brand's commitment to sustainability and natural products.</p>
		  
		  <p>Deliverables included:</p>
		  <ul>
			<li>Logo design with multiple variations for different contexts</li>
			<li>Brand color palette and typography guidelines</li>
			<li>Packaging design for product line</li>
			<li>Marketing collateral (business cards, brochures, social media templates)</li>
			<li>Brand style guide documentation</li>
		  </ul>
		  
		  <p>The design process involved extensive research into the organic food market and consumer preferences. The final brand identity successfully positioned the company as a premium, eco-conscious choice in a competitive market.</p>
		`
	  },
	  {
		id: 4,
		title: 'Portfolio Website',
		category: 'Web Design / Frontend',
		client: 'Photography Studio',
		date: 'July 2023',
		url: 'https://example.com/photographyportfolio',
		image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		description: `
		  <p>Designed and developed a portfolio website for a professional photographer. The primary goal was to create a visually stunning showcase that highlights the photographer's work while maintaining fast loading times and ease of navigation.</p>
		  
		  <p>Key features implemented:</p>
		  <ul>
			<li>Image-focused, minimalist design</li>
			<li>Gallery with filtering by photography category</li>
			<li>Image lazy loading for optimal performance</li>
			<li>Contact form with email integration</li>
			<li>Blog section for photography tips and insights</li>
		  </ul>
		  
		  <p>The site was built using modern frontend technologies including HTML5, CSS3, and JavaScript with performance optimizations for image-heavy content. The result is a fast-loading, visually impressive portfolio that effectively showcases the client's photography work.</p>
		`
	  },
	  {
		id: 5,
		title: 'Dashboard UI',
		category: 'UI/UX Design',
		client: 'Data Analytics Company',
		date: 'September 2023',
		url: 'https://example.com/analyticsdashboard',
		image: 'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		description: `
		  <p>Designed a comprehensive dashboard UI for a data analytics platform. The challenge was to present complex data in an accessible, intuitive interface that allows users to gain insights quickly.</p>
		  
		  <p>The design process included:</p>
		  <ul>
			<li>User research and persona development</li>
			<li>Information architecture planning</li>
			<li>Wireframing and prototyping</li>
			<li>Interactive mockups with data visualization components</li>
			<li>Usability testing and iteration</li>
		  </ul>
		  
		  <p>The final design features a clean, modern aesthetic with a focus on data clarity and visual hierarchy. Custom data visualization components were created to display complex metrics in an easily digestible format. The UI supports both light and dark modes and is fully responsive for use across devices.</p>
		`
	  },
	  {
		id: 6,
		title: 'Mobile Game UI',
		category: 'Mobile / Game Design',
		client: 'Gaming Studio',
		date: 'November 2023',
		url: 'https://example.com/mobilegame',
		image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		description: `
		  <p>Created the user interface design for a mobile puzzle game. The project required a visually appealing, intuitive UI that enhances gameplay while maintaining performance on a variety of mobile devices.</p>
		  
		  <p>Design elements delivered:</p>
		  <ul>
			<li>Game menu screens and navigation flows</li>
			<li>In-game UI components and HUD design</li>
			<li>Character selection and customization interfaces</li>
			<li>Achievement and reward screens</li>
			<li>Game store and monetization UI</li>
		  </ul>
		  
		  <p>The design process involved close collaboration with game developers to ensure all UI elements could be implemented efficiently. The final design features a vibrant, playful aesthetic with intuitive interactions and clear feedback systems for players. Animations and transitions were carefully planned to add polish without impacting game performance.</p>
		`
	  }
	];
	
	function loadProjectDetails(projectId) {
	  // Find the project by ID
	  const project = projects.find(p => p.id === parseInt(projectId));
	  
	  if (!project) {
		window.location.href = 'index.html#portfolio';
		return;
	  }
	  
	  // Update page title
	  document.title = `${project.title} - EasyPortfolio`;
	  
	  // Update project details in the DOM
	  document.getElementById('project-title').textContent = project.title;
	  document.getElementById('project-heading').textContent = project.title;
	  document.getElementById('project-image').src = project.image;
	  document.getElementById('project-image').alt = project.title;
	  document.getElementById('project-category').textContent = project.category;
	  document.getElementById('project-client').textContent = project.client;
	  document.getElementById('project-date').textContent = project.date;
	  document.getElementById('project-url').href = project.url;
	  document.getElementById('project-url').textContent = project.url;
	  document.getElementById('project-description').innerHTML = project.description;
	}
	
  })();