const SESSION_KEYS = [
  "almost_demo",
  "almost_pdf_b64",
  "almost_all_branches",
  "almost_branch",
  "almost_template_type",
  "almost_life_result",
  "almost_user_name",
  "almost_return_mode",
  "almost_rate_limited",
  "almost_gen_error",
];

export function clearSession() {
  SESSION_KEYS.forEach((k) => sessionStorage.removeItem(k));
}
