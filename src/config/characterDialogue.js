// All mascot speech lives here. Keep lines short (about 8 words) so bubbles stay small on phones.
// Each entry: [text, gesture]. Gestures: wave, point, present, explain, thumb, celebrate.
export const HERO_LINES = [
  ['Hungry? You’ve found your momo spot!', 'wave'],
  ['Steamed, fried, spicy or cheesy?', 'present'],
  ['Pick half or full from the menu!', 'point'],
  ['Party? Ask us about bulk orders!', 'celebrate'],
];

export const SECTION_LINES = {
  specialties: [
    ['Which momo are you craving?', 'point'],
    ['Tap a card to see prices!', 'present'],
  ],
  menu: [
    ['Choose your filling and portion!', 'present'],
    ['Try tapping a peri-peri!', 'point'],
  ],
  local: [
    ['Good food, happy moments!', 'explain'],
    ['A momo for every craving.', 'thumb'],
  ],
  gallery: [['A little taste of paradise!', 'present']],
  feedback: [
    ['Tried our momos? Tell us!', 'thumb'],
    ['Your feedback means a lot!', 'explain'],
  ],
  bulk: [
    ['Planning a party? Let’s do it!', 'celebrate'],
    ['Send the form, we’ll WhatsApp you.', 'point'],
  ],
  faq: [['Got questions? Quick answers here!', 'explain']],
  location: [
    ['Come say hi! Follow the map.', 'point'],
    ['Call or WhatsApp anytime!', 'wave'],
  ],
};

export const REACTIONS = {
  peri: ['Whoa, that one’s got a kick!', 'celebrate'],
  menuTap: ['Choose your filling and portion!', 'present'],
};
