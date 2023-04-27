const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {

    // Store the event so it can be triggered later

    deferredPrompt = event;

    // Display install button
    butInstall.classList.remove('hidden');
  });

  // Handle click event on the install button
  butInstall.addEventListener('click', async () => {
    // If there is no deferred prompt, return
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Reset the deferred prompt variable
    deferredPrompt = null;

    // Hide the install button
    butInstall.classList.add('hidden');

    // Log the outcome of the user's response
    console.log(`User ${outcome === 'accepted' ? 'accepted' : 'rejected'} the install prompt`);
  });

  // Handle app installed event
  window.addEventListener('appinstalled', (event) => {
    // Clear the deferred prompt variable
    deferredPrompt = null;

    // Log the event details
    console.log('App was installed', event);
  });
