document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".site-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  menuToggle?.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("is-open", !expanded);
  });
  document.querySelectorAll(".site-nav a").forEach((link) =>
    link.addEventListener("click", () => {
      nav?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }),
  );

  const filters = document.querySelectorAll(".filter-button");
  const cards = document.querySelectorAll(".education-card");
  filters.forEach((button) =>
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      const filter = button.dataset.filter;
      cards.forEach((card) =>
        card.classList.toggle(
          "is-hidden",
          filter !== "all" && !card.dataset.category.includes(filter),
        ),
      );
    }),
  );

  const modal = document.querySelector("#video-modal");
  const iframe = modal?.querySelector("iframe");
  const closeModal = () => {
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
    if (iframe) iframe.src = "";
  };
  document.querySelectorAll("[data-video]").forEach((trigger) =>
    trigger.addEventListener("click", () => {
      if (!modal || !iframe) return;
      iframe.src = `${trigger.dataset.video}?autoplay=1`;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    }),
  );
  document
    .querySelectorAll("[data-close-modal]")
    .forEach((item) => item.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  document
    .querySelector("#report-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.querySelector("#form-message");
      if (message)
        message.textContent =
          "Terima kasih. Laporan simulasi berhasil dicatat untuk ditinjau.";
      event.currentTarget.reset();
    });

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav a");
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) =>
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`,
          ),
        );
      }),
    { rootMargin: "-35% 0px -55% 0px" },
  );
  sections.forEach((section) => observer.observe(section));
});
