document.addEventListener("DOMContentLoaded", function () {
  // GitHub API URL for releases
  var apiUrl =
    "https://api.github.com/repos/Ogwenya/pdf-stitch/releases/latest";

  // Select the download button
  let windows_button = document.getElementById("windows_button");
  let mac_button = document.getElementById("mac_button");
  let debian_button = document.getElementById("debian_button");
  let appimage_button = document.getElementById("appimage_button");

  if (!windows_button.href) {
    windows_button.disabled = true;
  }
  if (!mac_button.href) {
    mac_button.disabled = true;
  }
  if (!debian_button.href) {
    debian_button.disabled = true;
  }
  if (!appimage_button.href) {
    appimage_button.disabled = true;
  }

  // Fetch latest release information from GitHub API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.assets);

      const windows = data.assets.filter((asset) =>
        asset.name.endsWith(".msi")
      );

      const mac = data.assets.filter((asset) => asset.name.endsWith(".dmg"));

      const appimage = data.assets.filter((asset) =>
        asset.name.endsWith(".AppImage")
      );

      const debian = data.assets.filter((asset) => asset.name.endsWith(".deb"));

      console.log(windows[0].browser_download_url);

      windows_button.href = windows[0].browser_download_url;
      mac_button.href = mac[0].browser_download_url;
      debian_button.href = debian[0].browser_download_url;
      appimage_button.href = appimage[0].browser_download_url;
    })
    .catch((error) => console.error("Error fetching latest release:", error));
});
