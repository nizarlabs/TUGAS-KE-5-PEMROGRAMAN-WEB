
const searchForm = document.getElementById("searchForm");
const usernameInput = document.getElementById("username");
const message = document.getElementById("message");
const profile = document.getElementById("profile");

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();

    if (username === "") {
        message.textContent = "Masukkan username GitHub terlebih dahulu!";
        profile.classList.add("hidden");
        return;
    }

    // Menampilkan loading
    message.textContent = "Loading... Sedang mencari profil GitHub.";
    profile.classList.add("hidden");

    const button = searchForm.querySelector("button");
    button.disabled = true;
    button.textContent = "Mencari...";

    try {
        // Mengambil data dari GitHub API
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}`
        );

        // Memeriksa apakah username ditemukan
        if (response.status === 404) {
            throw new Error("User tidak ditemukan!");
        }

        if (!response.ok) {
            throw new Error("Terjadi kesalahan saat mengambil data.");
        }

        // Mengubah respons API menjadi JSON
        const data = await response.json();

        // Menampilkan data profil
        document.getElementById("avatar").src = data.avatar_url;

        document.getElementById("name").textContent =
            data.name || data.login;

        document.getElementById("bio").textContent =
            data.bio || "Pengguna ini belum memiliki bio.";

        document.getElementById("repos").textContent =
            data.public_repos;

        document.getElementById("profileLink").href =
            data.html_url;

        // Menampilkan kartu profil
        profile.classList.remove("hidden");

        // Menghapus pesan loading
        message.textContent = "";

    } catch (error) {
        message.textContent = error.message;
        profile.classList.add("hidden");

    } finally {
        // Mengaktifkan kembali tombol
        button.disabled = false;
        button.textContent = "Cari Profil";
    }
});
