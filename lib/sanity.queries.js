import { groq } from 'next-sanity';

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    ...,
    membershipTiers[] {
      title,
      hours,
      description
    },
    scopeCategories[] {
      title,
      listItems
    }
  }
`;

export const settingsQuery = groq`
  *[_type == "settings"][0] {
    ...
  }
`;

export const leadershipPageQuery = groq`
  *[_type == "leadershipPage"][0] {
    ...
  }
`;
