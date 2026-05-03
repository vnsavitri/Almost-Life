const SESSION_KEYS = [
  "almost_demo",
  "almost_pdf_b64",
  "almost_all_branches",
  "almost_branch",
  "almost_template_type",
  "almost_life_result",
];

export function clearSession() {
  SESSION_KEYS.forEach((k) => sessionStorage.removeItem(k));
}
