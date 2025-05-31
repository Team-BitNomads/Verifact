document.addEventListener('DOMContentLoaded', () => {
  // --- Global Elements ---
  const sidebar = document.getElementById('sidebar')
  const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle')
  const mobileSidebarOverlay = document.getElementById('mobile-sidebar-overlay')

  const userMenuButton = document.getElementById('user-menu-button')
  const userMenuDropdown = document.getElementById('user-menu-dropdown')

  const desktopSidebarToggleButton = document.getElementById(
    'sidebar-toggle-desktop'
  )
  const sidebarCollapseIcon = document.getElementById('sidebar-collapse-icon')
  const sidebarExpandIcon = document.getElementById('sidebar-expand-icon')
  const sidebarTextElements = document.querySelectorAll('.sidebar-text')
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item')
  const sidebarUserProfileArea = document.getElementById(
    'sidebar-user-profile-area'
  )
  const sidebarUserIcon = document.querySelector('.sidebar-user-icon') // Assuming one
  const sidebarUserStatusIndicator = document.querySelector(
    '.sidebar-user-status-indicator'
  )

  let isSidebarCollapsed = false // For desktop
  let isMobileSidebarOpen = false
  let isUserMenuOpen = false

  // --- Header: Mobile Sidebar Toggle ---
  if (mobileSidebarToggle) {
    mobileSidebarToggle.addEventListener('click', () => {
      isMobileSidebarOpen = !isMobileSidebarOpen
      sidebar.classList.toggle('-translate-x-full')
      sidebar.classList.toggle('translate-x-0')
      mobileSidebarOverlay.classList.toggle('hidden')
      mobileSidebarToggle.setAttribute('aria-expanded', isMobileSidebarOpen)
      if (isMobileSidebarOpen) {
        mobileSidebarToggle.querySelector('span.sr-only').textContent =
          'Close sidebar'
      } else {
        mobileSidebarToggle.querySelector('span.sr-only').textContent =
          'Open sidebar'
      }
    })
  }
  if (mobileSidebarOverlay) {
    mobileSidebarOverlay.addEventListener('click', () => {
      if (isMobileSidebarOpen) mobileSidebarToggle.click()
    })
  }
  // Close mobile sidebar on nav item click
  document
    .querySelectorAll(
      '#sidebar .sidebar-nav-item, #sidebar-user-profile-area a'
    )
    .forEach(link => {
      link.addEventListener('click', () => {
        if (isMobileSidebarOpen && window.innerWidth < 1024) {
          // lg breakpoint
          mobileSidebarToggle.click()
        }
      })
    })

  // --- Header: User Menu Toggle ---
  if (userMenuButton && userMenuDropdown) {
    userMenuButton.addEventListener('click', event => {
      event.stopPropagation()
      isUserMenuOpen = !isUserMenuOpen
      userMenuDropdown.classList.toggle('hidden', !isUserMenuOpen)
      userMenuButton.setAttribute('aria-expanded', isUserMenuOpen)
    })

    document.addEventListener('click', event => {
      if (
        isUserMenuOpen &&
        !userMenuDropdown.contains(event.target) &&
        !userMenuButton.contains(event.target)
      ) {
        isUserMenuOpen = false
        userMenuDropdown.classList.add('hidden')
        userMenuButton.setAttribute('aria-expanded', false)
      }
    })
    userMenuDropdown.querySelectorAll('.user-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        isUserMenuOpen = false
        userMenuDropdown.classList.add('hidden')
        userMenuButton.setAttribute('aria-expanded', false)
      })
    })
  }

  // --- Sidebar: Desktop Collapse/Expand ---
  const toggleDesktopSidebar = () => {
    isSidebarCollapsed = !isSidebarCollapsed
    sidebar.classList.toggle('w-64', !isSidebarCollapsed)
    sidebar.classList.toggle('w-20', isSidebarCollapsed)

    sidebarCollapseIcon.classList.toggle('hidden', isSidebarCollapsed)
    sidebarExpandIcon.classList.toggle('hidden', !isSidebarCollapsed)
    desktopSidebarToggleButton.setAttribute(
      'aria-expanded',
      !isSidebarCollapsed
    )
    desktopSidebarToggleButton.title = isSidebarCollapsed
      ? 'Expand sidebar'
      : 'Collapse sidebar'
    desktopSidebarToggleButton.querySelector('span.sr-only').textContent =
      isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'

    sidebarTextElements.forEach(el => {
      el.classList.toggle('opacity-0', isSidebarCollapsed)
      el.classList.toggle('h-0', isSidebarCollapsed)
      el.classList.toggle('overflow-hidden', isSidebarCollapsed)
      el.classList.toggle('opacity-100', !isSidebarCollapsed)
      el.classList.toggle('h-auto', !isSidebarCollapsed)
      if (el.tagName === 'H3') {
        el.setAttribute('aria-hidden', isSidebarCollapsed)
      }
    })

    sidebarNavItems.forEach(item => {
      item.classList.toggle('px-3', isSidebarCollapsed)
      item.classList.toggle('justify-center', isSidebarCollapsed)
      item.classList.toggle('px-4', !isSidebarCollapsed)
      const icon = item.querySelector('svg')
      if (icon) {
        icon.classList.toggle('mr-3', !isSidebarCollapsed)
      }
      // Update title for collapsed items
      const textSpan = item.querySelector('.sidebar-text')
      if (isSidebarCollapsed && textSpan) {
        item.title = textSpan.textContent.trim()
      } else {
        item.removeAttribute('title')
      }
    })

    sidebarUserProfileArea.classList.toggle('h-[70px]', isSidebarCollapsed)
    sidebarUserProfileArea.classList.toggle('flex', isSidebarCollapsed)
    sidebarUserProfileArea.classList.toggle('items-center', isSidebarCollapsed)
    sidebarUserProfileArea.classList.toggle(
      'justify-center',
      isSidebarCollapsed
    )
    sidebarUserProfileArea.classList.toggle('h-auto', !isSidebarCollapsed)

    const userProfileLink = sidebarUserProfileArea.querySelector('a')
    if (userProfileLink) {
      userProfileLink.classList.toggle('p-2', isSidebarCollapsed)
      userProfileLink.classList.toggle('rounded-lg', isSidebarCollapsed)
      userProfileLink.classList.toggle(
        'hover:bg-emerald-100',
        isSidebarCollapsed
      )
    }

    if (sidebarUserIcon) {
      sidebarUserIcon.classList.toggle('h-7', isSidebarCollapsed)
      sidebarUserIcon.classList.toggle('w-7', isSidebarCollapsed)
      sidebarUserIcon.classList.toggle('text-slate-500', isSidebarCollapsed)
      sidebarUserIcon.classList.toggle(
        'hover:text-emerald-600',
        isSidebarCollapsed
      )

      sidebarUserIcon.classList.toggle('h-10', !isSidebarCollapsed)
      sidebarUserIcon.classList.toggle('w-10', !isSidebarCollapsed)
      sidebarUserIcon.classList.toggle('text-slate-400', !isSidebarCollapsed)
    }
    if (sidebarUserStatusIndicator) {
      sidebarUserStatusIndicator.classList.toggle('hidden', isSidebarCollapsed)
    }
  }

  if (desktopSidebarToggleButton) {
    desktopSidebarToggleButton.addEventListener('click', toggleDesktopSidebar)
  }

  // --- AppContent (Chat) Logic ---
	const appContentWrapper = document.getElementById('app-content-wrapper')
	const chatContainer = document.getElementById('chat-container')
	const welcomeScreen = document.getElementById('welcome-screen')
	const loadingIndicator = document.getElementById('loading-indicator')
	
	const chatForm = document.getElementById('chat-form')
	const chatInputTextarea = document.getElementById('chat-input-textarea')
	const sendButton = document.getElementById('send-button')
	
	const uploadImageButton = document.getElementById('upload-image-button')
	const fileInput = document.getElementById('file-input')
	const imagePreviewContainer = document.getElementById('image-preview-container')
	const imagePreviewImg = document.getElementById('image-preview-img')
	const imagePreviewName = document.getElementById('image-preview-name')
	const removeImageButton = document.getElementById('remove-image-button')
	const suggestionButtons = document.querySelectorAll('.suggestion-button')
	
	let messages = []
	let hasStartedChat = false
	let selectedImageFile = null
	let isLoading = false
	
	// Updated status mapping to match API verdicts
	const getStatusStyles = status => {
	  // Normalize status from API (e.g., "False" → "debunked")
	  const normalizedStatus = (() => {
	    if (typeof status === 'string') {
	      status = status.toLowerCase()
	      if (status === 'false') return 'debunked'
	      if (status === 'true') return 'verified'
	    }
	    return status // Default to original if not true/false
	  })()
	
	  switch (normalizedStatus) {
	    case 'verified':
	      return {
	        Icon: 'status-verified-icon-path',
	        borderColor: 'border-emerald-400',
	        textColor: 'text-emerald-700',
	        bgColor: 'bg-emerald-50',
	        accent: 'bg-gradient-to-r from-emerald-500 to-teal-600',
	        varColor: 'var(--verified-color)',
	        label: 'Verified'
	      }
	    case 'debunked':
	      return {
	        Icon: 'status-debunked-icon-path',
	        borderColor: 'border-rose-400',
	        textColor: 'text-rose-700',
	        bgColor: 'bg-rose-50',
	        accent: 'bg-gradient-to-r from-rose-500 to-pink-600',
	        varColor: 'var(--debunked-color)',
	        label: 'Debunked'
	      }
	    case 'inconclusive':
	      return {
	        Icon: 'status-inconclusive-icon-path',
	        borderColor: 'border-amber-400',
	        textColor: 'text-amber-700',
	        bgColor: 'bg-amber-50',
	        accent: 'bg-gradient-to-r from-amber-500 to-orange-600',
	        varColor: 'var(--inconclusive-color)',
	        label: 'Inconclusive'
	      }
	    case 'pending':
	    default:
	      return {
	        Icon: 'status-pending-icon-path',
	        borderColor: 'border-sky-400',
	        textColor: 'text-sky-700',
	        bgColor: 'bg-sky-50',
	        accent: 'bg-gradient-to-r from-sky-500 to-blue-600',
	        varColor: 'var(--pending-color)',
	        label: 'Pending'
	      }
	  }
	}
	
	// Helper to format date as "Last verified: Sep 2023"
	const formatLastVerified = dateString => {
	  if (!dateString) return ''
	  const date = new Date(dateString)
	  return `Last verified: ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
	}
	
	// Updated renderMessage function with sources accordion
	const renderMessage = msg => {
	  const messageElement = document.createElement('div')
	  messageElement.classList.add('animate-fade-in-up')
	  const timeString = msg.timestamp.toLocaleTimeString([], {
	    hour: '2-digit',
	    minute: '2-digit'
	  })
	
	  if (msg.sender === 'user') {
	    messageElement.className = 'flex justify-end ml-12 sm:ml-24 animate-fade-in-up'
	    messageElement.innerHTML = `
	      <div class="flex items-start gap-4 max-w-2xl">
	        <div class="bg-gradient-to-r from-sky-500 to-blue-600 p-4 rounded-2xl rounded-br-md shadow-lg text-white">
	          ${
	            msg.imageUrl
	              ? `<div class="mb-3 rounded-lg overflow-hidden"><img src="${
	                  msg.imageUrl
	                }" alt="${
	                  msg.imageName || 'Uploaded image'
	                }" class="max-h-60 w-auto rounded-lg"/></div>`
	              : ''
	          }
	          ${
	            msg.text
	              ? `<p class="whitespace-pre-wrap break-words leading-relaxed">${msg.text}</p>`
	              : ''
	          }
	          <p class="text-xs mt-3 opacity-80 text-right">${timeString}</p>
	        </div>
	        <div class="bg-gradient-to-r from-sky-500 to-blue-600 p-2 rounded-full shadow-lg">
	          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-white"><use href="#user-circle-icon-path" /></svg>
	        </div>
	      </div>
	    `
	  } else {
	    // Verifact message
	    const styles = getStatusStyles(msg.status)
	    const lastVerifiedText = msg.lastVerified ? formatLastVerified(msg.lastVerified) : ''
	    
	    messageElement.className = 'flex justify-start mr-12 sm:mr-24 animate-fade-in-up'
	    messageElement.innerHTML = `
	      <div class="flex items-start gap-4 max-w-2xl">
	        <div class="p-2 rounded-full shadow-lg ${styles.accent}">
	          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-white"><use href="#cpu-chip-icon-path" /></svg>
	        </div>
	        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl rounded-bl-md shadow-xl border-l-4 border-0" style="border-left-color: ${
	          styles.varColor
	        };">
	          <div class="mb-4 flex justify-between items-center">
	            <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
	              styles.bgColor
	            } ${styles.textColor} border ${
	              styles.borderColor
	            } shadow-sm">
	              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2"><use href="#${
	                styles.Icon
	              }" /></svg>
	              ${styles.label}
	            </span>
	            ${
	              lastVerifiedText
	                ? `<span class="text-xs text-slate-500">${lastVerifiedText}</span>`
	                : ''
	            }
	          </div>
	          ${
	            msg.originalQuery?.text || msg.originalQuery?.imageName
	              ? `
	          <div class="mb-4 p-3 bg-slate-50/80 rounded-xl text-sm text-slate-600 border border-slate-200/50">
	            <span class="font-medium text-slate-700">Regarding your query:</span>
	            ${
	              msg.originalQuery.text
	                ? `<em class="block mt-1 text-slate-600">"${msg.originalQuery.text}"</em>`
	                : ''
	            }
	            ${
	              msg.originalQuery.imageName
	                ? `<em class="block mt-1 text-slate-600">Image: ${msg.originalQuery.imageName}</em>`
	                : ''
	            }
	          </div>`
	              : ''
	          }
	          <div class="mb-4">
	            <h4 class="font-bold ${
	              styles.textColor
	            } mb-2 text-lg">Summary</h4>
	            <p class="text-slate-700 whitespace-pre-wrap break-words leading-relaxed">${
	              msg.summary
	            }</p>
	          </div>
	          <div class="mb-4">
	            <h4 class="font-bold ${
	              styles.textColor
	            } mb-2 text-lg">Details</h4>
	            <div class="prose prose-slate max-w-none text-slate-600">
	              ${msg.details
	                .split('\n')
	                .filter(p => p.trim())
	                .map(p => `<p class="mb-3 leading-relaxed">${p}</p>`)
	                .join('')}
	            </div>
	          </div>
	          ${
	            msg.sources?.length > 0
	              ? `
	          <div class="mt-4">
	            <h4 class="font-bold ${styles.textColor} mb-2 text-lg">Sources</h4>
	            <div class="space-y-2">
	              ${msg.sources.map(src => `
	                <details class="group border border-slate-200 rounded-lg overflow-hidden">
	                  <summary class="flex justify-between items-center p-3 cursor-pointer bg-slate-50">
	                    <span class="text-sm font-medium text-slate-700 truncate">${src.url}</span>
	                    <svg class="h-5 w-5 text-slate-400 group-open:rotate-180 transform transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
	                    </svg>
	                  </summary>
	                  <div class="p-3 pt-0 text-sm space-y-1">
	                    <div class="flex justify-between">
	                      <span class="text-slate-600">Relevance:</span>
	                      <span class="font-medium">${src.relevance || 'Unknown'}</span>
	                    </div>
	                    <div class="flex justify-between">
	                      <span class="text-slate-600">Published:</span>
	                      <span>${src.publicationDate || 'Date not available'}</span>
	                    </div>
	                  </div>
	                </details>
	              `).join('')}
	            </div>
	          </div>`
	              : ''
	          }
	          <p class="text-xs mt-4 pt-3 border-t border-slate-200/50 text-slate-500">${timeString}</p>
	        </div>
	      </div>
	    `
	  }
	  
	  if (loadingIndicator && loadingIndicator.parentNode === chatContainer) {
	    chatContainer.insertBefore(messageElement, loadingIndicator)
	  } else {
	    chatContainer.appendChild(messageElement)
	  }
	}
	
	// Helper function to handle API errors
	const showError = (errorMsg, retryCallback) => {
	  const errorElement = document.createElement('div')
	  errorElement.className = 'flex justify-start mr-12 sm:mr-24 animate-fade-in-up'
	  errorElement.innerHTML = `
	    <div class="flex items-start gap-4 max-w-2xl">
	      <div class="p-2 rounded-full shadow-lg bg-gradient-to-r from-rose-500 to-pink-600">
	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-white"><use href="#cpu-chip-icon-path" /></svg>
	      </div>
	      <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl rounded-bl-md shadow-xl border-l-4 border-rose-400">
	        <div class="mb-4">
	          <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-rose-50 text-rose-700 border border-rose-400 shadow-sm">
	            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2"><use href="#status-debunked-icon-path" /></svg>
	            Error
	          </span>
	        </div>
	        <div class="mb-4">
	          <p class="text-slate-700">${errorMsg}</p>
	        </div>
	        ${
	          retryCallback
	            ? `<button class="mt-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-md hover:bg-rose-200 transition" id="retry-button">
	                Retry
	              </button>`
	            : ''
	        }
	      </div>
	    </div>
	  `
	  
	  if (loadingIndicator && loadingIndicator.parentNode === chatContainer) {
	    chatContainer.insertBefore(errorElement, loadingIndicator)
	  } else {
	    chatContainer.appendChild(errorElement)
	  }
	
	  if (retryCallback) {
	    setTimeout(() => {
	      const retryBtn = document.getElementById('retry-button')
	      if (retryBtn) retryBtn.onclick = retryCallback
	    }, 100)
	  }
	}

	// --- Existing helper functions from Part 1 remain here ---

	const scrollToBottom = () => {
	  if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
	}
	
	const adjustTextareaHeight = () => {
	  if (chatInputTextarea) {
	    chatInputTextarea.style.height = 'auto'
	    const scrollHeight = chatInputTextarea.scrollHeight
	    chatInputTextarea.style.height = `${Math.min(scrollHeight, 160)}px`
	  }
	}
	
	const updateSendButtonState = () => {
	  const canSubmit =
	    (chatInputTextarea.value.trim() !== '' || selectedImageFile !== null) &&
	    !isLoading
	  sendButton.disabled = !canSubmit
	  if (canSubmit) {
	    sendButton.classList.remove('bg-slate-300', 'text-slate-500')
	    sendButton.classList.add(
	      'bg-gradient-to-r',
	      'from-sky-500',
	      'to-blue-600',
	      'text-white',
	      'hover:from-sky-600',
	      'hover:to-blue-700',
	      'shadow-lg',
	      'hover:shadow-xl',
	      'hover:scale-105'
	    )
	  } else {
	    sendButton.classList.add('bg-slate-300', 'text-slate-500')
	    sendButton.classList.remove(
	      'bg-gradient-to-r',
	      'from-sky-500',
	      'to-blue-600',
	      'text-white',
	      'hover:from-sky-600',
	      'hover:to-blue-700',
	      'shadow-lg',
	      'hover:shadow-xl',
	      'hover:scale-105'
	    )
	  }
	}
	
	// New API call function
	// const callVerifactAPI = async (text, imageFile) => {
	//   const API_ENDPOINT = 'https://verifact-backend.onrender.com/api/verify';
	  
	//   try {
	//     const formData = new FormData();
	//     formData.append('text', text || ' ');
	    
	//     if (imageFile) {
	//       formData.append('image', imageFile, `img_${Date.now()}.${imageFile.name.split('.').pop()}`);
	//     }
	
	//     // Critical CORS configuration
	//     const response = await fetch(API_ENDPOINT, {
	//       method: 'POST',
	//       body: formData,
	//       mode: 'cors', // Explicitly enable CORS
	//       headers: {
	//         'Accept': 'application/json' // Ensure backend knows we want JSON
	//       }
	//     });
	
	//     if (!response.ok) {
	//       const error = await response.text();
	//       throw new Error(`Server error: ${response.status} - ${error}`);
	//     }
	
	//     return await response.json();
	//   } catch (error) {
	//     console.error('Upload failed:', {
	//       errorName: error.name,
	//       message: error.message,
	//       suggestion: 'Ensure backend CORS headers allow your origin'
	//     });
	//     throw error;
	//   }
	// };

	const callVerifactAPI = async (text, imageFile) => {
	  const API_ENDPOINT = 'https://verifact-backend.onrender.com/api/verify';
	  
	  try {
	    const formData = new FormData();
	    if (text) formData.append('text', text);
	    if (imageFile) formData.append('image', imageFile);
	
	    const response = await fetch(API_ENDPOINT, {
	      method: 'POST',
	      body: formData
	      // No custom headers or CORS mode - let browser handle it
	    });
	
	    if (!response.ok) {
	      const error = await response.text();
	      throw new Error(error || 'Verification failed');
	    }
	
	    return await response.json();
	  } catch (error) {
	    console.error('API Error:', error.message);
	    throw error;
	  }
	};
	
	// Updated handleSubmit with real API integration
	const handleSubmit = async (event) => {
	  if (event) event.preventDefault()
	  const inputTextValue = chatInputTextarea.value.trim()
	  if (!inputTextValue && !selectedImageFile) return
	
	  // Initialize chat if first message
	  if (!hasStartedChat) {
	    hasStartedChat = true
	    if (welcomeScreen) welcomeScreen.classList.add('hidden')
	  }
	
	  // Create and display user message
	  const userMessage = {
	    id: crypto.randomUUID(),
	    sender: 'user',
	    text: inputTextValue || undefined,
	    imageUrl: selectedImageFile ? imagePreviewImg.src : undefined,
	    imageName: selectedImageFile?.name || undefined,
	    timestamp: new Date()
	  }
	  messages.push(userMessage)
	  renderMessage(userMessage)
	  scrollToBottom()
	
	  // Store current inputs before clearing
	  const currentInputText = inputTextValue
	  const currentSelectedImageName = selectedImageFile?.name
	
	  // Clear inputs
	  chatInputTextarea.value = ''
	  selectedImageFile = null
	  imagePreviewImg.src = ''
	  imagePreviewContainer.classList.add('hidden')
	  if (fileInput) fileInput.value = ''
	  adjustTextareaHeight()
	
	  // Set loading state
	  isLoading = true
	  updateSendButtonState()
	  chatInputTextarea.disabled = true
	  uploadImageButton.disabled = true
	  if (loadingIndicator) loadingIndicator.classList.remove('hidden')
	  scrollToBottom()
	
	  try {
	    // Make API call
	    const apiResponse = await callVerifactAPI(
	      currentInputText,
	      selectedImageFile
	    )
	
	    // Transform API response to chat message format
	    const verifactResponse = {
	      id: apiResponse.id || crypto.randomUUID(),
	      sender: 'verifact',
	      status: apiResponse.verdict, // Will be normalized in getStatusStyles
	      summary: apiResponse.summary,
	      details: apiResponse.detailedAnalysis,
	      originalQuery: {
	        text: currentInputText || undefined,
	        imageName: currentSelectedImageName || undefined
	      },
	      sources: apiResponse.sourcesUsed,
	      lastVerified: apiResponse.lastVerified,
	      timestamp: new Date()
	    }
	
	    messages.push(verifactResponse)
	    renderMessage(verifactResponse)
	  } catch (error) {
	    // Show error message with retry option
	    showError(
	      error.message || 'Failed to verify your query. Please try again.',
	      () => {
	        // Retry logic
	        chatContainer.removeChild(chatContainer.lastChild) // Remove error message
	        handleSubmit() // Retry original submission
	      }
	    )
	  } finally {
	    // Reset loading state
	    isLoading = false
	    updateSendButtonState()
	    chatInputTextarea.disabled = false
	    uploadImageButton.disabled = false
	    if (loadingIndicator) loadingIndicator.classList.add('hidden')
	    scrollToBottom()
	  }
	}
	
	// --- Existing event listeners ---
	const handleImageChange = (event) => {
	  if (!event.target.files?.length) return;
	  
	  const file = event.target.files[0];
	  
	  // Validate file type and size
	  if (!file.type.match(/image\/(jpeg|png|gif|webp)/)) {
	    alert('Please upload a valid image (JPEG, PNG, GIF, or WebP)');
	    fileInput.value = ''; // Reset input
	    return;
	  }
	
	  if (file.size > 5 * 1024 * 1024) { // 5MB limit
	    alert('Image must be smaller than 5MB');
	    fileInput.value = '';
	    return;
	  }
	
	  selectedImageFile = file;
	  const reader = new FileReader();
	  
	  reader.onloadend = () => {
	    imagePreviewImg.src = reader.result;
	    imagePreviewName.textContent = file.name;
	    imagePreviewName.title = file.name;
	    imagePreviewContainer.classList.remove('hidden');
	  };
	  
	  reader.onerror = () => {
	    console.error('File reading error');
	    resetImagePreview();
	  };
	  
	  reader.readAsDataURL(file);
	  updateSendButtonState();
	};
	
	const resetImagePreview = () => {
	  selectedImageFile = null;
	  imagePreviewImg.src = '';
	  imagePreviewContainer.classList.add('hidden');
	  if (fileInput) fileInput.value = '';
	};
	
	if (uploadImageButton) {
	  uploadImageButton.addEventListener('click', () => fileInput.click())
	}
	if (fileInput) {
	  fileInput.addEventListener('change', handleImageChange)
	}
	
	if (removeImageButton) {
	  removeImageButton.addEventListener('click', () => {
	    selectedImageFile = null
	    imagePreviewImg.src = ''
	    imagePreviewContainer.classList.add('hidden')
	    fileInput.value = ''
	    updateSendButtonState()
	  })
	}
	
	if (chatForm) {
	  chatForm.addEventListener('submit', handleSubmit)
	}
	
	if (chatInputTextarea) {
	  chatInputTextarea.addEventListener('input', () => {
	    adjustTextareaHeight()
	    updateSendButtonState()
	  })
	
	  chatInputTextarea.addEventListener('keydown', (e) => {
	    if (e.key === 'Enter' && !e.shiftKey) {
	      e.preventDefault()
	      if (
	        (chatInputTextarea.value.trim() !== '' || selectedImageFile) &&
	        !isLoading
	      ) {
	        handleSubmit()
	      }
	    }
	  })
	}
	
	// Suggestion buttons
	suggestionButtons.forEach((button) => {
	  button.addEventListener('click', () => {
	    const promptText = button.dataset.prompt
	    if (promptText && chatInputTextarea) {
	      chatInputTextarea.value = promptText
	      adjustTextareaHeight()
	      updateSendButtonState()
	      chatInputTextarea.focus()
	    }
	  })
	})

  // Initial state updates
  updateSendButtonState()
  adjustTextareaHeight()

  // Check initial screen width for sidebar state on desktop
  if (window.innerWidth < 1024 && desktopSidebarToggleButton) {
    // Below lg
    // Keep it as is, mobile logic handles it
  } else if (
    window.innerWidth >= 1024 &&
    desktopSidebarToggleButton &&
    localStorage.getItem('sidebarCollapsed') === 'true'
  ) {
    // If desktop and previously collapsed, collapse it
    toggleDesktopSidebar()
  }

  // Persist sidebar state (optional)
  if (desktopSidebarToggleButton) {
    desktopSidebarToggleButton.addEventListener('click', () => {
      localStorage.setItem('sidebarCollapsed', isSidebarCollapsed)
    })
  }
})
