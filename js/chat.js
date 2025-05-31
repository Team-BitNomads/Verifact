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
  const imagePreviewContainer = document.getElementById(
    'image-preview-container'
  )
  const imagePreviewImg = document.getElementById('image-preview-img')
  const imagePreviewName = document.getElementById('image-preview-name')
  const removeImageButton = document.getElementById('remove-image-button')
  const suggestionButtons = document.querySelectorAll('.suggestion-button')

  let messages = []
  let hasStartedChat = false
  let selectedImageFile = null
  let isLoading = false

  const getStatusStyles = status => {
    switch (status) {
      case 'verified':
        return {
          Icon: 'status-verified-icon-path',
          borderColor: 'border-emerald-400',
          textColor: 'text-emerald-700',
          bgColor: 'bg-emerald-50',
          accent: 'bg-gradient-to-r from-emerald-500 to-teal-600',
          varColor: 'var(--verified-color)'
        }
      case 'debunked':
        return {
          Icon: 'status-debunked-icon-path',
          borderColor: 'border-rose-400',
          textColor: 'text-rose-700',
          bgColor: 'bg-rose-50',
          accent: 'bg-gradient-to-r from-rose-500 to-pink-600',
          varColor: 'var(--debunked-color)'
        }
      case 'inconclusive':
        return {
          Icon: 'status-inconclusive-icon-path',
          borderColor: 'border-amber-400',
          textColor: 'text-amber-700',
          bgColor: 'bg-amber-50',
          accent: 'bg-gradient-to-r from-amber-500 to-orange-600',
          varColor: 'var(--inconclusive-color)'
        }
      case 'pending':
      default:
        return {
          Icon: 'status-pending-icon-path',
          borderColor: 'border-sky-400',
          textColor: 'text-sky-700',
          bgColor: 'bg-sky-50',
          accent: 'bg-gradient-to-r from-sky-500 to-blue-600',
          varColor: 'var(--pending-color)'
        }
    }
  }

  const scrollToBottom = () => {
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
  }

  const adjustTextareaHeight = () => {
    if (chatInputTextarea) {
      chatInputTextarea.style.height = 'auto'
      const scrollHeight = chatInputTextarea.scrollHeight
      chatInputTextarea.style.height = `${Math.min(scrollHeight, 160)}px` // Max height 160px
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

  if (chatInputTextarea) {
    chatInputTextarea.addEventListener('input', () => {
      adjustTextareaHeight()
      updateSendButtonState()
    })
  }

  const renderMessage = msg => {
    const messageElement = document.createElement('div')
    messageElement.classList.add('animate-fade-in-up')
    const timeString = msg.timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

    if (msg.sender === 'user') {
      messageElement.className =
        'flex justify-end ml-12 sm:ml-24 animate-fade-in-up'
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
      messageElement.className =
        'flex justify-start mr-12 sm:mr-24 animate-fade-in-up'
      messageElement.innerHTML = `
              <div class="flex items-start gap-4 max-w-2xl">
                <div class="p-2 rounded-full shadow-lg ${styles.accent}">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-white"><use href="#cpu-chip-icon-path" /></svg>
                </div>
                <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl rounded-bl-md shadow-xl border-l-4 border-0" style="border-left-color: ${
                  styles.varColor
                };">
                  <div class="mb-4">
                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      styles.bgColor
                    } ${styles.textColor} border ${
        styles.borderColor
      } shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2"><use href="#${
                        styles.Icon
                      }" /></svg>
                      ${
                        msg.status.charAt(0).toUpperCase() + msg.status.slice(1)
                      }
                    </span>
                  </div>
                  ${
                    msg.originalQuery.text || msg.originalQuery.imageName
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
                  <div>
                    <h4 class="font-bold ${
                      styles.textColor
                    } mb-2 text-lg">Details</h4>
                    <div class="prose prose-slate max-w-none text-slate-600">
                      ${msg.details
                        .split('\\n')
                        .filter(p => p.trim())
                        .map(p => `<p class="mb-3 leading-relaxed">${p}</p>`)
                        .join('')}
                    </div>
                  </div>
                  <p class="text-xs mt-4 pt-3 border-t border-slate-200/50 text-slate-500">${timeString}</p>
                </div>
              </div>
            `
    }
    // Insert before the loading indicator if it exists, otherwise append
    if (loadingIndicator && loadingIndicator.parentNode === chatContainer) {
      chatContainer.insertBefore(messageElement, loadingIndicator)
    } else {
      chatContainer.appendChild(messageElement)
    }
  }

  const handleImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      selectedImageFile = event.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        imagePreviewImg.src = reader.result
        imagePreviewName.textContent = selectedImageFile.name
        imagePreviewName.title = selectedImageFile.name
        imagePreviewContainer.classList.remove('hidden')
      }
      reader.readAsDataURL(selectedImageFile)
      updateSendButtonState()
    }
  }

  if (uploadImageButton)
    uploadImageButton.addEventListener('click', () => fileInput.click())
  if (fileInput) fileInput.addEventListener('change', handleImageChange)

  if (removeImageButton) {
    removeImageButton.addEventListener('click', () => {
      selectedImageFile = null
      imagePreviewImg.src = ''
      imagePreviewContainer.classList.add('hidden')
      fileInput.value = '' // Reset file input
      updateSendButtonState()
    })
  }

  const handleSubmit = async event => {
    if (event) event.preventDefault()
    const inputTextValue = chatInputTextarea.value.trim()
    if (!inputTextValue && !selectedImageFile) return

    if (!hasStartedChat) {
      hasStartedChat = true
      if (welcomeScreen) welcomeScreen.classList.add('hidden')
    }

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

    const currentInputText = inputTextValue
    const currentSelectedImageName = selectedImageFile?.name
    const currentImagePreview = selectedImageFile ? imagePreviewImg.src : null

    chatInputTextarea.value = ''
    selectedImageFile = null
    imagePreviewImg.src = ''
    imagePreviewContainer.classList.add('hidden')
    if (fileInput) fileInput.value = ''
    adjustTextareaHeight()

    isLoading = true
    updateSendButtonState()
    chatInputTextarea.disabled = true
    uploadImageButton.disabled = true
    if (loadingIndicator) loadingIndicator.classList.remove('hidden')
    scrollToBottom()

    // Simulate API call
    setTimeout(() => {
      const mockStatuses = ['verified', 'debunked', 'inconclusive', 'pending']
      const randomStatus =
        mockStatuses[Math.floor(Math.random() * mockStatuses.length)]

      const verifactResponse = {
        id: crypto.randomUUID(),
        sender: 'verifact',
        status: randomStatus,
        summary: `The claim about "${
          currentInputText || currentSelectedImageName || 'your query'
        }" has been analyzed. Our initial findings suggest it is ${randomStatus}.`,
        details: `Further investigation reveals several key points supporting this assessment. For instance, [Dummy Detail 1 related to ${
          currentInputText || currentSelectedImageName
        }]. \n\nAdditionally, [Dummy Detail 2 pointing towards the ${randomStatus} status]. \n\nWe cross-referenced multiple sources, including [Source A] and [Report B], to arrive at this conclusion. More information can be found in our comprehensive analysis document.`,
        originalQuery: {
          text: currentInputText || undefined,
          imageName: currentSelectedImageName || undefined
        },
        timestamp: new Date()
      }
      messages.push(verifactResponse)
      renderMessage(verifactResponse)

      isLoading = false
      updateSendButtonState()
      chatInputTextarea.disabled = false
      uploadImageButton.disabled = false
      if (loadingIndicator) loadingIndicator.classList.add('hidden')
      scrollToBottom()
    }, 2000)
  }

  if (chatForm) chatForm.addEventListener('submit', handleSubmit)
  if (chatInputTextarea) {
    chatInputTextarea.addEventListener('keydown', e => {
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

  suggestionButtons.forEach(button => {
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
