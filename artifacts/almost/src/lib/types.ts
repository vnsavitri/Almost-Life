export interface Branch {
  id: string;
  year: string;
  framing: string;
  context: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  blurb: string;
}

export interface LifeData {
  name: string;
  alt_location: string;
  alt_role: string;
  alt_age: string;
  year_of_fork: string;
  fork_summary: string;
  linkedin_ghost: {
    headline: string;
    about_section: string;
    experience: Experience[];
    linkedin_post: string;
    connection_count: string;
  };
  wiki_stub: {
    infobox_birthplace: string;
    infobox_known_for: string;
    infobox_occupation: string;
    infobox_spouse: string;
    lead_paragraph: string;
    early_life: string;
    career: string;
    controversies: string;
    personal_life: string;
  };
  museum_plaque: {
    title: string;
    medium: string;
    provenance: string;
    description: string;
    loan_credit: string;
  };
  tarot_card: {
    card_name: string;
    suit: string;
    upright_meaning: string;
    reversed_meaning: string;
    prophecy: string;
  };
}
