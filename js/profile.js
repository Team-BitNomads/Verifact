document.addEventListener('DOMContentLoaded', () => {
  // --- Sidebar and Header JS (Consistent with other dashboard pages) ---
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
  const sidebarUserIcon = document.querySelector('.sidebar-user-icon')
  const sidebarUserStatusIndicator = document.querySelector(
    '.sidebar-user-status-indicator'
  )
  const sidebarUsernameEl = document.getElementById('sidebar-username')

  let isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true'
  let isMobileSidebarOpen = false
  let isUserMenuOpen = false
  let wasDesktopCollapsedBeforeMobileOpen = isSidebarCollapsed

  const applyDesktopCollapseStyles = collapse => {
    /* ... (same as history-detail.html) ... */
    sidebar.classList.toggle('w-64', !collapse)
    sidebar.classList.toggle('w-20', collapse)
    if (sidebarCollapseIcon)
      sidebarCollapseIcon.classList.toggle('hidden', collapse)
    if (sidebarExpandIcon)
      sidebarExpandIcon.classList.toggle('hidden', !collapse)
    sidebarTextElements.forEach(el => {
      el.classList.toggle('opacity-0', collapse)
      el.classList.toggle('h-0', collapse)
      el.classList.toggle('overflow-hidden', collapse)
      el.classList.toggle('opacity-100', !collapse)
      el.classList.toggle('h-auto', !collapse)
      if (el.tagName === 'H3') el.setAttribute('aria-hidden', collapse)
    })
    sidebarNavItems.forEach(item => {
      item.classList.toggle('px-3', collapse)
      item.classList.toggle('justify-center', collapse)
      item.classList.toggle('px-4', !collapse)
      const icon = item.querySelector('svg')
      if (icon) icon.classList.toggle('mr-3', !collapse)
      const textSpan = item.querySelector('.sidebar-text')
      if (collapse && textSpan) item.title = textSpan.textContent.trim()
      else item.removeAttribute('title')
    })
    if (sidebarUserProfileArea) {
      sidebarUserProfileArea.classList.toggle('h-[70px]', collapse)
      sidebarUserProfileArea.classList.toggle('flex', collapse)
      sidebarUserProfileArea.classList.toggle('items-center', collapse)
      sidebarUserProfileArea.classList.toggle('justify-center', collapse)
      sidebarUserProfileArea.classList.toggle('h-auto', !collapse)
      const userProfileLink = sidebarUserProfileArea.querySelector('a')
      if (userProfileLink) {
        userProfileLink.classList.toggle('p-2', collapse)
        userProfileLink.classList.toggle('rounded-lg', collapse)
        userProfileLink.classList.toggle('hover:bg-emerald-100', collapse)
      }
    }
    if (sidebarUserIcon) {
      sidebarUserIcon.classList.toggle('h-7', collapse)
      sidebarUserIcon.classList.toggle('w-7', collapse)
      sidebarUserIcon.classList.toggle('text-slate-500', collapse)
      sidebarUserIcon.classList.toggle('hover:text-emerald-600', collapse)
      sidebarUserIcon.classList.toggle('h-10', !collapse)
      sidebarUserIcon.classList.toggle('w-10', !collapse)
      sidebarUserIcon.classList.toggle('text-slate-400', !collapse)
    }
    if (sidebarUserStatusIndicator)
      sidebarUserStatusIndicator.classList.toggle('hidden', collapse)
  }
  const toggleDesktopSidebar = () => {
    isSidebarCollapsed = !isSidebarCollapsed
    if (desktopSidebarToggleButton) {
      desktopSidebarToggleButton.setAttribute(
        'aria-expanded',
        !isSidebarCollapsed
      )
      desktopSidebarToggleButton.title = isSidebarCollapsed
        ? 'Expand sidebar'
        : 'Collapse sidebar'
      desktopSidebarToggleButton.querySelector('span.sr-only').textContent =
        isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
    }
    applyDesktopCollapseStyles(isSidebarCollapsed)
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed)
  }
  if (mobileSidebarToggle && sidebar && mobileSidebarOverlay) {
    mobileSidebarToggle.addEventListener('click', () => {
      isMobileSidebarOpen = !isMobileSidebarOpen
      sidebar.classList.toggle('-translate-x-full', !isMobileSidebarOpen)
      sidebar.classList.toggle('translate-x-0', isMobileSidebarOpen)
      mobileSidebarOverlay.classList.toggle('hidden', !isMobileSidebarOpen)
      mobileSidebarToggle.setAttribute('aria-expanded', isMobileSidebarOpen)
      mobileSidebarToggle.querySelector('span.sr-only').textContent =
        isMobileSidebarOpen ? 'Close sidebar' : 'Open sidebar'
      if (isMobileSidebarOpen) {
        wasDesktopCollapsedBeforeMobileOpen = isSidebarCollapsed
        applyDesktopCollapseStyles(false)
      } else {
        if (window.innerWidth >= 1024)
          applyDesktopCollapseStyles(wasDesktopCollapsedBeforeMobileOpen)
      }
    })
    mobileSidebarOverlay.addEventListener('click', () => {
      if (isMobileSidebarOpen) mobileSidebarToggle.click()
    })
  }
  document
    .querySelectorAll(
      '#sidebar .sidebar-nav-item, #sidebar-user-profile-area a'
    )
    .forEach(link => {
      link.addEventListener('click', () => {
        if (isMobileSidebarOpen && window.innerWidth < 1024)
          mobileSidebarToggle.click()
      })
    })
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
  if (desktopSidebarToggleButton) {
    desktopSidebarToggleButton.addEventListener('click', toggleDesktopSidebar)
    if (window.innerWidth >= 1024) {
      applyDesktopCollapseStyles(isSidebarCollapsed)
      if (desktopSidebarToggleButton) {
        desktopSidebarToggleButton.setAttribute(
          'aria-expanded',
          !isSidebarCollapsed
        )
        desktopSidebarToggleButton.title = isSidebarCollapsed
          ? 'Expand sidebar'
          : 'Collapse sidebar'
        desktopSidebarToggleButton.querySelector('span.sr-only').textContent =
          isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
      }
    } else {
      applyDesktopCollapseStyles(false)
    }
  }
  // --- End Sidebar and Header JS ---

  // --- Profile Page Content Logic ---
  const initialUserProfileData = {
    name: 'Bola Ahmed Tinubu',
    email: 'bola.tinubu@example.com',
    phone: '+234 800 123 4567',
    bio: 'Dedicated to fostering innovation and growth. Passionate about technology and its impact on society. Currently focused on leveraging AI for truth and transparency with Verifact.',
    avatarUrl: 'https://images.app.goo.gl/vx4JeMqBAgWE4sEJA' // Placeholder, use a real accessible image or default
  }
  // A local copy of the user data for display and editing
  let currentProfileData =
    JSON.parse(localStorage.getItem('userProfileData')) ||
    JSON.parse(JSON.stringify(initialUserProfileData))
  let formData = JSON.parse(JSON.stringify(currentProfileData))
  let isEditing = false
  let isLoading = false

  const editProfileButton = document.getElementById('edit-profile-button')
  const cancelEditButton = document.getElementById('cancel-edit-button')
  const profileForm = document.getElementById('profile-form')
  const saveChangesButton = document.getElementById('save-changes-button')

  const notificationArea = document.getElementById('notification-area')
  const notificationIconContainer = document.getElementById(
    'notification-icon-container'
  )
  const notificationMessage = document.getElementById('notification-message')

  const profileAvatarImg = document.getElementById('profile-avatar-img')
  const avatarUploadLabel = document.getElementById('avatar-upload-label')
  const avatarUploadInput = document.getElementById('avatar-upload-input')

  const displayNameContainer = document.getElementById('display-name-container')
  const editNameContainer = document.getElementById('edit-name-container')
  const profileNameDisplay = document.getElementById('profile-name-display')
  const nameInput = document.getElementById('name-input') // For header name
  const profileEmailDisplay = document.getElementById('profile-email-display')

  const displayBioContainer = document.getElementById('display-bio-container')
  const editBioContainer = document.getElementById('edit-bio-container')
  const profileBioDisplay = document.getElementById('profile-bio-display')
  const bioInput = document.getElementById('bio-input')

  // Contact Info Fields (using a more generic approach)
  const nameContactInput = document.getElementById('name-contact-input')
  const emailInput = document.getElementById('email-input')
  const phoneInput = document.getElementById('phone-input')

  const formActionsDiv = document.getElementById('form-actions')

  const displayValueName = document.getElementById('display-value-name')
  const displayValueEmail = document.getElementById('display-value-email')
  const displayValuePhone = document.getElementById('display-value-phone')

  const defaultAvatar = 'assets/images/user-avatar.png' // Path to your default avatar

  const populateDisplayData = () => {
    profileAvatarImg.src = currentProfileData.avatarUrl || defaultAvatar
    profileNameDisplay.textContent = currentProfileData.name
    sidebarUsernameEl.textContent = currentProfileData.name // Update sidebar username too
    profileEmailDisplay.textContent = currentProfileData.email
    profileBioDisplay.textContent =
      currentProfileData.bio || 'No biography provided.'

    displayValueName.textContent = currentProfileData.name || 'N/A'
    displayValueEmail.textContent = currentProfileData.email || 'N/A'
    displayValuePhone.textContent = currentProfileData.phone || 'N/A'
  }

  const populateFormData = () => {
    formData = JSON.parse(JSON.stringify(currentProfileData)) // Deep copy
    nameInput.value = formData.name // Header name input
    bioInput.value = formData.bio || ''
    nameContactInput.value = formData.name // Contact name input
    emailInput.value = formData.email
    phoneInput.value = formData.phone || ''
    // If avatar preview is needed during edit:
    // profileAvatarImg.src = formData.avatarUrl || defaultAvatar;
  }

  const toggleEditState = editing => {
    isEditing = editing

    // Toggle visibility of display vs edit containers
    displayNameContainer.classList.toggle('hidden', isEditing)
    editNameContainer.classList.toggle('hidden', !isEditing)
    displayBioContainer.classList.toggle('hidden', isEditing)
    editBioContainer.classList.toggle('hidden', !isEditing)

    document
      .querySelectorAll('.display-field')
      .forEach(el => el.classList.toggle('hidden', isEditing))
    document
      .querySelectorAll('.edit-field')
      .forEach(el => el.classList.toggle('hidden', !isEditing))

    avatarUploadLabel.classList.toggle('hidden', !isEditing)
    formActionsDiv.classList.toggle('hidden', !isEditing)

    if (isEditing) {
      populateFormData() // Fill form with current data
      editProfileButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ml-1 mr-2 h-5 w-5"><use href="#x-circle-icon-solid" /></svg>Cancel`
      editProfileButton.classList.remove(
        'bg-sky-600',
        'hover:bg-sky-700',
        'text-white',
        'border-transparent',
        'focus:ring-sky-500'
      )
      editProfileButton.classList.add(
        'border-slate-300',
        'bg-white',
        'text-slate-700',
        'hover:bg-slate-50',
        'focus:ring-slate-400'
      )
    } else {
      editProfileButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ml-1 mr-2 h-5 w-5"><use href="#pencil-square-icon-path" /></svg>Edit Profile`
      editProfileButton.classList.add(
        'bg-sky-600',
        'hover:bg-sky-700',
        'text-white',
        'border-transparent',
        'focus:ring-sky-500'
      )
      editProfileButton.classList.remove(
        'border-slate-300',
        'bg-white',
        'text-slate-700',
        'hover:bg-slate-50',
        'focus:ring-slate-400'
      )
      hideNotification()
    }
    // Disable/enable form inputs based on isLoading
    ;[
      nameInput,
      bioInput,
      nameContactInput,
      emailInput,
      phoneInput,
      saveChangesButton,
      cancelEditButton,
      editProfileButton,
      avatarUploadInput
    ].forEach(el => {
      if (el) el.disabled = isLoading
    })
  }

  const showNotification = (type, message) => {
    notificationArea.classList.remove(
      'hidden',
      'bg-green-50',
      'text-green-700',
      'bg-red-50',
      'text-red-700'
    )
    if (type === 'success') {
      notificationArea.classList.add('bg-green-50', 'text-green-700')
      notificationIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-green-400"><use href="#check-circle-icon-solid" /></svg>`
    } else {
      notificationArea.classList.add('bg-red-50', 'text-red-700')
      notificationIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-red-400"><use href="#x-circle-icon-solid" /></svg>`
    }
    notificationMessage.textContent = message
    setTimeout(hideNotification, 5000)
  }
  const hideNotification = () => notificationArea.classList.add('hidden')

  const handleAvatarChange = event => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        formData.avatarUrl = e.target.result
        profileAvatarImg.src = e.target.result // Preview new avatar
      }
      reader.readAsDataURL(file)
    }
  }
  if (avatarUploadInput)
    avatarUploadInput.addEventListener('change', handleAvatarChange)

  if (editProfileButton) {
    editProfileButton.addEventListener('click', () => {
      toggleEditState(!isEditing)
    })
  }
  if (cancelEditButton) {
    cancelEditButton.addEventListener('click', () => {
      // Revert image preview if an image was selected but not saved
      profileAvatarImg.src = currentProfileData.avatarUrl || defaultAvatar
      toggleEditState(false)
    })
  }

  if (profileForm) {
    profileForm.addEventListener('submit', async e => {
      e.preventDefault()
      isLoading = true
      toggleEditState(true) // Keep in edit mode but disable fields
      saveChangesButton.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Saving...`

      // Update formData from inputs just before submitting
      formData.name = nameInput.value // From header name input
      formData.bio = bioInput.value
      // formData.name is also nameContactInput.value, no need to read twice
      formData.email = emailInput.value
      formData.phone = phoneInput.value

      // Simulate API call
      console.log('Updating profile with:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000))
      const success = formData.name !== 'Error User' // Mock success/failure
      const message = success
        ? 'Profile updated successfully!'
        : 'Failed to update profile. Please try again.'

      isLoading = false
      saveChangesButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ml-1 mr-2 h-5 w-5"><use href="#check-circle-icon-solid" /></svg>Save Changes`

      if (success) {
        currentProfileData = JSON.parse(JSON.stringify(formData))
        localStorage.setItem(
          'userProfileData',
          JSON.stringify(currentProfileData)
        ) // Save to local storage
        populateDisplayData()
        toggleEditState(false)
        showNotification('success', message)
      } else {
        toggleEditState(true) // Stay in edit mode, re-enable fields
        showNotification('error', message)
      }
    })
  }

  document.querySelectorAll('.common-input-style').forEach(input => {
    input.classList.add(
      'mt-1',
      'block',
      'w-full',
      'px-3',
      'py-2',
      'bg-white',
      'border',
      'border-slate-300',
      'rounded-md',
      'shadow-sm',
      'focus:outline-none',
      'focus:ring-sky-500',
      'focus:border-sky-500',
      'sm:text-sm',
      'disabled:bg-slate-50',
      'disabled:text-slate-500',
      'disabled:border-slate-200',
      'disabled:shadow-none'
    )
  })

  // Initial population and state
  populateDisplayData()
  toggleEditState(false) // Start in display mode
})
