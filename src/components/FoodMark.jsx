// Indian veg / non-veg dietary mark.
export default function FoodMark({ type }) {
  const label = type === 'veg' ? 'Veg' : 'Non-veg';
  return <span className={`food-mark ${type === 'veg' ? '' : 'nonveg'}`} role="img" aria-label={label} />;
}
