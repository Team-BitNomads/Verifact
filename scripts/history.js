document.addEventListener('DOMContentLoaded', () => {

  // --- Sidebar and Header JS ---
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

  let isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true'
  let isMobileSidebarOpen = false
  let isUserMenuOpen = false
  let wasDesktopCollapsedBeforeMobileOpen = false

  const applyDesktopCollapseStyles = collapse => {
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
        wasDesktopCollapsedBeforeMobileOpen = isSidebarCollapsed // Store current desktop state
        applyDesktopCollapseStyles(false) // Always expand for mobile view
      } else {
        // Revert to stored desktop state only if on desktop view
        if (window.innerWidth >= 1024) {
          applyDesktopCollapseStyles(wasDesktopCollapsedBeforeMobileOpen)
        }
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
    // Apply initial desktop collapsed state if not on mobile
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
      applyDesktopCollapseStyles(false) // Ensure expanded on mobile initially if desktop was collapsed
    }
  }
  // --- End Sidebar and Header JS ---

  // --- Claim Detail Logic ---
  const claimDetailLoadingEl = document.getElementById('claim-detail-loading');
  const claimDetailErrorEl = document.getElementById('claim-detail-error');
  const errorMessageTextEl = document.getElementById('error-message-text');
  const claimDetailContentWrapperEl = document.getElementById('claim-detail-content');

  // Status conversion map
  const VERDICT_TO_STATUS = {
    'True': 'verified',
    'False': 'debunked',
    'Inconclusive': 'inconclusive'
  };

  // Updated status badge generator with direct SVG paths
  const getStatusBadgeHTML = (status, large = false) => {
    let bgColor = 'bg-slate-100';
    let textColor = 'text-slate-700';
    let iconPath = '';
    
    switch (status) {
      case 'verified':
        bgColor = 'bg-green-100';
        textColor = 'text-green-700';
        iconPath = 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
        break;
      case 'debunked':
        bgColor = 'bg-red-100';
        textColor = 'text-red-700';
        iconPath = 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
        break;
      case 'pending':
        bgColor = 'bg-sky-100';
        textColor = 'text-sky-700';
        iconPath = 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z';
        break;
      case 'inconclusive':
        bgColor = 'bg-amber-50';
        textColor = 'text-amber-700';
        iconPath = 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
        break;
    }

    const sizeClass = large ? 'px-4 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs';
    const iconSizeClass = large ? 'w-5 h-5' : 'w-4 h-4';
    
    return `<span class="inline-flex items-center rounded-full font-medium ${bgColor} ${textColor} ${sizeClass}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${iconSizeClass} mr-1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="${iconPath}" />
      </svg>
      ${status.charAt(0).toUpperCase() + status.slice(1)}
    </span>`;
  };

  const renderClaimDetail = (claimData) => {
    if (!claimData) {
      errorMessageTextEl.textContent = 'Claim details not found.';
      claimDetailLoadingEl.classList.add('hidden');
      claimDetailErrorEl.classList.remove('hidden');
      claimDetailContentWrapperEl.classList.add('hidden');
      return;
    }

    // Safely parse date
    const verificationDate = claimData.verificationDate ? new Date(claimData.verificationDate) : new Date();
    const formattedDate = verificationDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Build evidence links section
    let evidenceHTML = '';
    if (claimData.evidenceLinks?.length > 0) {
      evidenceHTML = `
        <section>
          <div class="flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-sky-600 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
            <h2 class="text-xl font-semibold text-slate-800">Supporting Evidence</h2>
          </div>
          <ul class="space-y-2">
            ${claimData.evidenceLinks.map(link => `
              <li>
                <a href="${link.url || '#'}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-sm text-sky-600 hover:text-sky-800 hover:underline group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1.5 opacity-70 group-hover:opacity-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                  ${link.url || 'Source link'}
                </a>
              </li>
            `).join('')}
          </ul>
        </section>`;
    }

    // Handle detailed explanation
    const paragraphsHTML = claimData.detailedExplanation
      ?.split('\n')
      ?.map(p => `<p>${p.trim() ? p : '&nbsp;'}</p>`)
      ?.join('') || 'No detailed explanation available.';

    claimDetailContentWrapperEl.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <div class="mb-6">
          <a href="history-list.html" class="inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-sky-500 group-hover:text-sky-700 transition-colors">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Verification History
          </a>
        </div>
        <div class="bg-white rounded-xl shadow-xl overflow-hidden">
          ${claimData.imageUrl ? `
            <div class="bg-slate-200">
              <img src="${claimData.imageUrl}" alt="Claim related image" class="w-full h-60 sm:h-80 md:h-96 object-contain p-2 bg-slate-50" />
            </div>` : ''
          }
          <div class="p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 pb-5 border-b border-slate-200">
              ${getStatusBadgeHTML(claimData.status, true)}
              <div class="flex items-center text-sm text-slate-500 mt-3 sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1.5 text-slate-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified on: ${formattedDate}
              </div>
            </div>
            <section class="mb-8">
              <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Original Claim</h2>
              <p class="text-lg sm:text-xl text-slate-800 leading-relaxed whitespace-pre-wrap">
                ${claimData.claimText || 'No claim text available'}
              </p>
              ${claimData.originalSource ? `
                <div class="mt-3 flex items-center text-sm text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1.5 text-slate-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                  Source: <span class="ml-1 font-medium text-slate-600 truncate">${claimData.originalSource}</span>
                </div>` : ''
              }
            </section>
            <section class="mb-8">
              <div class="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-sky-600 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <h2 class="text-xl font-semibold text-slate-800">Verification Details</h2>
              </div>
              <div class="prose prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed">
                ${paragraphsHTML}
              </div>
            </section>
            ${evidenceHTML}
          </div>
        </div>
      </div>
    `;

    claimDetailLoadingEl.classList.add('hidden');
    claimDetailErrorEl.classList.add('hidden');
    claimDetailContentWrapperEl.classList.remove('hidden');
  };

  const fetchClaimDetail = async () => {
    const searchParams = new URL(window.location.href).searchParams;
  	const claimIdFromUrl = searchParams.get('id');

    claimDetailLoadingEl.classList.remove('hidden');
    claimDetailErrorEl.classList.add('hidden');
    claimDetailContentWrapperEl.classList.add('hidden');

    try {
      if (!claimIdFromUrl) {
        throw new Error('No Claim ID provided in the URL.');
      }

      // 1. First fetch ALL claims from the API
      const response = await fetch('https://verifact-backend.onrender.com/api/history');
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
      const allClaims = await response.json();
      
      // 2. Find the specific claim by ID
      const foundClaim = allClaims.find(claim => claim._id === claimIdFromUrl);
      
      if (!foundClaim) {
        throw new Error(`Claim with ID "${claimIdFromUrl}" not found in the history.`);
      }

      // 3. Transform the found claim data
      const claimData = {
        id: foundClaim._id,
        claimText: foundClaim.inputText || 'No claim text available',
        status: VERDICT_TO_STATUS[foundClaim.verdict] || 'pending',
        verificationDate: foundClaim.lastVerified || new Date().toISOString(),
        summary: foundClaim.summary || 'No summary available',
        detailedExplanation: foundClaim.detailedAnalysis || 'No detailed analysis available.',
        evidenceLinks: (foundClaim.sourcesUsed || []).map(src => ({
          title: src.relevance || 'Source reference',
          url: src.url || '#'
        })),
        originalSource: foundClaim.originalSource || null,
        imageUrl: foundClaim.imageUrl || null
      };

      renderClaimDetail(claimData);
    } catch (error) {
      console.error('Error loading claim:', error);
      errorMessageTextEl.textContent = error.message || 'Failed to load claim details.';
      claimDetailLoadingEl.classList.add('hidden');
      claimDetailErrorEl.classList.remove('hidden');
    }
  };

  // Initialize
  fetchClaimDetail();
})
