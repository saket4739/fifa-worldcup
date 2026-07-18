// NOTE ON SCOPE: this app intentionally shows team flags/colors rather than
// real player photos or video. Photos and footage of real athletes are
// copyrighted (and often licensed exclusively to broadcasters/FIFA), so we
// can't legally bundle or redistribute them in this project. Flags + official
// colors give the "supporting my team" experience without that risk. See
// README.md "Design decisions" for more detail.

export interface Team {
  code: string;
  name: string;
  flag: string; // unicode flag emoji
  primary: string; // hex
  secondary: string; // hex
}

export const TEAMS: Team[] = [
  { code: "BRA", name: "Brazil", flag: "🇧🇷", primary: "#FFCC29", secondary: "#009C3B" },
  { code: "ARG", name: "Argentina", flag: "🇦🇷", primary: "#75AADB", secondary: "#FFFFFF" },
  { code: "FRA", name: "France", flag: "🇫🇷", primary: "#0055A4", secondary: "#EF4135" },
  { code: "ENG", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", primary: "#FFFFFF", secondary: "#CE1124" },
  { code: "ESP", name: "Spain", flag: "🇪🇸", primary: "#AA151B", secondary: "#F1BF00" },
  { code: "GER", name: "Germany", flag: "🇩🇪", primary: "#000000", secondary: "#DD0000" },
  { code: "POR", name: "Portugal", flag: "🇵🇹", primary: "#046A38", secondary: "#DA291C" },
  { code: "NED", name: "Netherlands", flag: "🇳🇱", primary: "#FF6600", secondary: "#21468B" },
  { code: "USA", name: "United States", flag: "🇺🇸", primary: "#3C3B6E", secondary: "#B22234" },
  { code: "MEX", name: "Mexico", flag: "🇲🇽", primary: "#006847", secondary: "#CE1126" },
  { code: "CAN", name: "Canada", flag: "🇨🇦", primary: "#FF0000", secondary: "#FFFFFF" },
  { code: "JPN", name: "Japan", flag: "🇯🇵", primary: "#BC002D", secondary: "#FFFFFF" },
  { code: "KOR", name: "South Korea", flag: "🇰🇷", primary: "#C60C30", secondary: "#003478" },
  { code: "MAR", name: "Morocco", flag: "🇲🇦", primary: "#C1272D", secondary: "#006233" },
  { code: "NGA", name: "Nigeria", flag: "🇳🇬", primary: "#008751", secondary: "#FFFFFF" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳", primary: "#00853F", secondary: "#FDEF42" },
  { code: "BEL", name: "Belgium", flag: "🇧🇪", primary: "#000000", secondary: "#FDDA24" },
  { code: "ITA", name: "Italy", flag: "🇮🇹", primary: "#008C45", secondary: "#CD212A" },
  { code: "AUS", name: "Australia", flag: "🇦🇺", primary: "#00843D", secondary: "#FFCD00" },
  { code: "IND", name: "India", flag: "🇮🇳", primary: "#FF9933", secondary: "#138808" },
];

export function findTeam(code?: string | null): Team | undefined {
  return TEAMS.find((t) => t.code === code);
}
