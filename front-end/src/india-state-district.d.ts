declare module 'india-state-district' {
  export const states: string[];
  export function getDistrictsByState(state: string): string[];
}
