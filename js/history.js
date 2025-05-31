document.addEventListener('DOMContentLoaded', () => {
  // --- Shared Mock Data for History ---
  const allHistoryItems = [
    {
      id: '1',
      claimText:
        'Scientists discover a new species of glowing mushrooms in the Amazon rainforest that could revolutionize bioluminescent technology.',
      verificationDate: new Date(2023, 10, 15, 9, 30).toISOString(),
      status: 'pending',
      summary:
        'Initial checks indicate this is a recent claim circulating on social media. Further verification is in progress to confirm sources and scientific backing.',
      detailedExplanation:
        "The claim about glowing mushrooms is currently under investigation. Preliminary searches show some social media buzz but no confirmed scientific publications yet. We are contacting mycology experts for their input.\n\nUpdate: Some species of fungi are naturally bioluminescent, but a 'new species' with revolutionary tech potential requires peer-reviewed evidence which is currently lacking.",
      evidenceLinks: [{ title: 'Nature News: Bioluminescent Fungi', url: '#' }]
    },
    {
      id: '2',
      claimText:
        'A new study shows that drinking coffee can increase your lifespan by an average of 5 years.',
      verificationDate: new Date(2023, 9, 22, 14, 0).toISOString(),
      status: 'verified',
      summary:
        'Multiple peer-reviewed studies correlate regular coffee consumption with reduced mortality risk. The "5 years" claim is an oversimplification, but the general health benefit is supported.',
      imageUrl:
        'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
      originalSource: 'Global Health Times',
      detailedExplanation:
        "Multiple peer-reviewed epidemiological studies have indeed found a correlation between regular coffee consumption (typically 2-4 cups per day) and a reduced risk of mortality from various causes, including heart disease, stroke, and some cancers. While these studies are largely observational and don't definitively prove causation, the consistency of findings across large populations is significant.\n\nThe claim of an 'average of 5 years' increase is likely an oversimplification or an optimistic interpretation of some specific study's findings. The actual impact on lifespan is complex and varies based on individual genetics, lifestyle, and the type of coffee consumed. However, the general consensus is that moderate coffee consumption is associated with health benefits for most adults.\n\nIt's important to note that excessive coffee intake can have negative side effects, and individuals with certain health conditions should consult their doctor.",
      evidenceLinks: [
        { title: 'Harvard T.H. Chan: Coffee and Health', url: '#' },
        { title: 'BMJ Meta-Analysis on Coffee Consumption', url: '#' }
      ]
    },
    {
      id: '3',
      claimText:
        'Viral video claims tap water in New York City is unsafe due to microplastic contamination making it glow blue under UV light.',
      verificationDate: new Date(2023, 8, 5, 11, 15).toISOString(),
      status: 'debunked',
      summary:
        'NYC official water reports and independent tests show tap water meets safety standards. The "glowing water" effect in the video is likely due to added substances or lighting tricks, not inherent contamination.',
      detailedExplanation:
        "The claim that NYC tap water glows blue due to microplastic contamination is false. Official reports from the NYC Department of Environmental Protection consistently show that the city's tap water meets or exceeds all federal and state safety standards. Microplastics are an emerging concern globally, but there is no evidence they cause water to glow blue or that NYC water has dangerous levels.\n\nThe video likely uses an additive (like tonic water, which contains quinine and fluoresces under UV light) or special lighting effects to create the illusion. This is a common tactic in misinformation campaigns designed to cause alarm.",
      evidenceLinks: [{ title: 'NYC DEP Water Quality Report', url: '#' }]
    },
    {
      id: '4',
      claimText:
        'Is it true that cats always land on their feet? A myth-busting investigation.',
      verificationDate: new Date(2023, 7, 1, 16, 45).toISOString(),
      status: 'verified',
      summary:
        "Cats have a 'righting reflex' that allows them to orient themselves mid-air. While highly effective, it's not foolproof, especially from short falls or if the cat is unwell.",
      detailedExplanation:
        "Cats possess an innate ability called the 'righting reflex,' which allows them to orient their bodies during a fall to land on their feet. This involves a complex series of movements starting with the head, then the spine, and finally the legs. This reflex is typically developed by the time a kitten is 6-7 weeks old.\n\nHowever, the statement that cats *always* land on their feet is an overstatement. The effectiveness of the reflex depends on the height of the fall (too short, and they may not have time to orient; too high, and the impact force can still cause injury despite landing on their feet) and the cat's physical condition. Injuries can still occur.",
      imageUrl:
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: '5',
      claimText:
        'Reports suggest a new AI can predict stock market movements with 99% accuracy, leading to concerns about market stability.',
      verificationDate: new Date(2023, 11, 1, 10, 0).toISOString(),
      status: 'pending',
      summary:
        'This claim is under review. Predicting markets with such high accuracy is historically improbable. We are investigating the source and methodology.',
      detailedExplanation:
        'The claim of an AI predicting stock markets with 99% accuracy is highly dubious and currently unverified. Financial markets are notoriously complex and influenced by a vast number of unpredictable factors. While AI is increasingly used in algorithmic trading and market analysis, achieving such a high and consistent prediction rate would represent an unprecedented breakthrough and would likely have already caused significant market disruption if true.\n\nWe are searching for credible sources or research papers to support this claim. Most often, such claims originate from scams or exaggerated marketing for financial products.',
      evidenceLinks: []
    }
  ]

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
  const claimDetailLoadingEl = document.getElementById('claim-detail-loading')
  const claimDetailErrorEl = document.getElementById('claim-detail-error')
  const errorMessageTextEl = document.getElementById('error-message-text')
  const claimDetailContentWrapperEl = document.getElementById(
    'claim-detail-content'
  )

  const getStatusBadgeHTML = (status, large = false) => {
    let bgColor = 'bg-slate-100'
    let textColor = 'text-slate-700'
    let IconId = 'status-inconclusive-icon-solid'
    switch (status) {
      case 'verified':
        bgColor = 'bg-green-100'
        textColor = 'text-green-700'
        IconId = 'status-verified-icon-solid'
        break
      case 'debunked':
        bgColor = 'bg-red-100'
        textColor = 'text-red-700'
        IconId = 'status-debunked-icon-solid'
        break
      case 'pending':
        bgColor = 'bg-sky-100'
        textColor = 'text-sky-700'
        IconId = 'status-pending-icon-solid'
        break
    }
    const sizeClass = large ? 'px-4 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs'
    const iconSizeClass = large ? 'w-5 h-5' : 'w-4 h-4'
    return `<span class="inline-flex items-center rounded-full font-medium ${bgColor} ${textColor} ${sizeClass}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mr-1.5 ${iconSizeClass}"><use href="#${IconId}" /></svg>${
      status.charAt(0).toUpperCase() + status.slice(1)
    }</span>`
  }

  const renderClaimDetail = claimData => {
    if (!claimData) {
      // Handle case where claimData might be null if not found
      errorMessageTextEl.textContent = 'Claim details not found.'
      claimDetailLoadingEl.classList.add('hidden')
      claimDetailErrorEl.classList.remove('hidden')
      claimDetailContentWrapperEl.classList.add('hidden')
      return
    }
    const formattedDate = new Date(
      claimData.verificationDate
    ).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    let evidenceHTML = ''
    if (claimData.evidenceLinks && claimData.evidenceLinks.length > 0) {
      evidenceHTML = `<section><div class="flex items-center mb-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-sky-600 mr-2"><use href="#paperclip-icon-solid" /></svg><h2 class="text-xl font-semibold text-slate-800">Supporting Evidence</h2></div><ul class="space-y-2">${claimData.evidenceLinks
        .map(
          link =>
            `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-sm text-sky-600 hover:text-sky-800 hover:underline group"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-1.5 opacity-70 group-hover:opacity-100"><use href="#link-icon-solid" /></svg>${link.title}</a></li>`
        )
        .join('')}</ul></section>`
    }
    const paragraphsHTML = claimData.detailedExplanation
      .split('\n')
      .map(p => `<p>${p.trim() ? p : ' '}</p>`)
      .join('') // Ensure empty lines are rendered as paragraphs

    claimDetailContentWrapperEl.innerHTML = `
                <div class="max-w-4xl mx-auto">
                    <div class="mb-6">
                        <a href="history-list.html" class="inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-sky-500 group-hover:text-sky-700 transition-colors"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                            Back to Verification History
                        </a>
                    </div>
                    <div class="bg-white rounded-xl shadow-xl overflow-hidden">
                        ${
                          claimData.imageUrl
                            ? `<div class="bg-slate-200"><img src="${claimData.imageUrl}" alt="Claim related image" class="w-full h-60 sm:h-80 md:h-96 object-contain p-2 bg-slate-50" /></div>`
                            : ''
                        }
                        <div class="p-6 sm:p-8">
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 pb-5 border-b border-slate-200">
                                ${getStatusBadgeHTML(claimData.status, true)}
                                <div class="flex items-center text-sm text-slate-500 mt-3 sm:mt-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mr-1.5 text-slate-400"><use href="#status-pending-icon-solid" /></svg>
                                    Verified on: ${formattedDate}
                                </div>
                            </div>
                            <section class="mb-8">
                                <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Original Claim</h2>
                                <p class="text-lg sm:text-xl text-slate-800 leading-relaxed whitespace-pre-wrap">${
                                  claimData.claimText
                                }</p>
                                ${
                                  claimData.originalSource
                                    ? `<div class="mt-3 flex items-center text-sm text-slate-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-1.5 text-slate-400"><use href="#link-icon-solid" /></svg>Source: <span class="ml-1 font-medium text-slate-600 truncate">${claimData.originalSource}</span></div>`
                                    : ''
                                }
                            </section>
                            <section class="mb-8">
                                <div class="flex items-center mb-3">
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-sky-600 mr-2"><use href="#chat-bubble-icon-solid" /></svg>
                                    <h2 class="text-xl font-semibold text-slate-800">Verification Details</h2>
                                </div>
                                <div class="prose prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed">${paragraphsHTML}</div>
                            </section>
                            ${evidenceHTML}
                        </div>
                    </div>
                </div>`
    claimDetailLoadingEl.classList.add('hidden')
    claimDetailErrorEl.classList.add('hidden')
    claimDetailContentWrapperEl.classList.remove('hidden')
  }

  const fetchClaimDetail = async () => {
    const params = new URLSearchParams(window.location.search)
    const claimIdFromUrl = params.get('id')

    claimDetailLoadingEl.classList.remove('hidden')
    claimDetailErrorEl.classList.add('hidden')
    claimDetailContentWrapperEl.classList.add('hidden')

    try {
      await new Promise(resolve => setTimeout(resolve, 700)) // Simulate network delay

      if (!claimIdFromUrl) {
        throw new Error('No Claim ID provided in the URL.')
      }

      const selectedClaim = allHistoryItems.find(
        item => item.id === claimIdFromUrl
      )

      if (selectedClaim) {
        renderClaimDetail(selectedClaim)
      } else {
        throw new Error(`Claim with ID "${claimIdFromUrl}" not found.`)
      }
    } catch (e) {
      errorMessageTextEl.textContent =
        e.message || 'Failed to load claim details.'
      claimDetailLoadingEl.classList.add('hidden')
      claimDetailErrorEl.classList.remove('hidden')
      claimDetailContentWrapperEl.classList.add('hidden')
    }
  }

  fetchClaimDetail()
})
